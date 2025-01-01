'use client'
import { useState, useEffect } from 'react'
import { Container } from '@/components/Other/Container'
import { BrandLogo } from './BrandLogo'

import { Moon, Sun } from 'lucide-react'
import { StaticImageData } from 'next/image'
import HeaderMenu, { type HeaderMenuProps } from './HeaderMenu'
import { PopoverGroup } from '@headlessui/react'
interface HeaderProps {
  isMenuOpen: boolean
  logoLight: StaticImageData
  logoDark: StaticImageData
  menuItems?: HeaderMenuProps[]
}

export function HeaderDesktop({ isMenuOpen, logoLight, logoDark, menuItems }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('light')
  const themes = ['light', 'dark']

  useEffect(() => {
    // Load theme from local storage or set to default 'light'
    const storedTheme = localStorage.getItem('theme') || 'light'
    console.log('storedTheme', storedTheme)
    setCurrentTheme(storedTheme)
    document.documentElement.setAttribute('class', storedTheme)
  }, [])

  const toggleTheme = () => {
    const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length]
    setCurrentTheme(nextTheme)
    document.documentElement.setAttribute('class', nextTheme)
    localStorage.setItem('theme', nextTheme) // Save theme to local storage
  }

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

  return (
    <>
      <header
        className={`z-50 pb-10 transition-all duration-300 hidden lg:block ${
          isScrolled || isMenuOpen ? 'translate-y-0' : '-translate-y-full bg-transparent'
        }`}
      >
        {/* <header
        className={`fixed top-0 left-0 right-0 z-50 mx-auto transition-all duration-300 ${
          isScrolled || isMenuOpen ? 'translate-y-0' : '-translate-y-full bg-transparent'
        }`}
      > */}
        <Container className="px-0">
          <nav className="backdrop-blur-sm text-white p-0 rounded-b-xl">
            <div className="flex items-center justify-between bg-accent px-9 py-0 dark:bg-[#212124] [&_.logo-light]:[filter:brightness(0)_invert(1)] rounded-b-xl dark:border dark:border-accent">
              <BrandLogo logoDark={logoDark} logoLight={logoLight} />
              {/* <ul className="flex items-center justify-center flex-grow space-x-8 text-md">
                <li>
                  <a href="/services" className="relative transition-colors group">
                    Services
                    <span className="absolute -bottom-1 left-1/2 w-1/2 h-0.5 bg-white dark:bg-accent transform -translate-x-1/2 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                  </a>
                </li>
                <li>
                  <a href="/insights" className="relative transition-colors group">
                    Insights
                    <span className="absolute -bottom-1 left-1/2 w-1/2 h-0.5 bg-white dark:bg-accent transform -translate-x-1/2 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                  </a>
                </li>
                <li>
                  <a href="/about" className="relative transition-colors group">
                    About Us
                    <span className="absolute -bottom-1 left-1/2 w-1/2 h-0.5 bg-white dark:bg-accent transform -translate-x-1/2 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                  </a>
                </li>
                <li>
                  <a href="/contact" className="relative transition-colors group">
                    Contact
                    <span className="absolute -bottom-1 left-1/2 w-1/2 h-0.5 bg-white dark:bg-accent transform -translate-x-1/2 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                  </a>
                </li>
              </ul> */}
              <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                {menuItems && menuItems.map((menu) => <HeaderMenu key={menu.name} {...menu} />)}
              </PopoverGroup>
              <div className="flex items-center space-x-4">
                <button
                  className="fixed right-4 z-[60] p-2 rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20  text-white dark:hover:text-accent"
                  onClick={toggleTheme}
                >
                  <div className="relative">
                    <Sun className="absolute h-6 w-6 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
                    <Moon className="absoulte h-6 w-6 rotate-0 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
                    {/* <X className="w-6 h-6 text-white" /> */}
                  </div>
                </button>
              </div>
            </div>
          </nav>
        </Container>
      </header>
    </>
  )
}
