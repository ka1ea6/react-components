import type { Meta, StoryObj } from "@storybook/react"
import { NewDealForm } from "./NewDealForm"
import { mockCustomers, mockCategories, mockDeals, mockUsers } from "./mockData"

const meta: Meta<typeof NewDealForm> = {
  title: "CRM/NewDealForm",
  component: NewDealForm,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof NewDealForm>

export const Default: Story = {
  args: {
    customers: mockCustomers,
    categories: mockCategories,
    onSubmit: async (deal) => console.log("Submitting deal:", deal),
    onAddCustomer: async (customer) => console.log("Adding new customer:", customer),
  },
}

export const EditExistingDeal: Story = {
  args: {
    ...Default.args,
    initialDeal: mockDeals[0],
  },
}

