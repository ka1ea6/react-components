
import type { Meta, StoryObj } from '@storybook/react';
import { KanbanColumn } from './KanbanColumn';
import { TaskCard } from './TaskCard';
import { mockEpics, mockTasks } from './test-data';

const meta: Meta<typeof KanbanColumn> = {
  title: 'Projects/KanbanColumn',
  component: KanbanColumn,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KanbanColumn>;

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
    children: (
      <div className="space-y-3">
        {mockTasks
          .filter(task => task.status === 'in-progress')
          .map(task => {
            const epic = mockEpics.find(e => e.id === task.epicId);
            return (
              <TaskCard
                key={task.id}
                task={task}
                epic={epic!}
                onDragStart={() => {}}
                onTaskClick={() => {}}
              />
            );
          })}
      </div>
    ),
  },
};

export const WithMultipleTasks: Story = {
  args: {
    title: 'To Do',
    status: 'todo',
    taskCount: 3,
    onDrop: () => {},
    children: (
      <div className="space-y-3">
        {mockTasks
          .filter(task => task.status === 'todo')
          .map(task => {
            const epic = mockEpics.find(e => e.id === task.epicId);
            return (
              <TaskCard
                key={task.id}
                task={task}
                epic={epic!}
                onDragStart={() => {}}
                onTaskClick={() => {}}
              />
            );
          })}
      </div>
    ),
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
