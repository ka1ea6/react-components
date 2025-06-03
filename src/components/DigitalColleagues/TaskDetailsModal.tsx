
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Task, Epic, Sprint } from './KanbanBoard';
import { EditableField } from './EditableField';
import { CommentSection } from './CommentSection';
import { TaskSidebar } from './TaskSidebar';

interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: Date;
}

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  epics: Epic[];
  sprints: Sprint[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
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

  const handleFieldUpdate = (fieldName: string, value: string) => {
    if (value !== task[fieldName as keyof Task]) {
      onUpdateTask(task.id, { [fieldName]: value });
      setLastUpdated(new Date());
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

  const handleDelete = () => {
    onDeleteTask(task.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle className="sr-only">{task.title}</DialogTitle>
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
              className="border-b pb-3"
            />

            {/* Description */}
            <EditableField
              fieldName="description"
              value={task.description}
              label="Description"
              multiline
              onSave={handleFieldUpdate}
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
            onUpdateTask={handleFieldUpdate}
            onClose={onClose}
            onDelete={handleDelete}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
