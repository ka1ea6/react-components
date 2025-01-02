import type { Meta, StoryObj } from '@storybook/react'
import { Categories } from './Categories'

const meta: Meta<typeof Categories> = {
  title: 'Menus/Categories',
  component: Categories,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true, // 👈 Set this
    },
  },
}

export default meta
type Story = StoryObj<typeof Categories>

export const Default: Story = {
  args: {
    title: 'Categories',
    links: [
      {
        label: 'General',
        href: '1',
      },
      {
        label: 'Business Advice',
        href: '3',
      },
      {
        label: 'Stock market',
        href: '4',
      },
      {
        label: 'Regular start',
        href: '5',
      },
      {
        label: 'Regular start',
        href: '6',
      },
    ],
  },
}

