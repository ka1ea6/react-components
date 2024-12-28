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
import { DynamicIcon } from '../Images'

import React from 'react'
import { SidebarLeft } from './SidebarLeft'
import { SidebarProvider } from '@/components/ui/sidebar'
import { fn } from '@storybook/test'
export default {
  title: 'Menus/SidebarLeft',
  component: SidebarLeft,
}

const Template = (args) => (
  <SidebarProvider>
    <SidebarLeft {...args} />
  </SidebarProvider>
)
//
export const Default = Template.bind({})
// mainNav: [
//   {
//     title: "Playground",
//     url: "#",
//     icon: SquareTerminal,
//     isActive: true,
//     items: [
//       {
//         title: "History",
//         url: "#",
//       },
//       {
//         title: "Starred",
//         url: "#",
//       },
//     ]
//   },
Default.args = {
  title: 'Playground',
  subTitle: 'Airview',
  menuHeading: 'Main Menu',
  mainNav: [
    {
      label: 'Playground',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      links: [
        { label: 'History', url: '#' },
        { label: 'Starred', url: '#' },
        { label: 'Settings', url: '#' },
      ],
    },
    {
      label: 'Models',
      url: '#',
      icon: Bot,
      links: [
        { label: 'Genesis', url: '#' },
        { label: 'Explorer', url: '#' },
        { label: 'Quantum', url: '#' },
      ],
    },
    {
      label: 'Documentation',
      url: '#',
      icon: BookOpen,
      links: [
        { label: 'Introduction', url: '#' },
        { label: 'Get Started', url: '#' },
        { label: 'Tutorials', url: '#' },
        { label: 'Changelog', url: '#' },
      ],
    },
    {
      label: 'Settings',
      url: '#',
      icon: Settings2,
      links: [
        { label: 'General', url: '#' },
        { label: 'Team', url: '#' },
        { label: 'Billing', url: '#' },
        { label: 'Limits', url: '#' },
      ],
    },
  ],
  secondaryNav: [
    {
      label: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      label: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
  onNavClick: fn(),
}

export const NoClickFunction = Template.bind({})
NoClickFunction.args = {
  title: 'Playground',
  subTitle: 'Airview',
  menuHeading: 'Main Menu',
  mainNav: [
    {
      label: 'Playground',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      links: [
        { label: 'History', url: '#' },
        { label: 'Starred', url: '#' },
        { label: 'Settings', url: '#' },
      ],
    },
    {
      label: 'Models',
      url: '#',
      icon: Bot,
      links: [
        { label: 'Genesis', url: '#' },
        { label: 'Explorer', url: '#' },
        { label: 'Quantum', url: '#' },
      ],
    },
    {
      label: 'Documentation',
      url: '#',
      icon: BookOpen,
      links: [
        { label: 'Introduction', url: '#' },
        { label: 'Get Started', url: '#' },
        { label: 'Tutorials', url: '#' },
        { label: 'Changelog', url: '#' },
      ],
    },
    {
      label: 'Settings',
      url: '#',
      icon: Settings2,
      links: [
        { label: 'General', url: '#' },
        { label: 'Team', url: '#' },
        { label: 'Billing', url: '#' },
        { label: 'Limits', url: '#' },
      ],
    },
  ],
  secondaryNav: [
    {
      label: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      label: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
}

export const Loading = Template.bind({})
Loading.args = {
  title: 'Playground',
  loading: true,
  subTitle: 'Airview',
  menuHeading: 'Main Menu',
  mainNav: undefined,
  secondaryNav: undefined,
  onNavClick: fn(),
}
const GithubIcon = () => <DynamicIcon iconName="github" type="brands" />
export const Airview = Template.bind({})
Airview.args = {
  title: 'Playground',
  subTitle: 'Airview',
  menuHeading: 'Main Menu',
  mainNav: [
    {
      label: 'Kubernetes',
      url: '/collections/solutions/solutions/kubernetes/_index.md',
      type: 'published',
      links: [
        {
          label: 'High Level Design',
          url: '/solutions/designs/high_level_design_lczbvf99/_index.md',
          type: 'published',
        },
        {
          label: 'Istio Ambient Mesh',
          url: '/solutions/designs/istio_ambient_mesh_leemxsdx/_index.md',
          type: 'published',
        },
        {
          label: 'AWS Landing Zone - Elastic Kubernetes Service (EKS)',
          url: '/solutions/designs/elastic_kubernetes_service_eks_ljwysr3d/_index.md',
          type: 'published',
        },
      ],
    },
    {
      label: 'AI Contact Centre',
      url: '/collections/solutions/solutions/contact_centre/_index.md',
      type: 'published',
    },
    // Additional items follow the same structure...
  ],
}

export const CustomIcons = Template.bind({})
CustomIcons.args = {
  title: 'Playground',
  subTitle: 'Airview',
  menuHeading: 'Main Menu',
  mainNav: [
    {
      label: 'Kubernetes',
      url: '/collections/solutions/solutions/kubernetes/_index.md',
      icon: GithubIcon,
      type: 'published',
      links: [
        {
          label: 'High Level Design',
          url: '/solutions/designs/high_level_design_lczbvf99/_index.md',
          type: 'published',
        },
        {
          label: 'Istio Ambient Mesh',
          url: '/solutions/designs/istio_ambient_mesh_leemxsdx/_index.md',
          type: 'published',
        },
        {
          label: 'AWS Landing Zone - Elastic Kubernetes Service (EKS)',
          url: '/solutions/designs/elastic_kubernetes_service_eks_ljwysr3d/_index.md',
          type: 'published',
        },
      ],
    },
    {
      label: 'AI Contact Centre',
      url: '/collections/solutions/solutions/contact_centre/_index.md',
      type: 'published',
    },
    // Additional items follow the same structure...
  ],
}

export const MultipleMenus = Template.bind({})
MultipleMenus.args = {
  title: 'Playground',
  subTitle: 'Airview',
  menuHeading: 'Main Menu',
  mainNav: [
    {
      label: 'Playground',
      url: '#',
      isActive: true,
      links: [
        { label: 'History', url: '//#' },
        { label: 'Starred', url: '#' },
        { label: 'Settings', url: '#' },
      ],
    },
    {
      label: 'Models',
      url: '#',
      icon: Bot,
      links: [
        { label: 'Genesis', url: '#' },
        { label: 'Explorer', url: '#' },
        { label: 'Quantum', url: '#' },
      ],
    },

    {
      label: 'Playground',
      url: '#',
      icon: SquareTerminal,
      isActive: true,
      links: [
        { label: 'History', url: '#' },
        { label: 'Starred', url: '#' },
        { label: 'Settings', url: '#' },
      ],
    },
    {
      label: 'Models',
      url: '#',
      icon: Bot,
      links: [
        { label: 'Genesis', url: '#' },
        { label: 'Explorer', url: '#' },
        { label: 'Quantum', url: '#' },
      ],
    },
  ],
  secondaryNav: [
    {
      label: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      label: 'Feedback',
      url: '//#',
    },
  ],
  pathName: '//#',
  onNavClick: fn(),
}

export const NoArgs = Template.bind({})
NoArgs.args = {}
