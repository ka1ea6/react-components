"use client"

import { motion } from "framer-motion"
import { File, FileText, Edit3 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DocumentEdit } from "./document-edit"
import type { KnowledgeDocument } from "./types"

interface DocumentPreviewProps {
  document: KnowledgeDocument
  onDocumentUpdate?: (document: KnowledgeDocument) => void
  editable?: boolean
}

export function DocumentPreview({ document, onDocumentUpdate, editable = true }: DocumentPreviewProps) {
  const [isEditing, setIsEditing] = useState(false)

  const formatIcon = (format: string) => {
    switch (format) {
      case 'markdown':
      case 'mdx':
        return <FileText className="h-6 w-6 text-primary" />
      case 'richtext':
        return <File className="h-6 w-6 text-success" />
      default:
        return <File className="h-6 w-6 text-muted-foreground" />
    }
  }

  const formatBadgeColor = (format: string) => {
    switch (format) {
      case 'markdown':
        return 'bg-primary/10 text-primary border-primary/20'
      case 'mdx':
        return 'bg-secondary/10 text-secondary border-secondary/20'
      case 'richtext':
        return 'bg-success/10 text-success border-success/20'
      default:
        return 'bg-muted text-muted-foreground border-border'
    }
  }

  const handleSave = (updatedDocument: KnowledgeDocument) => {
    setIsEditing(false)
    onDocumentUpdate?.(updatedDocument)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <DocumentEdit
        document={document}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="border-b border-border bg-card p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className="flex-shrink-0 p-3 rounded-xl bg-muted border border-border">
              {formatIcon(document.format)}
            </div>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-foreground mb-2 leading-tight">
                {document.title}
              </h1>
              
              {document.description && (
                <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                  {document.description}
                </p>
              )}
            </div>
          </div>

          {editable && (
            <div className="flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="gap-2"
              >
                <Edit3 className="h-4 w-4" />
                Edit
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${formatBadgeColor(document.format)}`}>
            {document.format.toUpperCase()}
          </span>
          
          {document.tags?.map((tag) => (
            <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground border border-border">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Metadata Section */}
          {document.metadata && Object.keys(document.metadata).length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-2">Metadata</h3>
              <div className="bg-muted rounded-lg p-3 border border-border">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-1 text-xs">
                  {Object.entries(document.metadata).map(([key, value]) => (
                    <div key={key} className="flex gap-1">
                      <span className="text-muted-foreground font-medium">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-foreground truncate">
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Content Preview */}
          <div className="space-y-4">
            {document.content ? (
              <div className="relative">
                <div className="bg-card border border-border rounded-xl p-6 overflow-hidden">
                  <pre className="text-card-foreground text-sm leading-relaxed whitespace-pre-wrap font-mono">
                    {document.content.substring(0, 1500)}
                    {document.content.length > 1500 && '...'}
                  </pre>
                </div>
                
                {document.content.length > 1500 && (
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent rounded-b-xl flex items-end justify-center pb-2">
                    <span className="text-muted-foreground text-xs">Content truncated</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted rounded-xl border-2 border-dashed border-border">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background flex items-center justify-center">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h4 className="text-foreground font-medium mb-1">No content available</h4>
                <p className="text-muted-foreground text-sm">This document doesn't have preview content</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
