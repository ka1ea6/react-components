"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, Search, Settings, Wand2, X, Star, Heart, MoreVertical } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { BusinessUnitSwitcher } from "../Projects/business-unit-switcher"
import { cn } from "@/lib/utils"
import { businessUnits } from "./test-data"
import type { BusinessUnit, SidebarItem } from "./types"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface SidebarProps {
  items: SidebarItem[]
  isOpen: boolean
  isMobile?: boolean
  onClose?: () => void
  currentBusinessUnit?: BusinessUnit
  onBusinessUnitChange?: (unit: BusinessUnit) => void
  className?: string
  logo?: string
  appName?: string
  tagline?: string
  maxItems?: number
}

export function Sidebar({
  items,
  isOpen,
  isMobile = false,
  onClose,
  currentBusinessUnit = businessUnits[0], // Default to Design unit
  onBusinessUnitChange,
  className,
  logo = "/headerlogo.png",
  appName = "Nuvia",
  tagline = "Collaboration Platform",
  maxItems,
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({})
  const [favorites, setFavorites] = useLocalStorage<string[]>('sidebar-favorites', [])
  const [showFavoritesDialog, setShowFavoritesDialog] = React.useState(false)

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const handleBusinessUnitChange = (unit: BusinessUnit) => {
    onBusinessUnitChange?.(unit)
  }

  const toggleFavorite = (itemId: string) => {
    const newFavorites = favorites.includes(itemId)
      ? favorites.filter((id: string) => id !== itemId)
      : maxItems && favorites.length >= maxItems
        ? favorites // Don't add if at max limit
        : [...favorites, itemId]
    setFavorites(newFavorites)
  }

  const getDisplayItems = () => {
    if (!maxItems || items.length <= maxItems) {
      return items
    }
    
    // Show favorited items first, then fill remaining slots with non-favorites
    const favoriteItems = items.filter(item => favorites.includes(item.id))
    const nonFavoriteItems = items.filter(item => !favorites.includes(item.id))
    
    return [...favoriteItems, ...nonFavoriteItems].slice(0, maxItems)
  }

  const needsFavorites = maxItems && items.length > maxItems
  const displayItems = getDisplayItems()

  const renderSidebarItem = (item: SidebarItem) => {
    const isFavorite = favorites.includes(item.id)

    const buttonContent = (
      <>
        <div className="flex items-center gap-3">
          {item.icon}
          <span>{item.title}</span>
          {needsFavorites && isFavorite && (
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          )}
        </div>
        {item.badge && (
          <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
            {item.badge}
          </Badge>
        )}
        {item.items && (
          <ChevronDown
            className={cn("ml-2 h-4 w-4 transition-transform", expandedItems[item.title] ? "rotate-180" : "")}
          />
        )}
      </>
    )

    const buttonClasses = cn(
      "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium",
      item.isActive ? "bg-primary/10 text-primary" : "hover:bg-muted",
    )

    if (item.url) {
      return (
        <Link href={item.url} className={buttonClasses} onClick={isMobile ? onClose : undefined}>
          {buttonContent}
        </Link>
      )
    }

    return (
      <button className={buttonClasses} onClick={() => item.items && toggleExpanded(item.title)}>
        {buttonContent}
      </button>
    )
  }

  const FavoritesDialog = () => (
    <Dialog open={showFavoritesDialog} onOpenChange={setShowFavoritesDialog}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-xs">
          {favorites.length}/{maxItems} favorites
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Favorites</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Select up to {maxItems} items to show in your sidebar.
          </p>
        </DialogHeader>
        <ScrollArea className="max-h-96 pr-4">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox
                  id={item.id}
                  checked={favorites.includes(item.id)}
                  onCheckedChange={() => toggleFavorite(item.id)}
                  disabled={!favorites.includes(item.id) && favorites.length >= (maxItems || 0)}
                />
                <label
                  htmlFor={item.id}
                  className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                >
                  {item.icon}
                  {item.title}
                  {item.badge && (
                    <Badge variant="outline" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )

  const sidebarContent = (
    <div className="flex h-full flex-col border-r bg-background">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center">
            <img src={logo} alt="Header Logo" className="h-14 w-14 object-contain" />
          </div>
          <div>
            <h2 className="font-semibold">{appName}</h2>
            <p className="text-xs text-muted-foreground">{tagline}</p>
          </div>
        </div>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="px-3 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
        </div>
      </div>

      {/* Business Unit Switcher */}
      <div className="px-3 pb-2">
        <BusinessUnitSwitcher currentUnit={currentBusinessUnit} onUnitChange={handleBusinessUnitChange} />
      </div>

      {/* Favorites Management */}
      {needsFavorites && (
        <div className="px-3 pb-2 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            Showing {displayItems.length} of {items.length} items
          </span>
          <FavoritesDialog />
        </div>
      )}

      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {displayItems.map((item) => (
            <div key={item.id} className="mb-1">
              {renderSidebarItem(item)}

              {item.items && expandedItems[item.title] && (
                <div className="mt-1 ml-6 space-y-1 border-l pl-3">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.id}
                      href={subItem.url}
                      className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-muted"
                      onClick={isMobile ? onClose : undefined}
                    >
                      {subItem.title}
                      {subItem.badge && (
                        <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                          {subItem.badge}
                        </Badge>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-3">
        <div className="space-y-1">
          <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-background transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        {sidebarContent}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 transform border-r bg-background transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className,
      )}
    >
      {sidebarContent}
    </div>
  )
}
