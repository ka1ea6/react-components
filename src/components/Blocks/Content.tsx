import { cn } from '@/lib/utils/cn'
import React from 'react'
import { RichText, RichTextProps } from '@/components/Payload/RichText'

import type { ContentBlock as ContentBlockProps} from '@/payload-types'

import { CMSLink } from '@/components/Payload/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, theme } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  const variants = {
    none: '',
    line: 'border border-primary p-4 rounded-lg',
  }

  const hasRichTextMedia = (richtext: any): boolean => {
    if (richtext.type && richtext.type === 'block') {
      if (
        richtext.fields &&
        (richtext.fields.blockType === 'imageBlock' || richtext.fields.blockType === 'mediaBlock')
      ) {
        return true
      }
    }
    if (richtext.root && richtext.root.children) {
      for (const block of richtext.root.children) {
            const found = hasRichTextMedia(block)
            if (found) {
              return true
            }
      }
    }
    if (richtext.children) {
      for (const block of richtext.children) {
            const found = hasRichTextMedia(block)
            if (found) {
              return true
            }
      }
    }
    return false
  }

  interface SeparateH2Result {
    processedRichText: any;
    heading: any;
  }

  const separateH2 = (richtext: any, theme: string, size: string): SeparateH2Result => {
    if (theme === 'none' || size === 'full') {
      return { processedRichText: richtext, heading: null }
    }
    let newRichText = richtext
    let heading = null
    if (richtext && richtext.root && richtext.root.children && richtext.root.children[0].tag === 'h2') {
      // remove richtext.root.children[0]
      newRichText = {...richtext, root: { ...richtext.root, children: richtext.root.children.slice(1)}}
      heading = richtext.root.children[0]
    }
    return { processedRichText:newRichText , heading } 
  }


  return (
    <div className="container my-6">
      
      <div
        className={cn(
          'grid grid-cols-4 lg:grid-cols-12 gap-y-8',
          theme?.settings?.box ? 'gap-x-8' : 'gap-x-16',
        )}
      >
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col
            
            const { processedRichText, heading} = separateH2(richText,theme?.settings?.box || 'none', size || 'full')
            return (
              <div
                className={cn(
                  `col-span-4 lg:col-span-${colsSpanClasses[size!]}`,
                  {
                    'md:col-span-2': size !== 'full',
                  },
                  variants[(size !== 'full' && !hasRichTextMedia(richText as any) && theme?.settings?.box) || 'none'],
                  'intersect intersect-full animate-flip-up',
        index === 0 ? '' : `animate-delay-${index}00`
                )}
                key={index}
              >
                { heading && <div className="bg-primary text-primary-foreground mb-4 -mt-4 -mx-4 px-4 py-2 text-xl">{heading.children[0].text}</div> }
                {processedRichText && <RichText content={processedRichText} enableGutter={false} className="rich-text" />}

                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
