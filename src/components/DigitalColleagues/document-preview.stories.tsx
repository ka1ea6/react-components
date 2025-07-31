import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DocumentPreview } from './document-preview'
import type { KnowledgeDocument } from './types'

const meta: Meta<typeof DocumentPreview> = {
  title: 'Digital Colleagues/DocumentPreview',
  component: DocumentPreview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A document preview component that displays knowledge documents with optional edit functionality. Edit mode uses the separate DocumentEdit component.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    document: {
      control: false,
      description: 'The knowledge document to display'
    },
    onDocumentUpdate: {
      action: 'document-updated',
      description: 'Callback fired when a document is updated'
    },
    editable: {
      control: { type: 'boolean' },
      description: 'Whether the document can be edited',
      defaultValue: true
    }
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Sample documents for stories
const sampleMarkdownDocument: KnowledgeDocument = {
  id: '1',
  title: 'React Development Best Practices',
  description: 'Comprehensive guide to React development patterns and practices',
  format: 'markdown',
  metadata: { 
    category: 'Development', 
    difficulty: 'Intermediate',
    author: 'Dev Team',
    lastReviewed: '2024-06-01'
  },
  tags: ['react', 'javascript', 'frontend'],
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-06-20'),
  content: `# React Development Best Practices

This comprehensive guide covers the essential patterns and practices for React development.

## Introduction

React is a powerful library for building user interfaces. Following best practices ensures your applications are maintainable, performant, and scalable.

### Key Principles

1. **Component Composition** - Build small, reusable components
2. **State Management** - Keep state as local as possible
3. **Performance** - Use React.memo and useMemo when appropriate
4. **Testing** - Write comprehensive tests for your components

## Code Examples

Here's an example of a well-structured React component:

\`\`\`jsx
import React, { useState, useCallback } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(\`/api/users/\${userId}\`);
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
\`\`\`

## Best Practices Checklist

- [ ] Use functional components with hooks
- [ ] Implement proper error boundaries
- [ ] Optimize renders with React.memo
- [ ] Use TypeScript for better type safety
- [ ] Follow consistent naming conventions
- [ ] Write unit and integration tests

## Conclusion

Following these best practices will help you build robust React applications that are easy to maintain and scale.`
}

const sampleRichTextDocument: KnowledgeDocument = {
  id: '2',
  title: 'Team Communication Guidelines',
  description: 'Essential guidelines for effective team communication',
  format: 'richtext',
  metadata: { 
    category: 'Management', 
    difficulty: 'Beginner',
    department: 'HR',
    priority: 'High'
  },
  tags: ['communication', 'team', 'guidelines'],
  createdAt: new Date('2024-02-10'),
  updatedAt: new Date('2024-05-15'),
  content: `Team Communication Guidelines

Effective communication is crucial for team success. These guidelines help ensure clear, respectful, and productive interactions.

Core Principles:
• Be clear and concise in your messaging
• Listen actively and ask clarifying questions
• Respect different communication styles and preferences
• Use appropriate channels for different types of communication

Meeting Guidelines:
• Start and end on time
• Come prepared with agenda items
• Encourage participation from all team members
• Follow up with action items and next steps

Digital Communication:
• Use @mentions when you need someone's attention
• Keep messages focused and actionable
• Use threads to keep conversations organized
• Respond within 24 hours during business days

Remember: Good communication builds trust and improves team productivity.`
}

const sampleDocumentWithoutContent: KnowledgeDocument = {
  id: '3',
  title: 'Security Protocol Reference',
  description: 'Quick reference for security protocols and procedures',
  format: 'markdown',
  metadata: { 
    category: 'Security', 
    difficulty: 'Advanced',
    classification: 'Internal'
  },
  tags: ['security', 'protocols', 'reference'],
  createdAt: new Date('2024-03-05'),
  updatedAt: new Date('2024-04-20'),
  // No content property to test empty state
}

// Wrapper component to handle state management
const DocumentPreviewWrapper = (args: any) => {
  const [document, setDocument] = useState<KnowledgeDocument>(args.document)
  
  const handleDocumentUpdate = (updatedDocument: KnowledgeDocument) => {
    setDocument(updatedDocument)
    args.onDocumentUpdate?.(updatedDocument)
  }

  return (
    <div className="h-screen bg-background">
      <DocumentPreview
        {...args}
        document={document}
        onDocumentUpdate={handleDocumentUpdate}
      />
    </div>
  )
}

export const MarkdownDocument: Story = {
  render: DocumentPreviewWrapper,
  args: {
    document: sampleMarkdownDocument,
    editable: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Document preview showing a markdown document with comprehensive content and metadata.'
      }
    }
  }
}

export const RichTextDocument: Story = {
  render: DocumentPreviewWrapper,
  args: {
    document: sampleRichTextDocument,
    editable: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Document preview showing a rich text document with formatted content.'
      }
    }
  }
}

export const ReadOnlyMode: Story = {
  render: DocumentPreviewWrapper,
  args: {
    document: sampleMarkdownDocument,
    editable: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Document preview in read-only mode where editing is disabled.'
      }
    }
  }
}

export const DocumentWithoutContent: Story = {
  render: DocumentPreviewWrapper,
  args: {
    document: sampleDocumentWithoutContent,
    editable: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Document preview showing the empty state when no content is available.'
      }
    }
  }
}

export const MinimalMetadata: Story = {
  render: DocumentPreviewWrapper,
  args: {
    document: {
      id: '4',
      title: 'Simple Document',
      description: 'A document with minimal metadata',
      format: 'markdown' as const,
      tags: ['simple'],
      createdAt: new Date('2024-01-01'),
      content: 'This is a simple document with minimal metadata and content.'
    },
    editable: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Document preview with minimal metadata to test the layout with fewer fields.'
      }
    }
  }
}

export const LongContent: Story = {
  render: DocumentPreviewWrapper,
  args: {
    document: {
      ...sampleMarkdownDocument,
      content: sampleMarkdownDocument.content + '\n\n' + 
        'Additional content '.repeat(100) + '\n\n' +
        sampleMarkdownDocument.content + '\n\n' +
        'Even more content to demonstrate scrolling and truncation behavior. '.repeat(50)
    },
    editable: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Document preview with very long content to test scrolling and truncation behavior.'
      }
    }
  }
}
