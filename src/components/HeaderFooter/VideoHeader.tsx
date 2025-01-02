'use client'

import { useState, useEffect } from 'react'
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
  subtitle?: string
}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('next-section')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsHeaderVisible(true)
        setIsMenuOpen(false)
      } else {
        setIsHeaderVisible(false)
        setIsMenuOpen(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <div className="relative h-screen">
      <div className="absolute inset-0 w-full h-screen overflow-hidden">
        <video className="object-cover w-full h-full" autoPlay loop muted playsInline>
          <source src="assets/videos/background.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-primary-900/50" />
      </div>
      {!isScrolled && (
        <button
          className="fixed hidden lg:block top-4 right-4 z-[60] p-2 rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
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
      <div
        className={`fixed top-4 left-4 z-50 transition-all duration-300 ${
          isHeaderVisible || isMenuOpen ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* <Image
          src={logoBw}
          alt="Cortex Reply Logo"
          width={180}
          height={80}
          className="h-auto w-auto"
        /> */}
      </div>
      <div className="absolute inset-0 h-full z-10 flex flex-col items-center justify-between text-white text-center px-4">
        <Image
          src={logoVideo}
          alt="Cortex Reply Logo"
          width={720}
          height={320}
          className={cn('h-auto w-auto mt-8 hidden lg:block', isMenuOpen && 'lg:hidden')}
        />
        <div className="h-full flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold pt-auto mb-12">{title && title}.</h1>
          <p className="text-3xl mb-8 max-w-2xl">{subtitle && subtitle}</p>
        </div>
        <div className="flex justify-center items-center w-full mb-8">
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
