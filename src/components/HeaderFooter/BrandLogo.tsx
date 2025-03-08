import { CustomLink } from '@/components/Other/CustomLink'
import Image, { StaticImageData } from 'next/image'
import { cn } from '@/lib/utils/cn'

export function BrandLogo({logo, mobile = false}:{logo: StaticImageData, mobile?:boolean}) {
  return (
    <CustomLink href="/" className={cn( mobile ? 'py-1' : 'py-2')}>
      {/* <Image
        className="logo-light dark:hidden"
        src={logoLight.src}
        width={logoLight.width}
        height={logoLight.height}
        // placeholder="blur"
        // blurDataURL={logoLight.blurDataURL}
        alt={`${process.env.NEXT_PUBLIC_SITE_NAME} brand logo`}
        sizes="100vw"
        // fill
        priority
        style={{
          width: 'auto',
          height : mobile ? 35 : 50
        }}
      /> */}
      <Image
        // className=""
        src={logo.src}
        width={logo.width}
        height={logo.height}
        // placeholder="blur"
        // blurDataURL={logoDark.blurDataURL}
        alt={`${process.env.NEXT_PUBLIC_SITE_NAME} brand logo`}
        sizes="100vw"
        // fill
        priority
        style={{
          // width: '200px',
          width: 'auto',
          height : mobile ? 35 : 50
          // height: 'auto',
        }}
      />
    </CustomLink>
  )
}
