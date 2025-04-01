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
                className="max-w-none mb-6 ml-0 prose prose-headings:text-foreground prose-p:text-foreground"
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
    <LightTop />
    {/* <PageShape className="text-black z-10" position="header" /> */}
    </div>
    </div>
  )
}



const LightTop = () => {

  // return (
  //   <div className="relative bg-white w-full z-20 aspect-[1920/332] overflow-hidden">
  //      <div
  //        className="relative w-full z-20 aspect-[1920/332] text-white bg-black"
  //        style={{
  //         //  clipPath: 'polygon(0 0, 100% 0, 100% 85%, 65% 100%, 0% 85%)',
  //         clipPath: 'polygon(0% 0%, 0% 40.66%, 65.36% 100%, 100% 0%)'
  //       }}
  //      ></div>
  //      </div>
  // )

  return (
    <div className="w-full h-[1240px] z-10">
            <svg
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1920 337" // Adjusted viewBox height to 1245 to add 5px at the bottom
              // preserveAspectRatio="xMidYMax meet"
              style={{ fontSize: 0, float:'left' }}
              className='absolute -bottom-[2px] flex'
              // transform={transforms[0]}
            >
              <defs>
                <mask id="mask">
                  <rect width="1920" height="332" fill="white" />
                  <polygon points="0 0 0 135 1255 330 1920 0 1920 0 1920 0 0 0"/>
    
                  {/* <polygon points="0 0 0 201.561092 0 1036.200679 0 1087.625789 1255.099121 1240.909908 1920 908.450984 1920 201.561092 1920 0 0 0" /> */}
                </mask>
              </defs>
              <rect width="1920" height="332" fill="white" mask="url(#mask)" />
              <rect y="330" width="1920" height="7" fill="white" />{' '}
              {/* Added white rectangle at the bottom */}
            </svg>
            {/* <div className="absolute bottom-0 border-none left-0 w-full h-[20px] z-10 bg-white" /> */}
          </div>
  )


  return (
<div className="w-full relative z-20 aspect-[1920/332] overflow-hidden ">
        <svg
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 332" // Adjusted viewBox height to 1245 to add 5px at the bottom
          // preserveAspectRatio="xMidYMax meet"
          className='absolute'
          style={{ fontSize: 0, float:'left', alignContent: 'flex-end' }}
          // transform={transforms[1]}
        >
          <defs>
            <mask id="mask">
              <rect width="100%" height="100%" fill="white" />
              <polygon points="0 0 0 135 1255 332 1920 0 1920 0 1920 0 0 0" />
            </mask>
          </defs>
          <polygon points="0 0 0 135 1255 332 1920 0 1920 0 1920 0 0 0" fill='black'/>
          {/* <rect width="100%" height="100%" fill="white" mask="url(#mask)" /> */}
          {/* Added white rectangle at the bottom */}
        </svg>
        {/* <div className="absolute -bottom-[5px] border-none left-0 w-full h-[6px] z-10 bg-white" /> */}
      </div>)
      }
