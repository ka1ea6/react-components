'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send, PaperclipIcon as PaperClip } from 'lucide-react'

import { type ChatMessageProps, ChatMessage } from './ChatMessage'
import { cn } from '@/lib/utils'

type FunctionType = {
    id: number
    name: string
}

type UserType = {
    id: number
    name: string
    email: string
    avatar: string
    role: string
}


interface ChatInterfaceProps {
  messages: ChatMessageProps[] // Initial messages to load in component
  contextType: 'project' | 'businessFunction' | 'global' // For if this component is being used as a project, function or homepage scoped chat
  currentUser?: UserType
  businessFunctions?: FunctionType[]
  isLoading?: boolean
}

/**
 * Custom Chat interface component
 */
export function ChatInterface({
  messages: initialMessages,
  contextType: contextType,
  currentUser,
  businessFunctions,
}: ChatInterfaceProps) {
  // State for chat messages
const [messages, setMessages] = useState<ChatMessageProps[]>(initialMessages);
// State for input field
const [input, setInput] = useState("");
// State for loading status
const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [selectedFunction, setSelectedFunction] = useState<number | null>(null)

// Scroll to bottom when messages change
useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Handle input change
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Create user message
    const userMessage: ChatMessageProps = {
      id: crypto.randomUUID(),
      role: "user",
      message: { type: 'text', data: {content: input}},
      currentUser: currentUser
    };
    
    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);
    
    // Clear input
    setInput("");
    
    // Set loading state
    setIsLoading(true);
}

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ScrollArea className="container flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full pt-60">
              <div className="text-center max-w-md">
                <h2 className="text-2xl font-bold mb-2">Welcome to Dexter</h2>
                <p className="text-zinc-400">
                  Ask me anything or direct your question to a business function directly using the
                  toolbar below.
                </p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex items-start gap-3">
              <Avatar className="ai-border">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI Assistant" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="grid gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-medium">AI Assistant</span>
                </div>
                <div className="rounded-lg p-3 text-sm bg-muted">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            </div>
          )}
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="p-4 bg-background mt-auto">
        <div className="flex items-center gap-2 mb-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            className="h-10 flex-grow"
            disabled={isLoading}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  console.log('File selected:', file.name)
                  setInput(`Uploading file: ${file.name}`)
                }
              }}
              disabled={isLoading}
            />
            <PaperClip className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </label>
          <Button type="submit" size="icon" className="shrink-0" disabled={isLoading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
        {input.startsWith('Uploading file:') && (
          <div className="text-sm text-muted-foreground mt-1">{input}</div>
        )}
      </form>
      {contextType === 'global' && businessFunctions && businessFunctions.length > 0 && (
        <div className="p-4">
          <div className="text-xs text-muted-foreground mb-2">
            Select business function context:
          </div>
          <div className="flex flex-wrap gap-1">
            {/* <button
            onClick={() => setSelectedFunction(null)}
            className={`p-2 mx-1 rounded text-xs ${
              selectedFunction === null
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            }`}
            type="button"
          >
            Global
          </button> */}
            {businessFunctions.map((func) => (
              <Button
                key={func.id}
                onClick={() => setSelectedFunction(func.id)}
                variant={selectedFunction === func.id ? 'default' : 'outline'}
                className={`p-2 mx-1 rounded text-xs ${
                  selectedFunction === func.id
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-background hover:bg-primary'
                }`}
                type="button"
              >
                {func.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
