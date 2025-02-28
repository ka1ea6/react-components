'use client'

import { useState, useEffect, JSX } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'
import { HeaderDesktop } from './HeaderDesktop'
import { HeaderMobile } from './HeaderMobile'
import { type HeaderMenuProps } from './HeaderMenu'
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
  const [isScrolled, setIsScrolled] = useState(false)
  // const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('next-section')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 100) {
  //       setIsHeaderVisible(true)
  //       setIsMenuOpen(false)
  //     } else {
  //       setIsHeaderVisible(false)
  //       setIsMenuOpen(true)
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll, { passive: true })
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="sticky top-0 h-screen">
      
        <video className="fixed inset-0 object-cover w-full h-full z-0" autoPlay loop muted playsInline>
          <source src="assets/videos/background2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* <div className="absolute inset-0 bg-primary-900/50" /> */}
      
      {!isScrolled && !isMenuOpen && (
        <button
          className="fixed hidden lg:block top-4 right-4 z-[60] p-2 rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
          onClick={toggleMenu}
        >
          {/* {isMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )} */}
            <Menu className="w-6 h-6 text-white" />


        </button>
      )}
      <div className="fixed top-0 left-0 right-0 z-50">
        <HeaderDesktop
          isMenuOpen={isScrolled || isMenuOpen}
          logoLight={logoLight}
          logoDark={logoDark}
          menuItems={menuItems}
        />
        <HeaderMobile
          isMenuOpen={true}
          logoLight={logoLight}
          logoDark={logoDark}
          menuItems={menuItems}
        />
      </div>
      
      <div className="fixed inset-0 h-full z-10 flex flex-col items-center justify-between text-white text-center px-4">
        { !isScrolled && !isMenuOpen && <Image
          src={logoVideo}
          alt="Cortex Reply Logo"
          width={720}
          height={320}
          className={cn('absolute top-2.5 h-auto w-auto mt-8 hidden lg:block', isMenuOpen && 'lg:hidden')}
        />}
        <div className="absolute top-1/2vv h-full flex flex-col px-4 items-center justify-center">
          <h1 className="text-6xl font-bold pt-auto mb-12">{title && title}</h1>
          <div className="text-3xl mb-8 max-w-2xl">{subtitle && subtitle}</div>
        </div>
        <div className="absolute bottom-10 flex justify-center items-center w-full mb-8">
          <div
            className="animate-bounce cursor-pointer hover:text-accent"
            onClick={scrollToNextSection}
          >
            <ChevronDown size={64} />
          </div>
        </div>
      </div>
    </div>
  )
}
