import * as React from 'react'

interface MOTDProps {
  title: string
  message?: string
  url?: string
  brandFrom?: string
  brandTo?: string
}

const getGradient = (from: string, to: string) => {
  // return "from-brand-two to-brand-one";
  return `from-brand-${from} to-brand-${to}`
}

export function MOTD({ ...args }: MOTDProps) {
  const gradient = getGradient(args.brandFrom || 'one', args.brandTo || 'two')
  // const brandToClass = getBrandClass(args.brandTo || '');
  return (
    <div
      className={`relative isolate flex items-center gap-x-6 overflow-hidden px-6 py-2.5 sm:px-3.5 sm:before:flex-1 bg-gradient-to-r ${gradient}`}
    >
      <p className="text-sm/6 text-primary-foreground">
        {args.url ? (
          <a href={args.url}>
            <strong className="font-semibold">{args.title}</strong>
            {args.message && (
              <svg
                viewBox="0 0 2 2"
                aria-hidden="true"
                className="mx-2 inline size-0.5 fill-current"
              >
                <circle r={1} cx={1} cy={1} />
              </svg>
            )}
            <span>{args.message && args.message}</span>
          </a>
        ) : (
          <>
            <strong className="font-semibold">{args.title}</strong>
            {args.message && (
              <svg
                viewBox="0 0 2 2"
                aria-hidden="true"
                className="mx-2 inline size-0.5 fill-current"
              >
                <circle r={1} cx={1} cy={1} />
              </svg>
            )}
            {args.message && args.message}
          </>
        )}
      </p>
      <div className="flex flex-1 justify-end"></div>
    </div>
  )
}
