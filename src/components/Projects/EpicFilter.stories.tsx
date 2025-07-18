
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { EpicFilter } from './EpicFilter';

const meta: Meta<typeof EpicFilter> = {
  title: 'Projects/EpicFilter',
  component: EpicFilter,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EpicFilter>;

const mockEpics = [
  {
    id: '1',
    name: 'User Authentication',
    color: 'bg-blue-500',
    description: 'Implement secure user authentication system',
    confidence: 'high' as const,
    phase: 2,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-02-15'),
    progress: 75,
    isSelected: true,
  },
  {
    id: '2',
    name: 'Dashboard Features',
    color: 'bg-green-500',
    description: 'Build comprehensive dashboard functionality',
    confidence: 'medium' as const,
    phase: 1,
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-03-15'),
    progress: 30,
    isSelected: false,
  },
  {
    id: '3',
    name: 'Mobile Optimization',
    color: 'bg-purple-500',
    description: 'Optimize application for mobile devices',
    confidence: 'low' as const,
    phase: 1,
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-04-15'),
    progress: 10,
    isSelected: true,
  },
];

export const Default: Story = {
  args: {
    epics: mockEpics,
    selectedEpics: ['1', '3'],
    onSelectionChange: action('onSelectionChange'),
  },
};

export const AllSelected: Story = {
  args: {
    epics: mockEpics.map(epic => ({ ...epic, isSelected: true })),
    selectedEpics: ['1', '2', '3'],
    onSelectionChange: action('onSelectionChange'),
  },
};

export const NoneSelected: Story = {
  args: {
    epics: mockEpics.map(epic => ({ ...epic, isSelected: false })),
    selectedEpics: [],
    onSelectionChange: action('onSelectionChange'),
  },
};

export const SingleEpic: Story = {
  args: {
    epics: [mockEpics[0]],
    selectedEpics: ['1'],
    onSelectionChange: action('onSelectionChange'),
  },
};

export const NoEpics: Story = {
  args: {
    epics: [],
    selectedEpics: [],
    onSelectionChange: action('onSelectionChange'),
  },
};

export const AllUnselected: Story = {
  args: {
    epics: mockEpics.map(epic => ({ ...epic, isSelected: false })),
    selectedEpics: [],
    onSelectionChange: action('onSelectionChange'),
  },
};

export const SingleSelected: Story = {
  args: {
    epics: mockEpics.map((epic, index) => ({ ...epic, isSelected: index === 0 })),
    selectedEpics: ['1'],
    onSelectionChange: action('onSelectionChange'),
  },
};

export const ManyEpics: Story = {
  args: {
    epics: [
      ...mockEpics,
      {
        id: '4',
        name: 'Performance Improvements',
        color: 'bg-orange-500',
        description: 'Enhance application performance and speed',
        confidence: 'high' as const,
        phase: 3,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-02-28'),
        progress: 90,
        isSelected: false,
      },
      {
        id: '5',
        name: 'Security Enhancements',
        color: 'bg-red-500',
        description: 'Implement additional security measures',
        confidence: 'medium' as const,
        phase: 1,
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-05-15'),
        progress: 0,
        isSelected: true,
      },
      {
        id: '6',
        name: 'API Integration',
        color: 'bg-yellow-500',
        description: 'Connect with external APIs',
        confidence: 'low' as const,
        phase: 2,
        startDate: new Date('2024-05-01'),
        endDate: new Date('2024-06-15'),
        progress: 25,
        isSelected: false,
      },
      {
        id: '7',
        name: 'Testing Framework',
        color: 'bg-pink-500',
        description: 'Set up comprehensive testing',
        confidence: 'high' as const,
        phase: 1,
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-07-15'),
        progress: 15,
        isSelected: true,
      },
      {
        id: '8',
        name: 'Documentation',
        color: 'bg-indigo-500',
        description: 'Create user and developer documentation',
        confidence: 'medium' as const,
        phase: 4,
        startDate: new Date('2024-07-01'),
        endDate: new Date('2024-08-15'),
        progress: 60,
        isSelected: false,
      },
    ],
    selectedEpics: ['1', '3', '5', '7'],
    onSelectionChange: action('onSelectionChange'),
  },
};

export const WithLongNames: Story = {
  args: {
    epics: [
      {
        id: '1',
        name: 'Very Long Epic Name That Should Wrap Properly in the UI Component',
        color: 'bg-blue-500',
        description: 'This epic has a very long name to test text wrapping',
        confidence: 'high' as const,
        phase: 2,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-02-15'),
        progress: 75,
        isSelected: true,
      },
      {
        id: '2',
        name: 'Another Epic With an Extremely Long Name That Tests the Limits',
        color: 'bg-green-500',
        description: 'Testing how the UI handles very long epic names',
        confidence: 'low' as const,
        phase: 1,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-15'),
        progress: 30,
        isSelected: false,
      },
    ],
    selectedEpics: ['1'],
    onSelectionChange: action('onSelectionChange'),
  },
};
