"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Upload, Paperclip, X, FileText, Image as ImageIcon, File } from "lucide-react"
import { DigitalColleageusLayout } from "../DigitalColleagues/DigitalColleageusLayout"
import { ChatSessionSidebar, type ChatSession } from "./chat-session-sidebar"
import { AIChatInterface, type ChatMessage, type EnhancedChatMessage } from "../.archive/ai-chat-interface"
import { businessUnits } from "../DigitalColleagues/test-data"
import { testCapabilities as capabilities } from "../../test-data/capabilities"
import type { Capability } from "../../test-data/capabilities"
import { mockSidebarItems, mockNotifications } from "../DigitalColleagues/test-data"
import type { BusinessUnit } from "../DigitalColleagues/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Enhanced message types based on Vercel AI SDK patterns
export interface BaseMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  timestamp: Date
}

export interface TextMessage extends BaseMessage {
  type: 'text'
  content: string
}

export interface ImageMessage extends BaseMessage {
  type: 'image'
  content: string
  image: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
}

export interface FileMessage extends BaseMessage {
  type: 'file'
  content: string
  file: {
    name: string
    size: number
    type: string
    url: string
  }
}

export interface ToolMessage extends BaseMessage {
  type: 'tool-invocation'
  content: string
  tool: {
    name: string
    data: any
  }
}

export interface CardMessage extends BaseMessage {
  type: 'card'
  content: string
  card: {
    title: string
    description?: string
    data: any
    variant?: 'task' | 'artefact' | 'customer' | 'opportunity' | 'campaign' | 'generic'
  }
}

export interface ReferenceMessage extends BaseMessage {
  type: 'reference'
  content: string
  references: Array<{
    id: string
    title: string
    url?: string
    description?: string
    type?: 'document' | 'link' | 'internal'
  }>
}

export interface MenuMessage extends BaseMessage {
  type: 'menu'
  content: string
  menu: {
    title: string
    items: Array<{
      id: string
      label: string
      description?: string
      value: any
      action?: () => void
    }>
  }
}

export type EnhancedMessage = TextMessage | ImageMessage | FileMessage | ToolMessage | CardMessage | ReferenceMessage | MenuMessage

// File upload types
export interface FileUpload {
  id: string
  file: File
  preview?: string
  status: 'pending' | 'uploading' | 'uploaded' | 'error'
  progress?: number
}

const mockChatSessions: ChatSession[] = [
  {
    id: "1",
    title: "Logo Design Review",
    lastMessage: "The color palette looks great! Let's refine the typography...",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    teamId: "design",
  },
  {
    id: "2",
    title: "React Component Optimization",
    lastMessage: "Here's how you can improve the performance of your component...",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    teamId: "engineering",
  },
  {
    id: "3",
    title: "Campaign Strategy Discussion",
    lastMessage: "The target audience analysis shows promising results...",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    teamId: "marketing",
  },
  {
    id: "4",
    title: "Product Roadmap Planning",
    lastMessage: "Based on user feedback, I recommend prioritizing...",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    teamId: "product",
  },
]

interface CopilotInterfaceProps {
  initialTeam?: string
  initialMessages?: EnhancedMessage[]
  initialSessions?: ChatSession[]
  showCapabilities?: boolean
  title?: string
  businessUnits?: BusinessUnit[]
  enableFileUpload?: boolean
  maxFileSize?: number // in MB
  allowedFileTypes?: string[]
}

export function CopilotInterface({
  initialTeam = "design",
  initialMessages,
  initialSessions,
  showCapabilities = true,
  title = "Digital Colleagues",
  businessUnits: businessUnitsProp = businessUnits,
  enableFileUpload = true,
  maxFileSize = 10, // 10MB default
  allowedFileTypes = ['image/*', 'text/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
}: CopilotInterfaceProps = {}) {
  const [messages, setMessages] = useState<EnhancedMessage[]>(
    initialMessages || [
      {
        id: "1",
        role: "assistant",
        type: "text",
        content: "Hi! I'm your AI assistant with advanced capabilities. I can help with various tasks, access data, and provide contextual actions. What would you like to work on today?",
        timestamp: new Date(),
      },
    ]
  )
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState(
    businessUnitsProp.find(unit => unit.id === initialTeam) || businessUnitsProp[0]
  )
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(initialSessions || mockChatSessions)
  const [currentBusinessUnit, setCurrentBusinessUnit] = useState<BusinessUnit>(
    businessUnitsProp.find(unit => unit.id === initialTeam) || businessUnitsProp[0]
  )
  const [fileUploads, setFileUploads] = useState<FileUpload[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  // File upload handlers
  const handleFileUpload = (files: FileList | null) => {
    if (!files || !enableFileUpload) return

    const newUploads: FileUpload[] = []
    
    Array.from(files).forEach(file => {
      if (file.size > maxFileSize * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is ${maxFileSize}MB.`)
        return
      }

      if (allowedFileTypes.length > 0 && !allowedFileTypes.some(type => file.type.match(type))) {
        alert(`File type ${file.type} is not allowed.`)
        return
      }

      const upload: FileUpload = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        file,
        status: 'pending',
        progress: 0
      }

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setFileUploads(prev => prev.map(u => 
            u.id === upload.id 
              ? { ...u, preview: e.target?.result as string }
              : u
          ))
        }
        reader.readAsDataURL(file)
      }

      newUploads.push(upload)
    })

    setFileUploads(prev => [...prev, ...newUploads])
  }

  const removeFileUpload = (id: string) => {
    setFileUploads(prev => prev.filter(upload => upload.id !== id))
  }

  // Convert enhanced messages to ChatMessage format for AIChatInterface
  const convertedMessages = messages.map((msg): EnhancedChatMessage => ({
    id: msg.id,
    content: msg.content,
    type: msg.role === "user" ? "user" : "ai",
    timestamp: msg.timestamp,
    role: msg.role,
    messageType: msg.type,
    data: (msg as any).data,
    image: (msg as any).image,
    file: (msg as any).file,
    card: (msg as any).card,
    references: (msg as any).references,
    menu: (msg as any).menu,
  }))

  const handleSendMessage = async () => {
    if (!input.trim() && fileUploads.length === 0) return

    const userMessage: EnhancedMessage = {
      id: Date.now().toString(),
      role: "user",
      type: "text",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    
    // Handle file uploads
    if (fileUploads.length > 0) {
      fileUploads.forEach(upload => {
        if (upload.file.type.startsWith('image/')) {
          const imageMessage: ImageMessage = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            role: "user",
            type: "image",
            content: `Uploaded image: ${upload.file.name}`,
            image: {
              url: upload.preview || '',
              alt: upload.file.name,
              width: 0,
              height: 0
            },
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, imageMessage])
        } else {
          const fileMessage: FileMessage = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            role: "user",
            type: "file",
            content: `Uploaded file: ${upload.file.name}`,
            file: {
              name: upload.file.name,
              size: upload.file.size,
              type: upload.file.type,
              url: URL.createObjectURL(upload.file)
            },
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, fileMessage])
        }
      })
    }

    setInput("")
    setFileUploads([])
    setIsTyping(true)

    // Generate capability-aware responses with enhanced content
    setTimeout(() => {
      const teamCapabilities = capabilities.filter(cap => 
        cap.name.toLowerCase().includes(selectedTeam.name.toLowerCase()) ||
        selectedTeam.name.toLowerCase().includes(cap.name.toLowerCase())
      )
      
      // Generate different types of responses based on the input
      const responseType = Math.random()
      
      if (responseType < 0.3) {
        // Text response
        const textResponse: TextMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          type: "text",
          content: `I can help you with ${selectedTeam.name.toLowerCase()} tasks. Here are some capabilities I have: ${teamCapabilities.map(c => c.name).join(', ')}`,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, textResponse])
      } else if (responseType < 0.5) {
        // Card response
        const cardResponse: CardMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          type: "card",
          content: `Here's a ${selectedTeam.name.toLowerCase()} task I created for you:`,
          card: {
            title: `${selectedTeam.name} Task`,
            description: `A new task for ${selectedTeam.name.toLowerCase()} team`,
            variant: 'task',
            data: {
              id: Math.floor(Math.random() * 1000),
              name: `${selectedTeam.name} Task`,
              description: `Complete this ${selectedTeam.name.toLowerCase()} task`,
              status: 'todo',
              dateLogged: new Date().toISOString(),
              project: { id: 1, name: `${selectedTeam.name} Project` }
            }
          },
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, cardResponse])
      } else if (responseType < 0.7) {
        // Menu response
        const menuResponse: MenuMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          type: "menu",
          content: `Here are some ${selectedTeam.name.toLowerCase()} options:`,
          menu: {
            title: `${selectedTeam.name} Options`,
            items: teamCapabilities.slice(0, 3).map(cap => ({
              id: cap.id,
              label: cap.name,
              description: cap.description,
              value: cap.id
            }))
          },
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, menuResponse])
      } else {
        // Reference response
        const referenceResponse: ReferenceMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          type: "reference",
          content: `Here are some helpful ${selectedTeam.name.toLowerCase()} resources:`,
          references: [
            {
              id: "1",
              title: `${selectedTeam.name} Best Practices`,
              description: `Guidelines for ${selectedTeam.name.toLowerCase()} work`,
              type: 'document'
            },
            {
              id: "2",
              title: `${selectedTeam.name} Tools`,
              description: `Recommended tools for ${selectedTeam.name.toLowerCase()}`,
              type: 'link'
            }
          ],
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, referenceResponse])
      }

      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const startNewChat = () => {
    setCurrentSession(null)
    setMessages([
      {
        id: "1",
        role: "assistant",
        type: "text",
        content: `Hi! I'm your ${selectedTeam.name} AI assistant with advanced capabilities. I can help with ${selectedTeam.name.toLowerCase()} tasks, access relevant data, and provide contextual actions. What would you like to work on today?`,
        timestamp: new Date(),
      },
    ])
  }

  const loadChatSession = (session: ChatSession) => {
    setCurrentSession(session)
    const team = businessUnitsProp.find((unit) => unit.id === session.teamId) || businessUnitsProp[0]
    setSelectedTeam(team)
    setCurrentBusinessUnit(team)
    // In a real app, you'd load the actual messages from the session
    setMessages([
      {
        id: "1",
        role: "assistant",
        type: "text",
        content: session.lastMessage,
        timestamp: session.timestamp,
      },
    ])
  }

  const deleteChatSession = (sessionId: string) => {
    setChatSessions((prev) => prev.filter((session) => session.id !== sessionId))
    if (currentSession?.id === sessionId) {
      startNewChat()
    }
  }

  const editChatSession = (sessionId: string) => {
    console.log("Edit session:", sessionId)
    // Implement edit functionality
  }

  const handleBusinessUnitChange = (unit: BusinessUnit) => {
    setCurrentBusinessUnit(unit)
    setSelectedTeam(unit)
    console.log("Business unit changed to:", unit.name)
  }

  const handleCopilotClick = () => {
    console.log("Copilot clicked from header")
    // Could navigate to copilot or perform some action
  }

  const handleNotificationRemove = (id: string) => {
    console.log("Notification removed:", id)
    // Handle notification removal logic
  }

  const handleRemoveAll = () => {
    console.log("All notifications removed")
    // Handle remove all logic
  }


  return (
    <DigitalColleageusLayout
      sidebarItems={mockSidebarItems}
      title={title}
      notifications={mockNotifications}
      businessUnits={businessUnitsProp}
      currentBusinessUnit={currentBusinessUnit}
      onBusinessUnitChange={handleBusinessUnitChange}
      showTabs={false}
      onActionClick={handleCopilotClick}
      actionIcon={<Users className="mr-2 h-4 w-4" />}
      actionText="Collaborate"
      onNotificationRemove={handleNotificationRemove}
      onRemoveAll={handleRemoveAll}
      logo="/headerlogo.png"
      appName="Nuvia"
      tagline="AI-Powered Workspace"
    >
      <AnimatePresence mode="wait">
        <motion.div
          className="flex-1 h-full"
          key="chat-interface"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
 <div className="h-full flex">
            <div className="w-80 bg-muted/50 flex-shrink-0 h-full p-2">
              <ChatSessionSidebar
                sessions={chatSessions}
                currentSession={currentSession}
                teams={businessUnitsProp}
                onNewChat={startNewChat}
                onSessionSelect={loadChatSession}
                onSessionEdit={editChatSession}
                onSessionDelete={deleteChatSession}
              />
            </div>
            <div className="flex-1 h-full p-2">
              <AIChatInterface
                messages={convertedMessages}
                input={input}
                isTyping={isTyping}
                selectedTeam={selectedTeam}
                currentSessionTitle={currentSession?.title}
                capabilities={capabilities}
                showCapabilities={showCapabilities}
                onInputChange={setInput}
                onSendMessage={handleSendMessage}
                onKeyPress={handleKeyPress}
                fileUploads={fileUploads}
                isDragOver={isDragOver}
                enableFileUpload={enableFileUpload}
                onFileUpload={handleFileUpload}
                onRemoveFile={removeFileUpload}
                onDragOver={setIsDragOver}
              />
            </div>
          </div>
                  </motion.div>
      </AnimatePresence>
    </DigitalColleageusLayout>
  )
}
