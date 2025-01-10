import { ImageProps, LinkProps, SocialItemProps, blurDataUrl } from '@/common-types'
import { Container } from '@/components/Other/Container'
import { CustomLink } from '@/components/Other/CustomLink'
import Image from 'next/image'
import { Post as PayloadPost, Media, User } from '@/payload-types'
import { RichText } from '@/components/Payload/RichText'
import { notFound } from 'next/navigation'
import { Categories } from '@/components/Menus/Categories'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
interface AuthorProps {
  image: Omit<ImageProps, 'width' | 'height'>
  name: string
  about: string
  socialLinks: SocialItemProps[]
}

function Author({ image, name, about, socialLinks }: AuthorProps) {
  return (
    <div className="mt-1 z-10 px-0 pt-0 lg:px-10">
      <Card>
        <CardContent>
          {image && image.src && (
            <Image
              src={image.src}
              alt={image.alt || name}
              width={127}
              height={127}
              placeholder="blur"
              blurDataURL={blurDataUrl}
              className="mx-auto mt-6 rounded-full object-cover"
            />
          )}

          <h3 className="font-secondary text-center py-2 text-lg font-bold leading-[1.25] text-accent dark:text-white md:text-xl">
            {name}
          </h3>
          <p>{about}</p>
          {socialLinks && socialLinks.length > 0 && (
            <nav aria-label="social links">
              <ul className="inline-flex items-center divide-x  divide-accent/50 text-accent dark:divide-accent/50  dark:text-white">
                {socialLinks.map((socialLink, index) => (
                  <li key={index}>
                    <CustomLink
                      href={socialLink.href}
                      openNewTab
                      className="block px-4 text-base/[1.75] transition-transform duration-350 hover:-translate-y-1 hover:text-accents"
                    >
                      <span>{socialLink.icon}</span>
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

export interface CategoryListProps {
  title: string
  links: LinkProps[]
}

export function BlogDetail({
  page,
  categoryList,
  edit = false,
  path = '/admin/collections/posts/',
}: {
  page: PayloadPost
  categoryList: CategoryListProps
  edit?: boolean
  path?: string
}) {
  if (!page) {
    return notFound()
  }
  const { meta, populatedAuthors, authors, categories, content, title } = page
  const blog = {
    image: {
      src: (meta && meta.image && (meta.image as Media).url) || undefined,
      alt: (meta && meta.image && (meta.image as Media).alt) || undefined,
    },
    authorName: populatedAuthors?.[0]?.name || '',
    category: categories,
    commentCount: 0,
    title: title,
    description: meta?.description || '',
  }

  const authorMap = authors?.map((author) => ({
    name: (author as User).name || '',
    about: '',
    image: {
      src:
        ((author as User).profilePicture &&
          ((author as User).profilePicture as Media).sizes?.small?.url) ||
        '/assets/images/blog/author-1.png',
      alt: (author as User).name || 'blog author',
    },
    socialLinks: [],
  }))

  return (
    <Container>
      <div className="grid gap-30px lg:grid-cols-[1fr_410px]">
        <div>
          <div className="[&_p+P]:mt-4">
            <div className="my-4 h-px bg-body/30 lg:my-5"></div>

            <RichText content={content} enableGutter={false} />
          </div>
        </div>
        <div className="grid gap-30px self-baseline max-md:mx-auto max-md:max-w-[410px] lg:gap-10">
          {edit && (
            <div className="mt-4 lg:-mt-10 z-10 px-0 pt-0 lg:px-10">
              <Card>
                <CardHeader>
                  <CardTitle>CMS Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">Edit this page in the CMS</p>
                  <Link href={`${path}${page.id}`}>
                    <Button className="w-full">Edit</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}
          {authorMap && authorMap.map((author, index) => <Author key={index} {...author} />)}
          {categoryList && categoryList.links && (
            <div className="mt-4 px-0 pt-0 lg:px-10">
              <Categories links={categoryList.links} title={categoryList.title} />
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
