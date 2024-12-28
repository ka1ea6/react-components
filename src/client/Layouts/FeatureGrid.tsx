'use client'
import React from 'react'

interface FeatureGridProps {
  children: React.ReactNode // Accepts any valid React elements as children
  cardsPerRow?: number // Optional prop to configure the number of cards per row
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ children, cardsPerRow = 3 }) => {
  // Generate the grid template columns based on the cardsPerRow prop
  const gridTemplateColumns = `repeat(${cardsPerRow}, minmax(0, 1fr))`

  return (
    <div className="grid gap-6" style={{ gridTemplateColumns }}>
      {children}
    </div>
  )
}

export default FeatureGrid
