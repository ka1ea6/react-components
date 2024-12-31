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

    interface MediaObject {
      alt: string;
      filename: string;
      height: number;
      url: string;
      width: number;
    }

    interface BackgroundImageProps {
      media: MediaObject | string;
    }

    const BackgroundImage: React.FC<BackgroundImageProps> = ({ media }) => {
      if (media && typeof media === 'object') {
        const {
          alt: altFromResource,
          filename: fullFilename,
          height: fullHeight,
          url,
          width: fullWidth,
        } = media as MediaObject;
        return (
          <Image
            className="mix-blend-overlay opacity-50"
            alt={altFromResource || ''}
            fill
            priority
            src={url || ''}
            width={fullWidth || 0}
            height={fullHeight || 0}
            style={{
              objectFit: 'cover',
            }}
          />
        );
      } else if (media && typeof media === 'string') {
        return (
          <div>
            <Image
              className="mix-blend-overlay opacity-50"
              alt=""
              fill
              priority
              src={media}
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        );
      }
      return null;
    };


export const MediumImpactHero: React.FC<MediumImpactHeroType> = ({
  links,
  media,
  children,
  richText,
}) => {

 



  return (
    <div className="relative bg-brand-one pb-12 mt-20 pt-10">
      {media && <BackgroundImage media={media as MediaObject | string} />}
      {/* <Image
        src={args.heroBackgroundImage}
        alt="Hero background"
        layout="fill"
        objectFit="cover"
        className="mix-blend-overlay opacity-50"
      {media && typeof media === 'object' && (
        
        
            width = fullWidth!
            height = fullHeight!
            alt = altFromResource || ''
        
            src = `${getClientSideURL()}${url}`
        <Image className="mix-blend-overlay opacity-50" alt="" fill priority src={media.url} style={{
          objectFit: 'cover',
        }}/>
      )}
      {media && typeof media === 'string' && (
        <div>
          <Image className="mix-blend-overlay opacity-50" alt="" fill priority src={media} style={{
        objectFit: 'cover',
      }}/>
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
