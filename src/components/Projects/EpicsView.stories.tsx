
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { EpicsView } from './EpicsView';

const meta: Meta<typeof EpicsView> = {
  title: 'Projects/Views/EpicsView',
  component: EpicsView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EpicsView>;

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
    isSelected: true,
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
];

const mockTasks = [
  {
    id: '1',
    title: 'Design login page',
    description: 'Create wireframes and mockups for the login interface',
    status: 'todo' as const,
    priority: 'high' as const,
    type: 'story' as const,
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
    status: 'review' as const,
    priority: 'high' as const,
    type: 'task' as const,
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
    status: 'todo' as const,
    priority: 'medium' as const,
    type: 'story' as const,
    points: 13,
    epicId: '2',
    sprintId: '2',
    assignee: 'Mike Johnson',
    createdAt: new Date('2024-01-17'),
  },
  {
    id: '4',
    title: 'Research mobile frameworks',
    description: 'Investigate best practices for mobile responsive design',
    status: 'in-progress' as const,
    priority: 'medium' as const,
    type: 'spike' as const,
    points: 5,
    epicId: '3',
    assignee: 'Alex Brown',
    createdAt: new Date('2024-01-18'),
  },
];

const mockSprints = [
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
    isSelected: true,
  },
];

export const Default: Story = {
  args: {
    tasks: mockTasks,
    epics: mockEpics,
    sprints: mockSprints,
    onUpdateTask: action('onUpdateTask'),
    onTaskClick: action('onTaskClick'),
    onAddTaskToEpic: action('onAddTaskToEpic'),
    onAddEpic: action('onAddEpic'),
    onUpdateEpic: action('onUpdateEpic'),
    onDeleteEpic: action('onDeleteEpic'),
  },
};

export const EmptyEpics: Story = {
  args: {
    tasks: [],
    epics: mockEpics,
    sprints: mockSprints,
    onUpdateTask: action('onUpdateTask'),
    onTaskClick: action('onTaskClick'),
    onAddTaskToEpic: action('onAddTaskToEpic'),
    onAddEpic: action('onAddEpic'),
    onUpdateEpic: action('onUpdateEpic'),
    onDeleteEpic: action('onDeleteEpic'),
  },
};

export const ManyTasks: Story = {
  args: {
    tasks: [
      ...mockTasks,
      ...mockTasks.map((task, index) => ({
        ...task,
        id: `${task.id}-${index}`,
        title: `${task.title} ${index + 1}`,
      })),
    ],
    epics: mockEpics,
    sprints: mockSprints,
    onUpdateTask: action('onUpdateTask'),
    onTaskClick: action('onTaskClick'),
    onAddTaskToEpic: action('onAddTaskToEpic'),
    onAddEpic: action('onAddEpic'),
    onUpdateEpic: action('onUpdateEpic'),
    onDeleteEpic: action('onDeleteEpic'),
  },
};
