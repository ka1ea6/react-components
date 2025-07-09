import type { Meta, StoryObj } from '@storybook/react'
import KnowledgeView from './KnowledgeView'
import type { KnowledgeDocument, KnowledgeMenuConfig } from '../../DigitalColleagues/types'

const meta: Meta<typeof KnowledgeView> = {
  title: 'DC/Views/KnowledgeView',
  component: KnowledgeView,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Sample knowledge documents
const sampleDocuments: KnowledgeDocument[] = [
  {
    id: '1',
    title: 'API Authentication Guide',
    description: 'Complete guide for implementing API authentication in our platform',
    format: 'markdown',
    metadata: {
      category: 'Development',
      type: 'Guide',
      team: 'Backend',
      difficulty: 'Intermediate',
      version: '2.1'
    },
    content: `# API Authentication Guide

## Overview
This guide covers the implementation of secure API authentication...

## OAuth 2.0 Implementation
- Authorization Code Flow
- Client Credentials Flow
- Refresh Token Handling

## Best Practices
1. Always use HTTPS
2. Implement proper token expiration
3. Use secure storage for credentials`,
    tags: ['api', 'security', 'oauth', 'backend'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: '2',
    title: 'UI Component Library',
    description: 'Documentation for our React component library',
    format: 'mdx',
    metadata: {
      category: 'Development',
      type: 'Documentation',
      team: 'Frontend',
      difficulty: 'Beginner',
      version: '1.5'
    },
    content: `# UI Component Library

## Installation
\`\`\`bash
npm install @company/ui-components
\`\`\`

## Basic Usage
\`\`\`jsx
import { Button, Card } from '@company/ui-components'

function App() {
  return (
    <Card>
      <Button variant="primary">Click me</Button>
    </Card>
  )
}
\`\`\``,
    tags: ['ui', 'react', 'components', 'frontend'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-03-01'),
  },
  {
    id: '3',
    title: 'Database Schema Design',
    description: 'Guidelines for designing scalable database schemas',
    format: 'markdown',
    metadata: {
      category: 'Development',
      type: 'Best Practice',
      team: 'Backend',
      difficulty: 'Advanced',
      version: '3.0'
    },
    content: `# Database Schema Design

## Principles
- Normalize for consistency
- Denormalize for performance
- Index strategically

## Common Patterns
1. One-to-Many relationships
2. Many-to-Many with junction tables
3. Polymorphic associations`,
    tags: ['database', 'schema', 'sql', 'backend'],
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    title: 'Employee Onboarding Process',
    description: 'Step-by-step guide for new employee onboarding',
    format: 'richtext',
    metadata: {
      category: 'HR',
      type: 'Process',
      team: 'Human Resources',
      difficulty: 'Beginner',
      department: 'Operations'
    },
    content: `Employee Onboarding Checklist

Day 1:
- Welcome meeting with manager
- IT setup and account creation
- Office tour and safety briefing
- Complete paperwork

Week 1:
- Team introductions
- Project overview sessions
- Access to necessary tools
- Initial training modules

Month 1:
- Progress review
- Goal setting
- Feedback session`,
    tags: ['hr', 'onboarding', 'process', 'checklist'],
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '5',
    title: 'Marketing Campaign Analysis',
    description: 'Q1 2024 marketing campaign performance analysis',
    format: 'markdown',
    metadata: {
      category: 'Marketing',
      type: 'Report',
      team: 'Marketing',
      difficulty: 'Intermediate',
      quarter: 'Q1 2024'
    },
    content: `# Q1 2024 Marketing Campaign Analysis

## Executive Summary
Our Q1 campaigns showed a 25% increase in engagement...

## Key Metrics
- Click-through rate: 3.2%
- Conversion rate: 1.8%
- Cost per acquisition: $45

## Recommendations
1. Increase social media spend
2. A/B test email subject lines
3. Optimize landing pages`,
    tags: ['marketing', 'analysis', 'campaign', 'metrics'],
    createdAt: new Date('2024-04-01'),
  },
  {
    id: '6',
    title: 'Security Incident Response',
    description: 'Procedures for handling security incidents',
    format: 'markdown',
    metadata: {
      category: 'Security',
      type: 'Procedure',
      team: 'Security',
      difficulty: 'Advanced',
      criticality: 'High'
    },
    content: `# Security Incident Response Procedure

## Immediate Response (0-1 hour)
1. Assess and contain the threat
2. Document the incident
3. Notify the security team

## Investigation Phase (1-24 hours)
1. Gather evidence
2. Analyze attack vectors
3. Determine scope of compromise

## Recovery and Lessons Learned
1. Implement fixes
2. Update procedures
3. Conduct post-incident review`,
    tags: ['security', 'incident', 'response', 'procedure'],
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '7',
    title: 'Design System Guidelines',
    description: 'Visual design standards and component usage guidelines',
    format: 'mdx',
    metadata: {
      category: 'Design',
      type: 'Guidelines',
      team: 'Design',
      difficulty: 'Intermediate',
      version: '2.0'
    },
    content: `# Design System Guidelines

## Color Palette
- Primary: #3B82F6
- Secondary: #10B981
- Neutral: #6B7280

## Typography
- Headings: Inter Bold
- Body: Inter Regular
- Code: JetBrains Mono

## Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px`,
    tags: ['design', 'system', 'guidelines', 'ui'],
    createdAt: new Date('2024-01-25'),
  },
]

// Default configuration
const defaultMenuConfig: KnowledgeMenuConfig = {
  groupBy: ['category', 'type'],
  sortBy: 'title',
  sortOrder: 'asc',
  showDocumentCount: true,
}

export const Default: Story = {
  args: {
    documents: sampleDocuments,
    menuConfig: defaultMenuConfig,
  },
}

export const GroupByTeam: Story = {
  args: {
    documents: sampleDocuments,
    menuConfig: {
      groupBy: ['team', 'difficulty'],
      sortBy: 'updatedAt',
      sortOrder: 'desc',
      showDocumentCount: true,
    },
  },
}

export const GroupByDifficulty: Story = {
  args: {
    documents: sampleDocuments,
    menuConfig: {
      groupBy: ['difficulty', 'category'],
      sortBy: 'title',
      sortOrder: 'asc',
      showDocumentCount: false,
    },
  },
}

export const SingleLevel: Story = {
  args: {
    documents: sampleDocuments,
    menuConfig: {
      groupBy: ['category'],
      sortBy: 'createdAt',
      sortOrder: 'desc',
      showDocumentCount: true,
    },
  },
}

export const EmptyState: Story = {
  args: {
    documents: [],
    menuConfig: defaultMenuConfig,
  },
}

export const WithSelection: Story = {
  args: {
    documents: sampleDocuments,
    menuConfig: defaultMenuConfig,
    selectedDocumentId: '2',
  },
}
