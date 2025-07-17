# NavigationTabs Component

A reusable navigation tabs component that provides both desktop tabs and mobile dropdown functionality with smooth animations.

## Features

- **Responsive Design**: Shows tabs on desktop and a dropdown on mobile
- **Smooth Animations**: Uses Framer Motion for polished interactions
- **Customizable**: Configurable grid columns, max width, and styling
- **Accessible**: Built with Radix UI components for accessibility
- **TypeScript Support**: Full TypeScript support with proper interfaces

## Usage

### Basic Usage

```tsx
import { NavigationTabs, type TabOption } from './navigation-tabs'

const tabOptions: TabOption[] = [
  { value: "home", label: "Home" },
  { value: "chat", label: "Chat" },
  { value: "projects", label: "Projects" },
]

function MyComponent() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <NavigationTabs
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabOptions={tabOptions}
    />
  )
}
```

### Advanced Usage

```tsx
<NavigationTabs
  activeTab={activeTab}
  onTabChange={handleTabChange}
  tabOptions={customTabs}
  maxWidth="800px"
  gridCols={5}
  className="bg-muted/50 p-4 rounded-lg"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `activeTab` | `string` | - | The currently active tab value |
| `onTabChange` | `(tab: string) => void` | - | Callback when tab changes |
| `tabOptions` | `TabOption[]` | - | Array of tab options |
| `className` | `string` | `""` | Additional CSS classes |
| `maxWidth` | `string` | `"700px"` | Maximum width for desktop tabs |
| `gridCols` | `number` | `6` | Number of grid columns for desktop tabs |

## TabOption Interface

```tsx
interface TabOption {
  value: string  // Unique identifier for the tab
  label: string  // Display text for the tab
}
```

## Responsive Behavior

- **Desktop (md+)**: Displays as horizontal tabs with hover animations
- **Mobile**: Shows as a dropdown menu with the current selection

## Animation Features

- **Entry Animation**: Tabs fade in from top with smooth transition
- **Hover Effects**: Scale animations on tab hover
- **Tap Effects**: Scale-down animation on tab press
- **Spring Physics**: Natural feeling animations with spring physics

## Integration with AppHeader

The NavigationTabs component was extracted from the AppHeader component and can be used independently. To use it in AppHeader:

```tsx
<AppHeader
  title="My App"
  activeTab={activeTab}
  onTabChange={setActiveTab}
  showTabs={true}
  tabOptions={customTabOptions} // Optional, uses defaults if not provided
/>
```

## Styling

The component uses Tailwind CSS classes and follows the design system's color scheme. It automatically adapts to light/dark themes through CSS variables.

## Dependencies

- Framer Motion (for animations)
- Radix UI (for accessible components)
- Lucide React (for icons)
- Tailwind CSS (for styling)
