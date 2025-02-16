import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { RichText } from '@/components/Payload/RichText'
import { DynamicIcon, type DynamicIconProps } from '../Images'

export interface ContentCardProps {
  variant?: 'solid' | 'outline' | 'gradient' | 'radial' 
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
  variant = 'outline',
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
    outline: 'bg-background border border-accent',
    gradient: 'bg-gradient-to-br from-[#A42368] to-[#4A1030]',
    radial: 'bg-gradient-to-br from-[#4A1030] to-[#2D0A1D] relative overflow-hidden',
  }
  return (
    <div
      className={cn(
        'rounded-3xl p-8 md:p-8 min-w-56',
        variants[variant],
        variant === 'outline' ? 'text-gray-900' : 'text-white',
        className,
      )}
    >
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-6">

        <IconLocation icon={icon} heading={heading} variant={variant}/>

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
        <div className={cn('space-y-6', variant === 'outline' ? 'text-gray-600' : 'text-gray-300')}>
          <RichText enableGutter={false} content={content} enableProse={false} className={cn( variant === 'outline' ? 'prose' : 'prose prose-headings:text-white prose-p:text-gray-300')} />
        </div>
      )}
      {content && typeof content === 'string' && (
        <div className={cn('space-y-6', variant === 'outline' ? 'text-gray-600' : 'text-gray-300')}>
          {content}
        </div>
      )}

      {/* CTA Button */}
      {buttonText && (
        <div className="mt-8">
          <Button
            size="lg"
            // className="bg-[#A42368] hover:bg-[#8B1E57] text-white px-8 py-6 text-lg rounded-xl"
            className="text-white text-lg rounded-xl w-full"
            asChild
          >
            <a href={buttonHref}>
              {buttonText}
              {/* <span className="ml-2">↓</span> */}
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


const IconLocation = ({ icon, heading, variant }: { icon?: React.ReactNode | DynamicIconProps
  heading: string, variant?: 'solid' | 'outline' | 'gradient' | 'radial' 
}) => {

    if (icon && heading.length < 30 ) {
      return (
        <div className="flex items-center gap-4 mb-6">
          {isDynamicIconProps(icon) && (
            <div
              className={cn(
                'rounded-full p-0',
                variant === 'outline' ? 'text-accent' : 'text-foreground',
              )}
            >
              
                <DynamicIcon type={icon.type} iconName={icon.iconName} size="2x" />
              
            </div>
          )}
          <div
          className={cn(
            'font-semibold',
            variant === 'outline' ? 'text-2xl text-primary' : 'text-3xl',
          )}
        >
          {heading}
        </div>
        </div>
      )
    } else if (icon) {
      return (
      <div className="flex flex-col gap-4">

      {isDynamicIconProps(icon) && (

        <div className="text-accent h-12 w-12 mb-3 transform group-hover:scale-110 transition-transform duration-400">
                <DynamicIcon type={icon.type} iconName={icon.iconName} size="4x" />
                </div>)}
      
      <h3 className={cn(
            'font-semibold group-hover:text-accent transition-colors duration-400',
            variant === 'outline' ? 'text-2xl text-primary' : 'text-3xl',
          )}>
        {heading}
      </h3>
      </div>
      )
    } else {
      return (
      <div className="flex items-center gap-4 mb-6">
          <div
          className={cn(
            'font-semibold',
            variant === 'outline' ? 'text-2xl text-primary' : 'text-3xl',
          )}
        >
          {heading}
        </div>
        </div>
      )
    }
  }
