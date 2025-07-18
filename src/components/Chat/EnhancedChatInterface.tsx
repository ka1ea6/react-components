"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, Menu, Upload, Paperclip, X, FileText, Image as ImageIcon, File, Download, ExternalLink } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { BusinessUnit } from "../DigitalColleagues/types"
import { CapabilityMenu } from "./capability-menu"
import { getContextualActions } from "../../test-data/capabilities"
import type { CapabilityContext, Capability } from "../../test-data/capabilities"
import { ChatCardTask } from "./ChatCardTask"
import { ChatCardArtefact } from "./ChatCardArtefact"
import type { EnhancedMessage, FileUpload, TextMessage, ImageMessage, FileMessage, ToolMessage, CardMessage, ReferenceMessage, MenuMessage } from "./CopilotInterface"

interface EnhancedChatInterfaceProps {
  messages: EnhancedMessage[]
  input: string
  isTyping?: boolean
  selectedTeam?: BusinessUnit
  currentSessionTitle?: string
  capabilities: Capability[]
  fileUploads: FileUpload[]
  isDragOver: boolean
  enableFileUpload: boolean
  onInputChange: (value: string) => void
  onSendMessage: () => void
  onKeyPress?: (e: React.KeyboardEvent) => void
  onFileUpload: (files: FileList | null) => void
  onRemoveFile: (id: string) => void
  onDragOver: (isDragOver: boolean) => void
  className?: string
}

export function EnhancedChatInterface({
  messages,
  input,
  isTyping = false,
  selectedTeam,
  currentSessionTitle,
  capabilities,
  fileUploads,
  isDragOver,
  enableFileUpload,
  onInputChange,
  onSendMessage,
  onKeyPress,
  onFileUpload,
  onRemoveFile,
  onDragOver,
  className,
}: EnhancedChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showCapabilities, setShowCapabilities] = useState(false)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const contextualActions = getContextualActions({
    path: [],
    selectedItems: [],
    filters: selectedTeam ? { teamId: selectedTeam.id } : {}
  })

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileUpload(e.target.files)
    if (e.target.files) {
      e.target.value = ''
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    onDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    onDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    onDragOver(false)
    onFileUpload(e.dataTransfer.files)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="h-4 w-4" />
    if (type.startsWith('text/')) return <FileText className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  const renderMessage = (message: EnhancedMessage) => {
    const isAssistant = message.role === 'assistant'
    const isUser = message.role === 'user'

    switch (message.type) {
      case 'text':
        return (
          <div className={cn(
            "flex items-start gap-3 mb-4",
            isUser ? "flex-row-reverse" : ""
          )}>
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className={cn(
                isUser ? "bg-primary text-primary-foreground" : "bg-muted"
              )}>
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <div className={cn(
              "max-w-[80%] rounded-lg px-4 py-2",
              isUser ? "bg-primary text-primary-foreground" : "bg-muted"
            )}>
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        )

      case 'image':
        return (
          <div className={cn(
            "flex items-start gap-3 mb-4",
            isUser ? "flex-row-reverse" : ""
          )}>
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className={cn(
                isUser ? "bg-primary text-primary-foreground" : "bg-muted"
              )}>
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <div className={cn(
              "max-w-[80%] rounded-lg overflow-hidden",
              isUser ? "bg-primary text-primary-foreground" : "bg-muted"
            )}>
              <img 
                src={message.image.url} 
                alt={message.image.alt || "Uploaded image"}
                className="max-w-full h-auto max-h-64 object-cover"
              />
              {message.content && (
                <div className="p-2">
                  <p className="text-sm">{message.content}</p>
                </div>
              )}
            </div>
          </div>
        )

      case 'file':
        return (
          <div className={cn(
            "flex items-start gap-3 mb-4",
            isUser ? "flex-row-reverse" : ""
          )}>
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className={cn(
                isUser ? "bg-primary text-primary-foreground" : "bg-muted"
              )}>
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <div className={cn(
              "max-w-[80%] rounded-lg px-4 py-2",
              isUser ? "bg-primary text-primary-foreground" : "bg-muted"
            )}>
              <div className="flex items-center gap-2">
                {getFileIcon(message.file.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{message.file.name}</p>
                  <p className="text-xs opacity-70">{formatFileSize(message.file.size)}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(message.file.url, '_blank')}
                  className="h-8 w-8 p-0"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              {message.content && (
                <p className="text-sm mt-2">{message.content}</p>
              )}
            </div>
          </div>
        )

      case 'card':
        return (
          <div className={cn(
            "flex items-start gap-3 mb-4",
            isUser ? "flex-row-reverse" : ""
          )}>
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className={cn(
                isUser ? "bg-primary text-primary-foreground" : "bg-muted"
              )}>
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <div className="max-w-[80%]">
              {message.content && (
                <div className="mb-2">
                  <p className="text-sm">{message.content}</p>
                </div>
              )}
              {message.card.variant === 'task' && (
                <ChatCardTask 
                  data={{
                    id: message.card.data.id,
                    fetchLatest: false,
                    taskData: message.card.data
                  }}
                />
              )}
              {message.card.variant === 'artefact' && (
                <ChatCardArtefact 
                  artefact={message.card.description || ''}
                  taskId={message.card.data.id}
                  taskData={message.card.data}
                />
              )}
              {message.card.variant === 'generic' && (
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle className="text-lg">{message.card.title}</CardTitle>
                    {message.card.description && (
                      <CardDescription>{message.card.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <pre className="text-sm">{JSON.stringify(message.card.data, null, 2)}</pre>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )

      case 'reference':
        return (
          <div className={cn(
            "flex items-start gap-3 mb-4",
            isUser ? "flex-row-reverse" : ""
          )}>
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className={cn(
                isUser ? "bg-primary text-primary-foreground" : "bg-muted"
              )}>
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <div className="max-w-[80%]">
              {message.content && (
                <div className="mb-2">
                  <p className="text-sm">{message.content}</p>
                </div>
              )}
              <Card className="w-full">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {message.references.map((ref) => (
                      <div key={ref.id} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                        <Badge variant="outline">{ref.type}</Badge>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{ref.title}</p>
                          {ref.description && (
                            <p className="text-xs text-muted-foreground truncate">{ref.description}</p>
                          )}
                        </div>
                        {ref.url && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(ref.url, '_blank')}
                            className="h-8 w-8 p-0"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 'menu':
        return (
          <div className={cn(
            "flex items-start gap-3 mb-4",
            isUser ? "flex-row-reverse" : ""
          )}>
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className={cn(
                isUser ? "bg-primary text-primary-foreground" : "bg-muted"
              )}>
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <div className="max-w-[80%]">
              {message.content && (
                <div className="mb-2">
                  <p className="text-sm">{message.content}</p>
                </div>
              )}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-lg">{message.menu.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {message.menu.items.map((item) => (
                      <Button
                        key={item.id}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={item.action}
                      >
                        <div className="text-left">
                          <p className="font-medium">{item.label}</p>
                          {item.description && (
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          )}
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            {currentSessionTitle || "Chat"}
          </h2>
          {selectedTeam && (
            <Badge variant="secondary">{selectedTeam.name}</Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowCapabilities(!showCapabilities)}
          className="h-8 w-8 p-0"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Capabilities Panel */}
      <AnimatePresence>
        {showCapabilities && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden border-b"
          >
            <CapabilityMenu
              capabilities={capabilities}
              isOpen={showCapabilities}
              onToggle={() => setShowCapabilities(!showCapabilities)}
              onActionSelect={(actionId, context) => {
                console.log('Action selected:', actionId, context)
                setShowCapabilities(false)
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <ScrollArea 
        className="flex-1 p-4"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={cn(
          "space-y-4",
          isDragOver && "ring-2 ring-primary ring-offset-2 bg-primary/5"
        )}>
          {messages.map((message) => (
            <div key={message.id}>
              {renderMessage(message)}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-muted">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-lg px-4 py-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* File Uploads */}
      {fileUploads.length > 0 && (
        <div className="p-4 border-t bg-muted/50">
          <div className="flex flex-wrap gap-2">
            {fileUploads.map((upload) => (
              <div key={upload.id} className="flex items-center gap-2 bg-background rounded-lg p-2 border">
                {getFileIcon(upload.file.type)}
                <span className="text-sm font-medium">{upload.file.name}</span>
                <span className="text-xs text-muted-foreground">{formatFileSize(upload.file.size)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFile(upload.id)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Input
              placeholder="Type a message..."
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyPress={onKeyPress}
              className="resize-none"
            />
          </div>
          {enableFileUpload && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="h-10 w-10 p-0"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          )}
          <Button
            onClick={onSendMessage}
            disabled={!input.trim() && fileUploads.length === 0}
            className="h-10 w-10 p-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {enableFileUpload && (
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileInputChange}
            className="hidden"
          />
        )}
      </div>
    </div>
  )
}
