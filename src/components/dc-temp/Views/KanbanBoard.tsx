import React, { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { KanbanColumn } from '../../DigitalColleagues/KanbanColumn';
import { TaskCard } from '../../DigitalColleagues/TaskCard';
import { AddTaskModal } from '../../DigitalColleagues/AddTaskModal';
import { TaskDetailsModal } from '../../DigitalColleagues/TaskDetailsModal';

import { AddEpicModal } from '../../DigitalColleagues/AddEpicModal';
import { HeroSection } from '../hero-section';


import { Project, Epic, Sprint, Task } from '../../DigitalColleagues/types';


export interface KanbanBoardProps {
  initialTasks?: Task[];
  initialEpics?: Epic[];
  initialSprints?: Sprint[];
  initialProjects?: Project[];
  // Task handlers
  onAddTask?: (newTask: Omit<Task, 'id' | 'createdAt'>) => void;
  onUpdateTask?: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask?: (taskId: string) => void;
  onTaskClick?: (task: Task) => void;
  // Epic handlers
  onAddEpic?: (newEpic: Omit<Epic, 'id'>) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  initialTasks = [],
  initialEpics = [],
  initialSprints = [],
  initialProjects = [],
  // Task handlers
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onTaskClick,
  // Epic handlers
  onAddEpic,
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [epics, setEpics] = useState<Epic[]>(initialEpics);
  const [sprints, setSprints] = useState<Sprint[]>(initialSprints);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isAddEpicModalOpen, setIsAddEpicModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const selectedEpics = epics.filter(epic => epic.isSelected).map(epic => epic.id);
  const selectedSprint = sprints.find(sprint => sprint.isSelected);

  // Filter tasks by selected epics and sprint
  const filteredTasks = tasks.filter(task => {
    const isEpicSelected = selectedEpics.includes(task.epicId);
    if (!selectedSprint) return isEpicSelected;
    if (selectedSprint.id === 'all-tasks') return isEpicSelected;
    if (selectedSprint.id === 'backlog') return isEpicSelected && !task.sprintId;
    return isEpicSelected && task.sprintId === selectedSprint.id;
  });

  const getTasksByStatus = (status: Task['status']) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const getTasksByEpic = (tasks: Task[]) => {
    const tasksByEpic: { [epicId: string]: Task[] } = {};
    epics.forEach(epic => {
      tasksByEpic[epic.id] = tasks.filter(task => task.epicId === epic.id);
    });
    return tasksByEpic;
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDrop = (status: Task['status']) => {
    if (draggedTask) {
      setTasks(prev =>
        prev.map(task =>
          task.id === draggedTask.id ? { ...task, status } : task
        )
      );
      // Notify upstream handler about the status change
      onUpdateTask?.(draggedTask.id, { status });
      setDraggedTask(null);
    }
  };

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    const task: Task = { ...newTask, id: Date.now().toString(), createdAt: new Date() };
    setTasks(prev => [...prev, task]);
    onAddTask?.(newTask);
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task => (task.id === taskId ? { ...task, ...updates } : task))
    );
    onUpdateTask?.(taskId, updates);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    if (selectedTask?.id === taskId) {
      setSelectedTask(null);
    }
    onDeleteTask?.(taskId);
  };

  const handleAddEpic = (newEpic: Omit<Epic, 'id'>) => {
    const epic: Epic = { ...newEpic, id: Date.now().toString(), isSelected: true };
    setEpics(prev => [...prev, epic]);
    onAddEpic?.(newEpic);
  };


  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    onTaskClick?.(task);
  };


  const columns = [
    { id: 'todo', title: 'To Do', status: 'todo' as const },
    { id: 'in-progress', title: 'In Progress', status: 'in-progress' as const },
    { id: 'review', title: 'Review', status: 'review' as const },
    { id: 'done', title: 'Done', status: 'done' as const },
  ];

  return (
    <div className="px-2 md:px-4 py-4 space-y-8">
      <HeroSection
        title="Project Board"
        description="Manage tasks and track progress across your project sprints."
        gradient="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600"
        primaryAction={{
          label: "Add task",
          onClick: () => setIsAddTaskModalOpen(true),
        }}
        secondaryAction={{
          label: "Add epic",
          onClick: () => setIsAddEpicModalOpen(true),
        }}
      />
      <div className="flex-1">
        <div className="w-full">
          {/* Page Title */}
          
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {columns.map(column => {
                    const columnTasks = getTasksByStatus(column.status);
                    const tasksByEpic = getTasksByEpic(columnTasks);

                    return (
                      <KanbanColumn
                        key={column.id}
                        title={column.title}
                        status={column.status}
                        taskCount={columnTasks.length}
                        onDrop={handleDrop}
                        isCompact={column.status === 'done'}
                      >
                        {selectedEpics.map(epicId => {
                          const epic = epics.find(e => e.id === epicId);
                          const epicTasks = tasksByEpic[epicId] || [];

                          if (epicTasks.length === 0) return null;

                          return (
                          <div key={epicId} className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                              <div className={`w-3 h-3 rounded-full ${epic?.color}`}></div>
                              <span className="text-sm font-medium text-muted-foreground select-none-important">{epic?.name}</span>
                              <Badge variant="secondary" className="text-xs">
                                {epicTasks.length}
                              </Badge>
                            </div>                            <div className="space-y-3">
                              {epicTasks.map(task => (
                                <TaskCard
                                  key={task.id}
                                  task={task}
                                  epic={epic!}
                                  onDragStart={handleDragStart}
                                  onTaskClick={handleTaskClick}
                                  isCompact={column.status === 'done'}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </KanbanColumn>
                  );
                })}
              </div>
              <>
                <AddTaskModal
                  isOpen={isAddTaskModalOpen}
                  onClose={() => setIsAddTaskModalOpen(false)}
                  onAddTask={handleAddTask}
                  epics={epics}
                  sprints={sprints}
                />

                <AddEpicModal
                  isOpen={isAddEpicModalOpen}
                  onClose={() => setIsAddEpicModalOpen(false)}
                  onAddEpic={handleAddEpic}
                />

                {selectedTask && (
                  <TaskDetailsModal
                    isOpen={!!selectedTask}
                    onClose={() => setSelectedTask(null)}
                    task={selectedTask}
                    epics={epics}
                    sprints={sprints}
                    onUpdateTask={handleUpdateTask}
                    onDeleteTask={handleDeleteTask}
                  />
                )}
              </>
        </div>
      </div>
    </div>
  );
};
