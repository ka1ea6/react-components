import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { RelatedContent, type RelatedContentProps } from './RelatedContent'

export default {
  title: 'Menus/RelatedLinks',
  component: RelatedContent,
} as Meta

const Template: StoryFn<RelatedContentProps> = (args) => <RelatedContent {...args} />

export const Default = Template.bind({})
Default.args = {
  links: [
    { title: 'Employee Handbook', url: '/handbook' },
    { title: 'IT Support', url: '/it-support' },
    { title: 'HR Portal', url: '/hr' },
    { title: 'Company Directory', url: '/directory' },
  ],
}
