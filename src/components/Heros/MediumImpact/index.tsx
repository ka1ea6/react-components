import React from 'react'

import type { Page } from '@/payload-types'
import Image from 'next/image'

import { CMSLink } from '@/components/Payload/Link'
import { Media } from '@/components/Payload/Media'
import { RichText } from '@/components/Payload/RichText'

type MediumImpactHeroType =
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

export const MediumImpactHero: React.FC<MediumImpactHeroType> = ({
  links,
  media,
  children,
  richText,
}) => {
  return (
    <div className="relative bg-brand-one pb-12 pt-10">
      {media && typeof media === 'object' && (
        <Media
          // className="-mx-4 md:-mx-8 2xl:-mx-16"
          imgClassName="mix-blend-overlay opacity-50"
          fill
          priority
          resource={media}
        />
      )}
      {media && typeof media === 'string' && (
        <div>
          <Image className="mix-blend-overlay opacity-50" alt="" fill priority src={media} />
        </div>
      )}
      {/* {args.heroBackgroundImage && (
        <Image
          src={args.heroBackgroundImage}
          alt="Hero background"
          layout="fill"
          objectFit="cover"
          className="mix-blend-overlay opacity-50"
        />
      )} */}
      <div className="mx-0 min-w-full relative z-9">
        <div className="container text-brand-one-foreground">
          {children ||
            (richText && (
              <RichText
                className="prose-headings:text-brand-one-foreground prose-p:text-brand-one-foreground"
                content={richText}
                enableProse={true}
                enableGutter={false}
              />
            ))}
        </div>
      </div>
    </div>
  )

  // return (
  //   <div className="">
  //     <div className="container mb-8">
  //       {richText && <RichText className="mb-6" content={richText} enableGutter={false} />}

  //       {Array.isArray(links) && links.length > 0 && (
  //         <ul className="flex gap-4">
  //           {links.map(({ link }, i) => {
  //             return (
  //               <li key={i}>
  //                 <CMSLink {...link} />
  //               </li>
  //             )
  //           })}
  //         </ul>
  //       )}
  //     </div>
  //     <div className="container ">
  //       {media && typeof media === 'object' && (
  //         <div>
  //           <Media
  //             className="-mx-4 md:-mx-8 2xl:-mx-16"
  //             imgClassName=""
  //             priority
  //             resource={media}
  //           />
  //           {media?.caption && (
  //             <div className="mt-3">
  //               <RichText content={media.caption} enableGutter={false} />
  //             </div>
  //           )}
  //         </div>
  //       )}
  //       {media && typeof media === 'string' && (
  //         <div>
  //           <Image className="-mx-4 md:-mx-8 2xl:-mx-16" alt="" fill priority src={media} />
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // )
}
