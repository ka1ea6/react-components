import type { Meta, StoryObj } from "@storybook/react"
import { CRMKanbanBoard } from "./KanbanBoard"
import { mockUsers, mockCustomers, mockCategories } from './mockData';
import type { CRMStatus } from "./types"
const meta: Meta<typeof CRMKanbanBoard> = {
  title: "CRM/KanbanBoard",
  component: CRMKanbanBoard,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof CRMKanbanBoard>

export const Default: Story = {
  args: {
    
    initialData: {
      deals: Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        customer: mockCustomers[(i % mockCustomers.length)],
        value: Math.floor(Math.random() * 100000) + 5000,
        assignee: mockUsers[Math.floor(Math.random() * mockUsers.length)].name,
        status: ["Cold", "Qualified", "Proposal Made", "Won", "Lost"][Math.floor(Math.random() * 5)] as CRMStatus,
        categories: [mockCategories[(i % mockCategories.length)].id],
        dateLogged: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
        closureDate: new Date(Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
        comments: [],
        updatedAt: new Date().toISOString(),
        description: `This is a mock description for deal ${i + 1}. It's a ${["small", "medium", "large"][i % 3]} deal with high potential.`,
      })),
      customers: [
        { id: "1", name: "Acme Corp", active: true },
        { id: "2", name: "GlobalTech", active: true },
        { id: "3", name: "InnoSystems", active: true },
      ],
      users: mockUsers,
      categories: [
        { id: "1", name: "Software", type: "proposition" },
        { id: "2", name: "Hardware", type: "proposition" },
        { id: "3", name: "Referral", type: "source" },
        { id: "4", name: "Outbound", type: "source" },
        { id: "5", name: "Tech", type: "sector" },
        { id: "6", name: "Finance", type: "sector" },
      ],
    },
    addNewDeal: async (deal) => {
      console.log("Adding deal:", deal)
      return { ...deal, id: "new-deal-id", }
    },
    updateDeal: async (deal) => {
      console.log("Updating deal:", deal)
      return deal
    },
    addNewCustomer: async (customer) => {
      console.log("Adding customer:", customer)
      return { ...customer, id: "new-customer-id" }
    },
    addComment: async (dealId, comment) => {
      console.log("Adding comment to deal:", dealId, comment)
      return { ...comment, id: "new-comment-id", }
    },
  },
}

export const NoDeals: Story = {
  args: {
    ...Default.args ?? {},
    initialData: {
      ...Default.args?.initialData ?? {},
      deals: [],
      users: Default.args?.initialData?.users ?? [],
      customers: Default.args?.initialData?.customers ?? [],
      categories: Default.args?.initialData?.categories ?? [],
    },
  },
}

