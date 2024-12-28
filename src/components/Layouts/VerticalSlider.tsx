'use client'

import React, { useState, useEffect, useRef } from 'react'
import { CircleChevronDown } from 'lucide-react'

export function VerticalSlider({ sections }: { sections: any }) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id)
  const observerRefs = useRef<IntersectionObserver[]>([])

  useEffect(() => {
    const currentObservers: IntersectionObserver[] = []

    sections.forEach((section: any) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(section.id)
            }
          })
        },
        { threshold: 0.5 },
      )

      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
      currentObservers.push(observer)
    })

    observerRefs.current = currentObservers

    return () => {
      currentObservers.forEach((observer) => observer.disconnect())
    }
  }, [sections])

  const handleSliderClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const handleScrollDown = () => {
    const currentIndex = sections.findIndex((section: any) => section.id === activeSection)
    const nextSection = sections[currentIndex + 1] || sections[0] // loop back to first section
    handleSliderClick(nextSection.id)
  }

  return (
    <div className="flex h-screen relative">
      {/* Vertical Slider */}
      <div className="fixed left-0 top-0 flex h-screen w-12 flex-col items-center justify-center bg-gray-100">
        {sections.map((section: any) => (
          <button
            key={section.id}
            className={`group relative my-2 h-16 w-2 cursor-pointer rounded-full transition-all duration-300 ${
              activeSection === section.id ? section.color : 'bg-gray-300'
            }`}
            onClick={() => handleSliderClick(section.id)}
          >
            <span className="absolute left-full ml-2 hidden -translate-x-2 rotate-90 whitespace-nowrap opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 lg:block">
              {section.title}
            </span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="ml-12 flex-1 overflow-y-auto snap-y snap-mandatory">
        {sections.map((section: any) => (
          <div
            key={section.id}
            id={section.id}
            className={`flex h-screen items-center justify-center snap-always snap-start text-4xl text-white ${section.color}`}
          >
            {section.title}
          </div>
        ))}
      </div>

      {/* Down Arrow */}
      <button
        className="absolute bottom-4 left-4 text-3xl text-primary transition-all duration-300 hover:scale-110"
        onClick={handleScrollDown}
      >
        <CircleChevronDown />
      </button>
    </div>
  )
}
