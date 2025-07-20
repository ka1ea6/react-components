# Sidebar Component with Per-Item Favorites Management

## Overview

The Sidebar component has been enhanced with per-item favorites management functionality, allowing individual sidebar sections to limit their displayed items and let users choose favorites for each section.

## Features

### Basic Features
- Responsive sidebar with mobile support
- Collapsible/expandable sections
- Badge support for notifications
- Active state indication
- Business unit switching
- Search functionality

### New: Per-Item Favorites Management
- **Per-Section Limits**: Each `SidebarItem` can have its own `maxItems` limit
- **Independent Favorites**: Users manage favorites separately for each section
- **Visual Management**: Each limited section shows item counts and "Manage" button
- **Persistent Storage**: Favorites stored per-section using `localStorage`
- **Priority Display**: Favorite items always appear first within each section

## Usage

### Basic Usage
```tsx
import { Sidebar } from "@/components/DigitalColleagues/sidebar"

<Sidebar
  items={sidebarItems}
  isOpen={true}
/>
```

### With Per-Item Limits
```tsx
const sidebarItems = [
  {
    id: "teams",
    title: "Teams",
    icon: <Users />,
    maxItems: 3, // Only show 3 teams, allow favorites selection
    items: [
      { id: "design", title: "Design", url: "#" },
      { id: "marketing", title: "Marketing", url: "#" },
      { id: "engineering", title: "Engineering", url: "#" },
      { id: "finance", title: "Finance", url: "#" },
      { id: "sales", title: "Sales", url: "#" },
    ]
  }
]

<Sidebar
  items={sidebarItems}
  isOpen={true}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `SidebarItem[]` | Required | Array of sidebar items to display |
| `isOpen` | `boolean` | Required | Whether the sidebar is open |
| `isMobile` | `boolean` | `false` | Whether to use mobile layout |
| `onClose` | `() => void` | `undefined` | Callback when sidebar is closed (mobile) |
| `currentBusinessUnit` | `BusinessUnit` | First unit | Currently selected business unit |
| `onBusinessUnitChange` | `(unit: BusinessUnit) => void` | `undefined` | Callback when business unit changes |
| `className` | `string` | `undefined` | Additional CSS classes |
| `logo` | `string` | `"/headerlogo.png"` | Logo image URL |
| `appName` | `string` | `"Nuvia"` | Application name |
| `tagline` | `string` | `"Collaboration Platform"` | Application tagline |

## Types

### SidebarItem
```typescript
interface SidebarItem {
  id: string                    // Required for favorites functionality
  title: string
  icon: React.ReactNode
  isActive?: boolean
  badge?: string
  url?: string
  maxItems?: number            // NEW: Limit subitems shown, enables favorites
  items?: {
    id: string                  // Required for subitems too
    title: string
    url: string
    badge?: string
  }[]
}
```

## Behavior

### Without maxItems on a Section
- All subitems are displayed normally
- No favorites functionality for that section
- Standard collapsible behavior

### With maxItems on a Section
1. **Subitems ≤ maxItems**: All subitems shown, no management needed
2. **Subitems > maxItems**: 
   - Favorite subitems appear first
   - Non-favorite subitems fill remaining slots
   - Clickable "X more items available - click to manage favorites" text shown when section is expanded
   - Click the text to open favorites management dialog

### Per-Section Favorites Management Dialog
- **Section-Specific**: Each section manages its own favorites independently
- **Easy Access**: Click "X more items available" text to open management
- **Checkbox Interface**: Simple checkboxes for subitems in that section
- **Visual Feedback**: Badges shown for context  
- **Limit Enforcement**: Cannot select more than section's maxItems
- **Immediate Updates**: Changes reflect immediately in sidebar
- **Persistent Storage**: Preferences saved per-section to localStorage

### Local Storage
- Key: `sidebar-favorites`
- Value: Object with section IDs as keys, arrays of favorite subitem IDs as values
- Example: `{"teams": ["design", "marketing"], "projects": ["active-projects"]}`
- Automatically syncs across browser sessions
- Falls back gracefully if localStorage unavailable

## Examples

### Example 1: Teams with Limited Display
```tsx
const teamsWithLimit = {
  id: "teams",
  title: "Teams", 
  icon: <Users />,
  maxItems: 2, // Show only 2 teams at a time
  items: [
    { id: "design", title: "Design", url: "/teams/design" },
    { id: "marketing", title: "Marketing", url: "/teams/marketing" },
    { id: "engineering", title: "Engineering", url: "/teams/engineering" },
    { id: "finance", title: "Finance", url: "/teams/finance" },
    { id: "sales", title: "Sales", url: "/teams/sales" },
  ]
}
```

### Example 2: Multiple Sections with Different Limits
```tsx
const sidebarItems = [
  {
    id: "teams",
    title: "Teams",
    icon: <Users />,
    maxItems: 3,
    items: [/* 5 teams */]
  },
  {
    id: "projects", 
    title: "Projects",
    icon: <Layers />,
    maxItems: 2,
    items: [/* 4 projects */]
  },
  {
    id: "tools",
    title: "Tools",
    icon: <Wrench />,
    // No maxItems = show all tools
    items: [/* all tools shown */]
  }
]
```

## Implementation Details

### State Management
- Uses `useLocalStorage` hook with object structure for per-section favorites
- Internal state for dialog visibility (tracks which section is being managed)
- Automatic filtering and sorting of subitems per section

### Visual Indicators
- Clickable "X more items available - click to manage favorites" text appears when sections are expanded and have hidden items
- No visual changes for unlimited sections or sections showing all items
- Clean section titles without item counts

### Performance
- Efficient per-section filtering algorithms
- Minimal re-renders when toggling favorites
- Local storage operations are section-scoped

### Accessibility
- Proper ARIA labels and roles for section-specific dialogs
- Keyboard navigation support
- Screen reader friendly section descriptions
- Focus management in per-section dialogs

## Migration Guide

### From Previous Version
1. **Add IDs**: Ensure all `SidebarItem` and subitem objects have unique `id` fields
2. **Add maxItems**: Add `maxItems?: number` to sections that need limits
3. **Update Storage**: Old global favorites will be ignored; users will need to reset preferences

### Breaking Changes
- `SidebarItem.id` is now required (was optional/missing)
- Subitem objects now require `id` field
- Global sidebar `maxItems` prop removed
- Favorites storage format changed from array to object

### Example Migration
```typescript
// Before (global limit)
<Sidebar items={items} maxItems={5} />

// After (per-section limits)
const items = [
  {
    id: "teams",
    title: "Teams", 
    maxItems: 3, // Section-specific limit
    items: [
      { id: "design", title: "Design", url: "#" }, // IDs required
      // ...
    ]
  }
]
<Sidebar items={items} />
```
