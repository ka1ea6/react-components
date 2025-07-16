
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Task, Epic, Sprint } from '../DigitalColleagues/types';
import { EditableField } from './EditableField';
import { CommentSection } from './CommentSection';
import { TaskSidebar } from './TaskSidebar';
import { Loader2, Check, X } from 'lucide-react';

interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: Date;
}

type UpdateState = 'idle' | 'loading' | 'success' | 'error';

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  epics: Epic[];
  sprints: Sprint[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  onDeleteTask: (taskId: string) => Promise<void>;
}

export const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  isOpen,
  onClose,
  task,
  epics,
  sprints,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [updateState, setUpdateState] = useState<UpdateState>('idle');
  const [deleteState, setDeleteState] = useState<UpdateState>('idle');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      text: 'Initial task created and assigned.',
      author: 'System',
      createdAt: task.createdAt,
    },
    {
      id: '2',
      text: 'Started working on the implementation.',
      author: task.assignee,
      createdAt: new Date(task.createdAt.getTime() + 86400000), // +1 day
    },
  ]);

  const handleFieldUpdate = async (fieldName: string, value: string) => {
    if (value !== task[fieldName as keyof Task]) {
      setUpdateState('loading');
      try {
        await onUpdateTask(task.id, { [fieldName]: value });
        setLastUpdated(new Date());
        setUpdateState('success');
        // Reset to idle after showing success
        setTimeout(() => setUpdateState('idle'), 1500);
      } catch (error) {
        setUpdateState('error');
        // Reset to idle after showing error
        setTimeout(() => setUpdateState('idle'), 3000);
      }
    }
  };

  const handleSidebarUpdate = async (fieldName: string, value: string) => {
    if (value !== task[fieldName as keyof Task]) {
      setUpdateState('loading');
      try {
        await onUpdateTask(task.id, { [fieldName]: value });
        setLastUpdated(new Date());
        setUpdateState('success');
        // Reset to idle after showing success
        setTimeout(() => setUpdateState('idle'), 1500);
      } catch (error) {
        setUpdateState('error');
        // Reset to idle after showing error
        setTimeout(() => setUpdateState('idle'), 3000);
      }
    }
  };

  const handleAddComment = (text: string) => {
    const comment: Comment = {
      id: Date.now().toString(),
      text,
      author: 'Current User', // In a real app, this would be the logged-in user
      createdAt: new Date(),
    };
    setComments([...comments, comment]);
  };

  const handleDelete = async () => {
    setDeleteState('loading');
    try {
      await onDeleteTask(task.id);
      setDeleteState('success');
      // Close modal after successful deletion
      setTimeout(() => {
        onClose();
        setDeleteState('idle');
      }, 1000);
    } catch (error) {
      setDeleteState('error');
      // Reset to idle after showing error
      setTimeout(() => setDeleteState('idle'), 3000);
    }
  };

  // Prevent closing when operations are in progress
  const canClose = updateState !== 'loading' && deleteState !== 'loading';

  const handleClose = () => {
    if (canClose) {
      onClose();
    }
  };

  const renderStatusIndicator = () => {
    if (updateState === 'loading') {
      return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Updating...</span>
        </div>
      );
    }
    
    if (updateState === 'success') {
      return (
        <div className="flex items-center gap-2 text-sm text-success">
          <Check className="h-4 w-4" />
          <span>Updated successfully</span>
        </div>
      );
    }
    
    if (updateState === 'error') {
      return (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <X className="h-4 w-4" />
          <span>Update failed</span>
        </div>
      );
    }
    
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle className="sr-only">{task.title}</DialogTitle>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {renderStatusIndicator()}
            </div>
            {!canClose && (
              <div className="text-xs text-muted-foreground">
                Please wait...
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Editable Title in Header */}
            <EditableField
              fieldName="title"
              value={task.title}
              label=""
              onSave={handleFieldUpdate}
              className="border-b border-border pb-3"
              disabled={updateState === 'loading'}
            />

            {/* Description */}
            <EditableField
              fieldName="description"
              value={task.description}
              label="Description"
              multiline
              onSave={handleFieldUpdate}
              disabled={updateState === 'loading'}
            />

            {/* Comments Section */}
            <CommentSection 
              comments={comments}
              onAddComment={handleAddComment}
            />
          </div>

          {/* Sidebar */}
          <TaskSidebar 
            task={task}
            epics={epics}
            sprints={sprints}
            lastUpdated={lastUpdated}
            onUpdateTask={handleSidebarUpdate}
            onClose={handleClose}
            onDelete={handleDelete}
            isUpdating={updateState === 'loading'}
            isDeleting={deleteState === 'loading'}
            deleteState={deleteState}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
