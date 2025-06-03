
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ManagementSidebar } from './ManagementSidebar';

const mockEpics = [
  { id: 'epic1', name: 'User Authentication', color: 'bg-blue-500', description: 'Secure login system', isSelected: true },
  { id: 'epic2', name: 'Dashboard Features', color: 'bg-green-500', description: 'Dashboard functionality', isSelected: true },
  { id: 'epic3', name: 'Mobile Optimization', color: 'bg-purple-500', description: 'Mobile responsive design', isSelected: false },
  { id: 'epic4', name: 'Performance Improvements', color: 'bg-orange-500', description: 'Speed enhancements', isSelected: true },
];

const mockSprints = [
  { id: 'backlog', name: 'Backlog', description: 'Tasks not assigned', startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31'), isActive: false, isSelected: false },
  { id: 'all-tasks', name: 'All Tasks', description: 'View all tasks', startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31'), isActive: false, isSelected: true },
  { id: 'sprint1', name: 'Sprint 1', description: 'Initial development', startDate: new Date('2024-01-01'), endDate: new Date('2024-01-14'), isActive: false, isSelected: false },
  { id: 'sprint2', name: 'Sprint 2', description: 'Feature development', startDate: new Date('2024-01-15'), endDate: new Date('2024-01-28'), isActive: true, isSelected: false },
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
      options: ['kanban', 'planning', 'documentation'],
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
    epics: mockEpics,
    sprints: mockSprints,
    currentView: 'kanban',
    mobileMenuOpen: false,
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
    epics: mockEpics,
    sprints: mockSprints,
    currentView: 'planning',
    mobileMenuOpen: false,
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
    epics: mockEpics,
    sprints: mockSprints,
    currentView: 'documentation',
    mobileMenuOpen: false,
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

export const MobileMenuOpen: Story = {
  args: {
    epics: mockEpics,
    sprints: mockSprints,
    currentView: 'kanban',
    mobileMenuOpen: true,
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
    epics: [
      ...mockEpics,
      { id: 'epic5', name: 'API Integration', color: 'bg-red-500', description: 'Third-party APIs', isSelected: false },
      { id: 'epic6', name: 'Security Enhancements', color: 'bg-yellow-500', description: 'Security improvements', isSelected: true },
      { id: 'epic7', name: 'User Experience', color: 'bg-pink-500', description: 'UX improvements', isSelected: false },
    ],
    sprints: [
      ...mockSprints,
      { id: 'sprint3', name: 'Sprint 3', description: 'Future development', startDate: new Date('2024-01-29'), endDate: new Date('2024-02-11'), isActive: false, isSelected: false },
      { id: 'sprint4', name: 'Sprint 4', description: 'Planning phase', startDate: new Date('2024-02-12'), endDate: new Date('2024-02-25'), isActive: false, isSelected: false },
    ],
    currentView: 'kanban',
    mobileMenuOpen: false,
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
