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

import { VideoHeader } from '../components/HeaderFooter'
import logoVideo from '../images/cortex-reply-bw.png'
import logoLight from '../images/cortex-reply-light.png'
import logoDark from '../images/cortex-reply-dark.png'
import { ServiceSection, AboutSection, ContactSection, BlogList, ServiceDetailSection} from '../sections'
import { Footer } from '../components/HeaderFooter'

export default function LandingPage({ ...args }) {


  return (
    <div className="relative overflow-y-none scroll-smooth snap-y snap-mandatory">
      <div className="h-screen relative overflow-hidden snap-start">
      <VideoHeader {...args.header} logoVideo={logoVideo} logoLight={logoLight} logoDark={logoDark} />
      </div>
      <ServiceSection {...args.service} />
      {/* <AboutSection {...args.about} /> */}

      <Services {...args.service} />
      <ContactSection {...args.contact} />
      <BlogList {...args.blog} />
      <Footer {...args.footer} />
    </div>
  )
}


function Services({ services }: { services: Service[] }) {
  return (
    <>
      {services.map((service, index) => (
      <ServiceDetailSection key={index} {...service} theme={index % 2 === 0 ? 'dark' : 'light'} />
      ))}
    </>
  )
}
