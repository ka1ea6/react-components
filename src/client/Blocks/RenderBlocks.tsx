import { cn } from '@/lib/utils/cn'
import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { CallToActionBlock } from './CallToAction'
import { ContentBlock } from './Content'
// import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from './MediaBlock'

import { FeaturesBlock } from './FeaturesBlock'
const blockComponents = {
  content: ContentBlock,
  cta: CallToActionBlock,
  // formBlock: FormBlock,
  mediaBlock: MediaBlock,
  imageBlock: MediaBlock,
  features: FeaturesBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block as { blockType: keyof typeof blockComponents }

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-6" key={index}>
                  {/* @ts-expect-error */}
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
