import type { Meta, StoryObj } from "@storybook/react"
import { Hero } from "./HeroCard"

/**
 * The Hero component is used for creating prominent header sections with a title, subtitle, and optional badge.
 * It features a gradient background and decorative elements.
 */
const meta: Meta<typeof Hero> = {
  title: "Reusable Blocks/HeroCard",
  component: Hero,
  parameters: {
    layout: "fullscreen",
    componentSubtitle: "A hero section component for landing pages and key content areas",
    docs: {
      description: {
        component:
          "The Hero component creates a visually striking header section with customizable content and styling.",
      },
    },
    // Add viewport configurations for responsive previews
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: {
            width: "375px",
            height: "667px",
          },
        },
        tablet: {
          name: "Tablet",
          styles: {
            width: "768px",
            height: "1024px",
          },
        },
        desktop: {
          name: "Desktop",
          styles: {
            width: "1440px",
            height: "900px",
          },
        },
      },
      defaultViewport: "desktop",
    },
    // Add backgrounds for better preview
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f8fafc" },
        { name: "dark", value: "#1e293b" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    badge: {
      control: "text",
      description: "Optional badge text displayed above the title",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Manifesto" },
      },
    },
    title: {
      control: "text",
      description: "Main heading text",
      table: {
        type: { summary: "string" },
      },
    },
    subtitle: {
      control: "text",
      description: "Supporting text displayed below the title",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the component",
      table: {
        type: { summary: "string" },
      },
    },
  },
  // Add decorators for better preview
//   decorators: [
//     (Story) => (
//       <div className="p-4">
//         <Story />
//       </div>
//     ),
//   ],
}

export default meta

type Story = StoryObj<typeof Hero>

/**
 * The default hero section with standard content and styling.
 */
export const Default: Story = {
  args: {
    title: 'Lorem ipsum dolor sit amet',
    subtitle: 'Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    badge: 'Placeholder Badge',
  },
}

/**
 * Hero section without a badge component.
 */
export const NoBadge: Story = {
  args: {
    title: 'Lorem ipsum dolor sit amet',
    subtitle: 'Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
}

/**
 * Hero section with custom marketing content.
 */
export const Marketing: Story = {
  args: {
    badge: "New Release",
    title: "Transform your business with AI",
    subtitle: "Leverage the power of artificial intelligence to drive growth and innovation across your organization.",
  },
}

/**
 * Hero section with custom styling applied.
 */
export const CustomStyling: Story = {
  args: {
    badge: "Custom",
    title: "Styled Hero Component",
    subtitle: "A hero section with custom styling applied through className.",
    className: "from-blue-600 to-blue-950",
  },
}

// Add a new story for mobile preview
export const MobileView: Story = {
  ...Default,
  parameters: {
    viewport: {
      defaultViewport: "mobile",
    },
  },
}

