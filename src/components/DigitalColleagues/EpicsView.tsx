
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Task, Epic, Sprint } from './KanbanBoard';
import { TaskCard } from './TaskCard';
import { Plus, Move } from 'lucide-react';

interface EpicsViewProps {
  tasks: Task[];
  epics: Epic[];
  sprints: Sprint[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onTaskClick: (task: Task) => void;
  onAddTaskToEpic: (epicId: string) => void;
  onAddEpic: () => void;
}

export const EpicsView: React.FC<EpicsViewProps> = ({
  tasks,
  epics,
  sprints,
  onUpdateTask,
  onTaskClick,
  onAddTaskToEpic,
  onAddEpic
}) => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

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
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 py-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Epic Planning</h2>
            <p className="text-gray-600">Manage and organize your project epics</p>
          </div>
          <Button
            onClick={onAddEpic}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Epic
          </Button>
        </div>

        {/* Epics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {epics.map(epic => {
            const epicTasks = getTasksByEpic(epic.id);
            const totalPoints = epicTasks.reduce((sum, task) => sum + task.points, 0);

            return (
              <Card 
                key={epic.id} 
                className="flex flex-col h-[600px]"
                onDragOver={handleDragOver}
                onDrop={e => handleDrop(e, epic.id)}
              >
                {/* Epic Header */}
                <div className="p-4 border-b">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-4 h-4 rounded-full ${epic.color}`}></div>
                    <h3 className="font-semibold text-gray-900 select-none">{epic.name}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={`text-xs ${getConfidenceColor(epic.confidence)}`}>
                      {epic.confidence} confidence
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {getPhaseLabel(epic.phase)}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {epicTasks.length} tasks
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {totalPoints} pts
                    </Badge>
                  </div>

                  {epic.description && (
                    <p className="text-sm text-gray-600 mb-3 select-none">{epic.description}</p>
                  )}

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span className="select-none">Progress</span>
                      <span className="select-none">{epic.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
                </div>

                {/* Tasks List */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-3 min-h-[200px]">
                    {epicTasks.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-32 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
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
  );
};
