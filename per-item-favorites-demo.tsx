import React, { useState } from "react"
import { Sidebar } from "./src/components/DigitalColleagues/sidebar"
import { Home, Users, Layers, Bot, FileText, TrendingUp, Wrench, DollarSign, Scale, Package, Zap } from "lucide-react"

// Example demonstrating per-item maxItems functionality
const PerItemFavoritesDemo = () => {
  const [isOpen, setIsOpen] = useState(true)
  
  // Sidebar items with different maxItems per section
  const sidebarItems = [
    {
      id: "home",
      title: "Home",
      icon: <Home />,
      isActive: true,
    },
    {
      id: "teams",
      title: "Teams",
      icon: <Users />,
      maxItems: 2, // Only show 2 teams at a time
      items: [
        { id: "design", title: "Design Team", url: "/teams/design" },
        { id: "marketing", title: "Marketing Team", url: "/teams/marketing" },
        { id: "engineering", title: "Engineering Team", url: "/teams/engineering" },
        { id: "finance", title: "Finance Team", url: "/teams/finance" },
        { id: "sales", title: "Sales Team", url: "/teams/sales" },
      ]
    },
    {
      id: "projects",
      title: "Projects", 
      icon: <Layers />,
      badge: "8",
      maxItems: 3, // Only show 3 projects at a time
      items: [
        { id: "active", title: "Active Projects", url: "/projects/active", badge: "4" },
        { id: "planning", title: "In Planning", url: "/projects/planning", badge: "2" },
        { id: "review", title: "In Review", url: "/projects/review", badge: "1" },
        { id: "completed", title: "Completed", url: "/projects/completed" },
        { id: "archived", title: "Archived", url: "/projects/archived" },
        { id: "templates", title: "Templates", url: "/projects/templates" },
        { id: "shared", title: "Shared with Me", url: "/projects/shared", badge: "1" },
      ]
    },
    {
      id: "tools",
      title: "Tools",
      icon: <Wrench />,
      // No maxItems = all tools shown normally
      items: [
        { id: "calculator", title: "Calculator", url: "/tools/calculator" },
        { id: "converter", title: "Unit Converter", url: "/tools/converter" },
        { id: "generator", title: "Code Generator", url: "/tools/generator" },
      ]
    },
    {
      id: "copilot",
      title: "AI Copilot", 
      icon: <Bot />,
      url: "/copilot",
    },
    {
      id: "knowledge",
      title: "Knowledge Base",
      icon: <FileText />,
      url: "/knowledge",
    },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        items={sidebarItems}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      
      <main className="flex-1 p-8">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Per-Item Favorites Demo</h1>
          
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4">How it works:</h2>
            <div className="space-y-3 text-gray-700">
              <p>• <strong>Teams section</strong> shows 2/5 teams - expand and click "more items available" to choose favorites</p>
              <p>• <strong>Projects section</strong> shows 3/7 projects - also has favorites management</p>
              <p>• <strong>Tools section</strong> has no limit - shows all items normally</p>
              <p>• Favorites are saved per-section in localStorage</p>
              <p>• Favorite items always appear first within their sections</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Try it out:</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Expand the "Teams" section in the sidebar</li>
              <li>Notice it only shows 2 teams with "3 more items available" at the bottom</li>
              <li>Click the "3 more items available - click to manage favorites" text</li>
              <li>Select different teams as favorites in the dialog</li>
              <li>See how the displayed teams change immediately</li>
              <li>Try the same with the Projects section</li>
            </ol>
          </div>
          
          <button 
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Hide' : 'Show'} Sidebar
          </button>
        </div>
      </main>
    </div>
  )
}

export default PerItemFavoritesDemo
