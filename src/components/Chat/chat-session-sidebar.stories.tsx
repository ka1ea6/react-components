import type { Meta, StoryObj } from "@storybook/react"
import { ChatSessionSidebar, type ChatSession } from "./chat-session-sidebar"
import { businessUnits } from "../DigitalColleagues/test-data"

const mockSessions: ChatSession[] = [
  {
    id: "1",
    title: "Logo Design Review",
    lastMessage: "The color palette looks great! Let's refine the typography...",
  },
  {
    id: "2",
    title: "React Component Optimization",
    lastMessage: "Here's how you can improve the performance of your component...",
  },
  {
    id: "3",
    title: "Campaign Strategy Discussion",
    lastMessage: "The target audience analysis shows promising results...",
  },
  {
    id: "4",
    title: "Product Roadmap Planning",
    lastMessage: "Based on user feedback, I recommend prioritizing...",
  },
]

const meta: Meta<typeof ChatSessionSidebar> = {
  title: "Chat/ChatSessionSidebar",
  component: ChatSessionSidebar,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    onNewChat: { action: "new chat clicked" },
    onSessionSelect: { action: "session selected" },
    onSessionEdit: { action: "session edited" },
    onSessionDelete: { action: "session deleted" },
  },
}

export default meta
type Story = StoryObj<typeof ChatSessionSidebar>

export const Default: Story = {
  args: {
    sessions: mockSessions,
    teams: businessUnits,
    currentSession: null,
  },
}

export const WithSelectedSession: Story = {
  args: {
    sessions: mockSessions,
    teams: businessUnits,
    currentSession: mockSessions[0],
  },
}

export const EmptySessions: Story = {
  args: {
    sessions: [],
    teams: businessUnits,
    currentSession: null,
  },
}

export const WithoutActions: Story = {
  args: {
    sessions: mockSessions,
    teams: businessUnits,
    currentSession: mockSessions[1],
    onSessionEdit: undefined,
    onSessionDelete: undefined,
  },
}

export const SingleSession: Story = {
  args: {
    sessions: [mockSessions[0]],
    teams: businessUnits,
    currentSession: mockSessions[0],
  },
}
