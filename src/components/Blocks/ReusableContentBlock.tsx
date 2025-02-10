import type { ReusableContent } from '@/payload-types'

import { RenderBlocks } from './RenderBlocks'
import React from 'react'

// export type Props = Extract<Proposal['layout'][0], { blockType: 'reusableContentBlock' }>
type Props = {
  customId: string
  reusableContent: ReusableContent
}

export const ReusableContentBlock: React.FC<Props> = (props) => {
  console.log('ReusableContentBlock:props', props)

  const { customId, reusableContent } = props as { customId: string, reusableContent: ReusableContent }
  console.log('ReusableContentBlock:reusableContent', reusableContent)
  console.log('ReusableContentBlock:object', typeof reusableContent === 'object')
  if (typeof reusableContent === 'object' && reusableContent !== null) {
    return <RenderBlocks blocks={reusableContent.layout} />
  }

  return (<></>)
}