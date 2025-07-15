import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TasksView } from './TasksView';
import type { Reminder, DigitalColleague } from './TasksView';

const meta: Meta<typeof TasksView> = {
  title: 'DC/Views/TasksView',
  component: TasksView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TasksView>;

const mockColleagues: DigitalColleague[] = [
  { id: '1', name: 'Alex AI', department: 'Development', role: 'Senior Developer' },
  { id: '2', name: 'Maya Bot', department: 'Design', role: 'UX Designer' },
  { id: '3', name: 'Sam Assistant', department: 'Marketing', role: 'Marketing Specialist' },
  { id: '4', name: 'Jordan Helper', department: 'Support', role: 'Customer Success' },
  { id: '5', name: 'Riley Automation', department: 'Operations', role: 'DevOps Engineer' },
];

const mockReminders: Reminder[] = [
  {
    id: '1',
    title: 'Review quarterly report',
    description: 'Go through Q4 performance metrics and prepare summary for the team meeting',
    dueDate: new Date(2024, 2, 15), // March 15, 2024
    dueTime: '14:30',
    colleague: mockColleagues[0],
    isCompleted: false,
    isRecurring: false,
    priority: 'high',
    reminderEnabled: true,
    reminderMinutes: 30,
    createdAt: new Date(2024, 2, 10),
    tags: ['quarterly', 'review', 'urgent']
  },
  {
    id: '2',
    title: 'Weekly team standup',
    description: 'Join the weekly team synchronization meeting to discuss progress and blockers',
    dueDate: new Date(2024, 2, 18), // March 18, 2024
    dueTime: '10:00',
    colleague: mockColleagues[1],
    isCompleted: false,
    isRecurring: true,
    recurrencePattern: 'weekly',
    recurrenceInterval: 1,
    priority: 'medium',
    reminderEnabled: true,
    reminderMinutes: 15,
    createdAt: new Date(2024, 2, 11),
    tags: ['meeting', 'standup', 'weekly']
  },
  {
    id: '3',
    title: 'Update project documentation',
    description: 'Refresh the README and add new API documentation for the latest features',
    dueDate: new Date(2024, 2, 20), // March 20, 2024
    colleague: mockColleagues[2],
    isCompleted: true,
    isRecurring: false,
    priority: 'low',
    reminderEnabled: false,
    createdAt: new Date(2024, 2, 12),
    completedAt: new Date(2024, 2, 19),
    tags: ['documentation', 'api']
  },
  {
    id: '4',
    title: 'Follow up on customer feedback',
    description: 'Reach out to customers who provided feedback last week and discuss next steps',
    dueDate: new Date(2024, 2, 14), // March 14, 2024 (overdue)
    dueTime: '16:00',
    colleague: mockColleagues[3],
    isCompleted: false,
    isRecurring: false,
    priority: 'high',
    reminderEnabled: true,
    reminderMinutes: 60,
    createdAt: new Date(2024, 2, 8),
    tags: ['customer', 'feedback', 'follow-up']
  },
  {
    id: '5',
    title: 'Monthly backup verification',
    description: 'Verify that all systems are backing up correctly and data integrity is maintained',
    dueDate: new Date(), // Today
    dueTime: '09:00',
    colleague: mockColleagues[4],
    isCompleted: false,
    isRecurring: true,
    recurrencePattern: 'monthly',
    recurrenceInterval: 1,
    priority: 'medium',
    reminderEnabled: true,
    reminderMinutes: 1440, // 1 day before
    createdAt: new Date(2024, 1, 15),
    tags: ['backup', 'verification', 'monthly', 'system']
  },
  {
    id: '6',
    title: 'Design review session',
    description: 'Review the latest mockups and prototypes with the design team',
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    dueTime: '11:30',
    colleague: mockColleagues[1],
    isCompleted: false,
    isRecurring: false,
    priority: 'medium',
    reminderEnabled: true,
    reminderMinutes: 30,
    createdAt: new Date(),
    tags: ['design', 'review', 'mockups']
  }
];

export const Default: Story = {
  args: {
    initialReminders: mockReminders,
    initialColleagues: mockColleagues,
    onAddReminder: action('onAddReminder'),
    onUpdateReminder: action('onUpdateReminder'),
    onDeleteReminder: action('onDeleteReminder'),
  },
};

export const Empty: Story = {
  args: {
    initialReminders: [],
    initialColleagues: mockColleagues,
    onAddReminder: action('onAddReminder'),
    onUpdateReminder: action('onUpdateReminder'),
    onDeleteReminder: action('onDeleteReminder'),
  },
};

export const CompletedOnly: Story = {
  args: {
    initialReminders: mockReminders.filter(r => r.isCompleted),
    initialColleagues: mockColleagues,
    onAddReminder: action('onAddReminder'),
    onUpdateReminder: action('onUpdateReminder'),
    onDeleteReminder: action('onDeleteReminder'),
  },
};

export const OverdueOnly: Story = {
  args: {
    initialReminders: mockReminders.filter(r => {
      const now = new Date();
      const due = new Date(r.dueDate);
      if (r.dueTime) {
        const [hours, minutes] = r.dueTime.split(':');
        due.setHours(parseInt(hours), parseInt(minutes));
      }
      return due < now && !r.isCompleted;
    }),
    initialColleagues: mockColleagues,
    onAddReminder: action('onAddReminder'),
    onUpdateReminder: action('onUpdateReminder'),
    onDeleteReminder: action('onDeleteReminder'),
  },
};

export const HighPriorityOnly: Story = {
  args: {
    initialReminders: mockReminders.filter(r => r.priority === 'high'),
    initialColleagues: mockColleagues,
    onAddReminder: action('onAddReminder'),
    onUpdateReminder: action('onUpdateReminder'),
    onDeleteReminder: action('onDeleteReminder'),
  },
};

export const RecurringOnly: Story = {
  args: {
    initialReminders: mockReminders.filter(r => r.isRecurring),
    initialColleagues: mockColleagues,
    onAddReminder: action('onAddReminder'),
    onUpdateReminder: action('onUpdateReminder'),
    onDeleteReminder: action('onDeleteReminder'),
  },
};

export const WithInteractions: Story = {
  args: {
    initialReminders: mockReminders,
    initialColleagues: mockColleagues,
    onAddReminder: action('onAddReminder'),
    onUpdateReminder: action('onUpdateReminder'),
    onDeleteReminder: action('onDeleteReminder'),
  },
};
