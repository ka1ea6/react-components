import React from "react";
import ProjectView from "./ProjectView";
import { action } from '@storybook/addon-actions';

import { businessUnits } from "./../business-units";
import type { Meta, StoryObj } from "@storybook/react";
import { 
  mockProjects, 
  mockEpics, 
  mockSprints, 
  mockTasks, 
  highDensityTasks,
  extendedProjects,
  emptyStateData,
  singleEpicData
} from './../../DigitalColleagues/test-data';
const meta: Meta<typeof ProjectView> = {
  title: "DC/Views/ProjectView",
  component: ProjectView,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof ProjectView>;

export const Default: Story = {
  args: {
    initialProjects: mockProjects,
    initialEpics: mockEpics,
    initialSprints: mockSprints,
    initialTasks: mockTasks,
    // currentView: 'kanban',
    // mobileMenuOpen: false,
    onUpdateProject: action('onUpdateProject'),
    onDeleteProject: action('onDeleteProject'),
    onAddProject: action('onAddProject'),
    onUpdateEpic: action('onUpdateEpic'),
    onUpdateTask: action('onUpdateTask'),
    onDeleteEpic: action('onDeleteEpic'),
    onAddEpic: action('onAddEpic'),
    onAddSprint: action('onAddSprint'),
    onUpdateSprint: action('onUpdateSprint'),
    onDeleteSprint: action('onDeleteSprint'),
    // onViewChange: action('onViewChange'),
    onToggleMobileMenu: action('onToggleMobileMenu'),
  },
};
