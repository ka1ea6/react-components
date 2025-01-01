import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { HeaderDesktop } from './HeaderDesktop';

import logoLight from '@/images/cortex-reply-light.png'
import logoDark from '@/images/cortex-reply-dark.png'
import { ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon } from '@heroicons/react/24/outline'
import { PhoneIcon, PlayCircleIcon, RectangleGroupIcon } from '@heroicons/react/20/solid'
import { DynamicIcon } from '../Images'




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
const GithubIcon = (props: any) => <DynamicIcon iconName="github" type="brands" {...props} />

export const Default = Template.bind({});
Default.args = {
  isMenuOpen: true,
  logoDark: logoDark,
  logoLight: logoLight,
  menuItems: [
    {
      name: 'Product',
      items: [
        {
          name: 'Analytics',
          description: 'Understand your traffic',
          href: '#',
          icon: ChartPieIcon, // Pass the component, not <ChartPieIcon />
        },
        {
          name: 'Engagement',
          description: 'Interact with customers',
          href: '#',
          icon: CursorArrowRaysIcon,
        },
        {
          name: 'Security',
          description: 'Protect your data',
          href: '#',
          icon: FingerPrintIcon,
        },
      ],
    },
    {
      name: 'Resources',
      items: [
        { name: 'Documentation', href: '#', icon: ChartPieIcon },
        { name: 'API Reference', href: '#', icon: CursorArrowRaysIcon },
        { name: 'Github', href: '#', icon: GithubIcon },
      ],
      actions: [
        { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
        { name: 'Contact sales', href: '#', icon: PhoneIcon },
        { name: 'View all products', href: '#', icon: RectangleGroupIcon },
      ],
    },
    {
      name: 'Company',
      href: '#',
    },
  ],

};