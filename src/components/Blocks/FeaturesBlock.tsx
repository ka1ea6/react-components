import type { FeaturesBlock as FeaturesBlockProps } from '@/payload-types'

import { cn } from '@/lib/utils/cn'
import React from 'react'
import { RichText } from '@/components/Payload/RichText'
import type { Page } from '@/payload-types'

// type Props = {
//   className?: string
// } & FeaturesBlockProps

type Props = {
  title?: string
  description?: string
  features: Section[]
  id?: string
}

// type RichText = {
//   root: {
//     type: string
//     children: {
//       type: string
//       version: number
//       [k: string]: unknown
//     }[]
//     direction: ('ltr' | 'rtl') | null
//     format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
//     indent: number
//     version: number
//   }
//   [k: string]: unknown
// } | null

export interface Section {
  icon: { type: string; icon: string }
  link?: {
    type?: ('reference' | 'custom') | null
    newTab?: boolean | null
    reference?: {
      relationTo: 'pages'
      value: number | Page
    } | null
    url?: string | null
    label: string
  }
  title: string
  content: string | Record<string, unknown>
}

// const iconMap: Record<Section['icon'], LucideIcon> = {
//   robot: Bot,
//   lightbulb: Lightbulb,
//   handshake: HandshakeIcon,
// }

export const FeaturesBlock: React.FC<Props> = ({ title, description, features, id }) => {
  // export function FeatureBlock({ title, features, theme = 'dark' }: FeatureBlockProps) {
// return null

  return (
    <section
      className={cn(
        'container w-full rounded-lg',
        'dark:text-gray-300 text-gray-800',
      )}
    >
      {title && <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl" id={id || ''}>{title}</h2>}
      {description && typeof description === 'string' && (
        <p className="mb-5 text-xl tracking-tight md:text-xl">{description}</p>
      )}
      {description && typeof description === 'object' && (
        <p className="mb-5 text-xl tracking-tight md:text-xl"><RichText content={description} enableGutter={false} /></p>                    
                  
                )}

      <div className={`grid gap-8 mt-10 md:grid-cols-${features ? features.length : 1}`}>
        {features &&
          features.map((section, index) => {
            // const Icon = <div><i className=`${section.icon.type} ${section.icon.icon}`></i></div>
            const content = (
              <div key={index} className="flex flex-col gap-4">
                <div className="text-accent h-12 w-12 mb-3 transform group-hover:scale-110 transition-transform duration-400">
                  <i className={`${section.icon.type} fa-${section.icon.icon} fa-4x`}></i>
                </div>

                <h3 className="text-2xl font-semibold group-hover:text-accent transition-colors duration-400">
                  {section.title}
                </h3>
                {typeof section.content != 'object' && (
                  <div
                    className="text-lg opacity-80"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                )}
                {typeof section.content === 'object' && (
                  <div className="text-lg opacity-80">
                    <RichText content={section.content} enableGutter={false} />
                  </div>
                )}
              </div>
            )
            console.log('link', section.link)
            return section.link ? (
              <a
                href={
                  section.link.url
                    ? section.link.url : '#'
                    // : `/${section.link.reference?.relationTo}/${(section.link.reference?.value as Page)?.slug || '#'}`
                }
                key={index}
                className="no-underline group"
              >
                {content}
              </a>
            ) : (
              content
            )
          })}
      </div>
    </section>
  )
}

{
  /* <Icon 
                className={cn(
                  'h-12 w-12',
                  theme === 'dark' ? 'text-pink-500' : 'text-pink-600'
                )} 
              /> */
}
