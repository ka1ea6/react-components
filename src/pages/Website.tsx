import { Header } from '../components/HeaderFooter'
import { RenderHero } from '@/components/Heros/RenderHero'
import { RenderBlocks } from '@/components/Blocks/RenderBlocks'
import logoLight from '../images/cortex-reply-light.png'
import logoDark from '../images/cortex-reply-dark.png'
import { MainPageSection } from '../sections/MainPageSection'
import { Page as PageType, ReusableContent } from '@/payload-types'
import { getTableOfContents } from '../utils'

interface WebsiteSectionProps {
  hero: any
  page: PageType
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
  console.log('contentWithIds', contentWithIds)
  const temp = [
    {
      id: '67a8fefea2a234ac414429cd',
      reusableContent: {
        id: 1,
        title: 'Test Content',
        hero: { type: 'lowImpact', richText: null, links: [], media: null },
        layout: [
          {
            id: '67a8f0fca2a234ac414429c9',
            title: null,
            description: null,
            blockName: null,
            features: [
              {
                id: '67a8f0ffa2a234ac414429cb',
                title: 'Test Feature',
                statistic: '80%',
                content: {
                  root: {
                    type: 'root',
                    format: '',
                    indent: 0,
                    version: 1,
                    children: [
                      {
                        type: 'paragraph',
                        format: '',
                        indent: 0,
                        version: 1,
                        children: [
                          {
                            mode: 'normal',
                            text: 'Some text here!',
                            type: 'text',
                            style: '',
                            detail: 0,
                            format: 0,
                            version: 1,
                          },
                        ],
                        direction: 'ltr',
                        textStyle: '',
                        textFormat: 0,
                      },
                    ],
                    direction: 'ltr',
                  },
                },
                settings: { card: 'default', contents: 'statistic' },
                link: { type: 'none', newTab: null, url: null },
                icon: { type: 'fa-thin', icon: 'cloud' },
              },
            ],
            blockType: 'features',
            theme: {
              settings: {
                theme: 'default',
                background: 'transparent',
                image: null,
                overlay: null,
              },
            },
          },
        ],
        meta: { title: null, image: null, description: null },
        publishedAt: '2025-02-09T18:16:45.035Z',
        links: [],
        slug: 'test-content',
        slugLock: true,
        updatedAt: '2025-02-09T18:24:42.287Z',
        createdAt: '2025-02-09T18:16:45.034Z',
      },
      customId: null,
      blockName: 'About Reply',
      blockType: 'reusableContentBlock',
    },
  ]
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
        {/* <RenderBlocks blocks={temp as PageType['layout']} /> */}

        {/* <RenderBlocks blocks={args.page.layout} /> */}
      </MainPageSection>



    </div>
  )
}
