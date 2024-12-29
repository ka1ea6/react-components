'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Container } from '@/components/Other/Container'
import { BrandLogo } from './BrandLogo'
import logoLight from '../../images/cortex-reply-light.png'
import logoDark from '../../images/cortex-reply-dark.png'

interface HeaderProps {
  isMenuOpen: boolean
  setIsMenuOpen?: (isOpen: boolean) => void
}

export function HeaderDesktop({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

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
    setIsMenuOpen && setIsMenuOpen(!isMenuOpen)
  }
  console.log('logo: ', logoLight)
  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 mx-auto transition-all duration-300 ${
          isScrolled || isMenuOpen ? 'translate-y-0' : '-translate-y-full bg-transparent'
        }`}
      >
        <Container>
          <nav className="backdrop-blur-sm text-white p-0 rounded-b-xl">
            <div className="flex items-center justify-between bg-primary px-9 py-0 dark:bg-[#212124] [&_.logo-light]:[filter:brightness(0)_invert(1)] rounded-b-xl">
              <BrandLogo logoDark={logoDark} logoLight={logoLight}/>
              <ul className="flex items-center justify-center flex-grow space-x-8 text-md">
                <li>
                  <a href="/services" className="relative transition-colors group">
                    Services
                    <span className="absolute -bottom-1 left-1/2 w-1/2 h-0.5 bg-white dark:bg-primary transform -translate-x-1/2 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                  </a>
                </li>
                <li>
                  <a href="/insights" className="relative transition-colors group">
                    Insights
                    <span className="absolute -bottom-1 left-1/2 w-1/2 h-0.5 bg-white dark:bg-primary transform -translate-x-1/2 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                  </a>
                </li>
                <li>
                  <a href="/about" className="relative transition-colors group">
                    About Us
                    <span className="absolute -bottom-1 left-1/2 w-1/2 h-0.5 bg-white dark:bg-primary transform -translate-x-1/2 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                  </a>
                </li>
                <li>
                  <a href="/contact" className="relative transition-colors group">
                    Contact
                    <span className="absolute -bottom-1 left-1/2 w-1/2 h-0.5 bg-white dark:bg-primary transform -translate-x-1/2 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                  </a>
                </li>
              </ul>
              {!isScrolled && setIsMenuOpen && (
                <button
                  className="fixed right-4 z-[60] p-2 rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                  onClick={toggleMenu}
                >
                  {isMenuOpen ? (
                    <X className="w-6 h-6 text-white" />
                  ) : (
                    <Menu className="w-6 h-6 text-white" />
                  )}
                </button>
              )}
            </div>
          </nav>
        </Container>
      </header>
    </>
  )
}
