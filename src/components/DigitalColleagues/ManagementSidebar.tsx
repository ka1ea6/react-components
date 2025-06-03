
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarProvider,
  SidebarTrigger,
  useSidebar 
} from '@/components/ui/sidebar';
import { Epic, Sprint } from './KanbanBoard';
import { X, Plus, Edit2, Trash2, Calendar, Kanban, FileText } from 'lucide-react';

interface ManagementSidebarProps {
  epics: Epic[];
  sprints: Sprint[];
  currentView: 'kanban' | 'planning' | 'documentation';
  onUpdateEpic: (epicId: string, updates: Partial<Epic>) => void;
  onDeleteEpic: (epicId: string) => void;
  onAddEpic: () => void;
  onAddSprint: (sprint: Omit<Sprint, 'id'>) => void;
  onUpdateSprint: (sprintId: string, updates: Partial<Sprint>) => void;
  onDeleteSprint: (sprintId: string) => void;
  onViewChange: (view: 'kanban' | 'planning' | 'documentation') => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

type SectionType = 'epics' | 'sprints' | null;

const ManagementSidebarContent: React.FC<ManagementSidebarProps> = ({
  epics,
  sprints,
  currentView,
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
  const [editingEpic, setEditingEpic] = useState<string | null>(null);
  const [editingSprintId, setEditingSprintId] = useState<string | null>(null);
  const [epicEditForm, setEpicEditForm] = useState({ name: '', description: '', color: '' });
  const [sprintEditForm, setSprintEditForm] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    isActive: false,
  });
  const [showAddSprint, setShowAddSprint] = useState(false);
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

  const handleEpicEditStart = (epic: Epic) => {
    setEditingEpic(epic.id);
    setEpicEditForm({
      name: epic.name,
      description: epic.description || '',
      color: epic.color,
    });
  };

  const handleEpicEditSave = () => {
    if (editingEpic && epicEditForm.name.trim()) {
      onUpdateEpic(editingEpic, {
        name: epicEditForm.name.trim(),
        description: epicEditForm.description.trim(),
        color: epicEditForm.color,
      });
      setEditingEpic(null);
    }
  };

  const handleEpicEditCancel = () => {
    setEditingEpic(null);
    setEpicEditForm({ name: '', description: '', color: '' });
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
    setSprintEditForm({ name: '', description: '', startDate: '', endDate: '', isActive: false });
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

  return (
    <>
      {/* Narrow Strip - Fixed positioning below header */}
      <div className={`fixed left-0 w-12 bg-slate-800 flex flex-col z-30 flex-shrink-0 transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
      style={{ top: '8.5rem', height: 'calc(100vh - 8.5rem)' }}>
        <button
          onClick={() => {
            onViewChange('kanban');
            setActiveSection(null);
          }}
          className={`flex-1 flex items-center justify-center text-white transition-colors ${
            currentView === 'kanban' ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          title="Kanban"
        >
          <Kanban className="h-4 w-4 md:h-5 md:w-5" />
        </button>
        <button
          onClick={() => setActiveSection(activeSection === 'epics' ? null : 'epics')}
          className={`flex-1 flex items-center justify-center text-white transition-colors ${
            activeSection === 'epics' ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          title="Epics"
        >
          <span className="text-xs font-bold transform -rotate-90 whitespace-nowrap">EPICS</span>
        </button>
        <button
          onClick={() => setActiveSection(activeSection === 'sprints' ? null : 'sprints')}
          className={`flex-1 flex items-center justify-center text-white transition-colors ${
            activeSection === 'sprints' ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600'
          }`}
          title="Sprints"
        >
          <span className="text-xs font-bold transform -rotate-90 whitespace-nowrap">SPRINTS</span>
        </button>
        <button
          onClick={() => {
            onViewChange('planning');
            setActiveSection(null);
          }}
          className={`flex-1 flex items-center justify-center text-white transition-colors ${
            currentView === 'planning' ? 'bg-purple-600' : 'bg-purple-500 hover:bg-purple-600'
          } hidden md:flex`}
          title="Planning"
        >
          <span className="text-xs font-bold transform -rotate-90 whitespace-nowrap">PLANNING</span>
        </button>
        <button
          onClick={() => {
            onViewChange('documentation');
            setActiveSection(null);
          }}
          className={`flex-1 flex items-center justify-center text-white transition-colors ${
            currentView === 'documentation' ? 'bg-orange-600' : 'bg-orange-500 hover:bg-orange-600'
          }`}
          title="Documentation"
        >
          <FileText className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-20" 
          style={{ top: '8.5rem' }}
          onClick={onToggleMobileMenu}
        />
      )}

      {/* Popup Panels */}
      {activeSection && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-40" 
            style={{ top: '8.5rem' }}
            onClick={() => setActiveSection(null)}
          />
          
          {/* Panel */}
          <div className="fixed left-12 md:left-16 w-72 md:w-80 bg-white shadow-lg z-50 transform transition-transform max-w-[calc(100vw-3rem)] md:max-w-none"
               style={{ top: '8.5rem', height: 'calc(100vh - 8.5rem)' }}>
            <div className="p-3 md:p-4 border-b flex items-center justify-between">
              <h2 className="text-base md:text-lg font-semibold">
                {activeSection === 'epics' && 'Manage Epics'}
                {activeSection === 'sprints' && 'Manage Sprints'}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setActiveSection(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-3 md:p-4 space-y-4 h-full overflow-y-auto">
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
                    
                    <div className="space-y-3">
                      {epics.map(epic => (
                        <div key={epic.id} className="border rounded-lg p-3">
                          {editingEpic === epic.id ? (
                            <div className="space-y-2">
                              <Input
                                value={epicEditForm.name}
                                onChange={(e) => setEpicEditForm(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Epic name"
                              />
                              <Textarea
                                value={epicEditForm.description}
                                onChange={(e) => setEpicEditForm(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Epic description"
                                rows={2}
                              />
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
                              <div className="flex gap-2">
                                <Button size="sm" onClick={handleEpicEditSave}>Save</Button>
                                <Button size="sm" variant="outline" onClick={handleEpicEditCancel}>Cancel</Button>
                              </div>
                            </div>
                          ) : (
                            <div 
                              className={`cursor-pointer p-2 rounded transition-colors ${
                                epic.isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                              }`}
                              onClick={() => onUpdateEpic(epic.id, { isSelected: !epic.isSelected })}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <div className={`w-3 h-3 rounded-full ${epic.color}`}></div>
                                <span className="font-medium text-sm">{epic.name}</span>
                              </div>
                              {epic.description && (
                                <p className="text-xs text-gray-600 mb-2">{epic.description}</p>
                              )}
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
      <div className="flex h-full w-full">
        {/* Desktop sidebar - always visible */}
        <div className="hidden md:block w-16">
          <ManagementSidebarContent {...props} />
        </div>
        
        {/* Mobile sidebar - use overlay approach */}
        <div className="md:hidden">
          <ManagementSidebarContent {...props} />
        </div>
        
        {/* Main content with proper margin */}
        <div className="flex-1 md:ml-0">
          {props.children}
        </div>
      </div>
    </SidebarProvider>
  );
};
