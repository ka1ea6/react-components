import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { RichText } from '@/components/Payload/RichText'
import { DynamicIcon, type DynamicIconProps } from '../Images'

export interface ContentCardProps {
  variant?: 'solid' | 'light' | 'gradient' | 'radial'
  className?: string
  icon?: React.ReactNode | DynamicIconProps
  heading: string
  subheading?: string
  content?: Record<string, any> | string
  statistic?: string
  buttonText?: string
  buttonHref?: string
}
function isDynamicIconProps(icon: any): icon is DynamicIconProps {
  return icon && typeof icon === 'object' && 'type' in icon && 'iconName' in icon
}
export function ContentCard({
  variant = 'light',
  className,
  icon,
  heading,
  subheading,
  content,
  statistic,
  buttonText,
  buttonHref,
}: ContentCardProps) {
  const variants = {
    solid: 'bg-accent',
    light: 'bg-white',
    gradient: 'bg-gradient-to-br from-[#A42368] to-[#4A1030]',
    radial: 'bg-gradient-to-br from-[#4A1030] to-[#2D0A1D] relative overflow-hidden',
  }
  return (
    <div
      className={cn(
        'rounded-3xl p-8 md:p-12 min-w-56',
        variants[variant],
        variant === 'light' ? 'text-gray-900' : 'text-white',
        className,
      )}
    >
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-6">
        {icon && (
          <div
            className={cn(
              'rounded-full p-0',
              variant === 'light' ? 'text-[#A42368]' : 'text-white',
            )}
          >
            {isDynamicIconProps(icon) ? (
              <DynamicIcon type={icon.type} iconName={icon.iconName} size="2x" />
            ) : (
              icon
            )}
          </div>
        )}
        <div
          className={cn(
            'font-semibold',
            variant === 'solid' || variant === 'light' ? 'text-2xl' : 'text-4xl',
          )}
        >
          {heading}
        </div>
      </div>

      {/* Statistic Display */}
      {variant === 'solid' && statistic && (
        <div className="mb-6">
          <div className="text-4xl text-wrap font-bold leading-none overflow-hidden">{statistic}</div>
        </div>
      )}

      {/* Content Section */}
      {subheading && <div className="mb-4 text-xl md:text-2xl font-light">{subheading}</div>}

      {content && typeof content === 'object' && (
        <div className={cn('space-y-6', variant === 'light' ? 'text-gray-600' : 'text-gray-300')}>
          <RichText enableGutter={false} content={content} enableProse={false} className={cn( variant === 'light' ? 'prose' : 'prose prose-headings:text-white prose-p:text-gray-300')} />
        </div>
      )}
      {content && typeof content === 'string' && (
        <div className={cn('space-y-6', variant === 'light' ? 'text-gray-600' : 'text-gray-300')}>
          {content}
        </div>
      )}

      {/* CTA Button */}
      {buttonText && (
        <div className="mt-8">
          <Button
            size="lg"
            // className="bg-[#A42368] hover:bg-[#8B1E57] text-white px-8 py-6 text-lg rounded-xl"
            className="text-white text-lg rounded-xl"
            asChild
          >
            <a href={buttonHref}>
              {buttonText}
              <span className="ml-2">↓</span>
            </a>
          </Button>
        </div>
      )}

      {/* Decorative Background for CTA variant */}
      {variant === 'radial' && (
        <div
          className="absolute bottom-0 right-0 w-2/3 h-2/3 blur-3xl rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(164,35,104,0.3) 0%, rgba(74,16,48,0) 70%)',
          }}
        />
      )}
    </div>
  )
}
