import type { Meta, StoryObj } from '@storybook/react'
import { ProjectCard } from './ProjectCard'

export default {
  title: 'Cards/ProjectCard',
  component: ProjectCard,
  tags: ['autodocs'],
  argTypes: {},
} as Meta

type Story = StoryObj<typeof ProjectCard>

export const Default: Story = {
  args: {
    slug: '/project/single',
    image: {
      src: 'stock10.jpg',
      alt: 'portfolio-1',
    },
    title: 'Cloud Migrate Pro',
    description: 'Lorem Ipsum is simply dummy',
  },
}
