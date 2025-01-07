import { ImageProps, LinkProps, SocialItemProps, blurDataUrl } from '@/common-types'
// import { Button } from '@/src/components/button'
import { Container } from '@/components/Other/Container'
import { CustomLink } from '@/components/Other/CustomLink'
// import { TextInput } from '@/src/components/inputs/text-input'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { FaRegFolderOpen, FaRegUser } from 'react-icons/fa6'
import { Post as PayloadPost, Media, User, Category } from '@/payload-types'
import { RichText } from '@/components/Payload/RichText'
import { notFound } from 'next/navigation'
import { Categories } from '@/components/Menus/Categories'

interface AuthorProps {
  image: Omit<ImageProps, 'width' | 'height'>
  name: string
  about: string
  socialLinks: SocialItemProps[]
}

function Author({ image, name, about, socialLinks }: AuthorProps) {
  return (
    <div className="space-y-5 rounded-5 bg-accent-100 p-8 text-center dark:bg-accent-700 lg:p-10">
      {image && image.src && (
        <Image
          src={image.src}
          alt={image.alt || name}
          width={127}
          height={127}
          placeholder="blur"
          blurDataURL={blurDataUrl}
          className="mx-auto rounded-full object-cover"
        />
      )}
      <h3 className="font-secondary text-lg font-bold leading-[1.25] text-accent dark:text-white md:text-xl">
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
    </div>
  )
}

export interface CategoryListProps {
  title: string
  links: LinkProps[]
}

// const categoryListData: CategoryListProps = {
//   links: [
//     {
//       label: 'Genarel consturction',
//       href: '',
//     },
//     {
//       label: 'Business Advice',
//       href: '',
//     },
//     {
//       label: 'Stock market',
//       href: '',
//     },
//     {
//       label: 'Regular start',
//       href: '',
//     },
//     {
//       label: 'Regular start',
//       href: '',
//     },
//   ],
// }

// function CategoryList({ links }: CategoryListProps) {
//   return (
//     <div className="space-y-5 rounded-5 p-8 lg:p-10">
//       <h3 className="font-secondary text-md font-bold leading-[1.25] text-accent md:text-lg">
//         Category
//       </h3>
//       {links && links.length > 0 && (
//         <nav aria-label="footer links navigation">
//           <ul className="grid gap-2.5 divide-y divide-accent/20 dark:divide-accent/20">
//             {links.map((link, index) => (
//               <li key={index} className="flex items-center gap-2.5 pt-2.5 first:pt-0">
//                 <span className="grid h-3 w-3 place-items-center border border-accent">
//                   <span className="block h-0.5 w-0.5 bg-accent"></span>
//                 </span>
//                 <CustomLink
//                   href={link.href}
//                   className="transition-colors duration-300 hover:text-primary"
//                 >
//                   {link.label}
//                 </CustomLink>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       )}
//     </div>
//   )
// }

const linkClasses = cn('transition-colors duration-400 hover:text-primary ease-in-out inline')

// const inputBoxClasses = cn(
//   'focus:border-primary dark:focus:border-primary focus:border-opacity-100 dark:focus:border-opacity-100',
// )

export function BlogDetail({
  page,
  categoryList,
  //   author,
}: {
  page: PayloadPost
  categoryList: CategoryListProps
  //   author: AuthorProps
}) {
  if (!page) {
    return notFound()
  }
  const { meta, populatedAuthors, authors, categories, content, title } = page
  const blog = {
    image: {
      src: (meta && meta.image && (meta.image as Media).url) || undefined,
      // src: page.meta?.image?.url || undefined,
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
    <section className="section-padding-primary">
      <Container>
        <div className="grid gap-30px lg:grid-cols-[1fr_410px]">
          <div>
            <div className="[&_p+P]:mt-4">
              {blog.image && blog.image.src && (
                <Image
                  src={blog.image.src}
                  alt={blog.image.alt || title}
                  width={850}
                  height={538}
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                  sizes="100vw"
                />
              )}
              {/* Meta  */}
              <ul
                aria-label="blog meta list"
                className="mb-4 mt-6 flex flex-wrap items-center gap-x-[1.125rem] gap-y-2 lg:mb-5 lg:mt-30px"
              >
                <li className="flex items-center gap-2.5">
                  <span className="flex-none text-sm text-accent">
                    <FaRegUser />
                  </span>
                  <span>
                    <CustomLink href="#" className={linkClasses}>
                      {blog.authorName}
                    </CustomLink>
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex-none text-sm text-accent">
                    {blog.category && blog.category.length > 0 && <FaRegFolderOpen />}
                  </span>
                  {blog.category &&
                    (blog.category as Category[]).map((cat, index) => (
                      <CustomLink key={index} href="#" className={linkClasses}>
                        {cat.title}
                      </CustomLink>
                    ))}
                </li>
              </ul>

              <div className="my-4 h-px bg-body/30 lg:my-5"></div>

              <RichText content={content} enableGutter={false} />
            </div>
          </div>
          <div className="grid gap-30px self-baseline max-md:mx-auto max-md:max-w-[410px] lg:gap-10">
            {authorMap && authorMap.map((author, index) => <Author key={index} {...author} />)}

            {/* <Author {...author} /> */}
            {/* <SearchBox /> */}
            {categoryList && categoryList.links && (
              <div className="rounded-5 px-8 pt-0 lg:px-10">
                <Categories links={categoryList.links} title={categoryList.title} />
              </div>
            )}
            {/* <CategoryList {...categoryListData} /> */}
            {/* <Tagswidget {...tagwidgetData} /> */}
          </div>
        </div>
      </Container>
    </section>
  )
}
