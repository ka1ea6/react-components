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
export function ChatInterfaceMessages({
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
    </div>
  )
}
