"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CreativeLayout } from "../creative-layout"
import { HeroSection } from "../hero-section"
import { AppCard } from "../app-card"
import { FileList } from "../file-list"
import { ProjectCard } from "../project-card"
import { type BusinessUnit } from "../business-units"
import {
  mockSidebarItems,
  mockApps,
  mockRecentFiles,
  mockProjects,
  mockTutorials,
  mockNotifications,
} from "../mock-data"
import type { App, RecentFile } from "../../DigitalColleagues/types"
import type { Epic, Sprint, Project, Task } from "@/components/DigitalColleagues/KanbanBoard"

import { ColleaguesManagement } from "../colleagues-management"
import ProjectView from "../Views/ProjectView"
const AnimatedCircles = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    className="relative h-40 w-40"
  >
    <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md" />
    <div className="absolute inset-4 rounded-full bg-white/20" />
    <div className="absolute inset-8 rounded-full bg-white/30" />
    <div className="absolute inset-12 rounded-full bg-white/40" />
    <div className="absolute inset-16 rounded-full bg-white/50" />
  </motion.div>
)

interface HomeProps {
  title?: string
    businessUnits: BusinessUnit[]

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
}

export default function ProjectPage({ title = "", 
  projects,
  businessUnits,
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
 }: HomeProps) {
  const [activeTab, setActiveTab] = useState("projects")
  const [currentBusinessUnit, setCurrentBusinessUnit] = useState<BusinessUnit>(businessUnits[0]) // Default to Design

  // Mock handlers
  const handleAppOpen = (app: App) => {
    console.log("Opening app:", app.name)
  }

  const handleAppFavorite = (app: App) => {
    console.log("Favoriting app:", app.name)
  }

  const handleFileClick = (file: RecentFile) => {
    console.log("Opening file:", file.name)
  }

  const handleFileShare = (file: RecentFile) => {
    console.log("Sharing file:", file.name)
  }

  const handleProjectOpen = (project: Project) => {
    console.log("Opening project:", project.name)
  }

  const handleProjectShare = (project: Project) => {
    console.log("Sharing project:", project.name)
  }

  const handleBusinessUnitChange = (unit: BusinessUnit) => {
    // setCurrentBusinessUnit(unit)
    console.log("Business unit changed to:", unit.name)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      
      case "projects":
        return (
          <ProjectView 
          initialProjects={projects}
  initialEpics={epics}
  initialSprints={sprints}
  initialTasks={tasks}
  // currentView={currentView}
  onUpdateProject={onUpdateProject}
  onDeleteProject= {onDeleteProject}
  onAddProject= {onAddProject}
  onUpdateEpic= {onUpdateEpic}
  onDeleteEpic= {onDeleteEpic}
  onAddEpic={onAddEpic}
  onAddSprint= {onAddSprint}
  onUpdateSprint= {onUpdateSprint}
  onDeleteSprint= {onDeleteSprint}
  // onViewChange= {onViewChange}
  // mobileMenuOpen={mobileMenuOpen}
  onToggleMobileMenu={onToggleMobileMenu}
          />
        )
      default:
        return null
    }
  }

  return (
    <CreativeLayout
      sidebarItems={mockSidebarItems}
      title={title}
      notifications={mockNotifications}
      businessUnits={businessUnits}
      currentBusinessUnit={currentBusinessUnit}
      onBusinessUnitChange={handleBusinessUnitChange}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      showTabs={true}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </CreativeLayout>
  )
}
