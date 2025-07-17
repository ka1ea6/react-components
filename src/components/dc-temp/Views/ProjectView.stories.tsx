import React from "react";
import ProjectView from "./ProjectView";
import { action } from '@storybook/addon-actions';

import { businessUnits } from "./../business-units";
import type { Meta, StoryObj } from "@storybook/react";
import type { Reminder, DigitalColleague } from '../../DigitalColleagues/TasksView';
import type { RecentFile } from '../../DigitalColleagues/types';
import { FileText, FileImage, FileVideo, Music, File } from 'lucide-react';
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

// Mock files for files view
const mockFiles: RecentFile[] = [
  {
    name: "Project_Requirements.docx",
    app: "Word",
    modified: "2 hours ago",
    icon: <FileText className="h-5 w-5 text-blue-500" />,
    shared: true,
    size: "1.2 MB",
    collaborators: 4,
  },
  {
    name: "Sprint_Planning_Notes.pdf",
    app: "PDF Reader",
    modified: "1 day ago",
    icon: <File className="h-5 w-5 text-red-500" />,
    shared: false,
    size: "245 KB",
    collaborators: 0,
  },
  {
    name: "UI_Mockups.fig",
    app: "Figma",
    modified: "3 days ago",
    icon: <FileImage className="h-5 w-5 text-purple-500" />,
    shared: true,
    size: "5.7 MB",
    collaborators: 6,
  },
  {
    name: "Demo_Video.mp4",
    app: "Video Player",
    modified: "1 week ago",
    icon: <FileVideo className="h-5 w-5 text-green-500" />,
    shared: false,
    size: "89 MB",
    collaborators: 0,
  },
  {
    name: "Meeting_Recording.m4a",
    app: "Audio Player",
    modified: "2 weeks ago",
    icon: <Music className="h-5 w-5 text-orange-500" />,
    shared: true,
    size: "12 MB",
    collaborators: 2,
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
