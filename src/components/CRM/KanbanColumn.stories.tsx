import type { Meta, StoryObj } from "@storybook/react"
import { KanbanColumn } from "./KanbanColumn"
import { mockDeals, mockCustomers, mockCategories, type mockStatuses } from "./mockData"

const meta: Meta<typeof KanbanColumn> = {
  title: "CRM/KanbanColumn",
  component: KanbanColumn,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof KanbanColumn>

export const Default: Story = {
  args: {
    status: "Qualified",
    deals: mockDeals.filter((deal) => deal.status === "Qualified"),
    customers: mockCustomers,
    categories: mockCategories,
    onDealClick: (deal) => console.log("Deal clicked:", deal),
    calculateColumnValue: (deals) => deals.reduce((sum, deal) => sum + deal.value, 0),
    calculateWeightedValue: (deals, status) => {
      const weightMap: { [key in (typeof mockStatuses)[number]]: number } = {
        Cold: 0.2,
        Qualified: 0.4,
        "Proposal Made": 0.6,
        "SoW Submitted": 0.7,
        Won: 1,
        Lost: 0,
      }
      return deals.reduce((sum, deal) => sum + deal.value * weightMap[status], 0)
    },
    addNewDeal: async (deal) => console.log("Adding new deal:", deal),
    onAddCustomer: async (customer) => console.log("Adding new customer:", customer),
  },
}

export const EmptyColumn: Story = {
  args: {
    ...Default.args,
    status: "Won",
    deals: [],
  },
}

