import type { Meta, StoryObj } from '@storybook/react'
import { OAuthModal } from './Oauth'

const meta: Meta<typeof OAuthModal> = {
  title: 'Chat/Components/OAuth Modal',
  component: OAuthModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modal component for handling OAuth authentication flows. Opens a popup window for OAuth authentication and handles success/error states.',
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open or closed',
    },
    authUrl: {
      control: 'text',
      description: 'The OAuth authentication URL to open in the popup',
    },
    onClose: {
      action: 'onClose',
      description: 'Callback function called when the modal is closed',
    },
    onSuccess: {
      action: 'onSuccess',
      description: 'Callback function called when authentication is successful',
    },
    
    description: {
      control: 'text',
      description: 'Optional description text shown in the modal',
    },
  },
}

export default meta
type Story = StoryObj<typeof OAuthModal>

export const Default: Story = {
  name: 'Basic OAuth Modal',
  args: {
    isOpen: true,
    authUrl: 'https://accounts.google.com/oauth/authorize?client_id=123&redirect_uri=callback&scope=email&response_type=code',
    description: 'This endpoint requires authentication to sync functions.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default OAuth modal with Google OAuth URL example.',
      },
    },
  },
}


export const NoDescription: Story = {
  name: 'Without Description',
  args: {
    isOpen: true,
    authUrl: 'https://oauth.example.com/authorize?client_id=test123&response_type=code',
  },
  parameters: {
    docs: {
      description: {
        story: 'OAuth modal without a specific endpoint name - shows generic messaging.',
      },
    },
  },
}

export const CustomDescription: Story = {
  name: 'Custom Description',
  args: {
    isOpen: true,
    authUrl: 'https://api.notion.com/v1/oauth/authorize?client_id=notion123&response_type=code&owner=user',
    endpointName: 'Notion Workspace',
    description: 'Connect to your Notion workspace to sync pages and databases with our AI assistant.',
  },
  parameters: {
    docs: {
      description: {
        story: 'OAuth modal with custom description text.',
      },
    },
  },
}

export const LongUrl: Story = {
  name: 'Long Authentication URL',
  args: {
    isOpen: true,
    authUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=very-long-client-id-12345&response_type=code&redirect_uri=https://myapp.example.com/auth/microsoft/callback&scope=https://graph.microsoft.com/User.Read%20https://graph.microsoft.com/Files.ReadWrite&state=random_state_value_that_is_quite_long&prompt=consent',
    endpointName: 'Microsoft Graph API',
    description: 'Access your Microsoft 365 data including OneDrive files and user profile.',
  },
  parameters: {
    docs: {
      description: {
        story: 'OAuth modal with a very long authentication URL to test URL display handling.',
      },
    },
  },
}

export const Closed: Story = {
  name: 'Modal Closed',
  args: {
    isOpen: false,
    authUrl: 'https://oauth.example.com/authorize',
    endpointName: 'Example API',
  },
  parameters: {
    docs: {
      description: {
        story: 'OAuth modal in closed state - should render nothing.',
      },
    },
  },
}
