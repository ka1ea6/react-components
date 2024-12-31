import { LinkProps } from '@/common-types'
import { Button } from '@/components/ui/button'
import { CustomLink } from '@/components/Other/CustomLink'
import { cn } from '@/lib/utils'
import { FaCircleCheck, FaAnglesRight } from 'react-icons/fa6'

export interface PricingCardProps {
  title: string
  description: string
  features: string[]
  price?: string
  duration?: string
  button?: LinkProps
}

export function PricingCard({
  title,
  description,
  features,
  price,
  duration,
  button,
}: PricingCardProps) {
  return (
    <div className="relative grid rounded-5 border border-accent-200 dark:border-opacity-20 lg:grid-cols-[300px_1fr]  2xl:grid-cols-[386px_1fr]">
     
      <div className="h-full border-card p-6 dark:border-opacity-20  max-lg:border-b max-lg:pt-14 lg:border-r  lg:p-10">
        <h3 className="mb-4 text-lg font-bold leading-[1.3] text-foreground lg:mb-5 lg:text-xl">
          {title}
        </h3>
        <p>{description}</p>
      </div>
      <div className="relative my-auto p-6 max-lg:pb-14 md:p-10">
        <div className="flex flex-col justify-stretch gap-x-14 gap-y-5 md:flex-row md:items-center">
          {features && features.length > 0 && (
            <ul
              aria-label="pricing point list"
              className="grid w-full grid-cols-1 md:grid-cols-2 gap-1 md:gap-2"
              style={{ gridAutoFlow: 'row' }}
            >
              {features.map((feature, index) => (
                <li className="flex items-start gap-3 lg:gap-4" key={index}>
                  <span className="text-accent pt-1">
                    <FaCircleCheck />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="font-secondary ml-auto text-xl font-bold leading-[1.25] text-accent-900 dark:text-white lg:text-2xl">
            {price && price}
            <sub className="relative bottom-0 ml-1.5 inline-block text-base lg:text-md">
              {duration && duration}
            </sub>
          </p>
          {button && (
            <div className="flex-none mr-0 sm:ml-auto">
              <Button
                asChild
                className="border-2 p-5 border-accent bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <CustomLink href={button.href} openNewTab={button.openNewTab}>
                  <span className="relative z-1">{button.label}</span>
                  <span className='relative z-1 pl-2'><FaAnglesRight /></span>
                  {/* <svg
                    className="relative pl-1 mr-1 ml-auto top-[-1px] z-1"
                    width={15}
                    height={13}
                    viewBox="0 0 15 13"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.6875 7.71875L8.6875 12.7188C8.5 12.9062 8.25 13 8 13C7.71875 13 7.46875 12.9062 7.28125 12.7188C6.875 12.3438 6.875 11.6875 7.28125 11.3125L10.5625 8H1C0.4375 8 0 7.5625 0 7C0 6.46875 0.4375 6 1 6H10.5625L7.28125 2.71875C6.875 2.34375 6.875 1.6875 7.28125 1.3125C7.65625 0.90625 8.3125 0.90625 8.6875 1.3125L13.6875 6.3125C14.0938 6.6875 14.0938 7.34375 13.6875 7.71875Z" />
                  </svg> */}
                </CustomLink>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
