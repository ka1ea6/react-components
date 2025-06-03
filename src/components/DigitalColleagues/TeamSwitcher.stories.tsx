
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TeamSwitcher } from './TeamSwitcher';

const meta: Meta<typeof TeamSwitcher> = {
  title: 'Digital Colleagues/TeamSwitcher',
  component: TeamSwitcher,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    currentTeam: {
      control: 'object',
      description: 'Currently selected team',
    },
    teams: {
      control: 'object',
      description: 'Array of available teams',
    },
    onTeamChange: {
      action: 'team changed',
      description: 'Function called when team is changed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TeamSwitcher>;

const mockTeams = [
  { 
    id: '1', 
    name: 'Product Development', 
    avatar: 'PD', 
    lastUsed: new Date('2024-01-20'),
    isRecent: true
  },
  { 
    id: '2', 
    name: 'Engineering', 
    avatar: 'ENG', 
    lastUsed: new Date('2024-01-19'),
    isRecent: true
  },
  { 
    id: '3', 
    name: 'Marketing Team', 
    avatar: 'MT', 
    lastUsed: new Date('2024-01-18'),
    isRecent: true
  },
  { 
    id: '4', 
    name: 'Design System', 
    avatar: 'DS', 
    lastUsed: new Date('2024-01-17'),
    isRecent: false
  },
  { 
    id: '5', 
    name: 'Sales Operations', 
    avatar: 'SO', 
    lastUsed: new Date('2024-01-16'),
    isRecent: false
  },
];

const currentTeam = mockTeams[0];

export const Default: Story = {
  args: {
    currentTeam,
    teams: mockTeams,
    onTeamChange: action('onTeamChange'),
  },
};

export const WithLongTeamName: Story = {
  args: {
    currentTeam: {
      id: '1',
      name: 'Very Long Team Name That Might Overflow',
      avatar: 'VL',
      lastUsed: new Date('2024-01-20'),
      isRecent: true
    },
    teams: mockTeams,
    onTeamChange: action('onTeamChange'),
  },
};

export const WithManyTeams: Story = {
  args: {
    currentTeam,
    teams: [
      ...mockTeams,
      { id: '6', name: 'Customer Success', avatar: 'CS', lastUsed: new Date('2024-01-15'), isRecent: false },
      { id: '7', name: 'Quality Assurance', avatar: 'QA', lastUsed: new Date('2024-01-14'), isRecent: false },
      { id: '8', name: 'DevOps Team', avatar: 'DO', lastUsed: new Date('2024-01-13'), isRecent: false },
      { id: '9', name: 'Security Team', avatar: 'SEC', lastUsed: new Date('2024-01-12'), isRecent: false },
      { id: '10', name: 'Data Analytics', avatar: 'DA', lastUsed: new Date('2024-01-11'), isRecent: false },
    ],
    onTeamChange: action('onTeamChange'),
  },
};

export const Interactive: Story = {
  render: () => {
    const [selectedTeam, setSelectedTeam] = React.useState(currentTeam);
    
    return (
      <TeamSwitcher
        currentTeam={selectedTeam}
        teams={mockTeams}
        onTeamChange={(team) => {
          setSelectedTeam(team);
          action('onTeamChange')(team);
        }}
      />
    );
  },
};
