import { Container } from '@/components/Other/Container'
import { getStaggeredDelay } from '@/lib/utils/setStaggeredDelay'
import { cn } from '@/lib/utils'
import { ClassValue } from 'clsx'
import { ServiceCard, ServiceProps } from '@/components/Cards/ServiceCard'

export interface ServiceSectionProps {
  services: ServiceProps[]
  className?: ClassValue
}

export function ServiceSection({ services, className }: ServiceSectionProps) {
  return (
    <section id="next-section" className={cn('sticky top-0 h-screen flex flex-col items-center justify-center z-2 section-padding-primary dark bg-background border-t border-accent', className)}>
      <Container className='py-8'>
        {services && services.length > 0 && (
          <div className="flex flex-wrap justify-center gap-y-8">
            {services.map((service, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={getStaggeredDelay([200, 400, 600], index)}
                className="w-full px-4 md:w-1/2 lg:w-1/3"
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
