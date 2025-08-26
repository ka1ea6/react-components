'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'motion/react'

interface AnimatedBorderProps {
  children: React.ReactNode
  color?: string
  duration?: number
  strokeWidth?: number
  borderRadius?: number // Border radius as a number (e.g., 8 for `rounded-lg`)
}

export const AnimatedBorder: React.FC<AnimatedBorderProps> = ({
  children,
  color = 'hsl(var(--primary))',
  duration = 2,
  strokeWidth = 2,
  borderRadius = 8, // Default to `rounded-lg` equivalent
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const controls = useAnimation()

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          })
        }
      })

      resizeObserver.observe(containerRef.current)

      return () => {
        resizeObserver.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    controls.start({
      pathLength: [0, 1],
      transition: { duration, ease: 'easeInOut' },
    })
  }, [controls, duration])

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      style={{ borderRadius }}
    >
      {children}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        width={dimensions.width}
        height={dimensions.height}
      >
        <motion.rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={dimensions.width - strokeWidth}
          height={dimensions.height - strokeWidth}
          rx={borderRadius} // Apply consistent rounding
          ry={borderRadius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          initial={{ pathLength: 0 }}
          animate={controls}
        />
      </svg>
    </div>
  )
}