import type { Meta, StoryObj } from '@storybook/react'
import { ChatDemo } from './demo'
import { ChatDemoLongMessages } from './demo-long-messages'
import { 
  ChatDemoToolCalling, 
  ChatDemoMarkdownResponses, 
  ChatDemoUIComponents,
  ChatDemoFileUploads,
  ChatDemoErrorHandling,
  ChatDemoCapabilitiesInteraction
} from './demo-tests'

const meta: Meta<typeof ChatDemo> = {
  title: 'Chat/Chat Demo',
  component: ChatDemo,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ChatDemo>

export const Default: Story = {
  name: 'Clean Interface with File Upload & Bottom Capabilities',
  parameters: {
    docs: {
      description: {
        story: 'Basic chat interface with file upload capabilities and bottom menu.',
      },
    },
  },
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

export const ToolCalling: StoryObj<typeof ChatDemoToolCalling> = {
  render: () => <ChatDemoToolCalling />,
  name: 'Tool Calling & Function Execution',
  parameters: {
    docs: {
      description: {
        story: 'Tests the interface with tool calling scenarios, including function execution, results display, and error handling.',
      },
    },
  },
}

export const MarkdownResponses: StoryObj<typeof ChatDemoMarkdownResponses> = {
  render: () => <ChatDemoMarkdownResponses />,
  name: 'Markdown & Rich Text Responses',
  parameters: {
    docs: {
      description: {
        story: 'Tests how the chat interface renders markdown content including code blocks, tables, lists, and formatting.',
      },
    },
  },
}

export const UIComponents: StoryObj<typeof ChatDemoUIComponents> = {
  render: () => <ChatDemoUIComponents />,
  name: 'Custom UI Components',
  parameters: {
    docs: {
      description: {
        story: 'Tests the interface with custom UI components like charts, cards, and interactive elements.',
      },
    },
  },
}

export const FileUploads: StoryObj<typeof ChatDemoFileUploads> = {
  render: () => <ChatDemoFileUploads />,
  name: 'File Upload Scenarios',
  parameters: {
    docs: {
      description: {
        story: 'Tests various file upload scenarios including different file types, sizes, and upload states.',
      },
    },
  },
}

export const ErrorHandling: StoryObj<typeof ChatDemoErrorHandling> = {
  render: () => <ChatDemoErrorHandling />,
  name: 'Error Handling & Edge Cases',
  parameters: {
    docs: {
      description: {
        story: 'Tests error scenarios, loading states, and edge cases in the chat interface.',
      },
    },
  },
}

export const CapabilitiesInteraction: StoryObj<typeof ChatDemoCapabilitiesInteraction> = {
  render: () => <ChatDemoCapabilitiesInteraction />,
  name: 'Capabilities Menu Interaction',
  parameters: {
    docs: {
      description: {
        story: 'Tests the capabilities menu functionality, navigation, and action triggering.',
      },
    },
  },
}
