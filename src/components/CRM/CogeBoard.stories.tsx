import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { CRMCogeBoard } from './CogeBoard';
import { BoardData, Deal, Customer, CRMStatus } from './types';
import { mockUsers, mockCustomers, mockCategories } from './mockData';

const meta: Meta<typeof CRMCogeBoard> = {
  title: 'CRM/CogeBoard',
  tags: ['autodocs'],
  component: CRMCogeBoard,
};

export default meta;
type Story = StoryFn<typeof CRMCogeBoard>;

const Template: Story = (args) => {
  const [boardData, setBoardData] = useState<BoardData>(args.initialData);

  const handleUpdateDeal = async (updatedDeal: Deal) => {
    console.log('Updating deal:', updatedDeal);
    setBoardData((prevData) => ({
      ...prevData,
      deals: (prevData.deals ?? []).map((deal) =>
        deal.id === updatedDeal.id ? updatedDeal : deal
      ),
    }));
    return updatedDeal;
  };

  return (
    <CRMCogeBoard
      {...args}
      initialData={boardData}
      updateDeal={handleUpdateDeal}
    />
  );
};

export const Default: Story = Template.bind({});
Default.args = {
  initialData: {
    deals: Array.from({ length: 13 }, (_, i) => ({
      id: i + 1,
      customer: mockCustomers[(i % mockCustomers.length)],
      value: Math.floor(Math.random() * 100000) + 5000,
      assignee: mockUsers[Math.floor(Math.random() * mockUsers.length)].name,
      status: ["Cold", "Qualified", "Proposal Made", "Won", "Lost"][Math.floor(Math.random() * 5)] as CRMStatus,
      gecoStatus: ["firm", "forecast", "other"][i % 3],
      categories: [mockCategories[(i % mockCategories.length)].id],
      dateLogged: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      closureDate: new Date(Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
      comments: [],
      updatedAt: new Date().toISOString(),
      description: `This is a mock description for deal ${i + 1}. It's a ${["small", "medium", "large"][i % 3]} deal with high potential.`,
    })),
    customers: mockCustomers,
    users: mockUsers,
    categories: mockCategories,
  },
  
  addComment: async (dealId, comment) => {
    console.log("Adding comment to deal:", dealId, comment);
    return { ...comment, id: "new-comment-id" };
  },
};

export const NoDeals: Story = Template.bind({});
NoDeals.args = {
  ...Default.args,
  initialData: {
    ...Default.args.initialData,
    deals: [],
  },
};

