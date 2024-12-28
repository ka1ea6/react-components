// ExampleComponent.stories.tsx
import React from 'react'
import { TextAndImages } from './TextAndImages'
import type { StoryObj, Meta } from '@storybook/react'

export default {
  title: 'Layouts/TextAndImages',
  component: TextAndImages,
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    description: { control: 'text' },
    missionTitle: { control: 'text' },
    missionDescription: { control: 'text' },
    images: { control: 'array' },
    raisedAmount: { control: 'text' },
    companiesCount: { control: 'text' },
    dealsClosed: { control: 'text' },
    leadsGenerated: { control: 'text' },
  },
}

type Story = StoryObj<typeof TextAndImages>

export const Primary: Story = {
  args: {
    title: 'On a mission to empower remote teams',
    subtitle: 'About us',
    description:
      'Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget aliquam.',
    missionTitle: 'Our mission',
    missionDescription:
      'Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id.',
    images: [
      'https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?&auto=format&fit=crop&crop=center&w=560&h=560&q=90',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?&auto=format&fit=crop&crop=left&w=560&h=560&q=90',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?&auto=format&fit=crop&crop=left&w=560&h=560&q=90',
      'https://images.unsplash.com/photo-1598257006458-087169a1f08d?&auto=format&fit=crop&crop=center&w=560&h=560&q=90',
    ],
    raisedAmount: '150',
    companiesCount: '30',
    dealsClosed: '1.5',
    leadsGenerated: '200',
  },
}
