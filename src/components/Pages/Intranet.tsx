import * as React from 'react'
import { BellIcon } from '@heroicons/react/24/outline'
import { SimpleHeader } from '../HeaderFooter'
import { InfoTile } from '../Blocks/InfoTile'
import { MOTD } from '../Blocks/MOTD'
import { NewsGrid } from '../Layouts/NewsGrid'
import { EventCard, type EventCardProps } from '../Cards/EventCard'
import { CustomerCard, type CustomerCardProps } from '../Cards/CustomerCard'
export default function Intranet({ ...args }) {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-col">
        {/* <div className="h-full w-full bg-white">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div></div> */}
        <div className="relative isolate">
          {/* <svg
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-20 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
          >
            <defs>
              <pattern
                x="70%"
                y={-1}
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg> */}
          {/* <div
            aria-hidden="true"
            className="absolute left-1/2 right-0 top-0 -z-20 transform-gpu overflow-hidden blur-3xl"
          >
            <div
              style={{
                clipPath:
                  'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
              }}
              className="aspect-[801/1036] w-full bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-50"
            />
          </div> */}
        </div>
        <SimpleHeader {...args.header} />
        <MOTD {...args.motd} />
        {/* 3 column wrapper */}
        <div className="mx-auto w-full max-w-screen-2xl grow lg:flex xl:px-2">
          {/* Left sidebar & main wrapper */}
          <div className="flex-1 xl:flex">
            <div className="border-b border-gray-200 px-4 py-6 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:border-b-0 xl:border-r xl:pl-6">
              {/* Left column area */}

              {args.customers.map(
                (customer: CustomerCardProps, index: React.Key | null | undefined) => (
                  <div key={index} className="py-2 w-full flex justify-center">
                    <CustomerCard {...customer} />
                  </div>
                ),
              )}
            </div>

            <div className="px-4 py-4 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
              {/* <h1 className="text-balance text-3xl m-5 font-semibold tracking-tight text-primary sm:text-5xl">
                Propositions
              </h1> */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoTile mainImage="/placeholder/ai.png" title="AI Enablement" color="primary" />
                <InfoTile mainImage="/placeholder/finops.png" title="FinOps" color="primary2" />
                <InfoTile
                  mainImage="/placeholder/metahuman.png"
                  title="Metahumans"
                  color="primary3"
                />
              </div>
              <h1 className="text-balance text-3xl m-5 font-semibold tracking-tight text-primary sm:text-5xl">
                News & Updates
              </h1>
              {/* <NewsGrid /> */}
            </div>
          </div>

          <div className="shrink-0 border-t border-gray-200 px-4 py-4 sm:px-4 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
            {/* Right column area */}

            <div className="mx-auto max-w-7xl">
              <div className="relative isolate overflow-hidden bg-gradient-to-br from-gray-900 via-brand-one to-brand-two px-2 py-4 text-center shadow-2xl sm:rounded-xl sm:px-2">
                <h2 className="text-balance text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Ways of working
                </h2>
                <p className="mx-3 mt-4 max-w-xl text-pretty text-lg/8 text-gray-300">
                  Guides, Templates and Tools to help you work smarter.
                </p>
                <div className="mt-4 flex items-center justify-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Get started
                  </a>
                </div>
                {/* <svg
          viewBox="0 0 1024 1024"
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -z-10 w-[64rem] h-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        >
          <circle
            r={512}
            cx={512}
            cy={512}
            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
              <stop stopColor="#0069aa" />
              <stop offset={1} stopColor="#17bebb" />
            </radialGradient>
          </defs>
        </svg> */}
              </div>
            </div>
            <div className="mx-auto max-w-7xl flex flex-col items-center">
              {args.events.map((event: EventCardProps, index: React.Key | null | undefined) => (
                <div key={index} className="py-2 w-full flex justify-center">
                  <EventCard {...event} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
