import React from 'react'

import type { Page } from '@/payload-types'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'

import { HighImpactHero } from '@/components/Heros/HighImpact'
import { LowImpactHero } from '@/components/Heros/LowImpact'
import { MediumImpactHero } from '@/components/Heros/MediumImpact'
import { SectionHero } from '@/components/Heros/SectionHero'
const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  sectionHero: SectionHero
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}

interface BreadcrumbItem {
  href?: string
  label: string
}

export function Breadcrumb({ breadcrumbItems }: { breadcrumbItems: BreadcrumbItem[] }) {
  if (breadcrumbItems && breadcrumbItems.length > 0) {
    const filteredItems = breadcrumbItems.filter(item => item.label.toLowerCase() !== 'home');

  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <a href="/" className="text-foreground hover:text-accent">
              <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {filteredItems.map((menuItem, index) => (
          <li key={index}>
            <div className="flex items-center">
              <ChevronRightIcon aria-hidden="true" className="size-5 shrink-0 text-gray-400" />
              {menuItem.href ? (

              <a
                href={menuItem.href}
                className="ml-4 text-sm font-medium text-foreground hover:text-accent"
              >
                {menuItem.label}
              </a>) : (
                <div className="ml-4 text-sm font-medium text-foreground hover:text-accent">{menuItem.label}</div> )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
return <></>
}