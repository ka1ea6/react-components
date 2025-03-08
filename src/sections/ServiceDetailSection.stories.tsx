import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { ServiceDetailSection } from './ServiceDetailSection'
import { FaCog } from 'react-icons/fa'

export default {
  title: 'Website Components/ServiceDetailSection',
  component: ServiceDetailSection,
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
  width: 1920
}

const Template: StoryFn<typeof ServiceDetailSection> = (args) => <ServiceDetailSection {...args} />

const content = (description: string) => {
    return { root: {
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
      }}
    }

export const Default = Template.bind({})
Default.args = {
  
      image: bgImage,
      title: 'Service Title',
      content: content('This is a description of the service.'),
      link: {label: 'find out more', url: '#' } 
  
}
