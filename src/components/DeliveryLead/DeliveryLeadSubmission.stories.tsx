import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DeliveryLeadSubmissionComponent } from './DeliveryLeadSubmission'

const meta: Meta<typeof DeliveryLeadSubmissionComponent> = {
  title: 'DeliveryReport/DeliveryLeadSubmission',
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

const exampleCustomerProjectPairs = [
  { customer: { id: 1, name: 'Acme Corp' }, project: { id: 101, name: 'Website Redesign' } },
  { customer: { id: 1, name: 'Acme Corp' }, project: { id: 102, name: 'Mobile App' } },
  { customer: { id: 2, name: 'Globex' }, project: { id: 201, name: 'ERP Migration' } },
  { customer: { id: 2, name: 'Globex' }, project: { id: 202, name: 'Cloud Setup' } },
  { customer: { id: 3, name: 'Initech' }, project: { id: 301, name: 'API Integration' } },
]

export const Default: Story = {
  args: {
    customerProjectPairs: exampleCustomerProjectPairs,
  },
}


export const NoCustomers: Story = {
  args: {
    // customerProjectPairs: exampleCustomerProjectPairs,
  },
}