# Enhanced Colleague Management

This update adds enhanced functionality for adding colleagues to the ColleaguesView component. Instead of only allowing manual form creation, users can now:

## New Features

### 1. User Selection for Human Colleagues
- Browse existing users in the organization
- Search and filter by name, email, role, or skills
- Filter by department
- Select users to automatically import their details as human colleagues

### 2. Digital Colleague Cloning
- Browse existing digital colleagues
- Clone digital colleagues with all their capabilities, knowledge, and configurations
- Automatically creates a copy with a new ID and updated metadata

### 3. Streamlined Addition Flow
- Type selection (Human vs Digital)
- For humans: User selection → automatic colleague creation
- For digital: Choice between cloning existing or creating new → respective flows

## Components

### `UserSelection`
Provides a searchable, filterable interface for selecting existing users to add as colleagues.

**Props:**
- `users: User[]` - Array of available users
- `onUserSelect: (user: User) => void` - Callback when user is selected
- `onCancel: () => void` - Callback to cancel selection
- `departments?: string[]` - Available departments for filtering
- `selectedUserId?: string` - Currently selected user ID

### `DigitalColleagueClone`
Allows users to browse and clone existing digital colleagues.

**Props:**
- `digitalColleagues: DigitalColleague[]` - Array of existing digital colleagues
- `onColleagueClone: (colleague: DigitalColleague) => void` - Callback when colleague is cloned
- `onCancel: () => void` - Callback to cancel cloning
- `selectedColleagueId?: string` - Currently selected colleague ID

### `ColleagueTypeSelection`
Initial selection screen for choosing between human and digital colleague addition.

**Props:**
- `onSelectHuman: () => void` - Callback for human selection
- `onSelectDigital: () => void` - Callback for digital selection
- `onCancel: () => void` - Callback to cancel

### `DigitalColleagueOptions`
Choice screen for digital colleagues between cloning and creating new.

**Props:**
- `onCloneExisting: () => void` - Callback for cloning flow
- `onCreateNew: () => void` - Callback for new creation flow
- `onCancel: () => void` - Callback to cancel

## Updated ColleaguesView Props

The main `ColleaguesView` component now accepts additional props:

```typescript
interface ColleaguesViewProps {
  // ... existing props
  availableUsers?: User[]  // Users available for selection
  existingDigitalColleagues?: DigitalColleague[]  // Digital colleagues available for cloning
}
```

## User Type Definition

```typescript
interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  avatar?: string
  skills?: string[]
  location?: string
  phone?: string
  timezone?: string
  bio?: string
}
```

## Usage Example

```tsx
import ColleaguesView from './ColleaguesView'
import { mockUsers, mockDigitalColleagues } from './mock-data'

function App() {
  return (
    <ColleaguesView
      initialColleagues={colleagues}
      availableUsers={mockUsers}
      existingDigitalColleagues={mockDigitalColleagues}
      onColleagueAdd={(colleague) => console.log('Added:', colleague)}
      onColleagueEdit={(colleague) => console.log('Edited:', colleague)}
      onColleagueDelete={(id) => console.log('Deleted:', id)}
    />
  )
}
```

## Features

- **Responsive Design**: All components work well on mobile and desktop
- **Search & Filter**: Comprehensive search and filtering capabilities
- **Animations**: Smooth transitions using Framer Motion
- **Accessibility**: Proper keyboard navigation and screen reader support
- **Type Safety**: Full TypeScript support with proper type definitions
