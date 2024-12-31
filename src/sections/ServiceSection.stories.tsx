import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ServiceSection, ServiceSectionProps } from './ServiceSection';
import { FaCog } from 'react-icons/fa';

export default {
  title: 'Sections/ServiceSection',
  component: ServiceSection,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: 'A card component that displays a service with an icon, title, description, and a link.',
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
} as Meta;

const Template: StoryFn<ServiceSectionProps> = (args) => <ServiceSection {...args} />;

export const Default = Template.bind({});
Default.args = {
    services: [{
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
    icon: { type: 'kit', iconName: 'software' },
    title: 'Service Title',
    description: 'This is a description of the service.',
    slug: '/service',
  }],
};
