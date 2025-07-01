import type { Meta, StoryObj } from "@storybook/react"
import { AppHeader } from "./app-header"
import {  mockNotifications } from "./mock-data"
import { businessUnits } from "./business-units"

const meta: Meta<typeof AppHeader> = {
  title: "DC/AppHeader",
  component: AppHeader,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    notifications: {
      control: { type: "number", min: 0, max: 99 },
    },
    sidebarOpen: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof AppHeader>

export const Default: Story = {
  args: {
    title: "Digital Colleagues",
    notifications: mockNotifications,
    sidebarOpen: true,
    onToggleSidebar: () => console.log("Toggle sidebar"),
    onToggleMobileMenu: () => console.log("Toggle mobile menu"),
    businessUnits,
  },
}

export const NoNotifications: Story = {
  args: {
    title: "Digital Colleagues",
    notifications: mockNotifications,
    sidebarOpen: true,
    onToggleSidebar: () => console.log("Toggle sidebar"),
    onToggleMobileMenu: () => console.log("Toggle mobile menu"),
    businessUnits,
  },
}

export const NoBusinessUnits: Story = {
  args: {
    title: "Digital Colleagues",
notifications: mockNotifications,
    sidebarOpen: false,
    onToggleSidebar: () => console.log("Toggle sidebar"),
    onToggleMobileMenu: () => console.log("Toggle mobile menu"),
  },
}
