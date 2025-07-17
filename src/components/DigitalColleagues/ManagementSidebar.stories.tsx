import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ManagementSidebar } from './ManagementSidebar';
import { mockEpics, mockSprints, mockProjects } from './test-data';

// Additional epics for more variety in ManagementSidebar
const extendedEpics = [
  ...mockEpics,
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
    epics: extendedEpics,
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
    epics: extendedEpics,
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
      ...extendedEpics,
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
      { id: '3', name: 'Sprint 3', description: 'Future development', startDate: new Date('2024-01-29'), endDate: new Date('2024-02-11'), isActive: false, isSelected: false },
      { id: '4', name: 'Sprint 4', description: 'Planning phase', startDate: new Date('2024-02-12'), endDate: new Date('2024-02-25'), isActive: false, isSelected: false },
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
