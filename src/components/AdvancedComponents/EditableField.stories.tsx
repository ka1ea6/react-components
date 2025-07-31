
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { EditableField } from './EditableField';

const meta: Meta<typeof EditableField> = {
  title: 'Advanced Components/EditableField',
  component: EditableField,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    fieldName: {
      control: 'text',
      description: 'The field name used for saving',
    },
    value: {
      control: 'text',
      description: 'Current value of the field',
    },
    label: {
      control: 'text',
      description: 'Label displayed above the field',
    },
    multiline: {
      control: 'boolean',
      description: 'Whether to use textarea for multiline input',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof EditableField>;

export const Default: Story = {
  args: {
    fieldName: 'title',
    value: 'Sample Task Title',
    label: 'Title',
    multiline: false,
    onSave: action('onSave'),
  },
};

export const Empty: Story = {
  args: {
    fieldName: 'title',
    value: '',
    label: 'Title',
    multiline: false,
    onSave: action('onSave'),
  },
};

export const Multiline: Story = {
  args: {
    fieldName: 'description',
    value: 'This is a longer description that spans multiple lines and demonstrates the multiline functionality of the editable field component.',
    label: 'Description',
    multiline: true,
    onSave: action('onSave'),
  },
};

export const EmptyMultiline: Story = {
  args: {
    fieldName: 'description',
    value: '',
    label: 'Description',
    multiline: true,
    onSave: action('onSave'),
  },
};

export const LongTitle: Story = {
  args: {
    fieldName: 'title',
    value: 'This is a very long task title that might wrap to multiple lines depending on the container width',
    label: 'Title',
    multiline: false,
    onSave: action('onSave'),
  },
};
