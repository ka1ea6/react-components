"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Capability, CapabilityContext, CapabilityData } from "../../test-data/capabilities"
import type { CapabilityColorScheme } from "../../test-data/capabilities"
import { defaultColorScheme } from "../../test-data/capabilities"

interface CapabilityMenuProps {
  capabilities: Capability[]
  isOpen: boolean
  onToggle: () => void
  onActionSelect: (actionId: string, context: CapabilityContext) => void
  onContextChange?: (context: CapabilityContext) => void
  colorScheme?: CapabilityColorScheme
  className?: string
}

export function CapabilityMenu({
  capabilities,
  isOpen,
  onToggle,
  onActionSelect,
  onContextChange,
  colorScheme = defaultColorScheme,
  className
}: CapabilityMenuProps) {
  const [navigationPath, setNavigationPath] = useState<Capability[]>([])
  const [selectedItems, setSelectedItems] = useState<any[]>([])

  const currentCapability = navigationPath[navigationPath.length - 1]
  const currentLevel = currentCapability?.children || capabilities

  // Function to get color for a capability based on type and index
  const getCapabilityColor = (capability: Capability, index: number) => {
    switch (capability.type) {
      case "category":
        return colorScheme.categories[index % colorScheme.categories.length]
      case "list":
        return colorScheme.lists[index % colorScheme.lists.length]
      case "item":
        return colorScheme.items[index % colorScheme.items.length]
      default:
        return colorScheme.primary
    }
  }

  const context: CapabilityContext = useMemo(() => ({
    path: navigationPath,
    selectedItems,
    filters: {}
  }), [navigationPath, selectedItems])

  // Notify parent when context changes
  useEffect(() => {
    if (onContextChange) {
      onContextChange(context)
    }
  }, [context, onContextChange])

  const handleNavigation = (capability: Capability) => {
    if (capability.type === "category" || capability.type === "list") {
      setNavigationPath([...navigationPath, capability])
    } else if (capability.type === "item") {
      // Handle item selection
      setSelectedItems([...selectedItems, capability])
    }
  }

  const handleBackNavigation = () => {
    setNavigationPath(navigationPath.slice(0, -1))
  }

  const handleBreadcrumbNavigation = (index: number) => {
    setNavigationPath(navigationPath.slice(0, index + 1))
  }

  const getAvailableActions = () => {
    if (currentCapability?.actions) {
      return currentCapability.actions
    }
    return []
  }

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        size="sm"
        variant="outline"
        className="rounded-full"
      >
        <Menu className="h-4 w-4" />
        <span className="ml-2">Capabilities</span>
      </Button>
    )
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {navigationPath.length > 0 && (
            <motion.button
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
              }}
              whileTap={{ 
                scale: 0.9,
                transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
              }}
              onClick={handleBackNavigation}
              className={cn(
                "group p-1 h-6 w-6 rounded-md backdrop-blur-sm",
                "transition-all duration-300 ease-in-out",
                "hover:bg-accent/50 hover:shadow-sm"
              )}
            >
              <ChevronLeft className={cn(
                "h-3 w-3 transition-transform duration-300 ease-in-out",
                "group-hover:-translate-x-0.5"
              )} />
            </motion.button>
          )}
          <h4 className="font-medium text-sm">
            {currentCapability?.name || "Capabilities"}
          </h4>
        </div>
        <motion.button
          whileHover={{ 
            scale: 1.1,
            transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
          }}
          whileTap={{ 
            scale: 0.9,
            transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
          }}
          onClick={onToggle}
          className={cn(
            "group p-1 h-6 w-6 rounded-md backdrop-blur-sm",
            "transition-all duration-300 ease-in-out",
            "hover:bg-accent/50 hover:shadow-sm"
          )}
        >
          <X className={cn(
            "h-3 w-3 transition-transform duration-300 ease-in-out",
            "group-hover:rotate-90"
          )} />
        </motion.button>
      </div>

      {/* Breadcrumb Navigation */}
      {navigationPath.length > 0 && (
        <div className="flex items-center gap-1 mb-3 text-xs text-muted-foreground">
          <motion.button
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            }}
            onClick={() => setNavigationPath([])}
            className={cn(
              "group relative transition-colors duration-300 ease-in-out hover:text-accent"
            )}
          >
            <span className="relative">
              Capabilities
              <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-accent transform -translate-x-1/2 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </span>
          </motion.button>
          {navigationPath.map((item, index) => (
            <div key={item.id} className="flex items-center gap-1">
              <ChevronRight className="h-2 w-2" />
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                }}
                onClick={() => handleBreadcrumbNavigation(index)}
                className={cn(
                  "group relative transition-colors duration-300 ease-in-out hover:text-accent"
                )}
              >
                <span className="relative">
                  {item.name}
                  <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-accent transform -translate-x-1/2 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </span>
              </motion.button>
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="max-h-40 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCapability?.id || "root"}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ 
              duration: 0.2, 
              ease: [0.4, 0, 0.2, 1] // easeInOut curve similar to header
            }}
          >
            {currentCapability?.type === "list" && currentCapability.data ? (
              <CapabilityDataList
                data={currentCapability.data}
                onItemSelect={(item) => setSelectedItems([...selectedItems, item])}
                colorScheme={colorScheme}
              />
            ) : (
              <CapabilityGrid
                capabilities={currentLevel}
                onSelect={handleNavigation}
                colorScheme={colorScheme}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

interface CapabilityGridProps {
  capabilities: Capability[]
  onSelect: (capability: Capability) => void
  colorScheme: CapabilityColorScheme
}

function CapabilityGrid({ capabilities, onSelect, colorScheme }: CapabilityGridProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {capabilities.map((capability, index) => (
        <CapabilityCard
          key={capability.id}
          capability={capability}
          onClick={() => onSelect(capability)}
          color={colorScheme.categories[index % colorScheme.categories.length]}
        />
      ))}
    </div>
  )
}

interface CapabilityCardProps {
  capability: Capability
  onClick: () => void
  selected?: boolean
  color: string
}

function CapabilityCard({ capability, onClick, selected, color }: CapabilityCardProps) {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
      }}
      className={cn(
        "group relative inline-flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer",
        "bg-background text-left text-sm font-medium backdrop-blur-sm",
        "transition-all duration-300 ease-in-out",
        "hover:bg-accent/50 hover:border-accent/50 hover:shadow-sm",
        selected && "border-primary bg-accent scale-105"
      )}
      onClick={onClick}
    >
      <div className={cn(
        "w-2 h-2 rounded-full flex-shrink-0 transition-transform duration-300 ease-in-out",
        "group-hover:scale-125",
        color
      )}></div>
      <span className="truncate relative">
        {capability.name}
        <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-accent transform -translate-x-1/2 transition-all duration-300 ease-in-out group-hover:w-full"></span>
      </span>
      {(capability.children || capability.data) && (
        <ChevronRight className={cn(
          "h-3 w-3 text-muted-foreground flex-shrink-0",
          "transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
        )} />
      )}
      {capability.type === "list" && capability.data && (
        <Badge variant="secondary" className={cn(
          "text-xs h-5 px-1.5 flex-shrink-0",
          "transition-transform duration-300 ease-in-out group-hover:scale-110"
        )}>
          {capability.data.length}
        </Badge>
      )}
    </motion.button>
  )
}

interface CapabilityDataListProps {
  data: CapabilityData[]
  onItemSelect: (item: CapabilityData) => void
  colorScheme: CapabilityColorScheme
}

function CapabilityDataList({ data, onItemSelect, colorScheme }: CapabilityDataListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {data.map((item, index) => (
        <motion.button
          key={item.id}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
          }}
          whileTap={{ 
            scale: 0.95,
            transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
          }}
          className={cn(
            "group relative inline-flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer",
            "bg-background text-left text-sm font-medium backdrop-blur-sm",
            "transition-all duration-300 ease-in-out",
            "hover:bg-accent/50 hover:border-accent/50 hover:shadow-sm"
          )}
          onClick={() => onItemSelect(item)}
        >
          <div className={cn(
            "w-2 h-2 rounded-full flex-shrink-0 transition-transform duration-300 ease-in-out",
            "group-hover:scale-125",
            colorScheme.items[index % colorScheme.items.length]
          )}></div>
          <div className="flex-1 min-w-0">
            <span className="truncate relative font-medium">
              {item.title}
              <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-accent transform -translate-x-1/2 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </span>
            {item.subtitle && (
              <div className={cn(
                "text-xs text-muted-foreground truncate",
                "transition-colors duration-300 ease-in-out group-hover:text-accent/80"
              )}>
                {item.subtitle}
              </div>
            )}
          </div>
          {item.value && (
            <Badge variant="secondary" className={cn(
              "text-xs h-5 px-1.5 flex-shrink-0 ml-2",
              "transition-transform duration-300 ease-in-out group-hover:scale-110"
            )}>
              {item.value}
            </Badge>
          )}
        </motion.button>
      ))}
    </div>
  )
}

interface ContextActionsProps {
  actions: any[]
  context: CapabilityContext
  onActionSelect: (actionId: string, context: CapabilityContext) => void
}

function ContextActions({ actions, context, onActionSelect }: ContextActionsProps) {
  if (actions.length === 0) return null

  return (
    <div className="mt-3 pt-3 border-t">
      <p className="text-xs text-muted-foreground mb-2">Quick Actions:</p>
      <div className="flex flex-wrap gap-1">
        {actions.map((action) => (
          <motion.button
            key={action.id}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] }
            }}
            className={cn(
              "group relative text-xs h-7 px-2 rounded-md border bg-background",
              "transition-all duration-300 ease-in-out backdrop-blur-sm",
              "hover:bg-accent/50 hover:border-accent/50 hover:shadow-sm"
            )}
            onClick={() => onActionSelect(action.id, context)}
          >
            <span className="relative">
              {action.label}
              <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-accent transform -translate-x-1/2 transition-all duration-300 ease-in-out group-hover:w-full"></span>
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
