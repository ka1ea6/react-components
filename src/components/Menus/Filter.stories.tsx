import type { Meta, StoryObj } from '@storybook/react'
import { Filter } from './Filter'

const meta: Meta<typeof Filter> = {
  title: 'Menus/Filter',
  component: Filter,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true, // 👈 Set this
    },
  },
}

export default meta
type Story = StoryObj<typeof Filter>

export const Default: Story = {
  args: {
    types: [
      {
        label: 'All',
        href: '1',
      },
      {
        label: 'Announcements',
        href: '3',
      },
      {
        label: 'Blogs',
        href: '4',
      },
      {
        label: 'Articles',
        href: '5',
      },
      {
        label: 'Case Studies',
        href: '6',
      },
    ],
  },
}

export const NoArgs: Story = {
  args: { }
}