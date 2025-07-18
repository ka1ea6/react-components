# AI Chat Interface with Capabilities System

A flexible and extensible capability system for AI chat interfaces that allows users to navigate through hierarchical data structures and perform context-aware actions.

## Features

- **Hierarchical Navigation**: Navigate through nested data structures (categories → lists → items)
- **Context-Aware Actions**: Actions change based on the current selection and context
- **Flexible Data Model**: Support for different data types and structures
- **Compact UI**: Minimal, card-based interface that fits within chat streams
- **Extensible**: Easy to add new capabilities and data sources

## Components

### Core Components

- **`AIChatInterface`**: Main chat interface with integrated capability menu
- **`CapabilityMenu`**: The main capability navigation component
- **`CapabilityCard`**: Individual capability cards with icons and descriptions
- **`CapabilityDataList`**: List view for displaying data items
- **`ContextActions`**: Dynamic action buttons based on current context

### Configuration

- **`capabilities-config.ts`**: Data structure and sample capabilities
- **`icon-mapper.tsx`**: Icon mapping utility for consistent iconography

## Usage

### Basic Integration

```tsx
import { AIChatInterface } from "./ai-chat-interface"
import { capabilities } from "./capabilities-config"

function MyChat() {
  return (
    <AIChatInterface
      messages={messages}
      input={input}
      selectedTeam={businessUnit}
      onInputChange={setInput}
      onSendMessage={handleSendMessage}
      // ... other props
    />
  )
}
```

### Creating Custom Capabilities

```typescript
const myCapabilities: Capability[] = [
  {
    id: "custom-category",
    name: "Custom Category",
    description: "My custom capability",
    iconName: "Package",
    color: "bg-blue-600",
    type: "category",
    actions: [
      {
        id: "custom-action",
        label: "Custom Action",
        iconName: "Zap",
        action: (context) => {
          // Handle action with context
          console.log("Context:", context)
        }
      }
    ],
    children: [
      {
        id: "custom-list",
        name: "Custom List",
        iconName: "List",
        color: "bg-green-500",
        type: "list",
        data: [
          {
            id: "item-1",
            title: "Item 1",
            subtitle: "Description",
            value: "Value",
            metadata: { key: "value" }
          }
        ]
      }
    ]
  }
]
```

## Data Structure

### Capability Types

- **`category`**: Top-level grouping with child capabilities
- **`list`**: Collection of data items that can be browsed
- **`item`**: Individual data item (for future extension)

### Context Object

The context object provides information about the current navigation state:

```typescript
interface CapabilityContext {
  path: Capability[]        // Current navigation path
  selectedItems: any[]      // Selected items for filtering
  filters: Record<string, any> // Additional filters
}
```

## Extending the System

### Adding New Capability Types

1. Extend the `Capability` interface in `capabilities-config.ts`
2. Add new type to the `type` union
3. Update the `CapabilityMenu` component to handle the new type
4. Create specific components for the new type if needed

### Adding New Icons

1. Import the icon from `lucide-react` in `icon-mapper.tsx`
2. Add it to the `iconMap` object
3. Update the `IconName` type
4. Use the icon name string in your capability configuration

### Dynamic Data Loading

Use the `fetchData` function to load data dynamically:

```typescript
{
  id: "dynamic-list",
  name: "Dynamic Data",
  type: "list",
  fetchData: async (context) => {
    const response = await fetch(`/api/data?filter=${context.filters.category}`)
    return response.json()
  }
}
```

## Navigation Flow

1. **Start**: User clicks "Capabilities" button
2. **Category Selection**: User selects a top-level category (e.g., "Sales")
3. **Subcategory/List**: User navigates to subcategories (e.g., "Customers")
4. **Data View**: User sees list of items with contextual actions
5. **Actions**: User performs actions based on current context
6. **Filtering**: Selected items become filters for subsequent actions

## Examples

### Sales Pipeline

```
Sales (category)
├── Customers (list)
│   ├── Acme Corp ($125K ARR)
│   ├── Beta Inc ($45K ARR)
│   └── Gamma Ltd ($12K ARR)
├── Opportunities (list)
│   ├── Enterprise License ($50K)
│   └── Platform Upgrade ($25K)
└── Actions: [View Pipeline, Create Opportunity]
```

### Marketing Campaigns

```
Marketing (category)
├── Campaigns (list)
│   ├── Q1 Product Launch (85% CTR)
│   └── Webinar Series (1,250 attendees)
└── Actions: [View Campaigns, Create Campaign]
```

## Best Practices

1. **Keep Cards Compact**: Use minimal text and clear icons
2. **Meaningful Actions**: Provide actions that make sense in context
3. **Clear Navigation**: Use breadcrumbs and back buttons
4. **Consistent Iconography**: Use the icon mapper for consistency
5. **Performance**: Use dynamic loading for large datasets
6. **Context Awareness**: Make actions relevant to current selection

## Future Enhancements

- Search within capabilities
- Keyboard navigation
- Bulk actions on selected items
- Custom card templates
- Drag and drop support
- Export capabilities
- Real-time data updates
