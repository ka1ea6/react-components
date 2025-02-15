'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Page, Media, ContentBlock } from '@/payload-types'
import { RenderBlocks } from '../Blocks'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Header } from '../HeaderFooter'
import logoDark from '../../images/cortex-reply-dark.png'
import logoLight from '../../images/cortex-reply-light.png'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'pagedjs'
import Image1 from '../../images/hero/hero-3.jpg'
import ReplyLogo from '../../images/cortex-reply-light.png'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { RichText } from '../Payload'
import { Footer, HeaderTop, TitleSlide } from './OutputHeaderFooter'
export const SlideShow: React.FC<{
  title?: string
  hero: Page['hero']
  blocks: Page['layout'][0][]
}> = (props) => {
  const [activeSection, setActiveSection] = useState(0)

  const { blocks, hero } = props
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

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

  const blocksWithHero = [emptyContentBlock, ...blocks]

  const handleSliderClick = (sectionId: number) => {
    // console.log('sectionId', sectionId)
    // console.log('block', blocks[sectionId])
    setActiveSection(sectionId)
  }

  const goToNextSlide = () => {
    setActiveSection((prev) => (prev + 1) % blocksWithHero.length)
  }

  const goToPreviousSlide = () => {
    setActiveSection((prev) => (prev - 1 + blocksWithHero.length) % blocksWithHero.length)
  }

  interface DebounceFunction {
    (...args: any[]): void
  }

  const debounce = (func: (...args: any[]) => void, wait: number): DebounceFunction => {
    let timeout: ReturnType<typeof setTimeout>
    return (...args: any[]) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  }

  interface WheelEventWithDelta extends WheelEvent {
    deltaY: number
  }

  const handleWheel = useCallback(
    debounce((event: WheelEventWithDelta) => {
      if (event.deltaY > 0) {
        goToNextSlide()
      } else {
        goToPreviousSlide()
      }
    }, 300),
    [],
  )

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      goToNextSlide()
    } else if (event.key === 'ArrowUp') {
      goToPreviousSlide()
    }
  }

  useEffect(() => {
    AOS.init({ duration: 1000 })
    window.addEventListener('wheel', handleWheel)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  

  return (
    <div className={`flex flex-col min-h-screen relative overflow-hidden`}>
      {/* Header */}
      {/* <Header
        isMenuOpen={true}
        logoLight={logoLight}
        logoDark={logoDark}
      /> */}

      {/* Vertical Slider */}

      <div className="fixed left-0 top-0 flex h-screen w-9 z-10 flex-col items-center justify-center bg-gray-100">
        {hasBlocks &&
          blocksWithHero.map((section: any, id: number) => (
            <button
              key={section.id}
              className={`group relative flex items-center justify-center my-2 h-16 w-4 rounded-full transition-all hover:bg-accent duration-300 ${
                activeSection === id ? 'bg-accent' : 'bg-gray-300'
              }`}
              onClick={() => handleSliderClick(id)}
            >
              {/* Label */}
              <span className="absolute ml-7 left-full text-left transform -translate-y-1/2 translate-x-0 rotate-90 origin-left whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                {section.blockName}
              </span>
            </button>
          ))}
      </div>

      {/* Main Content */}
      <AnimatePresence>
        {blocksWithHero.map((block, index) => (
          <div id={`slide-${index}`} key={index} className="print-section">
            <div
              className={`absolute flex items-center justify-center transition-opacity duration-1000 
          ${index === activeSection ? 'opacity-100' : 'opacity-0'} 
          w-full h-full bg-cover bg-center`}
            >
              {index === 0 ? (
                <TitleSlide hero={hero} title={props.title} />
              ) : (
                <>
                  {block.blockName && <HeaderTop title={block.blockName} />}
                  <RenderBlocks blocks={[block]} fill />
                  <Footer />
                </>
              )}
            </div>
          </div>
        ))}
      </AnimatePresence>

      {/* Down Arrow */}
      <button
        className="absolute bottom-4 left-1 z-20 text-3xl text-primary transition-all duration-300 hover:scale-110"
        onClick={goToNextSlide}
      >
        <ScrollDownIcon />
      </button>

      {/* Footer */}
    </div>
  )
}

const ScrollDownIcon: React.FC = () => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      className={cn('w-fit min-h-[50px] min-w-[20px] p-1 border-2 rounded-full', 'border-gray-800')}
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, 25], opacity: [1, 0] }}
        transition={{
          duration: 1,
          ease: 'easeOut',
          repeat: Infinity,
          repeatDelay: 1,
        }}
        className={cn('w-[12px] h-[12px] rounded-full', 'bg-gray-800')}
      />
    </motion.div>
  </AnimatePresence>
)
