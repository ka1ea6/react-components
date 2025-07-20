# CopilotInterface with Built-in AI Integration

## Overview

The `CopilotInterface` component now has AI functionality built-in by default, powered by the Vercel AI SDK. It automatically handles AI conversations while maintaining full flexibility for customization and testing.

## Key Features

### 1. AI by Default
- AI functionality is enabled by default
- No complex setup required
- Just provide AI configuration if needed

### 2. Flexible Configuration
- `aiConfig` - Configure the AI behavior
- `enableAI` - Toggle AI on/off
- `useCustomChat` - Override with your own chat instance

### 3. Backward Compatible
- Works with static messages when AI is disabled
- Perfect for development and testing

## Usage Examples

### 1. Simplest Usage (AI Enabled by Default)

```tsx
<CopilotInterface
  businessUnits={businessUnits}
  capabilities={capabilities}
  // ... other props
  // AI is automatically enabled!
/>
```

### 2. With Custom AI Configuration

```tsx
<CopilotInterface
  aiConfig={{
    onError: (error) => console.error('AI Error:', error),
    // Add other useChat options here
  }}
  businessUnits={businessUnits}
  capabilities={capabilities}
  // ... other props
/>
```

### 3. Disable AI for Testing/Demo

```tsx
<CopilotInterface
  enableAI={false}
  messages={staticDemoMessages}
  businessUnits={businessUnits}
  capabilities={capabilities}
  // ... other props
/>
```

### 4. Advanced: Custom Chat Management

```tsx
function MyComponent() {
  const customChat = useChat({
    // Your custom configuration
    onError: (error) => console.error('Custom error:', error),
  })

  return (
    <CopilotInterface
      useCustomChat={customChat}
      businessUnits={businessUnits}
      capabilities={capabilities}
      // ... other props
    />
  )
}
```

### 5. Focused Chat Experience (Sidebar Initially Closed)

```tsx
<CopilotInterface
  sidebarInitiallyClosed={true}
  businessUnits={businessUnits}
  capabilities={capabilities}
  // ... other props
  // Perfect for maximizing chat area or mobile-first experiences
/>
```

## Props Reference

```tsx
interface CopilotInterfaceProps {
  // AI Integration
  aiConfig?: Parameters<typeof useChat>[0]  // AI configuration options
  useCustomChat?: ReturnType<typeof useChat> // Override with custom chat instance
  enableAI?: boolean                         // Enable/disable AI (default: true)
  
  // Fallback for when AI is disabled
  messages?: UIMessage[]
  
  // Layout customization
  sidebarInitiallyClosed?: boolean           // Start with sidebar closed (default: false)
  
  // ... all other existing props
}
```

## Architecture Benefits

### Why Built-in vs Props?

**✅ Built-in Approach (Current):**
- **Simpler API**: Just works out of the box
- **Better DX**: Less setup, more intuitive
- **Flexible**: Still allows customization when needed
- **Testable**: Can easily disable for testing

**❌ Props Approach (Previous):**
- More complex API
- Required wrapping hooks in functions
- More setup required for basic usage

## Migration from Previous Version

**Before:**
```tsx
const createUseChat = () => useChat({ /* config */ })

<CopilotInterface useChat={createUseChat} {...props} />
```

**After:**
```tsx
<CopilotInterface aiConfig={{ /* config */ }} {...props} />
```

## Files Modified

1. **`CopilotInterface.tsx`** - Built-in AI integration
2. **`CopilotInterface.stories.tsx`** - Updated stories
3. **`example-with-vercel-ai.tsx`** - Multiple usage patterns
4. **`README-AI-Integration.md`** - Updated documentation

## Storybook Stories

- **Default**: Traditional usage (AI enabled by default)
- **With AI Integration**: Shows AI configuration
- **AI Disabled**: Demo mode with static messages
- All team-focused stories work as before
