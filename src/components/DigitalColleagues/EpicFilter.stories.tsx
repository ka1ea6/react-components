
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { useState } from 'react';
import { EpicFilter } from './EpicFilter';

const mockEpics = [
  { id: 'epic1', name: 'User Authentication', color: 'bg-blue-500', description: 'Secure login system' },
  { id: 'epic2', name: 'Dashboard Redesign', color: 'bg-green-500', description: 'Modern UI overhaul' },
  { id: 'epic3', name: 'Mobile App', color: 'bg-purple-500', description: 'Native mobile application' },
  { id: 'epic4', name: 'API Integration', color: 'bg-orange-500', description: 'Third-party API connections' },
  { id: 'epic5', name: 'Performance Optimization', color: 'bg-red-500', description: 'Speed improvements' },
  { id: 'epic6', name: 'Security Enhancements', color: 'bg-yellow-500', description: 'Security improvements' },
  { id: 'epic7', name: 'User Experience', color: 'bg-pink-500', description: 'UX improvements' },
  { id: 'epic8', name: 'Analytics Platform', color: 'bg-indigo-500', description: 'Data analytics' },
];

const meta: Meta<typeof EpicFilter> = {
  title: 'Digital Colleagues/EpicFilter',
  component: EpicFilter,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    epics: {
      control: 'object',
      description: 'Array of epic objects',
    },
    selectedEpics: {
      control: 'object',
      description: 'Array of selected epic IDs',
    },
    onSelectionChange: {
      action: 'selection changed',
      description: 'Function called when selection changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof EpicFilter>;

export const AllSelected: Story = {
  args: {
    epics: mockEpics.slice(0, 5),
    selectedEpics: mockEpics.slice(0, 5).map(epic => epic.id),
    onSelectionChange: action('onSelectionChange'),
  },
};

export const PartialSelection: Story = {
  args: {
    epics: mockEpics.slice(0, 5),
    selectedEpics: ['epic1', 'epic3', 'epic5'],
    onSelectionChange: action('onSelectionChange'),
  },
};

export const NoneSelected: Story = {
  args: {
    epics: mockEpics.slice(0, 5),
    selectedEpics: [],
    onSelectionChange: action('onSelectionChange'),
  },
};

export const SingleEpic: Story = {
  args: {
    epics: [mockEpics[0]],
    selectedEpics: ['epic1'],
    onSelectionChange: action('onSelectionChange'),
  },
};

export const ManyEpics: Story = {
  args: {
    epics: mockEpics,
    selectedEpics: ['epic1', 'epic4', 'epic7'],
    onSelectionChange: action('onSelectionChange'),
  },
};

export const LongEpicNames: Story = {
  args: {
    epics: [
      { id: 'epic1', name: 'Very Long Epic Name That Might Wrap To Multiple Lines', color: 'bg-blue-500', description: 'Long description' },
      { id: 'epic2', name: 'Comprehensive User Authentication and Authorization System', color: 'bg-green-500', description: 'Auth system' },
      { id: 'epic3', name: 'Advanced Analytics and Reporting Dashboard with Real-time Updates', color: 'bg-purple-500', description: 'Analytics' },
    ],
    selectedEpics: ['epic1', 'epic3'],
    onSelectionChange: action('onSelectionChange'),
  },
};

export const Empty: Story = {
  args: {
    epics: [],
    selectedEpics: [],
    onSelectionChange: action('onSelectionChange'),
  },
};

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [selectedEpics, setSelectedEpics] = useState(['epic1', 'epic3']);
    
    return (
      <EpicFilter
        epics={mockEpics.slice(0, 6)}
        selectedEpics={selectedEpics}
        onSelectionChange={(newSelection) => {
          setSelectedEpics(newSelection);
          action('onSelectionChange')(newSelection);
        }}
      />
    );
  },
};

export const AllColors: Story = {
  args: {
    epics: [
      { id: 'epic1', name: 'Blue Epic', color: 'bg-blue-500', description: 'Blue themed epic' },
      { id: 'epic2', name: 'Green Epic', color: 'bg-green-500', description: 'Green themed epic' },
      { id: 'epic3', name: 'Purple Epic', color: 'bg-purple-500', description: 'Purple themed epic' },
      { id: 'epic4', name: 'Orange Epic', color: 'bg-orange-500', description: 'Orange themed epic' },
      { id: 'epic5', name: 'Red Epic', color: 'bg-red-500', description: 'Red themed epic' },
      { id: 'epic6', name: 'Yellow Epic', color: 'bg-yellow-500', description: 'Yellow themed epic' },
      { id: 'epic7', name: 'Pink Epic', color: 'bg-pink-500', description: 'Pink themed epic' },
      { id: 'epic8', name: 'Indigo Epic', color: 'bg-indigo-500', description: 'Indigo themed epic' },
    ],
    selectedEpics: ['epic1', 'epic3', 'epic5', 'epic7'],
    onSelectionChange: action('onSelectionChange'),
  },
};

export const SelectionStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">All Selected</h3>
        <EpicFilter
          epics={mockEpics.slice(0, 4)}
          selectedEpics={mockEpics.slice(0, 4).map(epic => epic.id)}
          onSelectionChange={action('all-selected')}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Some Selected</h3>
        <EpicFilter
          epics={mockEpics.slice(0, 4)}
          selectedEpics={['epic2', 'epic4']}
          onSelectionChange={action('some-selected')}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">None Selected</h3>
        <EpicFilter
          epics={mockEpics.slice(0, 4)}
          selectedEpics={[]}
          onSelectionChange={action('none-selected')}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
