import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { ServiceSection, ServiceSectionProps } from './ServiceSection'
import { FaCog } from 'react-icons/fa'

export default {
  title: 'Website Components/ServiceSection',
  component: ServiceSection,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component:
          'A card component that displays a service with an icon, title, description, and a link.',
      },
    },
  },
  argTypes: {
    icon: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    slug: { control: 'text' },
  },
  decorators: [
    (Story) => (
      // <div className="bg-white dark:bg-gray-900 p-4">
      <Story />
      // </div>
    ),
  ],
} as Meta

const bgImage = {
  blurDataURL: '/assets/props/Cortex-Handshake-BG.jpg',
  height: 1315,
  url: '/assets/props/Cortex-Handshake-BG.jpg',
  width: 1920,
}

const Template: StoryFn<ServiceSectionProps> = (args) => <ServiceSection {...args} />

const content = (description: string) => {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,

      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,

          children: [
            {
              mode: 'normal',
              text: description,
              type: 'text',
              style: '',
              detail: 0,
              format: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          textStyle: '',
          textFormat: 0,
        },
      ],
      direction: 'ltr',
    },
  }
}

export const Default = Template.bind({})
Default.args = {
  title: 'Lorem ipsum dolor sit amet',
  content: content(
    'This is a description of the service. This is a description of the service. This is a description of the service. This is a description of the service.',
  ),
  services: [
    {
      image: bgImage,
      title: 'Service Title',
      content: content('Create stable foundations for strategic AI adoption'),
      link: { label: 'find out more', url: '#' },
    },
    {
      image: bgImage,
      title: 'Service Title',
      content: content('Harness the true value of your technology investments'),
      link: { label: 'find out more', url: '#' },
    },
    {
      image: bgImage,
      title: 'Service Title',
      content: content('Enhance performance with AI that works like a member of your team'),
      link: { label: 'find out more', url: '#' },
    },
  ],
}

export const Empty = Template.bind({})
Empty.args = {
  services: [],
}

export const Two = Template.bind({})
Two.args = {
  services: [
    {
      icon: <FaCog />,
      title: 'Service Title',
      description: 'This is a description of the service.',
      slug: '/service',
    },
    {
      icon: { type: 'thin', iconName: 'image' },
      title: 'Service Title',
      description: 'This is a description of the service.',
      slug: '/service',
    },
  ],
}

export const Four = Template.bind({})
Four.args = {
  services: [
    {
      icon: <FaCog />,
      title: 'Service Title',
      description: 'This is a description of the service.',
      slug: '/service',
    },
    {
      icon: { type: 'thin', iconName: 'image' },
      title: 'Service Title',
      description: 'This is a description of the service.',
      slug: '/service',
    },
    {
      icon: <FaCog />,
      title: 'Service Title',
      description: 'This is a description of the service.',
      slug: '/service',
    },
    {
      icon: { type: 'thin', iconName: 'image' },
      title: 'Service Title',
      description: 'This is a description of the service.',
      slug: '/service',
    },
  ],
}
