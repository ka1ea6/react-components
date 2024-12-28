import type { StaticImageData } from 'next/image'

import { cn } from '@/lib/utils/cn'
import React from 'react'
import type { ImageBlock as ImageBlockProps } from '@/payload-types'

import { Media } from '@/components/Payload/Media'

type Props = ImageBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const ImageBlock: React.FC<Props> = (props) => {
  const { className, enableGutter = true, imgClassName, media, staticImage } = props

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      <Media
        imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
        resource={media}
        src={staticImage}
      />
    </div>
  )
}
