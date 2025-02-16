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
    console.log('customCanvas.width', customCanvas.width)
    console.log('customCanvas.height', customCanvas.height)
    const ctx = customCanvas.getContext('2d');
    const originalDrawImage = ctx.drawImage;
    
    const images: { [key: string]: HTMLImageElement } = Array.from(root.getElementsByTagName('img')).reduce(
      (map, img) => {
        map[img.src] = img;
        return map;
      },
      {} as { [key: string]: HTMLImageElement },
    );
    
    ctx.drawImage = function (image, sx, sy, sw, sh, dx, dy, dw, dh) {
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
    
    // const canvas = await html2canvas(root, {
    //   canvas: customCanvas,
    //   windowHeight: 1080,
    //   windowWidth: 1920,
    // });




    const element = document.getElementById(elementToPrintId);
    if (!element) {
      throw new Error(`Element with id ${elementToPrintId} not found`);
    }
    var w = customCanvas.width
    var h = customCanvas.height
    // var w = Math.max(element.clientWidth || 0);
    console.log('h/w', h, w)
    console.log('element', element.clientHeight, element.clientWidth)
    const canvas = await html2canvas(element, { canvas: customCanvas, windowHeight: h *2, windowWidth: w*2, scale: 2 });
    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      // orientation: "landscape",
      // unit: "mm",
      // format: [297, h],
    });
    const imgProperties = pdf.getImageProperties(data);
    // const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfWidth = 297;
    const pdfHeight = pdfWidth * (imgProperties.height / imgProperties.width);
    // const pdfHeight = (customCanvas.height * pdfWidth) / customCanvas.width ;
    console.log('pdfWidth', pdfWidth)
    console.log('pdfHeight', pdfHeight)
    console.log('imgProperties', imgProperties)
    const pdfRightSized = new jsPDF({
      // orientation: "landscape",
      unit: "mm",
      format: [pdfWidth, pdfHeight],
    });
    console.log('height', pdfRightSized.internal.pageSize.getHeight())
    
    pdfRightSized.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    html2canvas(document.getElementById(elementToPrintId), { canvas: customCanvas, windowHeight: h *2, windowWidth: w *2, scale: 2}).then(canvas => {
      document.body.appendChild(canvas)
  });
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

  // useEffect(() => {
  //   const style = document.createElement('style')
  //   style.textContent = `
  //     @media print {
  //         @page {
  //           size: ${layout === 'landscape' ? 'A4 landscape' : 'A4 portrait'} !important;
  //           margin: 10mm 15mm;
  //           bleed: 6mm;
  //           marks: crop cross;
  //         }

  //         body,
  //         .pagedjs-container {
  //           margin: 0;
  //           padding: 0;
  //         }

  //         .pagedjs-content {
  //           margin-top: 50mm;
  //         }

  //         .pagedjs-header {
  //           position: running(header);
  //           padding: 5mm 0;
  //           page-break-after: auto;
  //         }

  //         .pagedjs-footer {
  //           position: running(footer);
  //           text-align: center;
  //           font-size: 12px;
  //           padding: 5mm 0;
  //           border-top: 1px solid #ccc;
  //         }

  //         .pagedjs-section {
  //           break-inside: avoid;
  //           page-break-inside: avoid;
  //           page-break-after: auto;
  //           display: flex;
  //           flex-direction: column;
  //           justify-content: space-between;
  //           margin: 10px 0;
  //         }

  //         table,
  //         figure,
  //         h1,
  //         h2,
  //         h3,
  //         h4,
  //         h5 {
  //           page-break-inside: avoid;
  //         }

  //         h1:first-of-type {
  //           break-before: avoid;
  //         }

  //         .pagedjs-title-page {
  //           break-after: page;
  //           text-align: center;
  //           padding: 50px;
  //         }
  //       }
  //     `
  //   document.head.appendChild(style)
  //   return () => document.head.removeChild(style)
  // }, [layout])

  const updatePagedPreview = useCallback(() => {
    if (!previewContainer.current) return
    // Clear the content of previewContainer
    if (previewContainer.current) {
      previewContainer.current.innerHTML = '';
    }
    pagedRef.current
      .preview(
        document.getElementById('printable-content')!.innerHTML,
        ['./print.css'],
        previewContainer.current,
      )
      .then((result) => setPageCount(result.pageCount))
      .catch((error) => console.error('Paged.js error:', error))
  }, [])

  // useEffect(() => {
  //   pagedRef.current = new Previewer()
  //   updatePagedPreview()
  // }, [updatePagedPreview])

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
      paged.preview(contentMdx, ['/print.css'], previewContainer.current).then((result) => setPageCount(result.pageCount))
      .catch((error) => console.error('Paged.js error:', error))
  

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
      <div className="fixed top-40 right-4 z-[1000] print:hidden">
        <Button onClick={updatePagedPreview} variant="outline" className="px-5 py-2 text-sm font-semibold">
          Refresh
        </Button>
      </div>

      {/* <div className="relative w-full h-screen print:page-break-before">
        
        <HeadingImage
          image={Image1}
          title="Reply Cortex"
        />
      </div> */}

      {/* <TitleSlide hero={page.hero} title={page.title} /> */}

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
                  className="normal-page"
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


// const Footer: React.FC = () => {
//   const { theme } = useTheme();

//   return (
//     <footer className="pagedjs-footer flex justify-between items-center p-4 border-t border-gray-300 shadow-md bg-white dark:bg-gray-900 print:fixed print:bottom-0 print:left-0 print:w-full">
//       <div className="flex items-center space-x-4">
//         <Image src={theme === 'dark' ? logoDark : logoLight} alt="Reply Logo" width={35} height={35} />
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100"> Reply</h3>
//           <p className="text-sm text-gray-600 dark:text-gray-400">Technology, done right</p>
//         </div>
//       </div>

//       <nav className="flex space-x-6 text-sm">
//         <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Privacy Policy</a>
//         <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Terms of Service</a>
//         <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Support</a>
//       </nav>
//       <div className="text-right">
//         <p className="text-sm text-gray-600 dark:text-gray-400">&copy; {new Date().getFullYear()} Reply</p>
//         <a href="https://airwalkreply.com" className="text-blue-600 hover:underline dark:text-blue-400">
//           airwalkreply.com
//         </a>
//       </div>
//     </footer>
//   );
// };
