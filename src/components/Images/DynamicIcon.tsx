'use client'
import React from 'react'

export type IconType = 'solid' | 'regular' | 'light' | 'duotone' | 'kit' | 'brands' | 'thin'

export interface DynamicIconProps {
  type?: IconType
  iconName: string
  size?:
    | '2xs'
    | 'xs'
    | 'sm'
    | 'lg'
    | 'xl'
    | '2xl'
    | '1x'
    | '2x'
    | '3x'
    | '4x'
    | '5x'
    | '6x'
    | '7x'
    | '8x'
    | '9x'
    | '10x'
  className?: string
}

const DynamicIcon: React.FC<DynamicIconProps> = ({
  type = 'solid',
  iconName = 'cloud',
  size = 'lg',
  className,
}) => {
  const typeWithPrefix = type.includes('fa-') ? type + ' ' : 'fa-' + type + ' '
  const name = 'fa-' + iconName
  const classNameContent = className ?? ''
  let icon = typeWithPrefix + name + ' fa-' + size + ' ' + classNameContent

  return <i className={icon} />
}

export { DynamicIcon }
