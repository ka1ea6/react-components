import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DeliveryLeadSubmissionComponent } from './DeliveryLeadSubmission'

const meta: Meta<typeof DeliveryLeadSubmissionComponent> = {
  title: 'DeliveryLead/DeliveryLeadSubmission',
  component: DeliveryLeadSubmissionComponent,
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

type Story = StoryObj<typeof DeliveryLeadSubmissionComponent>

export const Default: Story = {
  args: {},
}
