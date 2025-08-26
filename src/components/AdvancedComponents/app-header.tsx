"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Menu, PanelLeft, Bot, Plus } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ThemeToggle } from "./theme-toggle"
import { NotificationsPanel } from "./notifications-panel"
import { NavigationTabs, type TabOption } from "./navigation-tabs"
import type { Notification } from "./notifications-panel"

interface AppHeaderProps {
  title: string
  notifications?: Notification[]
  onToggleSidebar?: () => void
  onToggleMobileMenu?: () => void
  sidebarOpen?: boolean
  className?: string
  activeTab?: string
  onTabChange?: (tab: string) => void
  showTabs?: boolean
  tabOptions?: TabOption[]
  // New props for enhanced functionality
  onActionClick?: () => void
  actionIcon?: React.ReactNode
  actionText?: string
  onNotificationRemove?: (id: string) => void
  onRemoveAll?: () => void
  logo?: string
  appName?: string
  tagline?: string
}

export function AppHeader({
  title,
  notifications = [],
  onToggleSidebar,
  onToggleMobileMenu,
  sidebarOpen = true,
  className,
  activeTab = "assistant",
  onTabChange,
  showTabs = true,
  tabOptions = [
    { value: "home", label: "Home" },
    { value: "chat", label: "Chat" },
    { value: "projects", label: "Projects" },
    { value: "colleagues", label: "Colleagues" },
    { value: "knowledge", label: "Knowledge" },
    // { value: "files", label: "Files" },
  ],
  onActionClick,
  actionIcon = <Bot className="mr-2 h-4 w-4" />,
  actionText = "Action",
  onNotificationRemove,
  onRemoveAll,
  logo = "/headerlogo.png",
  appName = "Nuvia",
  tagline = "Collaboration Platform",
}: AppHeaderProps) {
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false)
  const [notificationsData, setNotificationsData] = useState<Notification[]>(notifications)

  const unreadCount = notificationsData.filter((notification) => !notification.read).length

  const handleNotificationRemove = (id: string) => {
    setNotificationsData(prev => prev.filter(notification => notification.id !== id))
    onNotificationRemove?.(id)
  }

  const handleRemoveAll = () => {
    setNotificationsData(prev => prev.filter(notification => notification.read))
    onRemoveAll?.()
  }

  return (
    <>
      <header
        className={`sticky top-0 z-10 flex h-16 items-center gap-3 pl-2 pr-4 backdrop-blur ${className || ""}`}
      >
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onToggleMobileMenu}>
          <Menu className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden md:flex" onClick={onToggleSidebar}>
          <PanelLeft className="h-5 w-5" />
        </Button>
        
        {/* Logo and Title - shown when sidebar is closed */}
        {!sidebarOpen && (
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex h-10 w-10 items-center justify-center">
              <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">{appName}</h2>
              <p className="text-xs text-muted-foreground">{tagline}</p>
            </div>
          </motion.div>
        )}
        
        <div className="flex flex-1 items-center">
          {/* Navigation Tabs */}
          {showTabs && (
            <NavigationTabs
              activeTab={activeTab}
              onTabChange={onTabChange}
              tabOptions={tabOptions}
            />
          )}
          
          <div className="flex items-center gap-3 ml-auto">
              <motion.div 
                className="hidden md:flex gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button 
                    className="rounded-2xl transition-all duration-200 hover:shadow-md"
                    onClick={onActionClick}
                  >
                    {actionIcon}
                    {actionText}
                  </Button>
                </motion.div>
                {/* <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button className="rounded-2xl transition-all duration-200 hover:shadow-md">
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                </motion.div> */}
              </motion.div> 
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
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-2xl relative transition-all duration-200"
                      onClick={() => setNotificationsPanelOpen(true)}
                    >
                      <motion.div
                        animate={unreadCount > 0 ? { rotate: [0, -10, 10, -10, 0] } : {}}
                        transition={{ duration: 0.5, repeat: unreadCount > 0 ? Infinity : 0, repeatDelay: 3 }}
                      >
                        <Bell className="h-5 w-5" />
                      </motion.div>
                      {unreadCount > 0 && (
                        <motion.span 
                          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                          {unreadCount}
                        </motion.span>
                      )}
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>Notifications</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Avatar className="h-9 w-9 border-2 border-primary transition-all duration-200 hover:shadow-md cursor-pointer">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </motion.div>
          </div>
        </div>
      </header>

      <NotificationsPanel
        notifications={notificationsData}
        open={notificationsPanelOpen}
        onClose={() => setNotificationsPanelOpen(false)}
        onNotificationRemove={handleNotificationRemove}
        onRemoveAll={handleRemoveAll}
      />
    </>
  )
}
