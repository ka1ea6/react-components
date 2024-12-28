import React from 'react'
import type { ReactNode } from 'react'

export interface HeaderMenuItemProps {
  name: string
  icon: ReactNode
  description?: string
  href: string
}

const HeaderMenuItem = ({ name, icon, description, href }: HeaderMenuItemProps) => (
  <a
    href={href}
    className="block p-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded-lg"
  >
    <div className="flex items-center">
      <div className="h-6 w-6 text-gray-600">{icon}</div>
      <span className="ml-3">{name}</span>
    </div>
    {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
  </a>
)

export default HeaderMenuItem
