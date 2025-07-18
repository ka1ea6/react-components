import type { Meta, StoryObj } from "@storybook/react"
import TeamsIndexView from "../DigitalColleagues/Views/TeamsIndexView"
import { TeamCard } from "./team-card"
import { mockTeamSummary } from "../DigitalColleagues/test-data"

const meta: Meta<typeof TeamsIndexView> = {
  title: "Projects/Complete Example",
  component: TeamsIndexView,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Teams Management System

This is a complete example of the Teams management system that includes:

## Features
- **Team Overview**: Display all teams the user is part of
- **Team Cards**: Individual cards showing team details
- **Statistics**: Human colleagues, digital colleagues, and project counts
- **Actions**: View team details
- **Responsive Design**: Works on all screen sizes
- **Animations**: Smooth transitions and hover effects

## Components Used
- \`TeamsIndexView\`: Main container component
- \`TeamCard\`: Individual team display component
- \`HeroSection\`: Header with call-to-action
- \`Dialog\`: Modal for team creation (placeholder)

## Data Structure
Each team includes:
- Basic information (name, description)
- Colleague counts (human and digital)
- Project count

## Usage Example
\`\`\`tsx
<TeamsIndexView
  teams={teams}
  onTeamOpen={(team) => navigate(\`/teams/\${team.id}\`)}
  onCreateTeam={() => openCreateDialog()}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    onCreateTeam: { action: "create-team" },
    onTeamOpen: { action: "team-open" },
  },
}

export default meta
type Story = StoryObj<typeof TeamsIndexView>

export const FullExample: Story = {
  args: {
    teams: mockTeamSummary,
  },
  parameters: {
    docs: {
      description: {
        story: "Complete teams management interface with all sample data loaded.",
      },
    },
  },
}

export const EmptyState: Story = {
  args: {
    teams: [],
  },
  parameters: {
    docs: {
      description: {
        story: "What users see when they haven't joined any teams yet.",
      },
    },
  },
}

export const SingleTeam: Story = {
  args: {
    teams: [mockTeamSummary[0]],
  },
  parameters: {
    docs: {
      description: {
        story: "Display when user is part of only one team.",
      },
    },
  },
}

// Individual Team Card Examples
export const TeamCardExamples: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Team Card Variations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockTeamSummary.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onOpen={(team) => console.log("Open team:", team.name)}
            />
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Individual team cards showing different team types and sizes.",
      },
    },
  },
}
