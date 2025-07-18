
import { useState } from "react"
import { DashboardHero } from "../../Heros/DashboardHero/DashboardHero"
import type { KnowledgeDocument, KnowledgeContext } from "../types"
import { KnowledgeBrowser } from "../../dc-temp/knowledge-browser"
import { Button } from "@/components/ui/button"
import { FileText, Server, Code, Users, BookOpen, Settings } from "lucide-react"

interface KnowledgeViewProps {
    documents?: KnowledgeDocument[]
    contexts?: KnowledgeContext[]
    onDocumentClick?: (document: KnowledgeDocument) => void
    onDocumentShare?: (document: KnowledgeDocument) => void
    selectedDocumentId?: string
}

// Default contexts if none provided
const defaultContexts: KnowledgeContext[] = [
  {
    id: 'all',
    label: 'All Documentation',
    description: 'Browse all documentation organized by category and type',
    icon: <BookOpen className="h-4 w-4" />,
    menuConfig: {
      groupBy: ['category', 'type'],
      sortBy: 'title',
      sortOrder: 'asc',
      showDocumentCount: true
    }
  },
  {
    id: 'services',
    label: 'Services',
    description: 'Documentation organized by service and team',
    icon: <Server className="h-4 w-4" />,
    menuConfig: {
      groupBy: ['service', 'team'],
      sortBy: 'updatedAt',
      sortOrder: 'desc',
      showDocumentCount: true
    }
  },
  {
    id: 'architecture',
    label: 'Architecture',
    description: 'System architecture documentation by component and layer',
    icon: <Code className="h-4 w-4" />,
    menuConfig: {
      groupBy: ['component', 'layer'],
      sortBy: 'title',
      sortOrder: 'asc',
      showDocumentCount: true
    }
  },
  {
    id: 'teams',
    label: 'Teams',
    description: 'Documentation organized by team and project',
    icon: <Users className="h-4 w-4" />,
    menuConfig: {
      groupBy: ['team', 'project'],
      sortBy: 'updatedAt',
      sortOrder: 'desc',
      showDocumentCount: true
    }
  }
]
export default function KnowledgeView({
    documents = [],
    contexts = defaultContexts,
    onDocumentClick = (document: KnowledgeDocument) => console.log("Document clicked:", document),
    onDocumentShare = (document: KnowledgeDocument) => console.log("Share document:", document),
    selectedDocumentId,
}: KnowledgeViewProps)  {
    const [activeContext, setActiveContext] = useState(contexts[0])

return (
    <div className="flex flex-col h-full max-h-[calc(100vh-8rem)]">
                <div className="px-2 md:px-4 py-4 flex-shrink-0">
                  <DashboardHero
                    title="Knowledge"
                    description="Access, manage, and share all your team knowledge in one place."
                    gradient="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600"
                    primaryAction={{
                      label: "Create",
                      onClick: () => console.log("Create document clicked"),
                    }}
                  />
                  
                  {/* Context Tabs */}
                  <div className="mt-6">
                    <div className="border-b border-border">
                      <nav className="-mb-px flex space-x-8 overflow-x-auto">
                        {contexts.map((context) => (
                          <button
                            key={context.id}
                            onClick={() => setActiveContext(context)}
                            className={`group inline-flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                              activeContext.id === context.id
                                ? 'border-primary text-primary'
                                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                            }`}
                          >
                            {context.icon}
                            {context.label}
                          </button>
                        ))}
                      </nav>
                    </div>
                    
                    {/* Active Context Description */}
                    {activeContext.description && (
                      <div className="mt-3 px-1">
                        <p className="text-sm text-muted-foreground">
                          {activeContext.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
    
                <div className="flex-1 min-h-0 px-2 md:px-4 pb-4">
                  <div className="h-full rounded-3xl border overflow-hidden">
                    <KnowledgeBrowser 
                      documents={documents}
                      menuConfig={activeContext.menuConfig}
                      onDocumentClick={onDocumentClick}
                      onDocumentShare={onDocumentShare}
                      selectedDocumentId={selectedDocumentId}
                    />
                  </div>
                </div>
              </div>
)
}