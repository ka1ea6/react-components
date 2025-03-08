'use client'
// import { useHeaderTheme } from '@/providers/HeaderTheme'
import React from 'react'
import Image from 'next/image'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Payload/Link'
import { Media } from '@/components/Payload/Media'
import { RichText } from '@/components/Payload/RichText'

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
    <div
      className="relative -mt-[10.4rem] flex items-end justify-center text-white"
      data-theme="dark"
    >
      <div className="container mt-[20rem] mb-8 z-10 relative flex items-end justify-center">
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
      <div className="min-h-96 select-none">
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
        <span className="absolute inset-0 bg-gradient-1 from-white/0 to-white dark:from-background/0 dark:to-background"></span>
      </div>
    </div>
  )
}
