'use client'
import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { RelatedContent, type RelatedContentProps } from '@/components/Menus/RelatedContent'
import { Printer, Presentation } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface TableOfContentsItem {
  text: string
  id: string // Unique identifier for scrolling
  tag: string // Tag type like "h1", "h2", etc.
}

export const MainPageSection = ({
  children,
  pageId,
  tableOfContents = [],
  edit = true,
  path = '/admin/collections/pages/',
  relatedContent = [{ title: 'Related Content', links: [] }],
}: {
  children: React.ReactNode
  pageId: number
  tableOfContents?: TableOfContentsItem[]
  edit?: boolean
  path?: string
  relatedContent?: RelatedContentProps[]
}) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)
  const [activeLink, setActiveLink] = useState<string>('')
  const currentPath = usePathname()
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible)
  }
  const getIndentation = (tag: string): string => {
    switch (tag) {
      case 'h3':
        return 'ml-4' // Indent H3 headings
      case 'h4':
        return 'ml-8' // Indent H4 headings
      default:
        return '' // No indentation for H1 and H2
    }
  }

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()

    const targetElement = document.getElementById(id)
    if (targetElement) {
      const yOffset = -100
      const yPosition = targetElement.offsetTop + yOffset

      // Scroll the container instead of the window
      const scrollContainer = document.querySelector('.container') || window
      if (scrollContainer === window) {
        window.scrollTo({ top: yPosition, behavior: 'smooth' })
      } else {
        ;(scrollContainer as HTMLElement).scrollTo({ top: yPosition, behavior: 'smooth' })
      }

      setActiveLink(id)
    } else {
      console.error(`Element with ID "${id}" not found.`)
    }
  }

  const handlePrintView = () => {
    // relace /[slug] with /print/[slug] where slug is the page
    const newPathz = currentPath.split('/')
    const newPath = '/print/' + newPathz[1]
    // A4 Landscape is 3508 x 2480 at 300dpi
    const printWindow = window.open(
      newPath,
      'Print',
      'width=1754,height=1240,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes',
    )
    printWindow && printWindow.focus()
  }

  const handlePresentView = () => {
    // relace /[slug] with /print/[slug] where slug is the page
    const newPathz = currentPath.split('/')
    const newPath = '/present/' + newPathz[1]
    // A4 Landscape is 3508 x 2480 at 300dpi
    const printWindow = window.open(
      newPath,
      'Print',
      'width=1754,height=1240,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes',
    )
    printWindow && printWindow.focus()
  }

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const targetId = hash.substring(1) // Remove the '#' character
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        const yOffset = -300
        const yPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: yPosition, behavior: 'smooth' })
      }
    }
  }, [window.location.hash])

  return (
    <div className="container py-8">
    
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* Main Content Area */}
        <div className={cn(isSidebarVisible ? 'col-span-2' : 'col-span-3', 'xl:col-span-3')}>
          {children}
        </div>

        {/* Sidebar */}
        <div
          className={cn(
            'space-y-6 transform min-w-full transition-transform duration-300',
            'col-span-4 md:col-span-1 translate-x-0 xl:-mt-20',
            isSidebarVisible ? 'translate-x-0' : 'md:translate-x-full',
            'xl:block xl:col-span-1 xl:translate-x-0',
          )}
        >
          {edit && (
            <Card>
              <CardHeader>
                <CardTitle className="text-accent">Content Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Contribute or create new content.
                </p>
                <Link href={`${path}${pageId}`}>
                  <Button variant="outline" className="w-full text-accent hover:text-foreground">
                    Edit Page
                  </Button>
                </Link>
                <Link href="/admin/collections/pages/create">
                  <Button
                    variant="outline"
                    className="w-full mt-2 text-accent hover:text-foreground"
                  >
                    Create New
                  </Button>
                </Link>
                <div className="flex space-x-2 mt-4">
                  <Button
                    variant="outline"
                    className="text-accent hover:text-foreground"
                    onClick={handlePrintView}
                  >
                    <Printer className="mr-2" /> Print
                  </Button>
                  <Button
                    variant="outline"
                    className="text-accent hover:text-foreground"
                    onClick={handlePresentView}
                  >
                    <Presentation className="mr-2" /> Present
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          {relatedContent && relatedContent.length > 0 && 
            relatedContent.map((content, index) => (
              content.links && content.links.length > 0 && (
                <RelatedContent key={index} {...content} />
              )
            ))
          }
          {tableOfContents.length > 3 && (
            <Card className="w-full max-w-sm mt-4">
              <CardHeader>
                <CardTitle className="text-accent">On this page</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tableOfContents.map((heading, index) => (
                    <li key={index} className={getIndentation(heading.tag)}>
                      <a
                        href={`#${heading.id}`}
                        // onClick={(event) => handleLinkClick(event, heading.id)}
                        className={`text-xs ${
                          activeLink === heading.id
                            ? 'text-accent font-semibold'
                            : 'text-primary dark:text-foreground'
                        } hover:text-accent`}
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          
        </div>

        {/* Toggle Sidebar Button (only for md screens) */}
        <button
          onClick={toggleSidebar}
          className={cn(
            'fixed top-1/2 right-0 z-50 h-16 w-8 bg-accent text-accent-foreground rounded-l-full transform -translate-y-1/2 flex items-center justify-center',
            'hidden md:block xl:hidden',
          )}
        >
          ⋮
        </button>
      </div>

      {/* Sidebar at the bottom for small screens */}
      <div className="block md:hidden mt-8">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  )
}
