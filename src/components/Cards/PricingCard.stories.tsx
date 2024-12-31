import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { PricingCard, PricingCardProps } from './PricingCard';

export default {
  title: 'Cards/PricingCard',
  component: PricingCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A card component that displays pricing information with features, price, and a call-to-action button.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    features: { control: 'object' },
    price: { control: 'text' },
    duration: { control: 'text' },
    isPopular: { control: 'boolean' },
    button: { control: 'object' },
  },
  decorators: [
    (Story) => (

          <Story />
    ),
  ],
} as Meta;

const Template: StoryFn<PricingCardProps> = (args) => <PricingCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Basic Plan',
  description: 'This is a basic plan with essential features.',
  features: ['Feature 1', 'Feature 2', 'Feature 3'],
  price: '$19.99',
  duration: 'per month',
  isPopular: false,
  button: {
    href: '/subscribe',
    label: 'Subscribe Now',
  },
};

export const Popular = Template.bind({});
Popular.args = {
  title: 'Premium Plan',
  description: 'This is a premium plan with additional features.',
  features: ['Feature A', 'Feature B', 'Feature C'],
  price: '$49.99',
  duration: 'per month',
  isPopular: true,
  button: {
    href: '/subscribe',
    label: 'Subscribe Now',
  },
};


export const Minimal = Template.bind({});
Minimal.args = {
  title: 'Premium Plan',
  description: 'This is a premium plan with additional features.',
  features: ['Proin sagittis sem et elit fringilla, nec fringilla eros maximus.', 'Feature B', 'Proin sagittis sem et elit fringilla, nec fringilla eros maximus.'],
};

export const LotsOfFeatures = Template.bind({});
LotsOfFeatures.args = {
  title: 'Premium Plan',
  description: 'This is a premium plan with additional features.',
  features: ['Proin sagittis sem et elit fringilla, nec fringilla eros maximus.', 'Feature B', 'Proin sagittis sem et elit fringilla, nec fringilla eros maximus.', 'Feature D', 'Feature E', 'Feature F', 'Feature G', 'Feature H', 'Feature I', 'Feature J'],
};

export const MinimalAndLink = Template.bind({});
MinimalAndLink.args = {
  title: 'Premium Plan',
  description: 'This is a premium plan with additional features.',
  features: ['Feature A', 'Feature B', 'Feature C'],
  button: {
    href: '/subscribe',
    label: 'Subscribe Now',
  },
};