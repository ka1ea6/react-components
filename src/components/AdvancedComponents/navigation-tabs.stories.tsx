import type { Meta, StoryObj } from '@storybook/react'
import { NavigationTabs } from './navigation-tabs'

const meta: Meta<typeof NavigationTabs> = {
  title: 'AdvancedComponents/NavigationTabs',
  component: NavigationTabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    activeTab: {
      control: { type: 'select' },
      options: ['home', 'chat', 'projects', 'colleagues', 'knowledge', 'files'],
    },
    maxWidth: {
      control: { type: 'text' },
    },
    gridCols: {
      control: { type: 'number', min: 1, max: 10 },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const defaultTabOptions = [
  { value: "home", label: "Home" },
  { value: "chat", label: "Chat" },
  { value: "projects", label: "Projects" },
  { value: "colleagues", label: "Colleagues" },
  { value: "knowledge", label: "Knowledge" },
  { value: "files", label: "Files" },
]

export const Default: Story = {
  args: {
    activeTab: 'home',
    tabOptions: defaultTabOptions,
    onTabChange: (tab: string) => console.log('Tab changed to:', tab),
  },
}

export const FewTabs: Story = {
  args: {
    activeTab: 'overview',
    tabOptions: [
      { value: "overview", label: "Overview" },
      { value: "details", label: "Details" },
      { value: "settings", label: "Settings" },
    ],
    gridCols: 3,
    maxWidth: "400px",
    onTabChange: (tab: string) => console.log('Tab changed to:', tab),
  },
}

export const ManyTabs: Story = {
  args: {
    activeTab: 'tab1',
    tabOptions: [
      { value: "tab1", label: "Tab 1" },
      { value: "tab2", label: "Tab 2" },
      { value: "tab3", label: "Tab 3" },
      { value: "tab4", label: "Tab 4" },
      { value: "tab5", label: "Tab 5" },
      { value: "tab6", label: "Tab 6" },
      { value: "tab7", label: "Tab 7" },
      { value: "tab8", label: "Tab 8" },
    ],
    gridCols: 8,
    maxWidth: "900px",
    onTabChange: (tab: string) => console.log('Tab changed to:', tab),
  },
}

export const CustomStyling: Story = {
  args: {
    activeTab: 'dashboard',
    tabOptions: [
      { value: "dashboard", label: "Dashboard" },
      { value: "analytics", label: "Analytics" },
      { value: "reports", label: "Reports" },
      { value: "users", label: "Users" },
    ],
    gridCols: 4,
    maxWidth: "500px",
    className: "bg-muted/50 p-4 rounded-lg",
    onTabChange: (tab: string) => console.log('Tab changed to:', tab),
  },
}
