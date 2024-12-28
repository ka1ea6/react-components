import React from 'react'
import { StoryObj, Meta } from '@storybook/react'
import CaseStudy from './CaseStudy'

export default {
  title: 'Blocks/CaseStudy',
  component: CaseStudy,
  tags: ['autodocs'],
} as Meta

type Story = StoryObj<typeof CaseStudy>

export const DefaultCaseStudy: Story = {
  args: {
    customerName: 'Acme Corporation',
    logoUrl: '/acme-logo.png',
    industry: 'technology',
    projectDescription: 'Revolutionizing widget production with cloud technology',
    color: '#3B82F6',
    quote: 'This project has transformed our business operations.',
    metrics: [
      { label: 'Increased Efficiency', value: '50%' },
      { label: 'Cost Savings', value: '$1M' },
    ],
  },
}

export const WithChildren: Story = {
  args: {
    customerName: 'Beta Industries',
    logoUrl: 'cortex-reply.png',
    industry: 'manufacturing',
    projectDescription: 'Implementing AI-driven automation in production lines',
    color: '#10B981',
    quote: 'AI has significantly improved our production quality.',
    metrics: [
      { label: 'Production Increase', value: '30%' },
      { label: 'Error Reduction', value: '20%' },
    ],
    children: (
      <div>
        <h3>Additional Information</h3>
        <p>This section can include more detailed information about the case study.</p>
      </div>
    ),
  },
}

export const MinimalCaseStudy: Story = {
  args: {
    customerName: 'Gamma Enterprises',
    projectDescription: 'Enhancing cybersecurity measures across the organization',
    color: '#EF4444',
  },
}
