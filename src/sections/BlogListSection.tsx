import { ImageProps, LinkProps } from '@/common-types'
import { Container } from '@/components/Other/Container'
import { Post } from '@/payload-types'
import { NewsList } from '@/components/Layouts/NewsList'
import { Categories } from '@/components/Menus/Categories'
import { Pagination, Filter } from '@/components/Menus'


export interface BlogProps {
  image: Omit<ImageProps, 'width' | 'height'>
  authors?: { name: string; image: ImageProps }[]
  categories?: string[]
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
  prevPage: number | null
  totalDocs: number | null
  totalPages: number
}

interface CategoryListProps {
  title: string
  links: LinkProps[]
}

export function BlogListSection({ blogs, pages, categories, types }: { blogs: Partial<Post>[]; pages: PagingProps, categories?: CategoryListProps, types: LinkProps[] }) {

  return (
    <section>
      <Container>
        <div className="grid gap-30px lg:grid-cols-[1fr_410px]">
          <div>
          { types && <Filter types={types} />}
          <NewsList blogs={blogs} />
          <Pagination pages={pages} />
          </div>
          <div className="grid gap-30px w-full self-baseline max-md:mx-auto max-md:max-w-[410px] lg:gap-10">
            <div className="lg:-mt-24 w-full">
            { categories && categories.links && <Categories links={categories.links} title={categories.title}/>}
            </div>
            {/* <Tagswidget {...tagwidgetData} /> */}
          </div>
          
        </div>
      </Container>
    </section>
  )
}
