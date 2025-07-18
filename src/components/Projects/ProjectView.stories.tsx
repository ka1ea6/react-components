import React from "react";
import ProjectView from "./ProjectView";
import { action } from '@storybook/addon-actions';

import { 
  businessUnits,
  mockProjects, 
  mockEpics, 
  mockSprints, 
  mockTasks, 
  mockColleagues,
  mockDigitalColleagues,
  mockReminders,
  mockFiles,
  highDensityTasks,
  extendedProjects,
  emptyStateData,
  singleEpicData
} from '../DigitalColleagues/test-data';
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ProjectView> = {
  title: "Projects/Views/ProjectView",
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
    initialReminders: mockReminders,
    initialColleagues: mockDigitalColleagues,
    initialFiles: mockFiles,
    // Task handlers (used by KanbanBoard)
    onAddTask: action('onAddTask'),
    onUpdateTask: action('onUpdateTask'),
    onDeleteTask: action('onDeleteTask'),
    onTaskClick: action('onTaskClick'),
    // Epic handlers (used by KanbanBoard and EpicsView)
    onAddEpic: action('onAddEpic'),
    onUpdateEpic: action('onUpdateEpic'),
    onDeleteEpic: action('onDeleteEpic'),
    onAddTaskToEpic: action('onAddTaskToEpic'),
    // Sprint handlers (used by PlanningView)
    onAddSprint: action('onAddSprint'),
    onUpdateSprint: action('onUpdateSprint'),
    onDeleteSprint: action('onDeleteSprint'),
    // Project handlers (used by ManagementSidebar)
    onAddProject: action('onAddProject'),
    onUpdateProject: action('onUpdateProject'),
    onDeleteProject: action('onDeleteProject'),
    // File handlers (used by FileView)
    onFileAdd: action('onFileAdd'),
    onFileEdit: action('onFileEdit'),
    onFileDelete: action('onFileDelete'),
    onFileClick: action('onFileClick'),
    // Reminder handlers (used by TasksView)
    onAddReminder: action('onAddReminder'),
    onUpdateReminder: action('onUpdateReminder'),
    onDeleteReminder: action('onDeleteReminder'),
    // View handlers (used by ManagementSidebar)
    onViewChange: action('onViewChange'),
    onToggleMobileMenu: action('onToggleMobileMenu'),
    // Team handlers (used by ProjectView)
    onTeamClick: action('onTeamClick'),
    onTeamChange: action('onTeamChange'),
    onCopilotClick: action('onCopilotClick'),
  },
};
