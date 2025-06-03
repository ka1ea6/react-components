
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Task, Epic, Sprint } from './KanbanBoard';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  epics: Epic[];
  sprints: Sprint[];
}

const taskTypes = [
  { value: 'story', label: 'Story', color: 'bg-blue-100 text-blue-800' },
  { value: 'task', label: 'Task', color: 'bg-green-100 text-green-800' },
  { value: 'bug', label: 'Bug', color: 'bg-red-100 text-red-800' },
  { value: 'spike', label: 'Spike', color: 'bg-purple-100 text-purple-800' },
];

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  onAddTask,
  epics,
  sprints,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo' as Task['status'],
    priority: 'medium' as Task['priority'],
    type: 'story' as Task['type'],
    epicId: '',
    sprintId: 'none',
    assignee: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.epicId) {
      onAddTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
        status: 'todo',
        priority: formData.priority as Task['priority'],
        type: formData.type as Task['type'],
        epicId: formData.epicId,
        sprintId: formData.sprintId === 'none' ? undefined : formData.sprintId,
        assignee: formData.assignee.trim() || 'Unassigned',
      });
      setFormData({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        type: 'story',
        epicId: '',
        sprintId: 'none',
        assignee: '',
      });
      onClose();
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedTaskType = taskTypes.find(type => type.value === formData.type);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter task description"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {taskTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${type.color}`}>
                          {type.label}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedTaskType && (
                <Badge className={`text-xs ${selectedTaskType.color} w-fit`}>
                  {selectedTaskType.label}
                </Badge>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Epic Selection */}
          <div className="space-y-2">
            <Label htmlFor="epic">Epic</Label>
            <Select value={formData.epicId} onValueChange={(value) => handleChange('epicId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an epic" />
              </SelectTrigger>
              <SelectContent>
                {epics.map(epic => (
                  <SelectItem key={epic.id} value={epic.id}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${epic.color}`}></div>
                      {epic.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sprint Selection */}
          <div className="space-y-2">
            <Label htmlFor="sprint">Sprint (Optional)</Label>
            <Select value={formData.sprintId} onValueChange={(value) => handleChange('sprintId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a sprint" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Sprint</SelectItem>
                {sprints.map(sprint => (
                  <SelectItem key={sprint.id} value={sprint.id}>
                    <div className="flex items-center gap-2">
                      {sprint.name}
                      {sprint.isActive && <span className="text-xs bg-green-100 text-green-800 px-1 rounded">Active</span>}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Input
              id="assignee"
              value={formData.assignee}
              onChange={(e) => handleChange('assignee', e.target.value)}
              placeholder="Enter assignee name"
              required
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Add Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
