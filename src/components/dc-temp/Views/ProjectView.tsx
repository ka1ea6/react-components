import { ManagementSidebar } from "@/components/DigitalColleagues/ManagementSidebar"
import { KanbanBoard } from"@/components/DigitalColleagues/KanbanBoard"

import { Epic, Sprint, Project, Task } from "@/components/DigitalColleagues/KanbanBoard"

interface Props {
  title?: string
    projects: Project[];
    epics: Epic[];
    sprints: Sprint[];
    tasks: Task[];
    currentView: 'kanban' | 'planning' | 'documentation' | 'epics';
    onUpdateProject: (projectId: string, updates: Partial<Project>) => void;
    onDeleteProject: (projectId: string) => void;
    onAddProject: (project: Omit<Project, 'id'>) => void;
    onUpdateEpic: (epicId: string, updates: Partial<Epic>) => void;
    onDeleteEpic: (epicId: string) => void;
    onAddEpic: () => void;
    onAddSprint: (sprint: Omit<Sprint, 'id'>) => void;
    onUpdateSprint: (sprintId: string, updates: Partial<Sprint>) => void;
    onDeleteSprint: (sprintId: string) => void;
    onViewChange: (view: 'kanban' | 'planning' | 'documentation' | 'epics') => void;
    mobileMenuOpen: boolean;
    onToggleMobileMenu: () => void;
//   businessUnits: BusinessUnit[]
}

export default function ProjectView({ title = "" ,
    projects,
  epics,
  sprints,
  tasks,
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
}: Props) {
return (
    <ManagementSidebar
      projects={projects}
  epics={epics}
  sprints={sprints}
  currentView={currentView}
  onUpdateProject={onUpdateProject}
  onDeleteProject= {onDeleteProject}
  onAddProject= {onAddProject}
  onUpdateEpic= {onUpdateEpic}
  onDeleteEpic= {onDeleteEpic}
  onAddEpic={onAddEpic}
  onAddSprint= {onAddSprint}
  onUpdateSprint= {onUpdateSprint}
  onDeleteSprint= {onDeleteSprint}
  onViewChange= {onViewChange}
  mobileMenuOpen={mobileMenuOpen}
  onToggleMobileMenu={onToggleMobileMenu}
    >
      <div className="p-0">
        <KanbanBoard 
        initialProjects={projects}
            initialEpics={epics}
            initialSprints={sprints}
            initialTasks={tasks}
            />
      </div>
    </ManagementSidebar>
)
}
