import Image from 'next/image'
import { Media } from '@/payload-types'
import { RichText } from '@/components/Payload/RichText'
import { cn } from '@/lib/utils/cn'

export interface ServiceDetailSectionProps {
  image: Media
  title: string
  content?: Record<string, any> | string
  link: { label: string; url: string }
  theme?: 'light' | 'dark'
}

export function ServiceDetailSection({
  image,
  title,
  content,
  link,
  theme,
}: ServiceDetailSectionProps) {
  console.log('ServiceDetailSectionProps', image, title, content, link, theme)
  return (
    <section className="relative">
      <div
        className={cn(
          'absolute mt-[50%] w-full h-full',
          theme === 'dark' ? 'bg-white' : 'bg-black',
        )}
      ></div>

      <div
        className={cn(
          'flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:px-16 py-16 bg-background',
          theme,
          theme === 'dark' && 'bg-black clip-custom-top-r',
        )}
      >
        <div className="w-full flex flex-row items-center justify-center">
          {/* Left Side Content */}
          <div className={cn('w-full md:w-1/2 max-w-lg text-left', theme === 'dark' && 'mt-48')}>
            <h2 className="text-3xl md:text-5xl text-primary">{title}</h2>
            <p className="mt-4 text-gray-700 text-lg">
              <RichText
                enableGutter={false}
                content={content}
                enableProse={false}
                className={cn('prose prose-headings:text-gray-700 prose-p:text-gray-700')}
              />
            </p>

            {/* CTA Button */}
            <button className="mt-6 px-6 py-3 border border-1 border-accent text-foreground rounded-full text-base hover:bg-accent hover:text-white transition">
              <a href={link.url || '#'}>{link.label || 'Learn more'}</a>
            </button>
          </div>

          {/* Right Side - AI Themed Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src={image.url} // Change this to the actual image path
              alt={image.alt || `Image of ${title}`}
              width={400}
              height={400}
              className="max-w-full"
            />
          </div>
        </div>
        
      </div>
      <div className="clip-bottom w-full h-[15vh] bg-black"></div>


      <style jsx>{`
      .clip-bottom {
    clip-path: polygon(0% 0%, 0% 50%, 100% 100%, 100% 0%);
  }
        .clip-custom-bottom {
          clip-path: polygon(
            0% 0%,
            0% 16.2%,
            0% 83.2%,
            0% 87.3%,
            65.4% 99.6%,
            100% 72.9%,
            100% 16.2%,
            100% 0%
          );
        }
        .clip-custom-top-r {
          clip-path: polygon(
            0% 100%,
            0% 83.8%,
            0% 16.8%,
            0% 12.7%,
            65.4% 0.4%,
            100% 27.1%,
            100% 83.8%,
            100% 100%
          );
        }
        .clip-custom-top-l {
          clip-path: polygon(
            100% 100%,
            100% 83.8%,
            100% 16.8%,
            100% 12.7%,
            34.6% 0.4%,
            0% 27.1%,
            0% 83.8%,
            0% 100%
          );
        }
        .clip-custom-top-bottom {
          clip-path: polygon(
            0% 0%,
            0% 12.7%,
            34.6% 0.4%,
            100% 16.8%,
            100% 83.8%,
            65.4% 99.6%,
            0% 87.3%,
            0% 100%,
            100% 100%,
            100% 83.8%,
            100% 16.8%,
            100% 12.7%,
            65.4% 0.4%,
            0% 27.1%,
            0% 83.8%,
            0% 100%
          );
        }
      `}</style>
    </section>
  )
}
