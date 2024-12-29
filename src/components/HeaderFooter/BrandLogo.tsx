import { CustomLink } from '@/components/Other/CustomLink'
import Image from 'next/image'

export function BrandLogo({logoLight, logoDark}:{logoLight: any, logoDark: any}) {
  return (
    <CustomLink href="/" className="py-2">
      <Image
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
          width: '200px',
          height: 'auto',
        }}
      />
      <Image
        className="logo-dark hidden dark:block"
        src={logoDark.src}
        width={logoDark.width}
        height={logoDark.height}
        // placeholder="blur"
        // blurDataURL={logoDark.blurDataURL}
        alt={`${process.env.NEXT_PUBLIC_SITE_NAME} brand logo`}
        sizes="100vw"
        // fill
        priority
        style={{
          width: '200px',
          height: 'auto',
        }}
      />
    </CustomLink>
  )
}
