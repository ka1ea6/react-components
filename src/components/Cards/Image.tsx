'use client'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogClose,
} from '@/components/ui/dialog'
import { X } from 'lucide-react' // Using Lucide Icons as a replacement for MUI icons
import NextImage from 'next/image'
import path from 'path'
import React, { useState } from 'react'

type Menu ={
  component: string
  collection: string | null
  scope?: string
}

type LinkedItem ={
  repo: string
  owner: string
  branch: string
  path: string
}

type ContentItem ={
  source: string
  repo: string
  owner: string
  branch: string
  path: string
  reference: string
  icon?: React.ComponentType<React.ComponentProps<'svg'>> | React.JSX.Element
  collections?: string[]
  menu?: Menu
  file?: string
  linked?: LinkedItem
}

function isSharePointUrl(url: string) {
  try {
    const urlObj = new URL(url)
    const { hostname } = urlObj
    return hostname.endsWith('sharepoint.com')
  } catch {
    return false
  }
}

function isExternalUrl(url: string) {
  return url.startsWith('http')
}

function getAPIUrl(src: string, baseContext: ContentItem) {
  let url = src
  if (isSharePointUrl(src)) {
    url = `/docs/api/content/sharepoint?url=${src}`
  } else if (isExternalUrl(src)) {
    url = src
  } else if (baseContext.source === 'github') {
    let newSrc = src.replace('./', '')

    if (newSrc.startsWith('/')) {
      newSrc = newSrc.slice(1)
    }

    if (baseContext.linked) {
      if (baseContext.linked.path) {
        const dir = path.dirname(baseContext.linked.path)
        if (!dir.startsWith('.')) {
          newSrc = `${dir}/${newSrc}`
        }
      }
      url = `/docs/api/github/content?owner=${baseContext.linked.owner}&repo=${baseContext.linked.repo}&path=${newSrc}&branch=${baseContext.linked.branch}`
    } else {
      if (baseContext.file) {
        const dir = path.dirname(baseContext.file)
        if (!dir.startsWith('.')) {
          newSrc = `${dir}/${newSrc}`
        }
      }
      url = `/docs/api/github/content?owner=${baseContext.owner}&repo=${baseContext.repo}&path=${newSrc}&branch=${baseContext.branch}`
    }
  } else if (src.startsWith('/')) {
    url = src
  } else if (src.startsWith('./')) {
    let newSrc = src.replace('./', '')
    if (baseContext.file) {
      const dir = path.dirname(baseContext.file)
      newSrc = `/${dir}/${newSrc}`
    }
    url = newSrc
  } else {
    url = '/image-not-found.png'
  }
  return url
}

function ImageComponent({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false)
  const [zoomable, setZoomable] = useState(false)
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  const handleClickOpen = () => {
    if (zoomable) {
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleImageLoaded = (event: any) => {
    const { naturalWidth, naturalHeight } = event.target
    setImageSize({ width: naturalWidth, height: naturalHeight })
    setZoomable(naturalWidth > 300 || naturalHeight > 300)
  }

  return (
    <>
      <div
        className={`relative mx-auto my-4 flex justify-center items-center cursor-pointer ${
          imageSize.height > 300 ? 'h-[300px]' : `h-[${imageSize.height}px]`
        }`}
        onClick={handleClickOpen}
      >
        <NextImage
          sizes="100vw"
          height={imageSize.height}
          width={imageSize.width}
          src={src}
          alt={alt || ''}
          onLoad={handleImageLoaded}
          unoptimized
          className="object-contain max-w-full max-h-full"
        />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex flex-col items-center justify-center">
          <DialogHeader className="flex w-full justify-end">
            <DialogTitle className="hidden">{alt}</DialogTitle>
            <DialogClose />
          </DialogHeader>

          <div className="flex items-center justify-center">
            <NextImage
              height={imageSize.height}
              width={imageSize.width}
              src={src}
              alt={alt || ''}
              unoptimized
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function Image({ props, baseContext }: { props: any; baseContext: ContentItem }) {
  let { src } = props

  src = getAPIUrl(src, baseContext)

  return <ImageComponent src={src} alt={props.alt} />
}
