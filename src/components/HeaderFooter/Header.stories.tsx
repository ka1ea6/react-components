import React from 'react'
import type { StoryObj, Meta } from '@storybook/react'
import { PhoneIcon, PlayCircleIcon, RectangleGroupIcon } from '@heroicons/react/20/solid'
import logoLight from '@/images/cortex-reply-light.png'
import logoDark from '@/images/cortex-reply-dark.png'
import { Header } from './Header'
import { ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon } from '@heroicons/react/24/outline'
import { ThemeProvider } from '../Other/ThemeProvider'

import { DynamicIcon } from '../Images/DynamicIcon'

const ServiceIcon = () => <DynamicIcon iconName={'cloud-network-sharing'} type="kit" size="6x" />

const ProductIcon = () => <DynamicIcon iconName={'development'} type="kit" size="6x" />

const GithubIcon = () => (
  // <FontAwesomeIcon icon={faGithub} size="10x" />
  <DynamicIcon type="brands" iconName={'github'} />
)
const AWSIcon = () => <DynamicIcon type="brands" iconName={'aws'} size="6x" />
const AzureIcon = () => <DynamicIcon type="brands" iconName={'azure'} size="6x" />
const SolutionIcon = () => <DynamicIcon type="kit" iconName={'people-sharing'} size="6x" />
export default {
  title: 'Header/Header',
  component: Header,
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta<typeof Header>

type Story = StoryObj<typeof Header>

export const Primary: Story = {
  args: {
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
            icon: { type: 'thin', iconName: 'cloud' },
          },
          {
            name: 'Engagement',
            description: 'Interact with customers',
            href: '#',
            icon: { type: 'thin', iconName: 'cloud' },
          },
          {
            name: 'Security',
            description: 'Protect your data',
            href: '#',
            icon: { type: 'thin', iconName: 'cloud' },
          },
        ],
      },
      {
        name: 'Resources',
        items: [
          { name: 'Documentation', href: '#', icon: { type: 'thin', iconName: 'cloud' } },
          { name: 'API Reference', href: '#', icon: { type: 'thin', iconName: 'cloud' } },
          { name: 'Github', href: '#', icon: { type: 'brands', iconName: 'github' } },
        ],
        actions: [
          { name: 'Watch demo', href: '#', icon: { type: 'thin', iconName: 'cloud' } },
          { name: 'Contact sales', href: '#', icon: { type: 'thin', iconName: 'cloud' } },
          { name: 'View all products', href: '#', icon: { type: 'thin', iconName: 'cloud' } },
        ],
      },
      {
        name: 'Company',
        href: '#',
      },
    ],
  },
}


export const ThemeControl : Story = {
args: {
  ...Primary.args,
  themeControl: true,
}
}