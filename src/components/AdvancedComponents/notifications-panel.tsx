"use client"
import { motion, AnimatePresence } from "motion/react"
import { Check, Info, X, AlertTriangle, Bell, ChevronRight } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "info" | "success" | "warning" | "error"
  actionLabel?: string
  onAction?: () => void
}

interface NotificationsPanelProps {
  notifications: Notification[]
  open: boolean
  onClose: () => void
  onNotificationRemove?: (id: string) => void
  onRemoveAll?: () => void
  className?: string
}

export function NotificationsPanel({
  notifications,
  open,
  onClose,
  onNotificationRemove,
  onRemoveAll,
  className,
}: NotificationsPanelProps) {
  // Only show unread notifications
  const unreadNotifications = notifications.filter((notification) => !notification.read)
  const unreadCount = unreadNotifications.length

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "success":
        return <Check className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={cn(
              "fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l bg-background shadow-lg md:w-96",
              className,
            )}
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Notifications</h2>
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="rounded-full px-2 py-0.5">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              {/* Actions */}
              {unreadCount > 0 && (
                <div className="flex items-center justify-between border-b p-2">
                  <span className="text-sm text-muted-foreground">
                    {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                  </span>
                  <Button variant="ghost" size="sm" onClick={onRemoveAll} className="text-sm">
                    Dismiss all
                  </Button>
                </div>
              )}
              
              {/* Notifications List */}
              {unreadNotifications.length > 0 ? (
                <ScrollArea className="flex-1">
                  <div className="divide-y">
                    {unreadNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn("flex gap-3 p-4 transition-colors bg-muted/50")}
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{notification.title}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-muted-foreground">{notification.time}</p>
                              {/* Dismiss button */}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => onNotificationRemove?.(notification.id)}
                                title="Dismiss"
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.description}</p>
                          {notification.actionLabel && (
                            <Button
                              variant="link"
                              size="sm"
                              className="h-auto p-0 text-sm"
                              onClick={notification.onAction}
                            >
                              {notification.actionLabel}
                              <ChevronRight className="ml-1 h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <Bell className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No notifications</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    When you receive notifications, they'll appear here.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
