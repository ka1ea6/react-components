import type { Meta, StoryObj } from "@storybook/react"
import { NewCustomerForm } from "./NewCustomerForm"

const meta: Meta<typeof NewCustomerForm> = {
  title: "CRM/NewCustomerForm",
  component: NewCustomerForm,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof NewCustomerForm>

export const Default: Story = {
  args: {
    onSubmit: async (customer) => console.log("Submitting customer:", customer),
  },
}

