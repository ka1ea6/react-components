import { Container } from '@/components/Other/Container'
import Image, { type StaticImageData } from 'next/image'
import { Breadcrumbs } from '../RenderHero'
import { PageShape } from '@/components/Other'

interface BreadcrumbItem {
  href?: string
  label: string
}

export interface HeroSectionProps {
  title: string
  image?: StaticImageData
  breadcrumbItems?: BreadcrumbItem[]
}


export const SectionHero: React.FC<HeroSectionProps> = ({
  title, image
}) => {
  // const { setHeaderTheme } = useHeaderTheme()

  // useEffect(() => {
  //   setHeaderTheme('dark')
  // })

  return (
    <div>
    <div className="sticky top-0 h-[50vh] min-h-[400px]">

    {/* <div
      className="relative -mt-[10.4rem] flex items-end justify-center text-white"
    > */}
            <div className="fixed inset-0 container mt-24 mb-8 z-10 flex items-start justify-start">
      <h1 className='text-5xl md:text-6xl'>{title}</h1>
</div>
      <div className="fixed inset-0 h-[50vh] min-h-[400px] select-none">
        {image && typeof image === 'object' && (
          <Image
          priority
          src={image.src}
          alt={`${process.env.NEXT_PUBLIC_SITE_NAME}`}
          layout="fill"
          // layout="contain"
          style={{
            objectFit: 'cover',
          }}
          sizes="100vw"
          className="pointer-events-none object-cover"
        />
        )}
        {image && typeof image === 'string' && (
          <div>
            <Image className="-z-10 object-cover" alt="" fill priority src={image} />
          </div>
        )}
        {/* Overlay  */}
        <span className="absolute inset-0 bg-gradient-to-b from-white dark:from-black"></span>
        

      </div>
      
    {/* </div> */}
    <PageShape className="text-black z-10" position="header" />
    </div>
    </div>
  )
}

