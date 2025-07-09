
import { HeroSection } from "../hero-section"
import type { KnowledgeDocument, KnowledgeMenuConfig } from "../../DigitalColleagues/types"
import { KnowledgeBrowser } from "../knowledge-browser"

interface KnowledgeViewProps {
    documents?: KnowledgeDocument[]
    menuConfig?: KnowledgeMenuConfig
    onDocumentClick?: (document: KnowledgeDocument) => void
    onDocumentShare?: (document: KnowledgeDocument) => void
    selectedDocumentId?: string
}
export default function KnowledgeView({
    documents = [],
    menuConfig = {
        groupBy: ['category', 'type'],
        sortBy: 'title',
        sortOrder: 'asc',
        showDocumentCount: true
    },
    onDocumentClick = (document: KnowledgeDocument) => console.log("Document clicked:", document),
    onDocumentShare = (document: KnowledgeDocument) => console.log("Share document:", document),
    selectedDocumentId,
}: KnowledgeViewProps)  {

return (
    <div className="flex flex-col h-full">
                <div className="px-2 md:px-4 py-4 flex-shrink-0">
                  <HeroSection
                    title="Knowledge"
                    description="Access, manage, and share all your team knowledge in one place."
                    gradient="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600"
                    primaryAction={{
                      label: "Create",
                      onClick: () => console.log("Create document clicked"),
                    }}
                  />
                </div>
    
                <div className="flex-1 min-h-0 px-2 md:px-4 pb-4">
                  <div className="h-full rounded-3xl border overflow-hidden">
                    <KnowledgeBrowser 
                      documents={documents}
                      menuConfig={menuConfig}
                      onDocumentClick={onDocumentClick}
                      onDocumentShare={onDocumentShare}
                      selectedDocumentId={selectedDocumentId}
                    />
                  </div>
                </div>
              </div>
)
}