// ExampleComponent.tsx

import * as React from 'react'

interface TextAndImagesProps {
  title: string
  subtitle: string
  description: string
  missionTitle: string
  missionDescription: string
  images: string[]
  raisedAmount: string
  companiesCount: string
  dealsClosed: string
  leadsGenerated: string
}

export function TextAndImages({
  title,
  subtitle,
  description,
  missionTitle,
  missionDescription,
  images,
  raisedAmount,
  companiesCount,
  dealsClosed,
  leadsGenerated,
}: TextAndImagesProps) {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="max-w-4xl">
          <p className="text-base/7 font-semibold text-indigo-600">{subtitle}</p>
          <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-balance text-xl/8 text-gray-700">{description}</p>
        </div>
        <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
          <div className="lg:pr-8">
            <h2 className="text-pretty text-2xl font-semibold tracking-tight text-gray-900">
              {missionTitle}
            </h2>
            <p className="mt-6 text-base/7 text-gray-600">{missionDescription}</p>
          </div>
          <div className="pt-16 lg:row-span-2 lg:-mr-16 xl:mr-auto">
            <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
              {images.map((src, index) => (
                <div
                  key={index}
                  className={`aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10`}
                >
                  <img alt="" src={src} className="block size-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          <div className="max-lg:mt-16 lg:col-span-1">
            <p className="text-base/7 font-semibold text-gray-500">The numbers</p>
            <hr className="mt-6 border-t border-gray-200" />
            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
                <dt className="text-sm/6 text-gray-600">Raised</dt>
                <dd className="order-first text-6xl font-semibold tracking-tight">
                  ${raisedAmount}
                </dd>
              </div>
              <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
                <dt className="text-sm/6 text-gray-600">Companies</dt>
                <dd className="order-first text-6xl font-semibold tracking-tight">
                  {companiesCount}K
                </dd>
              </div>
              <div className="flex flex-col gap-y-2 max-sm:border-b max-sm:border-dotted max-sm:border-gray-200 max-sm:pb-4">
                <dt className="text-sm/6 text-gray-600">Deals Closed</dt>
                <dd className="order-first text-6xl font-semibold tracking-tight">
                  {dealsClosed}M
                </dd>
              </div>
              <div className="flex flex-col gap-y-2">
                <dt className="text-sm/6 text-gray-600">Leads Generated</dt>
                <dd className="order-first text-6xl font-semibold tracking-tight">
                  {leadsGenerated}M
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </div>
  )
}
