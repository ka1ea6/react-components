import type { Meta, StoryObj } from '@storybook/react'
import { CustomerCard } from './CustomerCard'

export default {
  title: 'Cards/CustomerCard',
  component: CustomerCard,
  tags: ['autodocs'],
  argTypes: {},
} as Meta

type Story = StoryObj<typeof CustomerCard>

export const Default: Story = {
  args: { name: 'Acme Corp', logo: 'stock10.jpg', href: '/customers/acme' },
}

export const NoLogo: Story = {
  args: { name: 'Acme Corp', href: '/customers/acme' },
}
