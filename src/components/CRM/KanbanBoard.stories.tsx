import type { Meta, StoryObj } from "@storybook/react"
import KanbanBoard from "./KanbanBoard"
import { mockBoardData } from "./mockData"

const meta: Meta<typeof KanbanBoard> = {
  title: "CRM/KanbanBoard",
  component: KanbanBoard,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof KanbanBoard>

export const Default: Story = {
  args: {
    initialData: mockBoardData,
    addDeal: async (deal) => {
      console.log("Adding deal:", deal)
      return { id: "new-deal-id", ...deal }
    },
    updateDeal: async (deal) => {
      console.log("Updating deal:", deal)
      return deal
    },
    addCustomer: async (customer) => {
      console.log("Adding customer:", customer)
      return { id: "new-customer-id", ...customer }
    },
    addComment: async (dealId, comment) => {
      console.log("Adding comment to deal:", dealId, comment)
      return { id: "new-comment-id", ...comment }
    },
    updateDealDescription: async (dealId, description) => {
      console.log("Updating deal description:", dealId, description)
      return { ...mockBoardData.deals.find((d) => d.id === dealId)!, description }
    },
  },
}

