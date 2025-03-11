import { ImageProps } from '@/common-types'
import { Post, User, Media, Category } from '@/payload-types'
import Image from 'next/image'
import { formatDateTimeStringShort } from '@/lib/utils/formatDateTime'

export interface BlogProps {
  image: Omit<ImageProps, 'width' | 'height'>
  authors?: { name: string; profilePicture: ImageProps }[]
  categories?: string[]
  commentCount: string
  title: string
  description: string
  slug: string
  publishedAt: string
  meta: Post['meta']
}

export function NewsList({ blogs, base }: { blogs: Partial<Post>[], base:string }) { 
  return (

          <div>
            {blogs && blogs.length > 0 && (
              <div className="grid gap-10 lg:gap-10 md:grid-cols-2">
                {blogs.map((post, index) => (
                  <NewsItem post={post} id={index} key={index} base={base}/>
                ))}
              </div>
            )}
          </div>
  )
}

const NewsItem = ({ post, id, base }: { post: Partial<Post>; id: number, base: string }) => {
  const { slug, meta, authors, categories, title, publishedAt } = post
  return (
    <article key={id} className="relative isolate flex flex-col gap-8 lg:flex-row">
      <div className="relative aspect-video sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
       
          <Image
            src={(meta?.image as Media)?.url || '/assets/images/brand/cortex-reply-gradient.png'}
            alt={(meta?.image as Media)?.alt || 'Post image'}
            width={850}
            height={575}
            sizes="100vw"
            className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"

          />
        
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-x-4 text-xs">
          <time dateTime={post.publishedAt ?? undefined} className="text-foreground">
            {formatDateTimeStringShort(post.publishedAt ?? '')}
          </time>
          {post.categories && (post.categories as Category[]).map((category: Category, index: number) => (
            <a
              key={index}
              href={`#${category}`}
              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
            >
              {category.title}
            </a>
          ))}

         
        </div>
        <div className="group relative max-w-xl">
          <h3 className="mt-3 text-lg/6 font-semibold text-accent group-hover:text-xl/6">
            <a href={`/${base}/${post.slug}` || '#'}>
              <span className="absolute inset-0" />
              {post.title}
            </a>
          </h3>
          {/* <p className="mt-5 text-sm/6 text-foreground">{post.description}</p> */}
        </div>
        <div className="mt-6 flex flex-wrap lg:border-t gap-y-2 border-gray-200 dark:border-gray-700 pt-6">
          {authors && authors.map((author, index) => (
            <div className="relative flex items-center gap-x-4" key={index}>
              {(author as User).profilePicture ? (
                <img
                  alt={(author as User).name || 'Author'}
                  src={((author as User).profilePicture as Media)?.url || '/assets/images/placeholder.jpg'}
                  className="size-10 rounded-full bg-gray-50"
                />
              ) : (
                <div className="size-10 rounded-full bg-gray-50" />
              )}{' '}
              <div className="text-sm/6">
                <p className="text-foreground  pr-6">
                  <span className="absolute inset-0" />
                  {(author as User).name}
                </p>
                {/* <p className="text-gray-600">{post.author.role}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
