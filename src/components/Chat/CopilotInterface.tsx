"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users } from "lucide-react"
import { CreativeLayout } from "../dc-temp/creative-layout"
import { ChatSessionSidebar, type ChatSession } from "./chat-session-sidebar"
import { AIChatInterface, type ChatMessage } from "../.archive/ai-chat-interface"
import { businessUnits } from "../DigitalColleagues/test-data"
import { capabilities } from "./capabilities-data"
import { mockSidebarItems, mockNotifications } from "../dc-temp/mock-data"
import type { BusinessUnit } from "../DigitalColleagues/types"

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
  initialMessages?: ChatMessage[]
  initialSessions?: ChatSession[]
  showCapabilities?: boolean
  title?: string
  businessUnits?: BusinessUnit[]
}

export default function CopilotInterface({
  initialTeam = "design",
  initialMessages,
  initialSessions,
  showCapabilities = true,
  title = "Digital Colleagues",
  businessUnits: businessUnitsProp = businessUnits,
}: CopilotInterfaceProps = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>(
    initialMessages || [
      {
        id: "1",
        content: "Hi! I'm your AI assistant with advanced capabilities. I can help with various tasks, access data, and provide contextual actions. What would you like to work on today?",
        type: "ai",
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
  // const [activeTab, setActiveTab] = useState("chat")
  const [currentBusinessUnit, setCurrentBusinessUnit] = useState<BusinessUnit>(
    businessUnitsProp.find(unit => unit.id === initialTeam) || businessUnitsProp[0]
  )

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      type: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Generate capability-aware responses
    setTimeout(() => {
      const teamCapabilities = capabilities.filter(cap => 
        cap.name.toLowerCase().includes(selectedTeam.name.toLowerCase()) ||
        selectedTeam.name.toLowerCase().includes(cap.name.toLowerCase())
      )
      
      const responses = [
        `I can help you with ${selectedTeam.name.toLowerCase()} tasks. Here are some capabilities I have: ${teamCapabilities.map(c => c.name).join(', ')}`,
        `As your ${selectedTeam.name} assistant, I can assist with ${teamCapabilities.length > 0 ? teamCapabilities[0].description : 'various tasks'}. What specific area would you like to focus on?`,
        `Perfect! I understand you're working on ${selectedTeam.name.toLowerCase()}. I have access to capabilities like ${teamCapabilities.slice(0, 2).map(c => c.name).join(' and ')}. How can I help?`,
        `I can definitely assist with that ${selectedTeam.name.toLowerCase()} task. Let me leverage my capabilities to help you with this.`,
      ]

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        type: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
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
        content: `Hi! I'm your ${selectedTeam.name} AI assistant with advanced capabilities. I can help with ${selectedTeam.name.toLowerCase()} tasks, access relevant data, and provide contextual actions. What would you like to work on today?`,
        type: "ai",
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
        content: session.lastMessage,
        type: "ai",
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
    <CreativeLayout
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
                messages={messages}
                input={input}
                isTyping={isTyping}
                selectedTeam={selectedTeam}
                currentSessionTitle={currentSession?.title}
                capabilities={capabilities}
                onInputChange={setInput}
                onSendMessage={handleSendMessage}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
                  </motion.div>
      </AnimatePresence>
    </CreativeLayout>
  )
}
