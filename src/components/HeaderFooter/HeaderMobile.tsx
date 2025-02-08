'use client'

import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { type HeaderMenuProps } from './HeaderMenu'
import { BrandLogo } from './BrandLogo'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { type StaticImageData } from 'next/image'
import { useTheme } from 'next-themes'

interface SimpleHeaderProps {
  logoLight: StaticImageData
  logoDark: StaticImageData
  menuItems?: HeaderMenuProps[]
  isMenuOpen?: boolean
}
const themes = ['light', 'dark']

export function HeaderMobile({
  logoLight,
  logoDark,
  menuItems,
  isMenuOpen = true,
}: SimpleHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('light')

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

  useEffect(() => {
    setCurrentTheme(theme || 'dark')
  }, [theme])

  const toggleTheme = () => {
    const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length]
    setCurrentTheme(nextTheme)
    setTheme(nextTheme)
  }

  return (
    <>
      <header
        className={`z-50 pb-10 transition-all duration-300 block lg:hidden ${
          isScrolled || isMenuOpen ? 'translate-y-0' : '-translate-y-full bg-transparent'
        }`}
      >
        {/* <Container className='px-0'> */}
        <nav className={cn('backdrop-blur-sm text-white p-0', mobileMenuOpen && 'hidden')}>
          <div className="flex items-stretch justify-between bg-accent px-2 py-0 dark:bg-[#212124] [&_.logo-light]:[filter:brightness(0)_invert(1)] dark:border-b dark:border-accent">
            <BrandLogo logoDark={logoDark} logoLight={logoLight} mobile={true} />
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="fixed right-4 z-[60] p-2 rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20  text-white dark:hover:text-accent"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="h-4 w-4" />
              </button>
              <button
                className="fixed right-16 z-[60] p-2 rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20  text-white dark:hover:text-accent"
                onClick={toggleTheme}
              >
                <div className="relative">
                  <Sun className="absolute h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
                  <Moon className="absoulte h-4 w-4 rotate-0 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
                  {/* <X className="w-6 h-6 text-white" /> */}
                </div>
              </button>
            </div>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-10 bg-black bg-opacity-50" aria-hidden="true" />
          <DialogPanel className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-white dark:bg-[#212124] px-2 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-stretch justify-between">
              {/* <a href="/" className="-m-1.5 p-1.5 outline-none"> */}
              <BrandLogo logoDark={logoDark} logoLight={logoLight} mobile={true} />

              {/* </a> */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-foreground outline-none hover:text-accent"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 px-2 py-6">
                  {menuItems &&
                    menuItems.map((menu) => <DisclosureItem key={menu.name} {...menu} />)}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
        {/* </Container> */}
      </header>
    </>
  )
}

function DisclosureItem({ name, items, actions, href }: HeaderMenuProps) {
  if (!items && href) {
    return (
      <a
        href={href}
        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold dark:text-foreground text-gray-900 hover:bg-gray-50 hover:text-accent"
      >
        {name}
      </a>
    )
  }
  return (
    <Disclosure as="div" className="-mx-3">
      <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold dark:text-foreground text-gray-900 hover:bg-gray-50 hover:text-accent">
        {name}
      </DisclosureButton>
      <DisclosurePanel className="mt-2 space-y-2">
        {items &&
          items.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold dark:text-foreground text-gray-900 hover:bg-gray-50 hover:text-accent"
            >
              {item.name}
            </DisclosureButton>
          ))}
      </DisclosurePanel>
    </Disclosure>
  )
}
