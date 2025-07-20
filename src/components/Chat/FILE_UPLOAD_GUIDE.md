# File Uploads with AI SDK useChat Hook

This guide explains how to implement file attachments with the Vercel AI SDK v5 `useChat` hook.

## Key Concepts

1. **Use `sendMessage` with files parameter** - The AI SDK's `sendMessage` method accepts a `files` parameter
2. **Convert File[] to FileList** - The AI SDK expects a `FileList`, not an array of `File` objects
3. **Handle file validation** - Validate file size, type, and other constraints before sending
4. **Display files in chat** - Render uploaded files in the message parts

## Basic Implementation

```tsx
import { useChat } from '@ai-sdk/react'

const MyChat = () => {
  const chatHook = useChat({
    // your configuration
  })
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [input, setInput] = useState('')
  
  // Helper function to create FileList from File objects
  const createFileList = (files: File[]): FileList => {
    const dataTransfer = new DataTransfer()
    files.forEach(file => dataTransfer.items.add(file))
    return dataTransfer.files
  }
  
  const handleSendWithFiles = () => {
    const fileList = selectedFiles.length > 0 
      ? createFileList(selectedFiles) 
      : undefined
    
    chatHook.sendMessage({ 
      text: input, 
      files: fileList 
    })
    
    setInput('')
    setSelectedFiles([])
  }
  
  // ... rest of your component
}
```

## File Validation

```tsx
const handleFileSelect = (files: FileList | null) => {
  if (!files) return

  const maxFileSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = ['image/*', 'text/*', 'application/pdf']
  const validFiles: File[] = []
  
  Array.from(files).forEach(file => {
    // Validate file size
    if (file.size > maxFileSize) {
      alert(`File ${file.name} is too large. Maximum size is 10MB.`)
      return
    }

    // Validate file type
    if (!allowedTypes.some(type => file.type.match(type))) {
      alert(`File type ${file.type} is not allowed.`)
      return
    }

    validFiles.push(file)
  })

  setSelectedFiles(prev => [...prev, ...validFiles])
}
```

## Server-Side Handling

Your API route will receive the files in the `messages` array as file parts:

```typescript
// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai'
import { convertToModelMessages, streamText, UIMessage } from 'ai'

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  // Messages with files will have parts like:
  // {
  //   role: 'user',
  //   parts: [
  //     { type: 'text', text: 'Here is my file' },
  //     { 
  //       type: 'file', 
  //       mimeType: 'image/jpeg',
  //       data: 'base64-encoded-data',
  //       url: 'data:image/jpeg;base64,...'
  //     }
  //   ]
  // }

  const result = streamText({
    model: openai('gpt-4o'), // Use a model that supports vision for images
    system: 'You are a helpful assistant that can analyze files and images.',
    messages: convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
```

## Displaying Files in Chat

Files will appear in the `message.parts` array with `type: 'file'`:

```tsx
{messages.map((message) => (
  <div key={message.id}>
    {message.parts.map((part, index) => {
      if (part.type === 'text') {
        return <p key={index}>{part.text}</p>
      }
      
      if (part.type === 'file') {
        const filePart = part as any
        return (
          <div key={index} className="mb-2">
            <p className="text-sm font-semibold">
              📎 {filePart.filename || filePart.name}
            </p>
            {filePart.mediaType?.startsWith('image/') && (
              <img 
                src={filePart.url} 
                alt={filePart.filename} 
                className="max-w-full h-auto rounded" 
              />
            )}
          </div>
        )
      }
      
      return null
    })}
  </div>
))}
```

## Integration with CopilotInterface

If using the `CopilotInterface` component, the file upload functionality is already integrated. You just need to pass the correct `useChat` hook:

```tsx
import { CopilotInterface } from '@/components/Chat'
import { useChat } from '@ai-sdk/react'

const MyApp = () => {
  const chatHook = useChat({
    // your configuration
  })

  return (
    <CopilotInterface
      useCustomChat={chatHook}
      enableAI={true}
      enableFileUpload={true}
      maxFileSize={10}
      allowedFileTypes={['image/*', 'text/*', 'application/pdf']}
      // ... other props
    />
  )
}
```

## Complete Example

See `example-with-file-uploads.tsx` for a complete working example that demonstrates:

- File selection and validation
- Converting File[] to FileList
- Sending messages with files using `sendMessage`
- Displaying files in the chat interface
- Error handling

## Supported File Types

The AI SDK automatically converts certain file types to multi-modal content:

- **Images** (`image/*`) - Converted to image parts for vision models
- **Text files** (`text/*`) - Content is extracted and included as text
- **Other files** - Included as file attachments with metadata

## Best Practices

1. **Validate file size and type** before sending
2. **Use appropriate models** - Use vision-capable models (like GPT-4o) for images
3. **Handle errors gracefully** - Show user-friendly error messages
4. **Provide file previews** - Show thumbnails or file info before sending
5. **Clear files after sending** - Reset the file selection after successful send
6. **Add loading states** - Show upload progress and sending status

## Troubleshooting

### Files not appearing in messages
- Make sure you're converting File[] to FileList using the helper function
- Verify your server is configured to handle multipart/form-data

### Large file errors
- Check your file size validation
- Verify your server's upload size limits
- Consider implementing chunked uploads for very large files

### File type issues
- Ensure your file type validation matches what the AI model supports
- Check that the MIME type is correctly detected
