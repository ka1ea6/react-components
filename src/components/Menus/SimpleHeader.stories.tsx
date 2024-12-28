import React from 'react'
import type { StoryObj, Meta } from '@storybook/react'

import SimpleHeader from './SimpleHeader'
import { ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon } from '@heroicons/react/24/outline'
import { PhoneIcon, PlayCircleIcon, RectangleGroupIcon } from '@heroicons/react/20/solid'
import { DynamicIcon } from '../Images'

export default {
  title: 'Header/SimpleHeader',
  component: SimpleHeader,
} as Meta<typeof SimpleHeader>

type Story = StoryObj<typeof SimpleHeader>

const GithubIcon = (props: any) => <DynamicIcon iconName="github" type="brands" {...props} />
export const Primary: Story = {
  args: {
    title: 'Your Company',
    logo: 'cortex-reply.png',
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
  },
}
