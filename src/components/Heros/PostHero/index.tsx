import { formatDateTime } from '@/lib/utils/formatDateTime'
import React from 'react'
import { Badge } from '@/components/ui'
import type { Post, Media as MediaType } from '@/payload-types'

import Image from 'next/image'
export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, meta, populatedAuthors, publishedAt, title } = post

  return (
    <div className="relative flex items-end">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-foreground dark:text-foreground pb-8">
        <div className="col-start-1 col-span-3">
          <h1 className="mb-6 text-[calc(1.5rem+1.5vw)] font-bold">{title}</h1>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            <div className="flex flex-col gap-4">
              {populatedAuthors && (
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>
                  {populatedAuthors.map((author, index) => {
                    const { name } = author

                    const isLast = index === populatedAuthors.length - 1
                    const secondToLast = index === populatedAuthors.length - 2

                    return (
                      <React.Fragment key={index}>
                        {name}
                        {secondToLast && populatedAuthors.length > 2 && (
                          <React.Fragment>, </React.Fragment>
                        )}
                        {secondToLast && populatedAuthors.length === 2 && (
                          <React.Fragment> </React.Fragment>
                        )}
                        {!isLast && populatedAuthors.length > 1 && (
                          <React.Fragment>and </React.Fragment>
                        )}
                      </React.Fragment>
                    )
                  })}
                </div>
              )}
            </div>
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>

                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {categories?.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category
                  const titleToUse = categoryTitle || 'Untitled category'
                  return (
                    <Badge key={index} className="px-3 py-1 mx-1">
                      {titleToUse}
                    </Badge>
                  )
                }
                return null
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="xs:h-[60vh] sm:h-[50vh] md:h-[35vh] lg:h-[30vh] xl:h-[30vh] select-none">
        <div className="absolute inset-0">
          <Image
            className="object-cover"
            alt="Background Image"
            src={(meta && (meta.image as MediaType))?.url || '/assets/images/blog/gradient.png'}
            fill
            priority
          />
        </div>
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-background dark:from-black to-transparent" />
      </div>
    </div>
  )
}
