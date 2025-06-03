
import type { Meta, StoryObj } from '@storybook/react';
import { TaskSidebar } from './TaskSidebar';
import { Task, Epic } from './KanbanBoard';

const meta: Meta<typeof TaskSidebar> = {
  title: 'Digital Colleagues/TaskSidebar',
  component: TaskSidebar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TaskSidebar>;

const mockTask: Task = {
  id: '1',
  title: 'Design login page',
  description: 'Create wireframes and mockups for the login interface',
  status: 'in-progress',
  priority: 'high',
  type: 'story',
  assignee: 'John Doe',
  epicId: '1',
  createdAt: new Date('2024-01-15'),
};

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

const mockEpics: Epic[] = [
  {
    id: '1',
    name: 'User Authentication',
    color: 'bg-blue-500',
    description: 'Implement secure user authentication system',
  },
  {
    id: '2',
    name: 'Dashboard Features',
    color: 'bg-green-500',
    description: 'Build comprehensive dashboard functionality',
  },
];

export const Default: Story = {
  args: {
    task: mockTask,
    epics: mockEpics,
    sprints: mockSprints,
    lastUpdated: new Date(),
    onUpdateTask: () => {},
    onClose: () => {},
    onDelete: () => {},
  },
};

export const HighPriorityBug: Story = {
  args: {
    task: {
      ...mockTask,
      type: 'bug',
      priority: 'high',
      title: 'Fix login redirect bug',
      description: 'Users are not being redirected after successful login',
    },
    epics: mockEpics,
    sprints: mockSprints,
    lastUpdated: new Date(),
    onUpdateTask: () => {},
    onClose: () => {},
    onDelete: () => {},
  },
};
