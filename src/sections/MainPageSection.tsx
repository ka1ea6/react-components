'use client'
import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { RelatedContent, type RelatedContentProps } from '@/components/Menus/RelatedContent'
import { Printer, Presentation } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { ExternalLink } from 'lucide-react'

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

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible)
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
    <div>
      {/* Main Content Area */}
      <div className={cn(isSidebarVisible ? 'col-span-3' : 'col-span-4', 'xl:col-span-3')}>
        {children}
      </div>

      <Sidebar {...{ pageId, tableOfContents, edit, path, relatedContent, isSidebarVisible }} />

      {/* Toggle Sidebar Button (only for md screens) */}
      {/* <button
        onClick={toggleSidebar}
        className={cn(
          'fixed top-1/4 right-0 z-50 h-16 w-8 bg-accent text-accent-foreground rounded-l-full transform -translate-y-1/2 flex items-center justify-center',
          'hidden md:block xl:hidden',
        )}
      >
        ⋮
      </button> */}

      {/* Sidebar at the bottom for small screens */}
      <div className="block md:hidden mt-8">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  )
}

const Sidebar2 = ({
  pageId,
  tableOfContents = [],
  edit = true,
  path = '/admin/collections/pages/',
  relatedContent = [{ title: 'Related Content', links: [] }],
  isSidebarVisible,
}: {
  pageId: number
  tableOfContents?: TableOfContentsItem[]
  edit?: boolean
  path?: string
  relatedContent?: RelatedContentProps[]
  isSidebarVisible: boolean
}) => {
  const [activeLink, setActiveLink] = useState<string>('')
  const currentPath = usePathname()
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

  return (
    <div
      className={cn(
        'fixed right-2 top-1/4 space-y-6 transform transition-transform duration-300',

        isSidebarVisible ? 'translate-x-0' : 'md:translate-x-full',
        '2xl:block 2xl:translate-x-0',
      )}
    >
      {edit && (
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-accent">Content Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2 mt-4 w-full">
              <Link href={`${path}${pageId}`} className="w-full">
                <Button variant="outline" className="w-full text-accent hover:text-foreground">
                  Edit Page
                </Button>
              </Link>

              <Link href="/admin/collections/pages/create" className="w-full">
                <Button variant="outline" className="w-full text-accent hover:text-foreground">
                  Create New
                </Button>
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="w-full text-accent hover:text-foreground"
                  onClick={handlePrintView}
                >
                  <Printer className="mr-2 w-4 h-4" /> Print
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-accent hover:text-foreground"
                  onClick={handlePresentView}
                >
                  <Presentation className="mr-2 w-4 h-4" /> Present
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {relatedContent &&
        relatedContent.length > 0 &&
        relatedContent.map(
          (content, index) =>
            content.links &&
            content.links.length > 0 && <RelatedContent key={index} {...content} />,
        )}

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
  )
}

const Sidebar = ({
  pageId,
  tableOfContents = [],
  edit = true,
  path = '/admin/collections/pages/',
  relatedContent = [{ title: 'Related Content', links: [] }],
  isSidebarVisible,
}: {
  pageId: number
  tableOfContents?: TableOfContentsItem[]
  edit?: boolean
  path?: string
  relatedContent?: RelatedContentProps[]
  isSidebarVisible: boolean
}) => {
  const [activeLink, setActiveLink] = useState<string>('')
  const [showContents, setShowContents] = useState<boolean>(false)
  const [showRelated, setShowRelated] = useState<boolean>(false)
  const currentPath = usePathname()

  const toggleContents = () => {
    setShowContents(!showContents)
    setShowRelated(false) // Hide Related when Contents is shown
  }

  const toggleRelated = () => {
    setShowRelated(!showRelated)
    setShowContents(false) // Hide Contents when Related is shown
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

  const handlePrintView = () => {
    const newPathz = currentPath.split('/')
    const newPath = '/print' + currentPath
    const printWindow = window.open(
      newPath,
      'Print',
      'width=1754,height=1240,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes',
    )
    printWindow && printWindow.focus()
  }

  const handlePresentView = () => {
    const newPathz = currentPath.split('/')
    const newPath = '/present' + currentPath
    console.log(newPath)
    const printWindow = window.open(
      newPath,
      'Print',
      'width=1754,height=1240,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes',
    )
    printWindow && printWindow.focus()
  }

  return (
    <div
      className={cn(
        'fixed right-2 z-20 top-1/4 space-y-6 transform transition-transform duration-300 translate-x-full',
        isSidebarVisible ? 'translate-x-0' : 'md:translate-x-0',
  
      )}
    >
      <div className="flex flex-row-reverse z-20 min-w-64 gap-4">
        <nav className="z-20 flex grow-0 justify-end gap-4 border-gray-200 bg-card p-2.5 shadow-lg backdrop-blur-lg  min-h-[auto] min-w-[54px] flex-col rounded-lg border">
          {/* Sidebar items with onClick handlers */}
          <Link href={`${path}${pageId}`}
            className="flex aspect-square min-h-[25px] w-12 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700  dark:text-gray-400 hover:text-accent"
          >
            {/* HeroIcon - User */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
              <path d="M454.6 45.3l12.1 12.1c12.5 12.5 12.5 32.8 0 45.3L440 129.4 382.6 72l26.7-26.7c12.5-12.5 32.8-12.5 45.3 0zM189 265.6l171-171L417.4 152l-171 171c-4.2 4.2-9.6 7.2-15.4 8.6l-65.6 15.1L180.5 281c1.3-5.8 4.3-11.2 8.6-15.4zm197.7-243L166.4 243c-8.5 8.5-14.4 19.2-17.1 30.9l-20.9 90.6c-1.2 5.4 .4 11 4.3 14.9s9.5 5.5 14.9 4.3l90.6-20.9c11.7-2.7 22.4-8.6 30.9-17.1L489.4 125.3c25-25 25-65.5 0-90.5L477.3 22.6c-25-25-65.5-25-90.5 0zM80 64C35.8 64 0 99.8 0 144L0 432c0 44.2 35.8 80 80 80l288 0c44.2 0 80-35.8 80-80l0-128c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 128c0 26.5-21.5 48-48 48L80 480c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48l128 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L80 64z" />
            </svg>
            <small className="text-center text-xs font-medium"> Edit </small>
          </Link>

          <a
            onClick={toggleContents}
            className="flex aspect-square min-h-[25px] w-12 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700  dark:text-gray-400 hover:text-accent"
          >
            {/* HeroIcon - Chart Bar */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
              <path d="M16 80C7.2 80 0 87.2 0 96s7.2 16 16 16l416 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L16 80zM144 240c-8.8 0-16 7.2-16 16s7.2 16 16 16l288 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-288 0zM128 416c0 8.8 7.2 16 16 16l288 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-288 0c-8.8 0-16 7.2-16 16zM0 432c0 8.8 7.2 16 16 16s16-7.2 16-16l0-192c0-8.8-7.2-16-16-16s-16 7.2-16 16L0 432z" />
            </svg>
            <small className="text-center text-xs font-medium"> Contents </small>
          </a>

          <a
            onClick={toggleRelated}
            className="flex aspect-square min-h-[25px] w-12 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700  dark:text-gray-400 hover:text-accent"
          >
            {/* HeroIcon - Cog-6-tooth */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
              <path d="M136 64c13.3 0 24 10.7 24 24l0 24 0 32 0 24c0 13.3-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24l0-80c0-13.3 10.7-24 24-24l80 0zm56 104l0-24 192 0 0 24c0 30.9 25.1 56 56 56l80 0c30.9 0 56-25.1 56-56l0-80c0-30.9-25.1-56-56-56l-80 0c-30.9 0-56 25.1-56 56l0 24-192 0 0-24c0-30.9-25.1-56-56-56L56 32C25.1 32 0 57.1 0 88l0 80c0 30.9 25.1 56 56 56l80 0c8.6 0 16.7-1.9 24-5.4l72.2 96.3c-5.2 8.5-8.2 18.5-8.2 29.1l0 80c0 30.9 25.1 56 56 56l80 0c30.9 0 56-25.1 56-56l0-80c0-30.9-25.1-56-56-56l-80 0c-8.6 0-16.7 1.9-24 5.4l-72.2-96.3c5.2-8.5 8.2-18.5 8.2-29.1zm224 0l0-24 0-32 0-24c0-13.3 10.7-24 24-24l80 0c13.3 0 24 10.7 24 24l0 80c0 13.3-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24zM360 320c13.3 0 24 10.7 24 24l0 80c0 13.3-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24l0-80c0-13.3 10.7-24 24-24l80 0z" />
            </svg>
            <small className="text-center text-xs font-medium"> Related </small>
          </a>
          <hr className="dark:border-gray-400" />

          <a
            onClick={handlePresentView}
            className="flex aspect-square min-h-[25px] w-12 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700  dark:text-gray-400 hover:text-accent"
          >
            {/* <!-- HeroIcon - Home Modern --> */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
              <path d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16l544 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L16 0zM32 64l0 224c0 35.3 28.7 64 64 64l176 0 0 41.4-91.3 91.3c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L288 422.6l84.7 84.7c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L304 393.4l0-41.4 176 0c35.3 0 64-28.7 64-64l0-224-32 0 0 224c0 17.7-14.3 32-32 32l-192 0L96 320c-17.7 0-32-14.3-32-32L64 64 32 64z" />
            </svg>

            <small className="text-xs font-medium">Present</small>
          </a>
          <a
            onClick={handlePrintView}
            className="flex aspect-square min-h-[25px] w-12 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700  dark:text-gray-400 hover:text-accent"
          >
            {/* <!-- HeroIcon - Home Modern --> */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
              <path d="M96 160l-32 0 0-96C64 28.7 92.7 0 128 0L357.5 0c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 18.7 28.3 18.7 45.3l0 69.5-32 0 0-69.5c0-8.5-3.4-16.6-9.4-22.6L380.1 41.4c-6-6-14.1-9.4-22.6-9.4L128 32c-17.7 0-32 14.3-32 32l0 96zm352 64L64 224c-17.7 0-32 14.3-32 32l0 128 32 0 0-32c0-17.7 14.3-32 32-32l320 0c17.7 0 32 14.3 32 32l0 32 32 0 0-128c0-17.7-14.3-32-32-32zm0 192l0 64c0 17.7-14.3 32-32 32L96 512c-17.7 0-32-14.3-32-32l0-64-32 0c-17.7 0-32-14.3-32-32L0 256c0-35.3 28.7-64 64-64l384 0c35.3 0 64 28.7 64 64l0 128c0 17.7-14.3 32-32 32l-32 0zM96 352l0 128 320 0 0-128L96 352zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
            </svg>
            <small className="text-xs font-medium">Print</small>
          </a>
        </nav>

        {/* Content that pops out when related or contents is clicked */}

        {showContents && (
          <div
            // className={cn(
            //   'fixed top-0 right-0 z-30 p-4 bg-white shadow-lg rounded-md w-80 max-h-screen overflow-y-auto transition-transform',
            //   showContents || showRelated ? 'translate-x-0' : 'translate-x-full',
            //   // isSidebarVisible ? 'translate-x-0' : 'md:translate-x-full',
            // )}
            className={cn(
              'z-50 flex shrink-0 grow-0 gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg dark:border-slate-600/60 dark:bg-slate-800/50 min-h-[auto] min-w-[54px] flex-col rounded-lg border',
            )}
          >
            <div className="flex flex-col m-2 justify-start z-50 min-w-64">
              <div className="flex text-accent">On this Page</div>
              <ul className="flex flex-col space-y-2">
                {tableOfContents.map((heading, index) => (
                  <li key={index} className={getIndentation(heading.tag)}>
                    <a
                      href={`#${heading.id}`}
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
            </div>
          </div>
        )}

        {showRelated && relatedContent && relatedContent.length > 0 && (
          <div
            // className={cn(
            //   'fixed top-0 right-0 z-30 p-4 bg-white shadow-lg rounded-md w-80 max-h-screen overflow-y-auto transition-transform',
            //   showContents || showRelated ? 'translate-x-0' : 'translate-x-full',
            //   // isSidebarVisible ? 'translate-x-0' : 'md:translate-x-full',
            // )}
            className={cn(
              'z-50 flex shrink-0 grow-0 gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg dark:border-slate-600/60 dark:bg-slate-800/50 min-h-[auto] min-w-[54px] flex-col rounded-lg border',
            )}
          >
            <div className="flex flex-col m-2 justify-start z-50 min-w-64">
              <div className="flex text-accent">Related Content</div>
              <ul className="flex flex-col space-y-2">
                {relatedContent.map((content, contentIndex) =>
                  content.links && content.links.length > 0
                    ? content.links.map((link, linkIndex) => (
                        <Link
                          key={linkIndex}
                          href={link.url}
                          className="inline-flex items-center text-sm text-primary dark:text-foreground hover:text-accent"
                        >
                          {link.title}
                          {/* only show the external link for external sites (http/https) */}
                          {link.url.startsWith('http') && <ExternalLink className="ml-1 h-3 w-3" />}
                        </Link>
                      ))
                    : null,
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
