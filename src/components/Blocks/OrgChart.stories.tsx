import * as React from 'react'
import { OrgChart } from './OrgChart'
import type { StoryObj, Meta } from '@storybook/react'

const meta: Meta<typeof OrgChart> = {
  title: 'Blocks/OrgChart',
  component: OrgChart,
  tags: ['autodocs'],
  argTypes: {
    // color: {
    //   options: ['primary', 'secondary', 'tertiary', 'quaternary', 'highlight', 'accent', 'muted', 'paper'],
    //   control: { type: 'select' },
    // }
  },
  decorators: [
    (Story: React.FC) => (
      <div className="p-2 max-w-2xl">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof OrgChart>

export const Primary: Story = {
  args: {
    //   icon: { type: 'thin', name: 'star' },
    //   title : 'Primary Insights',
    //   body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu ipsum enim.',
    //   color: 'secondary',
  },
}
