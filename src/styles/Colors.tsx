import { Copy, Check } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '@/components/client/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/client/ui/tooltip'

const brandColors = [
  {
    name: 'one',
    colors: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'two',
    colors: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'three',
    colors: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'four',
    colors: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
]

const colorGroups = [
  {
    name: 'Base',
    colors: ['background', 'foreground'],
  },
  {
    name: 'Card',
    colors: ['card', 'card-foreground'],
  },
  {
    name: 'Popover',
    colors: ['popover', 'popover-foreground'],
  },
  {
    name: 'Primary',
    colors: ['primary', 'primary-foreground'],
  },
  {
    name: 'Secondary',
    colors: ['secondary', 'secondary-foreground'],
  },
  {
    name: 'Muted',
    colors: ['muted', 'muted-foreground'],
  },
  {
    name: 'Accent',
    colors: ['accent', 'accent-foreground'],
  },
  {
    name: 'Destructive',
    colors: ['destructive', 'destructive-foreground'],
  },
  {
    name: 'Border & Input',
    colors: ['border', 'input', 'ring'],
  },
  {
    name: 'Charts',
    colors: ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'],
  },
  {
    name: 'Sidebar',
    colors: [
      'sidebar-background',
      'sidebar-foreground',
      'sidebar-primary',
      'sidebar-primary-foreground',
      'sidebar-accent',
      'sidebar-accent-foreground',
      'sidebar-border',
      'sidebar-ring',
    ],
  },
]

export default function ThemeColors() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedColor(text)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  return (
    /* Usage in HTML or React component */

    <div className="w-full max-w-6xl mx-auto space-y-2">
      <div className="variable-safelist" style={{ display: 'none' }}></div>
      <div>
        <h1 className="text-3xl font-semibold py-4">Theme Colors</h1>
        {colorGroups.map((group) => (
          <div key={group.name} className="space-y-4 bg-grey-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <h2 className="text-2xl font-semibold">{group.name}</h2>
              {group.colors.map((color) => (
                <div key={color} className="flex items-center space-x-2 p-2 rounded-lg bg-grey-500">
                  <div
                    className={`w-12 h-12 rounded-md bg-${color} text-${color}-foreground border border-grey-500 flex items-center justify-center`}
                    aria-label={`${color} color swatch`}
                  >
                    F
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{color}</p>
                    {/* <p className="text-xs text-muted-foreground truncate">
                    {`bg-${color}`}
                  </p> */}
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(`bg-${color}`)}
                          aria-label={`Copy ${color} class`}
                        >
                          {copiedColor === `bg-${color}` ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{copiedColor === `bg-${color}` ? 'Copied!' : 'Copy to clipboard'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        <h1 className="text-3xl font-semibold py-4">Brand Colors</h1>

        {brandColors.map((group) => (
          <div key={group.name} className="space-y-4 bg-grey-500">
            <div className="grid grid-cols-11 sm:grid-cols-6 md:grid-cols-11 lg:grid-cols-11 gap-0">
              <h2 className="text-2xl font-semibold">{group.name}</h2>
              <div className="flex items-center space-x-2 p-1 py-4 rounded-lg bg-grey-500">
                <div className="flex items-center space-x-0 p-0 py-4 rounded-lg bg-grey-500">
                  <div
                    className={`w-12 h-12 rounded-md bg-brand-${group.name} border border-grey-500`}
                    aria-label={`${group.name} color swatch`}
                  />
                </div>
                <div className="flex items-center space-x-0 p-0 py-4 rounded-lg bg-grey-500">
                  <div
                    className={`w-12 h-12 rounded-md bg-brand-${group.name}-foreground border border-grey-500`}
                    aria-label={`${group.name} color swatch`}
                  />
                </div>
              </div>
              {group.colors.map((color) => (
                <div
                  key={color}
                  className="flex items-center space-x-1 p-1 py-4 rounded-lg bg-grey-500"
                >
                  <div
                    className={`w-12 h-12 rounded-md bg-brand-${group.name}-${color} border border-grey-500`}
                    aria-label={`${color} color swatch`}
                  >
                    {color}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
