import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { HeaderDesktop } from './HeaderDesktop';

import logoLight from '@/images/cortex-reply-light.png'
import logoDark from '@/images/cortex-reply-dark.png'

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

  return <HeaderDesktop {...args}  />;
};

export const Default = Template.bind({});
Default.args = {
  isMenuOpen: true,
  logoDark: logoDark,
  logoLight: logoLight,

};