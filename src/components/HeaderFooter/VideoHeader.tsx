'use client'

import { useState, useEffect, JSX } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import { HeaderDesktop } from './HeaderDesktop'
import { HeaderMobile } from './HeaderMobile'
import { type HeaderMenuProps } from './HeaderMenu'
import { Container, PageShape } from '@/components/Other'
import { cn } from '@/lib/utils/cn'
export function VideoHeader({
  logoVideo,
  logoLight,
  logoDark,
  menuItems,
  title,
  subtitle,
}: {
  logoVideo: StaticImageData
  logoLight: StaticImageData
  logoDark: StaticImageData
  menuItems?: HeaderMenuProps[]
  title?: string
  subtitle?: string | JSX.Element
}) {
  // const [isScrolled, setIsScrolled] = useState(false)
  // const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  // const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('next-section')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY
  //     if (currentScrollY > 100) {
  //       setIsScrolled(true)
  //     } else {
  //       setIsScrolled(false)
  //       setIsMenuOpen(false)
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll, { passive: true })

  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen)
  // }

  return (
<div>
      <div className="sticky top-0 h-screen">
              <video
                className="fixed inset-0 object-cover w-full h-full z-0"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="assets/videos/background2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* <div className="absolute inset-0 bg-primary-900/50" /> */}
        
              {/* {!isScrolled && !isMenuOpen && (
                  <button
                    className="fixed hidden lg:block top-4 right-4 z-[60] p-2 rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                    onClick={toggleMenu}
                  >
                   
                      <Menu className="w-6 h-6 text-white" />
          
          
                  </button>
                )}
                 */}
        
              <div className="fixed inset-0 h-full z-10 flex flex-col items-start justify-center text-white px-4">
                {/* { !isScrolled && !isMenuOpen && <Image
                    src={logoVideo}
                    alt="Cortex Reply Logo"
                    width={720}
                    height={320}
                    className={cn('absolute top-2.5 h-auto w-auto mt-8 hidden lg:block', isMenuOpen && 'lg:hidden')}
                  />} */}
                {/* <div className="absolute top-1/2vv h-full flex flex-col px-4 items-center justify-center">
                    <h1 className="text-6xl font-bold pt-auto mb-12">{title && title}</h1>
                    <div className="text-3xl mb-8 max-w-2xl">{subtitle && subtitle}</div>
                  </div> */}
                <Container>
                  <div className="flex flex-col items-start md:w-1/2 mb-10 z-0 md:mb-0">
                    <h1 className="text-5xl md:text-7xl mb-6">{title && title}</h1>
                    <div className="text-lg md:text-2xl text-gray-300 mb-8 max-w-lg">
                    {subtitle && subtitle}
                    </div>
                  </div>
                </Container>
              </div>
        <PageShape className="text-black z-10" position="header" />
      </div>
    </div>
  )
}
