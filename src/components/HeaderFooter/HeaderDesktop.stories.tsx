import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { HeaderDesktop } from './HeaderDesktop';

export default {
  title: 'Header/HeaderDesktop',
  component: HeaderDesktop,
  parameters: {
    docs: {
      description: {
        component: 'A header component for desktop view with a scroll effect and menu toggle.',
      },
    },
  },
  argTypes: {
    isMenuOpen: { control: 'boolean' },
  },
} as Meta;

const Template: StoryFn<typeof HeaderDesktop> = (args) => {
  const [isMenuOpen, setIsMenuOpen] = useState(args.isMenuOpen);

  return <HeaderDesktop {...args} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />;
};

export const Default = Template.bind({});
Default.args = {
  isMenuOpen: true,
};