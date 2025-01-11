import { Container } from '@/components/Other/Container'
import Image, { type StaticImageData } from 'next/image'
import { Breadcrumb } from '../RenderHero'

interface BreadcrumbItem {
  href?: string
  label: string
}

export interface HeroSectionProps {
  title: string
  image?: StaticImageData
  breadcrumbItems: BreadcrumbItem[]
}

export function SectionHero({ title, breadcrumbItems, image }: HeroSectionProps) {
  return (
    <section className="-z-10 relative flex min-h-[250px] pt-auto items-end">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
       { image && <Image
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
}
        {/* Overlay */}
        {/* <span className="absolute inset-0 bg-gradient-1 from-white/0 to-white dark:from-accent/0 dark:to-accent"></span> */}
        </div>
                {/* Overlay  */}
                <span className="absolute inset-0 bg-gradient-1 from-background/0 to-background dark:from-background/0 dark:to-background"></span>


      <Container>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-x-20 gap-y-8 text-accent-900 dark:text-white lg:pt-[40px] pb-5">
          <h1 className="underline underline-offset-8 decoration-1 decoration-accent font-secondary text-5xl font-bold lg:w-1/2">{title}</h1>
          {breadcrumbItems && breadcrumbItems.length > 0 && (
            <Breadcrumb breadcrumbItems={breadcrumbItems} />
          )}
        </div>
      </Container>
    </section>
  )
}
