
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Trash2 } from 'lucide-react';
import { Task, Epic, Sprint } from './KanbanBoard';
import { TaskSelect } from './TaskSelect';
import { SearchableSelect } from './SearchableSelect';
import { EditableField } from './EditableField';

const taskTypes = [{
  value: 'story',
  label: 'Story',
  color: 'bg-blue-100 text-blue-800'
}, {
  value: 'task',
  label: 'Task',
  color: 'bg-gray-100 text-gray-800'
}, {
  value: 'bug',
  label: 'Bug',
  color: 'bg-red-100 text-red-800'
}, {
  value: 'spike',
  label: 'Spike',
  color: 'bg-purple-100 text-purple-800'
}];

const teamMembers = [{
  value: 'John Doe',
  label: 'John Doe'
}, {
  value: 'Jane Smith',
  label: 'Jane Smith'
}, {
  value: 'Bob Wilson',
  label: 'Bob Wilson'
}, {
  value: 'Alice Johnson',
  label: 'Alice Johnson'
}, {
  value: 'Carol Brown',
  label: 'Carol Brown'
}, {
  value: 'David Lee',
  label: 'David Lee'
}, {
  value: 'Emma Davis',
  label: 'Emma Davis'
}, {
  value: 'Frank Miller',
  label: 'Frank Miller'
}, {
  value: 'Grace Taylor',
  label: 'Grace Taylor'
}, {
  value: 'Unassigned',
  label: 'Unassigned'
}];


interface TaskSidebarProps {
  task: Task;
  epics: Epic[];
  sprints: Sprint[];
  lastUpdated: Date;
  onUpdateTask: (fieldName: string, value: string) => void;
  onClose: () => void;
  onDelete: () => void;
}

export const TaskSidebar: React.FC<TaskSidebarProps> = ({
  task,
  epics,
  sprints,
  lastUpdated,
  onUpdateTask,
  onClose,
  onDelete
}) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Top section with form fields */}
      <div className="space-y-2">
        {/* Status */}
        <div className="flex items-center justify-between">
          <Label className="text-xs text-gray-600 w-16">Status</Label>
          <TaskSelect 
            label="" 
            value={task.status} 
            onValueChange={value => onUpdateTask('status', value)} 
            options={[{
              value: 'todo',
              label: 'To Do'
            }, {
              value: 'in-progress',
              label: 'In Progress'
            }, {
              value: 'done',
              label: 'Done'
            }]} 
          />
        </div>

        {/* Type */}
        <div className="flex items-center justify-between">
          <Label className="text-xs text-gray-600 w-16">Type</Label>
          <TaskSelect 
            label="" 
            value={task.type} 
            onValueChange={value => onUpdateTask('type', value)} 
            options={taskTypes.map(type => ({
              value: type.value,
              label: type.label
            }))} 
          />
        </div>

        {/* Priority */}
        <div className="flex items-center justify-between">
          <Label className="text-xs text-gray-600 w-16">Priority</Label>
          <TaskSelect 
            label="" 
            value={task.priority} 
            onValueChange={value => onUpdateTask('priority', value)} 
            options={[{
              value: 'low',
              label: 'Low'
            }, {
              value: 'medium',
              label: 'Medium'
            }, {
              value: 'high',
              label: 'High'
            }]} 
          />
        </div>

        {/* Epic */}
        <div className="flex items-center justify-between">
          <Label className="text-xs text-gray-600 w-16">Epic</Label>
          <TaskSelect 
            label="" 
            value={task.epicId} 
            onValueChange={value => onUpdateTask('epicId', value)} 
            options={epics.map(epic => ({
              value: epic.id,
              label: epic.name,
              color: epic.color
            }))} 
            showColor 
          />
        </div>

        {/* Sprint */}
        <div className="flex items-center justify-between">
          <Label className="text-xs text-gray-600 w-16">Sprint</Label>
          <TaskSelect 
            label="" 
            value={task.sprintId || 'none'} 
            onValueChange={value => onUpdateTask('sprintId', value === 'none' ? '' : value)} 
            options={[{
              value: 'none',
              label: 'No Sprint'
            }, ...sprints.map(sprint => ({
              value: sprint.id,
              label: `${sprint.name}${sprint.isActive ? ' (Active)' : ''}`
            }))]} 
          />
        </div>

        {/* Assignee */}
        <div className="flex items-center justify-between">
          <Label className="text-xs text-gray-600 w-16">Assignee</Label>
          <SearchableSelect 
            label="" 
            value={task.assignee} 
            onValueChange={value => onUpdateTask('assignee', value)} 
            options={teamMembers} 
            placeholder="Search team members..." 
            allowCustomValue={true} 
          />
        </div>
      </div>

      {/* Bottom section - pushed to bottom */}
      <div className="mt-auto pt-4 space-y-4">
        {/* Action Buttons */}
        <div className="space-y-2">
          <Button onClick={onClose} variant="outline" className="w-full h-8 text-xs">
            Close
          </Button>
          <Button onClick={onDelete} variant="destructive" className="w-full h-8 text-xs gap-1">
            <Trash2 className="h-3 w-3" />
            Delete Task
          </Button>
        </div>

        {/* Informational Fields */}
        <div className="pt-4 border-t border-gray-200 space-y-2">
          <div className="text-xs text-gray-400 font-medium mb-2">Information</div>
          
          {/* Logged By */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Logged By</span>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <User className="h-3 w-3" />
              <span>System</span>
            </div>
          </div>

          {/* Created Date */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Created</span>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="h-3 w-3" />
              <span>{task.createdAt.toLocaleDateString()}</span>
            </div>
          </div>

          {/* Last Updated */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Last Updated</span>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="h-3 w-3" />
              <span>{lastUpdated.toLocaleDateString()} at {lastUpdated.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
