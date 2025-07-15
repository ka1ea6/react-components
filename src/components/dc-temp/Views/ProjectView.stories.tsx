import React from "react";
import ProjectView from "./ProjectView";
import { action } from '@storybook/addon-actions';

import { businessUnits } from "./../business-units";
import type { Meta, StoryObj } from "@storybook/react";
import type { Reminder, DigitalColleague } from '../../DigitalColleagues/TasksView';
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

// Mock colleagues for tasks view
const mockColleagues: DigitalColleague[] = [
  { id: '1', name: 'Alex AI', department: 'Development', role: 'Senior Developer' },
  { id: '2', name: 'Maya Bot', department: 'Design', role: 'UX Designer' },
  { id: '3', name: 'Sam Assistant', department: 'Marketing', role: 'Marketing Specialist' },
  { id: '4', name: 'Jordan Helper', department: 'Support', role: 'Customer Success' },
  { id: '5', name: 'Riley Automation', department: 'Operations', role: 'DevOps Engineer' },
];

// Mock reminders for tasks view
const mockReminders: Reminder[] = [
  {
    id: '1',
    title: 'Review quarterly report',
    description: 'Go through Q4 performance metrics and prepare summary for the team meeting',
    dueDate: new Date(2024, 2, 15),
    dueTime: '14:30',
    colleague: mockColleagues[0],
    isCompleted: false,
    isRecurring: false,
    priority: 'high',
    reminderEnabled: true,
    reminderMinutes: 30,
    createdAt: new Date(2024, 2, 10),
    tags: ['quarterly', 'review', 'urgent']
  },
  {
    id: '2',
    title: 'Weekly team standup',
    description: 'Join the weekly team synchronization meeting',
    dueDate: new Date(2024, 2, 18),
    dueTime: '10:00',
    colleague: mockColleagues[1],
    isCompleted: false,
    isRecurring: true,
    recurrencePattern: 'weekly',
    recurrenceInterval: 1,
    priority: 'medium',
    reminderEnabled: true,
    reminderMinutes: 15,
    createdAt: new Date(2024, 2, 11),
    tags: ['meeting', 'standup', 'weekly']
  },
  {
    id: '3',
    title: 'Deploy to production',
    description: 'Deploy the latest version to production environment',
    dueDate: new Date(),
    dueTime: '16:00',
    colleague: mockColleagues[4],
    isCompleted: false,
    isRecurring: false,
    priority: 'high',
    reminderEnabled: true,
    reminderMinutes: 60,
    createdAt: new Date(),
    tags: ['deploy', 'production', 'urgent']
  },
];

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
    initialReminders: mockReminders,
    initialColleagues: mockColleagues,
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
    onAddReminder: action('onAddReminder'),
    onUpdateReminder: action('onUpdateReminder'),
    onDeleteReminder: action('onDeleteReminder'),
    // onViewChange: action('onViewChange'),
    onToggleMobileMenu: action('onToggleMobileMenu'),
  },
};
