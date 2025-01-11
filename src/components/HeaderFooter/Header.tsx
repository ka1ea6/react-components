import { HeaderMobile } from './HeaderMobile'
import { HeaderDesktop } from './HeaderDesktop'
import { type HeaderMenuProps } from './HeaderMenu'
import { StaticImageData } from 'next/image'
import { cn } from '@/lib/utils'


interface HeaderProps {
  isMenuOpen: boolean
  logoLight: StaticImageData
  logoDark: StaticImageData
  menuItems?: HeaderMenuProps[]
  className?: string
}


export function Header({ isMenuOpen, logoLight, logoDark, menuItems, className }: HeaderProps) {
  return (
    <div className={cn('fixed top-0 left-0 right-0 z-50', className)}>
      <HeaderDesktop
        isMenuOpen={isMenuOpen}
        logoLight={logoLight}
        logoDark={logoDark}
        menuItems={menuItems}
      />
      <HeaderMobile
        isMenuOpen={isMenuOpen}
        logoLight={logoLight}
        logoDark={logoDark}
        menuItems={menuItems}
      />
    </div>
  )
}
