'use client'

import React, { useEffect, useRef, useState, useCallback, use } from 'react'
import { Previewer } from 'pagedjs'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import Image, { StaticImageData } from 'next/image'
import { Header } from '../HeaderFooter'
import { RenderHero } from '@/components/Heros/RenderHero'
import { RenderBlocks } from '@/components/Blocks/RenderBlocks'
import { Page, ContentBlock } from '@/payload-types'
import { getTableOfContents } from '../../utils'
import { HeadingImage } from '../Blocks'
import { HeaderTop, TitleSlide } from './OutputHeaderFooter'

import { cn } from '@/lib/utils'
interface PrintableProps {
  page: Page
  layout?: 'portrait' | 'landscape' | 'flow'
  logoImage?: StaticImageData
}

function xToPx(x: string) {
  var div = document.createElement('div')
  div.style.display = 'block'
  div.style.height = x
  document.body.appendChild(div)
  var px = parseFloat(window.getComputedStyle(div, null).height)
  if (div.parentNode) {
    div.parentNode.removeChild(div)
  }
  // round down to the nearest whole number

  return Math.floor(px)
}

const pxTomm = (px: number): number => {
  const mmElement = document.createElement('div')
  mmElement.style.height = '1mm'
  document.body.appendChild(mmElement)
  const mmInPx = parseFloat(window.getComputedStyle(mmElement).height)
  document.body.removeChild(mmElement)
  return Math.floor(px / mmInPx)
}

export const Printable: React.FC<PrintableProps> = ({ page, layout = 'portrait', logoImage }) => {
  if (layout === 'flow') {
    return <FlowPrintable page={page} layout={layout} logoImage={logoImage} />
  } else {
    return <PagePrintable page={page} layout={layout} logoImage={logoImage} />
  }
}

export const FlowPrintable: React.FC<PrintableProps> = ({
  page,
  layout = 'portrait',
  logoImage,
}) => {
  const { contentWithIds } = getTableOfContents(page)
  const contentContainer = useRef<HTMLDivElement>(null)
  const previewContainer = useRef<HTMLDivElement>(null)
  const pagedRef = useRef(new Previewer())
  const emptyContentBlock = {
    id: '0000000000000000000',
    blockName: null,

    columns: [],
    blockType: 'content',

    theme: {
      settings: {
        theme: 'dark',
        background: 'solid',
        overlay: true,
      },
    },
  } as ContentBlock

  useEffect(() => {
    const element = document.getElementById('printable-content')
    if (element) {
      // console.log('Width: ' + element.offsetWidth + 'px')
      // console.log('Width in mm: ' + pxTomm(element.offsetWidth) + 'mm')
      // console.log('Height: ' + element.offsetHeight + 'px')
      // console.log('Height in mm: ' + pxTomm(element.offsetHeight) + 'mm')
      const style = document.createElement('style')
      style.textContent = `@page { size: ${pxTomm(element.offsetWidth)}mm ${pxTomm(element.offsetHeight)}mm ; margin: 0mm; width: ${pxTomm(element.offsetWidth)}mm }; .container : { max-width: ${pxTomm(element.offsetWidth)}mm; } .container : { max-width: 100%; }; html body * :not(#prinable-content, #printable-content *) { visibility: hidden !important; }`
      document.head.appendChild(style)
      return () => {
        document.head.removeChild(style)
      }
    }
  }, [layout])

  const updatePagedPreview = useCallback(() => {
    if (!previewContainer.current) return
    if (previewContainer.current) {
      previewContainer.current.innerHTML = ''
    }
    const element = document.getElementById('printable-content')
    if (element) {
      pagedRef.current
        .preview(
          document.getElementById('printable-content')!.innerHTML,
          [
            `@page { size: ${pxTomm(element.offsetWidth)}mm ${pxTomm(element.offsetHeight)}mm ; margin: 0mm; }; .container : { max-width: 100%; }; body { zoom: 100%;}`,
          ],
          previewContainer.current,
        )
        .catch((error: unknown) => console.error('Paged.js error:', error))
    }
  }, [layout])

  useEffect(() => {
    pagedRef.current = new Previewer()
    // updatePagedPreview();
  }, [updatePagedPreview, layout])

  const blocksWithHero = [emptyContentBlock, ...contentWithIds]
  return (
    <div>
      <div className="w-[1123px] print:w-[1123px]">
        <div id="printable-content" ref={contentContainer}>
          {/* {page.hero && <RenderHero {...page.hero} />} */}
          {blocksWithHero.map((block, index) => (
            <>
              {index === 0 ? (
                <section key={index} className="title-page w-full h-full">
                  <TitleSlide hero={page.hero} title={page.title} />
                </section>
              ) : (
                <section key={index} className="normal-page overflow-hidden">
                  {block.blockName && <HeaderTop title={block.blockName} />}
                  <RenderBlocks blocks={[block]} fill />
                  {/* <footer className="pagedjs-footer flex justify-between items-center p-4 border-t border-gray-300 shadow-md bg-white dark:bg-gray-900 print:fixed print:bottom-0 print:left-0 print:w-full"> */}
                  {/* <footer className="pagedjs-footer"> 
                    <Footer />
                  </footer> */}
                </section>
              )}
            </>
          ))}

          <section className="normal-page">
            <div
              className="w-full py-2 px-8 flex justify-between items-center
        dark bg-background text-primary"
            >
              <div className="flex px-6 items-center space-x-2">
                {logoImage && <img src={logoImage.src} alt="Cortex Reply Logo" className="h-8" />}
                <span className="pl-12 text-sm">Power up your people</span>
              </div>

              <a href="https://cortexreply.com" className="text-sm hover:underline">
                cortexreply.com
              </a>
            </div>
          </section>
        </div>

        {/* <style jsx global>{}</style> */}
      </div>
      <div ref={previewContainer} className="preview-container"></div>
    </div>
  )
}

export const PagePrintable: React.FC<PrintableProps> = ({ page, layout = 'portrait' }) => {
  const { contentWithIds } = getTableOfContents(page)
  const previewContainer = useRef<HTMLDivElement>(null)
  const contentContainer = useRef<HTMLDivElement>(null)
  const pagedRef = useRef(new Previewer())
  const [pageCount, setPageCount] = useState<number>(0)

  const emptyContentBlock = {
    id: '0000000000000000000',
    blockName: null,

    columns: [],
    blockType: 'content',

    theme: {
      settings: {
        theme: 'dark',
        background: 'solid',
        overlay: true,
      },
    },
  } as ContentBlock

  const blocksWithHero = [emptyContentBlock, ...contentWithIds]

  const updatePagedPreview = useCallback(() => {
    if (!previewContainer.current) return
    if (previewContainer.current) {
      previewContainer.current.innerHTML = ''
    }
    pagedRef.current
      .preview(
        document.getElementById('printable-content')!.innerHTML,
        ['./print.css', layout === 'landscape' ? './landscape.css' : './portrait.css'],
        previewContainer.current,
      )
      .then((result: { pageCount: number }) => setPageCount(result.pageCount))
      .catch((error: unknown) => console.error('Paged.js error:', error))
  }, [layout])

  useEffect(() => {
    pagedRef.current = new Previewer()
    updatePagedPreview()
  }, [updatePagedPreview, layout])

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `@page { size: A4 ${layout} ; margin: 0mm; };`
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className={`pagedjs-container`}>
      <div
        id="printable-content"
        ref={contentContainer}
        style={{ display: 'none' }}
        className="pagedjs-content"
      >
        {/* {page.hero && <RenderHero {...page.hero} />} */}
        {blocksWithHero.map((block, index) => (
          <>
            {index === 0 ? (
              <section key={index} className="pagedjs-section title-page w-full h-full">
                <TitleSlide hero={page.hero} title={page.title} />
              </section>
            ) : (
              <section
                key={index}
                className={cn(
                  'pagedjs-section normal-page h-[699px]',
                  `h-[${xToPx('185mm')}px]`,
                  block.theme?.settings?.theme === 'dark' ? 'dark' : 'light',
                )}
              >
                {block.blockName && <HeaderTop title={block.blockName} />}
                <RenderBlocks blocks={[block]} fill />
                {/* <footer className="pagedjs-footer flex justify-between items-center p-4 border-t border-gray-300 shadow-md bg-white dark:bg-gray-900 print:fixed print:bottom-0 print:left-0 print:w-full"> */}
                {/* <footer className="pagedjs-footer"> 
                    <Footer />
                  </footer> */}
              </section>
            )}
          </>
        ))}
      </div>

      {/* <style jsx global>{}</style> */}
      <div ref={previewContainer} className="preview-container"></div>
    </div>
  )
}
