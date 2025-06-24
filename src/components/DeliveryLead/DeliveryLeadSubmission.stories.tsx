import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DeliveryLeadSubmission } from './DeliveryLeadSubmission'

const meta: Meta<typeof DeliveryLeadSubmission> = {
  title: 'DeliveryLead/DeliveryLeadSubmission',
  component: DeliveryLeadSubmission,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="container mx-auto p-4">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof DeliveryLeadSubmission>

export const Default: Story = {
  args: {},
}
