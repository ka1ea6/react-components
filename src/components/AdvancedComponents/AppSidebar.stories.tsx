import type { Meta, StoryObj } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { AppSidebar } from "./AppSidebar"
import { mockSidebarItems } from "../DigitalColleagues/test-data"

const meta: Meta<typeof AppSidebar> = {
  title: "Advanced Components/AppSidebar",
  component: AppSidebar,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    isOpen: {
      control: "boolean",
    },
    isMobile: {
      control: "boolean",
    },
    onSearch: {
      action: "search",
    },
  },
}

export default meta
type Story = StoryObj<typeof AppSidebar>

export const Default: Story = {
  args: {
    items: mockSidebarItems,
    isOpen: true,
    isMobile: false,
    onSearch: action("search"),
  },
}

export const Mobile: Story = {
  args: {
    items: mockSidebarItems,
    isOpen: true,
    isMobile: true,
    onSearch: action("mobile-search"),
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
}

export const Closed: Story = {
  args: {
    items: mockSidebarItems,
    isOpen: false,
    isMobile: false,
    onSearch: action("search-closed"),
  },
}

export const WithMaxItems: Story = {
  args: {
    items: mockSidebarItems,
    isOpen: true,
    isMobile: false,
    onSearch: action("search-with-favorites"),
  },
  parameters: {
    docs: {
      description: {
        story: "Individual sidebar items can have maxItems limits. In this example, Teams shows 2/5 items and Projects shows 2/5 items. Expand a section and click the 'X more items available' text to manage favorites. You can also search by typing in the search box and pressing Enter.",
      },
    },
  },
}

export const WithMaxItemsMobile: Story = {
  args: {
    items: mockSidebarItems,
    isOpen: true,
    isMobile: true,
    onSearch: action("mobile-search-with-favorites"),
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "Per-item favorites work on mobile too, with responsive dialogs for managing favorites. Expand sections and tap the 'more items available' text. Search functionality also works on mobile.",
      },
    },
  },
}
