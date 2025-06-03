
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { PlanningView } from './PlanningView';

const mockEpics = [
  { id: 'epic1', name: 'User Authentication', color: 'bg-blue-500', description: 'Secure login system' },
  { id: 'epic2', name: 'Dashboard Features', color: 'bg-green-500', description: 'Dashboard functionality' },
  { id: 'epic3', name: 'Mobile Optimization', color: 'bg-purple-500', description: 'Mobile responsive design' },
];

const mockSprints = [
  { id: 'backlog', name: 'Backlog', description: 'Tasks not assigned', startDate: new Date('2024-01-01'), endDate: new Date('2024-12-31'), isActive: false },
  { id: 'sprint1', name: 'Sprint 1', description: 'Initial development', startDate: new Date('2024-01-01'), endDate: new Date('2024-01-14'), isActive: false },
  { id: 'sprint2', name: 'Sprint 2', description: 'Feature development', startDate: new Date('2024-01-15'), endDate: new Date('2024-01-28'), isActive: true },
];

const mockTasks = [
  {
    id: '1',
    title: 'Design login page',
    description: 'Create wireframes and mockups for the login interface',
    status: 'todo' as const,
    priority: 'high' as const,
    type: 'story' as const,
    epicId: 'epic1',
    sprintId: 'sprint2',
    assignee: 'John Doe',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Implement OAuth integration',
    description: 'Add Google and GitHub OAuth authentication',
    status: 'in-progress' as const,
    priority: 'high' as const,
    type: 'task' as const,
    epicId: 'epic1',
    sprintId: 'sprint2',
    assignee: 'Jane Smith',
    createdAt: new Date('2024-01-16'),
  },
  {
    id: '3',
    title: 'Create dashboard widgets',
    description: 'Build analytics and metrics widgets',
    status: 'todo' as const,
    priority: 'medium' as const,
    type: 'story' as const,
    epicId: 'epic2',
    sprintId: 'sprint1',
    assignee: 'Mike Johnson',
    createdAt: new Date('2024-01-17'),
  },
  {
    id: '4',
    title: 'Fix login redirect bug',
    description: 'Resolve issue where users are not redirected after login',
    status: 'done' as const,
    priority: 'high' as const,
    type: 'bug' as const,
    epicId: 'epic1',
    assignee: 'Sarah Wilson',
    createdAt: new Date('2024-01-14'),
  },
];

const meta: Meta<typeof PlanningView> = {
  title: 'Digital Colleagues/PlanningView',
  component: PlanningView,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onUpdateTask: {
      action: 'task updated',
      description: 'Function called when task is updated',
    },
    onTaskClick: {
      action: 'task clicked',
      description: 'Function called when task is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PlanningView>;

export const Default: Story = {
  args: {
    tasks: mockTasks,
    epics: mockEpics,
    sprints: mockSprints,
    onUpdateTask: action('onUpdateTask'),
    onTaskClick: action('onTaskClick'),
  },
};

export const WithManyTasks: Story = {
  args: {
    tasks: [
      ...mockTasks,
      {
        id: '5',
        title: 'Research mobile frameworks',
        description: 'Investigate best practices for mobile responsive design',
        status: 'review' as const,
        priority: 'medium' as const,
        type: 'spike' as const,
        epicId: 'epic3',
        sprintId: 'sprint2',
        assignee: 'Alex Brown',
        createdAt: new Date('2024-01-18'),
      },
      {
        id: '6',
        title: 'Update user profile page',
        description: 'Enhance user profile with new settings and preferences',
        status: 'in-progress' as const,
        priority: 'low' as const,
        type: 'story' as const,
        epicId: 'epic2',
        assignee: 'Emma Davis',
        createdAt: new Date('2024-01-19'),
      },
    ],
    epics: mockEpics,
    sprints: mockSprints,
    onUpdateTask: action('onUpdateTask'),
    onTaskClick: action('onTaskClick'),
  },
};

export const EmptyState: Story = {
  args: {
    tasks: [],
    epics: mockEpics,
    sprints: mockSprints,
    onUpdateTask: action('onUpdateTask'),
    onTaskClick: action('onTaskClick'),
  },
};

export const SingleSprint: Story = {
  args: {
    tasks: mockTasks.filter(task => task.sprintId === 'sprint2'),
    epics: mockEpics,
    sprints: mockSprints.filter(sprint => sprint.id === 'sprint2'),
    onUpdateTask: action('onUpdateTask'),
    onTaskClick: action('onTaskClick'),
  },
};
