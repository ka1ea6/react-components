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

export const Test: Story = Template.bind({});
Test.args = {
  ...Default.args,
  initialData: {
  "deals": [
    {
      "id": 11,
      "customer": {
        "id": 1,
        "name": "Customer 1",
        "intro": null,
        "active": true,
        "icon": null,
        "updatedAt": "2025-04-28T21:56:26.595Z",
        "createdAt": "2025-04-28T21:56:26.594Z"
      },
      "value": 1,
      "assignee": {
        "id": 1,
        "name": "Test user - do not delete",
        "email": "test@test.com",
        "jobRole": null,
        "manager": null,
        "about": null,
        "profilePicture": null,
        "holidaysRemaining": 25,
        "startingHolidays": 25,
        "dateOfBirth": null,
        "joinDate": null,
        "linkedIn": null,
        "assets": [],
        "role": "admin",
        "updatedAt": "2025-04-28T21:23:55.792Z",
        "createdAt": "2025-04-28T21:23:55.787Z",
        "enableAPIKey": null,
        "apiKey": null
      },
      "status": "Won",
      "gecoStatus": "firm",
      "categories": [],
      "dateLogged": "2025-04-29T21:08:45.154Z",
      "closureDate": "2025-04-30T00:00:00.000Z",
      "description": "wewewewewedsds",
      "comments": [],
      "updatedAt": "2025-06-17T11:54:01.228Z",
      "createdAt": "2025-04-29T21:09:20.627Z"
    },
    {
      "id": 10,
      "value": 1,
      "status": "Lost",
      "gecoStatus": "other",
      "categories": [],
      "dateLogged": "2025-04-29T21:08:45.154Z",
      "closureDate": "2025-04-30T00:00:00.000Z",
      "description": "Lost deal example",
      "comments": [],
      "updatedAt": "2025-04-29T21:09:18.942Z",
      "createdAt": "2025-04-29T21:09:18.940Z"
    },
    {
      "id": 9,
      "value": 1,
      "status": "Cold",
      "gecoStatus": "other",
      "categories": [],
      "dateLogged": "2025-04-29T21:08:45.154Z",
      "closureDate": "2025-04-30T00:00:00.000Z",
      "description": "wewewewewedsds",
      "comments": [],
      "updatedAt": "2025-04-29T21:09:17.611Z",
      "createdAt": "2025-04-29T21:09:17.601Z"
    },
    {
      "id": 8,
      "value": 1,
      "status": "Cold",
      "gecoStatus": "other",
      "categories": [],
      "dateLogged": "2025-04-29T21:08:45.154Z",
      "closureDate": "2025-04-30T00:00:00.000Z",
      "description": "wewewewewedsds",
      "comments": [],
      "updatedAt": "2025-04-29T21:09:15.980Z",
      "createdAt": "2025-04-29T21:09:15.979Z"
    },
    {
      "id": 7,
      "value": 1,
      "status": "Cold",
      "gecoStatus": "other",
      "categories": [],
      "dateLogged": "2025-04-29T21:08:45.154Z",
      "closureDate": "2025-04-30T00:00:00.000Z",
      "description": "wewewewewedsds",
      "comments": [],
      "updatedAt": "2025-04-29T21:09:14.452Z",
      "createdAt": "2025-04-29T21:09:14.442Z"
    },
    {
      "id": 6,
      "value": 1,
      "status": "Cold",
      "gecoStatus": "other",
      "categories": [],
      "dateLogged": "2025-04-29T21:08:45.154Z",
      "closureDate": "2025-04-30T00:00:00.000Z",
      "description": "wewewewewedsds",
      "comments": [],
      "updatedAt": "2025-04-29T21:09:12.527Z",
      "createdAt": "2025-04-29T21:09:12.526Z"
    },
    {
      "id": 5,
      "value": 1,
      "status": "Cold",
      "gecoStatus": "other",
      "categories": [],
      "dateLogged": "2025-04-29T21:08:45.154Z",
      "closureDate": "2025-04-30T00:00:00.000Z",
      "description": "wewewewewedsds",
      "comments": [],
      "updatedAt": "2025-04-29T21:09:10.603Z",
      "createdAt": "2025-04-29T21:09:10.592Z"
    },
    {
      "id": 4,
      "value": 1,
      "status": "Cold",
      "gecoStatus": "other",
      "categories": [],
      "dateLogged": "2025-04-29T21:08:45.154Z",
      "closureDate": "2025-04-30T00:00:00.000Z",
      "description": "wewewewewedsds",
      "comments": [],
      "updatedAt": "2025-04-29T21:09:09.032Z",
      "createdAt": "2025-04-29T21:09:09.031Z"
    },
    {
      "id": 3,
      "value": 1,
      "status": "Cold",
      "gecoStatus": "other",
      "categories": [],
      "dateLogged": "2025-04-29T21:08:45.154Z",
      "closureDate": "2025-04-30T00:00:00.000Z",
      "description": "wewewewewedsds",
      "comments": [],
      "updatedAt": "2025-04-29T21:09:07.464Z",
      "createdAt": "2025-04-29T21:09:07.463Z"
    },
    {
      "id": 2,
      "value": 1,
      "status": "Cold",
      "gecoStatus": "other",
      "categories": [],
      "dateLogged": "2025-04-29T21:08:45.154Z",
      "closureDate": "2025-04-30T00:00:00.000Z",
      "description": "wewewewewedsds",
      "comments": [],
      "updatedAt": "2025-04-29T21:09:03.844Z",
      "createdAt": "2025-04-29T21:09:03.840Z"
    },
    {
      "id": 1,
      "value": 1,
      "status": "Cold",
      "gecoStatus": "other",
      "categories": [],
      "dateLogged": "2025-04-29T21:08:45.154Z",
      "closureDate": "2025-04-30T00:00:00.000Z",
      "description": "wewewewewedsds",
      "comments": [],
      "updatedAt": "2025-04-29T21:08:45.164Z",
      "createdAt": "2025-04-29T21:08:45.160Z"
    }
  ],
  "customers": [
    {
      "id": 1,
      "name": "Customer 1",
      "active": true
    },
    {
      "id": 2,
      "name": "Customer 2",
      "active": true
    },
    {
      "id": 3,
      "name": "Customer 3",
      "active": true
    }
  ],
  "users": [
    {
      "id": 1,
      "name": "Test user - do not delete",
      "email": "test@test.com",
      "jobRole": null,
      "manager": null,
      "about": null,
      "profilePicture": null,
      "holidaysRemaining": 25,
      "startingHolidays": 25,
      "dateOfBirth": null,
      "joinDate": null,
      "linkedIn": null,
      "assets": [],
      "role": "admin",
      "updatedAt": "2025-04-28T21:23:55.792Z",
      "createdAt": "2025-04-28T21:23:55.787Z",
      "enableAPIKey": null,
      "apiKey": null
    }
  ],
  "categories": []
}
};

export const NoDeals: Story = Template.bind({});
NoDeals.args = {
  ...Default.args,
  initialData: {
    ...Default.args.initialData,
    deals: [],
  },
};

