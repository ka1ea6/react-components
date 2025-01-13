import type { Meta, StoryObj } from '@storybook/react';
import { RequestLeave } from './RequestLeave';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof RequestLeave> = {
  title: 'Holidays/RequestLeave',
  component: RequestLeave,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true, // 👈 Set this
    },
  },
};

export default meta;
type Story = StoryObj<typeof RequestLeave>;

export const Default: Story = {
  args: {
    userId: 'user1',
    userName: 'John Doe',
    remainingDays: 20,
  },
};

// Mock the server action
const mockSubmitLeaveRequest = async (formData: FormData) => {
  action('submitLeaveRequest')(Object.fromEntries(formData));
  return { success: true, message: 'Leave request submitted successfully (mock)' };
};

export const WithMockedServerAction: Story = {
  args: {
    ...Default.args,
    submitLeaveRequest: mockSubmitLeaveRequest,
  },
};

