import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import CopilotInterface, { type EnhancedMessage } from './CopilotInterface'
import { businessUnits } from '../DigitalColleagues/test-data'

const meta: Meta<typeof CopilotInterface> = {
  title: 'Chat/CopilotInterface',
  component: CopilotInterface,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive AI chat interface with the same layout as the dashboard, featuring sidebar navigation, business unit switching, and chat session management.',
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
    title: {
      control: 'text',
      description: 'The title displayed in the header',
    },
  },
}

export default meta
type Story = StoryObj<typeof CopilotInterface>

export const Default: Story = {
  name: 'Default Copilot Interface',
  args: {
    initialTeam: 'design',
    showCapabilities: true,
    title: 'Digital Colleagues',
  },
  parameters: {
    docs: {
      description: {
        story: 'The default copilot interface with enhanced layout features: logo shows in header when sidebar is closed, functional copilot and notification buttons, and acknowledgeable notifications.',
      },
    },
  },
}

export const DesignTeamFocus: Story = {
  name: 'Design Team Focus',
  args: {
    initialTeam: 'design',
    showCapabilities: true,
    title: 'Design Copilot',
  },
  parameters: {
    docs: {
      description: {
        story: 'Copilot interface focused on design team capabilities and workflows.',
      },
    },
  },
}

export const EngineeringTeamFocus: Story = {
  name: 'Engineering Team Focus',
  args: {
    initialTeam: 'engineering',
    showCapabilities: true,
    title: 'Engineering Copilot',
  },
  parameters: {
    docs: {
      description: {
        story: 'Copilot interface focused on engineering team capabilities and workflows.',
      },
    },
  },
}

export const MarketingTeamFocus: Story = {
  name: 'Marketing Team Focus',
  args: {
    initialTeam: 'marketing',
    showCapabilities: true,
    title: 'Marketing Copilot',
  },
  parameters: {
    docs: {
      description: {
        story: 'Copilot interface focused on marketing team capabilities and workflows.',
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
        role: "assistant",
        type: "text",
        content: "Hi! I'm your Sales AI assistant with advanced capabilities. I can help with sales tasks, access customer data, and provide contextual actions.",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
      },
      {
        id: "2",
        role: "user",
        type: "text",
        content: "Show me the sales pipeline",
        timestamp: new Date(Date.now() - 1000 * 60 * 4),
      },
      {
        id: "3",
        role: "assistant",
        type: "text",
        content: "I can help you with that! I have access to sales capabilities including customer management, opportunity tracking, and pipeline analysis. Would you like me to show you the current opportunities or customer data?",
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
        role: "assistant",
        type: "text",
        content: "Hi! I'm your Design AI assistant with advanced capabilities. I can help with design tasks, access project data, and provide contextual actions.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        id: "2",
        role: "user",
        type: "text",
        content: "I need help with a logo design for a tech startup",
        timestamp: new Date(Date.now() - 1000 * 60 * 29),
      },
      {
        id: "3",
        role: "assistant",
        type: "text",
        content: "Great! I can help you create a logo design. Let me access the design capabilities to provide you with templates, color palettes, and design guidelines for tech startups.",
        timestamp: new Date(Date.now() - 1000 * 60 * 28),
      },
      {
        id: "4",
        role: "user",
        type: "text",
        content: "What style are you looking for? Modern, minimalist, or something more creative?",
        timestamp: new Date(Date.now() - 1000 * 60 * 27),
      },
      {
        id: "5",
        role: "assistant",
        type: "text",
        content: "I'd recommend a modern, minimalist approach for a tech startup. Here are some design principles I can help you with: clean typography, geometric shapes, and a color palette that conveys innovation and trust.",
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
        role: "assistant",
        type: "text",
        content: "Welcome! I'm your AI assistant with comprehensive capabilities across Sales, Marketing, and more. I can help with customer management, opportunity tracking, campaign analysis, and contextual actions.",
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
      },
      {
        id: "2",
        role: "user",
        type: "text",
        content: "Show me what capabilities you have",
        timestamp: new Date(Date.now() - 1000 * 60 * 9),
      },
      {
        id: "3",
        role: "assistant",
        type: "text",
        content: "I have access to several key capabilities:\n\n• **Sales**: Customer management, opportunity tracking, pipeline analysis\n• **Marketing**: Campaign management, lead generation, analytics\n• **Data Access**: Customer lists, deal information, performance metrics\n• **Actions**: Create, update, export, and analyze data\n\nYou can access these through the capabilities menu or by asking me directly!",
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
        role: "assistant",
        type: "text",
        content: "Hi! I'm your Marketing AI assistant. I can help with campaign management, lead generation, and analytics. Try clicking the 'Show Capabilities' button to see what I can do!",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
      },
      {
        id: "2",
        role: "user",
        type: "text",
        content: "How can I analyze my campaign performance?",
        timestamp: new Date(Date.now() - 1000 * 60 * 4),
      },
      {
        id: "3",
        role: "assistant",
        type: "text",
        content: "Great question! I can help you analyze campaign performance through my marketing capabilities. I can access campaign data, show performance metrics, and provide insights. Would you like me to show you the current campaigns or specific performance data?",
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

export const EnhancedWithFileUpload: Story = {
  name: 'Enhanced with File Upload',
  args: {
    initialTeam: 'engineering',
    showCapabilities: true,
    enableFileUpload: true,
    maxFileSize: 10, // 10MB
    allowedFileTypes: ['image/*', 'text/*', 'application/pdf'],
    title: 'Enhanced Engineering Copilot',
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        type: "text",
        content: "Hi! I'm your enhanced AI assistant. I can help with tasks, display cards, references, and handle file uploads. Try uploading a file!",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
      },
      {
        id: "2",
        role: "user",
        type: "text",
        content: "Can you show me a task card?",
        timestamp: new Date(Date.now() - 1000 * 60 * 4),
      },
      {
        id: "3",
        role: "assistant",
        type: "card",
        content: "Here's a sample task card:",
        card: {
          title: "Code Review Task",
          description: "Review the new authentication module",
          variant: 'task',
          data: {
            id: 123,
            name: "Review Authentication Module",
            description: "Complete code review for the new authentication system including security checks and performance optimization",
            status: 'todo',
            dateLogged: new Date().toISOString(),
            project: { id: 1, name: "Security Enhancement Project" }
          }
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
      },
      {
        id: "4",
        role: "user",
        type: "text",
        content: "Can you also show me some references?",
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
      },
      {
        id: "5",
        role: "assistant",
        type: "reference",
        content: "Here are some helpful engineering resources:",
        references: [
          {
            id: "1",
            title: "React Best Practices Guide",
            description: "Comprehensive guide to React development patterns",
            type: 'document',
            url: "https://react.dev/learn"
          },
          {
            id: "2",
            title: "TypeScript Documentation",
            description: "Official TypeScript handbook and reference",
            type: 'link',
            url: "https://www.typescriptlang.org/docs/"
          },
          {
            id: "3",
            title: "Code Review Checklist",
            description: "Internal checklist for code reviews",
            type: 'internal'
          }
        ],
        timestamp: new Date(Date.now() - 1000 * 60 * 1),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the enhanced copilot interface with file upload capabilities, card display, references, and the capabilities menu in its original location.',
      },
    },
  },
}

export const LongChatHistory: Story = {
  name: 'Long Chat History',
  args: {
    initialTeam: 'engineering',
    showCapabilities: true,
    title: 'Engineering Copilot',
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        type: "text",
        content: "Hi! I'm your Engineering AI assistant. I can help with code reviews, architecture decisions, debugging, and technical documentation. How can I assist you today?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
      {
        id: "2",
        role: "user",
        type: "text",
        content: "I'm working on a React component library and need help with the architecture. We're planning to have shared components across multiple applications.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 30), // 2 hours ago + 30 seconds
      },
      {
        id: "3",
        role: "assistant",
        type: "text",
        content: "Excellent! Building a shared component library is a great architectural decision. Here are some key considerations:\n\n• **Monorepo vs Multi-repo**: I'd recommend a monorepo structure for easier management\n• **Build System**: Consider using tools like Lerna, Nx, or Turbo for build orchestration\n• **Component API Design**: Focus on consistent prop naming and behavior\n• **Theming**: Implement a robust theming system for customization\n• **Documentation**: Use tools like Storybook for component documentation\n\nWhat specific aspects would you like to dive deeper into?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60), // 2 hours ago + 1 minute
      },
      {
        id: "4",
        role: "user",
        type: "text",
        content: "Let's focus on the build system first. We're currently using Vite, but I'm not sure if that's the best choice for a component library.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 2), // 2 hours ago + 2 minutes
      },
      {
        id: "5",
        role: "assistant",
        type: "text",
        content: "Vite is actually a great choice for component libraries! Here's why:\n\n**Advantages of Vite:**\n• Fast development with HMR\n• Excellent TypeScript support\n• Tree-shaking for optimal bundle sizes\n• ESM-first approach\n• Great plugin ecosystem\n\n**Alternative considerations:**\n• **Rollup**: For more control over bundling (Vite uses Rollup under the hood)\n• **Webpack**: If you need specific loaders or have complex requirements\n• **Turbo**: For monorepo build orchestration (can work with Vite)\n\nFor a React component library, I'd recommend sticking with Vite but consider adding Turbo for monorepo management if you have multiple packages.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 3), // 2 hours ago + 3 minutes
      },
      {
        id: "6",
        role: "user",
        type: "text",
        content: "That's reassuring! Now, what about component API design? I want to ensure consistency across all components.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 5), // 2 hours ago + 5 minutes
      },
      {
        id: "7",
        role: "assistant",
        type: "text",
        content: "Great question! Consistent API design is crucial for developer experience. Here are my recommendations:\n\n**Naming Conventions:**\n• Use consistent prop names: `variant`, `size`, `disabled`, `loading`\n• Boolean props should be descriptive: `isVisible`, `hasError`, `showIcon`\n• Event handlers: `onClick`, `onSubmit`, `onValueChange`\n\n**Component Structure:**\n```typescript\ninterface ComponentProps {\n  // Visual variants\n  variant?: 'primary' | 'secondary' | 'outline'\n  size?: 'small' | 'medium' | 'large'\n  \n  // State\n  disabled?: boolean\n  loading?: boolean\n  \n  // Content\n  children?: React.ReactNode\n  \n  // Events\n  onClick?: (event: MouseEvent) => void\n  \n  // Styling\n  className?: string\n  style?: React.CSSProperties\n}\n```\n\n**Best Practices:**\n• Provide sensible defaults\n• Use TypeScript for better DX\n• Document props with JSDoc comments\n• Consider compound components for complex UIs",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 7), // 2 hours ago + 7 minutes
      },
      {
        id: "8",
        role: "user",
        type: "text",
        content: "This is very helpful! I'm also concerned about theming. We need to support different brand colors and styles across different applications.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 10), // 2 hours ago + 10 minutes
      },
      {
        id: "9",
        role: "assistant",
        type: "card",
        content: "Here's a theming implementation example I've prepared for you:",
        card: {
          title: "Theme System Implementation",
          description: "Complete theming solution for your component library",
          variant: "generic",
          data: {
            cssVariables: {
              "--color-primary": "#3b82f6",
              "--color-secondary": "#6b7280",
              "--color-success": "#10b981",
              "--color-error": "#ef4444",
              "--color-warning": "#f59e0b"
            },
            implementation: "CSS Custom Properties + Theme Provider Pattern",
            features: ["Light/Dark mode support", "Custom theme overrides", "Tailwind CSS integration"]
          }
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 12), // 2 hours ago + 12 minutes
      },
      {
        id: "10",
        role: "user",
        type: "text",
        content: "Perfect! This gives me a complete roadmap for building our component library. Thank you for all the detailed explanations!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 15), // 2 hours ago + 15 minutes
      },
      {
        id: "11",
        role: "assistant",
        type: "reference",
        content: "You're very welcome! Here are some additional resources to help you on your journey:",
        references: [
          {
            id: "guide1",
            title: "React Component Library Best Practices",
            description: "Comprehensive guide for building production-ready component libraries",
            type: "document"
          },
          {
            id: "guide2",
            title: "Monorepo Management with Turbo",
            description: "Official Turbo documentation for monorepo setup",
            type: "link",
            url: "https://turbo.build/docs"
          },
          {
            id: "guide3",
            title: "Storybook for Component Documentation",
            description: "Learn how to document your components effectively",
            type: "link",
            url: "https://storybook.js.org/docs"
          }
        ],
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 17), // 2 hours ago + 17 minutes
      },
      {
        id: "12",
        role: "user",
        type: "text",
        content: "One quick follow-up - do you have any recommendations for versioning and releasing the component library?",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
      {
        id: "13",
        role: "assistant",
        type: "menu",
        content: "Great question! Here are some popular release strategies you can choose from:",
        menu: {
          title: "Release Strategy Options",
          items: [
            {
              id: "changesets",
              label: "Changesets",
              description: "Highly recommended for monorepos with semantic versioning",
              value: "changesets",
              action: () => console.log("Selected: Changesets")
            },
            {
              id: "semantic-release",
              label: "Semantic Release",
              description: "Automated releases based on commit messages",
              value: "semantic-release",
              action: () => console.log("Selected: Semantic Release")
            },
            {
              id: "release-please",
              label: "Release Please",
              description: "Google's automated release tool",
              value: "release-please",
              action: () => console.log("Selected: Release Please")
            }
          ]
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      },
      {
        id: "14",
        role: "user",
        type: "text",
        content: "Excellent! I think I have everything I need to get started. This conversation has been incredibly valuable.",
        timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
      },
      {
        id: "15",
        role: "assistant",
        type: "text",
        content: "I'm thrilled I could help! You're now equipped with a comprehensive strategy for building a world-class component library. Remember, start small, iterate often, and always prioritize developer experience.\n\nHere's a quick summary of your tech stack:\n• **Build**: Vite + Turbo\n• **Testing**: Jest + RTL + Chromatic\n• **Docs**: Storybook + comprehensive guides\n• **Theming**: CSS Custom Properties\n• **Releases**: Changesets (recommended)\n\nBest of luck with your component library journey! Feel free to reach out anytime you need guidance on implementation details. Happy coding! 🎉",
        timestamp: new Date(Date.now() - 1000 * 60), // 1 minute ago
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the chat interface with an extensive conversation history, showing how the interface handles long conversations with technical discussions, enhanced message types including cards, references, and interactive menus.',
      },
    },
  },
}

export const EnhancedFeaturesShowcase: Story = {
  name: 'Enhanced Features Showcase',
  args: {
    initialTeam: 'engineering',
    showCapabilities: true,
    title: 'Enhanced AI Assistant',
    enableFileUpload: true,
    maxFileSize: 10,
    allowedFileTypes: ['image/*', 'text/*', 'application/pdf'],
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        type: "text",
        content: "Hi! I'm your enhanced AI assistant. I can now handle various types of content including files, images, cards, references, and interactive menus. How can I help you today?",
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
      },
      {
        id: "2",
        role: "user",
        type: "text",
        content: "I need help with a new project. Can you show me some tasks?",
        timestamp: new Date(Date.now() - 1000 * 60 * 9),
      },
      {
        id: "3",
        role: "assistant",
        type: "text",
        content: "Of course! Let me show you some project tasks and resources:",
        timestamp: new Date(Date.now() - 1000 * 60 * 8),
      },
      {
        id: "4",
        role: "assistant",
        type: "card",
        content: "Here's a task card I created for you:",
        card: {
          title: "Project Setup Task",
          description: "Initial project configuration and setup",
          variant: "task",
          data: {
            id: 101,
            name: "Set up project infrastructure",
            description: "Configure CI/CD pipeline, setup development environment, and initialize repository structure",
            status: "todo",
            dateLogged: new Date(Date.now() - 1000 * 60 * 7).toISOString(),
            project: { id: 1, name: "Enhanced AI Project" }
          }
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 7),
      },
      {
        id: "5",
        role: "assistant",
        type: "reference",
        content: "Here are some helpful resources for your project:",
        references: [
          {
            id: "ref1",
            title: "Project Setup Guide",
            description: "Comprehensive guide for setting up new projects",
            type: "document",
            url: "https://docs.example.com/setup-guide"
          },
          {
            id: "ref2",
            title: "Best Practices Documentation",
            description: "Industry best practices for development",
            type: "document"
          },
          {
            id: "ref3",
            title: "CI/CD Templates",
            description: "Pre-configured templates for continuous integration",
            type: "link",
            url: "https://github.com/example/ci-templates"
          }
        ],
        timestamp: new Date(Date.now() - 1000 * 60 * 6),
      },
      {
        id: "6",
        role: "user",
        type: "text",
        content: "This is great! Can you show me some project options?",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
      },
      {
        id: "7",
        role: "assistant",
        type: "menu",
        content: "Here are some project options you can choose from:",
        menu: {
          title: "Project Templates",
          items: [
            {
              id: "web-app",
              label: "Web Application",
              description: "React/Next.js web application template",
              value: "web-app",
              action: () => console.log("Selected: Web Application")
            },
            {
              id: "api-service",
              label: "API Service",
              description: "RESTful API service with Node.js",
              value: "api-service",
              action: () => console.log("Selected: API Service")
            },
            {
              id: "mobile-app",
              label: "Mobile Application",
              description: "React Native mobile application",
              value: "mobile-app",
              action: () => console.log("Selected: Mobile Application")
            },
            {
              id: "desktop-app",
              label: "Desktop Application",
              description: "Electron desktop application",
              value: "desktop-app",
              action: () => console.log("Selected: Desktop Application")
            }
          ]
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 4),
      },
      {
        id: "8",
        role: "user",
        type: "text",
        content: "Perfect! I'll go with the web application template.",
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
      },
      {
        id: "9",
        role: "assistant",
        type: "card",
        content: "Excellent choice! I've created another task for the web application setup:",
        card: {
          title: "Web Application Setup",
          description: "Configure React/Next.js web application",
          variant: "task",
          data: {
            id: 102,
            name: "Initialize Web Application",
            description: "Setup Next.js project with TypeScript, Tailwind CSS, and essential dependencies",
            status: "todo",
            dateLogged: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
            project: { id: 1, name: "Enhanced AI Project" }
          }
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
      },
      {
        id: "10",
        role: "assistant",
        type: "text",
        content: "You can now drag and drop files into the chat, upload images, and I'll display them inline. I can also show you different types of cards, references, and interactive menus. Try uploading a file or asking for more specific help!",
        timestamp: new Date(Date.now() - 1000 * 60 * 1),
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive showcase of all enhanced features including file uploads, image display, interactive cards, reference lists, and menu options. This demonstrates the full capability of the enhanced chat interface.',
      },
    },
  },
}

export const FileUploadDemo: Story = {
  name: 'File Upload Demo',
  args: {
    initialTeam: 'design',
    showCapabilities: true,
    title: 'File Upload Assistant',
    enableFileUpload: true,
    maxFileSize: 5,
    allowedFileTypes: ['image/*', 'text/*', 'application/pdf'],
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        type: "text",
        content: "Hi! I can help you with file uploads. You can drag and drop files into the chat or click the paperclip icon to upload files. I support images, text files, and PDFs up to 5MB.",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
      },
      {
        id: "2",
        role: "user",
        type: "text",
        content: "I'd like to upload a design mockup for review.",
        timestamp: new Date(Date.now() - 1000 * 60 * 4),
      },
      {
        id: "3",
        role: "assistant",
        type: "text",
        content: "Perfect! Please upload your design mockup. I'll be able to display it inline and provide feedback on your design.",
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
      },
      {
        id: "4",
        role: "user",
        type: "image",
        content: "Here's my design mockup:",
        image: {
          url: "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Design+Mockup",
          alt: "Design mockup for new application",
          width: 400,
          height: 300
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 2),
      },
      {
        id: "5",
        role: "assistant",
        type: "text",
        content: "Great mockup! I can see the clean design aesthetic. The color scheme looks professional and the layout is well-structured. Would you like me to create a task to implement this design?",
        timestamp: new Date(Date.now() - 1000 * 60 * 1),
      },
      {
        id: "6",
        role: "user",
        type: "file",
        content: "I'm also attaching the project requirements document:",
        file: {
          name: "project-requirements.pdf",
          size: 2048000,
          type: "application/pdf",
          url: "https://example.com/project-requirements.pdf"
        },
        timestamp: new Date(Date.now() - 1000 * 30),
      },
      {
        id: "7",
        role: "assistant",
        type: "text",
        content: "Thank you for the requirements document! I'll review it and can help you create development tasks based on the specifications. The combination of the visual mockup and detailed requirements will help ensure we build exactly what you need.",
        timestamp: new Date(Date.now() - 1000 * 10),
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates file upload capabilities including image display and file attachments. Shows how users can interact with uploaded content and how the AI can provide contextual responses.',
      },
    },
  },
}
