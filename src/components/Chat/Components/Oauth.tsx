'use client'

import React, { useState, useEffect } from 'react'

interface OAuthModalProps {
  isOpen?: boolean
  authUrl: string
  onClose: () => void
  onSuccess: () => void
  description?: string
}

const OAuthModal: React.FC<OAuthModalProps> = ({
  isOpen = true,
  authUrl,
  onClose,
  onSuccess,
  description   = 'This endpoint requires authentication to sync functions.'
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const handleOpenAuth = () => {
    if (!authUrl) {
      setError('No authentication URL provided')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Open OAuth URL in a new popup window
      const popup = window.open(
        authUrl,
        'oauth-popup',
        'width=600,height=700,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,directories=no,status=no'
      )

      if (!popup) {
        setError('Popup blocked. Please allow popups for this site and try again.')
        setIsLoading(false)
        return
      }

      // Poll for popup closure or success
      const pollTimer = setInterval(() => {
        try {
          if (popup.closed) {
            clearInterval(pollTimer)
            setIsLoading(false)
            // Assume success if popup was closed
            onSuccess()
            onClose()
          }
        } catch (e) {
          // Cross-origin error is expected
          // Continue polling
        }
      }, 1000)

      // Set a timeout to close the popup after 10 minutes
      setTimeout(() => {
        if (!popup.closed) {
          popup.close()
          clearInterval(pollTimer)
          setIsLoading(false)
          setError('Authentication timed out. Please try again.')
        }
      }, 600000) // 10 minutes

    } catch (err) {
      setError('Failed to open authentication window')
      setIsLoading(false)
    }
  }

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(authUrl)
      setError('') // Clear any previous errors
      // Could show a brief success message here
    } catch (err) {
      setError('Failed to copy URL to clipboard')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg p-6 max-w-md w-[90%] shadow-lg">
        <h3 className="text-lg font-bold mb-3 text-primary">
          Authentication Required
        </h3>
        
        <p className="text-sm text-gray-600 mb-4">
          {description}
        </p>

        {error && (
          <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-xs">
            {error}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleOpenAuth}
            disabled={isLoading || !authUrl}
            className={`
              px-4 py-2 text-white border-none rounded text-sm font-bold flex-1
              ${isLoading || !authUrl 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 cursor-pointer'
              }
            `}
          >
            {isLoading ? 'Authenticating...' : 'Authenticate'}
          </button>

          <button
            onClick={handleCopyUrl}
            disabled={!authUrl}
            className={`
              px-4 py-2 text-white border-none rounded text-sm
              ${!authUrl 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
              }
            `}
          >
            Copy URL
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white border-none rounded text-sm cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
export type { OAuthModalProps }
export { OAuthModal }