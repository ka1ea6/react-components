
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TaskCard } from './TaskCard';

const meta: Meta<typeof TaskCard> = {
  title: 'Digital Colleagues/TaskCard',
  component: TaskCard,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    onDragStart: { action: 'drag started' },
    onTaskClick: { action: 'task clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof TaskCard>;

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

export const HighPriorityStory: Story = {
  args: {
    task: {
      id: '1',
      title: 'Design user authentication system',
      description: 'Create wireframes and mockups for the login interface with multi-factor authentication support',
      status: 'in-progress',
      priority: 'high',
      type: 'story',
      assignee: 'John Doe',
      epicId: '1',
      points: 8,
      createdAt: new Date('2024-01-15'),
    },
    epic: mockEpic,
    onDragStart: action('onDragStart'),
    onTaskClick: action('onTaskClick'),
    isCompact: false,
  },
};

export const MediumPriorityTask: Story = {
  args: {
    task: {
      id: '2',
      title: 'Implement user registration',
      description: 'Build the registration form with validation',
      status: 'todo',
      priority: 'medium',
      type: 'task',
      assignee: 'Jane Smith',
      epicId: '1',
      points: 5,
      createdAt: new Date('2024-01-16'),
    },
    epic: mockEpic,
    onDragStart: action('onDragStart'),
    onTaskClick: action('onTaskClick'),
    isCompact: false,
  },
};

export const LowPriorityBug: Story = {
  args: {
    task: {
      id: '3',
      title: 'Fix login button alignment',
      description: 'Button is slightly off-center on mobile devices',
      status: 'done',
      priority: 'low',
      type: 'bug',
      assignee: 'Mike Johnson',
      epicId: '1',
      points: 2,
      createdAt: new Date('2024-01-17'),
    },
    epic: mockEpic,
    onDragStart: action('onDragStart'),
    onTaskClick: action('onTaskClick'),
    isCompact: false,
  },
};

export const SpikeTask: Story = {
  args: {
    task: {
      id: '4',
      title: 'Research OAuth providers',
      description: 'Investigate different OAuth integration options',
      status: 'review',
      priority: 'medium',
      type: 'spike',
      assignee: 'Alex Brown',
      epicId: '1',
      points: 3,
      createdAt: new Date('2024-01-18'),
    },
    epic: mockEpic,
    onDragStart: action('onDragStart'),
    onTaskClick: action('onTaskClick'),
    isCompact: false,
  },
};

export const CompactView: Story = {
  args: {
    task: {
      id: '5',
      title: 'Update user profile page',
      description: 'Add new fields and improve layout',
      status: 'in-progress',
      priority: 'high',
      type: 'story',
      assignee: 'Sarah Wilson',
      epicId: '1',
      points: 8,
      createdAt: new Date('2024-01-19'),
    },
    epic: mockEpic,
    onDragStart: action('onDragStart'),
    onTaskClick: action('onTaskClick'),
    isCompact: true,
  },
};

export const CompletedBug: Story = {
  args: {
    task: {
      id: '6',
      title: 'Fix security vulnerability',
      description: 'Patch critical security issue in authentication',
      status: 'done',
      priority: 'high',
      type: 'bug',
      assignee: 'Emma Davis',
      epicId: '1',
      points: 5,
      createdAt: new Date('2024-01-20'),
    },
    epic: mockEpic,
    onDragStart: action('onDragStart'),
    onTaskClick: action('onTaskClick'),
    isCompact: false,
  },
};

export const CompletedTask: Story = {
  args: {
    task: {
      id: '7',
      title: 'Set up monitoring',
      description: 'Configure application monitoring and alerts',
      status: 'done',
      priority: 'medium',
      type: 'task',
      assignee: 'Tom Wilson',
      epicId: '1',
      points: 4,
      createdAt: new Date('2024-01-21'),
    },
    epic: mockEpic,
    onDragStart: action('onDragStart'),
    onTaskClick: action('onTaskClick'),
    isCompact: false,
  },
};

export const CompletedStory: Story = {
  args: {
    task: {
      id: '8',
      title: 'Create user dashboard',
      description: 'Build main dashboard interface for users',
      status: 'done',
      priority: 'low',
      type: 'task',
      assignee: 'Lisa Chen',
      epicId: '1',
      points: 13,
      createdAt: new Date('2024-01-22'),
    },
    epic: mockEpic,
    onDragStart: action('onDragStart'),
    onTaskClick: action('onTaskClick'),
    isCompact: false,
  },
};

// Multiple tasks example
export const MultipleTasksInColumn: Story = {
  render: () => (
    <div className="space-y-3 w-80">
      <TaskCard
        task={{
          id: '1',
          title: 'Design login interface',
          description: 'Create wireframes and mockups',
          status: 'todo',
          priority: 'high',
          type: 'story',
          assignee: 'John Doe',
          epicId: '1',
          points: 8,
          createdAt: new Date('2024-01-15'),
        }}
        epic={mockEpic}
        onDragStart={action('onDragStart')}
        onTaskClick={action('onTaskClick')}
        isCompact={false}
      />
      <TaskCard
        task={{
          id: '2',
          title: 'Implement authentication',
          description: 'Build backend authentication system',
          status: 'in-progress',
          priority: 'medium',
          type: 'task',
          assignee: 'Jane Smith',
          epicId: '1',
          points: 13,
          createdAt: new Date('2024-01-16'),
        }}
        epic={mockEpic}
        onDragStart={action('onDragStart')}
        onTaskClick={action('onTaskClick')}
        isCompact={false}
      />
      <TaskCard
        task={{
          id: '3',
          title: 'Fix login redirect bug',
          description: 'Users not redirected after successful login',
          status: 'review',
          priority: 'high',
          type: 'bug',
          assignee: 'Mike Johnson',
          epicId: '1',
          points: 3,
          createdAt: new Date('2024-01-17'),
        }}
        epic={mockEpic}
        onDragStart={action('onDragStart')}
        onTaskClick={action('onTaskClick')}
        isCompact={false}
      />
      <TaskCard
        task={{
          id: '4',
          title: 'Research OAuth options',
          description: 'Investigate third-party OAuth providers',
          status: 'done',
          priority: 'low',
          type: 'spike',
          assignee: 'Alex Brown',
          epicId: '1',
          points: 2,
          createdAt: new Date('2024-01-18'),
        }}
        epic={mockEpic}
        onDragStart={action('onDragStart')}
        onTaskClick={action('onTaskClick')}
        isCompact={false}
      />
    </div>
  ),
};

// Compact view showcase
export const CompactViewShowcase: Story = {
  render: () => (
    <div className="space-y-2 w-80">
      <TaskCard
        task={{
          id: '1',
          title: 'Critical security patch',
          description: 'Emergency fix for authentication vulnerability',
          status: 'in-progress',
          priority: 'high',
          type: 'bug',
          assignee: 'John Doe',
          epicId: '1',
          points: 5,
          createdAt: new Date('2024-01-15'),
        }}
        epic={mockEpic}
        onDragStart={action('onDragStart')}
        onTaskClick={action('onTaskClick')}
        isCompact={true}
      />
      <TaskCard
        task={{
          id: '2',
          title: 'Update documentation',
          description: 'Refresh API documentation with latest changes',
          status: 'todo',
          priority: 'medium',
          type: 'story',
          assignee: 'Jane Smith',
          epicId: '1',
          points: 3,
          createdAt: new Date('2024-01-16'),
        }}
        epic={mockEpic}
        onDragStart={action('onDragStart')}
        onTaskClick={action('onTaskClick')}
        isCompact={true}
      />
      <TaskCard
        task={{
          id: '3',
          title: 'Performance optimization',
          description: 'Improve page load times',
          status: 'done',
          priority: 'low',
          type: 'task',
          assignee: 'Mike Johnson',
          epicId: '1',
          points: 8,
          createdAt: new Date('2024-01-17'),
        }}
        epic={mockEpic}
        onDragStart={action('onDragStart')}
        onTaskClick={action('onTaskClick')}
        isCompact={true}
      />
    </div>
  ),
};

// Different epic colors
export const DifferentEpicColors: Story = {
  render: () => (
    <div className="space-y-3 w-80">
      <TaskCard
        task={{
          id: '1',
          title: 'Blue epic task',
          description: 'Task from blue colored epic',
          status: 'in-progress',
          priority: 'high',
          type: 'story',
          assignee: 'John Doe',
          epicId: '1',
          points: 5,
          createdAt: new Date('2024-01-15'),
        }}
        epic={{
          ...mockEpic,
          id: '1',
          name: 'Blue Epic',
          color: 'bg-blue-500',
        }}
        onDragStart={action('onDragStart')}
        onTaskClick={action('onTaskClick')}
        isCompact={false}
      />
      <TaskCard
        task={{
          id: '2',
          title: 'Green epic task',
          description: 'Task from green colored epic',
          status: 'done',
          priority: 'high',
          type: 'story',
          assignee: 'Jane Smith',
          epicId: '2',
          points: 8,
          createdAt: new Date('2024-01-16'),
        }}
        epic={{
          ...mockEpic,
          id: '2',
          name: 'Green Epic',
          color: 'bg-green-500',
        }}
        onDragStart={action('onDragStart')}
        onTaskClick={action('onTaskClick')}
        isCompact={false}
      />
    </div>
  ),
};
