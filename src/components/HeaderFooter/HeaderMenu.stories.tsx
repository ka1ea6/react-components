import React from 'react'
import type { StoryObj, Meta } from '@storybook/react'
import { PhoneIcon, PlayCircleIcon, RectangleGroupIcon } from '@heroicons/react/20/solid'

import HeaderMenu from './HeaderMenu'
import { ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon } from '@heroicons/react/24/outline'

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
  title: 'Menus/HeaderMenu',
  component: HeaderMenu,
} as Meta<typeof HeaderMenu>

type Story = StoryObj<typeof HeaderMenu>

export const Primary: Story = {
  args: {
    name: 'Product',
    items: [
      {
        name: 'Analytics',
        description: 'Understand your traffic',
        href: '#',
        icon: { type: 'thin', iconName: 'cloud'}, 
      },
      {
        name: 'Engagement',
        description: 'Interact with customers',
        href: '#',
        icon: { src: '/stock1.jpg', alt: 'icon'}, 
      },
      {
        name: 'Security',
        description: 'Protect your data',
        href: '#',
        icon: { src: '/assets/icons/geco_icon.svg', alt: 'icon'}, 

      },
    ],
    actions: [
      { name: 'Watch demo', href: '#', icon: { type: 'thin', iconName: 'cloud'} },
      { name: 'Contact sales', href: '#', 
        icon: { src: '/assets/icons/software.svg', alt: 'icon'}, 
      },
      { name: 'View all products', href: '#',         icon: { src: '/avatar.jpg', alt: 'icon'}, 
    },
    ],
  },
}

export const FontAwesomeIcons: Story = {
  args: {
    name: 'Product',
    items: [
      {
        name: 'Platforms & Services',
        description: 'Cloud services',
        href: '#',
        icon: { type: 'thin', iconName: 'cloud'}, 
      },
      {
        name: 'Solutions & Propositions',
        description: 'Solutions that we have built',
        href: '#',
        icon: { type: 'brands', iconName: 'github'}, 
      },
      {
        name: 'Products',
        description: 'Products that we sell',
        href: '#',
        icon: { type: 'kit', iconName: 'development'}, 
      },
    ],
  },
}


export const Images: Story = {
  args: {
    name: 'Product',
    items: [
      {
        name: 'Platforms & Services',
        description: 'Small image',
        href: '#',
        icon: { src: '/avatar.jpg', alt: 'icon'}, 
      },
      {
        name: 'Solutions & Propositions',
        description: 'Large image',
        href: '#',
        icon: { src: '/stock1.jpg', alt: 'icon'}, 
      },
      {
        name: 'Products',
        description: 'Products that we sell',
        href: '#',
        icon: { src: '/assets/icons/software.svg', alt: 'icon'}, 
      },
    ],
  },
}

export const NoIcons: Story = {
  args: {
    name: 'Product',
    items: [
      {
        name: 'Platforms & Services',
        description: 'Cloud services',
        href: '#',
        // icon: ServiceIcon, 
      },
      {
        name: 'Solutions & Propositions',
        description: 'Solutions that we have built',
        href: '#',
        // icon: SolutionIcon,
      },
      {
        name: 'Products',
        description: 'Products that we sell',
        href: '#',
        // icon: ProductIcon,
      },
    ],
  },
}

export const LinkOnly: Story = {
  args: {
    name: 'Link Only',
    href: '#',
  },
}

export const LotsOfItems: Story = {
  args: {
    name: 'Product',
    items: [
      {
        name: 'Analytics',
        description: 'Understand your traffic',
        href: '#',
        icon: ChartPieIcon, 
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
      {
        name: 'Security',
        description: 'Protect your data',
        href: '#',
        icon: FingerPrintIcon,
      },
      {
        name: 'Security2',
        description: 'Protect your data',
        href: '#',
        icon: FingerPrintIcon,
      },
      {
        name: 'Security3',
        description: 'Protect your data',
        href: '#',
        icon: FingerPrintIcon,
      },
      {
        name: 'Security4',
        description: 'Protect your data',
        href: '#',
        icon: FingerPrintIcon,
      },
    ],
    actions: [
      { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
      { name: 'Contact sales', href: '#', icon: PhoneIcon },
      { name: 'View all products', href: '#', icon: RectangleGroupIcon },
    ],
  },
}
