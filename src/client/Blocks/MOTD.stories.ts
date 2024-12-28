'use client'
import React from 'react'
import { MOTD } from './MOTD'
import type { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof MOTD> = {
  title: 'Blocks/MOTD',
  component: MOTD,
  tags: ['autodocs'],
  argTypes: {
    // color: {
    //   options: ['primary', 'secondary', 'tertiary', 'quaternary', 'highlight', 'accent', 'muted', 'paper'],
    //   control: { type: 'select' },
    // }
  },
}
export default meta

type Story = StoryObj<typeof MOTD>

export const Primary: Story = {
  args: {
    title: 'Lorem ipsum dolor sit amet',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu ipsum enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu ipsum enim.',
    url: '#',
    brandFrom: 'one',
    brandTo: 'two',
  },
}
