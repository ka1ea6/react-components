
import type { Meta, StoryObj } from '@storybook/react';
import { KanbanColumn } from './KanbanColumn';
import { TaskCard } from './TaskCard';
import { Task, Epic } from './KanbanBoard';

const meta: Meta<typeof KanbanColumn> = {
  title: 'Digital Colleagues/KanbanColumn',
  component: KanbanColumn,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['todo', 'in-progress', 'review', 'done'],
    },
    isCompact: {
      control: 'boolean',
    },
    taskCount: {
      control: { type: 'number', min: 0, max: 50 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof KanbanColumn>;

const mockEpic: Epic = {
  id: '1',
  name: 'User Authentication',
  color: 'bg-blue-500',
  description: 'Implement secure user authentication system',
};

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design login page',
    description: 'Create wireframes and mockups for the login interface',
    status: 'todo',
    priority: 'high',
    type: 'story',
    assignee: 'John Doe',
    epicId: '1',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Implement OAuth integration',
    description: 'Add Google and GitHub OAuth authentication',
    status: 'todo',
    priority: 'medium',
    type: 'task',
    assignee: 'Jane Smith',
    epicId: '1',
    createdAt: new Date('2024-01-16'),
  },
  {
    id: '3',
    title: 'Fix critical security vulnerability',
    description: 'Address SQL injection vulnerability in user input validation',
    status: 'todo',
    priority: 'high',
    type: 'bug',
    assignee: 'Bob Wilson',
    epicId: '1',
    createdAt: new Date('2024-01-17'),
  },
];

export const EmptyTodoColumn: Story = {
  args: {
    title: 'To Do',
    status: 'todo',
    taskCount: 0,
    onDrop: () => {},
    children: <div className="text-gray-500 text-sm text-center py-8">No tasks</div>,
  },
};

export const TodoColumnWithTasks: Story = {
  args: {
    title: 'To Do',
    status: 'todo',
    taskCount: 3,
    onDrop: () => {},
    children: (
      <div className="space-y-3">
        {mockTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            epic={mockEpic}
            onDragStart={() => {}}
            onTaskClick={() => {}}
          />
        ))}
      </div>
    ),
  },
};

export const InProgressColumn: Story = {
  args: {
    title: 'In Progress',
    status: 'in-progress',
    taskCount: 2,
    onDrop: () => {},
    children: (
      <div className="space-y-3">
        <TaskCard
          task={{
            ...mockTasks[0],
            status: 'in-progress',
            type: 'bug',
            priority: 'high',
          }}
          epic={mockEpic}
          onDragStart={() => {}}
          onTaskClick={() => {}}
        />
        <TaskCard
          task={{
            ...mockTasks[1],
            status: 'in-progress',
            type: 'story',
            priority: 'medium',
          }}
          epic={mockEpic}
          onDragStart={() => {}}
          onTaskClick={() => {}}
        />
      </div>
    ),
  },
};

export const ReviewColumn: Story = {
  args: {
    title: 'Review',
    status: 'review',
    taskCount: 1,
    onDrop: () => {},
    children: (
      <TaskCard
        task={{
          ...mockTasks[2],
          status: 'review',
          type: 'spike',
          priority: 'low',
        }}
        epic={mockEpic}
        onDragStart={() => {}}
        onTaskClick={() => {}}
      />
    ),
  },
};

export const DoneColumnCompact: Story = {
  args: {
    title: 'Done',
    status: 'done',
    taskCount: 5,
    isCompact: true,
    onDrop: () => {},
    children: (
      <div className="space-y-3">
        {mockTasks.map(task => (
          <TaskCard
            key={task.id}
            task={{
              ...task,
              status: 'done',
            }}
            epic={mockEpic}
            onDragStart={() => {}}
            onTaskClick={() => {}}
            isCompact={true}
          />
        ))}
      </div>
    ),
  },
};

export const DoneColumnRegular: Story = {
  args: {
    title: 'Done',
    status: 'done',
    taskCount: 2,
    onDrop: () => {},
    children: (
      <div className="space-y-3">
        <TaskCard
          task={{
            ...mockTasks[0],
            status: 'done',
          }}
          epic={mockEpic}
          onDragStart={() => {}}
          onTaskClick={() => {}}
        />
        <TaskCard
          task={{
            ...mockTasks[1],
            status: 'done',
          }}
          epic={mockEpic}
          onDragStart={() => {}}
          onTaskClick={() => {}}
        />
      </div>
    ),
  },
};

export const HighTaskCountColumn: Story = {
  args: {
    title: 'Backlog',
    status: 'todo',
    taskCount: 25,
    onDrop: () => {},
    children: (
      <div className="space-y-3">
        {Array.from({ length: 8 }, (_, i) => (
          <TaskCard
            key={i}
            task={{
              ...mockTasks[i % mockTasks.length],
              id: `task-${i}`,
              title: `Task ${i + 1}: ${mockTasks[i % mockTasks.length].title}`,
            }}
            epic={mockEpic}
            onDragStart={() => {}}
            onTaskClick={() => {}}
          />
        ))}
        <div className="text-center text-sm text-gray-500 py-2">
          + 17 more tasks
        </div>
      </div>
    ),
  },
};

export const AllColumnTypes: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <KanbanColumn
        title="To Do"
        status="todo"
        taskCount={3}
        onDrop={() => {}}
      >
        <TaskCard
          task={mockTasks[0]}
          epic={mockEpic}
          onDragStart={() => {}}
          onTaskClick={() => {}}
        />
      </KanbanColumn>
      <KanbanColumn
        title="In Progress"
        status="in-progress"
        taskCount={2}
        onDrop={() => {}}
      >
        <TaskCard
          task={{ ...mockTasks[1], status: 'in-progress' }}
          epic={mockEpic}
          onDragStart={() => {}}
          onTaskClick={() => {}}
        />
      </KanbanColumn>
      <KanbanColumn
        title="Review"
        status="review"
        taskCount={1}
        onDrop={() => {}}
      >
        <TaskCard
          task={{ ...mockTasks[2], status: 'review' }}
          epic={mockEpic}
          onDragStart={() => {}}
          onTaskClick={() => {}}
        />
      </KanbanColumn>
      <KanbanColumn
        title="Done"
        status="done"
        taskCount={5}
        isCompact={true}
        onDrop={() => {}}
      >
        <TaskCard
          task={{ ...mockTasks[0], status: 'done' }}
          epic={mockEpic}
          onDragStart={() => {}}
          onTaskClick={() => {}}
          isCompact={true}
        />
      </KanbanColumn>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
