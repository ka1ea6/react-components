import type { Meta, StoryObj } from "@storybook/react"
import { TeamCard } from "./team-card"
import { mockTeamSummary } from "../DigitalColleagues/test-data"

const meta: Meta<typeof TeamCard> = {
  title: "Projects/TeamCard",
  component: TeamCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onOpen: { action: "team-open" },
  },
}

export default meta
type Story = StoryObj<typeof TeamCard>

export const Default: Story = {
  args: {
    team: mockTeamSummary[0],
  },
}

export const MarketingTeam: Story = {
  args: {
    team: mockTeamSummary[2],
  },
}

export const DataScienceTeam: Story = {
  args: {
    team: mockTeamSummary[3],
  },
}

export const SmallTeam: Story = {
  args: {
    team: mockTeamSummary[5],
  },
}

export const LargeTeam: Story = {
  args: {
    team: mockTeamSummary[2],
  },
}
