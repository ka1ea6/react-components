# Teams Components

This module provides components for managing and displaying team information in a similar style to the ProjectsIndexView.

## Components

### TeamsIndexView

The main view component that displays a list of teams the user is part of.

**Props:**
- `teams?: TeamSummary[]` - Array of team summaries to display
- `onCreateTeam?: () => void` - Callback for creating a new team
- `onTeamOpen?: (team: TeamSummary) => void` - Callback when a team is opened

**Features:**
- Hero section with create team action
- Grid layout of team cards
- Empty state when no teams exist
- Animated transitions
- Responsive design

### TeamCard

Individual team card component that displays team information.

**Props:**
- `team: TeamSummary` - Team data to display
- `onOpen?: (team: TeamSummary) => void` - Callback when team is opened
- `className?: string` - Additional CSS classes

**Features:**
- Displays team name and description
- Shows human and digital colleague counts
- Shows project count
- Hover animations
- Single action button (View Team)

## Data Types

### TeamSummary

```typescript
interface TeamSummary {
  id: string
  name: string
  description: string
  humanColleagues: number
  digitalColleagues: number
  projects: number
}
```

## Usage

```tsx
import { TeamsIndexView, TeamCard } from '@/components/dc-temp'
import { mockTeamSummary } from '@/components/DigitalColleagues/test-data'

function MyTeamsPage() {
  const handleTeamOpen = (team: TeamSummary) => {
    // Navigate to team details
  }

  const handleCreateTeam = () => {
    // Open team creation dialog
  }

  return (
    <TeamsIndexView
      teams={mockTeamSummary}
      onTeamOpen={handleTeamOpen}
      onCreateTeam={handleCreateTeam}
    />
  )
}
```

## Styling

The components use:
- Tailwind CSS for styling
- Framer Motion for animations
- Custom UI components from the design system
- Responsive grid layouts
- Hover effects and transitions

## Mock Data

Mock data is available in `@/components/DigitalColleagues/test-data`:
- `mockTeamSummary`: Array of sample team data for development and testing
