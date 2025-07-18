import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './switch'

/**
 * A customizable toggle switch component with animated transitions and press states.
 * Built on top of Radix UI Switch primitive with smooth animations and visual feedback.
 */
const meta = {
  title: 'Advanced Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
    onCheckedChange: {
      action: 'checked changed',
    },
  },
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default switch component with animated transitions.
 */
export const Default: Story = {}

/**
 * A switch that starts in the checked state.
 */
export const Checked: Story = {
  args: {
    checked: true,
  },
}

/**
 * A disabled switch that cannot be interacted with.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

/**
 * A disabled switch in the checked state.
 */
export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
}

/**
 * Multiple switches with different states to show variations.
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Switch />
        <span className="text-sm">Unchecked</span>
      </div>
      <div className="flex items-center gap-2">
        <Switch checked />
        <span className="text-sm">Checked</span>
      </div>
      <div className="flex items-center gap-2">
        <Switch disabled />
        <span className="text-sm">Disabled</span>
      </div>
      <div className="flex items-center gap-2">
        <Switch disabled checked />
        <span className="text-sm">Disabled & Checked</span>
      </div>
    </div>
  ),
}

/**
 * Interactive example with controlled state and callback handling.
 */
export const Interactive: Story = {
  render: () => {
    const handleCheckedChange = (checked: boolean) => {
      console.log('Switch toggled:', checked)
    }

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Switch onCheckedChange={handleCheckedChange} />
          <span className="text-sm">
            Toggle me and check the console for events
          </span>
        </div>
      </div>
    )
  },
}

/**
 * Showcase of the press interaction states and animations.
 */
export const PressStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="text-sm text-muted-foreground">
        Try pressing and holding the switches to see the press animations
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Switch />
          <span className="text-sm">Press and hold to see animation</span>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked />
          <span className="text-sm">Press and hold when checked</span>
        </div>
      </div>
    </div>
  ),
}

/**
 * Form integration example with labels and descriptions.
 */
export const FormIntegration: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Email Notifications</label>
            <p className="text-xs text-muted-foreground">
              Receive email notifications about your account activity
            </p>
          </div>
          <Switch />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Marketing Emails</label>
            <p className="text-xs text-muted-foreground">
              Receive emails about new products and features
            </p>
          </div>
          <Switch checked />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium opacity-50">
              Security Alerts (Required)
            </label>
            <p className="text-xs text-muted-foreground opacity-50">
              Important security notifications cannot be disabled
            </p>
          </div>
          <Switch checked disabled />
        </div>
      </div>
    </div>
  ),
}
