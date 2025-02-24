import { RichText } from '../Payload'
import Image, { StaticImageData } from 'next/image'

import { Page, Media } from '@/payload-types'

export const Footer: React.FC<{logoImage?: StaticImageData}> = ({logoImage}) => {
    return (
      <footer
        className="absolute bottom-0 left-0 w-full py-2 px-8 flex justify-between items-center transition-colors duration-300 
        dark bg-background text-primary"
      >
        <div className="flex px-6 items-center space-x-2">
          { logoImage && <img src={logoImage.src} alt="Cortex Reply Logo" className="h-8" /> }
          <span className="pl-12 text-sm">Power up your people</span>
        </div>
  
        <a href="https://cortexreply.com" className="text-sm hover:underline">
          cortexreply.com
        </a>
      </footer>
    )
  }
  
  interface HeaderTopProps {
    title: string
  }
  
  export const HeaderTop: React.FC<HeaderTopProps> = ({ title }) => {
    return (
      <header className="absolute top-0 left-0 w-full py-4 px-8 flex justify-between items-center transition-colors duration-300 dark bg-background text-foreground">
        <div className="container">
          <span className="container text-4xl px-6">{title}</span>
        </div>
      </header>
    )
  }
  
  export const TitleSlide: React.FC<{
    title?: string
    hero: Page['hero']
    logoImage?: StaticImageData
  }> = (props) => {
    const { title, hero, logoImage } = props
  
    return (
      <div className="relative w-full h-full flex flex-col justify-center min-h-[500px] p-10">
        <div className="absolute inset-0">
          <Image
            src={hero.media && (hero.media as Media).url ? (hero.media as Media).url! : '/hero.png'}
            alt="Background"
            width={
              hero.media && (hero.media as Media).width ? ((hero.media as Media).width ?? 1920) : 1920
            }
            height={
              hero.media && (hero.media as Media).height
                ? ((hero.media as Media).height ?? 1080)
                : 1080
            }
            style={{
              objectFit: 'cover', // cover, contain, none
            }}
            className="opacity-80 h-full dark:opacity-60"
          />
        </div>
        {/* Logos */}
        <div className="absolute left-16 z-50 top-4 flex flex-col items-start gap-4">
          {logoImage && (
            <div className="h-24">
              <Image
                src={logoImage.src}
                alt="Company logo"
                className="h-full w-full object-contain"
                width={192}
                height={96}
              />
            </div>
          )}
          {/* {ReplyLogo && (
                              <div className="h-10 w-20 md:h-12 md:w-24">
                                <Image
                                  src={ReplyLogo}
                                  alt="Customer logo"
                                  className="h-full w-full object-contain"
                                  width={96}
                                  height={48}
                                />
                              </div>
                            )} */}
        </div>
  
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
  
        <div className="relative pl-24 z-10 max-w-3xl">
          <p className="text-lg font-medium pt-48 text-accent mb-2">{title}</p>
  
          
            {hero.richText && (
              <RichText
                content={hero.richText}
                enableGutter={false}
                className="prose-headings:text-white prose-p:text-white"
              />
            )}
          
        </div>
      </div>
    )
  }
  