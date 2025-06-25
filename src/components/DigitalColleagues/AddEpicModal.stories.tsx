
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { AddEpicModal } from './AddEpicModal';

const meta: Meta<typeof AddEpicModal> = {
  title:'Digital Colleagues/AddEpicModal',
  component: AddEpicModal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    onClose: {
      action: 'modal closed',
      description: 'Function called when modal is closed',
    },
    onAddEpic: {
      action: 'epic added',
      description: 'Function called when epic is added',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddEpicModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: action('onClose'),
    onAddEpic: action('onAddEpic'),
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: action('onClose'),
    onAddEpic: action('onAddEpic'),
  },
};
