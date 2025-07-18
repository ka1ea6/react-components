
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Task, Epic, Sprint } from './ProjectView';
import { TaskCard } from './TaskCard';
import { Plus, Move, Edit2, Trash2, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DashboardHero } from '../Heros/DashboardHero/DashboardHero';

interface EpicsViewProps {
  tasks: Task[];
  epics: Epic[];
  sprints: Sprint[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onTaskClick: (task: Task) => void;
  onAddTaskToEpic: (epicId: string) => void;
  onAddEpic: () => void;
  onUpdateEpic: (epicId: string, updates: Partial<Epic>) => void;
  onDeleteEpic: (epicId: string) => void;
}

export const EpicsView: React.FC<EpicsViewProps> = ({
  tasks,
  epics,
  sprints,
  onUpdateTask,
  onTaskClick,
  onAddTaskToEpic,
  onAddEpic,
  onUpdateEpic,
  onDeleteEpic
}) => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [editingEpic, setEditingEpic] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Epic>>({});

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, epicId: string) => {
    e.preventDefault();
    if (draggedTask && draggedTask.epicId !== epicId) {
      onUpdateTask(draggedTask.id, {
        epicId
      });
      setDraggedTask(null);
    }
  };

  const getTasksByEpic = (epicId: string) => {
    return tasks.filter(task => task.epicId === epicId);
  };

  const handleEditEpic = (epic: Epic) => {
    setEditingEpic(epic.id);
    setEditForm({
      name: epic.name,
      description: epic.description,
      confidence: epic.confidence,
      phase: epic.phase,
      progress: epic.progress
    });
  };

  const handleSaveEdit = () => {
    if (editingEpic && editForm.name) {
      onUpdateEpic(editingEpic, editForm);
      setEditingEpic(null);
      setEditForm({});
    }
  };

  const handleCancelEdit = () => {
    setEditingEpic(null);
    setEditForm({});
  };

  const handleDeleteEpic = (epicId: string) => {
    if (window.confirm('Are you sure you want to delete this epic? This will also delete all associated tasks.')) {
      onDeleteEpic(epicId);
    }
  };

  const getPhaseLabel = (phase: number) => {
    const phases = {
      1: 'Planning',
      2: 'Development',
      3: 'Testing',
      4: 'Review',
      5: 'Deployment',
      6: 'Monitoring',
      7: 'Optimization',
      8: 'Maintenance',
      9: 'Complete'
    };
    return phases[phase as keyof typeof phases] || `Phase ${phase}`;
  };

  const getConfidenceColor = (confidence: Epic['confidence']) => {
    switch (confidence) {
      case 'high':
        return 'bg-success/10 text-success';
      case 'medium':
        return 'bg-warning/10 text-warning';
      case 'low':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="px-2 md:px-4 py-4 space-y-8">
      <DashboardHero
        title="Epic Planning"
        description="Organize and manage your project epics, track progress, and assign tasks."
        gradient="bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600"
        primaryAction={{
          label: "Add epic",
          onClick: onAddEpic,
        }}
      />
      <div className="flex-1">
        <div className="w-full">
          

        {/* Epics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {epics.map(epic => {
            const epicTasks = getTasksByEpic(epic.id);
            const totalPoints = epicTasks.reduce((sum, task) => sum + task.points, 0);

            return (
              <Card 
                key={epic.id} 
                className={`flex flex-col ${editingEpic === epic.id ? 'h-auto' : 'h-[600px]'} bg-card shadow-sm`}
                onDragOver={handleDragOver}
                onDrop={e => handleDrop(e, epic.id)}
              >
                {/* Epic Header */}
                <div className="p-4 border-b border-border">
                  {editingEpic === epic.id ? (
                    /* Edit Mode */
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Input
                          value={editForm.name || ''}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          placeholder="Epic name"
                          className="font-semibold"
                        />
                        <div className="flex gap-2 ml-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleSaveEdit}
                            className="p-1 h-8 w-8"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCancelEdit}
                            className="p-1 h-8 w-8"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <Textarea
                        value={editForm.description || ''}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        placeholder="Epic description"
                        className="text-sm min-h-[60px]"
                      />
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs text-muted-foreground">Confidence</label>
                          <Select 
                            value={editForm.confidence || epic.confidence} 
                            onValueChange={(value) => setEditForm({ ...editForm, confidence: value as Epic['confidence'] })}
                          >
                            <SelectTrigger className="text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Phase</label>
                          <Select 
                            value={editForm.phase?.toString() || epic.phase.toString()} 
                            onValueChange={(value) => setEditForm({ ...editForm, phase: parseInt(value) })}
                          >
                            <SelectTrigger className="text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(phase => (
                                <SelectItem key={phase} value={phase.toString()}>
                                  Phase {phase}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-xs text-muted-foreground">Progress (%)</label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={editForm.progress || epic.progress}
                          onChange={(e) => setEditForm({ ...editForm, progress: parseInt(e.target.value) || 0 })}
                          className="text-xs"
                        />
                      </div>
                    </div>
                  ) : (
                    /* Display Mode */
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-4 h-4 rounded-full ${epic.color}`}></div>
                        <h3 className="font-semibold text-foreground select-none flex-1">{epic.name}</h3>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditEpic(epic)}
                            className="p-1 h-8 w-8"
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteEpic(epic.id)}
                            className="p-1 h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={`text-xs ${getConfidenceColor(epic.confidence)}`}>
                          {epic.confidence} confidence
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Phase {epic.phase}
                        </Badge>
                        <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                          {epicTasks.length} tasks
                        </Badge>
                        <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                          {totalPoints} pts
                        </Badge>
                      </div>

                      {epic.description && (
                        <p className="text-sm text-muted-foreground mb-3 select-none">{epic.description}</p>
                      )}

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span className="select-none">Progress</span>
                          <span className="select-none">{epic.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${epic.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <Button
                        onClick={() => onAddTaskToEpic(epic.id)}
                        variant="outline"
                        size="sm"
                        className="w-full gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add Task
                      </Button>
                    </>
                  )}
                </div>

                {/* Tasks List */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className={`space-y-3 min-h-[200px] border-2 border-dashed rounded p-3 transition-colors ${
                    draggedTask ? 'border-primary bg-primary/10' : 'border-border'
                  }`}>
                    {epicTasks.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-32 text-muted-foreground border-2 border-dashed border-border rounded-lg">
                        <Move className="h-8 w-8 mb-2" />
                        <span className="text-sm select-none">Drop tasks here</span>
                      </div>
                    ) : (
                      epicTasks.map(task => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          epic={epic}
                          onDragStart={handleDragStart}
                          onTaskClick={onTaskClick}
                          isCompact={true}
                        />
                      ))
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
};
