import { cn } from "@/lib/utils"

export interface HeroProps {
  className?: string
  badge?: string
  title: string
  subtitle: string
}

export function Hero({
  className,
  badge,
  title,
  subtitle,
}: HeroProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-gradient-to-br from-[#A42368] to-[#A42368] m-6 px-6 py-16 md:px-12 md:py-24",
        className,
      )}
    >
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {badge && (
          <div className="mb-4">
            <span className="inline-block rounded-lg bg-[#A42368]/50 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              {badge}
            </span>
          </div>
        )}
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-6 text-base text-gray-300 sm:text-lg md:text-xl">{subtitle}</p>
      </div>
      <div
        className="absolute bottom-0 left-1/2 h-48 w-full -translate-x-1/2"
        style={{
          background: "radial-gradient(50% 50% at 50% 100%, rgba(164, 35, 104, 0.1) 0%, rgba(164, 35, 104, 0) 100%)",
        }}
      />
      <div className="absolute bottom-0 left-1/2 h-32 w-full -translate-x-1/2">
        <svg viewBox="0 0 1113 170" fill="none" className="absolute bottom-0 opacity-10">
          <path
            d="M-19 170H1113V0C1113 0 1001.5 101.5 547.5 101.5C93.5 101.5 -19 170 -19 170Z"
            fill="currentColor"
            className="text-white"
          />
        </svg>
      </div>
    </div>
  )
}

