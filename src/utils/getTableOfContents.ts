import { Page } from '@/payload-types'

interface TableOfContentsItem {
  text: string
  id: string // Unique identifier for scrolling
  tag: string // Tag type like "h1", "h2", etc.
}

export function getTableOfContents(page: Page) {
  // Extract `RichText` content
  // Extract all headings for TOC, including titles and nested RichText
  let globalIndex = 0 // Global index for unique IDs

  // Generate a unique ID
  const generateId = (text: string, index: number): string => {
    return `${text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')}-${index}`
  }

  const tableOfContents: TableOfContentsItem[] = page.layout.flatMap((block: any) => {
    const tocItems: TableOfContentsItem[] = []

    // Include block title as h2
    if ('title' in block && block.title) {
      tocItems.push({
        text: block.title,
        id: generateId(block.title, globalIndex++), // Use globalIndex for unique ID
        tag: 'h2',
      })
    }

    // Include column titles as h2
    if ('columns' in block && Array.isArray(block.columns)) {
      block.columns.forEach(
        (column: {
          title?: string
          richText?: {
            root: { children: { type: string; tag?: string; children: { text: string }[] }[] }
          }
        }) => {
          if (column.title) {
            tocItems.push({
              text: column.title,
              id: generateId(column.title, globalIndex++), // Use globalIndex for unique ID
              tag: 'h2',
            })
          }

          // Include headings from nested RichText
          if (column.richText) {
            column.richText.root.children
              .filter((child: { type: string }) => child.type === 'heading')
              .forEach((heading: { tag?: string; children: { text: string }[] }) => {
                tocItems.push({
                  text: heading.children[0].text,
                  id: generateId(heading.children[0].text, globalIndex++), // Use globalIndex for unique ID
                  tag: heading.tag || 'h2', // Default to h2
                })
              })
          }
        },
      )
    }

    return tocItems
  })

  const contentWithIds = processContentWithIds(page.layout)

  return { tableOfContents, contentWithIds }
}

function processContentWithIds(layout: any[]): any[] {
  const generateId = (text: string, index: number): string => {
    return `${text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')}-${index}`
  }

  let globalIndex = 0 // To ensure unique IDs across all headings

  return layout.map((block) => {
    // Process block titles
    if (block.title) {
      block.id = generateId(block.title, globalIndex++) // Inject ID
    }

    // Process columns
    if (block.columns) {
      block.columns = block.columns.map(
        (column: {
          title?: string
          id?: string
          richText?: {
            root: {
              children: {
                type: string
                id?: string
                tag?: string
                children: { text: string }[]
              }[]
            }
          }
        }) => {
          if (column.title) {
            column.id = generateId(column.title, globalIndex++) // Inject ID
          }

          // Process nested RichText headings
          if (column.richText) {
            column.richText.root.children = column.richText.root.children.map(
              (child: {
                type: string
                id?: string
                tag?: string
                children: { text: string }[]
              }) => {
                if (child.type === 'heading') {
                  child.id = generateId(child.children[0].text, globalIndex++) // Inject ID
                }
                return child
              },
            )
          }

          return column
        },
      )
    }

    return block
  })
}
