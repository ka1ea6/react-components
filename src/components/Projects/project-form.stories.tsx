import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ProjectForm } from './project-form'
import { ProjectFormData } from '../DigitalColleagues/types'

const meta: Meta<typeof ProjectForm> = {
  title: 'Projects/ProjectForm',
  component: ProjectForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A reusable form component for creating new projects with validation and loading states.'
      }
    }
  },
  argTypes: {
    onSubmit: { action: 'submitted' },
    onCancel: { action: 'cancelled' },
    isLoading: {
      control: 'boolean',
      description: 'Shows loading state when form is being submitted'
    },
    initialData: {
      control: 'object',
      description: 'Initial form data for editing existing projects'
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof ProjectForm>

// Mock submission handler for stories
const mockSubmit = async (data: ProjectFormData) => {
  action('Form submitted')(data)
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000))
}

export const Default: Story = {
  args: {
    onSubmit: mockSubmit,
    onCancel: action('Form cancelled'),
    isLoading: false
  }
}

export const WithInitialData: Story = {
  args: {
    onSubmit: mockSubmit,
    onCancel: action('Form cancelled'),
    isLoading: false,
    initialData: {
      name: 'E-commerce Platform',
      objectives: 'Build a modern, scalable e-commerce platform that provides excellent user experience and supports high traffic volumes.',
      workInstructions: 'Follow agile development practices with daily standups, weekly sprint planning, and code reviews. Use TypeScript and React for frontend, Node.js for backend. Ensure all code is well-tested and documented.',
      plan: true
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Form pre-populated with existing project data for editing scenarios.'
      }
    }
  }
}

export const Loading: Story = {
  args: {
    onSubmit: mockSubmit,
    onCancel: action('Form cancelled'),
    isLoading: true,
    initialData: {
      name: 'Sample Project',
      objectives: 'Sample objectives for demonstration',
      workInstructions: 'Sample work instructions for the loading state demonstration',
      plan: false
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Form in loading state during submission.'
      }
    }
  }
}

export const WithoutCancel: Story = {
  args: {
    onSubmit: mockSubmit,
    isLoading: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Form without cancel button - useful for modal or dedicated page scenarios.'
      }
    }
  }
}

export const CompactLayout: Story = {
  args: {
    onSubmit: mockSubmit,
    onCancel: action('Form cancelled'),
    isLoading: false,
    className: 'max-w-lg'
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact form layout with reduced maximum width.'
      }
    }
  }
}

// Interactive story that shows validation in action
export const ValidationDemo: Story = {
  args: {
    onSubmit: async (data: ProjectFormData) => {
      action('Validation Demo - Form submitted')(data)
      await new Promise(resolve => setTimeout(resolve, 1000))
    },
    onCancel: action('Validation Demo - Form cancelled'),
    isLoading: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Try submitting the form with empty or insufficient data to see validation in action.'
      }
    }
  }
}
