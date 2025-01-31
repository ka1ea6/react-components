import type { Meta, StoryObj } from '@storybook/react'
import { FeaturesBlock } from './FeaturesBlock'

const meta: Meta<typeof FeaturesBlock> = {
  title: 'Reusable Blocks/FeaturesBlock',
  component: FeaturesBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof FeaturesBlock>

export const Default: Story = {
  args: {
    title: 'What Are Digital Colleagues?',
    description: 'some other words',
    features: [
      {
        icon: { type: 'fa-thin', icon: 'robot' },
        title: 'AI-Powered Assistants',
        content:
          'Digital colleagues are generative AI tools that augment your existing workforce, enhancing productivity and customer experience.',
      },
      {
        icon: { type: 'fa-thin', icon: 'lightbulb' },
        link: { label: 'label', type: 'custom', url: '#' },
        title: 'Intelligent Insights',
        content:
          'They provide valuable insights and improve ways of working, saving time and boosting efficiency across your organisation.',
      },
      {
        icon: { type: 'fa-kit', icon: 'delivery' },
        // link: { reference: { relationTo: 'pages', value: { slug: 'contact' } } },
        title: 'Collaborative Partners (internal link)',
        content:
          'Digital colleagues work alongside human employees, assisting with tasks and enhancing overall performance.',
      },
    ],
  },
}

export const TwoFeatures: Story = {
  args: {
    title: 'What Are Digital Colleagues?',
    features: [
      {
        icon: { type: 'fa-thin', icon: 'robot' },
        title: 'AI-Powered Assistants',
        content:
          'Digital colleagues are generative AI tools that augment your existing workforce, enhancing productivity and customer experience.',
      },
      {
        icon: { type: 'fa-thin', icon: 'lightbulb' },
        title: 'Intelligent Insights',
        content:
          'They provide valuable insights and improve ways of working, saving time and boosting efficiency across your organisation.',
      },
    ],
  },
}

export const OneFeature: Story = {
  args: {
    title: 'What Are Digital Colleagues?',
    features: [
      {
        icon: { type: 'fa-thin', icon: 'robot' },
        title: 'AI-Powered Assistants',
        content:
          'Digital colleagues are generative AI tools that augment your existing workforce, enhancing productivity and customer experience.',
      },
    ],
  },
}

export const NoTitle: Story = {
  args: {
    features: [
      {
        icon: { type: 'fa-thin', icon: 'robot' },
        title: 'AI-Powered Assistants',
        content:
          'Digital colleagues are generative AI tools that augment your existing workforce, enhancing productivity and customer experience.',
      },
      {
        icon: { type: 'fa-thin', icon: 'lightbulb' },
        title: 'Intelligent Insights',
        content:
          'They provide valuable insights and improve ways of working, saving time and boosting efficiency across your organisation.',
      },
      {
        icon: { type: 'fa-kit', icon: 'delivery' },
        title: 'Collaborative Partners',
        content:
          'Digital colleagues work alongside human employees, assisting with tasks and enhancing overall performance.',
      },
    ],
  },
}
