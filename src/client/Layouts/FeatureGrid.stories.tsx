import React from 'react'
import type { Meta, StoryFn } from '@storybook/react'
import { FeatureCard } from '@/components/client/Cards/FeatureCard'
import FeatureGrid from '@/components/client/Layouts/FeatureGrid'

export default {
  title: 'Layouts/FeatureGrid',
  component: FeatureGrid,
} as Meta

// Template for FeatureCardGrid
const Template: StoryFn = (args) => <FeatureGrid {...args}>{args.children}</FeatureGrid>

// Default Story
export const Default = Template.bind({})

// Example of multiple FeatureCards inside FeatureCardGrid
Default.args = {
  children: (
    <>
      <FeatureCard
        title="Performance"
        description="Boost your app performance"
        iconName="rocket"
        iconStyle="solid"
        color="blue"
      />
      <FeatureCard
        title="Security"
        description="Keep your data safe"
        iconName="shield-alt"
        iconStyle="solid"
        color="blue"
      />
      <FeatureCard
        title="Automation"
        description="Automate your processes"
        iconName="robot"
        iconStyle="regular"
        color="green"
      />
    </>
  ),
}
