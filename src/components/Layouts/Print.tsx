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
import { Footer, HeaderTop, TitleSlide } from './OutputHeaderFooter'
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { cn } from '@/lib/utils'
interface PrintableProps {
  page: Page
  layout?: 'portrait' | 'landscape' | 'flow'
}

export const Printable: React.FC<PrintableProps> = ({ page, layout = 'portrait' }) => {
  if (layout === 'flow') {
    return <FlowPrintable page={page} layout={layout} />
  } else {
    return <PagePrintable page={page} layout={layout} />
  }
  
}




const FlowPrintable: React.FC<PrintableProps> = ({ page, layout = 'portrait'  }) => {
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

  const handlePrint = async () => {
    generatePDF('printable-content')
  }

  const generatePDF = async (elementToPrintId: string) => {

    const root =  document.getElementById(elementToPrintId);

    if (!root) {
      throw new Error(`Element with id ${elementToPrintId} not found`);
    }

    const customCanvas = document.createElement('canvas');
    const scale = window.devicePixelRatio;
    customCanvas.width = Math.max(root.clientWidth || 0) * scale;
    customCanvas.height = Math.max(root.clientHeight || 0) * scale + 100;
    const ctx = customCanvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get 2D context');
    }
    const originalDrawImage = ctx.drawImage;
    
    const images: { [key: string]: HTMLImageElement } = Array.from(root.getElementsByTagName('img')).reduce(
      (map, img) => {
        map[img.src] = img;
        return map;
      },
      {} as { [key: string]: HTMLImageElement },
    );
    
    ctx.drawImage = function (...args: any[]): void {
      let [image, sx, sy, sw, sh, dx, dy, dw, dh] = args;
      if (image instanceof HTMLImageElement) {
        const objectFit = images[image.src].style.objectFit || 'fill'; // Default to 'fill'
        const objectPosition = images[image.src].style.objectPosition || 'center center'; // Default to 'center center'
        sh = image.height;
        sw = image.width;
    
        const sourceRatio = sw / sh;
        const destinationRatio = dw / dh;
    
        // Parse objectPosition to determine alignment
        let [horizontalPosition, verticalPosition] = objectPosition.split(' ');
        if (!verticalPosition) {
          // If only one value is provided, use it for both directions
          verticalPosition = horizontalPosition;
        }
    
        // Adjust source dimensions and positions based on object-fit
        switch (objectFit) {
          case 'cover':
            if (sourceRatio > destinationRatio) {
              const newSw = sh * destinationRatio;
              let offsetX = (sw - newSw) / 2; // Default center
              if (horizontalPosition === 'left') offsetX = 0;
              if (horizontalPosition === 'right') offsetX = sw - newSw;
              sx += offsetX;
              sw = newSw;
            } else {
              const newSh = sw / destinationRatio;
              let offsetY = (sh - newSh) / 2; // Default center
              if (verticalPosition === 'top') offsetY = 0;
              if (verticalPosition === 'bottom') offsetY = sh - newSh;
              sy += offsetY;
              sh = newSh;
            }
            break;
          case 'contain':
            if (sourceRatio > destinationRatio) {
              const newDh = dw / sourceRatio;
              let offsetY = (dh - newDh) / 2; // Default center
              if (verticalPosition === 'top') offsetY = 0;
              if (verticalPosition === 'bottom') offsetY = dh - newDh;
              dy += offsetY;
              dh = newDh;
            } else {
              const newDw = dh * sourceRatio;
              let offsetX = (dw - newDw) / 2; // Default center
              if (horizontalPosition === 'left') offsetX = 0;
              if (horizontalPosition === 'right') offsetX = dw - newDw;
              dx += offsetX;
              dw = newDw;
            }
            break;
          case 'fill':
            // No adjustments needed for object-position
            break;
          // Implement other object-fit values if needed
        }
      }
    
      return originalDrawImage.call(ctx, image, sx, sy, sw, sh, dx, dy, dw, dh);
    };

    const element = document.getElementById(elementToPrintId);
    if (!element) {
      throw new Error(`Element with id ${elementToPrintId} not found`);
    }
    var w = customCanvas.width
    var h = customCanvas.height
    // var w = Math.max(element.clientWidth || 0);
    const canvas = await html2canvas(element, { canvas: customCanvas, windowHeight: h, windowWidth: w, scale: window.devicePixelRatio });
    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      // orientation: "landscape",
      // unit: "mm",
      // format: [297, h],
    });
    const imgProperties = pdf.getImageProperties(data);
    
    const pdfWidth = 297;
    const pdfHeight = pdfWidth * (imgProperties.height / imgProperties.width);
    
    const pdfRightSized = new jsPDF({
      // orientation: "landscape",
      unit: "mm",
      format: [pdfWidth, pdfHeight],
    });
    
    pdfRightSized.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
  //   html2canvas(document.getElementById(elementToPrintId), { canvas: customCanvas, windowHeight: h *2, windowWidth: w *2, scale: 2}).then(canvas => {
  //     document.body.appendChild(canvas)
  // });
    pdfRightSized.save("print.pdf");
  };

  const blocksWithHero = [emptyContentBlock, ...contentWithIds]
  return (
    <div className='w-[297mm]'>
      <div className="fixed top-20 right-4 z-[1000] print:hidden">
        <Button onClick={handlePrint} variant="outline" className="px-5 py-2 text-sm font-semibold">
          Print to PDF
        </Button>
      </div>
      
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
                  className="normal-page"
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


const PagePrintable: React.FC<PrintableProps> = ({ page, layout = 'portrait'  }) => {
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

  

  useEffect(() => {
    // if (!rendered && children) {

    const timerId = setTimeout(() => { // wait for a bit!
      const paged = new Previewer();
      if (!contentContainer.current) return

      const contentMdx = `${contentContainer.current.innerHTML}`;

      // Clear the content of previewContainer
      if (previewContainer.current) {
        previewContainer.current.innerHTML = '';
      }
      paged.preview(contentMdx, ['./print.css', layout === 'landscape' ? './landscape.css' : './portrait.css'], previewContainer.current).then((result: { pageCount: React.SetStateAction<number> }) => setPageCount(result.pageCount))
      .catch((error: any) => console.error('Paged.js error:', error))
  

        // Delay the removal of the second instance of .pagedjs_pages
        // setTimeout(() => {
        //   const pagedPages = previewContainer.current.getElementsByClassName('pagedjs_pages');
        //   if (pagedPages.length > 1) {
        //     pagedPages[0].remove();
        //   }
        // }, 0);
      }, 50);
  
      // Clean up the timer to avoid memory leaks
      return () => clearTimeout(timerId);
    }, [page, layout]);


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

  const handlePrint = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    window.print()
  }

  return (
    <div>
      <div className="fixed top-20 right-4 z-[1000] print:hidden">
        <Button onClick={handlePrint} variant="outline" className="px-5 py-2 text-sm font-semibold">
          Print to PDF
        </Button>
      </div>

      <div id="printable-content" ref={contentContainer} style={{ display: 'none' }}>
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
                  className={cn("normal-page h-full", block.theme?.settings?.theme === 'dark' ? 'dark bg-background' : 'light')}
                >
                  {block.blockName && <HeaderTop title={block.blockName} />}
                  <RenderBlocks blocks={[block]} />
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
