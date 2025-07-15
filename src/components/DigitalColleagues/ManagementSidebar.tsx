import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarProvider,
  SidebarTrigger,
  useSidebar 
} from '@/components/ui/sidebar';
import { Epic, Sprint, Project } from './KanbanBoard';
import { X, Plus, Edit2, Trash2, Calendar, Kanban, FileText, FolderOpen, Target, Layers } from 'lucide-react';

interface ManagementSidebarProps {
  projects: Project[];
  epics: Epic[];
  sprints: Sprint[];
  currentView: 'kanban' | 'planning' | 'tasks' | 'files' | 'epics';
  onUpdateProject: (projectId: string, updates: Partial<Project>) => void;
  onDeleteProject: (projectId: string) => void;
  onAddProject: (project: Omit<Project, 'id'>) => void;
  onUpdateEpic: (epicId: string, updates: Partial<Epic>) => void;
  onDeleteEpic: (epicId: string) => void;
  onAddEpic: () => void;
  onAddSprint: (sprint: Omit<Sprint, 'id'>) => void;
  onUpdateSprint: (sprintId: string, updates: Partial<Sprint>) => void;
  onDeleteSprint: (sprintId: string) => void;
  onViewChange: (view: 'kanban' | 'planning' | 'tasks' | 'files' | 'epics') => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

type SectionType = 'projects' | 'epics' | 'sprints' | 'files' | null;

const ManagementSidebarContent: React.FC<ManagementSidebarProps> = ({
  projects,
  epics,
  sprints,
  currentView,
  onUpdateProject,
  onDeleteProject,
  onAddProject,
  onUpdateEpic,
  onDeleteEpic,
  onAddEpic,
  onAddSprint,
  onUpdateSprint,
  onDeleteSprint,
  onViewChange,
  mobileMenuOpen,
  onToggleMobileMenu,
}) => {
  const [activeSection, setActiveSection] = useState<SectionType>(null);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [editingEpic, setEditingEpic] = useState<string | null>(null);
  const [editingSprintId, setEditingSprintId] = useState<string | null>(null);
  const [projectEditForm, setProjectEditForm] = useState({ name: '', description: '' });
  const [epicEditForm, setEpicEditForm] = useState({
    name: '',
    description: '',
    color: '',
    confidence: 'medium' as 'low' | 'medium' | 'high',
    phase: 1,
    startDate: '',
    endDate: '',
    progress: 0,
  });
  const [sprintEditForm, setSprintEditForm] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    isActive: false,
  });
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddSprint, setShowAddSprint] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState({
    name: '',
    description: '',
  });
  const [newSprintForm, setNewSprintForm] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    isActive: false,
  });

  const colorOptions = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-pink-500',
    'bg-indigo-500',
  ];

  const confidenceOptions = [
    { value: 'low', label: 'Low', color: 'text-red-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-green-600' },
  ];

  const phaseOptions = [
    { value: 1, label: 'Phase 1', color: 'text-blue-600' },
    { value: 2, label: 'Phase 2', color: 'text-purple-600' },
    { value: 3, label: 'Phase 3', color: 'text-orange-600' },
    { value: 4, label: 'Phase 4', color: 'text-green-600' },
    { value: 5, label: 'Phase 5', color: 'text-red-600' },
    { value: 6, label: 'Phase 6', color: 'text-yellow-600' },
    { value: 7, label: 'Phase 7', color: 'text-pink-600' },
    { value: 8, label: 'Phase 8', color: 'text-indigo-600' },
    { value: 9, label: 'Phase 9', color: 'text-gray-600' },
  ];

  const handleProjectEditStart = (project: Project) => {
    setEditingProject(project.id);
    setProjectEditForm({
      name: project.name,
      description: project.description || '',
    });
  };

  const handleProjectEditSave = () => {
    if (editingProject && projectEditForm.name.trim()) {
      onUpdateProject(editingProject, {
        name: projectEditForm.name.trim(),
        description: projectEditForm.description.trim(),
      });
      setEditingProject(null);
    }
  };

  const handleProjectEditCancel = () => {
    setEditingProject(null);
    setProjectEditForm({ name: '', description: '' });
  };

  const handleAddProjectSave = () => {
    if (newProjectForm.name.trim()) {
      onAddProject({
        name: newProjectForm.name.trim(),
        description: newProjectForm.description.trim(),
        isSelected: false,
      });
      setNewProjectForm({ name: '', description: '' });
      setShowAddProject(false);
    }
  };

  const handleProjectSelect = (projectId: string) => {
    onUpdateProject(projectId, { isSelected: true });
  };

  const handleEpicEditStart = (epic: Epic) => {
    setEditingEpic(epic.id);
    setEpicEditForm({
      name: epic.name,
      description: epic.description || '',
      color: epic.color,
      confidence: epic.confidence,
      phase: epic.phase,
      startDate: epic.startDate.toISOString().split('T')[0],
      endDate: epic.endDate.toISOString().split('T')[0],
      progress: epic.progress,
    });
  };

  const handleEpicEditSave = () => {
    if (editingEpic && epicEditForm.name.trim()) {
      onUpdateEpic(editingEpic, {
        name: epicEditForm.name.trim(),
        description: epicEditForm.description.trim(),
        color: epicEditForm.color,
        confidence: epicEditForm.confidence,
        phase: epicEditForm.phase,
        startDate: new Date(epicEditForm.startDate),
        endDate: new Date(epicEditForm.endDate),
        progress: epicEditForm.progress,
      });
      setEditingEpic(null);
    }
  };

  const handleEpicEditCancel = () => {
    setEditingEpic(null);
    setEpicEditForm({
      name: '',
      description: '',
      color: '',
      confidence: 'medium',
      phase: 1,
      startDate: '',
      endDate: '',
      progress: 0,
    });
  };

  const handleSprintEditStart = (sprint: Sprint) => {
    setEditingSprintId(sprint.id);
    setSprintEditForm({
      name: sprint.name,
      description: sprint.description || '',
      startDate: sprint.startDate.toISOString().split('T')[0],
      endDate: sprint.endDate.toISOString().split('T')[0],
      isActive: sprint.isActive,
    });
  };

  const handleSprintEditSave = () => {
    if (editingSprintId && sprintEditForm.name.trim()) {
      onUpdateSprint(editingSprintId, {
        name: sprintEditForm.name.trim(),
        description: sprintEditForm.description.trim(),
        startDate: new Date(sprintEditForm.startDate),
        endDate: new Date(sprintEditForm.endDate),
        isActive: sprintEditForm.isActive,
      });
      setEditingSprintId(null);
    }
  };

  const handleSprintEditCancel = () => {
    setEditingSprintId(null);
    setSprintEditForm({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      isActive: false,
    });
  };

  const handleAddSprintSave = () => {
    if (newSprintForm.name.trim()) {
      onAddSprint({
        name: newSprintForm.name.trim(),
        description: newSprintForm.description.trim(),
        startDate: new Date(newSprintForm.startDate),
        endDate: new Date(newSprintForm.endDate),
        isActive: newSprintForm.isActive,
        isSelected: false,
      });
      setNewSprintForm({ name: '', description: '', startDate: '', endDate: '', isActive: false });
      setShowAddSprint(false);
    }
  };

  const handleSprintSelect = (sprintId: string) => {
    onUpdateSprint(sprintId, { isSelected: true });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getConfidenceDisplay = (confidence: string) => {
    const option = confidenceOptions.find(opt => opt.value === confidence);
    return option ? { label: option.label, color: option.color } : { label: 'Medium', color: 'text-yellow-600' };
  };

  const getPhaseDisplay = (phase: number) => {
    const option = phaseOptions.find(opt => opt.value === phase);
    return option ? { label: option.label, color: option.color } : { label: 'Phase 1', color: 'text-blue-600' };
  };

  return (
    <>
      {/* Narrow Strip - Positioned relative to current layout */}
      <div className={`absolute h-full w-12 bg-slate-800 flex flex-col z-50 flex-shrink-0 transition-transform duration-300 group ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}>
        
        {/* View Toggle */}
        <div className="border-b border-slate-600">
          <button
            onClick={() => {
              onViewChange('kanban');
              setActiveSection(null);
            }}
            className={`w-12 h-12 flex items-center justify-center text-white transition-all duration-200 relative overflow-hidden group/btn ${
              currentView === 'kanban' ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
            } hover:w-28 hover:justify-start hover:pl-3 z-50`}
            title="Kanban View"
          >
            <Kanban className="h-4 w-4 flex-shrink-0" />
            <span className="text-xs font-medium whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 absolute left-8">
              Kanban
            </span>
          </button>
          <button
            onClick={() => {
              onViewChange('planning');
              setActiveSection(null);
            }}
            className={`w-12 h-12 flex items-center justify-center text-white transition-all duration-200 relative overflow-hidden group/btn ${
              currentView === 'planning' ? 'bg-purple-600' : 'bg-purple-500 hover:bg-purple-600'
            } hidden md:flex hover:w-28 hover:justify-start hover:pl-3`}
            title="Planning View"
          >
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span className="text-xs font-medium whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 absolute left-8">
              Planning
            </span>
          </button>
        </div>

        {/* ...existing code... */}
        <button
          onClick={() => setActiveSection(activeSection === 'projects' ? null : 'projects')}
          className={`flex-1 w-12 flex items-center justify-center text-white transition-all duration-200 relative overflow-hidden group/btn ${
            activeSection === 'projects' ? 'bg-slate-600' : 'bg-slate-700 hover:bg-slate-600'
          } hover:w-28 hover:justify-start hover:pl-3`}
          title="Projects"
        >
          <FolderOpen className="h-4 w-4 flex-shrink-0" />
          <span className="text-xs font-medium whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 absolute left-8">
            Projects
          </span>
        </button>
        
        <button
          onClick={() => {
            onViewChange('epics');
            setActiveSection(null);
          }}
          className={`flex-1 w-12 flex items-center justify-center text-white transition-all duration-200 relative overflow-hidden group/btn ${
            currentView === 'epics' ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
          } hover:w-28 hover:justify-start hover:pl-3`}
          title="Epic Planning"
        >
          <Target className="h-4 w-4 flex-shrink-0" />
          <span className="text-xs font-medium whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 absolute left-8">
            Epics
          </span>
        </button>
        
        <button
          onClick={() => setActiveSection(activeSection === 'sprints' ? null : 'sprints')}
          className={`flex-1 w-12 flex items-center justify-center text-white transition-all duration-200 relative overflow-hidden group/btn ${
            activeSection === 'sprints' ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600'
          } hover:w-28 hover:justify-start hover:pl-3`}
          title="Sprints"
        >
          <Layers className="h-4 w-4 flex-shrink-0" />
          <span className="text-xs font-medium whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 absolute left-8">
            Sprints
          </span>
        </button>
        
        <button
          onClick={() => {
            onViewChange('files');
            setActiveSection(null);
          }}
          className={`flex-1 w-12 flex items-center justify-center text-white transition-all duration-200 relative overflow-hidden group/btn ${
            currentView === 'files' ? 'bg-orange-600' : 'bg-orange-500 hover:bg-orange-600'
          } hover:w-28 hover:justify-start hover:pl-3`}
          title="Files"
        >
          <FileText className="h-4 w-4 flex-shrink-0" />
          <span className="text-xs font-medium whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 absolute left-8">
            Files
          </span>
        </button>
        
        <button
          onClick={() => {
            onViewChange('tasks');
            setActiveSection(null);
          }}
          className={`flex-1 w-12 flex items-center justify-center text-white transition-all duration-200 relative overflow-hidden group/btn ${
            currentView === 'tasks' ? 'bg-purple-600' : 'bg-purple-500 hover:bg-purple-600'
          } hover:w-28 hover:justify-start hover:pl-3`}
          title="Tasks"
        >
          <Calendar className="h-4 w-4 flex-shrink-0" />
          <span className="text-xs font-medium whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 absolute left-8">
            Tasks
          </span>
        </button>
      </div>

      {/* Mobile Overlay - Truly full screen */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-20" 
          onClick={onToggleMobileMenu}
        />
      )}

      {/* Popup Panels - Positioned relative to the management sidebar */}
      {activeSection && (
        <>
          {/* Overlay - Truly full screen, covers everything */}
          <div 
            className="fixed inset-0 bg-black/70 z-40" 
            onClick={() => setActiveSection(null)}
          />
          
          {/* Panel - Positioned relative to the management sidebar */}
          <div className="absolute left-12 w-80 md:w-96 bg-card shadow-lg z-40 transform transition-transform max-w-[calc(100vw-3rem)] md:max-w-none top-0 h-full">
            {/* ...existing code... */}
            <div className="p-3 md:p-4 border-b flex items-center justify-between">
              <h2 className="text-base md:text-lg font-semibold">
                {activeSection === 'projects' && 'Projects'}
                {activeSection === 'epics' && 'Manage Epics'}
                {activeSection === 'sprints' && 'Manage Sprints'}
                {activeSection === 'files' && 'Files'}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setActiveSection(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-3 md:p-4 space-y-4 h-full overflow-y-auto">
              {/* Projects Section */}
              {activeSection === 'projects' && (
                <Card className="p-3">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">Projects</h3>
                      <Button size="sm" onClick={() => setShowAddProject(true)} className="gap-1">
                        <Plus className="h-3 w-3" />
                        Add Project
                      </Button>
                    </div>

                    {/* Add Project Form */}
                    {showAddProject && (
                      <div className="border rounded-lg p-2 space-y-2">
                        <Input
                          value={newProjectForm.name}
                          onChange={(e) => setNewProjectForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Project name"
                          className="text-sm"
                        />
                        <Textarea
                          value={newProjectForm.description}
                          onChange={(e) => setNewProjectForm(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Project description"
                          rows={2}
                          className="text-sm"
                        />
                        <div className="flex gap-1">
                          <Button size="sm" onClick={handleAddProjectSave} className="text-xs h-6">Save</Button>
                          <Button size="sm" variant="outline" onClick={() => setShowAddProject(false)} className="text-xs h-6">Cancel</Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      {projects.map(project => (
                        <div key={project.id} className="border rounded p-2">
                          {editingProject === project.id ? (
                            <div className="space-y-2">
                              <Input
                                value={projectEditForm.name}
                                onChange={(e) => setProjectEditForm(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Project name"
                                className="text-sm"
                              />
                              <Textarea
                                value={projectEditForm.description}
                                onChange={(e) => setProjectEditForm(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Project description"
                                rows={2}
                                className="text-sm"
                              />
                              <div className="flex gap-1">
                                <Button size="sm" onClick={handleProjectEditSave} className="text-xs h-6">Save</Button>
                                <Button size="sm" variant="outline" onClick={handleProjectEditCancel} className="text-xs h-6">Cancel</Button>
                              </div>
                            </div>
                          ) : (
                            <div 
                              className={`cursor-pointer p-1 rounded transition-colors ${
                                project.isSelected ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-300' : 'hover:bg-gray-50'
                              }`}
                              onClick={() => handleProjectSelect(project.id)}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <FolderOpen className="h-3 w-3 text-gray-500" />
                                <span className="font-medium text-xs">{project.name}</span>
                              </div>
                              {project.description && (
                                <p className="text-xs text-gray-500 mb-1">{project.description}</p>
                              )}
                              <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => handleProjectEditStart(project)}
                                  className="h-5 px-1"
                                >
                                  <Edit2 className="h-3 w-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => onDeleteProject(project.id)}
                                  className="h-5 px-1 text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              )}

              {/* Epics Section */}
              {activeSection === 'epics' && (
                <Card className="p-3">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">Epics</h3>
                      <Button size="sm" onClick={onAddEpic} className="gap-1">
                        <Plus className="h-3 w-3" />
                        Add Epic
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {epics.map(epic => (
                        <div key={epic.id} className="border rounded-lg p-3">
                          {editingEpic === epic.id ? (
                            <div className="space-y-3">
                              <Input
                                value={epicEditForm.name}
                                onChange={(e) => setEpicEditForm(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Epic name"
                                className="text-sm"
                              />
                              <Textarea
                                value={epicEditForm.description}
                                onChange={(e) => setEpicEditForm(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Epic description"
                                rows={2}
                                className="text-sm"
                              />
                              
                              {/* Color Selection */}
                              <div className="space-y-2">
                                <label className="text-xs font-medium">Color</label>
                                <div className="flex gap-1 flex-wrap">
                                  {colorOptions.map(color => (
                                    <button
                                      key={color}
                                      onClick={() => setEpicEditForm(prev => ({ ...prev, color }))}
                                      className={`w-6 h-6 rounded-full ${color} ${
                                        epicEditForm.color === color ? 'ring-2 ring-gray-400' : ''
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>

                              {/* Confidence and Phase */}
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                  <label className="text-xs font-medium">Confidence</label>
                                  <Select value={epicEditForm.confidence} onValueChange={(value: 'low' | 'medium' | 'high') => setEpicEditForm(prev => ({ ...prev, confidence: value }))}>
                                    <SelectTrigger className="h-8 text-xs">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {confidenceOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                          <span className={option.color}>{option.label}</span>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-xs font-medium">Phase</label>
                                  <Select value={epicEditForm.phase.toString()} onValueChange={(value) => setEpicEditForm(prev => ({ ...prev, phase: parseInt(value) }))}>
                                    <SelectTrigger className="h-8 text-xs">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {phaseOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value.toString()}>
                                          <span className={option.color}>{option.label}</span>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              {/* Dates */}
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                  <label className="text-xs font-medium">Start Date</label>
                                  <Input
                                    type="date"
                                    value={epicEditForm.startDate}
                                    onChange={(e) => setEpicEditForm(prev => ({ ...prev, startDate: e.target.value }))}
                                    className="text-xs h-8"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-xs font-medium">End Date</label>
                                  <Input
                                    type="date"
                                    value={epicEditForm.endDate}
                                    onChange={(e) => setEpicEditForm(prev => ({ ...prev, endDate: e.target.value }))}
                                    className="text-xs h-8"
                                  />
                                </div>
                              </div>

                              {/* Progress */}
                              <div className="space-y-1">
                                <label className="text-xs font-medium">Progress (%)</label>
                                <Input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={epicEditForm.progress}
                                  onChange={(e) => setEpicEditForm(prev => ({ ...prev, progress: parseInt(e.target.value) || 0 }))}
                                  className="text-xs h-8"
                                />
                              </div>

                              <div className="flex gap-2">
                                <Button size="sm" onClick={handleEpicEditSave} className="text-xs">Save</Button>
                                <Button size="sm" variant="outline" onClick={handleEpicEditCancel} className="text-xs">Cancel</Button>
                              </div>
                            </div>
                          ) : (
                            <div 
                              className={`cursor-pointer p-2 rounded transition-colors ${
                                epic.isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                              }`}
                              onClick={() => onUpdateEpic(epic.id, { isSelected: !epic.isSelected })}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <div className={`w-3 h-3 rounded-full ${epic.color}`}></div>
                                <span className="font-medium text-sm">{epic.name}</span>
                              </div>
                              
                              {epic.description && (
                                <p className="text-xs text-gray-600 mb-2">{epic.description}</p>
                              )}

                              {/* Epic Details */}
                              <div className="space-y-1 mb-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-500">Confidence:</span>
                                  <span className={getConfidenceDisplay(epic.confidence).color}>
                                    {getConfidenceDisplay(epic.confidence).label}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-500">Phase:</span>
                                  <span className={getPhaseDisplay(epic.phase).color}>
                                    {getPhaseDisplay(epic.phase).label}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-500">Timeline:</span>
                                  <span className="text-gray-700">
                                    {formatDate(epic.startDate)} - {formatDate(epic.endDate)}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-500">Progress:</span>
                                  <div className="flex items-center gap-2">
                                    <div className="w-12 h-2 bg-gray-200 rounded-full">
                                      <div 
                                        className="h-2 bg-blue-500 rounded-full" 
                                        style={{ width: `${epic.progress}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-gray-700">{epic.progress}%</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => handleEpicEditStart(epic)}
                                  className="h-6 px-2"
                                >
                                  <Edit2 className="h-3 w-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => onDeleteEpic(epic.id)}
                                  className="h-6 px-2 text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              )}

              {/* Sprints Section */}
              {activeSection === 'sprints' && (
                <Card className="p-3">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">Sprints (Select One)</h3>
                      <Button size="sm" onClick={() => setShowAddSprint(true)} className="gap-1">
                        <Plus className="h-3 w-3" />
                        Add Sprint
                      </Button>
                    </div>

                    {/* Add Sprint Form */}
                    {showAddSprint && (
                      <div className="border rounded-lg p-2 space-y-2">
                        <Input
                          value={newSprintForm.name}
                          onChange={(e) => setNewSprintForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Sprint name"
                          className="text-sm"
                        />
                        <div className="grid grid-cols-2 gap-1">
                          <Input
                            type="date"
                            value={newSprintForm.startDate}
                            onChange={(e) => setNewSprintForm(prev => ({ ...prev, startDate: e.target.value }))}
                            className="text-xs"
                          />
                          <Input
                            type="date"
                            value={newSprintForm.endDate}
                            onChange={(e) => setNewSprintForm(prev => ({ ...prev, endDate: e.target.value }))}
                            className="text-xs"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={newSprintForm.isActive}
                            onChange={(e) => setNewSprintForm(prev => ({ ...prev, isActive: e.target.checked }))}
                            className="w-3 h-3"
                          />
                          <span className="text-xs">Active</span>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" onClick={handleAddSprintSave} className="text-xs h-6">Save</Button>
                          <Button size="sm" variant="outline" onClick={() => setShowAddSprint(false)} className="text-xs h-6">Cancel</Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      {sprints.map(sprint => (
                        <div key={sprint.id} className="border rounded p-2">
                          {editingSprintId === sprint.id ? (
                            <div className="space-y-2">
                              <Input
                                value={sprintEditForm.name}
                                onChange={(e) => setSprintEditForm(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Sprint name"
                                className="text-sm"
                                disabled={sprint.id === 'backlog' || sprint.id === 'all-tasks'}
                              />
                              {sprint.id !== 'backlog' && sprint.id !== 'all-tasks' && (
                                <>
                                  <div className="grid grid-cols-2 gap-1">
                                    <Input
                                      type="date"
                                      value={sprintEditForm.startDate}
                                      onChange={(e) => setSprintEditForm(prev => ({ ...prev, startDate: e.target.value }))}
                                      className="text-xs"
                                    />
                                    <Input
                                      type="date"
                                      value={sprintEditForm.endDate}
                                      onChange={(e) => setSprintEditForm(prev => ({ ...prev, endDate: e.target.value }))}
                                      className="text-xs"
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={sprintEditForm.isActive}
                                      onChange={(e) => setSprintEditForm(prev => ({ ...prev, isActive: e.target.checked }))}
                                      className="w-3 h-3"
                                    />
                                    <span className="text-xs">Active</span>
                                  </div>
                                </>
                              )}
                              <div className="flex gap-1">
                                <Button size="sm" onClick={handleSprintEditSave} className="text-xs h-6">Save</Button>
                                <Button size="sm" variant="outline" onClick={handleSprintEditCancel} className="text-xs h-6">Cancel</Button>
                              </div>
                            </div>
                          ) : (
                            <div 
                              className={`cursor-pointer p-1 rounded transition-colors ${
                                sprint.isSelected ? 'bg-green-50 border-green-200 ring-2 ring-green-300' : 'hover:bg-gray-50'
                              }`}
                              onClick={() => handleSprintSelect(sprint.id)}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <Calendar className="h-3 w-3 text-gray-500" />
                                <span className="font-medium text-xs">{sprint.name}</span>
                                {sprint.isActive && (
                                  <span className="text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded">Active</span>
                                )}
                                {(sprint.id === 'backlog' || sprint.id === 'all-tasks') && (
                                  <span className="text-xs bg-gray-100 text-gray-800 px-1 py-0.5 rounded">System</span>
                                )}
                              </div>
                              {sprint.id !== 'backlog' && sprint.id !== 'all-tasks' && (
                                <p className="text-xs text-gray-500 mb-1">
                                  {sprint.startDate.toLocaleDateString()} - {sprint.endDate.toLocaleDateString()}
                                </p>
                              )}
                              <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => handleSprintEditStart(sprint)}
                                  className="h-5 px-1"
                                >
                                  <Edit2 className="h-3 w-3" />
                                </Button>
                                {sprint.id !== 'backlog' && sprint.id !== 'all-tasks' && (
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => onDeleteSprint(sprint.id)}
                                    className="h-5 px-1 text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export const ManagementSidebar: React.FC<ManagementSidebarProps & { children?: React.ReactNode }> = (props) => {
  return (
    <SidebarProvider>
      {/* <div className="flex w-full  h-[calc(100vh-4rem)]"> */}
        <div className="flex w-full">
        {/* Desktop sidebar - always visible */}
        <div className="hidden md:block w-12 fixed h-full">
          <ManagementSidebarContent {...props} />
        </div>
        
        {/* Mobile sidebar - overlay approach */}
        <div className="md:hidden">
          <ManagementSidebarContent {...props} />
        </div>
        
        {/* Main content area - takes remaining space */}
        <div className="flex-1 min-w-0 ml-16 px-4 md:px-6">
          <div className="w-full">
            {props.children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
