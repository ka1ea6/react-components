'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui'
import { BrandLogo } from './BrandLogo'
import { useTheme } from 'next-themes'

import { Moon, Sun } from 'lucide-react'
import { StaticImageData } from 'next/image'
import HeaderMenu, { type HeaderMenuProps } from './HeaderMenu'
import { PopoverGroup } from '@headlessui/react'
import { Container } from '@/components/Other/Container'
import { cn } from '@/lib/utils'

interface HeaderProps {
  menuItems?: HeaderMenuProps[]
  wide?: boolean
  dark?: boolean
}

export function RelatedPagesMenu({ menuItems, wide = false, dark = true }: HeaderProps) {
  return (
    <>
      <menu
        className={cn(
          'w-full relative py-2 transition-all duration-300',
          dark ? 'bg-black text-white' : 'light bg-background text-foreground border-b border-accent',
        )}
      >
        {/* <Container className="px-0"> */}
        <nav className="container backdrop-blur-sm p-0">
          <div className="container">
            <div
              className={cn('flex items-center justify-between px-9 py-0', !wide && 'container')}
            >
              <PopoverGroup className="flex gap-x-12">
                {menuItems && menuItems.map((menu) => <HeaderMenu key={menu.name} {...menu} />)}
              </PopoverGroup>
            </div>
          </div>
        </nav>
      </menu>
    </>
  )
}
