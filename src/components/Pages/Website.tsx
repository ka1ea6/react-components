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

import { SidebarRight } from '@/components//Menus/SidebarRight'
import { SidebarLeft } from '@/components//Menus/SidebarLeft'
import { HeaderDesktop, HeaderMobile } from '../HeaderFooter'
// import GithubControl from '@/components//Editor/GithubControl'
import { Toaster } from '@/components//ui/toaster'
import { LowImpactHero } from '@/components/Heros/LowImpact'
import { MediumImpactHero } from '@/components/Heros/MediumImpact'
import { HighImpactHero } from '@/components/Heros/HighImpact'
import { PostHero } from '@/components/Heros/PostHero'
import { SectionHero } from '@/components/Heros/SectionHero'

import logoLight from '../../images/cortex-reply-light.png'
import logoDark from '../../images/cortex-reply-dark.png'

export default function WebsiteSection({ ...args }) {
  return (

    <div className="flex fixed flex-col w-screen h-screen max-h-screen overflow-auto overscroll-contain">
                    <div className="fixed top-0 left-0 right-0 z-50">

              <HeaderDesktop isMenuOpen={true} logoLight={logoLight} logoDark={logoDark} />
              <HeaderMobile isMenuOpen={true} logoLight={logoLight} logoDark={logoDark} {...args.header}/>

</div>

        {/* Hero Section */}
        {args.hero && args.hero.type === 'lowImpact' && <LowImpactHero {...args.hero} />}
        {args.hero && args.hero.type === 'mediumImpact' && <MediumImpactHero {...args.hero} />}
        {args.hero && args.hero.type === 'highImpact' && <HighImpactHero {...args.hero} />}
        {args.hero && args.hero.type === 'postHero' && <PostHero {...args.hero} />}
        {args.hero && args.hero.type === 'sectionHero' && <SectionHero {...args.hero} />}

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
                         <Button className="w-full bg-accent text-accent-foreground">Create New</Button>
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
    

  )
}
