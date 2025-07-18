import React from "react";
import { UserSelection } from "./user-selection";
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from "@storybook/react";

// Mock users data
const mockUsers = [
  {
    id: "user-1",
    name: "Alice Johnson",
    email: "alice.johnson@company.com",
    role: "Senior Designer",
    department: "Design",
    avatar: "https://github.com/shadcn.png",
    skills: ["UI/UX Design", "Figma", "Prototyping", "User Research"],
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    timezone: "PST",
    bio: "Passionate about creating user-centered designs that solve real problems."
  },
  {
    id: "user-2", 
    name: "Bob Chen",
    email: "bob.chen@company.com",
    role: "Full Stack Developer",
    department: "Engineering", 
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    location: "Seattle, WA",
    timezone: "PST",
    bio: "Building scalable web applications with modern technologies."
  },
  {
    id: "user-3",
    name: "Carol Williams",
    email: "carol.williams@company.com", 
    role: "Marketing Manager",
    department: "Marketing",
    skills: ["Digital Marketing", "Content Strategy", "Analytics", "SEO"],
    location: "New York, NY",
    timezone: "EST",
    bio: "Data-driven marketer focused on growth and customer acquisition."
  },
  {
    id: "user-4",
    name: "David Rodriguez",
    email: "david.rodriguez@company.com",
    role: "Product Manager", 
    department: "Product",
    skills: ["Product Strategy", "Agile", "Analytics", "User Research"],
    location: "Austin, TX", 
    timezone: "CST",
    bio: "Building products that users love and businesses need."
  },
  {
    id: "user-5",
    name: "Emma Thompson",
    email: "emma.thompson@company.com",
    role: "Sales Representative",
    department: "Sales",
    skills: ["B2B Sales", "CRM", "Lead Generation", "Negotiation"],
    location: "Chicago, IL",
    timezone: "CST", 
    bio: "Helping businesses find the right solutions for their needs."
  },
  {
    id: "user-6",
    name: "Frank Kumar",
    email: "frank.kumar@company.com",
    role: "DevOps Engineer",
    department: "Engineering",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    location: "Remote",
    timezone: "EST",
    bio: "Automating and scaling infrastructure for reliable deployments."
  }
];

const departments = ["Design", "Engineering", "Marketing", "Product", "Sales", "Operations"];

const meta: Meta<typeof UserSelection> = {
  title: "Advanced Components/UserSelection",
  component: UserSelection,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof UserSelection>;

export const Default: Story = {
  args: {
    users: mockUsers,
    onUserSelect: action('onUserSelect'),
    onCancel: action('onCancel'),
    departments: departments,
  },
};

export const WithSelectedUser: Story = {
  args: {
    users: mockUsers,
    onUserSelect: action('onUserSelect'),
    onCancel: action('onCancel'),
    departments: departments,
    selectedUserId: "user-2",
  },
};

export const EmptyUsers: Story = {
  args: {
    users: [],
    onUserSelect: action('onUserSelect'),
    onCancel: action('onCancel'),
    departments: departments,
  },
};
