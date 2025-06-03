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

export interface Epic {
  id: string;
  name: string;
  color: string;
  description?: string;
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
  epicId: string;
  sprintId?: string;
  assignee: string;
  createdAt: Date;
}

const initialEpics: Epic[] = [
  {
    id: '1',
    name: 'User Authentication',
    color: 'bg-blue-500',
    description: 'Implement secure user authentication system',
    isSelected: true,
  },
  {
    id: '2',
    name: 'Dashboard Features',
    color: 'bg-green-500',
    description: 'Build comprehensive dashboard functionality',
    isSelected: true,
  },
  {
    id: '3',
    name: 'Mobile Optimization',
    color: 'bg-purple-500',
    description: 'Optimize application for mobile devices',
    isSelected: true,
  },
  {
    id: '4',
    name: 'Performance Improvements',
    color: 'bg-orange-500',
    description: 'Enhance application performance and speed',
    isSelected: true,
  },
];

const initialSprints: Sprint[] = [
  {
    id: 'backlog',
    name: 'Backlog',
    description: 'Tasks not yet assigned to a sprint',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    isActive: false,
    isSelected: false,
  },
  {
    id: 'all-tasks',
    name: 'All Tasks',
    description: 'View all tasks across all sprints',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    isActive: false,
    isSelected: true,
  },
  {
    id: '1',
    name: 'Sprint 1',
    description: 'Initial development phase',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-14'),
    isActive: false,
    isSelected: false,
  },
  {
    id: '2',
    name: 'Sprint 2',
    description: 'Feature development',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-01-28'),
    isActive: true,
    isSelected: false,
  },
];

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design login page',
    description: 'Create wireframes and mockups for the login interface',
    status: 'todo',
    priority: 'high',
    type: 'story',
    epicId: '1',
    sprintId: '2',
    assignee: 'John Doe',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Implement OAuth integration',
    description: 'Add Google and GitHub OAuth authentication',
    status: 'review',
    priority: 'high',
    type: 'task',
    epicId: '1',
    sprintId: '2',
    assignee: 'Jane Smith',
    createdAt: new Date('2024-01-16'),
  },
  {
    id: '3',
    title: 'Create dashboard widgets',
    description: 'Build analytics and metrics widgets for the main dashboard',
    status: 'todo',
    priority: 'medium',
    type: 'story',
    epicId: '2',
    sprintId: '2',
    assignee: 'Mike Johnson',
    createdAt: new Date('2024-01-17'),
  },
  {
    id: '4',
    title: 'Fix login redirect bug',
    description: 'Resolve issue where users are not redirected after login',
    status: 'done',
    priority: 'high',
    type: 'bug',
    epicId: '1',
    sprintId: '1',
    assignee: 'Sarah Wilson',
    createdAt: new Date('2024-01-14'),
  },
  {
    id: '5',
    title: 'Research mobile frameworks',
    description: 'Investigate best practices for mobile responsive design',
    status: 'in-progress',
    priority: 'medium',
    type: 'spike',
    epicId: '3',
    assignee: 'Alex Brown',
    createdAt: new Date('2024-01-18'),
  },
  {
    id: '6',
    title: 'Update user profile page',
    description: 'Enhance user profile with new settings and preferences',
    status: 'review',
    priority: 'medium',
    type: 'story',
    epicId: '2',
    sprintId: '2',
    assignee: 'Emma Davis',
    createdAt: new Date('2024-01-19'),
  },
  {
    id: '7',
    title: 'Performance optimization',
    description: 'Optimize database queries and improve page load times',
    status: 'done',
    priority: 'high',
    type: 'task',
    epicId: '4',
    sprintId: '1',
    assignee: 'Tom Wilson',
    createdAt: new Date('2024-01-13'),
  },
];

export const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [epics, setEpics] = useState<Epic[]>(initialEpics);
  const [sprints, setSprints] = useState<Sprint[]>(initialSprints);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isAddEpicModalOpen, setIsAddEpicModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [currentView, setCurrentView] = useState<'kanban' | 'planning' | 'documentation'>('kanban');
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

  const handleViewChange = (view: 'kanban' | 'planning' | 'documentation') => {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <DashboardHeader
        isRightSidebarOpen={false}
        onToggleRightSidebar={() => {}}
        onToggleLeftSidebar={handleToggleMobileMenu}
      />

      {/* Top Menu - Below Header */}
      <div className="border-b bg-white px-6 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Copilot Button */}
              <Button
                variant="outline"
                onClick={handleCopilotClick}
                className="gap-2 h-9"
              >
                <MessageSquare className="h-4 w-4" />
                Copilot
              </Button>

              {/* Recent Teams */}
              {recentTeams.map((team) => (
                <Button
                  key={team.id}
                  variant="default"
                  onClick={() => handleTeamClick(team.id)}
                  className="gap-2 h-9 bg-blue-600 hover:bg-blue-700"
                >
                  <div className="w-5 h-5 rounded bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                    {team.avatar}
                  </div>
                  {team.name}
                </Button>
              ))}

              {/* More Teams Dropdown */}
              {hasMoreTeams && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-9 w-9 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {additionalTeams.map((team) => (
                      <DropdownMenuItem
                        key={team.id}
                        onClick={() => handleTeamClick(team.id)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <div className="w-5 h-5 rounded bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                          {team.avatar}
                        </div>
                        {team.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {currentView !== 'documentation' && (
              <Button
                onClick={() => setIsAddTaskModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area with Sidebar */}
      <ManagementSidebar
        epics={epics}
        sprints={sprints}
        currentView={currentView}
        onUpdateEpic={handleUpdateEpic}
        onDeleteEpic={handleDeleteEpic}
        onAddEpic={() => setIsAddEpicModalOpen(true)}
        onAddSprint={handleAddSprint}
        onUpdateSprint={handleUpdateSprint}
        onDeleteSprint={handleDeleteSprint}
        onViewChange={handleViewChange}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={handleToggleMobileMenu}
      >
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Kanban className="h-8 w-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900 select-none-important">
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
                />
              </div>
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
      </ManagementSidebar>
    </div>
  );
};
