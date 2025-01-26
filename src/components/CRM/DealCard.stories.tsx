import type { Meta, StoryObj } from "@storybook/react"
import { DealCard } from "./DealCard"
import { mockDeals, mockCustomers, mockCategories } from "./mockData"

const meta: Meta<typeof DealCard> = {
  title: "CRM/DealCard",
  component: DealCard,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof DealCard>

export const Default: Story = {
  args: {
    deal: mockDeals[0],
    customer: mockCustomers.find((c) => c.id === mockDeals[0].customer.id),
    categories: mockCategories,
    onClick: () => console.log("Deal card clicked"),
  },
}

export const LargeDeal: Story = {
  args: {
    ...Default.args,
    deal: {
      ...mockDeals[0],
      value: 1000000,
    },
  },
}

export const InactiveCustomer: Story = {
  args: {
    ...Default.args,
    customer: { ...mockCustomers[2], active: false },
  },
}

