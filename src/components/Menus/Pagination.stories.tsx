import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Menus/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true, // 👈 Set this
    },
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: {
    pages: { totalPages: 4, page: 1 },
  },
}

export const ManyPages: Story = {
  args: {
    pages: { totalPages: 40, page: 3 },
  },
}


export const MiddlePages: Story = {
  args: {
    pages: { totalPages: 40, page: 20 },
  },
}

export const NoPages: Story = {
  args: {
    pages: { totalPages: 1, page: 1 },
  },
}
