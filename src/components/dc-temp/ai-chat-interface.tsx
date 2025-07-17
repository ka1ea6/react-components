"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, Menu } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { BusinessUnit } from "./business-units"
import { CapabilityMenu } from "./capability-menu"
import { getContextualActions } from "./capabilities-data"
import type { CapabilityContext, Capability } from "./capabilities"

export interface ChatMessage {
  id: string
  content: string
  type: "user" | "ai"
  timestamp: Date
}

interface AIChatInterfaceProps {
  messages: ChatMessage[]
  input: string
  isTyping?: boolean
  selectedTeam?: BusinessUnit
  currentSessionTitle?: string
  capabilities: Capability[]
  onInputChange: (value: string) => void
  onSendMessage: () => void
  onKeyPress?: (e: React.KeyboardEvent) => void
  className?: string
}

export function AIChatInterface({
  messages,
  input,
  isTyping = false,
  selectedTeam,
  currentSessionTitle,
  capabilities,
  onInputChange,
  onSendMessage,
  onKeyPress,
  className,
}: AIChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isCapabilityMenuOpen, setIsCapabilityMenuOpen] = useState(false)
  const [currentCapabilityContext, setCurrentCapabilityContext] = useState<CapabilityContext>({
    path: [],
    selectedItems: [],
    filters: {}
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleCapabilityAction = (actionId: string, context: CapabilityContext) => {
    // Handle capability action - could send message, update state, etc.
    console.log("Capability action:", actionId, context)
    
    // Example: Add a message to chat about the action
    const actionMessage = `Executing ${actionId} with context: ${JSON.stringify(context.path.map(p => p.name))}`
    // You would call your onSendMessage or similar function here
    
    setIsCapabilityMenuOpen(false)
  }

  const handleCapabilityContextChange = useCallback((context: CapabilityContext) => {
    setCurrentCapabilityContext(context)
  }, [])

  // Get contextual actions based on current capability context
  const getCurrentContextActions = () => {
    return getContextualActions(currentCapabilityContext)
  }

  // Generate quick suggestions from capabilities
  const getQuickSuggestions = () => {
    const suggestions: Array<{ label: string; action: () => void }> = []
    
    // Add top-level capabilities as suggestions
    capabilities.forEach(capability => {
      if (capability.actions) {
        capability.actions.forEach(action => {
          suggestions.push({
            label: action.label,
            action: () => handleCapabilityAction(action.id, { path: [capability], selectedItems: [], filters: {} })
          })
        })
      }
      
      // Add quick access to common lists
      if (capability.children) {
        capability.children.forEach(child => {
          if (child.type === "list" && child.data) {
            suggestions.push({
              label: `View ${child.name}`,
              action: () => setIsCapabilityMenuOpen(true)
            })
          }
        })
      }
    })
    
    // Limit to 4-5 suggestions to avoid clutter
    return suggestions.slice(0, 5)
  }

  return (
    <Card className={`h-full flex flex-col shadow-sm ${className || ""}`}>
      {/* Chat Header */}
      {/* <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 bg-gradient-to-br from-purple-600 to-blue-600">
              <AvatarFallback className="text-white text-xs">AI</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{currentSessionTitle || `New ${selectedTeam.name} Chat`}</h2>
              <p className="text-sm text-muted-foreground">AI Assistant • {selectedTeam.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={cn("flex h-6 w-6 items-center justify-center rounded text-white text-xs", selectedTeam.color)}
            >
              {selectedTeam.icon}
            </div>
          </div>
        </div>
      </div> */}

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("flex gap-3", message.type === "user" ? "flex-row-reverse" : "flex-row")}
              >
                <Avatar className="h-8 w-8">
                  {message.type === "user" ? (
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
                    message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Capability Menu within Chat */}
          {isCapabilityMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-3"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 bg-muted rounded-2xl px-4 py-3 shadow-sm">
                <CapabilityMenu
                  capabilities={capabilities}
                  isOpen={isCapabilityMenuOpen}
                  onToggle={() => setIsCapabilityMenuOpen(!isCapabilityMenuOpen)}
                  onActionSelect={handleCapabilityAction}
                  onContextChange={handleCapabilityContextChange}
                  className="w-full"
                />
              </div>
            </motion.div>
          )}

          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <div className="border-t p-4 bg-muted/20">
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder={selectedTeam ? `Ask me about ${selectedTeam.name.toLowerCase()}...` : "How can I help you today?"}
            className="flex-1 rounded-2xl bg-background shadow-sm"
            disabled={isTyping}
          />
          <Button
            onClick={onSendMessage}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="rounded-2xl h-10 w-10 shadow-sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Suggestions and Capabilities Toggle */}
        <div className="flex items-center gap-3 mt-3">
          <Button
            onClick={() => setIsCapabilityMenuOpen(!isCapabilityMenuOpen)}
            variant="outline"
            size="sm"
            className="rounded-full text-xs flex-shrink-0"
          >
            <Menu className="h-3 w-3 mr-1" />
            {isCapabilityMenuOpen ? "Hide" : "Show"} Capabilities
          </Button>
          
          <div className="flex flex-wrap gap-2 overflow-hidden">
            {/* Show contextual actions first if available */}
            {getCurrentContextActions().map((action, index) => (
              <Button
                key={`context-${action.id}`}
                variant="default"
                size="sm"
                className="rounded-full text-xs bg-accent hover:bg-accent/80"
                onClick={() => handleCapabilityAction(action.id, currentCapabilityContext)}
              >
                {action.label}
              </Button>
            ))}
            
            {/* Show quick suggestions from capabilities when no context actions */}
            {getCurrentContextActions().length === 0 && getQuickSuggestions().map((suggestion, index) => (
              <Button
                key={`suggestion-${index}`}
                variant="outline"
                size="sm"
                className="rounded-full text-xs"
                onClick={suggestion.action}
              >
                {suggestion.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
