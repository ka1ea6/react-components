import type { Meta, StoryObj } from '@storybook/react'
import { EventCard } from './EventCard'

export default {
  title: 'Cards/EventCard',
  component: EventCard,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['birthday', 'work_anniversary', 'company_event'],
    },
    date: { control: 'date' },
    title: { control: 'text' },
    description: { control: 'text' },
    avatarSrc: { control: 'text' },
  },
} as Meta

type Story = StoryObj<typeof EventCard>

export const Birthday: Story = {
  args: {
    eventType: 'birthday',
    date: '2023-06-15',
    title: "John Doe's Birthday",
    description: 'Wish John a happy birthday!',
    avatarSrc: 'https://i.pravatar.cc/150?img=1',
  },
}

export const WorkAnniversary: Story = {
  args: {
    eventType: 'workAnniversary',
    date: '2023-07-01',
    title: "Jane Smith's 5 Year Anniversary",
    description: 'Congratulate Jane on 5 years with the company!',
    avatarSrc: 'https://i.pravatar.cc/150?img=2',
  },
}

export const CompanyEvent: Story = {
  args: {
    eventType: 'companyEvent',
    date: '2023-08-10',
    title: 'Summer Company Picnic',
    description: 'Join us for food, games, and fun at the annual summer picnic!',
    avatarSrc: 'https://i.pravatar.cc/150?img=3',
  },
}

export const NoAvatar: Story = {
  args: {
    eventType: 'birthday',
    date: '2023-09-22',
    title: "Alex Johnson's Birthday",
    description: "Let's celebrate Alex's special day!",
  },
}

export const MinimalInfo: Story = {
  args: {
    eventType: 'companyEvent',
    date: '2023-10-31',
    title: 'Halloween Party',
  },
}
