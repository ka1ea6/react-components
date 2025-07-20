/**
 * Example of how to use the chat components with Vercel AI SDK v5
 * 
 * This example shows how to:
 * 1. Use UIMessage directly from the AI SDK
 * 2. Handle different part types in messages
 * 3. Create custom tools and data parts
 */

import { CopilotInterface } from '@/components/Chat'
import type { UIMessage } from 'ai'

// Example messages using the AI SDK v5 structure
const exampleMessages: UIMessage[] = [
  // Simple text message
  {
    id: '1',
    role: 'user',
    parts: [
      { type: 'text', text: 'Hello, can you help me with a task?' }
    ]
  },
  
  // Assistant response with text
  {
    id: '2',
    role: 'assistant',
    parts: [
      { type: 'text', text: 'Of course! I can help you create and manage tasks.' }
    ]
  },
  
  // User message with file attachment
  {
    id: '3',
    role: 'user',
    parts: [
      { type: 'text', text: 'Here is a file with project requirements' },
      { 
        type: 'file',
        mimeType: 'application/pdf',
        url: '/path/to/file.pdf'
      } as any // Type assertion for demo purposes
    ]
  },
  
  // Assistant response with tool invocation (following AI SDK v5 pattern)
  {
    id: '4',
    role: 'assistant',
    parts: [
      { type: 'text', text: 'I\'ll create a task based on your requirements.' },
      {
        type: 'tool-task', // tool-{toolName} pattern
        toolCallId: 'call-123',
        state: 'output-available',
        input: {
          title: 'Project Requirements Review',
          description: 'Review and analyze the uploaded requirements document'
        },
        output: {
          id: 'task-123',
          title: 'Project Requirements Review',
          description: 'Review and analyze the uploaded requirements document',
          status: 'created',
          assignee: 'AI Assistant',
          priority: 'high'
        }
      }
    ]
  },
  
  // Assistant response with custom data part (for references)
  {
    id: '5',
    role: 'assistant',
    parts: [
      { type: 'text', text: 'Here are some relevant resources for your project:' },
      {
        type: 'data-reference', // data-{dataType} pattern for custom UI
        data: {
          references: [
            {
              id: 'ref-1',
              title: 'Project Management Best Practices',
              url: 'https://example.com/pm-best-practices',
              description: 'Comprehensive guide to project management',
              type: 'document'
            },
            {
              id: 'ref-2',
              title: 'Requirements Gathering Template',
              url: 'https://example.com/requirements-template',
              description: 'Template for gathering project requirements',
              type: 'link'
            }
          ]
        }
      }
    ]
  },
  
  // Assistant response with menu/options
  {
    id: '6',
    role: 'assistant',
    parts: [
      { type: 'text', text: 'What would you like to do next?' },
      {
        type: 'data-menu',
        data: {
          title: 'Available Actions',
          items: [
            {
              id: 'action-1',
              label: 'Create another task',
              description: 'Set up a new task for the project',
              action: () => console.log('Create task clicked')
            },
            {
              id: 'action-2',
              label: 'View project timeline',
              description: 'See the project schedule and milestones',
              action: () => console.log('View timeline clicked')
            },
            {
              id: 'action-3',
              label: 'Assign team members',
              description: 'Add team members to the project',
              action: () => console.log('Assign team clicked')
            }
          ]
        }
      }
    ]
  }
]

// Example usage of the CopilotInterface component
export function ExampleChatInterface() {
  return (
    <CopilotInterface
      messages={exampleMessages}
      businessUnits={[
        {
          id: 'engineering',
          name: 'Engineering',
          description: 'Software development team',
          icon: '⚙️',
          color: 'bg-blue-500',
          accentColor: 'bg-blue-600'
        }
      ]}
      capabilities={[]}
      sessions={[]}
      onNewChat={() => console.log('New chat started')}
      onSessionSelect={(session) => console.log('Session selected:', session)}
      onSessionDelete={(sessionId) => console.log('Session deleted:', sessionId)}
      enableFileUpload={true}
      title="AI Assistant"
    />
  )
}

/**
 * Key points about the simplified approach:
 * 
 * 1. **Use UIMessage directly**: No need for custom EnhancedMessage types
 * 
 * 2. **Leverage parts system**: Different content types are handled through message.parts
 *    - 'text' parts for regular text content
 *    - 'file' parts for file attachments
 *    - 'tool-{toolName}' parts for tool invocations (following AI SDK v5 pattern)
 *    - 'data-{dataType}' parts for custom UI components
 * 
 * 3. **Tool parts follow AI SDK v5 pattern**:
 *    - type: 'tool-{toolName}'
 *    - state: 'input-available' | 'output-available' | 'output-error'
 *    - args: input parameters
 *    - output: tool execution results
 * 
 * 4. **Custom data parts for UI components**:
 *    - type: 'data-{dataType}' (e.g., 'data-reference', 'data-menu')
 *    - Contains the data needed to render custom UI components
 * 
 * 5. **Helper functions available**:
 *    - getTextContent(message): Extract all text from message parts
 *    - hasToolPart(message, toolName): Check if message has specific tool
 *    - getToolPart(message, toolName): Get specific tool part
 *    - hasFilePart(message): Check if message has file attachments
 *    - getFileParts(message): Get all file parts
 *    - hasDataPart(message, dataType): Check for custom data parts
 *    - getDataPart(message, dataType): Get specific data part
 */
