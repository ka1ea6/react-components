import type { Meta, StoryObj } from "@storybook/react"
import { AIChatInterface, type ChatMessage } from "./ai-chat-interface"
import { businessUnits } from "../DigitalColleagues/test-data"
import { testCapabilities as capabilities } from "../../test-data/capabilities"

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    content: "Hi! I'm your AI assistant. What would you like to work on today?",
    type: "ai",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    content: "I need help creating a logo for my startup",
    type: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
  },
  {
    id: "3",
    content:
      "Great! I'd be happy to help you create a logo. Could you tell me more about your startup? What industry are you in, and what values would you like your logo to convey?",
    type: "ai",
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
  },
]

const meta: Meta<typeof AIChatInterface> = {
  title: "DC/AIChatInterface",
  component: AIChatInterface,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    onInputChange: { action: "input changed" },
    onSendMessage: { action: "message sent" },
    onKeyPress: { action: "key pressed" },
  },
}

export default meta
type Story = StoryObj<typeof AIChatInterface>

export const Default: Story = {
  args: {
    messages: mockMessages,
    input: "",
    isTyping: false,
    selectedTeam: businessUnits[0], // Design team
    capabilities: capabilities,
  },
}

export const WithTyping: Story = {
  args: {
    messages: [
      ...mockMessages,
      {
        id: "4",
        content: "It's a tech startup focused on sustainable energy solutions.",
        type: "user",
        timestamp: new Date(),
      },
    ],
    input: "",
    isTyping: true,
    selectedTeam: businessUnits[0],
    capabilities: capabilities,
  },
}

export const EngineeringTeam: Story = {
  args: {
    messages: [
      {
        id: "1",
        content: "Hi! I'm your Engineering AI assistant. How can I help you with your code today?",
        type: "ai",
        timestamp: new Date(),
      },
    ],
    input: "Help me optimize this React component",
    isTyping: false,
    selectedTeam: businessUnits[1], // Engineering team
    capabilities: capabilities,
  },
}

export const WithSessionTitle: Story = {
  args: {
    messages: mockMessages,
    input: "",
    isTyping: false,
    selectedTeam: businessUnits[0],
    currentSessionTitle: "Logo Design Review",
    capabilities: capabilities,
  },
}

export const EmptyChat: Story = {
  args: {
    messages: [
      {
        id: "1",
        content: "Hi! I'm your AI assistant. What would you like to work on today?",
        type: "ai",
        timestamp: new Date(),
      },
    ],
    input: "",
    isTyping: false,
    selectedTeam: businessUnits[2], // Marketing team
    capabilities: capabilities,
  },
}

export const NoSuggestions: Story = {
  args: {
    messages: mockMessages,
    input: "",
    isTyping: false,
    selectedTeam: businessUnits[0],
    capabilities: [], // Empty capabilities array
  },
}

export const WithoutTeam: Story = {
  args: {
    messages: [
      {
        id: "1",
        content: "Hi! I'm your AI assistant. How can I help you today?",
        type: "ai",
        timestamp: new Date(),
      },
    ],
    input: "",
    isTyping: false,
    // No selectedTeam provided
    capabilities: capabilities,
  },
}

export const CustomCapabilities: Story = {
  args: {
    messages: [
      {
        id: "1",
        content: "Hi! I'm your custom AI assistant with specialized capabilities.",
        type: "ai",
        timestamp: new Date(),
      },
    ],
    input: "",
    isTyping: false,
    selectedTeam: businessUnits[0],
    capabilities: [
      {
        id: "design",
        name: "Design Tools",
        description: "Creative design assistance",
        type: "category",
        actions: [
          {
            id: "create-wireframe",
            label: "Create Wireframe",
            action: (context) => console.log("Create wireframe", context)
          }
        ],
        children: [
          {
            id: "templates",
            name: "Templates",
            description: "Design templates",
            type: "list",
            actions: [
              {
                id: "browse-templates",
                label: "Browse Templates",
                action: (context) => console.log("Browse templates", context)
              }
            ],
            data: [
              {
                id: "template-1",
                title: "Modern Landing Page",
                subtitle: "Responsive design",
                value: "Free",
                metadata: { category: "landing", style: "modern" }
              },
              {
                id: "template-2",
                title: "E-commerce Template",
                subtitle: "Product showcase",
                value: "Premium",
                metadata: { category: "ecommerce", style: "clean" }
              }
            ]
          }
        ]
      },
      {
        id: "development",
        name: "Development",
        description: "Code assistance",
        type: "category",
        actions: [
          {
            id: "review-code",
            label: "Review Code",
            action: (context) => console.log("Review code", context)
          }
        ]
      }
    ],
  },
}
