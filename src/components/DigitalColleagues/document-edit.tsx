"use client"

import { motion } from "framer-motion"
import { Edit3, Save, X, Plus, ChevronDown, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { KnowledgeDocument, KnowledgeContext } from "./types"

interface DocumentEditProps {
  document: KnowledgeDocument
  onSave: (document: KnowledgeDocument) => void
  onCancel: () => void
  availableDocuments?: KnowledgeDocument[]
  knowledgeContexts?: KnowledgeContext[]
}

export function DocumentEdit({ 
  document, 
  onSave, 
  onCancel,
  availableDocuments = [],
  knowledgeContexts = []
}: DocumentEditProps) {
  const [editedDocument, setEditedDocument] = useState<KnowledgeDocument>({
    ...document,
    updatedAt: new Date()
  })
  const [isMetadataExpanded, setIsMetadataExpanded] = useState(false)
  const [isEditingTitle, setIsEditingTitle] = useState(false)

  // Extract suggested metadata keys from knowledge contexts and existing documents
  const getSuggestedMetadataKeys = () => {
    const keysFromContexts = new Set<string>()
    const keysFromDocuments = new Set<string>()
    
    // Get keys from knowledge contexts (used for grouping)
    knowledgeContexts.forEach(context => {
      context.menuConfig.groupBy.forEach(key => keysFromContexts.add(key))
    })
    
    // Get keys from existing documents
    availableDocuments.forEach(doc => {
      if (doc.metadata) {
        Object.keys(doc.metadata).forEach(key => keysFromDocuments.add(key))
      }
    })
    
    return {
      contextKeys: Array.from(keysFromContexts).sort(),
      documentKeys: Array.from(keysFromDocuments).sort(),
      allKeys: Array.from(new Set([...keysFromContexts, ...keysFromDocuments])).sort()
    }
  }

  // Get suggested values for a specific metadata key
  const getSuggestedValues = (key: string) => {
    const values = new Set<string>()
    availableDocuments.forEach(doc => {
      if (doc.metadata?.[key]) {
        values.add(String(doc.metadata[key]))
      }
    })
    return Array.from(values).sort()
  }

  const suggestedKeys = getSuggestedMetadataKeys()

  const handleSave = () => {
    onSave(editedDocument)
  }

  const handleMetadataChange = (key: string, value: string) => {
    setEditedDocument(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [key]: value
      }
    }))
  }

  const handleMetadataValueSelect = (key: string, value: string) => {
    if (value === '__custom__') {
      // Just clear the value and let user type in the select field
      handleMetadataChange(key, '')
    } else {
      handleMetadataChange(key, value)
    }
  }

  const handleAddMetadataField = () => {
    const newKey = `field_${Date.now()}`
    handleMetadataChange(newKey, '')
  }

  const handleRemoveMetadataField = (key: string) => {
    setEditedDocument(prev => {
      const newMetadata = { ...prev.metadata }
      delete newMetadata[key]
      return { ...prev, metadata: newMetadata }
    })
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
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Edit3 className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              {isEditingTitle ? (
                <Input
                  value={editedDocument.title}
                  onChange={(e) => setEditedDocument(prev => ({ ...prev, title: e.target.value }))}
                  onBlur={() => setIsEditingTitle(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setIsEditingTitle(false)
                    if (e.key === 'Escape') {
                      setEditedDocument(prev => ({ ...prev, title: document.title }))
                      setIsEditingTitle(false)
                    }
                  }}
                  autoFocus
                  className="text-xl font-bold border-none p-0 h-auto bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Document title..."
                />
              ) : (
                <div className="flex items-center gap-2 group">
                  <h1 
                    className="text-xl font-bold text-foreground cursor-pointer hover:text-primary transition-colors py-1"
                    onClick={() => setIsEditingTitle(true)}
                    title="Click to edit title"
                  >
                    {editedDocument.title || 'Untitled Document'}
                  </h1>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingTitle(true)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                  >
                    <Edit3 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
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
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Description
            </label>
            <Input
              value={editedDocument.description || ''}
              onChange={(e) => setEditedDocument(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description..."
              className="text-sm"
            />
          </div>

          {/* Collapsible Metadata Fields */}
          <div>
            <button
              type="button"
              onClick={() => setIsMetadataExpanded(!isMetadataExpanded)}
              className="flex items-center justify-between w-full p-3 bg-muted/20 hover:bg-muted/30 rounded-lg border border-border transition-colors"
            >
              <div className="flex items-center gap-2">
                {isMetadataExpanded ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm font-medium text-foreground">
                  Metadata
                </span>
                {editedDocument.metadata && Object.keys(editedDocument.metadata).length > 0 && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {Object.keys(editedDocument.metadata).length} field{Object.keys(editedDocument.metadata).length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {suggestedKeys.contextKeys.length > 0 && !isMetadataExpanded && (
                  <span className="text-xs text-muted-foreground">
                    {suggestedKeys.contextKeys.slice(0, 2).join(', ')}
                    {suggestedKeys.contextKeys.length > 2 && '...'}
                  </span>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddMetadataField()
                    setIsMetadataExpanded(true)
                  }}
                  className="gap-1 h-6 px-2"
                >
                  <Plus className="h-3 w-3" />
                  Add
                </Button>
              </div>
            </button>
            
            {isMetadataExpanded && (
              <div className="mt-3 space-y-2 pl-6">
                {editedDocument.metadata && Object.keys(editedDocument.metadata).length > 0 ? (
                  Object.entries(editedDocument.metadata).map(([key, value]) => {
                    const suggestedValues = getSuggestedValues(key)
                    return (
                      <div key={key} className="flex gap-2 items-center">
                        <Input
                          value={key}
                          onChange={(e) => {
                            const newKey = e.target.value
                            const oldValue = editedDocument.metadata?.[key]
                            setEditedDocument(prev => {
                              const newMetadata = { ...prev.metadata }
                              delete newMetadata[key]
                              if (newKey) {
                                newMetadata[newKey] = oldValue || ''
                              }
                              return { ...prev, metadata: newMetadata }
                            })
                          }}
                          placeholder="Key"
                          className="w-32 h-8 text-sm"
                          list={`metadata-keys-${key}`}
                        />
                        <datalist id={`metadata-keys-${key}`}>
                          {suggestedKeys.allKeys.map(suggestedKey => (
                            <option key={suggestedKey} value={suggestedKey} />
                          ))}
                        </datalist>
                        
                        <span className="text-muted-foreground text-sm">=</span>
                        
                        {suggestedValues.length > 0 ? (
                          <Select 
                            value={String(value || '')} 
                            onValueChange={(newValue) => handleMetadataValueSelect(key, newValue)}
                          >
                            <SelectTrigger className="flex-1 h-8 text-sm">
                              <SelectValue placeholder="Value" />
                            </SelectTrigger>
                            <SelectContent>
                              {suggestedValues.map(suggestedValue => (
                                <SelectItem key={suggestedValue} value={suggestedValue}>
                                  {suggestedValue}
                                </SelectItem>
                              ))}
                              <SelectItem value="__custom__">
                                <span className="text-muted-foreground text-xs">Custom...</span>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            value={String(value || '')}
                            onChange={(e) => handleMetadataChange(key, e.target.value)}
                            placeholder="Value"
                            className="flex-1 h-8 text-sm"
                          />
                        )}
                        
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveMetadataField(key)}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )
                  })
                ) : (
                  <div className="text-center py-3 border border-dashed border-border rounded-lg bg-muted/10">
                    <p className="text-xs text-muted-foreground">
                      No metadata fields yet
                    </p>
                  </div>
                )}
              </div>
            )}
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
