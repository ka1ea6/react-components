import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CopilotInterface } from './CopilotInterface'

// Mock framer-motion to avoid animation-related issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}))

// Mock the DigitalColleageusLayout component to simplify testing
vi.mock('../DigitalColleagues/DigitalColleageusLayout', () => ({
  DigitalColleageusLayout: ({ children, title, ...props }: any) => (
    <div data-testid="digital-colleagues-layout" data-title={title} {...props}>
      {children}
    </div>
  ),
}))

// Mock the ChatSessionSidebar component
vi.mock('./chat-session-sidebar', () => ({
  ChatSessionSidebar: ({ sessions }: any) => (
    <div data-testid="chat-session-sidebar">
      Sessions: {sessions?.length || 0}
    </div>
  ),
}))

// Mock the AIChatInterface component
vi.mock('../.archive/ai-chat-interface', () => ({
  AIChatInterface: ({ messages, capabilities, businessUnit }: any) => (
    <div data-testid="ai-chat-interface">
      <div data-testid="messages-count">Messages: {messages?.length || 0}</div>
      <div data-testid="capabilities-count">Capabilities: {capabilities?.length || 0}</div>
      <div data-testid="business-unit">Business Unit: {businessUnit?.name || 'none'}</div>
    </div>
  ),
}))

describe('CopilotInterface', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('when app props are undefined', () => {
    it('renders with default values when no props are provided', () => {
      render(<CopilotInterface />)
      
      // Should render the main layout
      expect(screen.getByTestId('digital-colleagues-layout')).toBeTruthy()
      
      // Should have default title
      const layoutElement = screen.getByTestId('digital-colleagues-layout')
      expect(layoutElement.getAttribute('data-title')).toBe('Digital Colleagues')
      
      // Should render chat interface components
      expect(screen.getByTestId('chat-session-sidebar')).toBeTruthy()
      expect(screen.getByTestId('ai-chat-interface')).toBeTruthy()
    })

    it('uses default values for all optional props when undefined', () => {
      render(<CopilotInterface />)
      
      // Check that chat session sidebar shows 0 sessions (default)
      expect(screen.getByText('Sessions: 0')).toBeTruthy()
      
      // Check that AI chat interface shows default message count
      const messagesCount = screen.getByTestId('messages-count')
      expect(messagesCount.textContent).toContain('Messages: 1') // Default welcome message
    })

    it('handles undefined initialTeam prop with default value', () => {
      render(<CopilotInterface initialTeam={undefined} />)
      
      // Should still render without errors
      expect(screen.getByTestId('digital-colleagues-layout')).toBeTruthy()
      expect(screen.getByTestId('ai-chat-interface')).toBeTruthy()
    })

    it('handles undefined initialMessages prop', () => {
      render(<CopilotInterface initialMessages={undefined} />)
      
      // Should render with default messages
      const messagesCount = screen.getByTestId('messages-count')
      expect(messagesCount.textContent).toContain('Messages: 1') // Default welcome message
    })

    it('handles undefined initialSessions prop', () => {
      render(<CopilotInterface initialSessions={undefined} />)
      
      // Should render chat session sidebar with no sessions
      expect(screen.getByText('Sessions: 0')).toBeTruthy()
    })

    it('handles undefined showCapabilities prop with default value', () => {
      render(<CopilotInterface showCapabilities={undefined} />)
      
      // Should still render the AI chat interface
      expect(screen.getByTestId('ai-chat-interface')).toBeTruthy()
    })

    it('handles undefined title prop with default value', () => {
      render(<CopilotInterface title={undefined} />)
      
      // Should use default title
      const layoutElement = screen.getByTestId('digital-colleagues-layout')
      expect(layoutElement.getAttribute('data-title')).toBe('Digital Colleagues')
    })

    it('handles undefined businessUnits prop with default value', () => {
      render(<CopilotInterface businessUnits={undefined} />)
      
      // Should still render without errors
      expect(screen.getByTestId('digital-colleagues-layout')).toBeTruthy()
      expect(screen.getByTestId('ai-chat-interface')).toBeTruthy()
    })

    it('handles undefined enableFileUpload prop with default value', () => {
      render(<CopilotInterface enableFileUpload={undefined} />)
      
      // Should still render without errors
      expect(screen.getByTestId('ai-chat-interface')).toBeTruthy()
    })

    it('handles undefined maxFileSize prop with default value', () => {
      render(<CopilotInterface maxFileSize={undefined} />)
      
      // Should still render without errors
      expect(screen.getByTestId('ai-chat-interface')).toBeTruthy()
    })

    it('handles undefined allowedFileTypes prop with default value', () => {
      render(<CopilotInterface allowedFileTypes={undefined} />)
      
      // Should still render without errors
      expect(screen.getByTestId('ai-chat-interface')).toBeTruthy()
    })

    it('handles completely empty props object', () => {
      render(<CopilotInterface {...{}} />)
      
      // Should render with all default values
      expect(screen.getByTestId('digital-colleagues-layout')).toBeTruthy()
      expect(screen.getByTestId('chat-session-sidebar')).toBeTruthy()
      expect(screen.getByTestId('ai-chat-interface')).toBeTruthy()
      
      // Check default title
      const layoutElement = screen.getByTestId('digital-colleagues-layout')
      expect(layoutElement.getAttribute('data-title')).toBe('Digital Colleagues')
      
      // Check default session count
      expect(screen.getByText('Sessions: 0')).toBeTruthy()
    })
  })
})
