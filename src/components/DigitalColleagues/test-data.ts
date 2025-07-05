import { Project, Epic, Sprint, Task } from './KanbanBoard';

// Mock data for testing and stories
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Main customer-facing e-commerce application',
    isSelected: true,
  },
  {
    id: '2',
    name: 'Admin Dashboard',
    description: 'Internal administration and analytics dashboard',
    isSelected: false,
  },
  {
    id: '3',
    name: 'Mobile App',
    description: 'Native mobile application for iOS and Android',
    isSelected: false,
  },
];

export const mockEpics: Epic[] = [
  {
    id: '1',
    name: 'User Authentication',
    color: 'bg-blue-500',
    description: 'Implement secure user authentication system',
    confidence: 'high',
    phase: 2, // development
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-02-15'),
    progress: 75,
    isSelected: true,
  },
  {
    id: '2',
    name: 'Dashboard Features',
    color: 'bg-green-500',
    description: 'Build comprehensive dashboard functionality',
    confidence: 'medium',
    phase: 1, // planning
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-03-15'),
    progress: 30,
    isSelected: true,
  },
  {
    id: '3',
    name: 'Mobile Optimization',
    color: 'bg-purple-500',
    description: 'Optimize application for mobile devices',
    confidence: 'low',
    phase: 1, // planning
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-04-15'),
    progress: 10,
    isSelected: true,
  },
  {
    id: '4',
    name: 'Performance Improvements',
    color: 'bg-orange-500',
    description: 'Enhance application performance and speed',
    confidence: 'high',
    phase: 3, // testing
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-02-28'),
    progress: 90,
    isSelected: true,
  },
];

export const mockSprints: Sprint[] = [
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

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design login page',
    description: 'Create wireframes and mockups for the login interface',
    status: 'todo',
    priority: 'high',
    type: 'story',
    points: 5,
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
    points: 8,
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
    points: 13,
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
    points: 3,
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
    points: 5,
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
    points: 8,
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
    points: 13,
    epicId: '4',
    sprintId: '1',
    assignee: 'Tom Wilson',
    createdAt: new Date('2024-01-13'),
  },
];

// Additional tasks for high density testing
export const highDensityTasks: Task[] = [
  ...mockTasks,
  {
    id: '8',
    title: 'Add search functionality',
    description: 'Implement search across all dashboard widgets',
    status: 'todo',
    priority: 'medium',
    type: 'story',
    points: 8,
    epicId: '2',
    sprintId: '2',
    assignee: 'Chris Lee',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '9',
    title: 'Fix mobile responsive issues',
    description: 'Resolve layout problems on mobile devices',
    status: 'in-progress',
    priority: 'high',
    type: 'bug',
    points: 5,
    epicId: '3',
    sprintId: '2',
    assignee: 'Taylor Swift',
    createdAt: new Date('2024-01-21'),
  },
  {
    id: '10',
    title: 'Implement dark mode',
    description: 'Add dark theme support across the application',
    status: 'review',
    priority: 'low',
    type: 'story',
    points: 13,
    epicId: '2',
    sprintId: '2',
    assignee: 'Jordan Smith',
    createdAt: new Date('2024-01-22'),
  },
  {
    id: '11',
    title: 'API rate limiting',
    description: 'Implement rate limiting for API endpoints',
    status: 'done',
    priority: 'high',
    type: 'task',
    points: 8,
    epicId: '4',
    sprintId: '1',
    assignee: 'Morgan Davis',
    createdAt: new Date('2024-01-12'),
  },
  {
    id: '12',
    title: 'User onboarding flow',
    description: 'Create guided tour for new users',
    status: 'todo',
    priority: 'medium',
    type: 'story',
    points: 21,
    epicId: '1',
    sprintId: '2',
    assignee: 'Casey Johnson',
    createdAt: new Date('2024-01-23'),
  },
];

// Additional projects for testing
export const extendedProjects: Project[] = [
  ...mockProjects,
  {
    id: '4',
    name: 'Analytics Platform',
    description: 'Business intelligence and reporting system',
    isSelected: false,
  },
  {
    id: '5',
    name: 'API Gateway',
    description: 'Microservices API management layer',
    isSelected: false,
  },
];

// Empty state data
export const emptyStateData = {
  projects: [
    {
      id: '1',
      name: 'Empty Project',
      description: 'A project with no tasks',
      isSelected: true,
    },
  ],
  epics: [],
  sprints: [
    {
      id: 'all-tasks',
      name: 'All Tasks',
      description: 'View all tasks across all sprints',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      isActive: false,
      isSelected: true,
    },
  ],
  tasks: [],
};

// Single epic focus data
export const singleEpicData = {
  epics: [
    {
      id: '1',
      name: 'User Authentication',
      color: 'bg-blue-500',
      description: 'Implement secure user authentication system',
      confidence: 'high' as const,
      phase: 2,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-02-15'),
      progress: 75,
      isSelected: true,
    },
  ],
  tasks: mockTasks.filter(task => task.epicId === '1'),
};

// Utility functions for common data manipulations
export const getTasksByStatus = (tasks: Task[], status: Task['status']) => {
  return tasks.filter(task => task.status === status);
};

export const getTasksByEpic = (tasks: Task[], epicId: string) => {
  return tasks.filter(task => task.epicId === epicId);
};

export const getTasksBySprint = (tasks: Task[], sprintId: string) => {
  return tasks.filter(task => task.sprintId === sprintId);
};

export const getSelectedEpics = (epics: Epic[]) => {
  return epics.filter(epic => epic.isSelected);
};

export const getActiveSprints = (sprints: Sprint[]) => {
  return sprints.filter(sprint => sprint.isActive);
};

// Data presets for common testing scenarios
export const testScenarios = {
  empty: {
    initialProjects: emptyStateData.projects,
    initialEpics: emptyStateData.epics,
    initialSprints: emptyStateData.sprints,
    initialTasks: emptyStateData.tasks,
  },
  default: {
    initialProjects: mockProjects,
    initialEpics: mockEpics,
    initialSprints: mockSprints,
    initialTasks: mockTasks,
  },
  highDensity: {
    initialProjects: mockProjects,
    initialEpics: mockEpics,
    initialSprints: mockSprints,
    initialTasks: highDensityTasks,
  },
  singleEpic: {
    initialProjects: mockProjects,
    initialEpics: singleEpicData.epics,
    initialSprints: mockSprints,
    initialTasks: singleEpicData.tasks,
  },
  multipleProjects: {
    initialProjects: extendedProjects,
    initialEpics: mockEpics,
    initialSprints: mockSprints,
    initialTasks: mockTasks,
  },
};
