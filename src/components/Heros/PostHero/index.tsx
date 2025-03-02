import React from 'react'
import Image from 'next/image'
import { formatDateTime } from '@/lib/utils/formatDateTime'
import { Badge } from '@/components/ui'
import type { Post, Media as MediaType } from '@/payload-types'

interface PostHeroProps {
  post: Post
}

export const PostHero: React.FC<PostHeroProps> = ({ post }) => {
  const { categories, meta, populatedAuthors, publishedAt, title } = post

  return (
    <div className="relative grid">
      <div className="relative z-10 flex flex-col justify-end min-h-[50vh] text-foreground dark:text-foreground pt-24 p-6 lg:p-12">
        <div className="container mx-auto">
          <h1 className="mb-6 text-[clamp(2rem,1.5rem+1.5vw,3.5rem)] font-bold leading-tight ">
            {title}
          </h1>

          <div className="flex flex-col gap-4 md:flex-row md:gap-16 ">
            {populatedAuthors && populatedAuthors.length > 0 && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Author{populatedAuthors.length > 1 ? 's' : ''}</p>
                <p>
                  {populatedAuthors.map((author, index) => (
                    <React.Fragment key={author.id}>
                      {author.name}
                      {index < populatedAuthors.length - 2 && ', '}
                      {index === populatedAuthors.length - 2 &&
                        (populatedAuthors.length > 2 ? ', and ' : ' and ')}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            )}

            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>
                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}

            {categories && categories.length > 0 && (
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Categories</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map(
                    (category, index) =>
                      typeof category === 'object' &&
                      category !== null && (
                        <Badge key={category.id || index} className="px-3 py-1 mx-1">
                          {category.title || 'Untitled category'}
                        </Badge>
                      ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 w-full h-full">
        <Image
          className="object-cover"
          alt={`Cover image for ${title}`}
          src={(meta?.image as MediaType)?.url || '/assets/images/blog/gradient.png'}
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-background dark:from-black to-transparent" />
      </div>
    </div>
  )
}
