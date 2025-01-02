import { ImageProps, LinkProps } from '@/common-types'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/Other/Container'
import { CustomLink } from '@/components/Other/CustomLink'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Post } from '@/payload-types'
import { cn } from '@/lib/utils/cn'
import Image from 'next/image'
import {
  FaArrowRight,
  // FaMagnifyingGlass,
  // FaRegComments,
  FaRegFolderOpen,
  FaRegUser,
  // FaFacebookF,
  // FaTwitter,
  // FaInstagram,
} from 'react-icons/fa6'
import { formatDateTimeStringShort } from '@/lib/utils/formatDateTime'

export interface BlogProps {
  image: Omit<ImageProps, 'width' | 'height'>
  authors: { name: string; image: ImageProps }[]
  categories: string[]
  commentCount: string
  title: string
  description: string
  slug: string
  publishedAt: string
  meta: Post['meta']
}

type PagingProps = {
  nextPage: number | null
  page: number
  pagingCounter: number
  prevPage: number | null
  totalDocs: number | null
  totalPages: number
}

interface CategoryListProps {
  links: LinkProps[]
}

const categoryListData: CategoryListProps = {
  links: [
    {
      label: 'Genarel consturction',
      href: '',
    },
    {
      label: 'Business Advice',
      href: '',
    },
    {
      label: 'Stock market',
      href: '',
    },
    {
      label: 'Regular start',
      href: '',
    },
    {
      label: 'Regular start',
      href: '',
    },
  ],
}

function CategoryList({ links }: CategoryListProps) {
  return (
    <div className="space-y-5 rounded-5 bg-accent-100 p-8 dark:bg-accent-700 lg:p-10">
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {links && links.length > 0 && (
            <nav aria-label="footer links navigation">
              <ul className="grid gap-2.5 ">
                {links.map((link, index) => (
                  <li key={index} className="flex items-center gap-2.5 pt-2.5 first:pt-0">
                    <span className="grid h-3 w-3 place-items-center border border-accent">
                      <span className="block h-0.5 w-0.5 bg-accent"></span>
                    </span>
                    <CustomLink href={link.href} className={linkClasses}>
                      {link.label}
                    </CustomLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Repeated styles
const paginationItemClasses = cn(
  'grid h-[65px] w-[65px] place-items-center border border-[#3b3b3b] font-secondary text-base font-bold text-foreground rounded-full transition-colors duration-300 hover:bg-accent hover:border-accent hover:text-accent-foreground',
)

const linkClasses = cn('transition-colors duration-400 hover:text-primary ease-in-out')

export function BlogListSection({ blogs, pages }: { blogs: BlogProps[]; pages: PagingProps }) {
  return (
    <section className="section-padding-primary">
      <Container>
        <div className="grid gap-30px lg:grid-cols-[1fr_410px]">
          <div>
            {blogs && blogs.length > 0 && (
              <div className="grid gap-10 lg:gap-20">
                {blogs.map((post, index) => (
                  <BlogItem post={post} id={index} key={index}/>
                ))}

                <div>
                  <ul
                    className="flex flex-wrap items-center justify-center gap-3 md:gap-5"
                    aria-label="pagination"
                  >
                    {Array.from({ length: pages.totalPages }, (_, i) => {
                      if (i < 4 || i === pages.totalPages - 1) {
                        return (
                          <li key={i}>
                            <a
                              className={paginationItemClasses}
                              href="#"
                              aria-label={`pagination button ${i + 1}`}
                              role="button"
                            >
                              {i + 1}
                            </a>
                          </li>
                        )
                      } else if (i === 4) {
                        return (
                          <li key={i}>
                            <span className="pagination-ellipsis">...</span>
                          </li>
                        )
                      }
                      return null
                    })}
                    { pages.totalPages > 4 && (
                    <li>
                      <a
                        className={cn(
                          paginationItemClasses,
                          'border-accent bg-accent text-accent-foreground',
                        )}
                        href="#"
                        aria-label="pagination button"
                        role="button"
                      >
                        <FaArrowRight />
                      </a>
                    </li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="grid gap-30px self-baseline max-md:mx-auto max-md:max-w-[410px] lg:gap-10">
            {/* <Author {...authorData} />
            <SearchBox /> */}
            <CategoryList {...categoryListData} />
            {/* <Tagswidget {...tagwidgetData} /> */}
          </div>
        </div>
      </Container>
    </section>
  )
}

const BlogItem = ({ post, id }: { post: BlogProps; id: number }) => {
  const { slug, image, authors, categories, title, description, publishedAt } = post
  return (
    <article key={id} className="relative isolate flex flex-col gap-8 lg:flex-row">
      <div className="relative aspect-video sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            width={850}
            height={575}
            sizes="100vw"
            className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"

            // className="object-cover transition-transform duration-500 [transform:scale(1.05)] group-hover:[transform:scale(1)]"
          />
        )}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div>
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime={post.publishedAt} className="text-foreground">
            {formatDateTimeStringShort(post.publishedAt)}
          </time>
          {post.categories.map((category: string, index: number) => (
            <a
              key={index}
              href={`#${category}`}
              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
            >
              {category}
            </a>
          ))}

          {/* <a
          href={post.category.href}
          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        >
          {post.category.title}
        </a> */}
        </div>
        <div className="group relative max-w-xl">
          <h3 className="mt-3 text-lg/6 font-semibold text-accent group-hover:text-xl/6">
            <a href={post.slug}>
              <span className="absolute inset-0" />
              {post.title}
            </a>
          </h3>
          <p className="mt-5 text-sm/6 text-foreground">{post.description}</p>
        </div>
        <div className="mt-6 flex flex-wrap lg:border-t gap-y-2 border-gray-200 dark:border-gray-700 pt-6">
          {authors.map((author, index) => (
            <div className="relative flex items-center gap-x-4" key={index}>
              {author.image ? (
                <img
                  alt={author.image.alt}
                  src={author.image.src}
                  className="size-10 rounded-full bg-gray-50"
                />
              ) : (
                <div className="size-10 rounded-full bg-gray-50" />
              )}{' '}
              <div className="text-sm/6">
                <p className="text-foreground  pr-6">
                  <span className="absolute inset-0" />
                  {author.name}
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
