import React from "react";
import Home from "./ProjectsIndexView";
import { action } from '@storybook/addon-actions';
import { businessUnits } from "../business-units";
import type { Meta, StoryObj } from "@storybook/react";
import { 
  mockProjects,
  mockProjectSummary,
  mockEpics, 
  mockSprints, 
  mockTasks, 
  highDensityTasks,
  extendedProjects,
  emptyStateData,
  singleEpicData
} from '../../DigitalColleagues/test-data';


const meta: Meta<typeof Home> = {
  title: "DC/Views/ProjectsIndexView",
  component: Home,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof Home>;

export const Default: Story = {
  args: {
    projects: mockProjectSummary,
    handleProjectOpen: action('handleProjectOpen'),
    handleProjectShare: action('handleProjectShare'),
    onAddProject: action('onAddProject'),
  },
};

export const EmptyState: Story = {
  args: {
    projects: [],
    handleProjectOpen: action('handleProjectOpen'),
    handleProjectShare: action('handleProjectShare'),
    onAddProject: action('onAddProject'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the view when no projects exist yet.'
      }
    }
  }
};
