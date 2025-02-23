'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Previewer } from 'pagedjs'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import logoDark from '../../images/cortex-reply-dark.png'
import logoLight from '../../images/cortex-reply-light.png'
import { Header } from '../HeaderFooter'
import { RenderHero } from '@/components/Heros/RenderHero'
import { RenderBlocks } from '@/components/Blocks/RenderBlocks'
import { Page, ContentBlock } from '@/payload-types'
import { getTableOfContents } from '../../utils'
import Image1 from '../../images/hero/hero-3.jpg'
import { HeadingImage } from '../Blocks'
import { HeaderTop, TitleSlide } from './OutputHeaderFooter'

import { cn } from '@/lib/utils'
interface PrintableProps {
  page: Page
  layout?: 'portrait' | 'landscape' | 'flow'
}

function xToPx(x: string) {
  var div = document.createElement('div');
  div.style.display = 'block';
  div.style.height = x;
  document.body.appendChild(div);
  var px = parseFloat(window.getComputedStyle(div, null).height);
  if (div.parentNode) {
    div.parentNode.removeChild(div);
  }
  // round down to the nearest whole number

  return Math.floor(px);
}


export const Printable: React.FC<PrintableProps> = ({ page, layout = 'portrait' }) => {
  if (layout === 'flow') {
    return <FlowPrintable page={page} layout={layout} />
  } else {
    return <PagePrintable page={page} layout={layout} />
  }
  
}

export const FlowPrintable: React.FC<PrintableProps> = ({ page, layout = 'portrait'  }) => {
  const { contentWithIds } = getTableOfContents(page)
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
  return (
    <div className='w-[297mm]'>      
      <div id="printable-content" >
        {/* {page.hero && <RenderHero {...page.hero} />} */}
          {blocksWithHero.map((block, index) => (
            <>
              {index === 0 ? (
                <section
                  key={index}
                  className="title-page w-full h-full"
                >
                  <TitleSlide hero={page.hero} title={page.title} />
                </section>
              ) : (
                <section
                  key={index}
                  className="normal-page overflow-hidden"
                >
                  {block.blockName && <HeaderTop title={block.blockName} />}
                  <RenderBlocks blocks={[block]} fill/>
                  {/* <footer className="pagedjs-footer flex justify-between items-center p-4 border-t border-gray-300 shadow-md bg-white dark:bg-gray-900 print:fixed print:bottom-0 print:left-0 print:w-full"> */}
                    {/* <footer className="pagedjs-footer"> 
                    <Footer />
                  </footer> */}
                </section>
              )}
            </>
          ))}
          
          <section className='normal-page'>
            <div
        className="w-full py-2 px-8 flex justify-between items-center
        dark bg-background text-primary"
      >
        <div className="flex px-6 items-center space-x-2">
          <img src={logoDark.src} alt="Cortex Reply Logo" className="h-8" />
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
  )
}


export const PagePrintable: React.FC<PrintableProps> = ({ page, layout = 'portrait'  }) => {
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

  // const updatePagedPreview = useCallback(() => {
  //   if (!previewContainer.current) return
  //   // Clear the content of previewContainer
  //   if (previewContainer.current) {
  //     previewContainer.current.innerHTML = '';
  //   }
  //   pagedRef.current
  //     .preview(
  //       document.getElementById('printable-content')!.innerHTML,
  //       ['./print.css', layout === 'landscape' ? './landscape.css' : './portrait.css'],
  //       previewContainer.current,
  //     )
  //     .then((result: { pageCount: React.SetStateAction<number> }) => setPageCount(result.pageCount))
  //     .catch((error: any) => console.error('Paged.js error:', error))
  // }, [])



  // useEffect(() => {
  //   const style = document.createElement('style');
  //   style.textContent = `@page { size: 445.5mm 297mm ${layout}; margin: 0mm; }`;
  //   document.head.appendChild(style);
  //   return () => document.head.removeChild(style);
  // }, [layout]);
  

  // useEffect(() => {
  //   const timerId = setTimeout(() => { // wait for a bit!
  //     const paged = new Previewer();
  //     if (!contentContainer.current) return
  //     const contentMdx = `${contentContainer.current.innerHTML}`;
  //     // Clear the content of previewContainer
  //     if (previewContainer.current) {
  //       previewContainer.current.innerHTML = '';
  //     }
  //     paged.preview(contentMdx, ['./print.css', layout === 'landscape' ? './landscape.css' : './portrait.css'], previewContainer.current).then((result: { pageCount: React.SetStateAction<number> }) => setPageCount(result.pageCount))
  //     .catch((error: any) => console.error('Paged.js error:', error))
  //     }, 50);
  
  //     // Clean up the timer to avoid memory leaks
  //     return () => clearTimeout(timerId);
  //   }, [page, layout]);

const updatePagedPreview = useCallback(() => {
    if (!previewContainer.current) return;
    if (previewContainer.current) {
             previewContainer.current.innerHTML = '';
            }
    pagedRef.current.preview(document.getElementById('printable-content')!.innerHTML, ['./print.css', layout === 'landscape' ? './landscape.css' : './portrait.css'], previewContainer.current)
      .then((result: { pageCount: number }) => setPageCount(result.pageCount))
      .catch((error: unknown) => console.error('Paged.js error:', error));
  }, []);

  useEffect(() => {
    pagedRef.current = new Previewer();
    updatePagedPreview();
  }, [updatePagedPreview, layout]);


  // useEffect(() => {
  //   const style = document.createElement('style');
  //   style.textContent = `@page { size: A4 ${layout}; margin: 20mm; }`;
  //   document.head.appendChild(style);
  //   return () => {
  //     document.head.removeChild(style);
  //   };
  // }, [layout]);

  // const updatePagedPreview = useCallback(() => {
  //   if (!previewContainer.current) return;
  //   pagedRef.current.preview(document.getElementById('printable-content')!.innerHTML, [], previewContainer.current)
  //     .then((result: { pageCount: React.SetStateAction<number>; }) => setPageCount(result.pageCount))
  //     .catch((error: any) => console.error('Paged.js error:', error));
  // }, []);

  // useEffect(() => {
  //   pagedRef.current = new Previewer();
  //   updatePagedPreview();
  // }, [updatePagedPreview]);



  return (
    <div className={`pagedjs-container`}>
      <div id="printable-content" ref={contentContainer} style={{ display: 'none' }} className="pagedjs-content">
        {/* {page.hero && <RenderHero {...page.hero} />} */}
          {blocksWithHero.map((block, index) => (
            <>
              {index === 0 ? (
                <section
                  key={index}
                  className="pagedjs-section title-page w-full h-full"
                >
                  <TitleSlide hero={page.hero} title={page.title} />
                </section>
              ) : (
                <section
                  key={index}
                  className={cn("pagedjs-section normal-page h-[699px]",`h-[${xToPx('185mm')}px]`, block.theme?.settings?.theme === 'dark' ? 'dark' : 'light')}
                >
                  {block.blockName && <HeaderTop title={block.blockName} /> }
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
