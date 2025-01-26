import type { Meta, StoryObj } from '@storybook/react';
import { DealDetails } from './DealDetails';
import { Deal, Customer, CRMCategory, Comment } from './types';

const meta: Meta<typeof DealDetails> = {
  title: 'CRM/DealDetails',
  component: DealDetails,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DealDetails>;

const mockCustomer: Customer = {
  id: '1',
  name: 'Acme Corp',
  active: true,
};

const mockCategories: CRMCategory[] = [
  { id: '1', name: 'Software', type: 'proposition' },
  { id: '2', name: 'Hardware', type: 'proposition' },
  { id: '3', name: 'Referral', type: 'source' },
  { id: '4', name: 'Outbound', type: 'source' },
  { id: '5', name: 'Tech', type: 'sector' },
  { id: '6', name: 'Finance', type: 'sector' },
];

const generateMockComments = (count: number): Comment[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `comment-${index + 1}`,
    text: `This is comment number ${index + 1}. It's a mock comment to test the scrolling behavior of the comments section in the DealDetails component.`,
    author: ['John Doe', 'Jane Smith', 'Bob Johnson'][index % 3],
    timestamp: new Date(Date.now() - (count - index) * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

const mockDeal: Deal = {
  id: 1,
  customer: { id: 1, name: 'Acme Corp', active: true },
  value: 100000,
  assignee: { id: 1, name: 'John Doe'},
  status: 'Qualified',
  categories: ['1', '3', '5'],
  dateLogged: '2023-01-01T00:00:00.000Z',
  closureDate: '2023-12-31T00:00:00.000Z',
  lastModified: '2023-06-15T12:00:00.000Z',
  comments: generateMockComments(50), // Generate 50 mock comments
  description: 'This is a mock deal for Acme Corp. It involves a large software project with potential for hardware integration.',
};

export const Default: Story = {
  args: {
    deal: mockDeal,
    customer: mockCustomer,
    categories: mockCategories,
    onClose: () => console.log('Close clicked'),
    onSave: (deal) => console.log('Save clicked', deal),
    onAddComment: (comment) => console.log('Comment added', comment),
  },
};

export const WithManyComments: Story = {
  args: {
    ...Default.args,
    deal: {
      ...mockDeal,
      comments: generateMockComments(100), // Generate 100 mock comments
    },
  },
};
