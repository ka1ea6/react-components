
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { KanbanBoard } from './KanbanBoard';
import { 
  mockProjects, 
  mockEpics, 
  mockSprints, 
  mockTasks, 
  highDensityTasks,
  extendedProjects,
  emptyStateData,
  singleEpicData,
  testScenarios
} from './test-data';

const meta: Meta<typeof KanbanBoard> = {
  title: 'Digital Colleagues/KanbanBoard',
  component: KanbanBoard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete Kanban board view with task management, epics, and sprints.',
      },
    },
  },
  args: {
    ...testScenarios.default,
  },
};

export default meta;
type Story = StoryObj<typeof KanbanBoard>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default kanban board with sample tasks, epics, and sprints.',
      },
    },
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Kanban board optimized for mobile devices with responsive layout.',
      },
    },
  },
};

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Kanban board on tablet screens with adapted column layout.',
      },
    },
  },
};

export const DesktopView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Full desktop kanban board with all columns visible.',
      },
    },
  },
};

export const DarkBackground: Story = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#1a1a1a' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    docs: {
      description: {
        story: 'Kanban board with dark background for contrast testing.',
      },
    },
  },
};

export const WithTaskFlow: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the full task workflow from To Do to Done.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    // This story can be enhanced with play functions for interactive testing
    console.log('Kanban board loaded with task flow demonstration');
  },
};

export const ResponsiveBreakpoints: Story = {
  render: (args) => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Mobile (360px)</h3>
        <div className="w-[360px] h-[600px] border border-gray-300 overflow-hidden">
          <KanbanBoard {...args} />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Tablet (768px)</h3>
        <div className="w-[768px] h-[600px] border border-gray-300 overflow-hidden">
          <KanbanBoard {...args} />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Desktop (1024px)</h3>
        <div className="w-[1024px] h-[600px] border border-gray-300 overflow-hidden">
          <KanbanBoard {...args} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Shows how the kanban board adapts to different screen sizes.',
      },
    },
  },
};

export const EmptyState: Story = {
  args: testScenarios.empty,
  parameters: {
    docs: {
      description: {
        story: 'Kanban board in empty state with no tasks or epics.',
      },
    },
  },
};

export const HighDensity: Story = {
  args: testScenarios.highDensity,
  parameters: {
    docs: {
      description: {
        story: 'Kanban board with many tasks to test high-density scenarios.',
      },
    },
  },
};

// ...existing code...

export const SingleEpicFocus: Story = {
  args: testScenarios.singleEpic,
  parameters: {
    docs: {
      description: {
        story: 'Kanban board focused on a single epic with related tasks.',
      },
    },
  },
};

export const MultipleProjects: Story = {
  args: testScenarios.multipleProjects,
  parameters: {
    docs: {
      description: {
        story: 'Kanban board with multiple project options available.',
      },
    },
  },
};

export const PerformanceTest: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Kanban board for performance testing with many elements.',
      },
    },
  },
};
