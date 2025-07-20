import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import type { UIMessage } from 'ai'
import { action } from '@storybook/addon-actions'
import { Users } from 'lucide-react'
import { CopilotInterface } from './CopilotInterface'
import { businessUnits, mockSidebarItems, mockNotifications } from '../DigitalColleagues/test-data'
import { testCapabilities as capabilities } from '../../test-data/capabilities'

// Mock chat sessions
const mockChatSessions = [
  {
    id: "1",
    title: "Logo Design Review",
    lastMessage: "The color palette looks great! Let's refine the typography...",
  },
  {
    id: "2",
    title: "React Component Optimization",
    lastMessage: "Here's how you can improve the performance of your component...",
  },
  {
    id: "3",
    title: "Campaign Strategy Discussion",
    lastMessage: "The target audience analysis shows promising results...",
  },
  {
    id: "4",
    title: "Product Roadmap Planning",
    lastMessage: "Based on user feedback, I recommend prioritizing...",
  },
]

// Default messages
const defaultMessages: UIMessage[] = [
  {
    id: "1",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Hi! I'm your AI assistant with advanced capabilities. I can help with various tasks, access data, and provide contextual actions. What would you like to work on today?"
      }
    ],
  },
]

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
    sidebarInitiallyClosed: {
      control: 'boolean',
      description: 'Whether the sidebar should start closed',
    },
  },
}

// Base args template for all stories
const baseArgs = {
  // Required props
  businessUnits,
  capabilities,
  sidebarItems: mockSidebarItems,
  notifications: mockNotifications,
  sessions: mockChatSessions,
  
  // Event handlers with Storybook actions
  onNewChat: action('onNewChat'),
  onSessionSelect: action('onSessionSelect'),
  onSessionDelete: action('onSessionDelete'),
  onSessionEdit: action('onSessionEdit'),
  onBusinessUnitChange: action('onBusinessUnitChange'),
  onNotificationRemove: action('onNotificationRemove'),
  onRemoveAll: action('onRemoveAll'),
  onActionClick: action('onActionClick'),
  onSearch: action('onSearch'),
  
  // Optional customization defaults
  initialTeam: 'design',
  showCapabilities: true,
  title: 'Digital Colleagues',
  
  // Layout customization defaults
  actionIcon: <Users className="mr-2 h-4 w-4" />,
  actionText: "Collaborate",
}

export default meta
type Story = StoryObj<typeof CopilotInterface>

export const Default: Story = {
  name: 'Default Copilot Interface',
  args: {
    ...baseArgs,
    messages: defaultMessages,
  },
  parameters: {
    docs: {
      description: {
        story: 'The default copilot interface with enhanced layout features: logo shows in header when sidebar is closed, functional copilot and notification buttons, and acknowledgeable notifications. Uses static messages for demo purposes.',
      },
    },
  },
}

export const WithAIIntegration: Story = {
  name: 'With AI Integration (Enabled by Default)',
  args: {
    ...baseArgs,
    // AI is enabled by default - you just need to provide configuration
    aiConfig: {
      // In a real app, this would connect to your AI service
      onError: (error: Error) => action('ai-error')(error),
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'CopilotInterface with AI enabled by default. Simply provide `aiConfig` to configure the AI behavior. In a real application, this would connect to your AI service endpoint.',
      },
    },
  },
}

export const DisabledAIDemo: Story = {
  name: 'AI Disabled (Demo Mode)',
  args: {
    ...baseArgs,
    enableAI: false,
    messages: [
      {
        id: "1",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "AI is disabled in this demo. This component can work with or without AI integration - perfect for testing and development!"
          }
        ],
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'CopilotInterface with AI disabled, using static messages instead. This is perfect for development, testing, and Storybook demos.',
      },
    },
  },
}

export const SidebarInitiallyClosed: Story = {
  name: 'Sidebar Initially Closed',
  args: {
    ...baseArgs,
    messages: defaultMessages,
    sidebarInitiallyClosed: true,
    title: 'Copilot with Closed Sidebar',
  },
  parameters: {
    docs: {
      description: {
        story: 'CopilotInterface with the sidebar initially closed. Users can still toggle it open using the menu button. This is useful for maximizing the chat area on smaller screens or when focusing on conversation.',
      },
    },
  },
}

export const DesignTeamFocus: Story = {
  name: 'Design Team Focus',
  args: {
    ...baseArgs,
    messages: defaultMessages,
    initialTeam: 'design',
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
    ...baseArgs,
    messages: defaultMessages,
    initialTeam: 'engineering',
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
    ...baseArgs,
    messages: defaultMessages,
    initialTeam: 'marketing',
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
    ...baseArgs,
    messages: defaultMessages,
    initialTeam: 'sales',
    title: 'Sales Copilot',
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
    ...baseArgs,
    initialTeam: 'sales',
    title: 'Sales Copilot with Capabilities',
    messages: [
      {
        id: "1",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hi! I'm your Sales AI assistant with advanced capabilities. I can help with sales tasks, access customer data, and provide contextual actions."
          }
        ]
      },
      {
        id: "2",
        role: "user",
        parts: [
          {
            type: "text",
            text: "Show me the sales pipeline"
          }
        ]
      },
      {
        id: "3",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "I can help you with that! I have access to sales capabilities including customer management, opportunity tracking, and pipeline analysis. Would you like me to show you the current opportunities or customer data?"
          }
        ]
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
    ...baseArgs,
    initialTeam: 'design',
    title: 'Design Copilot - Active Session',
    messages: [
      {
        id: "1",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hi! I'm your Design AI assistant with advanced capabilities. I can help with design tasks, access project data, and provide contextual actions."
          }
        ]
      },
      {
        id: "2",
        role: "user",
        parts: [
          {
            type: "text",
            text: "I need help with a logo design for a tech startup"
          }
        ]
      },
      {
        id: "3",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Great! I can help you create a logo design. Let me access the design capabilities to provide you with templates, color palettes, and design guidelines for tech startups."
          }
        ]
      },
      {
        id: "4",
        role: "user",
        parts: [
          {
            type: "text",
            text: "What style are you looking for? Modern, minimalist, or something more creative?"
          }
        ]
      },
      {
        id: "5",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "I'd recommend a modern, minimalist approach for a tech startup. Here are some design principles I can help you with: clean typography, geometric shapes, and a color palette that conveys innovation and trust."
          }
        ]
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
    ...baseArgs,
    initialTeam: 'product',
    title: 'Product Copilot - Empty State',
    sessions: [], // Empty sessions array
    messages: defaultMessages,
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
    ...baseArgs,
    initialTeam: 'marketing',
    title: 'Marketing Copilot - Mobile',
    messages: defaultMessages,
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
    ...baseArgs,
    initialTeam: 'engineering',
    title: 'Engineering Copilot - Dark Mode',
    messages: defaultMessages,
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
    ...baseArgs,
    initialTeam: 'design',
    title: 'Design Copilot - Loading',
    messages: defaultMessages,
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
    ...baseArgs,
    initialTeam: 'sales',
    title: 'All Capabilities Showcase',
    messages: [
      {
        id: "1",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Welcome! I'm your AI assistant with comprehensive capabilities across Sales, Marketing, and more. I can help with customer management, opportunity tracking, campaign analysis, and contextual actions."
          }
        ]
      },
      {
        id: "2",
        role: "user",
        parts: [
          {
            type: "text",
            text: "Show me what capabilities you have"
          }
        ]
      },
      {
        id: "3",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "I have access to several key capabilities:\n\n• **Sales**: Customer management, opportunity tracking, pipeline analysis\n• **Marketing**: Campaign management, lead generation, analytics\n• **Data Access**: Customer lists, deal information, performance metrics\n• **Actions**: Create, update, export, and analyze data\n\nYou can access these through the capabilities menu or by asking me directly!"
          }
        ]
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
    ...baseArgs,
    initialTeam: 'marketing',
    title: 'Marketing Copilot - Interactive',
    messages: [
      {
        id: "1",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hi! I'm your Marketing AI assistant. I can help with campaign management, lead generation, and analytics. Try clicking the 'Show Capabilities' button to see what I can do!"
          }
        ]
      },
      {
        id: "2",
        role: "user",
        parts: [
          {
            type: "text",
            text: "How can I analyze my campaign performance?"
          }
        ]
      },
      {
        id: "3",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Great question! I can help you analyze campaign performance through my marketing capabilities. I can access campaign data, show performance metrics, and provide insights. Would you like me to show you the current campaigns or specific performance data?"
          }
        ]
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
    ...baseArgs,
    initialTeam: 'engineering',
    title: 'Enhanced Engineering Copilot',
    enableFileUpload: true,
    maxFileSize: 10, // 10MB
    allowedFileTypes: ['image/*', 'text/*', 'application/pdf'],
    messages: [
      {
        id: "1",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hi! I'm your enhanced AI assistant. I can help with tasks, display cards, references, and handle file uploads. Try uploading a file!"
          }
        ]
      },
      {
        id: "2",
        role: "user",
        parts: [
          {
            type: "text",
            text: "Can you show me a task card?"
          }
        ]
      },
      {
        id: "3",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Here's a sample task card I created for you with enhanced features for project management and tracking."
          }
        ]
      },
      {
        id: "4",
        role: "user",
        parts: [
          {
            type: "text",
            text: "Can you also show me some references?"
          }
        ]
      },
      {
        id: "5",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Here are some helpful engineering resources that I can provide access to for your development work."
          }
        ]
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
    ...baseArgs,
    initialTeam: 'engineering',
    title: 'Engineering Copilot',
    messages: [
      {
        id: "1",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hi! I'm your Engineering AI assistant. I can help with code reviews, architecture decisions, debugging, and technical documentation. How can I assist you today?"
          }
        ]
      },
      {
        id: "2",
        role: "user",
        parts: [
          {
            type: "text",
            text: "I'm working on a React component library and need help with the architecture. We're planning to have shared components across multiple applications."
          }
        ]
      },
      {
        id: "3",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Excellent! Building a shared component library is a great architectural decision. Here are some key considerations:\n\n• **Monorepo vs Multi-repo**: I'd recommend a monorepo structure for easier management\n• **Build System**: Consider using tools like Lerna, Nx, or Turbo for build orchestration\n• **Component API Design**: Focus on consistent prop naming and behavior\n• **Theming**: Implement a robust theming system for customization\n• **Documentation**: Use tools like Storybook for component documentation\n\nWhat specific aspects would you like to dive deeper into?"
          }
        ]
      },
      {
        id: "4",
        role: "user",
        parts: [
          {
            type: "text",
            text: "Let's focus on the build system first. We're currently using Vite, but I'm not sure if that's the best choice for a component library."
          }
        ]
      },
      {
        id: "5",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Vite is actually a great choice for component libraries! Here's why:\n\n**Advantages of Vite:**\n• Fast development with HMR\n• Excellent TypeScript support\n• Tree-shaking for optimal bundle sizes\n• ESM-first approach\n• Great plugin ecosystem\n\n**Alternative considerations:**\n• **Rollup**: For more control over bundling (Vite uses Rollup under the hood)\n• **Webpack**: If you need specific loaders or have complex requirements\n• **Turbo**: For monorepo build orchestration (can work with Vite)\n\nFor a React component library, I'd recommend sticking with Vite but consider adding Turbo for monorepo management if you have multiple packages."
          }
        ]
      },
      {
        id: "6",
        role: "user",
        parts: [
          {
            type: "text",
            text: "That's reassuring! Now, what about component API design? I want to ensure consistency across all components."
          }
        ]
      },
      {
        id: "7",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Great question! Consistent API design is crucial for developer experience. Here are my recommendations for component library API design patterns and best practices."
          }
        ]
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the chat interface with an extensive conversation history, showing how the interface handles long conversations with technical discussions.',
      },
    },
  },
}

export const EnhancedFeaturesShowcase: Story = {
  name: 'Enhanced Features Showcase',
  args: {
    ...baseArgs,
    initialTeam: 'engineering',
    title: 'Enhanced AI Assistant',
    enableFileUpload: true,
    maxFileSize: 10,
    allowedFileTypes: ['image/*', 'text/*', 'application/pdf'],
    messages: [
      {
        id: "1",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hi! I'm your enhanced AI assistant. I can now handle various types of content including files, images, cards, references, and interactive menus. How can I help you today?"
          }
        ]
      },
      {
        id: "2",
        role: "user",
        parts: [
          {
            type: "text",
            text: "I need help with a new project. Can you show me some tasks?"
          }
        ]
      },
      {
        id: "3",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Of course! Let me show you some project tasks and resources that I can help you with for your new project setup."
          }
        ]
      },
      {
        id: "4",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "I can create task cards for project management, show references for documentation, and provide interactive menus for project options."
          }
        ]
      },
      {
        id: "5",
        role: "user",
        parts: [
          {
            type: "text",
            text: "This is great! Can you show me some project options?"
          }
        ]
      },
      {
        id: "6",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Here are some project template options you can choose from for your development needs."
          }
        ]
      },
      {
        id: "7",
        role: "user",
        parts: [
          {
            type: "text",
            text: "Perfect! I'll go with the web application template."
          }
        ]
      },
      {
        id: "8",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Excellent choice! I can help you set up a web application with the latest technologies and best practices."
          }
        ]
      },
      {
        id: "9",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "You can now drag and drop files into the chat, upload images, and I'll display them inline. I can also show you different types of cards, references, and interactive menus. Try uploading a file or asking for more specific help!"
          }
        ]
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
    ...baseArgs,
    initialTeam: 'design',
    title: 'File Upload Assistant',
    enableFileUpload: true,
    maxFileSize: 5,
    allowedFileTypes: ['image/*', 'text/*', 'application/pdf'],
    messages: [
      {
        id: "1",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hi! I can help you with file uploads. You can drag and drop files into the chat or click the paperclip icon to upload files. I support images, text files, and PDFs up to 5MB."
          }
        ]
      },
      {
        id: "2",
        role: "user",
        parts: [
          {
            type: "text",
            text: "I'd like to upload a design mockup for review."
          }
        ]
      },
      {
        id: "3",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Perfect! Please upload your design mockup. I'll be able to display it inline and provide feedback on your design."
          }
        ]
      },
      {
        id: "4",
        role: "user",
        parts: [
          {
            type: "text",
            text: "Here's my design mockup for the new application interface."
          }
        ]
      },
      {
        id: "5",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Great mockup! I can see the clean design aesthetic. The color scheme looks professional and the layout is well-structured. Would you like me to create a task to implement this design?"
          }
        ]
      },
      {
        id: "6",
        role: "user",
        parts: [
          {
            type: "text",
            text: "I'm also attaching the project requirements document."
          }
        ]
      },
      {
        id: "7",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Thank you for the requirements document! I'll review it and can help you create development tasks based on the specifications. The combination of the visual mockup and detailed requirements will help ensure we build exactly what you need."
          }
        ]
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

export const UndefinedProps: Story = {
  name: 'Undefined Props Test',
  args: {
    businessUnits: undefined,
    capabilities: undefined,
    sidebarItems: undefined,
    notifications: undefined,
    sessions: undefined,
    messages: undefined,
    onNewChat: undefined,
    onSessionSelect: undefined,
    onSessionDelete: undefined,
    onSessionEdit: undefined,
    onBusinessUnitChange: undefined,
    onNotificationRemove: undefined,
    onRemoveAll: undefined,
    onActionClick: undefined,
    initialTeam: undefined,
    showCapabilities: undefined,
    title: undefined,
    enableFileUpload: undefined,
    maxFileSize: undefined,
    allowedFileTypes: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests how the component behaves when all props are undefined, ensuring proper fallback to default values. This demonstrates the robustness of the component when receiving incomplete or missing configuration.',
      },
    },
  },
}

export const EmptyProps: Story = {
  name: 'Empty Props Test',
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Tests the component with completely empty props object, demonstrating default behavior and ensuring the component renders correctly with all default values.',
      },
    },
  },
}

export const NoDataProvided: Story = {
  name: 'No Data Provided - Error Resilience Test',
  args: {
    // Only provide required event handlers with actions
    onNewChat: action('onNewChat'),
    onSessionSelect: action('onSessionSelect'),
    onSessionDelete: action('onSessionDelete'),
    onSessionEdit: action('onSessionEdit'),
    onBusinessUnitChange: action('onBusinessUnitChange'),
    onNotificationRemove: action('onNotificationRemove'),
    onRemoveAll: action('onRemoveAll'),
    onActionClick: action('onActionClick'),
    
    // All data props are undefined or empty to test error resilience
    messages: [],
    businessUnits: [],
    capabilities: [],
    sidebarItems: [],
    notifications: [],
    sessions: [],
    
    title: 'Empty State Test',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests the component with all empty data arrays to ensure it handles undefined/empty state gracefully without errors.',
      },
    },
  },
}
