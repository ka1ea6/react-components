import * as React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/client/ui/card'
import { Badge } from '@/components/client/ui/badge'
import { Quote } from 'lucide-react'
// import { industryOptions } from '@/collections/CaseStudies';

interface CustomerCaseStudyProps {
  customerName: string
  logoUrl?: string
  industry?: string
  projectDescription: string
  color?: string
  quote?: string
  metrics?: Array<{ label: string; value: string }>
  children?: React.ReactNode
}
// Helper function to determine if a color is dark
function isColorDark(color: string): boolean {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness < 128
}
export default function CaseStudy({
  customerName = 'Acme Corporation',
  logoUrl,
  industry,
  projectDescription = 'Revolutionizing widget production with cloud technology',
  color = '#3B82F6',
  quote,
  metrics = [],
  children = null,
}: CustomerCaseStudyProps) {
  const industryOptions = [
    { label: 'Technology', value: 'technology' },
    { label: 'Finance', value: 'finance' },
    { label: 'Healthcare', value: 'healthcare' },
    { label: 'Retail', value: 'retail' },
    // Add more industries as needed
  ]

  const industryLabel =
    industryOptions.find((option) => option.value === industry)?.label || undefined

  const contrastColor = isColorDark(color) ? 'text-white' : 'text-gray-900'
  const textColor = isColorDark(color) ? 'white' : color

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden shadow-lg">
      <CardContent className="p-0">
        <div
          className={`flex items-center ${contrastColor}`}
          style={{
            background: `linear-gradient(to right, ${color}, ${color}80)`,
            padding: '1.5rem', // Consistent padding around the main container
          }}
        >
          {/* Left text container */}
          <div className="flex-grow pr-4">
            <h2 className="text-2xl font-bold mb-2">{customerName}</h2>
            {industryLabel && (
              <Badge variant="secondary" className="text-sm font-medium">
                {industryLabel}
              </Badge>
            )}
            <p className="mt-4 text-lg">{projectDescription}</p>
          </div>

          {/* Right image container with consistent height */}
          {logoUrl && (
            <div
              className="flex items-center justify-center bg-white rounded-lg"
              style={{ padding: '1rem', height: '100px' }}
            >
              <Image
                src={logoUrl}
                alt={`${customerName} logo`}
                width={120}
                height={60}
                className="object-contain h-full"
              />
            </div>
          )}
        </div>

        <div className="p-6">
          {quote && (
            <blockquote
              className="border-l-4 pl-4 py-2 mb-6 italic"
              style={{ borderColor: color, color: color }}
            >
              <Quote className="inline-block mr-2" size={24} style={{ color: color }} />
              {quote}
              <Quote className="inline-block ml-2" size={24} style={{ color: color }} />
            </blockquote>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold" style={{ color: color }}>
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">{children}</div>
      </CardContent>
    </Card>
  )
}
