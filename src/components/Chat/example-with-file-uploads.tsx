/**
 * Example: AI Chat with File Uploads using Vercel AI SDK v5
 * 
 * This example demonstrates how to properly integrate file uploads 
 * with the useChat hook from @ai-sdk/react.
 * 
 * Key concepts:
 * 1. Using sendMessage with files parameter
 * 2. Converting File[] to FileList
 * 3. Handling different file types (images, text, PDFs)
 * 4. Displaying uploaded files in the chat
 */

"use client"

import React, { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import type { UIMessage } from 'ai'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Paperclip } from 'lucide-react'

interface SimpleFileUploadChatProps {
  apiEndpoint?: string
  maxFileSize?: number
  allowedFileTypes?: string[]
}

export function SimpleFileUploadChat({
  apiEndpoint = '/api/chat',
  maxFileSize = 10,
  allowedFileTypes = ['image/*', 'text/*', 'application/pdf']
}: SimpleFileUploadChatProps) {
  // Initialize the AI SDK chat hook
  const chatHook = useChat({
    onError: (error) => {
      console.error('Chat error:', error)
    },
    onFinish: (message) => {
      console.log('Message finished:', message)
    }
  })

  const [input, setInput] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  // Helper function to create FileList from File objects
  const createFileList = (files: File[]): FileList => {
    const dataTransfer = new DataTransfer()
    files.forEach(file => dataTransfer.items.add(file))
    return dataTransfer.files
  }

  // Enhanced send message function that handles files
  const handleSendWithFiles = () => {
    if (!input.trim() && selectedFiles.length === 0) return

    // Convert File[] to FileList for AI SDK
    const fileList = selectedFiles.length > 0 
      ? createFileList(selectedFiles) 
      : undefined

    // Send message with files using AI SDK
    chatHook.sendMessage(
      { 
        text: input,
        files: fileList 
      },
      // Optional: Add custom body fields
      {
        body: {
          timestamp: Date.now(),
          fileCount: selectedFiles.length,
        }
      }
    )

    // Clear input and files after sending
    setInput('')
    setSelectedFiles([])
  }

  // File selection handler
  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const validFiles: File[] = []
    
    Array.from(files).forEach(file => {
      // Validate file size
      if (file.size > maxFileSize * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is ${maxFileSize}MB.`)
        return
      }

      // Validate file type
      if (allowedFileTypes.length > 0 && !allowedFileTypes.some(type => file.type.match(type))) {
        alert(`File type ${file.type} is not allowed.`)
        return
      }

      validFiles.push(file)
    })

    setSelectedFiles(prev => [...prev, ...validFiles])
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Chat with File Uploads</h1>
      
      {/* Messages Display */}
      <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
        {chatHook.messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            }`}>
              {message.parts.map((part, index) => {
                if (part.type === 'text') {
                  return <p key={index}>{(part as any).text}</p>
                }
                if (part.type === 'file') {
                  const filePart = part as any
                  return (
                    <div key={index} className="mb-2">
                      <p className="text-sm font-semibold">📎 {filePart.filename || filePart.name}</p>
                      {filePart.mediaType?.startsWith('image/') && (
                        <img src={filePart.url} alt={filePart.filename} className="max-w-full h-auto rounded" />
                      )}
                    </div>
                  )
                }
                return null
              })}
            </div>
          </div>
        ))}
      </div>

      {/* File Preview */}
      {selectedFiles.length > 0 && (
        <div className="mb-4 p-3 bg-gray-100 rounded-lg">
          <p className="text-sm font-semibold mb-2">Selected Files:</p>
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm">{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
              <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSendWithFiles()
            }
          }}
          placeholder="Type your message..."
          className="flex-1"
          disabled={chatHook.status === 'streaming'}
        />
        
        {/* File Upload Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            const inputElement = document.createElement('input')
            inputElement.type = 'file'
            inputElement.multiple = true
            inputElement.accept = allowedFileTypes.join(',')
            inputElement.onchange = (e) => {
              const files = (e.target as HTMLInputElement).files
              handleFileSelect(files)
            }
            inputElement.click()
          }}
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        
        {/* Send Button */}
        <Button
          onClick={handleSendWithFiles}
          disabled={(!input.trim() && selectedFiles.length === 0) || chatHook.status === 'streaming'}
        >
          {chatHook.status === 'streaming' ? 'Sending...' : 'Send'}
        </Button>
      </div>

      {/* Error Display */}
      {chatHook.error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg">
          Error: {chatHook.error.message}
        </div>
      )}
    </div>
  )
}

/**
 * Server-side API route example (/api/chat/route.ts)
 * 
 * ```typescript
 * import { openai } from '@ai-sdk/openai'
 * import { convertToModelMessages, streamText, UIMessage } from 'ai'
 * 
 * export async function POST(req: Request) {
 *   const { messages, fileCount, timestamp }: { 
 *     messages: UIMessage[], 
 *     fileCount?: number,
 *     timestamp?: number 
 *   } = await req.json()
 * 
 *   console.log('Received message with', fileCount, 'files at', timestamp)
 * 
 *   const result = streamText({
 *     model: openai('gpt-4o'), // Use a model that supports vision for images
 *     system: 'You are a helpful assistant that can analyze files and images.',
 *     messages: convertToModelMessages(messages),
 *   })
 * 
 *   return result.toUIMessageStreamResponse()
 * }
 * ```
 * 
 * Key features of this approach:
 * 
 * 1. **File Conversion**: FileUpload[] → FileList for AI SDK compatibility
 * 2. **Multiple File Types**: Supports images, text, PDFs with validation
 * 3. **Custom Metadata**: Additional data can be sent in the request body
 * 4. **Error Handling**: File size and type validation with user feedback
 * 5. **Image Previews**: Automatic preview generation for image files
 * 6. **AI SDK Integration**: Proper use of sendMessage with files parameter
 */

export default SimpleFileUploadChat
