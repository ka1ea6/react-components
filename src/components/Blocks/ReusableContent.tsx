import type { Proposal, ReusableContent } from '@/payload-types'

import { RenderBlocks } from './RenderBlocks'
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