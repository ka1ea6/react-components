import React from 'react'
import { StoryObj, Meta } from '@storybook/react'
import ConsultantProfile from './ConsultantProfile'
import { StorybookConfigOptions } from 'storybook/internal/types'

export default {
  title: 'Blocks/ConsultantProfile',
  component: ConsultantProfile,
  tags: ['autodocs'],
} as Meta

// const Template: StoryFn = (args) => <ConsultantProfile {...args} />;
type Story = StoryObj<typeof ConsultantProfile>

export const FullProfile: Story = {
  args: {
    name: 'Homer Simpson',
    email: 'homer@example.com',
    profilePicture: '/placeholder.svg',
    workHistory: [
      {
        company: 'Springfield Nuclear Power Plant',
        position: 'CTO',
        startDate: '2020-01-01',
        description: 'Leading the technology team and driving innovation.',
      },
      {
        company: 'Previous Company',
        position: 'Senior Architect',
        startDate: '2015-01-01',
        endDate: '2019-12-31',
        description: 'Designed and implemented cloud infrastructure solutions.',
      },
    ],
    certifications: [
      {
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        dateObtained: '2018-06-15',
      },
      {
        name: 'Google Cloud Professional Cloud Architect',
        issuer: 'Google',
        dateObtained: '2019-03-20',
      },
    ],
    areasOfExpertise: [
      {
        area: 'AI Enablement and Acceleration',
        description: 'Extensive experience in implementing AI solutions for large organizations.',
      },
      {
        area: 'Cloud Infrastructure Design and Architecture',
        description:
          'Designed and delivered secure cloud platforms for major FTSE 500 and Fortune 500 organizations.',
      },
      {
        area: 'Network Design and Security',
      },
      {
        area: 'Management Services',
      },
      {
        area: 'Private Cloud',
      },
      {
        area: 'End to End Solution Design',
      },
    ],
  },
}

export const PartialData: Story = {
  args: {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    workHistory: [
      {
        company: 'Tech Solutions Inc.',
        position: 'Software Engineer',
        startDate: '2018-01-01',
        endDate: '2021-12-31',
      },
    ],
    areasOfExpertise: [
      {
        area: 'Frontend Development',
        description: 'Specializing in React and Next.js applications.',
      },
    ],
  },
}

export const MinimalData: Story = {
  args: {
    name: 'John Smith',
    email: 'john.smith@example.com',
  },
}
