import React from 'react';
import { Meta } from '@storybook/react';
import { ChatInterface } from './ChatInterface';
import { type ChatMessageProps } from './ChatMessage';
import { delay, http, HttpResponse } from 'msw'
import type { StoryObj } from '@storybook/react'
export default {
  title: 'Chat/ChatInterface',
  component: ChatInterface,
    tags: ['autodocs'],
  argTypes: {
    contextType: {
      control: {
        type: 'select',
        options: ['project', 'businessFunction', 'global'],
      },
    },
  },
} as Meta;


type Story = StoryObj<typeof ChatInterface>

export const TextOnly: Story = {
    args: {
  messages: [
    {
      id: '1',
      role: 'user',
      message: { type: 'text', data: { content: 'Hello!' } },
    },
    {
      id: '2',
      role: 'assistant',
      message: { type: 'text', data: { content: 'Hi there! How can I assist you today?' } },
      currentUser: { name: 'Robot' }
    },
    {
        id: '3',
        role: 'user',
        message: { type: 'text', data: { content: 'What is our leave policy?' } },
      },
      {
        id: '4',
        role: 'assistant',
        message: { type: 'forwarding', data: { content: 'HR' } },
      },
      {
        id: '5',
        role: 'assistant',
        message: { type: 'text', data: { content: 'Its blah blah blah' } },
      },
  ] as ChatMessageProps[],
  contextType: 'global',
  currentUser: {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/path-to-avatar.jpg',
    role: 'user',
  },
  businessFunctions: [
    { id: 1, name: 'HR' },
    { id: 2, name: 'IT' },
  ],
}
}