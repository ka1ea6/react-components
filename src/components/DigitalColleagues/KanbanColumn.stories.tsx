
import type { Meta, StoryObj } from '@storybook/react';
import { KanbanColumn } from './KanbanColumn';

const meta: Meta<typeof KanbanColumn> = {
  title: 'Digital Colleagues/KanbanColumn',
  component: KanbanColumn,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KanbanColumn>;

const mockEpic = {
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
};

const mockTask = {
  id: '1',
  title: 'Design login page',
  description: 'Create wireframes and mockups for the login interface',
  status: 'todo' as const,
  priority: 'high' as const,
  type: 'story' as const,
  assignee: 'John Doe',
  epicId: '1',
  createdAt: new Date('2024-01-15'),
  points: 5,
};

export const Default: Story = {
  args: {
    title: 'To Do',
    status: 'todo',
    taskCount: 3,
    onDrop: () => {},
    children: null,
  },
};

export const WithTasks: Story = {
  args: {
    title: 'In Progress',
    status: 'in-progress',
    taskCount: 2,
    onDrop: () => {},
    children: null,
  },
};

export const Empty: Story = {
  args: {
    title: 'Done',
    status: 'done',
    taskCount: 0,
    onDrop: () => {},
    children: null,
  },
};

export const Compact: Story = {
  args: {
    title: 'Done',
    status: 'done',
    taskCount: 5,
    onDrop: () => {},
    isCompact: true,
    children: null,
  },
};
