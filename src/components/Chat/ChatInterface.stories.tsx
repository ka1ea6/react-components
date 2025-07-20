import type { Meta, StoryObj } from '@storybook/react'
import { ChatDemo } from './demo'

const meta: Meta<typeof ChatDemo> = {
  title: 'Chat/Chat Interface',
  component: ChatDemo,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ChatDemo>

export const Default: Story = {
  name: 'Clean Interface with File Upload & Bottom Capabilities',
}
