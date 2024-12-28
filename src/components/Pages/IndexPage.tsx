'use client'
import React from 'react'
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
import { SimpleHeader } from '../Menus'
// import GithubControl from '@/components//Editor/GithubControl'
import { Toaster } from '@/components//ui/toaster'
import { InfoTile } from '@/components//Blocks'

type Tile = {
  slug: string
  title: string
  mainImage: string
  excerpt: string
}

export default function IndexPage({ ...args }) {
  return (
    <div className="flex fixed flex-col w-screen h-screen max-h-screen overflow-auto overscroll-contain">
      <SimpleHeader {...args.header} />
      <SidebarProvider className="top-14 mb-4 h-full max-h-[calc(100vh-3.5rem)] flex-1 flex-row overflow-y-clip">
        <SidebarLeft {...args.sidebarLeft} className="flex-none" />
        <SidebarInset className="grow overflow-hidden">
          {/* Hero section */}
          <div className="max-h-full top-0 absolute max-w-full">
            <div
              aria-hidden="true"
              className="inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl"
            >
              <div
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              />
            </div>
            <div className="absolute top-0 w-full">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center pt-4">
                  <h1 className="text-balance text-5xl font-semibold tracking-tight text-primary sm:text-7xl">
                    Anim aute id magna aliqua ad ad non deserunt sunt.
                  </h1>
                  <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
                    commodo. Elit sunt amet fugiat veniam occaecat.
                  </p>
                  <div className="mt-10 flex items-center justify-center gap-x-6">
                    <div className="mt-6 px-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
                      {args.tiles.map((tile: Tile) => (
                        <InfoTile
                          key={tile.slug}
                          url={tile.slug}
                          title={tile.title}
                          mainImage={tile.mainImage}
                          excerpt={tile.excerpt}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            >
              <div
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              />
            </div>
          </div>

          {/* <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div> */}
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
    </div>
  )
}
