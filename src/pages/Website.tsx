import { Header } from '../components/HeaderFooter'
import { RenderHero } from '@/components/Heros/RenderHero'
import { RenderBlocks } from '@/components/Blocks/RenderBlocks'
import logoLight from '../images/cortex-reply-light.png'
import logoDark from '../images/cortex-reply-dark.png'
import { MainPageSection } from '../sections/MainPageSection'
import { Page } from '@/payload-types'
import { getTableOfContents } from '../utils'

interface WebsiteSectionProps {
  hero: any
  page: Page
  [key: string]: any
}
interface TableOfContentsItem {
  text: string
  id: string // Unique identifier for scrolling
  tag: string // Tag type like "h1", "h2", etc.
}

export default function WebsiteSection({ ...args }: WebsiteSectionProps) {
  const page = args.page

  const { contentWithIds, tableOfContents } = getTableOfContents(page)

  return (
    <div className="flex fixed flex-col w-screen h-screen max-h-screen overflow-auto overscroll-contain">
      <Header isMenuOpen={true} logoLight={logoLight} logoDark={logoDark} />
      <RenderHero {...args.hero} />

      <MainPageSection
        edit={args.edit}
        pageId={args.page.id}
        tableOfContents={tableOfContents}
        relatedContent={args.relatedContent}
      >
        <RenderBlocks blocks={contentWithIds} />
      </MainPageSection>
    </div>
  )
}
