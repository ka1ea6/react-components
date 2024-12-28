'use client'
import React from 'react'
import Intranet from './Intranet'
import type { StoryObj, Meta } from '@storybook/react'
import {
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  Check,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  FilePlus,
  Edit,
  Printer,
  Folder,
  Frame,
  LifeBuoy,
  LogOut,
  Map,
  MoreHorizontal,
  PieChart,
  Send,
  Settings2,
  Share,
  Plus,
  Sparkles,
  SquareTerminal,
  Trash2,
} from 'lucide-react'
import Documentation from './Documentation'
import { fn } from '@storybook/test'
import { PhoneIcon, PlayCircleIcon, RectangleGroupIcon } from '@heroicons/react/20/solid'
import { ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon } from '@heroicons/react/24/outline'
import { DynamicIcon } from '@/components//Images'

const ServiceIcon = () => <DynamicIcon iconName="cloud-network-sharing" size="4x" type="kit" />

const ProductIcon = () => <DynamicIcon iconName="development" size="4x" type="kit" />

const GithubIcon = () => (
  // <FontAwesomeIcon icon={faGithub} size="10x" />
  <DynamicIcon iconName="github" size="4x" type="brands" />
)
const AWSIcon = () => <DynamicIcon iconName="aws" type="brands" />
const AzureIcon = () => <DynamicIcon iconName="azure" type="kit" />
const SolutionIcon = () => <DynamicIcon iconName="people-sharing" size="4x" type="kit" />

const meta: Meta<typeof Intranet> = {
  title: 'Pages/Intranet',
  component: Intranet,
  tags: ['autodocs'],
  argTypes: {
    // color: {
    //   options: ['primary', 'secondary', 'tertiary', 'quaternary', 'highlight', 'accent', 'muted', 'paper'],
    //   control: { type: 'select' },
    // }
  },
  decorators: [
    (Story: React.FC) => (
      <div className="h-screen">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Intranet>

export const Primary: Story = {
  args: {
    motd: {
      title: 'Welcome to the Intranet',
      message:
        'This is a message of the day. It can be used to communicate important information to all employees.',
      brandFrom: 'one',
      brandTo: 'two',
    },
    header: {
      title: 'Your Company',
      logo: 'cortex-reply.png',
      menuItems: [
        {
          name: 'Documentation',
          items: [
            {
              name: 'Platforms & Services',
              description: 'Cloud services',
              href: '#',
              icon: ServiceIcon, // Pass the component, not <ChartPieIcon />
            },
            {
              name: 'Solutions & Propositions',
              description: 'Solutions that we have built',
              href: '#',
              icon: SolutionIcon,
            },
            {
              name: 'Products',
              description: 'Products that we sell',
              href: '#',
              icon: ProductIcon,
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
          name: 'Intranet',
          href: '#',
        },
      ],
    },
    events: [
      {
        type: 'birthday',
        date: '2023-06-15',
        title: "John Doe's Birthday",
        description: 'Wish John a happy birthday!',
        avatarSrc: 'https://i.pravatar.cc/150?img=1',
      },
      {
        type: 'company_event',
        date: '2023-08-10',
        title: 'Summer Company Picnic',
        description: 'Join us for food, games, and fun at the annual summer picnic!',
        avatarSrc: 'https://i.pravatar.cc/150?img=3',
      },
      {
        type: 'company_event',
        date: '2023-10-31',
        title: 'Halloween Party',
      },
    ],
    customers: [
      {
        name: 'Acme Corp',
        logo: '/cortex-reply.png',
        href: '#',
        gradientStart: '#3B82F6',
        gradientEnd: '#2563EB',
      },
      {
        name: 'Globex',
        logo: '/logos/dropbox.png',
        href: '#',
        gradientStart: '#10B981',
        gradientEnd: '#059669',
      },
      {
        name: 'Initech',
        logo: '/logos/customer1.png',
        href: '#',
        gradientStart: '#EC4899',
        gradientEnd: '#DB2777',
      },
      {
        name: 'Umbrella',
        logo: '/logos/customer2.png',
        href: '#',
        gradientStart: '#F59E0B',
        gradientEnd: '#D97706',
      },
    ],
  },
}
