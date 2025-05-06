import React from 'react'
import { Meta } from '@storybook/react'
import { ChatInterfaceMessages } from './ChatInterfaceMessages'
import { type ChatMessageProps } from './ChatMessage'
import { delay, http, HttpResponse } from 'msw'
import type { StoryObj } from '@storybook/react'
import { chatCardTestData } from './ChatCardTask.stories'

export default {
  title: 'Chat/ChatInterface',
  component: ChatInterfaceMessages,
  tags: ['autodocs'],
  argTypes: {
    contextType: {
      control: {
        type: 'select',
        options: ['project', 'businessFunction', 'global'],
      },
    },
  },
} as Meta

type Story = StoryObj<typeof ChatInterfaceMessages>

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
        currentUser: { name: 'Robot' },
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
      {
        id: '6',
        role: 'assistant',
        message: {
          type: 'tool-invocation',
          data: {
            id: 1,
            tool: 'task',
            system: 'payload',
            fetchLatest: false,
            taskData: chatCardTestData,
          },
        },
      },
    ] as ChatMessageProps[],

    currentUser: {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: '/path-to-avatar.jpg',
      role: 'user',
    },
  },
}
