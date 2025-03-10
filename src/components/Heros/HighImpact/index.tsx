'use client'
// import { useHeaderTheme } from '@/providers/HeaderTheme'
import React from 'react'
import Image from 'next/image'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Payload/Link'
import { Media } from '@/components/Payload/Media'
import { RichText } from '@/components/Payload/RichText'
import { PageShape } from '@/components/Other'

type HighImpactHeroType =
  | {
      children?: React.ReactNode
      links?: Page['hero']['links']
      media?: Page['hero']['media']
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      links?: Page['hero']['links']
      media?: Page['hero']['media']
      richText?: Page['hero']['richText']
    })

export const HighImpactHero: React.FC<HighImpactHeroType> = ({
  links,
  media,
  children,
  richText,
}) => {
  // const { setHeaderTheme } = useHeaderTheme()

  // useEffect(() => {
  //   setHeaderTheme('dark')
  // })

  return (
    <div>
    <div className="sticky top-0 h-[70vh] min-h-[600px]">

    {/* <div
      className="relative -mt-[10.4rem] flex items-end justify-center text-white"
    > */}
      <div className="fixed inset-0 container mt-24 mb-8 z-10 flex items-start justify-center">
        {/* <div className="container"> */}
          {children ||
            (richText && (
              <RichText
                className="max-w-none mb-6 ml-0 prose prose-h1:text-5xl prose-headings:text-foreground prose-p:text-foreground"
                content={richText}
                enableGutter={true}
              />
            ))}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        {/* </div> */}
      </div>
      <div className="fixed inset-0 h-[70vh] min-h-[600px] select-none">
        {media && typeof media === 'object' && (
          <Media
            fill
            imgClassName="z-5 object-cover"
            priority={false}
            loading="lazy"
            resource={media}
          />
        )}
        {media && typeof media === 'string' && (
          <div>
            <Image className="-z-10 object-cover" alt="" fill priority src={media} />
          </div>
        )}
        {/* Overlay  */}
        <span className="absolute inset-0 bg-gradient-to-b from-white dark:from-black"></span>
        

      </div>
      
    {/* </div> */}
    <PageShape className="text-black z-10" position="header" />
    </div>
    </div>
  )
}
