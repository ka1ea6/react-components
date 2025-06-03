
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TaskDetailsModal } from './TaskDetailsModal';

const mockTask = {
  id: '1',
  title: 'Design user authentication system',
  description: 'Create wireframes and mockups for the login interface with multi-factor authentication support',
  status: 'in-progress' as const,
  priority: 'high' as const,
  type: 'story' as const,
  epicId: 'epic1',
  sprintId: 'sprint1',
  assignee: 'John Doe',
  createdAt: new Date('2024-01-15'),
};

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

const meta: Meta<typeof TaskDetailsModal> = {
  title: 'Digital Colleagues/TaskDetailsModal',
  component: TaskDetailsModal,
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
    onUpdateTask: {
      action: 'task updated',
      description: 'Function called when task is updated',
    },
    onDeleteTask: {
      action: 'task deleted',
      description: 'Function called when task is deleted',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TaskDetailsModal>;

export const HighPriorityStory: Story = {
  args: {
    isOpen: true,
    task: mockTask,
    epics: mockEpics,
    sprints: mockSprints,
    onClose: action('onClose'),
    onUpdateTask: action('onUpdateTask'),
    onDeleteTask: action('onDeleteTask'),
  },
};

export const BugTask: Story = {
  args: {
    isOpen: true,
    task: {
      ...mockTask,
      id: '2',
      title: 'Fix critical security vulnerability',
      description: 'Address SQL injection vulnerability in user input validation that could expose sensitive data',
      type: 'bug',
      priority: 'high',
      status: 'todo',
    },
    epics: mockEpics,
    sprints: mockSprints,
    onClose: action('onClose'),
    onUpdateTask: action('onUpdateTask'),
    onDeleteTask: action('onDeleteTask'),
  },
};

export const LowPriorityTask: Story = {
  args: {
    isOpen: true,
    task: {
      ...mockTask,
      id: '3',
      title: 'Update documentation',
      description: 'Refresh API documentation with latest changes and examples',
      type: 'task',
      priority: 'low',
      status: 'done',
    },
    epics: mockEpics,
    sprints: mockSprints,
    onClose: action('onClose'),
    onUpdateTask: action('onUpdateTask'),
    onDeleteTask: action('onDeleteTask'),
  },
};

export const SpikeTask: Story = {
  args: {
    isOpen: true,
    task: {
      ...mockTask,
      id: '4',
      title: 'Research authentication providers',
      description: 'Investigate options for additional OAuth providers like Microsoft and Apple',
      type: 'spike',
      priority: 'medium',
      status: 'review',
    },
    epics: mockEpics,
    sprints: mockSprints,
    onClose: action('onClose'),
    onUpdateTask: action('onUpdateTask'),
    onDeleteTask: action('onDeleteTask'),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    task: mockTask,
    epics: mockEpics,
    sprints: mockSprints,
    onClose: action('onClose'),
    onUpdateTask: action('onUpdateTask'),
    onDeleteTask: action('onDeleteTask'),
  },
};
