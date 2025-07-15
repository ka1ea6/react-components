import React, { useState } from 'react';

import { ManagementSidebar } from "@/components/DigitalColleagues/ManagementSidebar"
import { KanbanBoard } from"@/components/DigitalColleagues/KanbanBoard"
import { EpicsView } from "@/components/DigitalColleagues/EpicsView"
import { PlanningView } from "@/components/DigitalColleagues/PlanningView"
import { TasksView } from "@/components/DigitalColleagues/TasksView"
import type { Reminder, DigitalColleague } from "@/components/DigitalColleagues/TasksView"
// import { Epic, Sprint, Project, Task } from "@/components/DigitalColleagues/KanbanBoard"
import { useRouter } from 'next/navigation';

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


interface Props {
  title?: string
    initialTasks?: Task[];
      initialEpics?: Epic[];
      initialSprints?: Sprint[];
      initialProjects?: Project[];
      initialReminders?: Reminder[];
      initialColleagues?: DigitalColleague[];
    // currentView: 'kanban' | 'planning' | 'files' | 'epics';
    onUpdateProject: (projectId: string, updates: Partial<Project>) => void;
    onDeleteProject: (projectId: string) => void;
    onAddProject: (project: Omit<Project, 'id'>) => void;
    onUpdateEpic: (epicId: string, updates: Partial<Epic>) => void;
      onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
    onDeleteEpic: (epicId: string) => void;
    onAddEpic: () => void;
    onAddSprint: (sprint: Omit<Sprint, 'id'>) => void;
    onUpdateSprint: (sprintId: string, updates: Partial<Sprint>) => void;
    onDeleteSprint: (sprintId: string) => void;
    onAddReminder?: (reminder: Omit<Reminder, 'id' | 'createdAt'>) => void;
    onUpdateReminder?: (reminderId: string, updates: Partial<Reminder>) => void;
    onDeleteReminder?: (reminderId: string) => void;
    // onViewChange: (view: 'kanban' | 'planning' | 'files' | 'epics') => void;
    // mobileMenuOpen: boolean;
    onToggleMobileMenu: () => void;
//   businessUnits: BusinessUnit[]
}

export default function ProjectView({ title = "" ,
      initialTasks = [],
  initialEpics = [],
  initialSprints = [],
  initialProjects = [],
  initialReminders = [],
  initialColleagues = [],
  // currentView,
  onUpdateProject,
  onDeleteProject,
  onAddProject,
  onUpdateEpic,
  onDeleteEpic,
  onAddEpic,
  onUpdateTask,
  onAddSprint,
  onUpdateSprint,
  onDeleteSprint,
  onAddReminder,
  onUpdateReminder,
  onDeleteReminder,
  // onViewChange,
  // mobileMenuOpen,
  onToggleMobileMenu,
}: Props) {


const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [epics, setEpics] = useState<Epic[]>(initialEpics);
  const [sprints, setSprints] = useState<Sprint[]>(initialSprints);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [colleagues, setColleagues] = useState<DigitalColleague[]>(initialColleagues);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isAddEpicModalOpen, setIsAddEpicModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [currentView, setCurrentView] = useState<'kanban' | 'planning' | 'tasks' | 'files' | 'epics'>('kanban');
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
    onUpdateTask?.(taskId, updates);
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
    onAddProject?.(newProject);
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
    onUpdateProject?.(projectId, updates);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
    onDeleteProject?.(projectId);
  };

  const handleAddEpic = (newEpic: Omit<Epic, 'id'>) => {
    const epic: Epic = { ...newEpic, id: Date.now().toString(), isSelected: true };
    setEpics(prev => [...prev, epic]);
  };

  const handleAddEpicClick = () => {
    // This would typically open a modal or trigger some UI for adding an epic
    // For now, let's create a default epic
    const defaultEpic: Omit<Epic, 'id'> = {
      name: 'New Epic',
      color: '#3B82F6',
      description: 'Epic description',
      confidence: 'medium',
      phase: 1,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      progress: 0,
      isSelected: true
    };
    handleAddEpic(defaultEpic);
    onAddEpic?.();
  };

  const handleUpdateEpic = (epicId: string, updates: Partial<Epic>) => {
    setEpics(prev =>
      prev.map(epic => (epic.id === epicId ? { ...epic, ...updates } : epic))
    );
    onUpdateEpic?.(epicId, updates);
  };

  const handleDeleteEpic = (epicId: string) => {
    setEpics(prev => prev.filter(epic => epic.id !== epicId));
    // Also delete all tasks in this epic
    setTasks(prev => prev.filter(task => task.epicId !== epicId));
    onDeleteEpic?.(epicId);
  };

  const handleAddSprint = (newSprint: Omit<Sprint, 'id'>) => {
    const sprint: Sprint = { ...newSprint, id: Date.now().toString(), isSelected: false };
    setSprints(prev => [...prev, sprint]);
    onAddSprint?.(newSprint);
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
    onUpdateSprint?.(sprintId, updates);
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
    onDeleteSprint?.(sprintId);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleViewChange = (view: 'kanban' | 'planning' | 'tasks' | 'files' | 'epics') => {
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

  const handleAddReminder = (newReminder: Omit<Reminder, 'id' | 'createdAt'>) => {
    const reminder: Reminder = {
      ...newReminder,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setReminders(prev => [...prev, reminder]);
    onAddReminder?.(newReminder);
  };

  const handleUpdateReminder = (reminderId: string, updates: Partial<Reminder>) => {
    setReminders(prev =>
      prev.map(reminder => 
        reminder.id === reminderId ? { ...reminder, ...updates } : reminder
      )
    );
    onUpdateReminder?.(reminderId, updates);
  };

  const handleDeleteReminder = (reminderId: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== reminderId));
    onDeleteReminder?.(reminderId);
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
      case 'tasks':
        return 'Task Reminders';
      case 'files':
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

  // const [ currentView, setCurrentView ] = useState<'kanban' | 'planning' | 'files' | 'epics'>('kanban');

  const onViewChange = (view: 'kanban' | 'planning' | 'tasks' | 'files' | 'epics') => {
    // Hide planning view on mobile
    if (view === 'planning' && window.innerWidth < 768) {
      return;
    }
    setCurrentView(view);
  };

return (


    <ManagementSidebar
      projects={projects}
  epics={epics}
  sprints={sprints}
  currentView={currentView}
  onUpdateProject={handleUpdateProject}
  onDeleteProject={handleDeleteProject}
  onAddProject={handleAddProject}
  onUpdateEpic={handleUpdateEpic}
  onDeleteEpic={handleDeleteEpic}
  onAddEpic={handleAddEpicClick}
  onAddSprint={handleAddSprint}
  onUpdateSprint={handleUpdateSprint}
  onDeleteSprint={handleDeleteSprint}
  onViewChange={onViewChange}
  mobileMenuOpen={mobileMenuOpen}
  onToggleMobileMenu={onToggleMobileMenu}
    >


      
      { currentView === 'kanban' && (
      <div className="p-0">
        <KanbanBoard 
        initialProjects={projects}
            initialEpics={epics}
            initialSprints={sprints}
            initialTasks={tasks}
            />
      </div>
      )}
      { currentView === 'planning' && (
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
                    
      )}
      { currentView === 'tasks' && (
        <div className="h-full">
          <TasksView
            initialReminders={reminders}
            initialColleagues={colleagues}
            onAddReminder={handleAddReminder}
            onUpdateReminder={handleUpdateReminder}
            onDeleteReminder={handleDeleteReminder}
          />
        </div>
      )}
      { currentView === 'files' && (
        <div className="p-8 bg-gray-50 h-full">
          {/* Files view content goes here */}
          <h2 className="text-xl font-semibold mb-4">Files View</h2>
          <p>Content for the files view will be implemented here.</p>
        </div>
      )}
      { currentView === 'epics' && (
        <div className="p-0 bg-gray-50 h-full">
          {/* Epics view content goes here */}
          <EpicsView
                          tasks={tasks}
                          epics={epics}
                          sprints={sprints}
                          onUpdateTask={handleUpdateTask}
                          onTaskClick={handleTaskClick}
                          onAddTaskToEpic={handleAddTaskToEpic}
                          onAddEpic={() => setIsAddEpicModalOpen(true)}
                        />
        </div>
      )}
    </ManagementSidebar>
)
}
