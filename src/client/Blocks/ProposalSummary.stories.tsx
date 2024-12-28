import * as React from 'react'
import { ProposalSummary } from './ProposalSummary'
import type { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof ProposalSummary> = {
  title: 'Blocks/ProposalSummary',
  component: ProposalSummary,
  tags: ['autodocs'],
  argTypes: {
    // color: {
    //   options: ['primary', 'secondary', 'tertiary', 'quaternary', 'highlight', 'accent', 'muted', 'paper'],
    //   control: { type: 'select' },
    // }
  },
  decorators: [
    (Story: React.FC) => (
      <div className="p-2">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof ProposalSummary>

export const Primary: Story = {
  args: {
    //   icon: { type: 'thin', name: 'star' },
    //   title : 'Primary Insights',
    //   body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu ipsum enim.',
    //   color: 'secondary',
  },
}
