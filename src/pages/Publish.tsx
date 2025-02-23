"use client"
import { useState } from 'react'
import { Page } from '@/payload-types'
import { getTableOfContents } from '../utils'
import { SlideShow, Printable } from '../components'
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { cn } from '@/lib/utils/cn'
interface WebsiteSectionProps {
  hero: any
  page: Page
  type: 'print' | 'slideshow'
  orientation: 'portrait' | 'landscape' | 'flow'
  [key: string]: any
}

export function Publish({
  type = 'slideshow',
  orientation: initialOrientation = 'landscape',
  ...args
}: WebsiteSectionProps) {
  const page = args.page

  const [orientation, setOrientation] = useState<'portrait' | 'landscape' | 'flow'>(initialOrientation)


  console.log('args', args)

  const { contentWithIds, tableOfContents } = getTableOfContents(page)


  if (type === 'slideshow') {
    return (
      <div className="flex fixed flex-col w-screen h-screen max-h-screen overflow-auto overscroll-contain">
        {/* <Header isMenuOpen={true} logoLight={logoLight} logoDark={logoDark} /> */}
        {/* <RenderHero {...args.hero} /> */}

        {/* <MainPageSection edit={args.edit} pageId={args.page.id} tableOfContents={tableOfContents} relatedContent={args.relatedContent}> */}

        <SlideShow blocks={contentWithIds} hero={args.hero} title={args.page.title} />
        {/* <RenderBlocks blocks={contentWithIds} />
</VerticalSlider> */}
        {/* </MainPageSection> */}
      </div>
    )
  } else if (type === 'print') {
    return (
      <>
      <Controls layout={orientation} changeLayout={setOrientation}/>
      
        <Printable page={args.page} layout={orientation} />
        </>
      
    )
  } 
}

type ControlProps = {
  layout: 'portrait' | 'landscape' | 'flow'
  changeLayout?: (layout: 'portrait' | 'landscape' | 'flow') => void
}

const Controls: React.FC<ControlProps> = ({ changeLayout, layout = 'landscape'  }) => {


  const handlePrint = async () => {
    if (layout === 'flow') {
      generatePDF('printable-content')
    } else {
    await new Promise((resolve) => setTimeout(resolve, 300))
    window.print()
    }
  }

  const changeLayoutHandler = (layout: 'portrait' | 'landscape' | 'flow') => {
    changeLayout && changeLayout(layout)
  }

  const generatePDF = async (elementToPrintId: string) => {
    console.log('elementToPrintId', elementToPrintId)
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

  return (
    <div
      className={cn(
        'fixed right-2 z-20 top-20 space-y-6 print:hidden',
      )}
    >
      <div className="flex flex-row-reverse z-20 min-w-70 gap-4">
        <nav className="z-20 flex grow-0 justify-end gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg dark:border-slate-600/60 dark:bg-slate-800/50 min-h-[auto] min-w-[54px] flex-col rounded-lg border">
          {/* Sidebar items with onClick handlers */}
          <a
            onClick={handlePrint}
            className="flex aspect-square min-h-[25px] w-12 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700  dark:text-gray-400 hover:text-accent"
          >
            {/* <!-- HeroIcon - Home Modern --> */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
              <path d="M96 160l-32 0 0-96C64 28.7 92.7 0 128 0L357.5 0c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 18.7 28.3 18.7 45.3l0 69.5-32 0 0-69.5c0-8.5-3.4-16.6-9.4-22.6L380.1 41.4c-6-6-14.1-9.4-22.6-9.4L128 32c-17.7 0-32 14.3-32 32l0 96zm352 64L64 224c-17.7 0-32 14.3-32 32l0 128 32 0 0-32c0-17.7 14.3-32 32-32l320 0c17.7 0 32 14.3 32 32l0 32 32 0 0-128c0-17.7-14.3-32-32-32zm0 192l0 64c0 17.7-14.3 32-32 32L96 512c-17.7 0-32-14.3-32-32l0-64-32 0c-17.7 0-32-14.3-32-32L0 256c0-35.3 28.7-64 64-64l384 0c35.3 0 64 28.7 64 64l0 128c0 17.7-14.3 32-32 32l-32 0zM96 352l0 128 320 0 0-128L96 352zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
            </svg>
            <small className="text-xs font-medium">Print</small>
          </a>
          <div className="flex-grow border-t border-gray-200 dark:border-slate-600/60"></div>
          <a
            onClick={() => changeLayoutHandler('portrait')}
            className={cn("flex aspect-square min-h-[25px] w-12 flex-col items-center justify-center gap-1 rounded-md p-1.5 hover:text-accent", layout === 'portrait' ? 'text-accent' : 'hover:text-accent')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor"><path d="M352 448c0 17.7-14.3 32-32 32L64 480c-17.7 0-32-14.3-32-32L32 64c0-17.7 14.3-32 32-32l256 0c17.7 0 32 14.3 32 32l0 384zM384 64c0-35.3-28.7-64-64-64L64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-384z"/></svg>
            <small className="text-xs">Portrait</small>
          </a>
          <a
            onClick={() => changeLayoutHandler('landscape')}
            className={cn("flex aspect-square min-h-[25px] w-12 flex-col items-center justify-center gap-1 rounded-md p-1.5 hover:text-accent", layout === 'landscape' ? 'text-accent' : 'hover:text-accent')}
          >
            {/* <!-- HeroIcon - Home Modern --> */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor"><path d="M576 96c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32L64 416c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l512 0zM64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l512 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64z"/></svg>
            <small className="text-xs">Landscape</small>
          </a>
          <a
            onClick={() => changeLayoutHandler('flow')}
            className={cn("flex aspect-square min-h-[25px] w-12 flex-col items-center justify-center gap-1 rounded-md p-1.5 hover:text-accent", layout === 'flow' ? 'text-accent' : 'hover:text-accent')}
          >
            {/* <!-- HeroIcon - Home Modern --> */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor"><path d="M266.2 4.7C273 1.6 280.5 0 288 0s15 1.6 21.8 4.7l217.4 97.5c10.2 4.6 16.8 14.7 16.8 25.9s-6.6 21.3-16.8 25.9L309.8 251.3c-6.9 3.1-14.3 4.7-21.8 4.7s-15-1.6-21.8-4.7L48.8 153.9C38.6 149.3 32 139.2 32 128s6.6-21.3 16.8-25.9L266.2 4.7zM288 32c-3 0-6 .6-8.8 1.9L69.3 128l210 94.1c2.8 1.2 5.7 1.9 8.8 1.9s6-.6 8.8-1.9l210-94.1-210-94.1C294 32.6 291 32 288 32zM48.8 358.1l45.9-20.6 39.1 17.5L69.3 384l210 94.1c2.8 1.2 5.7 1.9 8.8 1.9s6-.6 8.8-1.9l210-94.1-64.5-28.9 39.1-17.5 45.9 20.6c10.2 4.6 16.8 14.7 16.8 25.9s-6.6 21.3-16.8 25.9L309.8 507.3c-6.9 3.1-14.3 4.7-21.8 4.7s-15-1.6-21.8-4.7L48.8 409.9C38.6 405.3 32 395.2 32 384s6.6-21.3 16.8-25.9zM94.7 209.5l39.1 17.5L69.3 256l210 94.1c2.8 1.2 5.7 1.9 8.8 1.9s6-.6 8.8-1.9l210-94.1-64.5-28.9 39.1-17.5 45.9 20.6c10.2 4.6 16.8 14.7 16.8 25.9s-6.6 21.3-16.8 25.9L309.8 379.3c-6.9 3.1-14.3 4.7-21.8 4.7s-15-1.6-21.8-4.7L48.8 281.9C38.6 277.3 32 267.2 32 256s6.6-21.3 16.8-25.9l45.9-20.6z"/></svg>            
            <small className="text-xs">Continuous</small>
          </a>
        </nav>
      </div>
    </div>
  )
}


