import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Deal, Customer, Category, Comment } from './types'
import { CalendarIcon, PoundSterling, UserIcon, MessageSquareIcon } from "lucide-react"

type DealDetailsProps = {
  deal: Deal
  customer: Customer | undefined
  categories: Category[]
  onClose: () => void
  onEdit: () => void
  onAddComment: (comment: Comment) => void
  onUpdateDescription: (description: string) => void
}

export default function DealDetails({
  deal,
  customer,
  categories,
  onClose,
  onEdit,
  onAddComment,
  onUpdateDescription,
}: DealDetailsProps) {
  const [newComment, setNewComment] = useState("")
  const [description, setDescription] = useState(deal.description || "")
  const [isEditingDescription, setIsEditingDescription] = useState(false)

  const getCategoryColor = (type: Category["type"]) => {
    switch (type) {
      case "proposition":
        return "bg-blue-100 text-blue-800"
      case "source":
        return "bg-green-100 text-green-800"
      case "sector":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment({
        id: Date.now().toString(),
        text: newComment,
        author: "Current User", // Replace with actual user name or ID
        timestamp: new Date().toISOString(),
      })
      setNewComment("")
    }
  }

  const handleUpdateDescription = () => {
    onUpdateDescription(description)
    setIsEditingDescription(false)
  }
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{customer?.name}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-4">
          <div className="grid gap-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-green-600">£{deal.value.toLocaleString()}</span>
              </div>
              <Button onClick={onEdit}>Edit Deal</Button>
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-gray-500">Assignee</Label>
              <div className="flex items-center space-x-2">
                <UserIcon className="w-4 h-4 text-gray-400" />
                <span>{deal.assignee}</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-gray-500">Description</Label>
              {isEditingDescription ? (
                <div className="flex items-center space-x-2">
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="flex-grow"
                  />
                  <Button onClick={handleUpdateDescription}>Save</Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-gray-700">{deal.description || "No description"}</p>
                  <Button variant="outline" size="sm" onClick={() => setIsEditingDescription(true)}>
                    Edit
                  </Button>
                </div>
              )}
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-gray-500">Status</Label>
              <Badge variant="outline" className="w-fit">
                {deal.status}
              </Badge>
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-gray-500">Categories</Label>
              <div className="flex flex-wrap gap-2">
                {deal.categories.map((catId) => {
                  const category = categories.find((c) => c.id === catId)
                  return category ? (
                    <Badge key={category.id} variant="secondary" className={getCategoryColor(category.type)}>
                      {category.name}
                    </Badge>
                  ) : null
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label className="text-sm font-medium text-gray-500">Date Logged</Label>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4 text-gray-400" />
                  <span>{new Date(deal.dateLogged).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label className="text-sm font-medium text-gray-500">Closure Date</Label>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4 text-gray-400" />
                  <span>{new Date(deal.closureDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-gray-500">Last Modified</Label>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-4 h-4 text-gray-400" />
                <span>{new Date(deal.lastModified).toLocaleString()}</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-gray-500">Comments</Label>
              <div className="space-y-2">
                {deal.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">{comment.text}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {comment.author} - {new Date(comment.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex mt-2">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-grow"
                />
                <Button onClick={handleAddComment} className="ml-2">
                  <MessageSquareIcon className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

