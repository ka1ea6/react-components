import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ManagementSidebar } from './ManagementSidebar';

const mockEpics = [
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
  {
    id: '2',
    name: 'Dashboard Features', 
    color: 'bg-green-500',
    description: 'Build comprehensive dashboard functionality',
    confidence: 'medium' as const,
    phase: 1,
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-03-15'),
    progress: 30,
    isSelected: false,
  },
  {
    id: '3',
    name: 'Mobile Optimization',
    color: 'bg-purple-500', 
    description: 'Optimize application for mobile devices',
    confidence: 'low' as const,
    phase: 3,
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
    confidence: 'high' as const,
    phase: 2,
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-02-28'),
    progress: 90,
    isSelected: false,
  },
  {
    id: '5',
    name: 'Security Enhancements',
    color: 'bg-red-500',
    description: 'Implement additional security measures',
    confidence: 'medium' as const,
    phase: 1,
    startDate: new Date('2024-04-01'),
    endDate: new Date('2024-05-15'),
    progress: 0,
    isSelected: true,
  },
  {
    id: '6',
    name: 'API Integration',
    color: 'bg-yellow-500',
    description: 'Connect with external APIs',
    confidence: 'low' as const,
    phase: 2,
    startDate: new Date('2024-05-01'),
    endDate: new Date('2024-06-15'),
    progress: 25,
    isSelected: false,
  },
];

const mockSprints = [
  { id: 'backlog', name: 'Backlog', description: 'Tasks not assigned', startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31'), isActive: false, isSelected: false },
  { id: 'all-tasks', name: 'All Tasks', description: 'View all tasks', startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31'), isActive: false, isSelected: true },
  { id: 'sprint1', name: 'Sprint 1', description: 'Initial development', startDate: new Date('2024-01-01'), endDate: new Date('2024-01-14'), isActive: false, isSelected: false },
  { id: 'sprint2', name: 'Sprint 2', description: 'Feature development', startDate: new Date('2024-01-15'), endDate: new Date('2024-01-28'), isActive: true, isSelected: false },
];

const mockProjects = [
  { id: 'project1', name: 'Main Application', description: 'Core application development', isSelected: true },
  { id: 'project2', name: 'Mobile App', description: 'Mobile application project', isSelected: false },
];

const meta: Meta<typeof ManagementSidebar> = {
  title: 'Digital Colleagues/ManagementSidebar',
  component: ManagementSidebar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    currentView: {
      control: { type: 'select' },
      options: ['kanban', 'planning', 'documentation', 'epics'],
    },
    mobileMenuOpen: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ManagementSidebar>;

export const KanbanView: Story = {
  args: {
    projects: mockProjects,
    epics: mockEpics,
    sprints: mockSprints,
    currentView: 'kanban',
    mobileMenuOpen: false,
    onUpdateProject: action('onUpdateProject'),
    onDeleteProject: action('onDeleteProject'),
    onAddProject: action('onAddProject'),
    onUpdateEpic: action('onUpdateEpic'),
    onDeleteEpic: action('onDeleteEpic'),
    onAddEpic: action('onAddEpic'),
    onAddSprint: action('onAddSprint'),
    onUpdateSprint: action('onUpdateSprint'),
    onDeleteSprint: action('onDeleteSprint'),
    onViewChange: action('onViewChange'),
    onToggleMobileMenu: action('onToggleMobileMenu'),
    children: <div className="p-8 bg-gray-50 h-full">Main content area</div>,
  },
};

export const PlanningView: Story = {
  args: {
    projects: mockProjects,
    epics: mockEpics,
    sprints: mockSprints,
    currentView: 'planning',
    mobileMenuOpen: false,
    onUpdateProject: action('onUpdateProject'),
    onDeleteProject: action('onDeleteProject'),
    onAddProject: action('onAddProject'),
    onUpdateEpic: action('onUpdateEpic'),
    onDeleteEpic: action('onDeleteEpic'),
    onAddEpic: action('onAddEpic'),
    onAddSprint: action('onAddSprint'),
    onUpdateSprint: action('onUpdateSprint'),
    onDeleteSprint: action('onDeleteSprint'),
    onViewChange: action('onViewChange'),
    onToggleMobileMenu: action('onToggleMobileMenu'),
    children: <div className="p-8 bg-gray-50 h-full">Planning view content</div>,
  },
};

export const DocumentationView: Story = {
  args: {
    projects: mockProjects,
    epics: mockEpics,
    sprints: mockSprints,
    currentView: 'documentation',
    mobileMenuOpen: false,
    onUpdateProject: action('onUpdateProject'),
    onDeleteProject: action('onDeleteProject'),
    onAddProject: action('onAddProject'),
    onUpdateEpic: action('onUpdateEpic'),
    onDeleteEpic: action('onDeleteEpic'),
    onAddEpic: action('onAddEpic'),
    onAddSprint: action('onAddSprint'),
    onUpdateSprint: action('onUpdateSprint'),
    onDeleteSprint: action('onDeleteSprint'),
    onViewChange: action('onViewChange'),
    onToggleMobileMenu: action('onToggleMobileMenu'),
    children: <div className="p-8 bg-gray-50 h-full">Documentation content</div>,
  },
};

export const EpicsView: Story = {
  args: {
    projects: mockProjects,
    epics: mockEpics,
    sprints: mockSprints,
    currentView: 'epics',
    mobileMenuOpen: false,
    onUpdateProject: action('onUpdateProject'),
    onDeleteProject: action('onDeleteProject'),
    onAddProject: action('onAddProject'),
    onUpdateEpic: action('onUpdateEpic'),
    onDeleteEpic: action('onDeleteEpic'),
    onAddEpic: action('onAddEpic'),
    onAddSprint: action('onAddSprint'),
    onUpdateSprint: action('onUpdateSprint'),
    onDeleteSprint: action('onDeleteSprint'),
    onViewChange: action('onViewChange'),
    onToggleMobileMenu: action('onToggleMobileMenu'),
    children: <div className="p-8 bg-gray-50 h-full">Epic planning content</div>,
  },
};

export const MobileMenuOpen: Story = {
  args: {
    projects: mockProjects,
    epics: mockEpics,
    sprints: mockSprints,
    currentView: 'kanban',
    mobileMenuOpen: true,
    onUpdateProject: action('onUpdateProject'),
    onDeleteProject: action('onDeleteProject'),
    onAddProject: action('onAddProject'),
    onUpdateEpic: action('onUpdateEpic'),
    onDeleteEpic: action('onDeleteEpic'),
    onAddEpic: action('onAddEpic'),
    onAddSprint: action('onAddSprint'),
    onUpdateSprint: action('onUpdateSprint'),
    onDeleteSprint: action('onDeleteSprint'),
    onViewChange: action('onViewChange'),
    onToggleMobileMenu: action('onToggleMobileMenu'),
    children: <div className="p-8 bg-gray-50 h-full">Main content with mobile menu open</div>,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const ManyEpicsAndSprints: Story = {
  args: {
    projects: mockProjects,
    epics: [
      ...mockEpics,
      { 
        id: 'epic5', 
        name: 'API Integration', 
        color: 'bg-red-500', 
        description: 'Third-party APIs', 
        isSelected: false,
        confidence: 'medium' as const,
        phase: 1,
        startDate: new Date('2024-02-15'),
        endDate: new Date('2024-03-30'),
        progress: 40
      },
      { 
        id: 'epic6', 
        name: 'Security Enhancements', 
        color: 'bg-yellow-500', 
        description: 'Security improvements', 
        isSelected: true,
        confidence: 'high' as const,
        phase: 4,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-31'),
        progress: 100
      },
      { 
        id: 'epic7', 
        name: 'User Experience', 
        color: 'bg-pink-500', 
        description: 'UX improvements', 
        isSelected: false,
        confidence: 'low' as const,
        phase: 1,
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-05-15'),
        progress: 5
      },
    ],
    sprints: [
      ...mockSprints,
      { id: 'sprint3', name: 'Sprint 3', description: 'Future development', startDate: new Date('2024-01-29'), endDate: new Date('2024-02-11'), isActive: false, isSelected: false },
      { id: 'sprint4', name: 'Sprint 4', description: 'Planning phase', startDate: new Date('2024-02-12'), endDate: new Date('2024-02-25'), isActive: false, isSelected: false },
    ],
    currentView: 'kanban',
    mobileMenuOpen: false,
    onUpdateProject: action('onUpdateProject'),
    onDeleteProject: action('onDeleteProject'),
    onAddProject: action('onAddProject'),
    onUpdateEpic: action('onUpdateEpic'),
    onDeleteEpic: action('onDeleteEpic'),
    onAddEpic: action('onAddEpic'),
    onAddSprint: action('onAddSprint'),
    onUpdateSprint: action('onUpdateSprint'),
    onDeleteSprint: action('onDeleteSprint'),
    onViewChange: action('onViewChange'),
    onToggleMobileMenu: action('onToggleMobileMenu'),
    children: <div className="p-8 bg-gray-50 h-full">Content with many epics and sprints</div>,
  },
};
