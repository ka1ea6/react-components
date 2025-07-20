"use client"

import type React from "react"
import type { UIMessage } from "ai"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Upload, Paperclip, X, FileText, Image as ImageIcon, File } from "lucide-react"
import { DigitalColleageusLayout } from "../DigitalColleagues/DigitalColleageusLayout"
import { ChatSessionSidebar, type ChatSession } from "./chat-session-sidebar"
import { AIChatInterface, type ChatMessage, type EnhancedChatMessage } from "../.archive/ai-chat-interface"
import type { Capability } from "../../test-data/capabilities"
import type { BusinessUnit } from "../DigitalColleagues/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// File upload types
export interface FileUpload {
  id: string
  file: File
  preview?: string
  status: 'pending' | 'uploading' | 'uploaded' | 'error'
  progress?: number
}

interface CopilotInterfaceProps {
  // Required props (but made safe for testing)
  messages?: UIMessage[]
  businessUnits?: BusinessUnit[]
  capabilities?: Capability[]
  sidebarItems?: any[]
  notifications?: any[]
  sessions?: ChatSession[]
  
  // Event handlers
  onNewChat: () => void
  onSessionSelect: (session: ChatSession) => void
  onSessionDelete: (sessionId: string) => void
  onSessionEdit?: (sessionId: string) => void
  onBusinessUnitChange?: (unit: BusinessUnit) => void
  onNotificationRemove?: (id: string) => void
  onRemoveAll?: () => void
  onActionClick?: () => void
  onSearch?: (query: string) => void
  
  // Optional customization
  initialTeam?: string
  currentSession?: ChatSession | null
  showCapabilities?: boolean
  title?: string
  enableFileUpload?: boolean
  maxFileSize?: number // in MB
  allowedFileTypes?: string[]
  
  // Layout customization
  logo?: string
  appName?: string
  tagline?: string
  actionIcon?: React.ReactNode
  actionText?: string
}

export function CopilotInterface({
  // Required props with defaults for safety
  messages = [],
  businessUnits = [],
  capabilities = [],
  sidebarItems = [],
  notifications = [],
  sessions = [],
  
  // Event handlers
  onNewChat,
  onSessionSelect,
  onSessionDelete,
  onSessionEdit = () => console.log("Session edit not implemented"),
  onBusinessUnitChange = () => {},
  onNotificationRemove = () => {},
  onRemoveAll = () => {},
  onActionClick = () => {},
  onSearch = (query: string) => console.log("Search query:", query),
  
  // Optional customization
  initialTeam = "design",
  currentSession = null,
  showCapabilities = true,
  title = "Digital Colleagues",
  enableFileUpload = true,
  maxFileSize = 10, // 10MB default
  allowedFileTypes = ['image/*', 'text/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  
  // Layout customization
  logo = "/headerlogo.png",
  appName = "Nuvia",
  tagline = "AI-Powered Workspace",
  actionIcon = <Users className="mr-2 h-4 w-4" />,
  actionText = "Collaborate",
}: CopilotInterfaceProps) {
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  
  // Safe initialization of business units with fallback
  const safeBusinessUnits = businessUnits || []
  const fallbackBusinessUnit: BusinessUnit = {
    id: 'default',
    name: 'Default Team',
    description: 'Default team when no business units are available',
    icon: '🏢',
    color: 'bg-gray-500',
    accentColor: 'bg-gray-600'
  }
  
  const [selectedTeam, setSelectedTeam] = useState(() => {
    if (safeBusinessUnits.length === 0) return fallbackBusinessUnit
    return safeBusinessUnits.find(unit => unit.id === initialTeam) || safeBusinessUnits[0]
  })
  
  const [currentBusinessUnit, setCurrentBusinessUnit] = useState<BusinessUnit>(() => {
    if (safeBusinessUnits.length === 0) return fallbackBusinessUnit
    return safeBusinessUnits.find(unit => unit.id === initialTeam) || safeBusinessUnits[0]
  })
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

  // Convert UIMessage to EnhancedChatMessage format for AIChatInterface
  const convertedMessages = (messages || []).map((msg): EnhancedChatMessage => ({
    id: msg.id,
    content: extractContentFromParts(msg.parts),
    type: msg.role === "user" ? "user" : "ai",
    timestamp: new Date(), // UIMessage doesn't have timestamp, so we use current date
    role: msg.role,
    messageType: getMessageType(msg),
    data: getMessageData(msg),
    image: getImageData(msg),
    file: getFileData(msg),
    card: getCardData(msg),
    references: getReferenceData(msg),
    menu: getMenuData(msg),
  }))

  // Helper function to extract text content from parts
  function extractContentFromParts(parts: any[]): string {
    if (!parts || !Array.isArray(parts)) return ''
    const textPart = parts.find(part => part?.type === 'text')
    return textPart?.text || ''
  }

  // Helper functions to extract data from UIMessage annotations
  function getMessageType(msg: UIMessage): "text" | "file" | "image" | "card" | "reference" | "menu" | "tool-invocation" {
    const annotations = (msg as any).annotations
    const type = annotations?.[0]?.type || 'text'
    // Map to expected values
    const typeMap: Record<string, "text" | "file" | "image" | "card" | "reference" | "menu" | "tool-invocation"> = {
      'image': 'image',
      'file': 'file', 
      'card': 'card',
      'reference': 'reference',
      'menu': 'menu',
      'tool-invocation': 'tool-invocation'
    }
    return typeMap[type] || 'text'
  }

  function getMessageData(msg: UIMessage): any {
    const annotations = (msg as any).annotations
    return annotations?.[0]?.data || (msg as any).data
  }

  function getImageData(msg: UIMessage) {
    const annotations = (msg as any).annotations
    return annotations?.find((a: any) => a.type === 'image')?.data
  }

  function getFileData(msg: UIMessage) {
    const annotations = (msg as any).annotations
    return annotations?.find((a: any) => a.type === 'file')?.data
  }

  function getCardData(msg: UIMessage) {
    const annotations = (msg as any).annotations
    return annotations?.find((a: any) => a.type === 'card')?.data
  }

  function getReferenceData(msg: UIMessage) {
    const annotations = (msg as any).annotations
    return annotations?.find((a: any) => a.type === 'reference')?.data?.references
  }

  function getMenuData(msg: UIMessage) {
    const annotations = (msg as any).annotations
    return annotations?.find((a: any) => a.type === 'menu')?.data
  }

  const handleSendMessage = () => {
    if (!input.trim() && fileUploads.length === 0) return

    // Note: In a real implementation, you would handle the message sending
    // through props callbacks to the parent component
    console.log("Message to send:", input)
    console.log("Files to upload:", fileUploads)

    setInput("")
    setFileUploads([])
    setIsTyping(true)

    // Simulate typing indicator
    setTimeout(() => {
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleBusinessUnitChangeInternal = (unit: BusinessUnit) => {
    if (unit) {
      setCurrentBusinessUnit(unit)
      setSelectedTeam(unit)
      onBusinessUnitChange?.(unit)
    }
  }


  return (
    <DigitalColleageusLayout
      sidebarItems={sidebarItems || []}
      title={title}
      notifications={notifications || []}
      businessUnits={safeBusinessUnits}
      currentBusinessUnit={currentBusinessUnit}
      onBusinessUnitChange={handleBusinessUnitChangeInternal}
      onSearch={onSearch}
      showTabs={false}
      onActionClick={onActionClick}
      actionIcon={actionIcon}
      actionText={actionText}
      onNotificationRemove={onNotificationRemove}
      onRemoveAll={onRemoveAll}
      logo={logo}
      appName={appName}
      tagline={tagline}
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
                sessions={sessions || []}
                currentSession={currentSession}
                teams={safeBusinessUnits}
                onNewChat={onNewChat}
                onSessionSelect={onSessionSelect}
                onSessionEdit={onSessionEdit}
                onSessionDelete={onSessionDelete}
              />
            </div>
            <div className="flex-1 h-full p-2">
              <AIChatInterface
                messages={convertedMessages}
                input={input}
                isTyping={isTyping}
                selectedTeam={selectedTeam}
                currentSessionTitle={currentSession?.title}
                capabilities={capabilities || []}
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
