import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { AIChatInterface } from "./ai-chat-interface"
import type { ChatMessage } from "./ai-chat-interface"

const meta: Meta<typeof AIChatInterface> = {
  title: "Chat/AI Chat Interface with Capabilities",
  component: AIChatInterface,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof AIChatInterface>

const sampleBusinessUnit = {
  id: "sales",
  name: "Sales Team",
  description: "Revenue and customer management",
  color: "bg-green-600",
  accentColor: "text-green-600",
  icon: "💰",
}

const sampleMessages: ChatMessage[] = [
  {
    id: "1",
    content: "Hello! I'm your AI assistant. How can I help you with sales today?",
    type: "ai",
    timestamp: new Date(Date.now() - 300000),
  },
  {
    id: "2",
    content: "Can you show me our customer pipeline?",
    type: "user",
    timestamp: new Date(Date.now() - 240000),
  },
  {
    id: "3",
    content: "Of course! I can help you explore your customer pipeline. You can use the capabilities menu below to navigate through customers, opportunities, and view contextual actions based on your selections.",
    type: "ai",
    timestamp: new Date(Date.now() - 180000),
  },
]

const sampleQuickSuggestions = [
  {
    label: "Show top customers",
    action: () => console.log("Show top customers"),
  },
  {
    label: "Pipeline overview",
    action: () => console.log("Pipeline overview"),
  },
  {
    label: "Recent deals",
    action: () => console.log("Recent deals"),
  },
]

function AIChatWithCapabilities() {
  const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = () => {
    if (!input.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      type: "user",
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, newMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I understand your request. You can use the capabilities menu to explore the data in more detail. Click the 'Capabilities' button below to get started!",
        type: "ai",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-screen p-4">
      <AIChatInterface
        messages={messages}
        input={input}
        isTyping={isTyping}
        selectedTeam={sampleBusinessUnit}
        currentSessionTitle="Sales Pipeline Discussion"
        quickSuggestions={sampleQuickSuggestions}
        onInputChange={setInput}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
        className="max-w-4xl mx-auto"
      />
    </div>
  )
}

export const WithCapabilities: Story = {
  render: () => <AIChatWithCapabilities />,
}

export const Default: Story = {
  args: {
    messages: sampleMessages,
    input: "",
    isTyping: false,
    selectedTeam: sampleBusinessUnit,
    currentSessionTitle: "Sales Pipeline Discussion",
    quickSuggestions: sampleQuickSuggestions,
    onInputChange: () => {},
    onSendMessage: () => {},
    onKeyPress: () => {},
  },
}
