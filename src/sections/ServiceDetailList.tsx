import { Section } from './PageSections'
import { RichText } from '@/components/Payload/RichText'
import { DynamicIcon, DynamicIconProps } from '@/components/Images'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'


export interface ServiceProps {
    icon: React.ReactNode | DynamicIconProps
    title: string
    description: Record<string, unknown>
    slug?: string
  }
  
  interface ServiceDetailProps {
    dynamicServiceDetail: ServiceProps[]
    style: 'scroll' | 'slide'
  }
  
  export const Services = ({ dynamicServiceDetail, style }: ServiceDetailProps) => {
    return dynamicServiceDetail.map((service, index) => (
      <Section id={service.slug} key={index} theme={index % 2 === 0 ? 'dark' : 'light'} style={style}>
        <div className="container">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-1 items-center justify-center">
            {/* Left Side Content */}
            <div className={cn('w-full text-left')}>
              <h2 className="text-3xl md:text-5xl text-primary">{service.title}</h2>
              <div className="mt-4 text-gray-700 text-lg">
                <RichText
                  enableGutter={false}
                  content={service.description}
                  enableProse={false}
                  className={cn('prose prose-headings:text-foreground prose-p:text-foreground')}
                />
              </div>
  
              {/* CTA Button */}
              <button className="mt-6 px-6 py-3 border border-1 border-accent text-foreground rounded-full text-base hover:bg-accent hover:text-accent-foreground transition">
                <Link href={`/${service.slug}`}>Learn more</Link>
              </button>
            </div>
  
            {/* Right Side - AI Themed Image */}
            {service.icon &&
              typeof service.icon === 'object' &&
              'type' in service.icon &&
              'iconName' in service.icon && (
                <div
                  className={cn(
                    'w-full h-full min-h-96 py-6 p-0 md:p-16 flex justify-center',
                    // index % 2 === 0 ? 'text-white' : 'text-black',
                  )}
                >
                  <i
                    className={`${service.icon.type} fa-${service.icon.iconName} fa-10x w-1/2 h-full text-foreground fill-gradient-linear`}
                    style={{ width: '50%' }}
                  />
                  {/* <DynamicIcon
                type={service.icon.type}
                iconName={service.icon.iconName}
                size="10x"
                className="w-full h-full icon-gradient"
              /> */}
                  {/* <Image
                src={bgImage.url} // Change this to the actual image path
                alt="image"
                width={bgImage.width}
                height={bgImage.height}
                className="max-w-full"
              /> */}
                </div>
              )}
          </div>
        </div>
      </Section>
    ))
  }
  