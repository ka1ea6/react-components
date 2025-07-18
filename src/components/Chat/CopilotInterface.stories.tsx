import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import LandingPage from './CopilotInterface'
import { businessUnits } from '../DigitalColleagues/test-data'

const meta: Meta<typeof LandingPage> = {
  title: 'Chat/CopilotInterface',
  component: LandingPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive AI chat interface landing page with capabilities, team switching, and chat session management.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    initialTeam: {
      control: 'select',
      options: businessUnits.map(unit => unit.id),
      description: 'The initially selected team',
    },
    showCapabilities: {
      control: 'boolean',
      description: 'Whether to show capabilities menu',
    },
  },
}

export default meta
type Story = StoryObj<typeof LandingPage>

export const Default: Story = {
  name: 'Default Landing Page',
  args: {
    initialTeam: 'design',
    showCapabilities: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'The default landing page with all teams and capabilities available.',
      },
    },
  },
}

export const DesignTeamFocus: Story = {
  name: 'Design Team Focus',
  args: {
    initialTeam: 'design',
    showCapabilities: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Landing page focused on design team capabilities and workflows.',
      },
    },
  },
}

export const EngineeringTeamFocus: Story = {
  name: 'Engineering Team Focus',
  args: {
    initialTeam: 'engineering',
    showCapabilities: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Landing page focused on engineering team capabilities and workflows.',
      },
    },
  },
}

export const MarketingTeamFocus: Story = {
  name: 'Marketing Team Focus',
  args: {
    initialTeam: 'marketing',
    showCapabilities: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Landing page focused on marketing team capabilities and workflows.',
      },
    },
  },
}

export const SalesTeamFocus: Story = {
  name: 'Sales Team Focus',
  args: {
    initialTeam: 'sales',
    showCapabilities: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Landing page focused on sales team capabilities and workflows.',
      },
    },
  },
}

export const WithCapabilitiesDemo: Story = {
  name: 'Capabilities Demo',
  args: {
    initialTeam: 'sales',
    showCapabilities: true,
    initialMessages: [
      {
        id: "1",
        content: "Hi! I'm your Sales AI assistant with advanced capabilities. I can help with sales tasks, access customer data, and provide contextual actions.",
        type: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
      },
      {
        id: "2",
        content: "Show me the sales pipeline",
        type: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 4),
      },
      {
        id: "3",
        content: "I can help you with that! I have access to sales capabilities including customer management, opportunity tracking, and pipeline analysis. Would you like me to show you the current opportunities or customer data?",
        type: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the capabilities menu and contextual actions within the chat interface.',
      },
    },
  },
}

export const WithActiveChat: Story = {
  name: 'Active Chat Session',
  args: {
    initialTeam: 'design',
    showCapabilities: true,
    initialMessages: [
      {
        id: "1",
        content: "Hi! I'm your Design AI assistant with advanced capabilities. I can help with design tasks, access project data, and provide contextual actions.",
        type: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        id: "2",
        content: "I need help with a logo design for a tech startup",
        type: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 29),
      },
      {
        id: "3",
        content: "Great! I can help you create a logo design. Let me access the design capabilities to provide you with templates, color palettes, and design guidelines for tech startups.",
        type: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 28),
      },
      {
        id: "4",
        content: "What style are you looking for? Modern, minimalist, or something more creative?",
        type: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 27),
      },
      {
        id: "5",
        content: "I'd recommend a modern, minimalist approach for a tech startup. Here are some design principles I can help you with: clean typography, geometric shapes, and a color palette that conveys innovation and trust.",
        type: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 26),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Landing page with an active chat session showing message history.',
      },
    },
  },
}

export const EmptyState: Story = {
  name: 'Empty State',
  args: {
    initialTeam: 'product',
    showCapabilities: true,
    initialSessions: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Landing page in empty state with no chat sessions.',
      },
    },
  },
}

export const MobileView: Story = {
  name: 'Mobile View',
  args: {
    initialTeam: 'marketing',
    showCapabilities: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Landing page optimized for mobile devices with responsive layout.',
      },
    },
  },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  args: {
    initialTeam: 'engineering',
    showCapabilities: true,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: 'Landing page in dark mode theme.',
      },
    },
  },
}

export const LoadingState: Story = {
  name: 'Loading State',
  args: {
    initialTeam: 'design',
    showCapabilities: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Landing page showing loading states for AI responses.',
      },
    },
  },
}

export const AllCapabilitiesShowcase: Story = {
  name: 'All Capabilities Showcase',
  args: {
    initialTeam: 'sales',
    showCapabilities: true,
    initialMessages: [
      {
        id: "1",
        content: "Welcome! I'm your AI assistant with comprehensive capabilities across Sales, Marketing, and more. I can help with customer management, opportunity tracking, campaign analysis, and contextual actions.",
        type: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
      },
      {
        id: "2",
        content: "Show me what capabilities you have",
        type: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 9),
      },
      {
        id: "3",
        content: "I have access to several key capabilities:\n\n• **Sales**: Customer management, opportunity tracking, pipeline analysis\n• **Marketing**: Campaign management, lead generation, analytics\n• **Data Access**: Customer lists, deal information, performance metrics\n• **Actions**: Create, update, export, and analyze data\n\nYou can access these through the capabilities menu or by asking me directly!",
        type: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 8),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive showcase of all available capabilities and features in the AI chat interface.',
      },
    },
  },
}

export const InteractiveCapabilities: Story = {
  name: 'Interactive Capabilities',
  args: {
    initialTeam: 'marketing',
    showCapabilities: true,
    initialMessages: [
      {
        id: "1",
        content: "Hi! I'm your Marketing AI assistant. I can help with campaign management, lead generation, and analytics. Try clicking the 'Show Capabilities' button to see what I can do!",
        type: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
      },
      {
        id: "2",
        content: "How can I analyze my campaign performance?",
        type: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 4),
      },
      {
        id: "3",
        content: "Great question! I can help you analyze campaign performance through my marketing capabilities. I can access campaign data, show performance metrics, and provide insights. Would you like me to show you the current campaigns or specific performance data?",
        type: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example showing how users can explore and use capabilities within the chat interface.',
      },
    },
  },
}
