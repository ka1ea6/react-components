
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task } from './KanbanBoard';

interface KanbanColumnProps {
  title: string;
  status: Task['status'];
  taskCount: number;
  children: React.ReactNode;
  onDrop: (status: Task['status']) => void;
  isCompact?: boolean;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  status,
  taskCount,
  children,
  onDrop,
  isCompact = false,
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop(status);
  };

  const getColumnColor = () => {
    switch (status) {
      case 'todo':
        return 'border-l-gray-400';
      case 'in-progress':
        return 'border-l-blue-500';
      case 'review':
        return 'border-l-orange-500';
      case 'done':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-400';
    }
  };

  return (
    <Card 
      className={`p-4 bg-white border-l-4 ${getColumnColor()} shadow-sm hover:shadow-md transition-shadow duration-200 ${
        isCompact ? 'lg:max-w-xs' : ''
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-semibold text-gray-900 select-none-important ${
          isCompact ? 'text-base' : 'text-lg'
        }`}>
          {title}
        </h3>
        <Badge variant="secondary" className="bg-gray-100 text-gray-600">
          {taskCount}
        </Badge>
      </div>
      
      <div className="space-y-4 min-h-[200px]">
        {children}
      </div>
    </Card>
  );
};
