'use client'
import React from 'react'
import { InfoTile } from './InfoTile'
import type { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof InfoTile> = {
  title: 'Blocks/InfoTile',
  component: InfoTile,
  tags: ['autodocs'],
  argTypes: {
    // color: {
    //   options: ['primary', 'secondary', 'tertiary', 'quaternary', 'highlight', 'accent', 'muted', 'paper'],
    //   control: { type: 'select' },
    // }
  },
  decorators: [
    (Story: React.FC) => (
      <div className="mt-6 px-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof InfoTile>

export const Primary: Story = {
  args: {
    title: 'Lorem ipsum dolor sit amet,',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu ipsum enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu ipsum enim.',
    mainImage:
      'https://cdn.sanity.io/images/ssqh4ksj/production/c734dd394de943820a25b4b96eace0855ab44749-2016x1344.png?w=1170&h=780&auto=format',
  },
}
