import type { Meta, StoryObj } from '@storybook/react'
import { ChatDemo } from './demo'
import { ChatDemoLongMessages } from './demo-long-messages'

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

export const LongMessages: StoryObj<typeof ChatDemoLongMessages> = {
  render: () => <ChatDemoLongMessages />,
  name: 'Long Text Messages',
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the chat interface handles very long text messages with proper width constraints and text wrapping.',
      },
    },
  },
}
