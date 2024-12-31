'use client'

import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverGroup,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { SunIcon, MoonIcon } from '@heroicons/react/20/solid'
import HeaderMenu, { type HeaderMenuProps } from './HeaderMenu'
// import Image from 'next/image'
import { Container } from '@/components/Other/Container'
import { BrandLogo } from './BrandLogo'
import { Moon, Sun } from 'lucide-react'
import { type StaticImageData } from 'next/image'
interface SimpleHeaderProps {
  title: string
  logoLight: StaticImageData
  logoDark: StaticImageData
  menuItems: HeaderMenuProps[]
  isMenuOpen?: boolean

}
const themes = ['light', 'dark']

export function HeaderMobile({ title, logoLight, logoDark, menuItems, isMenuOpen = true }: SimpleHeaderProps) {
  const [isScrolled , setIsScrolled] = useState(false)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('light')
  // const logoBase = logo?.split('.')[0]
  // const logoExt = logo?.split('.')[1]
  // const [themeLogo, setThemeLogo] = useState(`${logoBase}.${logoExt}`)

  // const updateLogo = (theme: string) => {
  //   if (themes.includes(theme)) {
  //     if (theme === 'light') {
  //       setThemeLogo(`${logoBase}.${logoExt}`)
  //     } else {
  //       setThemeLogo(`${logoBase}-${theme}.${logoExt}`)
  //     }
  //   } else {
  //     setThemeLogo(`${logoBase}.${logoExt}`)
  //   }
  // }

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
    // Load theme from local storage or set to default 'light'
    const storedTheme = localStorage.getItem('theme') || 'light'
    // console.log('storedTheme', storedTheme)
    setCurrentTheme(storedTheme)
    document.documentElement.setAttribute('class', storedTheme)
    // updateLogo(storedTheme)
  }, [])

  const toggleTheme = () => {
    const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length]
    setCurrentTheme(nextTheme)
    document.documentElement.setAttribute('class', nextTheme)
    localStorage.setItem('theme', nextTheme) // Save theme to local storage
    // updateLogo(nextTheme)
  }


  return (
    <>
     <header
        className={`z-50 pb-10 transition-all duration-300 block lg:hidden ${
          isScrolled || isMenuOpen ? 'translate-y-0' : '-translate-y-full bg-transparent'
        }`}
      >
        {/* <Container className='px-0'> */}
          <nav className="backdrop-blur-sm text-white p-0">
            <div className="flex items-stretch justify-between bg-accent px-2 py-0 dark:bg-[#212124] [&_.logo-light]:[filter:brightness(0)_invert(1)] dark:border-b dark:border-accent">
              <BrandLogo logoDark={logoDark} logoLight={logoLight} mobile={true}/>
              <div className='flex items-center space-x-4'>
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
        <DialogPanel className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-white dark:bg-[#212124] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5 outline-none">
            <BrandLogo logoDark={logoDark} logoLight={logoLight} mobile={true}/>

              {/* <img alt={title} src={logo} className="h-8 w-auto" /> */}
            </a>
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
              <div className="space-y-2 py-6">
                {menuItems.map((menu) => (
                  <DisclosureItem key={menu.name} {...menu} />
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
        {/* </Container> */}
      </header>
    </>
  )


  return (
    <header className="relative isolate z-10 bg-background h-14">
      <nav
        aria-label="Global"
        className="relative mx-auto flex items-center justify-between p-3 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5 outline-none">
            <span className="sr-only">{title}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {/* <img alt={title} src={themeLogo} className="h-9 w-auto" /> */}
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 outline-none"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {menuItems.map((menu) => (
            <HeaderMenu key={menu.name} {...menu} />
          ))}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="p-2 text-gray-700 outline-none">
            {currentTheme === 'dark' ? (
              <SunIcon className="h-6 w-6" />
            ) : currentTheme === 'green' ? (
              <MoonIcon className="h-6 w-6" />
            ) : (
              <SunIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50" aria-hidden="true" />
        <DialogPanel className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5 outline-none">
              <span className="sr-only">Your Company</span>
              {/* <img alt={title} src={logo} className="h-8 w-auto" /> */}
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 outline-none"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {menuItems.map((menu) => (
                  <DisclosureItem key={menu.name} {...menu} />
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
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
