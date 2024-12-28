'use client'
import React from 'react'
import { Insight } from './Insight'
import type { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof Insight> = {
  title: 'Blocks/Insight',
  component: Insight,
  tags: ['autodocs'],
  argTypes: {
    color: {
      options: [
        'primary',
        'secondary',
        'tertiary',
        'quaternary',
        'highlight',
        'accent',
        'muted',
        'paper',
      ],
      control: { type: 'select' },
    },
  },
  decorators: [
    (Story: React.FC) => (
      <div className="mt-6 px-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Insight>

export const Primary: Story = {
  args: {
    icon: { type: 'thin', name: 'star' },
    title: 'Primary Insights',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu ipsum enim.',
    color: 'secondary',
  },
}
