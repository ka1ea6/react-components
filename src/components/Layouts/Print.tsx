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

interface PrintableProps {
  page: Page
  layout?: 'portrait' | 'landscape'
}

export const Printable: React.FC<PrintableProps> = ({ page, layout = 'portrait' }) => {
  const { contentWithIds } = getTableOfContents(page)
  const previewContainer = useRef<HTMLDivElement>(null)
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
    pagedRef.current
      .preview(
        document.getElementById('printable-content')!.innerHTML,
        ['./print.css'],
        previewContainer.current,
      )
      .then((result) => setPageCount(result.pageCount))
      .catch((error) => console.error('Paged.js error:', error))
  }, [])

  useEffect(() => {
    pagedRef.current = new Previewer()
    updatePagedPreview()
  }, [updatePagedPreview])

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
    <div className={`pagedjs-container`}>
      <div className="fixed top-20 right-4 z-[1000] print:hidden">
        <Button onClick={handlePrint} variant="outline" className="px-5 py-2 text-sm font-semibold">
          Print to PDF
        </Button>
      </div>

      {/* <div className="relative w-full h-screen print:page-break-before">
        
        <HeadingImage
          image={Image1}
          title="Reply Cortex"
        />
      </div> */}

      {/* <TitleSlide hero={page.hero} title={page.title} /> */}

      <div id="printable-content" className="pagedjs-content" style={{ display: 'none' }}>
        {/* {page.hero && <RenderHero {...page.hero} />} */}
          {blocksWithHero.map((block, index) => (
            <>
              {index === 0 ? (
                <section
                  key={index}
                  className="title-page"
                >
                  <TitleSlide hero={page.hero} title={page.title} />
                </section>
              ) : (
                <section
                  key={index}
                  className="section"
                >
                  <HeaderTop title={block.blockName} />
                  <RenderBlocks blocks={[block]} />
                  {/* <footer className="pagedjs-footer flex justify-between items-center p-4 border-t border-gray-300 shadow-md bg-white dark:bg-gray-900 print:fixed print:bottom-0 print:left-0 print:w-full"> */}
                    <footer className="pagedjs-footer"> 
                    <Footer />
                  </footer>
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
