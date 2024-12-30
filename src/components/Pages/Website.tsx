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
import { HeaderDesktop } from '../HeaderFooter'
// import GithubControl from '@/components//Editor/GithubControl'
import { Toaster } from '@/components//ui/toaster'
import { LowImpactHero } from '@/components/Heros/LowImpact'
import { MediumImpactHero } from '@/components/Heros/MediumImpact'
import { HighImpactHero } from '@/components/Heros/HighImpact'
import { PostHero } from '@/components/Heros/PostHero'
import logoVideo from '../../images/cortex-reply-bw.png'
import logoLight from '../../images/cortex-reply-light.png'
import logoDark from '../../images/cortex-reply-dark.png'


export default function Website({ ...args }) {
  return (

    <div className="flex fixed flex-col w-screen h-screen max-h-screen overflow-auto overscroll-contain">
              <HeaderDesktop isMenuOpen={true} logoLight={logoLight} logoDark={logoDark} />


        {/* Hero Section */}
        {args.hero && args.hero.type === 'lowImpact' && <LowImpactHero {...args.hero} />}
        {args.hero && args.hero.type === 'mediumImpact' && <MediumImpactHero {...args.hero} />}
        {args.hero && args.hero.type === 'highImpact' && <HighImpactHero {...args.hero} />}
        {args.hero && args.hero.type === 'postHero' && <PostHero {...args.hero} />}

        {/* <div className="relative bg-brand-one pb-12 pt-10">
          {args.heroBackgroundImage && (
            <Image
              src={args.heroBackgroundImage}
              alt="Hero background"
              layout="fill"
              objectFit="cover"
              className="mix-blend-overlay opacity-50"
            />
          )}
          <div className="container relative z-10">
            <div className="text-slate-400">{args.section}</div>
            <h1 className="mt-2 text-4xl font-bold text-white">{args.title}</h1>
            <p className="mt-4 max-w-3xl text-slate-400">{args.description}</p>
          </div>
        </div> */}

        {/* Main Content */}
       
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
