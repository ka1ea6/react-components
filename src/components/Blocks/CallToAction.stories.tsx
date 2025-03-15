import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { CallToActionBlock } from './CallToAction';

const meta: Meta<typeof CallToActionBlock> = {
  title: 'Reusable Blocks/CallToAction',
  component: CallToActionBlock,
};

export default meta;
type Story = StoryObj<typeof CallToActionBlock>;

const Template: Story = (args) => <CallToActionBlock {...args} />;

export const Default: Story = Template.bind({});
Default.args = {
  richText: {
        root: {
          children: [
            {
              type: 'text',
              text: 'This is a regular text.',
            },
            {
              type: 'text',
              text: 'This is bold text.',
              format: 1, // IS_BOLD
            },
        ],
        },
  },
  links: [
    {
      link: {
        type: 'custom',
        label: 'Learn More',
        url: '#',
      },
    },
    {
      link: {
        type: 'custom',
        label: 'Get Started',
        url: '#',
      },
    },
  ],
}

export const SingleLink: Story = Template.bind({});
SingleLink.args = {
  ...Default.args,
  links: [
    {
      link: {
        type: 'custom',
        label: 'Learn More',
        url: '#',
      },
    }]
}


export const ContactUs: Story = Template.bind({});
ContactUs.args = {
  ...Default.args,
  links: [
    {
      link: {
        type: 'custom',
        label: 'Contact us',
        url: '/contact',
      },
    }]
}
