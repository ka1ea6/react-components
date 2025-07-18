
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TaskSelect } from './TaskSelect';

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const epicOptions = [
  { value: 'epic1', label: 'User Authentication', color: 'bg-blue-500' },
  { value: 'epic2', label: 'Dashboard Redesign', color: 'bg-green-500' },
  { value: 'epic3', label: 'Mobile App', color: 'bg-purple-500' },
  { value: 'epic4', label: 'API Integration', color: 'bg-orange-500' },
];

const meta: Meta<typeof TaskSelect> = {
  title: 'Projects/Tasks/TaskSelect',
  component: TaskSelect,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the select field',
    },
    value: {
      control: 'text',
      description: 'Currently selected value',
    },
    showColor: {
      control: 'boolean',
      description: 'Whether to show color indicators for options',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TaskSelect>;

export const Status: Story = {
  args: {
    label: 'Status',
    value: 'in-progress',
    options: statusOptions,
    showColor: false,
    onValueChange: action('onValueChange'),
  },
};

export const Priority: Story = {
  args: {
    label: 'Priority',
    value: 'medium',
    options: priorityOptions,
    showColor: false,
    onValueChange: action('onValueChange'),
  },
};

export const Epic: Story = {
  args: {
    label: 'Epic',
    value: 'epic2',
    options: epicOptions,
    showColor: true,
    onValueChange: action('onValueChange'),
  },
};

export const EpicWithoutColor: Story = {
  args: {
    label: 'Epic',
    value: 'epic1',
    options: epicOptions,
    showColor: false,
    onValueChange: action('onValueChange'),
  },
};

export const NoSelection: Story = {
  args: {
    label: 'Status',
    value: '',
    options: statusOptions,
    showColor: false,
    onValueChange: action('onValueChange'),
  },
};

export const ManyOptions: Story = {
  args: {
    label: 'Team Member',
    value: 'member3',
    options: [
      { value: 'member1', label: 'Alice Johnson' },
      { value: 'member2', label: 'Bob Wilson' },
      { value: 'member3', label: 'Carol Brown' },
      { value: 'member4', label: 'David Lee' },
      { value: 'member5', label: 'Emma Davis' },
      { value: 'member6', label: 'Frank Miller' },
      { value: 'member7', label: 'Grace Taylor' },
    ],
    showColor: false,
    onValueChange: action('onValueChange'),
  },
};
