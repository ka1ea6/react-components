import { Container } from '@/components/Other/Container'
import { getStaggeredDelay } from '@/lib/utils/setStaggeredDelay'
import { cn } from '@/lib/utils'
import { ClassValue } from 'clsx'
// import { ServiceCard, ServiceProps } from '@/components/Cards/ServiceCard'
import { FeatureCard } from '../components'
import { ImageProps } from 'next/image'
import { PageShape } from '@/components/Other/PageShape'
import { Divide } from 'lucide-react'

export interface ServiceSectionProps {
  services: any[]
  className?: ClassValue
  image?: ImageProps
}

export function ServiceSection({ services, className }: ServiceSectionProps) {
  console.log('ServiceSection', services)
  const cardsettings = {
  settings: {
    width: 'full' as 'full',
    card: 'light' as 'light',
  }
  }

  

  return (
    <>
    <div className='absolute w-full h-full bg-white'></div>
    <section id="next-section" className={cn('sticky snap-start md:top-0 flex flex-col items-center justify-center py-4 light bg-background', className)} 
    
    
    // style={{
    //   backgroundImage: `url(${image?.src})`, // Use the src property from ImageProps
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    // }}
    >
      <div className='absolute w-full -top-[1245px]'>
      {/* <PageShape className="text-black z-10" position='top' /> */}

     </div>
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
                {/* <ServiceCard {...service} /> */}
                <FeatureCard {...cardsettings} icon={{ type: 'none'}} title={service.title} image={service.image} content={service.content} link={service.link} />
              </div>
            ))}
          </div>
        )}
      </Container>
      {/* <PageShape className="text-black z-10" position='bottom' /> */}

      </section>
     
      {/* <div className='relative top-0'>
        <PageShape className="text-black z-10" position='bottom' />
      </div> */}
      </>
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
