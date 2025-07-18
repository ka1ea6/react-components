import type { Meta, StoryObj } from "@storybook/react"
import { NotificationsPanel } from "./notifications-panel"
import { mockNotifications } from "../dc-temp/mock-data"

const meta: Meta<typeof NotificationsPanel> = {
  title: "Advanced Components/NotificationsPanel",
  component: NotificationsPanel,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "A notifications panel that only shows unread notifications. Users can dismiss notifications individually or use 'Dismiss all' for bulk actions.",
      },
    },
  },
  argTypes: {
    open: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof NotificationsPanel>

export const Default: Story = {
  args: {
    notifications: mockNotifications,
    open: true,
    onClose: () => console.log("Close clicked"),
    onNotificationRemove: (id: string) => console.log("Notification removed:", id),
    onRemoveAll: () => console.log("Remove all clicked"),
  },
}

export const Empty: Story = {
  args: {
    notifications: [],
    open: true,
    onClose: () => console.log("Close clicked"),
    onNotificationRemove: (id: string) => console.log("Notification removed:", id),
    onRemoveAll: () => console.log("Remove all clicked"),
  },
}

export const OnlyReadNotifications: Story = {
  args: {
    notifications: mockNotifications.map(n => ({ ...n, read: true })),
    open: true,
    onClose: () => console.log("Close clicked"),
    onNotificationRemove: (id: string) => console.log("Notification removed:", id),
    onRemoveAll: () => console.log("Remove all clicked"),
  },
}
