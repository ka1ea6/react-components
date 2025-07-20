import type { UIMessage } from "ai"

// Re-export UIMessage for convenience
export type { UIMessage }

// File upload types (for client-side before sending to AI)
export interface FileUpload {
  id: string
  file: File
  preview?: string
  status: 'pending' | 'uploading' | 'uploaded' | 'error'
  progress?: number
}

// Helper function to extract text content from UIMessage parts
export function getTextContent(message: UIMessage): string {
  return message.parts
    .filter(part => part.type === 'text')
    .map(part => (part as any).text)
    .join('')
}

// Helper function to check if message has a specific tool
export function hasToolPart(message: UIMessage, toolName: string): boolean {
  return message.parts.some(part => part.type === `tool-${toolName}`)
}

// Helper function to get tool part by name
export function getToolPart(message: UIMessage, toolName: string) {
  return message.parts.find(part => part.type === `tool-${toolName}`)
}

// Helper function to check if message has files
export function hasFilePart(message: UIMessage): boolean {
  return message.parts.some(part => part.type === 'file')
}

// Helper function to get file parts
export function getFileParts(message: UIMessage) {
  return message.parts.filter(part => part.type === 'file')
}

// Helper function to check if message has data parts (for custom UI components)
export function hasDataPart(message: UIMessage, dataType: string): boolean {
  return message.parts.some(part => part.type === `data-${dataType}`)
}

// Helper function to get data part by type
export function getDataPart(message: UIMessage, dataType: string) {
  return message.parts.find(part => part.type === `data-${dataType}`)
}
