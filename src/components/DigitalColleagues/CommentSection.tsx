
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MessageSquare, Send } from 'lucide-react';

interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: Date;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        <Label className="text-lg font-medium">Comments</Label>
        <Badge variant="secondary">{comments.length}</Badge>
      </div>

      {/* Comments List */}
      <div className="space-y-4 max-h-60 overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
            <Avatar className="h-8 w-8 mt-1">
              <AvatarFallback className="text-xs bg-gray-200 text-gray-700">
                {getInitials(comment.author)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{comment.author}</span>
                <span className="text-xs text-gray-500">
                  {comment.createdAt.toLocaleDateString()} at {comment.createdAt.toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm text-gray-700">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment */}
      <div className="flex gap-2">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          rows={2}
          className="flex-1 resize-none"
        />
        <Button
          onClick={handleAddComment}
          disabled={!newComment.trim()}
          size="sm"
          className="self-end"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
