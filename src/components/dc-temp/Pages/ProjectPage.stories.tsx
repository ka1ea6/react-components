import React from "react";
import ProjectPage from "./ProjectPage";
import { businessUnits } from "../business-units";
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
  singleEpicData
} from '../../DigitalColleagues/test-data';

const meta: Meta<typeof ProjectPage> = {
  title: "DC/Pages/ProjectPage",
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
    onUpdateProject: action('onUpdateProject'),
    onDeleteProject: action('onDeleteProject'),
    onAddProject: action('onAddProject'),
    onUpdateEpic: action('onUpdateEpic'),
    onDeleteEpic: action('onDeleteEpic'),
    onAddEpic: action('onAddEpic'),
    onAddSprint: action('onAddSprint'),
    onUpdateSprint: action('onUpdateSprint'),
    onDeleteSprint: action('onDeleteSprint'),
    onViewChange: action('onViewChange'),
    onToggleMobileMenu: action('onToggleMobileMenu'),
    children: <div className="p-8 bg-gray-50 h-full">Main content area</div>,
  },
};
