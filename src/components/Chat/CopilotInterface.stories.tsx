import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import CopilotInterface from './CopilotInterface'
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

export const LongChatHistory: Story = {
  name: 'Long Chat History',
  args: {
    initialTeam: 'engineering',
    showCapabilities: true,
    title: 'Engineering Copilot',
    initialMessages: [
      {
        id: "1",
        content: "Hi! I'm your Engineering AI assistant. I can help with code reviews, architecture decisions, debugging, and technical documentation. How can I assist you today?",
        type: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
      {
        id: "2",
        content: "I'm working on a React component library and need help with the architecture. We're planning to have shared components across multiple applications.",
        type: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 30), // 2 hours ago + 30 seconds
      },
      {
        id: "3",
        content: "Excellent! Building a shared component library is a great architectural decision. Here are some key considerations:\n\n• **Monorepo vs Multi-repo**: I'd recommend a monorepo structure for easier management\n• **Build System**: Consider using tools like Lerna, Nx, or Turbo for build orchestration\n• **Component API Design**: Focus on consistent prop naming and behavior\n• **Theming**: Implement a robust theming system for customization\n• **Documentation**: Use tools like Storybook for component documentation\n\nWhat specific aspects would you like to dive deeper into?",
        type: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60), // 2 hours ago + 1 minute
      },
      {
        id: "4",
        content: "Let's focus on the build system first. We're currently using Vite, but I'm not sure if that's the best choice for a component library.",
        type: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 2), // 2 hours ago + 2 minutes
      },
      {
        id: "5",
        content: "Vite is actually a great choice for component libraries! Here's why:\n\n**Advantages of Vite:**\n• Fast development with HMR\n• Excellent TypeScript support\n• Tree-shaking for optimal bundle sizes\n• ESM-first approach\n• Great plugin ecosystem\n\n**Alternative considerations:**\n• **Rollup**: For more control over bundling (Vite uses Rollup under the hood)\n• **Webpack**: If you need specific loaders or have complex requirements\n• **Turbo**: For monorepo build orchestration (can work with Vite)\n\nFor a React component library, I'd recommend sticking with Vite but consider adding Turbo for monorepo management if you have multiple packages.",
        type: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 3), // 2 hours ago + 3 minutes
      },
      {
        id: "6",
        content: "That's reassuring! Now, what about component API design? I want to ensure consistency across all components.",
        type: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 5), // 2 hours ago + 5 minutes
      },
      {
        id: "7",
        content: "Great question! Consistent API design is crucial for developer experience. Here are my recommendations:\n\n**Naming Conventions:**\n• Use consistent prop names: `variant`, `size`, `disabled`, `loading`\n• Boolean props should be descriptive: `isVisible`, `hasError`, `showIcon`\n• Event handlers: `onClick`, `onSubmit`, `onValueChange`\n\n**Component Structure:**\n```typescript\ninterface ComponentProps {\n  // Visual variants\n  variant?: 'primary' | 'secondary' | 'outline'\n  size?: 'small' | 'medium' | 'large'\n  \n  // State\n  disabled?: boolean\n  loading?: boolean\n  \n  // Content\n  children?: React.ReactNode\n  \n  // Events\n  onClick?: (event: MouseEvent) => void\n  \n  // Styling\n  className?: string\n  style?: React.CSSProperties\n}\n```\n\n**Best Practices:**\n• Provide sensible defaults\n• Use TypeScript for better DX\n• Document props with JSDoc comments\n• Consider compound components for complex UIs",
        type: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 7), // 2 hours ago + 7 minutes
      },
      {
        id: "8",
        content: "This is very helpful! I'm also concerned about theming. We need to support different brand colors and styles across different applications.",
        type: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 10), // 2 hours ago + 10 minutes
      },
      {
        id: "9",
        content: "Theming is definitely critical for multi-application component libraries. Here's a robust approach:\n\n**CSS Custom Properties (Recommended):**\n```css\n:root {\n  --color-primary: #3b82f6;\n  --color-secondary: #6b7280;\n  --color-success: #10b981;\n  --color-error: #ef4444;\n  --color-warning: #f59e0b;\n  \n  --spacing-xs: 0.25rem;\n  --spacing-sm: 0.5rem;\n  --spacing-md: 1rem;\n  --spacing-lg: 1.5rem;\n  --spacing-xl: 2rem;\n  \n  --font-family-sans: ui-sans-serif, system-ui;\n  --font-family-mono: ui-monospace, monospace;\n}\n```\n\n**Theme Provider Pattern:**\n• Create a `ThemeProvider` component\n• Use React Context for theme values\n• Support light/dark mode switching\n• Allow custom theme overrides\n\n**Styling Approach:**\n• Use Tailwind CSS with CSS variables\n• Or use CSS-in-JS libraries like styled-components\n• Ensure components respect theme values\n\nWould you like me to show you a complete theme implementation example?",
        type: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 12), // 2 hours ago + 12 minutes
      },
      {
        id: "10",
        content: "Yes, please! A complete example would be fantastic.",
        type: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 15), // 2 hours ago + 15 minutes
      },
      {
        id: "11",
        content: "Here's a complete theme implementation:\n\n**1. Theme Types:**\n```typescript\ninterface Theme {\n  colors: {\n    primary: string\n    secondary: string\n    success: string\n    error: string\n    warning: string\n    background: string\n    surface: string\n    text: {\n      primary: string\n      secondary: string\n      disabled: string\n    }\n  }\n  spacing: {\n    xs: string\n    sm: string\n    md: string\n    lg: string\n    xl: string\n  }\n  typography: {\n    fontFamily: {\n      sans: string\n      mono: string\n    }\n    fontSize: {\n      xs: string\n      sm: string\n      md: string\n      lg: string\n      xl: string\n    }\n  }\n  borderRadius: {\n    sm: string\n    md: string\n    lg: string\n  }\n}\n```\n\n**2. Theme Provider:**\n```typescript\nconst ThemeContext = createContext<Theme | undefined>(undefined)\n\nexport const ThemeProvider: React.FC<{\n  theme: Theme\n  children: React.ReactNode\n}> = ({ theme, children }) => {\n  useEffect(() => {\n    // Apply CSS custom properties\n    Object.entries(theme.colors).forEach(([key, value]) => {\n      if (typeof value === 'string') {\n        document.documentElement.style.setProperty(`--color-${key}`, value)\n      } else {\n        Object.entries(value).forEach(([subKey, subValue]) => {\n          document.documentElement.style.setProperty(`--color-${key}-${subKey}`, subValue)\n        })\n      }\n    })\n  }, [theme])\n\n  return (\n    <ThemeContext.Provider value={theme}>\n      {children}\n    </ThemeContext.Provider>\n  )\n}\n```\n\n**3. Usage in Components:**\n```typescript\nconst Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {\n  const theme = useContext(ThemeContext)\n  \n  return (\n    <button\n      className={`\n        px-4 py-2 rounded-md font-medium transition-colors\n        ${variant === 'primary' ? 'bg-[var(--color-primary)] text-white' : ''}\n        ${variant === 'secondary' ? 'bg-[var(--color-secondary)] text-white' : ''}\n        hover:opacity-90 disabled:opacity-50\n      `}\n      {...props}\n    >\n      {children}\n    </button>\n  )\n}\n```\n\nThis approach gives you maximum flexibility while maintaining consistency!",
        type: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 18), // 2 hours ago + 18 minutes
      },
      {
        id: "12",
        content: "This is exactly what I needed! Now I'm curious about testing strategies. What's the best approach for testing a component library?",
        type: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 25), // 2 hours ago + 25 minutes
      },
      {
        id: "13",
        content: "Testing is crucial for component libraries! Here's a comprehensive testing strategy:\n\n**1. Unit Testing (Jest + React Testing Library):**\n• Test component behavior and props\n• Test accessibility features\n• Test theme integration\n• Mock external dependencies\n\n**2. Visual Regression Testing:**\n• Use Chromatic or Percy with Storybook\n• Catch visual bugs automatically\n• Test across different browsers\n• Compare screenshots on PRs\n\n**3. Integration Testing:**\n• Test components working together\n• Test theme provider integration\n• Test compound components\n\n**4. Accessibility Testing:**\n• Use @testing-library/jest-dom\n• Test keyboard navigation\n• Test screen reader compatibility\n• Use axe-core for a11y violations\n\n**Example Test:**\n```typescript\nimport { render, screen } from '@testing-library/react'\nimport { Button } from './Button'\n\ndescribe('Button', () => {\n  it('renders with correct variant styles', () => {\n    render(<Button variant=\"primary\">Click me</Button>)\n    const button = screen.getByRole('button')\n    expect(button).toHaveClass('bg-[var(--color-primary)]')\n  })\n  \n  it('is accessible', () => {\n    render(<Button>Click me</Button>)\n    const button = screen.getByRole('button')\n    expect(button).toBeInTheDocument()\n    expect(button).toHaveAccessibleName('Click me')\n  })\n})\n```\n\n**5. End-to-End Testing:**\n• Use Playwright or Cypress\n• Test real user scenarios\n• Test across different applications\n\nWould you like me to elaborate on any specific testing approach?",
        type: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 30), // 2 hours ago + 30 minutes
      },
      {
        id: "14",
        content: "The visual regression testing sounds interesting. Can you tell me more about setting up Chromatic with Storybook?",
        type: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 35), // 2 hours ago + 35 minutes
      },
      {
        id: "15",
        content: "Absolutely! Chromatic is fantastic for visual regression testing. Here's how to set it up:\n\n**1. Install Chromatic:**\n```bash\nnpm install --save-dev chromatic\n# or\npnpm add -D chromatic\n```\n\n**2. Configure package.json:**\n```json\n{\n  \"scripts\": {\n    \"chromatic\": \"chromatic --exit-zero-on-changes\"\n  }\n}\n```\n\n**3. Setup CI/CD (GitHub Actions example):**\n```yaml\nname: Visual Tests\non: [push, pull_request]\n\njobs:\n  visual-tests:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n        with:\n          fetch-depth: 0\n      - name: Install dependencies\n        run: pnpm install\n      - name: Run Chromatic\n        uses: chromaui/action@v1\n        with:\n          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}\n          buildScriptName: build-storybook\n```\n\n**4. Optimize Stories for Visual Testing:**\n```typescript\n// Add chromatic parameters to stories\nexport const Default: Story = {\n  args: { ... },\n  parameters: {\n    chromatic: {\n      viewports: [320, 768, 1200], // Test multiple viewports\n      delay: 300, // Wait for animations\n      diffThreshold: 0.1, // Sensitivity threshold\n    },\n  },\n}\n\n// Disable chromatic for stories that change frequently\nexport const WithRandomData: Story = {\n  parameters: {\n    chromatic: { disable: true },\n  },\n}\n```\n\n**5. Best Practices:**\n• Use consistent data in stories\n• Avoid random or time-based content\n• Test different states (loading, error, success)\n• Use pseudo-states for hover/focus testing\n• Set up proper baselines before major changes\n\n**Benefits:**\n• Catches visual bugs automatically\n• Reviews visual changes in PRs\n• Tests across different browsers\n• Maintains visual consistency\n• Integrates with your existing workflow\n\nThe setup is straightforward and the ROI is huge for component libraries!",
        type: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 40), // 2 hours ago + 40 minutes
      },
      {
        id: "16",
        content: "This has been incredibly helpful! One last question - what about documentation? I want to make sure our components are well-documented for other developers.",
        type: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 45), // 2 hours ago + 45 minutes
      },
      {
        id: "17",
        content: "Documentation is absolutely critical for component library adoption! Here's a comprehensive approach:\n\n**1. Storybook Documentation:**\n• Use MDX for rich documentation\n• Include component descriptions\n• Show usage examples\n• Document all props and their types\n\n**2. JSDoc Comments:**\n```typescript\n/**\n * A flexible button component that supports multiple variants and sizes.\n * \n * @example\n * ```tsx\n * <Button variant=\"primary\" size=\"large\" onClick={handleClick}>\n *   Click me\n * </Button>\n * ```\n */\nexport interface ButtonProps {\n  /** The visual style variant of the button */\n  variant?: 'primary' | 'secondary' | 'outline'\n  /** The size of the button */\n  size?: 'small' | 'medium' | 'large'\n  /** Whether the button is disabled */\n  disabled?: boolean\n  /** Click event handler */\n  onClick?: (event: MouseEvent<HTMLButtonElement>) => void\n  /** Button content */\n  children: React.ReactNode\n}\n```\n\n**3. README Documentation:**\n• Installation instructions\n• Quick start guide\n• Basic usage examples\n• Theming guide\n• Contributing guidelines\n\n**4. Interactive Examples:**\n• CodeSandbox or StackBlitz examples\n• Live playground in documentation\n• Real-world usage scenarios\n\n**5. Migration Guides:**\n• Version upgrade guides\n• Breaking changes documentation\n• Migration scripts when possible\n\n**6. Design System Documentation:**\n• Design tokens reference\n• Component specifications\n• Usage guidelines\n• Do's and don'ts\n\n**7. API Reference:**\n• Auto-generated from TypeScript\n• Use tools like TypeDoc\n• Include prop tables\n• Show default values\n\n**Documentation Structure:**\n```\ndocs/\n├── getting-started/\n│   ├── installation.md\n│   ├── quick-start.md\n│   └── theming.md\n├── components/\n│   ├── button.md\n│   ├── input.md\n│   └── modal.md\n├── guides/\n│   ├── migration.md\n│   ├── best-practices.md\n│   └── troubleshooting.md\n└── api/\n    └── reference.md\n```\n\n**Tools to Consider:**\n• Docusaurus for documentation site\n• Storybook Docs for component docs\n• TypeDoc for API documentation\n• Plop.js for component generation with docs\n\nGreat documentation is what separates good component libraries from great ones!",
        type: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 50), // 2 hours ago + 50 minutes
      },
      {
        id: "18",
        content: "Perfect! This gives me a complete roadmap for building our component library. Thank you for all the detailed explanations and examples!",
        type: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 55), // 2 hours ago + 55 minutes
      },
      {
        id: "19",
        content: "You're very welcome! I'm glad I could help you plan your component library architecture. You now have a solid foundation covering:\n\n✅ **Build system** (Vite + Turbo)\n✅ **API design** (consistent props and patterns)\n✅ **Theming** (CSS custom properties + Theme Provider)\n✅ **Testing** (unit, visual regression, accessibility)\n✅ **Documentation** (Storybook + comprehensive guides)\n\n**Next Steps:**\n1. Start with a few core components (Button, Input, Modal)\n2. Set up your build and testing pipeline\n3. Create your first Storybook stories\n4. Implement the theme system\n5. Add Chromatic for visual testing\n6. Document everything as you go\n\nFeel free to ask if you run into any specific challenges during implementation. Good luck with your component library – it sounds like it's going to be fantastic! 🚀",
        type: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 57), // 2 hours ago + 57 minutes
      },
      {
        id: "20",
        content: "One quick follow-up - do you have any recommendations for versioning and releasing the component library?",
        type: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
      {
        id: "21",
        content: "Great question! Versioning and releasing are crucial for component libraries. Here's my recommended approach:\n\n**Semantic Versioning (SemVer):**\n• **MAJOR** (1.0.0 → 2.0.0): Breaking changes\n• **MINOR** (1.0.0 → 1.1.0): New features, backward compatible\n• **PATCH** (1.0.0 → 1.0.1): Bug fixes, backward compatible\n\n**Release Tools:**\n• **Changesets** (highly recommended for monorepos)\n• **Semantic Release** (automated based on commit messages)\n• **Release Please** (Google's release automation)\n\n**Changesets Setup:**\n```bash\nnpm install --save-dev @changesets/cli\nnpx changeset init\n```\n\n**Workflow:**\n1. Developer adds changeset: `npx changeset`\n2. Describes changes and impact\n3. CI runs tests and builds\n4. Changesets creates release PR\n5. Merge triggers automated release\n\n**Release Strategy:**\n• Use **alpha/beta** releases for testing\n• Maintain **LTS versions** for stability\n• Provide **migration guides** for breaking changes\n• Use **feature flags** for gradual rollouts\n\n**Example Release Process:**\n```json\n{\n  \"scripts\": {\n    \"changeset\": \"changeset\",\n    \"version\": \"changeset version\",\n    \"release\": \"changeset publish\",\n    \"release:alpha\": \"changeset publish --tag alpha\"\n  }\n}\n```\n\n**Best Practices:**\n• Always test releases in staging first\n• Keep detailed changelogs\n• Use conventional commits\n• Automate as much as possible\n• Communicate breaking changes clearly\n\nThis approach ensures smooth releases and happy consumers! 📦",
        type: "ai",
        timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      },
      {
        id: "22",
        content: "Excellent! I think I have everything I need to get started. This conversation has been incredibly valuable.",
        type: "user",
        timestamp: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
      },
      {
        id: "23",
        content: "I'm thrilled I could help! You're now equipped with a comprehensive strategy for building a world-class component library. Remember, start small, iterate often, and always prioritize developer experience.\n\nHere's a quick summary of your tech stack:\n• **Build**: Vite + Turbo\n• **Testing**: Jest + RTL + Chromatic\n• **Docs**: Storybook + Docusaurus\n• **Theming**: CSS Custom Properties\n• **Releases**: Changesets\n\nBest of luck with your component library journey! Feel free to reach out anytime you need guidance on implementation details. Happy coding! 🎉",
        type: "ai",
        timestamp: new Date(Date.now() - 1000 * 60), // 1 minute ago
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the chat interface with an extensive conversation history, showing how the interface handles long conversations with technical discussions, code examples, and detailed explanations.',
      },
    },
  },
}
