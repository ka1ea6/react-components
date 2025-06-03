
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { CommentSection } from './CommentSection';

const mockComments = [
  {
    id: '1',
    text: 'Initial task created and assigned.',
    author: 'System',
    createdAt: new Date('2024-01-15T10:00:00Z'),
  },
  {
    id: '2',
    text: 'Started working on the implementation. This will require some research into the best approach.',
    author: 'John Doe',
    createdAt: new Date('2024-01-16T14:30:00Z'),
  },
  {
    id: '3',
    text: 'Found a good solution. Will implement it tomorrow.',
    author: 'Jane Smith',
    createdAt: new Date('2024-01-17T09:15:00Z'),
  },
];

const meta: Meta<typeof CommentSection> = {
  title: 'Digital Colleagues/CommentSection',
  component: CommentSection,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    comments: {
      control: 'object',
      description: 'Array of comments to display',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CommentSection>;

export const Default: Story = {
  args: {
    comments: mockComments,
    onAddComment: action('onAddComment'),
  },
};

export const Empty: Story = {
  args: {
    comments: [],
    onAddComment: action('onAddComment'),
  },
};

export const SingleComment: Story = {
  args: {
    comments: [mockComments[0]],
    onAddComment: action('onAddComment'),
  },
};

export const ManyComments: Story = {
  args: {
    comments: [
      ...mockComments,
      {
        id: '4',
        text: 'Great progress!',
        author: 'Alice Johnson',
        createdAt: new Date('2024-01-18T11:00:00Z'),
      },
      {
        id: '5',
        text: 'This comment is quite long and demonstrates how the comment section handles longer text content that might span multiple lines.',
        author: 'Bob Wilson',
        createdAt: new Date('2024-01-19T16:45:00Z'),
      },
      {
        id: '6',
        text: 'Almost done!',
        author: 'Carol Brown',
        createdAt: new Date('2024-01-20T08:30:00Z'),
      },
    ],
    onAddComment: action('onAddComment'),
  },
};

export const LongComments: Story = {
  args: {
    comments: [
      {
        id: '1',
        text: 'This is a very long comment that demonstrates how the comment section handles extensive text content. It includes multiple sentences and provides detailed information about the task progress, challenges faced, and potential solutions. The comment section should handle this gracefully with proper text wrapping and spacing.',
        author: 'Detailed Commenter',
        createdAt: new Date('2024-01-15T10:00:00Z'),
      },
    ],
    onAddComment: action('onAddComment'),
  },
};
