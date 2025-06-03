
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, AlertCircle, Bug, Zap, BookOpen } from 'lucide-react';
import { Task, Epic } from './KanbanBoard';

interface TaskCardProps {
  task: Task;
  epic: Epic;
  onDragStart: (task: Task) => void;
  onTaskClick: (task: Task) => void;
  isCompact?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  epic, 
  onDragStart, 
  onTaskClick,
  isCompact = false
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    onDragStart(task);
  };

  const handleClick = () => {
    onTaskClick(task);
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = () => {
    switch (task.type) {
      case 'story':
        return <BookOpen className="h-3 w-3" />;
      case 'bug':
        return <Bug className="h-3 w-3" />;
      case 'spike':
        return <Zap className="h-3 w-3" />;
      case 'task':
      default:
        return <AlertCircle className="h-3 w-3" />;
    }
  };

  const getTypeColor = () => {
    switch (task.type) {
      case 'story':
        return 'bg-blue-100 text-blue-800';
      case 'bug':
        return 'bg-red-100 text-red-800';
      case 'spike':
        return 'bg-purple-100 text-purple-800';
      case 'task':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isCompact) {
    return (
      <Card
        className="p-3 bg-white border border-gray-200 hover:border-gray-300 cursor-pointer transition-all duration-200 hover:shadow-sm"
        draggable
        onDragStart={handleDragStart}
        onClick={handleClick}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor()}`}>
            {getTypeIcon()}
          </div>
          <Badge className={`text-xs px-2 py-0.5 ${getPriorityColor()}`}>
            {task.priority}
          </Badge>
        </div>
        
        <h4 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2 select-none-important">
          {task.title}
        </h4>
        
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <User className="h-3 w-3" />
          <span className="truncate">{task.assignee}</span>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="p-4 bg-white border border-gray-200 hover:border-gray-300 cursor-pointer transition-all duration-200 hover:shadow-md"
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getTypeColor()}`}>
          {getTypeIcon()}
          <span className="capitalize">{task.type}</span>
        </div>
        <Badge className={`text-xs px-2 py-1 ${getPriorityColor()}`}>
          {task.priority}
        </Badge>
      </div>
      
      <h4 className="font-semibold text-gray-900 mb-2 select-none-important">
        {task.title}
      </h4>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2 select-none-important">
        {task.description}
      </p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <User className="h-4 w-4" />
          <span>{task.assignee}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{task.createdAt.toLocaleDateString()}</span>
        </div>
      </div>
    </Card>
  );
};
