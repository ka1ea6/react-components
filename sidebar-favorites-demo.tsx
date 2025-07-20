import React, { useState } from "react"
import { Sidebar } from "./src/components/DigitalColleagues/sidebar"
import { Home, Users, Layers, Bot, FileText, TrendingUp, Wrench, DollarSign, Scale, Package, Zap } from "lucide-react"

// Example of using the enhanced Sidebar component with favorites
const SidebarFavoritesDemo = () => {
  const [isOpen, setIsOpen] = useState(true)
  
  // Extended list of items (more than what we want to show)
  const allItems = [
    { id: "home", title: "Home", icon: <Home />, isActive: true },
    { id: "teams", title: "Teams", icon: <Users /> },
    { id: "projects", title: "Projects", icon: <Layers />, badge: "4" },
    { id: "copilot", title: "Copilot", icon: <Bot /> },
    { id: "knowledge", title: "Knowledge", icon: <FileText /> },
    { id: "analytics", title: "Analytics", icon: <TrendingUp />, badge: "New" },
    { id: "tools", title: "Tools", icon: <Wrench /> },
    { id: "finance", title: "Finance", icon: <DollarSign /> },
    { id: "compliance", title: "Compliance", icon: <Scale /> },
    { id: "products", title: "Products", icon: <Package /> },
    { id: "integrations", title: "Integrations", icon: <Zap />, badge: "Beta" },
  ]

  return (
    <div className="flex h-screen">
      {/* Sidebar with favorites - only show 5 items max */}
      <Sidebar
        items={allItems}
        isOpen={isOpen}
        maxItems={5}
        onClose={() => setIsOpen(false)}
      />
      
      {/* Main content area */}
      <main className="flex-1 p-6">
        <h1>Sidebar with Favorites Demo</h1>
        <p>
          This sidebar has {allItems.length} items but only shows 5 at a time.
          Click the favorites button to manage which items appear!
        </p>
        
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          Toggle Sidebar
        </button>
      </main>
    </div>
  )
}

export default SidebarFavoritesDemo
