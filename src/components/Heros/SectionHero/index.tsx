import { Container } from '@/components/Other/Container'
import { CustomLink } from '@/components/Other/CustomLink'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import bannerImage from '../../../images/hero/hero-3.jpg'


interface BreadcrumbItem {
  href?: string
  label: string
}

export interface HeroSectionProps {
  title: string
  image?: string
  breadcrumbItems: BreadcrumbItem[]
}

export function SectionHero({ title, breadcrumbItems, image = bannerImage.src }: HeroSectionProps) {
  return (
    <section className="section-padding-primary -mt-[10.4rem] relative flex min-h-[250px] items-end">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          priority
          src={image}
          alt={`${process.env.NEXT_PUBLIC_SITE_NAME}`}
          layout="fill"
          // layout="contain"
          style={{
            objectFit: 'cover',
          }}
          sizes="100vw"
          className="pointer-events-none object-cover"
        />
        {/* Overlay */}
        {/* <span className="absolute inset-0 bg-gradient-1 from-white/0 to-white dark:from-accent/0 dark:to-accent"></span> */}
        </div>
                {/* Overlay  */}
                <span className="absolute inset-0 bg-gradient-1 from-background/0 to-background dark:from-background/0 dark:to-background"></span>


      <Container>
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-x-20 gap-y-8 text-accent-900 dark:text-white lg:pt-[40px] pb-5">
          <h1 className="font-secondary text-xl font-bold lg:w-1/2">{title}</h1>
          {breadcrumbItems && breadcrumbItems.length > 0 && (
            <Breadcrumb breadcrumbItems={breadcrumbItems} />
          )}
        </div>
      </Container>
    </section>
  )
}

const breadcrumbItemClasses = cn('h3 font-secondary')

function Breadcrumb({ breadcrumbItems }: Pick<HeroSectionProps, 'breadcrumbItems'>) {
  if (breadcrumbItems && breadcrumbItems.length > 0) {
    return (
      <nav aria-label="breadcrumb">
        <ol className="inline-flex items-center gap-5">
          {breadcrumbItems.map((menuItem, index) => (
            <React.Fragment key={index}>
              {menuItem.href ? (
                <li className={breadcrumbItemClasses}>
                  <CustomLink href={menuItem.href} className="transition-colors hover:text-primary">
                    {menuItem.label}
                  </CustomLink>
                  <span className="ml-5">/</span>
                </li>
              ) : (
                <li className={breadcrumbItemClasses} aria-current="page">
                  {menuItem.label}
                </li>
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>
    )
  }
  return <></>
}
