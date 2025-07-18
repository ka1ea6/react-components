import React from "react";
import ProjectPage from "./ProjectPage";
import { action } from '@storybook/addon-actions';

import type { Meta, StoryObj } from "@storybook/react";
import { 
  mockProjects, 
  mockEpics, 
  mockSprints, 
  mockTasks, 
  highDensityTasks,
  extendedProjects,
  emptyStateData,
  singleEpicData,
  businessUnits
} from '../DigitalColleagues/test-data';

const meta: Meta<typeof ProjectPage> = {
  title: "Projects/Views/ProjectPage",
  component: ProjectPage,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof ProjectPage>;

export const Default: Story = {
  args: {
    projects: mockProjects,
    epics: mockEpics,
    sprints: mockSprints,
    tasks: mockTasks,
    businessUnits: businessUnits,
    currentView: 'kanban',
    mobileMenuOpen: false,
    // Task handlers
    onAddTask: action('onAddTask'),
    onUpdateTask: action('onUpdateTask'),
    onDeleteTask: action('onDeleteTask'),
    onTaskClick: action('onTaskClick'),
    // Epic handlers
    onAddEpic: action('onAddEpic'),
    onUpdateEpic: action('onUpdateEpic'),
    onDeleteEpic: action('onDeleteEpic'),
    onAddTaskToEpic: action('onAddTaskToEpic'),
    // Sprint handlers
    onAddSprint: action('onAddSprint'),
    onUpdateSprint: action('onUpdateSprint'),
    onDeleteSprint: action('onDeleteSprint'),
    // Project handlers
    onAddProject: action('onAddProject'),
    onUpdateProject: action('onUpdateProject'),
    onDeleteProject: action('onDeleteProject'),
    // View handlers
    onViewChange: action('onViewChange'),
    onToggleMobileMenu: action('onToggleMobileMenu'),
    // Team handlers
    onTeamClick: action('onTeamClick'),
    onTeamChange: action('onTeamChange'),
    onCopilotClick: action('onCopilotClick'),
  },
};
