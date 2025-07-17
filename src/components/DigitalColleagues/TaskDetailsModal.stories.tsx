
import type { Meta, StoryObj } from '@storybook/react';
import { TaskDetailsModal } from './TaskDetailsModal';

const meta: Meta<typeof TaskDetailsModal> = {
  title: 'Digital Colleagues/TaskDetailsModal',
  component: TaskDetailsModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onUpdateTask: { action: 'update task' },
    onDeleteTask: { action: 'delete task' },
    onClose: { action: 'close' },
  },
};

export default meta;
type Story = StoryObj<typeof TaskDetailsModal>;

// Mock async functions
const mockUpdateTask = (taskId: string, updates: any) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log('Task updated:', taskId, updates);
      resolve();
    }, 2000); // 2 second delay to show loading state
  });
};

const mockDeleteTask = (taskId: string) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log('Task deleted:', taskId);
      resolve();
    }, 1500); // 1.5 second delay to show loading state
  });
};

const mockUpdateTaskFail = (taskId: string, updates: any) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      console.log('Task update failed:', taskId, updates);
      reject(new Error('Update failed'));
    }, 2000);
  });
};

const mockDeleteTaskFail = (taskId: string) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      console.log('Task delete failed:', taskId);
      reject(new Error('Delete failed'));
    }, 1500);
  });
};

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
];

const mockSprints = [
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
    isOpen: true,
    task: {
      id: '1',
      title: 'Design login page',
      description: 'Create wireframes and mockups for the login interface',
      status: 'in-progress',
      priority: 'high',
      type: 'story',
      epicId: '1',
      sprintId: '2',
      assignee: 'John Doe',
      points: 8,
      createdAt: new Date('2024-01-15'),
    },
    epics: mockEpics,
    sprints: mockSprints,
    onClose: () => {},
    onUpdateTask: mockUpdateTask,
    onDeleteTask: mockDeleteTask,
  },
};

export const WithLoadingStates: Story = {
  args: {
    isOpen: true,
    task: {
      id: '1',
      title: 'Design login page',
      description: 'Create wireframes and mockups for the login interface',
      status: 'in-progress',
      priority: 'high',
      type: 'story',
      epicId: '1',
      sprintId: '2',
      assignee: 'John Doe',
      points: 8,
      createdAt: new Date('2024-01-15'),
    },
    epics: mockEpics,
    sprints: mockSprints,
    onClose: () => {},
    onUpdateTask: mockUpdateTask,
    onDeleteTask: mockDeleteTask,
  },
};

export const WithErrorStates: Story = {
  args: {
    isOpen: true,
    task: {
      id: '1',
      title: 'Design login page',
      description: 'Create wireframes and mockups for the login interface',
      status: 'in-progress',
      priority: 'high',
      type: 'story',
      epicId: '1',
      sprintId: '2',
      assignee: 'John Doe',
      points: 8,
      createdAt: new Date('2024-01-15'),
    },
    epics: mockEpics,
    sprints: mockSprints,
    onClose: () => {},
    onUpdateTask: mockUpdateTaskFail,
    onDeleteTask: mockDeleteTaskFail,
  },
};

export const BugTask: Story = {
  args: {
    isOpen: true,
    task: {
      id: '2',
      title: 'Fix login redirect bug',
      description: 'Users are not being redirected after successful login',
      type: 'bug',
      priority: 'high',
      status: 'todo',
      epicId: '1',
      sprintId: '2',
      assignee: 'Jane Smith',
      points: 3,
      createdAt: new Date('2024-01-16'),
    },
    epics: mockEpics,
    sprints: mockSprints,
    onClose: () => {},
    onUpdateTask: mockUpdateTask,
    onDeleteTask: mockDeleteTask,
  },
};

export const CompletedTask: Story = {
  args: {
    isOpen: true,
    task: {
      id: '3',
      title: 'Set up CI/CD pipeline',
      description: 'Configure automated testing and deployment',
      type: 'task',
      priority: 'low',
      status: 'done',
      epicId: '2',
      sprintId: '1',
      assignee: 'Mike Johnson',
      points: 5,
      createdAt: new Date('2024-01-10'),
    },
    epics: mockEpics,
    sprints: mockSprints,
    onClose: () => {},
    onUpdateTask: mockUpdateTask,
    onDeleteTask: mockDeleteTask,
  },
};

export const SpikeTask: Story = {
  args: {
    isOpen: true,
    task: {
      id: '4',
      title: 'Research OAuth providers',
      description: 'Investigate different OAuth integration options',
      type: 'spike',
      priority: 'medium',
      status: 'review',
      epicId: '1',
      sprintId: '2',
      assignee: 'Alex Brown',
      points: 2,
      createdAt: new Date('2024-01-18'),
    },
    epics: mockEpics,
    sprints: mockSprints,
    onClose: () => {},
    onUpdateTask: mockUpdateTask,
    onDeleteTask: mockDeleteTask,
  },
};

export const NoSprint: Story = {
  args: {
    isOpen: true,
    task: {
      id: '5',
      title: 'Update documentation',
      description: 'Refresh API documentation with latest changes',
      status: 'in-progress',
      priority: 'high',
      type: 'story',
      epicId: '2',
      sprintId: '1',
      assignee: 'Sarah Wilson',
      points: 3,
      createdAt: new Date('2024-01-20'),
    },
    epics: mockEpics,
    sprints: mockSprints,
    onClose: () => {},
    onUpdateTask: mockUpdateTask,
    onDeleteTask: mockDeleteTask,
  },
};
