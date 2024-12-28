import type { Meta, StoryObj } from '@storybook/react'
import { ProjectTeam } from './ProjectTeam'

const meta: Meta<typeof ProjectTeam> = {
  title: 'Menus/ProjectTeam',
  component: ProjectTeam,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ProjectTeam>

export const Default: Story = {
  args: {
    title: 'Project Team',
    members: [
      { name: 'Walter White', role: 'Project Manager', avatar: 'avatar.jpg' },
      { name: 'Saul Goodman', role: 'Business Analyst', avatar: 'avatar.jpg' },
      { name: 'Jesse Pinkman', role: 'Architect', avatar: 'avatar.jpg' },
      { name: 'Skyler White', role: 'Engineer', avatar: 'avatar.jpg' },
    ],
  },
}
