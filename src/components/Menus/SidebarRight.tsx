'use client'
import React from 'react'
import { PencilLine, ChevronDown, FilePlus, Edit, Printer } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from '@/components//ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components//ui/collapsible'
import { Skeleton } from '@/components//ui/skeleton'

import clsx from 'clsx'
import { DynamicIcon } from '../Images'

type FileType = 'published' | 'draft' | 'note'

type Metadata = {
  backend: 'github'
  owner: string
  repo: string
  path: string
  branch?: string
  encoding?: string
}

type LinkItem = {
  label: string
  url: string
  type?: FileType
  metadata?: Metadata
}

type RelatedContent = {
  [key: string]: LinkItem[]
}

export type TableOfContentsItem = {
  title: string
  url: string
  isActive?: boolean // Optional property for active items
  isDraft?: boolean // Optional property for draft items
  items?: TableOfContentsItem[] // Recursive type for nested items
}

interface SidebarRightProps extends React.ComponentProps<typeof Sidebar> {
  tableOfContents?: TableOfContentsItem[]
  relatedContent?: RelatedContent
  editorComponent?: React.ReactNode
  loading: boolean
  editMode: boolean
  onAddDocument: () => void
  onEditDocument: () => void
  onPrintDocument: () => void
  onGithubClick?: () => void
  onNavClick?: (callback: any) => void
  LinkComponent?: React.ComponentType<React.ComponentProps<'a'>>
}

const GithubIcon = () => <DynamicIcon iconName={'github'} size="10x" />

export default function SidebarRight({
  relatedContent,
  tableOfContents,
  editorComponent,
  loading = false,
  editMode = false,
  onAddDocument,
  onEditDocument,
  onPrintDocument,
  onGithubClick,
  onNavClick,
  LinkComponent,
  ...props
}: SidebarRightProps) {
  const isActive = false // Todo: work out how to determine if a link is active
  interface ButtonProps {
    href?: string
    item?: any
    children: React.ReactNode
  }
  const Button: React.FC<ButtonProps> = ({ item, children, ...props }) => {
    return (
      <button
        onClick={() => onNavClick && onNavClick(item)}
        className="flex items-center justify-start w-full text-sm text-left px-4 py-2"
        {...props}
      >
        {children}
      </button>
    )
  }
  // if onNavClick is provided, pass the callback to the buttons. else, render an anchor tag
  const Link: React.FC<ButtonProps & React.ComponentProps<'a'>> = LinkComponent
    ? (props) => <LinkComponent {...props} />
    : onNavClick
      ? Button
      : (props) => <a href={props.href} {...props} />
  return (
    <Sidebar
      side="right"
      // collapsible="none"
      variant="inset"
      // className="sticky lg:flex"
      // className="sticky lg:flex top-0 max-h-screen"
      {...props}
    >
      <SidebarHeader className="border-b border-sidebar-border">
        <SidebarMenu className="flex-row space-x-1">
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onAddDocument}>
              <FilePlus /> <span>Add Document</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {onGithubClick && (
            <SidebarMenuItem>
              <SidebarMenuButton onClick={onGithubClick} tooltip="Open in GitHub">
                <GithubIcon />
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
        <SidebarMenu className="flex-row space-x-1">
          <SidebarMenuItem className="w-5/12">
            <SidebarMenuButton
              onClick={() => onEditDocument()}
              variant={editMode ? 'outline' : 'default'}
              className={clsx(editMode && 'text-accent')}
            >
              <Edit /> <span>Edit</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="w-5/12">
            <SidebarMenuButton onClick={onPrintDocument}>
              <Printer /> <span>Print</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {editorComponent && (
        <>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Editor Controls
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <CollapsibleContent>{editorComponent}</CollapsibleContent>
              </SidebarGroupContent>
            </SidebarGroup>
          </Collapsible>
          <SidebarSeparator className="mx-0" />
        </>
      )}
      {/* <SidebarContent>
        <SidebarSeparator className="mx-0" />
      </SidebarContent> */}
      <SidebarContent className="overflow-auto">
        {loading && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Related Content</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <SidebarMenuItem key={index}>
                      <Skeleton className="bg-gray-200 w-full h-10" />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Table of Contents</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <SidebarMenuItem key={index}>
                      <Skeleton className="bg-gray-200 w-full h-10" />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
        {relatedContent && !loading && Object.keys(relatedContent).length > 0 && (
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Related Content
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <CollapsibleContent>
                  <SidebarMenu>
                    {relatedContent &&
                      Object.keys(relatedContent).map((item) => (
                        <SidebarMenuItem key={item}>
                          <span className="p-2 text-xs text-sidebar-foreground">
                            {' '}
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                          </span>
                          {item && relatedContent[item] && (
                            <SidebarMenuSub>
                              {relatedContent[item].map((item) => (
                                <SidebarMenuSubItem key={item.label}>
                                  <SidebarMenuSubButton asChild isActive={isActive} size="sm">
                                    <Link
                                      href={item.url}
                                      item={item}
                                      className="flex justify-between items-center w-full text-xs"
                                    >
                                      <span>{item.label}</span>
                                      {item.type === 'note' && (
                                        <PencilLine
                                          className="ml-2 text-gray-400 !important"
                                          size={16}
                                        />
                                      )}
                                      {item.type === 'draft' && (
                                        <DynamicIcon
                                          iconName={'code-pull-request-draft'}
                                          className="ml-2 text-gray-400 !important"
                                        />
                                      )}
                                      {/* Conditionally render the draft icon */}
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          )}
                        </SidebarMenuItem>
                      ))}
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarGroupContent>
            </SidebarGroup>
          </Collapsible>
        )}
        {tableOfContents && !loading && (
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Table of Contents
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <CollapsibleContent>
                  <SidebarMenu>
                    {tableOfContents.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={`#${item.url}`} className="text-xs">
                            {item.title}
                          </a>
                        </SidebarMenuButton>
                        {item.items?.length ? (
                          <SidebarMenuSub>
                            {item.items.map((item) => (
                              <SidebarMenuSubItem key={item.title}>
                                <SidebarMenuSubButton asChild isActive={item.isActive} size="sm">
                                  <a
                                    href={`#${item.url}`}
                                    className="flex justify-between items-center w-full text-xs"
                                  >
                                    <span>{item.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        ) : null}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarGroupContent>
            </SidebarGroup>
          </Collapsible>
        )}
      </SidebarContent>
      <SidebarFooter>
        {/* <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New X</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu> */}
      </SidebarFooter>
    </Sidebar>
  )
}
