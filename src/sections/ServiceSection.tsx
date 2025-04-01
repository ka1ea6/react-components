import { Container } from '@/components/Other/Container'
import { getStaggeredDelay } from '@/lib/utils/setStaggeredDelay'
import { cn } from '@/lib/utils'
import { ClassValue } from 'clsx'
// import { ServiceCard, ServiceProps } from '@/components/Cards/ServiceCard'
import { FeatureCard } from '../components'
import { ImageProps } from 'next/image'
import { RichText } from '@/components/Payload/RichText'
import { Divide } from 'lucide-react'

export interface ServiceSectionProps {
  services: any[]
  title?: string
  content?: Record<string, any>
  className?: ClassValue
  image?: ImageProps
}

export function ServiceSection({ services, className, title, content }: ServiceSectionProps) {
  const cardsettings = {
    settings: {
      width: 'full' as 'full',
      card: 'light' as 'light',
    },
  }
  return (
    <div className="pb-4 md:pb-0">
      <div className={cn('w-full text-left prose')}>
        {title && <h2 className="text-primary">{title}</h2>}
        <div className="pb-12 ">
          {content && (
            <RichText
              enableGutter={false}
              content={content}
              enableProse={false}
              className={cn('prose prose-headings:text-foreground prose-p:text-foreground')}
            />
          )}
        </div>
      </div>
      {services && services.length > 0 && (
        <div className="-mx-4 flex flex-wrap justify-between gap-y-8">
          {services.map((service, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={getStaggeredDelay([200, 400, 600], index)}
              className="w-full px-4 md:w-1/2 lg:w-1/3 flex"
            >
              {/* <ServiceCard {...service} /> */}
              <FeatureCard
                {...cardsettings}
                icon={{ type: 'none' }}
                title={service.title}
                image={service.image}
                content={service.content}
                link={service.link}
                className="w-full"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// image,
//   icon,
//   title,
//   subtitle,
//   content,
//   statistic,
//   settings,
//   link,

//   className,
