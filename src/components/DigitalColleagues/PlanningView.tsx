
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Task, Epic, Sprint } from './KanbanBoard';
import { Calendar, User, Plus } from 'lucide-react';
import { AddSprintModal } from './AddSprintModal';

interface PlanningViewProps {
  tasks: Task[];
  epics: Epic[];
  sprints: Sprint[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onTaskClick: (task: Task) => void;
  onAddSprint: (sprint: Omit<Sprint, 'id'>) => void;
}

export const PlanningView: React.FC<PlanningViewProps> = ({
  tasks,
  epics,
  sprints,
  onUpdateTask,
  onTaskClick,
  onAddSprint,
}) => {
  const [selectedSprintIds, setSelectedSprintIds] = useState<string[]>(['2']); // Default to Sprint 2
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [isAddSprintModalOpen, setIsAddSprintModalOpen] = useState(false);

  // Get backlog tasks (no sprint assigned)
  const backlogTasks = tasks.filter(task => !task.sprintId);
  
  // Get tasks for selected sprints
  const sprintTasks = tasks.filter(task => 
    task.sprintId && selectedSprintIds.includes(task.sprintId)
  );

  // Sort sprints by date (left to right)
  const sortedSprints = [...sprints]
    .filter(s => s.id !== 'backlog' && s.id !== 'all-tasks')
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

  const getEpicById = (epicId: string) => epics.find(epic => epic.id === epicId);
  const getSprintById = (sprintId: string) => sprints.find(sprint => sprint.id === sprintId);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, sprintId: string) => {
    e.preventDefault();
    if (draggedTask) {
      onUpdateTask(draggedTask.id, { 
        sprintId: sprintId === 'backlog' ? undefined : sprintId 
      });
      setDraggedTask(null);
    }
  };

  const toggleSprintView = (sprintId: string) => {
    if (sprintId === 'backlog' || sprintId === 'all-tasks') return;
    
    setSelectedSprintIds(prev => 
      prev.includes(sprintId) 
        ? prev.filter(id => id !== sprintId)
        : [...prev, sprintId]
    );
  };

  const handleAddSprint = (sprint: Omit<Sprint, 'id'>) => {
    onAddSprint(sprint);
    setIsAddSprintModalOpen(false);
  };

  const CompactTaskCard: React.FC<{ task: Task; showSprint?: boolean }> = ({ task, showSprint = false }) => {
    const epic = getEpicById(task.epicId);
    const sprint = task.sprintId ? getSprintById(task.sprintId) : null;

    const handleClick = (e: React.MouseEvent) => {
      // Don't trigger click when dragging
      if (e.defaultPrevented) return;
      onTaskClick(task);
    };

    const handleCardDragStart = (e: React.DragEvent) => {
      handleDragStart(task);
      // Don't prevent default here - we need the drag to work
    };

    return (
      <Card 
        className="p-2 cursor-grab transition-all duration-200 hover:shadow-md bg-white active:cursor-grabbing"
        draggable
        onDragStart={handleCardDragStart}
        onClick={handleClick}
      >
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h4 className="font-medium text-sm text-gray-900 line-clamp-1 select-none pointer-events-none">{task.title}</h4>
            <Badge className={`text-xs select-none pointer-events-none ${getPriorityColor(task.priority)}`}>
              {task.priority[0].toUpperCase()}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between text-xs pointer-events-none">
            <div className="flex items-center gap-1">
              {epic && <div className={`w-2 h-2 rounded-full ${epic.color}`}></div>}
              <span className="text-gray-600 truncate select-none">{epic?.name}</span>
            </div>
            <span className="text-gray-500 select-none">{getInitials(task.assignee)}</span>
          </div>

          {showSprint && sprint && (
            <div className="flex items-center gap-1 text-xs text-gray-500 pointer-events-none">
              <Calendar className="h-3 w-3" />
              <span className="select-none">{sprint.name}</span>
            </div>
          )}
        </div>
      </Card>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Backlog Column */}
        <div className="lg:col-span-1">
          <Card 
            className="p-4 h-full"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'backlog')}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 select-none">Backlog</h3>
              <Badge variant="secondary">{backlogTasks.length}</Badge>
            </div>
            
            <div className="space-y-2 overflow-y-auto max-h-[600px] min-h-[200px] border-2 border-dashed border-gray-200 rounded p-2">
              {backlogTasks.map(task => (
                <CompactTaskCard key={task.id} task={task} />
              ))}
              {backlogTasks.length === 0 && (
                <div className="flex items-center justify-center h-32 text-gray-400 text-sm select-none">
                  Drop tasks here to move to backlog
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Sprint Columns */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {/* Sprint Selection */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 select-none">Select Sprints to View</h3>
                <Button
                  onClick={() => setIsAddSprintModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Sprint
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {sortedSprints.map(sprint => (
                  <Button
                    key={sprint.id}
                    variant={selectedSprintIds.includes(sprint.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSprintView(sprint.id)}
                    className="text-xs h-8"
                  >
                    {sprint.name}
                    {sprint.isActive && <span className="ml-1 text-green-400">●</span>}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Sprint Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedSprintIds
                .map(sprintId => sortedSprints.find(s => s.id === sprintId))
                .filter(Boolean)
                .sort((a, b) => a!.startDate.getTime() - b!.startDate.getTime())
                .map(sprint => {
                  const sprintTasksFiltered = sprintTasks.filter(task => task.sprintId === sprint!.id);
                  
                  return (
                    <Card 
                      key={sprint!.id} 
                      className="p-4"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, sprint!.id)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 select-none">{sprint!.name}</h3>
                          {sprint!.isActive && (
                            <span className="text-xs text-green-600 font-medium select-none">Active Sprint</span>
                          )}
                        </div>
                        <Badge variant="secondary">{sprintTasksFiltered.length}</Badge>
                      </div>
                      
                      <div className="space-y-2 overflow-y-auto max-h-[500px] min-h-[200px] border-2 border-dashed border-gray-200 rounded p-2">
                        {sprintTasksFiltered.map(task => (
                          <CompactTaskCard key={task.id} task={task} />
                        ))}
                        {sprintTasksFiltered.length === 0 && (
                          <div className="flex items-center justify-center h-32 text-gray-400 text-sm select-none">
                            Drop tasks here
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <AddSprintModal
        isOpen={isAddSprintModalOpen}
        onClose={() => setIsAddSprintModalOpen(false)}
        onAddSprint={handleAddSprint}
      />
    </>
  );
};
