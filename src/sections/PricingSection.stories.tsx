import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { PricingSection, PricingSectionProps } from './PricingSection';

export default {
  title: 'Website Components/PricingSection',
  component: PricingSection,
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

const Template: StoryFn<PricingSectionProps> = (args) => <PricingSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  sectionHeading: {
    subtitle: 'Pricing Action',
    title: 'Innovating for a better tomorrow',
    description:
    'Lorem Ipsum is simply dummy text of the printing  Ipsum is simply dummy text of the Lorem Ipsum is simply',
  },
  cards: [
    {
      title: 'Basic Plan',
      description:
        'Lorem Ipsum is simply dummy text of the printing  Ipsum is simply dummy text of the Lorem Ipsum is simply',
      features: [
        'Mistakes To Avoid',
        'Your Startup',
        'Knew About Fonts',
        'Winning Metric for Your Startup',
      ],
      price: '$49',
      duration: '/month',
      isPopular: false,
      button: {
        href: '/',
        label: 'Select Plan',
      },
    },
    {
      title: 'Standard Plan',
      description:
        'Lorem Ipsum is simply dummy text of the printing  Ipsum is simply dummy text of the Lorem Ipsum is simply',
      features: [
        'Mistakes To Avoid',
        'Your Startup',
        'Knew About Fonts',
        'Winning Metric for Your Startup',
      ],
      price: '$79',
      duration: '/month',
      isPopular: true,
      button: {
        href: '/',
        label: 'Select Plan',
      },
    },
    {
      title: 'Premium Plan',
      description:
        'Lorem Ipsum is simply dummy text of the printing  Ipsum is simply dummy text of the Lorem Ipsum is simply',
      features: [
        'Mistakes To Avoid',
        'Your Startup',
        'Knew About Fonts',
        'Winning Metric for Your Startup',
      ],
      price: '$99',
      duration: '/month',
      isPopular: false,
      button: {
        href: '/',
        label: 'Select Plan',
      },
    },
  ],
};
