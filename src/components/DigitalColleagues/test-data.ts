import { Project, Epic, Sprint, Task } from '../dc-temp/Views/KanbanBoard';
import { ProjectSummary, TeamSummary, Colleague } from './types';
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

export const mockProjectSummary: ProjectSummary[] = [
  {
    name: "Website Redesign",
    description: "Complete overhaul of company website",
    progress: 75,
    dueDate: "June 15, 2025",
    members: 4,
    files: 23,
  },
  {
    name: "Mobile App Launch",
    description: "Design and assets for new mobile application",
    progress: 60,
    dueDate: "July 30, 2025",
    members: 6,
    files: 42,
  },
  {
    name: "Brand Identity",
    description: "New brand guidelines and assets",
    progress: 90,
    dueDate: "May 25, 2025",
    members: 3,
    files: 18,
  },
  {
    name: "Marketing Campaign",
    description: "Summer promotion materials",
    progress: 40,
    dueDate: "August 10, 2025",
    members: 5,
    files: 31,
  },
]

export const mockTeamSummary: TeamSummary[] = [
  {
    id: "1",
    name: "Product Development",
    description: "Core product development team responsible for building and maintaining our main platform",
    humanColleagues: 8,
    digitalColleagues: 3,
    projects: 5,
  },
  {
    id: "2",
    name: "Design & UX",
    description: "Creative team focused on user experience design and visual identity",
    humanColleagues: 5,
    digitalColleagues: 2,
    projects: 3,
  },
  {
    id: "3",
    name: "Marketing",
    description: "Growth and marketing team driving customer acquisition and retention",
    humanColleagues: 6,
    digitalColleagues: 4,
    projects: 7,
  },
  {
    id: "4",
    name: "Data Science",
    description: "Analytics and machine learning team providing insights and intelligent features",
    humanColleagues: 4,
    digitalColleagues: 6,
    projects: 2,
  },
  {
    id: "5",
    name: "Customer Success",
    description: "Support and success team ensuring customer satisfaction and retention",
    humanColleagues: 7,
    digitalColleagues: 2,
    projects: 4,
  },
  {
    id: "6",
    name: "Operations",
    description: "Infrastructure and operations team maintaining system reliability and performance",
    humanColleagues: 3,
    digitalColleagues: 5,
    projects: 3,
  },
]

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




export const mockColleagues: Colleague[] = [
  {
    id: "1",
    type: "human",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Senior Designer",
    department: "Design",
    status: "active",
    joinedDate: new Date("2023-01-15"),
    lastActive: new Date(),
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    timezone: "PST",
    skills: ["UI/UX Design", "Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
    bio: "Passionate designer with 8+ years of experience creating user-centered digital experiences.",
    avatar: "/placeholder.svg?height=100&width=100&text=SJ",
  },
  {
    id: "2",
    type: "digital",
    name: "CodeAssist Pro",
    email: "codeassist@company.com",
    role: "Development Assistant",
    department: "Engineering",
    status: "active",
    joinedDate: new Date("2024-01-01"),
    lastActive: new Date(),
    jobDescription: "AI-powered coding assistant that helps with code review, debugging, and documentation generation.",
    workInstructions: [
      "Review pull requests for code quality and best practices",
      "Generate comprehensive documentation for new features",
      "Assist with debugging complex issues",
      "Provide code suggestions and optimizations",
    ],
    capabilities: ["Code Review", "Documentation Generation", "Debugging", "Code Optimization", "Testing"],
    knowledge: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "Git"],
    coreKnowledge: ["Company coding standards", "Architecture patterns", "Security guidelines"],
    version: "2",
    lastUpdated: new Date("2024-01-15"),
    isActive: true,
    avatar: "/placeholder.svg?height=100&width=100&text=CA",
  },
  {
    id: "3",
    type: "human",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    role: "Product Manager",
    department: "Product",
    status: "away",
    joinedDate: new Date("2022-08-20"),
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    timezone: "EST",
    skills: ["Product Strategy", "Agile", "Data Analysis", "User Stories", "Roadmapping"],
    bio: "Strategic product manager focused on driving user engagement and business growth.",
    avatar: "/placeholder.svg?height=100&width=100&text=MC",
  },
  {
    id: "4",
    type: "digital",
    name: "MarketingBot",
    email: "marketingbot@company.com",
    role: "Marketing Assistant",
    department: "Marketing",
    status: "active",
    joinedDate: new Date("2024-02-01"),
    lastActive: new Date(),
    jobDescription: "Specialized AI assistant for marketing campaigns, content creation, and social media management.",
    workInstructions: [
      "Create engaging social media content",
      "Analyze campaign performance metrics",
      "Generate marketing copy and headlines",
      "Schedule and manage social media posts",
    ],
    capabilities: [
      "Content Creation",
      "Social Media Management",
      "Analytics",
      "SEO Optimization",
      "Campaign Management",
    ],
    knowledge: ["Digital Marketing", "Social Media Platforms", "Content Strategy", "Analytics Tools"],
    coreKnowledge: ["Brand guidelines", "Target audience personas", "Marketing objectives"],
    version: "52",
    lastUpdated: new Date("2024-02-10"),
    isActive: true,
    avatar: "/placeholder.svg?height=100&width=100&text=MB",
  },
  {
    id: "5",
    type: "human",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    role: "UX Researcher",
    department: "Design",
    status: "inactive",
    joinedDate: new Date("2023-06-10"),
    lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    timezone: "CST",
    skills: ["User Research", "Usability Testing", "Data Analysis", "Survey Design", "Interview Techniques"],
    bio: "User researcher dedicated to understanding user needs and improving product experiences.",
    avatar: "/placeholder.svg?height=100&width=100&text=ER",
  },
]
