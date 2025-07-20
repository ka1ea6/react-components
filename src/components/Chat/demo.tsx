/**
 * Demo component to test the updated ChatInterface with:
 * - No top menu clutter
 * - Working file uploads
 * - Capabilities menu at bottom that scrolls into view
 */

import React, { useState } from 'react'
import { CopilotInterface } from './CopilotInterface'
import type { UIMessage } from 'ai'
import { testCapabilities } from '../../test-data/capabilities'

const demoMessages: UIMessage[] = [
  {
    id: '1',
    role: 'user',
    parts: [
      { type: 'text', text: 'Hello! Can you help me with a task?' }
    ]
  },
  {
    id: '2',
    role: 'assistant',
    parts: [
      { type: 'text', text: 'Of course! I can help you with various tasks. Try uploading a file or use the capabilities menu at the bottom to see what I can do.' }
    ]
  }
]

export function ChatDemo() {
  const [messages, setMessages] = useState<UIMessage[]>(demoMessages)

  return (
    <div className="h-screen w-full">
      <CopilotInterface
        messages={messages}
        capabilities={testCapabilities}
        enableFileUpload={true}
        maxFileSize={10}
        allowedFileTypes={['*']}
        businessUnits={[]}
        sessions={[]}
        notifications={[]}
        onNewChat={() => setMessages([])}
        onSessionSelect={() => {}}
        onSessionDelete={() => {}}
        showCapabilities={true}
      />
    </div>
  )
}
