import React from 'react'
import Image from 'next/image'

interface InfoTileProps {
  url?: string
  mainImage?: string
  excerpt?: string
  title: string
  color?: string
}

export function InfoTile(props: InfoTileProps) {
  const { url, mainImage, excerpt, title } = props
  return (
    <div
      key={url}
      className="relative flex flex-col rounded-3xl bg-white p-2 shadow-md shadow-black/5 ring-1 ring-black/5 hover:shadow-lg transition-shadow group"
    >
      {mainImage && (
        <Image
          alt={title || ''}
          src={mainImage}
          layout="responsive"
          width={1170}
          height={780}
          className="rounded-2xl object-cover transform group-hover:scale-95 transition-transform duration-400"
        />
      )}
      <div className="flex flex-1 flex-col p-4">
        {/* <div className="text-sm/5 text-gray-700">
                  {dayjs(post.publishedAt).format('dddd, MMMM D, YYYY')}
                </div> */}
        <div className="mt-2 font-medium text-center group-hover:scale-110 transition-transform duration-400 ease-in-out text-foreground dark:text-background group-hover:text-accent">
          <a href={url}>
            <span className="absolute inset-0" />
            {title}
          </a>
        </div>
        {excerpt && <div className="mt-2 flex-1 text-sm/6 text-gray-500">{excerpt}</div>}
        {/* {post.author && (
                  <div className="mt-6 flex items-center gap-3">
                    {post.author.image && (
                      <img
                        alt=""
                        src={image(post.author.image).size(64, 64).url()}
                        className="aspect-square size-6 rounded-full object-cover"
                      />
                    )}
                    <div className="text-sm/5 text-gray-700">
                      {post.author.name}
                    </div>
                  </div>
                )} */}
      </div>
    </div>
  )
}
