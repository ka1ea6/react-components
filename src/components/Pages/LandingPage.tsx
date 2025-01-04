'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import {
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  Check,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  FilePlus,
  Edit,
  Printer,
  Folder,
  Frame,
  LifeBuoy,
  LogOut,
  Map,
  MoreHorizontal,
  PieChart,
  Send,
  Settings2,
  Share,
  Plus,
  Sparkles,
  SquareTerminal,
  Trash2,
  ExternalLink,
} from 'lucide-react'

// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "cortex-design-system/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components//ui/breadcrumb'

import { Separator } from '@/components//ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarSeparator,
} from '@/components//ui/sidebar'

import { VideoHeader } from '../HeaderFooter'
import logoVideo from '../../images/cortex-reply-bw.png'
import logoLight from '../../images/cortex-reply-light.png'
import logoDark from '../../images/cortex-reply-dark.png'


export default function LandingPage({ ...args }) {
  return (
    <div className="relative">
      <div className="h-screen relative overflow-hidden">
      <VideoHeader {...args.header} logoVideo={logoVideo} logoLight={logoLight} logoDark={logoDark} />
      </div>
      <div id="next-section" className="mt-16 pt-16 min-h-screen"> {/* Add margin-top to create space below the VideoHeader */}

        {/* Main Content */}
        <div className="container py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Content Area */}
            <div className="lg:col-span-2">{args.children}</div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Get started with your first action in just a few clicks.
                  </p>
                  <Button className="w-full">Create New</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="flex flex-col space-y-2">
                    <a
                      href="#"
                      className="inline-flex items-center text-sm text-blue-600 hover:underline"
                    >
                      User Guide
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center text-sm text-blue-600 hover:underline"
                    >
                      API Documentation
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center text-sm text-blue-600 hover:underline"
                    >
                      View Pricing Details
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </nav>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      {/* <SidebarProvider className="top-14 mb-4 h-full max-h-[calc(100vh-3.5rem)] flex-1 flex-row overflow-y-clip">
        <SidebarLeft {...args.sidebarLeft} className="flex-none" />
        <SidebarInset className="grow overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div>
        </SidebarInset>
        <SidebarRight
          {...args.sidebarRight}
          editorComponent={<GithubControl {...args.github} />}
          className="flex-none"
        />
      </SidebarProvider>
      <Toaster /> */}
    </div>
  )
}
