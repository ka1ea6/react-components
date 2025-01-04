import { HeaderMobile } from './HeaderMobile'
import { HeaderDesktop } from './HeaderDesktop'
import { type HeaderMenuProps } from './HeaderMenu'
import { StaticImageData } from 'next/image'


interface HeaderProps {
  isMenuOpen: boolean
  logoLight: StaticImageData
  logoDark: StaticImageData
  menuItems?: HeaderMenuProps[]
}


export function Header({ isMenuOpen, logoLight, logoDark, menuItems }: HeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
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
