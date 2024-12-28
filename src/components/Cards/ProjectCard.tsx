import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import Image, { type ImageProps } from 'next/image'

export interface PortfolioCardProps {
  slug: string
  image: Omit<ImageProps, 'width' | 'height'>
  title: string
  description: string
}

type Breakpoints<T> = {
  sm: T
  md: T
  lg: T
  xl: T
  '2xl': T
}
const BREAKPOINTS: Breakpoints<string> = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1400px',
}

export function ProjectCard({ slug, image, title, description }: PortfolioCardProps) {
  return (
    <Link
      href={slug}
      className="group/portfolio relative z-1 block aspect-[640/916] overflow-hidden rounded-5 p-6 md:p-[1.875rem]"
    >
      <span
        className={cn(
          // Normal
          'absolute inset-0 z-[2] bg-gradient-1 from-primary/0 to-primary [transition:all_500ms_ease] md:[transform:perspective(400px)_rotateX(90deg)_scaleY(0.5)]',
          // Hover
          'md:group-hover/portfolio:[transform:perspective(400px)_rotateX(0deg)_scaleY(1.0)] md:group-hover/portfolio:[transition-delay:.1s] md:group-hover/portfolio:[transition:all_.7s_ease]',
        )}
      ></span>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={`
          (min-width:${BREAKPOINTS.md}) 50vw, 
          (min-width:${BREAKPOINTS.lg}) 25vw,
          100vw
          `}
        className="pointer-events-none [transform:scale(1.05)] [transition:.9s_ease] group-hover/portfolio:[transform:scale(1)]"
      />

      {/* Content  */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="mt-auto divide-y md:opacity-0 md:transition-[transform,opacity] md:duration-500  md:group-hover/portfolio:opacity-100">
          <h3 className="overflow-hidden text-md font-bold leading-[1.25] text-white md:text-lg">
            <span className="block [transition-delay:500ms] [transition:all_.9s_ease] md:[transform:translateY(-100%)] md:group-hover/portfolio:[transform:translateY(0)]">
              {title}
            </span>
          </h3>
          <p className="mt-[13px] overflow-hidden pt-[11px] text-body">
            <span className="block [transition-delay:500ms] [transition:all_.9s_ease] md:[transform:translateY(100%)] md:group-hover/portfolio:[transform:translateY(0)]">
              {description}
            </span>
          </p>
        </div>
      </div>
    </Link>
  )
}
