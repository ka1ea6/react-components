'use client'

import React from 'react'
import DynamicIcon, { type IconType } from '@/components/client/Images/DynamicIcon'

type InsightProps = {
  icon: { type: string; name: string }
  title: string
  body: string
  color?: string
}

export function Insight({ icon, title, body, color = 'secondary' }: InsightProps) {
  return (
    <>
      <div className="flex py-0 min-h-16">
        <div className="px-[2%] flex items-center">
          <div className="w-12 h-12">
            <DynamicIcon type={icon.type as IconType} iconName={icon.name} />
          </div>
        </div>
        <div className="px-[1%] py-1.5 flex items-center text-2xl min-w-[30%]">{title}</div>
        {body && (
          <div className="px-[1%] py-1.5 flex items-center text-2xl min-w-[50%]">{body}</div>
        )}
      </div>
    </>
  )
}
