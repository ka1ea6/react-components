import type { Meta, StoryObj } from '@storybook/react';
import { ApproveLeave } from './ApproveLeave';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof ApproveLeave> = {
  title: 'Holidays/ApproveLeave',
  component: ApproveLeave,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ApproveLeave>;

const mockLeaveRequests = [
  { id: '1', userId: '1', userName: 'John Doe', userEmail: 'john.doe@example.com', userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', startDate: '2025-01-05', endDate: '2025-01-10', status: 'requested', totalDays: 6, leaveType: 'Full Day' },
  { id: '2', userId: '2', userName: 'Jane Smith', userEmail: 'jane.smith@example.com', userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane', startDate: '2025-01-15', endDate: '2025-01-15', status: 'requested', totalDays: 0.5, leaveType: 'Morning' },
  { id: '3', userId: '3', userName: 'Bob Johnson', userEmail: 'bob.johnson@example.com', userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob', startDate: '2025-01-25', endDate: '2025-01-30', status: 'requested', totalDays: 6, leaveType: 'Full Day' },
  { id: '4', userId: '4', userName: 'Alice Brown', userEmail: 'alice.brown@example.com', userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice', startDate: '2025-01-20', endDate: '2025-01-20', status: 'requested', totalDays: 0.5, leaveType: 'Afternoon' },
  { id: '5', userId: '4', userName: 'Alice Brown', userEmail: 'alice.brown@example.com', userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice', startDate: '2025-01-21', endDate: '2025-01-21', status: 'requested', totalDays: 0.5, leaveType: 'Afternoon' },
  { id: '6', userId: '4', userName: 'Alice Brown', userEmail: 'alice.brown@example.com', userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice', startDate: '2025-01-22', endDate: '2025-01-22', status: 'requested', totalDays: 0.5, leaveType: 'Afternoon' },
];

export const Default: Story = {
  args: {
    leaveRequests: mockLeaveRequests,
    onApprove: action('onApprove'),
    onReject: action('onReject'),
  },
};

