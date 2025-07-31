"use client"

import { motion } from "framer-motion"
import { Edit3, Save, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { KnowledgeDocument } from "./types"

interface DocumentEditProps {
  document: KnowledgeDocument
  onSave: (document: KnowledgeDocument) => void
  onCancel: () => void
}

export function DocumentEdit({ document, onSave, onCancel }: DocumentEditProps) {
  const [editedDocument, setEditedDocument] = useState<KnowledgeDocument>({
    ...document,
    updatedAt: new Date()
  })

  const handleSave = () => {
    onSave(editedDocument)
  }

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    setEditedDocument(prev => ({ ...prev, tags }))
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
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Edit3 className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Edit Document</h1>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Title
            </label>
            <Input
              value={editedDocument.title}
              onChange={(e) => setEditedDocument(prev => ({ ...prev, title: e.target.value }))}
              className="text-lg font-semibold"
              placeholder="Document title..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <Textarea
              value={editedDocument.description || ''}
              onChange={(e) => setEditedDocument(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Document description..."
              rows={2}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tags (comma-separated)
            </label>
            <Input
              value={editedDocument.tags?.join(', ') || ''}
              onChange={(e) => handleTagsChange(e.target.value)}
              placeholder="tag1, tag2, tag3..."
            />
          </div>

          {/* Format Display */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Format:</span>
            <Badge variant="secondary" className="font-mono">
              {editedDocument.format.toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <label className="block text-sm font-medium text-foreground mb-4">
            Content
          </label>
          <Textarea
            value={editedDocument.content || ''}
            onChange={(e) => setEditedDocument(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Document content..."
            className="min-h-[400px] font-mono text-sm"
            style={{ resize: 'vertical' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
