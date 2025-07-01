"use client"

import { useState } from "react"
import { Bell, Cloud, Menu, MessageSquare, PanelLeft, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ThemeToggle } from "./theme-toggle"
import { NotificationsPanel } from "./notifications-panel"
import type { Notification } from "./notifications-panel"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface AppHeaderProps {
  title: string
  notifications?: Notification[]
  onToggleSidebar?: () => void
  onToggleMobileMenu?: () => void
  sidebarOpen?: boolean
  className?: string
  businessUnits?: Array<{ id: string; name: string } & Record<string, any>>
}

export function AppHeader({
  title,
  notifications = [],
  onToggleSidebar,
  onToggleMobileMenu,
  sidebarOpen = true,
  className,
  businessUnits,
}: AppHeaderProps) {
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false)
  const [notificationsData, setNotificationsData] = useState<Notification[]>(notifications)

  // Team switching state
  const [favoriteTeams, setFavoriteTeams] = useLocalStorage<string[]>("favoriteTeams", ["design", "engineering", "marketing"])
  const [selectedTeam, setSelectedTeam] = useState<string>(favoriteTeams[0])

  const favoriteUnits = businessUnits?.filter(unit => favoriteTeams.includes(unit.id)).slice(0, 3)
  const otherUnits = (businessUnits ?? [])
    .filter(unit => !favoriteTeams.includes(unit.id))
    .sort((a, b) => a.name.localeCompare(b.name))

  // Show all teams in the dropdown, with a solid star for favorites
  const allUnits = (businessUnits ?? []).slice().sort((a, b) => a.name.localeCompare(b.name))

  const toggleFavorite = (id: string) => {
    // setFavoriteTeams expects a value, not an updater function
    let updated: string[]
    if (favoriteTeams.includes(id)) {
      updated = favoriteTeams.filter((fid: string) => fid !== id)
    } else {
      updated = [id, ...favoriteTeams.filter((fid: string) => fid !== id)].slice(0, 3)
    }
    setFavoriteTeams(updated)
  }

  const unreadCount = notificationsData.filter((notification) => !notification.read).length

  const handleMarkAllAsRead = () => {
    setNotificationsData(
      notificationsData.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const handleClearAll = () => {
    setNotificationsData([])
  }

  return (
    <>
      <header
        className={`sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur ${className || ""}`}
      >
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onToggleMobileMenu}>
          <Menu className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden md:flex" onClick={onToggleSidebar}>
          <PanelLeft className="h-5 w-5" />
        </Button>
        <div className="flex flex-1 items-center">
          <div className="flex items-center gap-3">
            {/* Team Switcher Buttons */}
            <div className="flex items-center gap-2">
              {favoriteUnits?.map(unit => (
                <Button
                  key={unit.id}
                  variant={selectedTeam === unit.id ? "default" : "outline"}
                  className={`group gap-2 px-4 py-2 rounded-full border border-accent transition-colors duration-200 font-semibold text-base ${selectedTeam === unit.id ? 'bg-accent text-accent-foreground' : 'bg-card text-card-foreground hover:text-accent hover:border '}`}
                  style={{ boxShadow: selectedTeam === unit.id ? '0 2px 8px 0 rgba(0,0,0,0.08)' : undefined }}
                  onClick={() => setSelectedTeam(unit.id)}
                >
                  <span className="ml-1">{unit.name}</span>
                  {selectedTeam === unit.id && <span className="ml-2 w-2 h-2 rounded-full bg-accent-foreground inline-block group-hover:bg-accent" />}
                </Button>
              ))}
              { businessUnits && (<DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full px-4 py-2 font-semibold hover:text-accent hover:border-accent">More</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {allUnits.map(unit => (
                    <DropdownMenuItem key={unit.id} onClick={() => setSelectedTeam(unit.id)} className="flex items-center justify-between gap-2">
                      <span className={`inline-flex items-center gap-2 rounded-full px-2 py-1 font-medium ${selectedTeam === unit.id ? 'bg-accent text-accent-foreground' : ''}`}>{unit.name}
                        {/* {favoriteTeams.includes(unit.id) && <Star fill="#facc15" stroke="#facc15" className="ml-1 w-4 h-4 text-yellow-400" />} */}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto"
                        tabIndex={-1}
                        onClick={e => {
                          e.stopPropagation()
                          toggleFavorite(unit.id)
                        }}
                      >
                        <Star
                          fill={favoriteTeams.includes(unit.id) ? "#facc15" : "none"}
                          stroke={favoriteTeams.includes(unit.id) ? "#facc15" : "currentColor"}
                          className={favoriteTeams.includes(unit.id) ? "text-yellow-400" : "text-gray-400"}
                        />
                      </Button>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>) 
}
            </div>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <ThemeToggle />
            {/* <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-2xl">
                    <Cloud className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Cloud Storage</TooltipContent>
              </Tooltip>
            </TooltipProvider> */}

            {/* <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-2xl">
                    <MessageSquare className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Messages</TooltipContent>
              </Tooltip>
            </TooltipProvider> */}

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-2xl relative"
                    onClick={() => setNotificationsPanelOpen(true)}
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Notifications</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Avatar className="h-9 w-9 border-2 border-primary">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <NotificationsPanel
        notifications={notificationsData}
        open={notificationsPanelOpen}
        onClose={() => setNotificationsPanelOpen(false)}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearAll={handleClearAll}
      />
    </>
  )
}
