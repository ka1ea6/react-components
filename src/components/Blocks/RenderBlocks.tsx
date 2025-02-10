import { cn } from '@/lib/utils/cn'
import React, { Fragment } from 'react'
import Image from "next/image"

import type { Page, Media } from '@/payload-types'

import { CallToActionBlock } from './CallToAction'
import { ContentBlock } from './Content'
// import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from './MediaBlock'
import { FeaturesBlock } from './FeaturesBlock'
import { ReusableContentBlock } from './ReusableContent'

const blockComponents: { [key: string]: React.FC<any> } = {
  content: ContentBlock,
  cta: CallToActionBlock,
  // formBlock: FormBlock,
  mediaBlock: MediaBlock,
  imageBlock: MediaBlock,
  features: FeaturesBlock,
  reusableContentBlock: ReusableContentBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <section id='render-blocks'>
        {blocks.map((block, index) => {
          const util = require('util')
          console.log('RenderBlocks:block', util.inspect(block, false, null, true /* enable colors */))
          const { blockType } = block as { blockType: keyof typeof blockComponents }
          const theme = (block as any)?.theme;
          console.log('RenderBlocks:blockType', util.inspect(blockType, false, null, true /* enable colors */))

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="py-6 relative" key={index}>
                  <Theme block={block} index={index} />
                  <div className={cn("container", theme?.settings?.theme === 'dark' ? 'dark' : '')}>
                  <Block {...block} />
                  </div>
                </div>
              )
            }
          }
          return null
        })}
      </section>
    )
  }

  return null
}


const Theme: React.FC<{
  block: any
  index: number
}> = (props) => {
if (!('theme' in props.block)) {
  return null
}

  const theme = (props.block as any)?.theme;

  if (theme.settings.background === 'image') {
    const themeSettings = {
      imagePosition: theme.settings.imagePosition || "left",
      overlay: theme.settings.overlay !== undefined ? theme.settings.overlay : true
    }
    return (

      <div className={cn("absolute inset-0 w-full h-full -z-10", theme.settings.theme === 'dark' ? 'dark bg-background' : '')}>
              <Image src={theme.settings.image.url || "/placeholder.svg"} alt={theme.settings.image.alt} fill className="object-cover" priority />
              {theme.settings.overlay && (
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                    themeSettings.imagePosition === "left"
                        ? "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)"
                        : "linear-gradient(-90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 100%)",
                  }}
                />
              )}
            </div>
    )
  }
  return (
    <div className={cn("absolute inset-0 -z-10 w-screen h-full", theme.settings.theme === 'dark' ? 'dark bg-background' : '')}></div>
  )
}
