import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { KanbanColumn } from './KanbanColumn';
import { TaskCard } from './TaskCard';
import { AddTaskModal } from './AddTaskModal';
import { TaskDetailsModal } from './TaskDetailsModal';
import { ManagementSidebar } from './ManagementSidebar';
import { AddEpicModal } from './AddEpicModal';
import { PlanningView } from './PlanningView';
import { DocumentationView } from './DocumentationView';
import { DashboardHeader } from './DashboardHeader';
import { TeamSwitcher } from './TeamSwitcher';
import { Kanban, Plus, Menu, MessageSquare, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { EpicsView } from './EpicsView';

export interface Project {
  id: string;
  name: string;
  description?: string;
  isSelected?: boolean;
}

export interface Epic {
  id: string;
  name: string;
  color: string;
  description?: string;
  confidence: 'low' | 'medium' | 'high';
  phase: number; // 1-9
  startDate: Date;
  endDate: Date;
  progress: number; // 0-100
  isSelected?: boolean;
}

export interface Sprint {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  isSelected?: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  type: 'story' | 'task' | 'bug' | 'spike';
  points: number; // Story points
  epicId: string;
  sprintId?: string;
  assignee: string;
  createdAt: Date;
}

export interface KanbanBoardProps {
  initialTasks?: Task[];
  initialEpics?: Epic[];
  initialSprints?: Sprint[];
  initialProjects?: Project[];
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  initialTasks = [],
  initialEpics = [],
  initialSprints = [],
  initialProjects = [],
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [epics, setEpics] = useState<Epic[]>(initialEpics);
  const [sprints, setSprints] = useState<Sprint[]>(initialSprints);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isAddEpicModalOpen, setIsAddEpicModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [currentView, setCurrentView] = useState<'kanban' | 'planning' | 'documentation' | 'epics'>('kanban');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const selectedEpics = epics.filter(epic => epic.isSelected).map(epic => epic.id);
  const selectedSprint = sprints.find(sprint => sprint.isSelected);

  // Filter tasks by selected epics and sprint
  const filteredTasks = tasks.filter(task => {
    const isEpicSelected = selectedEpics.includes(task.epicId);
    if (!selectedSprint) return isEpicSelected;
    if (selectedSprint.id === 'all-tasks') return isEpicSelected;
    if (selectedSprint.id === 'backlog') return isEpicSelected && !task.sprintId;
    return isEpicSelected && task.sprintId === selectedSprint.id;
  });

  const getTasksByStatus = (status: Task['status']) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const getTasksByEpic = (tasks: Task[]) => {
    const tasksByEpic: { [epicId: string]: Task[] } = {};
    epics.forEach(epic => {
      tasksByEpic[epic.id] = tasks.filter(task => task.epicId === epic.id);
    });
    return tasksByEpic;
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDrop = (status: Task['status']) => {
    if (draggedTask) {
      setTasks(prev =>
        prev.map(task =>
          task.id === draggedTask.id ? { ...task, status } : task
        )
      );
      setDraggedTask(null);
    }
  };

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    const task: Task = { ...newTask, id: Date.now().toString(), createdAt: new Date() };
    setTasks(prev => [...prev, task]);
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task => (task.id === taskId ? { ...task, ...updates } : task))
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
  };

  const handleAddProject = (newProject: Omit<Project, 'id'>) => {
    const project: Project = { ...newProject, id: Date.now().toString(), isSelected: false };
    setProjects(prev => [...prev, project]);
  };

  const handleUpdateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(prev =>
      prev.map(project => {
        if (project.id === projectId) {
          // If selecting this project, deselect all others and navigate
          if (updates.isSelected) {
            router.push(`/kanban/${projectId}`);
            return { ...project, ...updates };
          }
          return { ...project, ...updates };
        }
        // If selecting a new project, deselect this one
        if (updates.isSelected && projectId !== project.id) {
          return { ...project, isSelected: false };
        }
        return project;
      })
    );
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  const handleAddEpic = (newEpic: Omit<Epic, 'id'>) => {
    const epic: Epic = { ...newEpic, id: Date.now().toString(), isSelected: true };
    setEpics(prev => [...prev, epic]);
  };

  const handleUpdateEpic = (epicId: string, updates: Partial<Epic>) => {
    setEpics(prev =>
      prev.map(epic => (epic.id === epicId ? { ...epic, ...updates } : epic))
    );
  };

  const handleDeleteEpic = (epicId: string) => {
    setEpics(prev => prev.filter(epic => epic.id !== epicId));
    // Also delete all tasks in this epic
    setTasks(prev => prev.filter(task => task.epicId !== epicId));
  };

  const handleAddSprint = (newSprint: Omit<Sprint, 'id'>) => {
    const sprint: Sprint = { ...newSprint, id: Date.now().toString(), isSelected: false };
    setSprints(prev => [...prev, sprint]);
  };

  const handleUpdateSprint = (sprintId: string, updates: Partial<Sprint>) => {
    setSprints(prev =>
      prev.map(sprint => {
        if (sprint.id === sprintId) {
          // If selecting this sprint, deselect all others
          if (updates.isSelected) {
            return { ...sprint, ...updates };
          }
          return { ...sprint, ...updates };
        }
        // If selecting a new sprint, deselect this one
        if (updates.isSelected && sprintId !== sprint.id) {
          return { ...sprint, isSelected: false };
        }
        return sprint;
      })
    );
  };

  const handleDeleteSprint = (sprintId: string) => {
    // Prevent deleting special sprints
    if (sprintId === 'backlog' || sprintId === 'all-tasks') return;
    setSprints(prev => prev.filter(sprint => sprint.id !== sprintId));
    // Move tasks from deleted sprint to backlog
    setTasks(prev =>
      prev.map(task =>
        task.sprintId === sprintId ? { ...task, sprintId: undefined } : task
      )
    );
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleViewChange = (view: 'kanban' | 'planning' | 'documentation' | 'epics') => {
    // Hide planning view on mobile
    if (view === 'planning' && window.innerWidth < 768) {
      return;
    }
    setCurrentView(view);
  };

  const handleToggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const handleCopilotClick = () => {
    router.push('/');
  };

  const handleTeamClick = (teamId: string) => {
    console.log('Switching to team:', teamId);
    // In a real app, this would update the current team context
  };

  const handleTeamChange = (team: any) => {
    console.log('Switching to team:', team);
    // In a real app, this would update the current team context
  };

  const handleAddTaskToEpic = (epicId: string) => {
    // Set the epic in the add task modal and open it
    setIsAddTaskModalOpen(true);
    // You could enhance this to pre-select the epic
  };

  const columns = [
    { id: 'todo', title: 'To Do', status: 'todo' as const },
    { id: 'in-progress', title: 'In Progress', status: 'in-progress' as const },
    { id: 'review', title: 'Review', status: 'review' as const },
    { id: 'done', title: 'Done', status: 'done' as const },
  ];

  const getViewTitle = () => {
    switch (currentView) {
      case 'kanban':
        return 'Project Board';
      case 'planning':
        return 'Sprint Planning';
      case 'documentation':
        return 'Documentation';
      case 'epics':
        return 'Epic Planning';
      default:
        return 'Project Board';
    }
  };

  // Mock teams data - same as Dashboard
  const mockTeams = [
    { id: '1', name: 'Product Development', avatar: 'PD', lastUsed: new Date('2024-01-20') },
    { id: '2', name: 'Engineering', avatar: 'ENG', lastUsed: new Date('2024-01-19') },
    { id: '3', name: 'Marketing Team', avatar: 'MT', lastUsed: new Date('2024-01-18') },
    { id: '4', name: 'Design System', avatar: 'DS', lastUsed: new Date('2024-01-17') },
    { id: '5', name: 'Sales Operations', avatar: 'SO', lastUsed: new Date('2024-01-16') },
    { id: '6', name: 'Customer Success', avatar: 'CS', lastUsed: new Date('2024-01-15') },
  ];

  // Get the 3 most recently used teams
  const recentTeams = mockTeams
    .sort((a, b) => b.lastUsed.getTime() - a.lastUsed.getTime())
    .slice(0, 3);
  
  const hasMoreTeams = mockTeams.length > 3;
  const additionalTeams = mockTeams.slice(3);

  return (
    <div className="flex-1 py-6">
      <div className="w-full">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Kanban className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 static">
              {getViewTitle()}
            </h1>
          </div>
        </div>

            {/* Content based on current view */}
            {currentView === 'kanban' ? (
              /* Kanban Board */
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {columns.map(column => {
                  const columnTasks = getTasksByStatus(column.status);
                  const tasksByEpic = getTasksByEpic(columnTasks);

                  return (
                    <KanbanColumn
                      key={column.id}
                      title={column.title}
                      status={column.status}
                      taskCount={columnTasks.length}
                      onDrop={handleDrop}
                      isCompact={column.status === 'done'}
                    >
                      {selectedEpics.map(epicId => {
                        const epic = epics.find(e => e.id === epicId);
                        const epicTasks = tasksByEpic[epicId] || [];

                        if (epicTasks.length === 0) return null;

                        return (
                          <div key={epicId} className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                              <div className={`w-3 h-3 rounded-full ${epic?.color}`}></div>
                              <span className="text-sm font-medium text-gray-600 select-none-important">{epic?.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {epicTasks.length}
                              </Badge>
                            </div>

                            <div className="space-y-3">
                              {epicTasks.map(task => (
                                <TaskCard
                                  key={task.id}
                                  task={task}
                                  epic={epic!}
                                  onDragStart={handleDragStart}
                                  onTaskClick={handleTaskClick}
                                  isCompact={column.status === 'done'}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </KanbanColumn>
                  );
                })}
              </div>
            ) : currentView === 'planning' ? (
              /* Planning View - Hidden on mobile */
              <div className="hidden md:block">
                <PlanningView
                  tasks={tasks}
                  epics={epics}
                  sprints={sprints}
                  onUpdateTask={handleUpdateTask}
                  onTaskClick={handleTaskClick}
                  onAddSprint={handleAddSprint}
                />
              </div>
            ) : currentView === 'epics' ? (
              /* Epics View */
              <EpicsView
                tasks={tasks}
                epics={epics}
                sprints={sprints}
                onUpdateTask={handleUpdateTask}
                onTaskClick={handleTaskClick}
                onAddTaskToEpic={handleAddTaskToEpic}
                onAddEpic={() => setIsAddEpicModalOpen(true)}
              />
            ) : (
              /* Documentation View */
              <DocumentationView />
            )}

            <>
              <AddTaskModal
                isOpen={isAddTaskModalOpen}
                onClose={() => setIsAddTaskModalOpen(false)}
                onAddTask={handleAddTask}
                epics={epics}
                sprints={sprints}
              />

              <AddEpicModal
                isOpen={isAddEpicModalOpen}
                onClose={() => setIsAddEpicModalOpen(false)}
                onAddEpic={handleAddEpic}
              />

              {selectedTask && (
                <TaskDetailsModal
                  isOpen={!!selectedTask}
                  onClose={() => setSelectedTask(null)}
                  task={selectedTask}
                  epics={epics}
                  sprints={sprints}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                />
              )}
            </>
        </div>
      </div>
  );
};
