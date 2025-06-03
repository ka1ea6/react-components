
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TaskCard } from './TaskCard';

const mockEpic = {
  id: 'epic1',
  name: 'User Authentication',
  color: 'bg-blue-500',
  description: 'Implement secure user authentication system',
};

const meta: Meta<typeof TaskCard> = {
  title: 'Digital Colleagues/TaskCard',
  component: TaskCard,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    task: {
      control: 'object',
      description: 'Task data object',
    },
    epic: {
      control: 'object',
      description: 'Epic data object',
    },
    isCompact: {
      control: 'boolean',
      description: 'Whether to show compact version',
    },
    onDragStart: {
      action: 'drag started',
      description: 'Function called when drag starts',
    },
    onTaskClick: {
      action: 'task clicked',
      description: 'Function called when task is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TaskCard>;

const baseTask = {
  id: '1',
  epicId: 'epic1',
  createdAt: new Date('2024-01-15T10:00:00Z'),
};

export const HighPriorityStory: Story = {
  args: {
    task: {
      ...baseTask,
      title: 'Implement user authentication system',
      description: 'Create a secure login system with JWT tokens and multi-factor authentication',
      status: 'in-progress',
      priority: 'high',
      type: 'story',
      assignee: 'John Doe',
    },
    epic: mockEpic,
    onDragStart: action('onDragStart'),
    onTaskClick: action('onTaskClick'),
  },
};

export const MediumPriorityTask: Story = {
  args: {
    task: {
      ...baseTask,
      id: '2',
      title: 'Design user dashboard layout',
      description: 'Create wireframes and mockups for the main dashboard interface',
      status: 'todo',
      priority: 'medium',
      type: 'task',
      assignee: 'Jane Smith',
    },
    epic: mockEpic,
    onDragStart: action('onDragStart'),
    onTaskClick: action('onTaskClick'),
  },
};

export const LowPriorityBug: Story = {
  args: {
    task: {
      ...baseTask,
      id: '3',
      title: 'Fix minor UI glitch in header',
      description: 'Navigation menu sometimes flickers on mobile devices',
      status: 'done',
      priority: 'low',
      type: 'bug',
      assignee: 'Bob Wilson',
    },
    epic: mockEpic,
    onDragStart: action('onDragStart'),
    onTaskClick: action('onTaskClick'),
  },
};

export const SpikeTask: Story = {
  args: {
    task: {
      ...baseTask,
      id: '4',
      title: 'Research new authentication providers',
      description: 'Investigate options for additional OAuth providers like Microsoft and Apple',
      status: 'review',
      priority: 'medium',
      type: 'spike',
      assignee: 'Alice Johnson',
    },
    epic: mockEpic,
    onDragStart: action('onDragStart'),
    onTaskClick: action('onTaskClick'),
  },
};

export const LongTitleAndDescription: Story = {
  args: {
    task: {
      ...baseTask,
      id: '5',
      title: 'Implement comprehensive user authentication system with multi-factor authentication, password recovery, and social login integration across multiple platforms',
      description: 'This is a very detailed and comprehensive task that involves creating a complete authentication system with multiple security features including email verification, SMS codes, biometric authentication, password recovery options, and integration with various social media platforms like Google, Facebook, GitHub, Microsoft, and Apple. The system should also include advanced security features like rate limiting, IP blocking, and suspicious activity detection.',
      status: 'in-progress',
      priority: 'high',
      type: 'story',
      assignee: 'Alexander Johnson-Williams-Brown',
    },
    epic: mockEpic,
    onDragStart: action('onDragStart'),
    onTaskClick: action('onTaskClick'),
  },
};

export const CompactHighPriority: Story = {
  args: {
    task: {
      ...baseTask,
      title: 'Critical security patch',
      description: 'Fix SQL injection vulnerability in user input validation',
      status: 'done',
      priority: 'high',
      type: 'bug',
      assignee: 'Security Team',
    },
    epic: mockEpic,
    isCompact: true,
    onDragStart: action('onDragStart'),
    onTaskClick: action('onTaskClick'),
  },
};

export const CompactMediumPriority: Story = {
  args: {
    task: {
      ...baseTask,
      id: '6',
      title: 'Update documentation',
      description: 'Refresh API documentation with latest changes',
      status: 'done',
      priority: 'medium',
      type: 'task',
      assignee: 'Tech Writer',
    },
    epic: mockEpic,
    isCompact: true,
    onDragStart: action('onDragStart'),
    onTaskClick: action('onTaskClick'),
  },
};

export const CompactLowPriority: Story = {
  args: {
    task: {
      ...baseTask,
      id: '7',
      title: 'Optimize images',
      description: 'Compress and optimize images for better performance',
      status: 'done',
      priority: 'low',
      type: 'task',
      assignee: 'Designer',
    },
    epic: mockEpic,
    isCompact: true,
    onDragStart: action('onDragStart'),
    onTaskClick: action('onTaskClick'),
  },
};

export const AllTaskTypes: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <TaskCard
        task={{
          ...baseTask,
          title: 'User Story',
          description: 'As a user, I want to be able to log in',
          status: 'todo',
          priority: 'high',
          type: 'story',
          assignee: 'Product Owner',
        }}
        epic={mockEpic}
        onDragStart={action('onDragStart')}
        onTaskClick={action('onTaskClick')}
      />
      <TaskCard
        task={{
          ...baseTask,
          id: '2',
          title: 'Development Task',
          description: 'Implement login API endpoint',
          status: 'in-progress',
          priority: 'medium',
          type: 'task',
          assignee: 'Developer',
        }}
        epic={mockEpic}
        onDragStart={action('onDragStart')}
        onTaskClick={action('onTaskClick')}
      />
      <TaskCard
        task={{
          ...baseTask,
          id: '3',
          title: 'Bug Fix',
          description: 'Login button not working on mobile',
          status: 'review',
          priority: 'high',
          type: 'bug',
          assignee: 'QA Engineer',
        }}
        epic={mockEpic}
        onDragStart={action('onDragStart')}
        onTaskClick={action('onTaskClick')}
      />
      <TaskCard
        task={{
          ...baseTask,
          id: '4',
          title: 'Research Spike',
          description: 'Investigate best authentication practices',
          status: 'done',
          priority: 'low',
          type: 'spike',
          assignee: 'Architect',
        }}
        epic={mockEpic}
        onDragStart={action('onDragStart')}
        onTaskClick={action('onTaskClick')}
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const AllPriorities: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <TaskCard
        task={{
          ...baseTask,
          title: 'High Priority Task',
          description: 'Critical security vulnerability that needs immediate attention',
          status: 'in-progress',
          priority: 'high',
          type: 'bug',
          assignee: 'Security Team',
        }}
        epic={mockEpic}
        onDragStart={action('onDragStart')}
        onTaskClick={action('onTaskClick')}
      />
      <TaskCard
        task={{
          ...baseTask,
          id: '2',
          title: 'Medium Priority Task',
          description: 'Feature enhancement for better user experience',
          status: 'todo',
          priority: 'medium',
          type: 'story',
          assignee: 'Product Team',
        }}
        epic={mockEpic}
        onDragStart={action('onDragStart')}
        onTaskClick={action('onTaskClick')}
      />
      <TaskCard
        task={{
          ...baseTask,
          id: '3',
          title: 'Low Priority Task',
          description: 'Documentation update that can be done later',
          status: 'done',
          priority: 'low',
          type: 'task',
          assignee: 'Tech Writer',
        }}
        epic={mockEpic}
        onDragStart={action('onDragStart')}
        onTaskClick={action('onTaskClick')}
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const CompactVsRegular: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Regular Size</h3>
        <TaskCard
          task={{
            ...baseTask,
            title: 'Implement user authentication',
            description: 'Create a secure login system with JWT tokens and session management',
            status: 'in-progress',
            priority: 'high',
            type: 'story',
            assignee: 'John Doe',
          }}
          epic={mockEpic}
          onDragStart={action('onDragStart')}
          onTaskClick={action('onTaskClick')}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Compact Size</h3>
        <TaskCard
          task={{
            ...baseTask,
            title: 'Implement user authentication',
            description: 'Create a secure login system with JWT tokens and session management',
            status: 'done',
            priority: 'high',
            type: 'story',
            assignee: 'John Doe',
          }}
          epic={mockEpic}
          isCompact={true}
          onDragStart={action('onDragStart')}
          onTaskClick={action('onTaskClick')}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
