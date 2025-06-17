
import type { Meta, StoryObj } from '@storybook/react';
import { TeamSwitcher } from './TeamSwitcher';

const meta: Meta<typeof TeamSwitcher> = {
  title: 'Digital Colleagues/TeamSwitcher',
  component: TeamSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TeamSwitcher>;

const mockTeam = {
  id: '1',
  name: 'Product Development',
  avatar: '/placeholder.svg',
  isRecent: true,
};

const mockTeams = [
  {
    id: '1',
    name: 'Product Development',
    avatar: '/placeholder.svg',
    isRecent: true,
  },
  {
    id: '2',
    name: 'Engineering',
    avatar: '/placeholder.svg',
    isRecent: true,
  },
  {
    id: '3',
    name: 'Design System',
    avatar: '/placeholder.svg',
    isRecent: false,
  },
  {
    id: '4',
    name: 'Marketing',
    avatar: '/placeholder.svg',
    isRecent: false,
  },
];

export const Default: Story = {
  args: {
    currentTeam: mockTeam,
    onTeamChange: (team) => console.log('Team changed:', team),
  },
};

export const WithMultipleTeams: Story = {
  args: {
    currentTeam: mockTeam,
    onTeamChange: (team) => console.log('Team changed:', team),
  },
};
