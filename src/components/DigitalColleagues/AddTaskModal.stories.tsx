
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { AddTaskModal } from './AddTaskModal';

const mockEpics = [
  { id: 'epic1', name: 'User Authentication', color: 'bg-blue-500', description: 'Secure login system' },
  { id: 'epic2', name: 'Dashboard Features', color: 'bg-green-500', description: 'Dashboard functionality' },
  { id: 'epic3', name: 'Mobile Optimization', color: 'bg-purple-500', description: 'Mobile responsive design' },
];

const mockSprints = [
  { id: 'backlog', name: 'Backlog', description: 'Tasks not assigned', startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31'), isActive: false },
  { id: 'sprint1', name: 'Sprint 1', description: 'Current sprint', startDate: new Date('2024-01-01'), endDate: new Date('2024-01-14'), isActive: true },
  { id: 'sprint2', name: 'Sprint 2', description: 'Next sprint', startDate: new Date('2024-01-15'), endDate: new Date('2024-01-28'), isActive: false },
];

const meta: Meta<typeof AddTaskModal> = {
  title: 'Digital Colleagues/AddTaskModal',
  component: AddTaskModal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    onClose: {
      action: 'modal closed',
      description: 'Function called when modal is closed',
    },
    onAddTask: {
      action: 'task added',
      description: 'Function called when task is added',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddTaskModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    epics: mockEpics,
    sprints: mockSprints,
    onClose: action('onClose'),
    onAddTask: action('onAddTask'),
  },
};

export const WithManyEpics: Story = {
  args: {
    isOpen: true,
    epics: [
      ...mockEpics,
      { id: 'epic4', name: 'API Integration', color: 'bg-orange-500', description: 'Third-party APIs' },
      { id: 'epic5', name: 'Performance', color: 'bg-red-500', description: 'Speed improvements' },
      { id: 'epic6', name: 'Security', color: 'bg-yellow-500', description: 'Security enhancements' },
    ],
    sprints: mockSprints,
    onClose: action('onClose'),
    onAddTask: action('onAddTask'),
  },
};

export const WithManySprints: Story = {
  args: {
    isOpen: true,
    epics: mockEpics,
    sprints: [
      ...mockSprints,
      { id: 'sprint3', name: 'Sprint 3', description: 'Future sprint', startDate: new Date('2024-01-29'), endDate: new Date('2024-02-11'), isActive: false },
      { id: 'sprint4', name: 'Sprint 4', description: 'Planning phase', startDate: new Date('2024-02-12'), endDate: new Date('2024-02-25'), isActive: false },
    ],
    onClose: action('onClose'),
    onAddTask: action('onAddTask'),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    epics: mockEpics,
    sprints: mockSprints,
    onClose: action('onClose'),
    onAddTask: action('onAddTask'),
  },
};
