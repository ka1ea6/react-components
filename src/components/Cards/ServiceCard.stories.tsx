import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ServiceCard, ServiceProps } from './ServiceCard';
import { FaCog } from 'react-icons/fa';

export default {
  title: 'Cards/ServiceCard',
  component: ServiceCard,
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
        <div className="bg-white dark:bg-gray-900 p-4 flex justify-center items-center min-h-screen">
        <div className="max-w-md w-full">
          <Story />
        </div>
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn<ServiceProps> = (args) => <ServiceCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: <FaCog />,
  title: 'Service Title',
  description: 'This is a description of the service.',
  slug: '/service',
};


export const NoURL = Template.bind({});
NoURL.args = {
  icon: { type: 'thin', iconName: 'image' },
  title: 'Service Title',
  description: 'This is a description of the service.',
};


export const DynamicIcon = Template.bind({});
DynamicIcon.args = {
  icon: { type: 'kit', iconName: 'software' },
  title: 'Service Title',
  description: 'This is a description of the service.',
  slug: '/service',

};
