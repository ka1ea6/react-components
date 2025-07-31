import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DocumentEdit } from './document-edit'
import type { KnowledgeDocument } from './types'

const meta: Meta<typeof DocumentEdit> = {
  title: 'Digital Colleagues/DocumentEdit',
  component: DocumentEdit,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A document editing interface that allows users to modify knowledge document properties and content.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    document: {
      control: false,
      description: 'The knowledge document to edit'
    },
    onSave: {
      action: 'document-saved',
      description: 'Callback fired when the document is saved'
    },
    onCancel: {
      action: 'edit-cancelled',
      description: 'Callback fired when editing is cancelled'
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

const emptyDocument: KnowledgeDocument = {
  id: '3',
  title: '',
  description: '',
  format: 'markdown',
  tags: [],
  createdAt: new Date(),
  content: ''
}

const documentWithoutTags: KnowledgeDocument = {
  id: '4',
  title: 'Simple Document',
  description: 'A document without tags for testing',
  format: 'mdx',
  metadata: { category: 'Testing' },
  createdAt: new Date('2024-01-01'),
  content: 'Simple content for testing purposes.'
}

// Wrapper component to handle state management
const DocumentEditWrapper = (args: any) => {
  const [currentDocument, setCurrentDocument] = useState<KnowledgeDocument>(args.document)
  
  const handleSave = (savedDocument: KnowledgeDocument) => {
    setCurrentDocument(savedDocument)
    args.onSave?.(savedDocument)
  }

  const handleCancel = () => {
    // Reset to original document
    setCurrentDocument(args.document)
    args.onCancel?.()
  }

  return (
    <div className="h-screen bg-background">
      <DocumentEdit
        document={currentDocument}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  )
}

export const EditMarkdownDocument: Story = {
  render: DocumentEditWrapper,
  args: {
    document: sampleMarkdownDocument
  },
  parameters: {
    docs: {
      description: {
        story: 'Document editor for a markdown document with comprehensive content and metadata.'
      }
    }
  }
}

export const EditRichTextDocument: Story = {
  render: DocumentEditWrapper,
  args: {
    document: sampleRichTextDocument
  },
  parameters: {
    docs: {
      description: {
        story: 'Document editor for a rich text document with formatted content.'
      }
    }
  }
}

export const EditEmptyDocument: Story = {
  render: DocumentEditWrapper,
  args: {
    document: emptyDocument
  },
  parameters: {
    docs: {
      description: {
        story: 'Document editor starting with an empty document to test creation workflow.'
      }
    }
  }
}

export const EditDocumentWithoutTags: Story = {
  render: DocumentEditWrapper,
  args: {
    document: documentWithoutTags
  },
  parameters: {
    docs: {
      description: {
        story: 'Document editor for a document without tags to test the tags input field.'
      }
    }
  }
}

export const EditLongContent: Story = {
  render: DocumentEditWrapper,
  args: {
    document: {
      ...sampleMarkdownDocument,
      content: sampleMarkdownDocument.content + '\n\n' + 
        'Additional content section with more details. '.repeat(20) + '\n\n' +
        sampleMarkdownDocument.content + '\n\n' +
        'Even more content to test the textarea scrolling behavior. '.repeat(30) + '\n\n' +
        '## Additional Section\n\nMore content here to make it really long and test the editing experience with substantial content.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Document editor with very long content to test textarea behavior and scrolling.'
      }
    }
  }
}

export const EditMinimalDocument: Story = {
  render: DocumentEditWrapper,
  args: {
    document: {
      id: '5',
      title: 'Minimal Doc',
      format: 'markdown' as const,
      createdAt: new Date(),
      content: 'Just basic content.'
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Document editor with minimal fields to test the layout with fewer properties.'
      }
    }
  }
}

export const EditMdxDocument: Story = {
  render: DocumentEditWrapper,
  args: {
    document: {
      id: '6',
      title: 'MDX Component Guide',
      description: 'Interactive guide for MDX components',
      format: 'mdx' as const,
      metadata: { 
        category: 'Documentation', 
        interactive: true,
        complexity: 'Advanced'
      },
      tags: ['mdx', 'components', 'react', 'documentation'],
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2024-06-15'),
      content: `# MDX Component Guide

This is an interactive MDX document that combines markdown with React components.

## Basic Usage

\`\`\`mdx
import { Button } from './components/Button'

# My Document

Here's a custom component:

<Button variant="primary">Click me!</Button>
\`\`\`

## Advanced Features

MDX allows you to:
- Use React components directly in markdown
- Pass props to components
- Create interactive documentation
- Combine content with functionality

<CustomComponent prop="value" />

## Best Practices

1. Keep components simple and focused
2. Document component props clearly
3. Test interactive elements thoroughly
4. Maintain good performance`
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Document editor for an MDX document with React components and interactive content.'
      }
    }
  }
}
