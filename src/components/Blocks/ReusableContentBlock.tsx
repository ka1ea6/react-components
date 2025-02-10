import { cn } from '@/lib/utils/cn'
import Image from "next/image"
import type { Page } from '@/payload-types'
import type { ReusableContent } from '@/payload-types'
import { CallToActionBlock } from './CallToAction'
import { ContentBlock } from './Content'
// import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from './MediaBlock'
import { FeaturesBlock } from './FeaturesBlock'
import { Theme } from './RenderBlocks'
// import { RenderBlocks } from './RenderBlocks'
import React from 'react'

// export type Props = Extract<Proposal['layout'][0], { blockType: 'reusableContentBlock' }>
type Props = {
  customId: string
  reusableContent: ReusableContent
}

export const ReusableContentBlock: React.FC<Props> = (props) => {
  const { customId, reusableContent } = props as { customId: string, reusableContent: ReusableContent }
  if (typeof reusableContent === 'object' && reusableContent !== null) {
    return <RenderBlocks blocks={reusableContent.layout} />
  }
  return (<></>)
}

const blockComponents: { [key: string]: React.FC<any> } = {
  content: ContentBlock,
  cta: CallToActionBlock,
  mediaBlock: MediaBlock,
  imageBlock: MediaBlock,
  features: FeaturesBlock,
}


const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <section id='render-blocks'>
        {blocks.map((block, index) => {
          const { blockType } = block as { blockType: keyof typeof blockComponents }
          const theme = (block as any)?.theme;      
          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]          
            if (Block) {
              return (
                <div className="py-6 relative" key={index}>
                  {/* <Theme block={block} index={index} /> */}
                  <div className={cn(theme?.settings?.theme === 'dark' ? 'dark' : theme?.settings?.theme === 'green' ? 'green' : '')}>
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

