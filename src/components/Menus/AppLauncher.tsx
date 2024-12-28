'use client'
import React, { useRef } from 'react'
import DynamicIcon, { type IconType } from '@/components//Images/DynamicIcon'
import Image from 'next/image'

type Apps = {
  name: string
  icon: {
    type: string
    name: string
    url: string
  }
  link: string
}[]

interface AppLauncherProps {
  apps: Apps
  isVisible: boolean
}

const AppLauncher: React.FC<AppLauncherProps> = ({ apps, isVisible = true }) => {
  const appGridRef = useRef<HTMLDivElement | null>(null)

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 bg-background/80 dark:bg-background backdrop-blur-sm z-10">
          <div
            ref={appGridRef}
            className="bg-background w-full max-w-3xl mx-auto mt-16 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="grid grid-cols-5 gap-4 p-4 bg-background">
              {apps.map((app, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  {app.icon.url ? (
                    <div className="w-12 h-12 mb-2">
                      <Image src={app.icon.url} className="h-full w-full" alt={'icon'} />
                    </div>
                  ) : (
                    <div className="w-12 h-12 mb-2">
                      <DynamicIcon
                        type={app.icon.type as IconType}
                        iconName={app.icon.name}
                        className="h-full w-full"
                      />
                    </div>
                  )}
                  <span className="text-xs">{app.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AppLauncher
