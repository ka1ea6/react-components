import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UserIcon, CalendarIcon, SaveIcon, Edit2Icon, PlusIcon } from 'lucide-react'
import type { Deal, CRMCustomer, Comment, CRMCategory, User } from './types'

type DealDetailsProps = {
  deal: Deal
  users?: User[]
  customer: CRMCustomer | undefined
  categories: CRMCategory[]
  onClose: () => void
  onSave: (deal: Deal) => void
  onAddComment: (comment: Comment) => void
}

export function DealDetails({
  deal,
  users,
  customer,
  categories,
  onClose,
  onSave,
  onAddComment,
}: DealDetailsProps) {
  const [editedDeal, setEditedDeal] = useState<Deal>({ ...deal, value: deal.value || 0 })
  const [newComment, setNewComment] = useState('')
  const [hasChanges, setHasChanges] = useState(false)
  const [editingField, setEditingField] = useState<string | null>(null)

  useEffect(() => {
    setHasChanges(JSON.stringify(deal) !== JSON.stringify(editedDeal))
  }, [deal, editedDeal])

  const handleSave = () => {
    onSave(editedDeal)
    setHasChanges(false)
    setEditingField(null)
  }

  const handleChange = (field: keyof Deal, value: any) => {
    setEditedDeal((prev) => ({ ...prev, [field]: value }))
  }

  const handleCategoryChange = (categoryId: string) => {
    const updatedCategories = editedDeal.categories.includes(categoryId)
      ? editedDeal.categories.filter((id) => id !== categoryId)
      : [...editedDeal.categories, categoryId]
    handleChange('categories', updatedCategories)
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment({
        id: Date.now().toString(),
        text: newComment,
        // author: "Current User", // Replace with actual user name or ID
        timestamp: new Date().toISOString(),
      })
      setNewComment('')
    }
  }

  const getCategoryColor = (type: CRMCategory['type']) => {
    switch (type) {
      case 'proposition':
        return 'bg-blue-100 text-blue-800'
      case 'source':
        return 'bg-green-100 text-green-800'
      case 'sector':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const renderEditableField = (field: keyof Deal, label: string, icon: React.ReactNode) => {
    const isEditing = editingField === field
    return (
      <div className="grid gap-2">
        <Label className="text-sm font-medium text-gray-500">{label}</Label>
        <div className="flex items-center space-x-2">
          {icon}
          {isEditing ? (
            <Input
              value={editedDeal[field] as string}
              onChange={(e) => handleChange(field, e.target.value)}
              onBlur={() => setEditingField(null)}
              autoFocus
            />
          ) : (
            <div
              className="flex-grow cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => setEditingField(field)}
            >
              {editedDeal[field] as string}
            </div>
          )}
          {!isEditing && (
            <Button variant="ghost" size="sm" onClick={() => setEditingField(field)}>
              <Edit2Icon className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <Dialog open={true}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col [&>button:last-child]:hidden">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold">{customer?.name}</DialogTitle>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges}>
              <SaveIcon className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-4">
          {/* row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="grid gap-2">
              {editingField === 'value' ? (
                <Input
                  type="number"
                  value={editedDeal.value}
                  onChange={(e) => handleChange('value', Number(e.target.value))}
                  onBlur={() => setEditingField(null)}
                  className="text-3xl font-bold text-green-600"
                  autoFocus
                />
              ) : (
                <div
                  className="text-3xl font-bold text-green-600 cursor-pointer hover:bg-gray-100 p-0 rounded"
                  onClick={() => setEditingField('value')}
                >
                  £{editedDeal.value?.toLocaleString()}
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-gray-500">Assignee</Label>
              {editingField === 'assignee' ? (

                <Select value={editedDeal.assignee} onValueChange={(value) => handleChange('assignee', value)}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select assignee" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {users && users.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                                        {user.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                // <Input
                //   value={editedDeal.assignee}
                //   onChange={(e) => handleChange('assignee', e.target.value)}
                //   placeholder="Enter assignee name"
                // />
              ) : (
                <div
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-0 rounded"
                  onClick={() => setEditingField('assignee')}
                >
                  <UserIcon className="w-4 h-4 text-gray-400" />
                  <span>{editedDeal.assignee}</span>
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-gray-500">Closure Date</Label>
              {editingField === 'closureDate' ? (
                <Input
                  type="date"
                  value={editedDeal.closureDate.split('T')[0]}
                  onChange={(e) => handleChange('closureDate', e.target.value)}
                  onBlur={() => setEditingField(null)}
                  autoFocus
                />
              ) : (
                <div
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-0 rounded"
                  onClick={() => setEditingField('closureDate')}
                >
                  <CalendarIcon className="w-4 h-4 text-gray-400" />
                  <span>{new Date(editedDeal.closureDate).toLocaleDateString('en-GB')}</span>
                </div>
              )}
            </div>
            {/* row 2 */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-gray-500">Description</Label>
              {editingField === 'description' ? (
                <Textarea
                  value={editedDeal.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  onBlur={() => setEditingField(null)}
                  className="min-h-[100px]"
                  autoFocus
                />
              ) : (
                <div
                  className="cursor-pointer hover:bg-gray-100 pb-5 rounded"
                  onClick={() => setEditingField('description')}
                >
                  {editedDeal.description}
                </div>
              )}
            </div>
          </div>

          {/* row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 pt-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-gray-500">Status</Label>
              {editingField === 'status' ? (
                <Select
                  value={editedDeal.status}
                  onValueChange={(value) => {
                    handleChange('status', value)
                    setEditingField(null)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Cold', 'Qualified', 'Proposal Made', 'Won', 'Lost'].map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div
                  className="cursor-pointer hover:bg-gray-100 p-0 rounded"
                  onClick={() => setEditingField('status')}
                >
                  {editedDeal.status}
                </div>
              )}
            </div>
            <div className="grid col-span-2 gap-2">
              <Label className="text-sm font-medium text-gray-500">Categories</Label>
              {editingField === 'categories' ? (
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        checked={editedDeal.categories.includes(category.id)}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                      />
                      <label
                        htmlFor={category.id}
                        className={`text-sm font-medium ${getCategoryColor(category.type)} px-2 py-1 rounded`}
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="flex flex-wrap gap-2 cursor-pointer hover:bg-gray-100 p-0 rounded"
                  onClick={() => setEditingField('categories')}
                >
                  {editedDeal.categories.map((catId) => {
                    const category = categories.find((c) => c.id === catId)
                    return category ? (
                      <Badge
                        key={category.id}
                        variant="secondary"
                        className={getCategoryColor(category.type)}
                      >
                        {category.name}
                      </Badge>
                    ) : null
                  })}
                </div>
              )}
            </div>
          </div>

          {/* <div className="grid gap-2">
              <Label className="text-sm font-medium text-gray-500">Date Logged</Label>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-4 h-4 text-gray-400" />
                <span>{new Date(editedDeal.dateLogged).toLocaleDateString()}</span>
              </div>
            </div> */}
          <div className="grid grid-cols-1 sm:grid-cols-1 pt-4 gap-4">
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-gray-500">Comments</Label>
              <ScrollArea className="h-[200px] overflow-y-auto">
                <div className="space-y-2">
                  {editedDeal.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">{comment.text}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {comment.author} - {new Date(comment.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex mt-2">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-grow"
                />
                <Button onClick={handleAddComment} className="ml-2">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-4">
              Last modified: {new Date(editedDeal.lastModified).toLocaleString()}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
