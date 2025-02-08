import React from 'react'

import Website from './Blog'
import { fn } from '@storybook/test'
import { PhoneIcon, PlayCircleIcon, RectangleGroupIcon } from '@heroicons/react/20/solid'
import { ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon } from '@heroicons/react/24/outline'
import { DynamicIcon } from '@/components/Images'
import { Meta, StoryObj } from '@storybook/react'
import pattern1 from '@/images/hero/image-hero1.webp'

const GithubIcon = () => (
  // <FontAwesomeIcon icon={faGithub} size="10x" />
  <DynamicIcon iconName="github" size="4x" type="brands" />
)
const AWSIcon = () => <DynamicIcon iconName="aws" type="brands" />
const AzureIcon = () => <DynamicIcon iconName="azure" type="kit" />
const SolutionIcon = () => <DynamicIcon iconName="people-sharing" size="4x" type="kit" />

const ServiceIcon = () => <DynamicIcon iconName="cloud-network-sharing" size="4x" type="kit" />

const ProductIcon = () => <DynamicIcon iconName="development" size="4x" type="kit" />

export default {
  title: 'Example Pages/Blog',
  component: Website,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true, // 👈 Set this
    },
    docs: {
      description: {
        component: 'Example Blog page.',
      },
    },
  },
  // decorators: [
  //   (Story: React.FC) => (
  //     <div>
  //       <Story />
  //     </div>
  //   ),
  // ],
}

const Template = (args: any) => <Website {...args} />

type PageStory = StoryObj<typeof Website>

export const Default = {
  args: {
    // ...Default.args,
    hero: {
      type: 'postHero',
      post: {
        id: '1',
        title: 'Sample Post Title',
        categories: [
          { id: '1', title: 'Category 1' },
          { id: '2', title: 'Category 2' },
        ],
        meta: {
          image: { url: 'stock1.jpg' },
        },
        populatedAuthors: [
          {
            id: '1',
            name: 'Author 1',
            avatar: {
              id: '1',
              url: '/path/to/avatar1.jpg',
              alt: 'Author 1 Avatar',
            },
          },
          {
            id: '2',
            name: 'Author 2',
            avatar: {
              id: '2',
              url: '/path/to/avatar2.jpg',
              alt: 'Author 2 Avatar',
            },
          },
        ],
        publishedAt: '2023-10-01T12:00:00Z',
        content: 'Sample post content...',
      },
    },
    blog: {
      edit: true,
      categoryList: {
        title: 'Categories',
        links: [
          { label: 'Category 1', href: 1 },
          { label: 'Category 2', href: 2 },
          { label: 'Category 3', href: 3 },
        ],
      },
      page: {
        id: 2,
        title: 'Test Post 2',
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
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras vehicula, libero a pharetra dictum, urna lectus porttitor lacus, at dapibus justo quam vel metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed non velit nec arcu volutpat dignissim in a lorem.',
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
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: null,
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    mode: 'normal',
                    text: 'Proin sagittis sem et elit fringilla, nec fringilla eros maximus. Nulla facilisi. Ut sit amet facilisis lectus. Fusce ornare metus at ante tristique, nec elementum eros fermentum. Integer volutpat magna sed justo tincidunt, sit amet aliquam arcu pellentesque. Phasellus imperdiet mi vitae ligula pharetra, a dignissim velit vehicula.',
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
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: null,
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    mode: 'normal',
                    text: 'Suspendisse potenti. Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: null,
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    mode: 'normal',
                    text: 'Aenean ut ligula ac libero vehicula luctus. Integer ultricies nisl id mi dictum, eget tincidunt augue interdum. Sed eu malesuada erat. Nam fringilla lectus id dolor gravida lacinia. Aliquam erat volutpat. Vestibulum nec ipsum vitae elit dapibus suscipit vel at ipsum.',
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
        relatedPosts: [],
        categories: [
          {
            id: 1,
            title: 'Test Category 1',
            slug: 'test-category-1',
            updatedAt: '2025-01-06T20:16:54.416Z',
            createdAt: '2025-01-06T20:16:54.416Z',
            _status: 'published',
          },
        ],
        meta: { title: 'Test Post 1', image: null, description: null },
        publishedAt: '2025-01-06T20:17:25.595Z',
        authors: [
          {
            id: 1,
            name: 'Rob',
            jobRole: null,
            profilePicture: null,
            workHistory: [],
            certifications: [],
            areasOfExpertise: [],
            dateOfBirth: null,
            joinDate: null,
            role: 'admin',
            sub: null,
            updatedAt: '2025-01-06T20:16:54.416Z',
            createdAt: '2025-01-06T20:16:54.416Z',
            enableAPIKey: null,
            apiKey: null,
            email: 'rob@sdsdd.com',
            loginAttempts: 0,
          },
          {
            id: 2,
            name: 'Dave',
            jobRole: null,
            profilePicture: null,
            workHistory: [],
            certifications: [],
            areasOfExpertise: [],
            dateOfBirth: null,
            joinDate: null,
            role: 'admin',
            sub: null,
            updatedAt: '2025-01-06T20:16:54.416Z',
            createdAt: '2025-01-06T20:16:54.416Z',
            enableAPIKey: null,
            apiKey: null,
            email: 'rob@sdsdd.com',
            loginAttempts: 0,
          },
        ],
        populatedAuthors: [{ id: 1, name: 'Rob Ellison' }],
        publishedToWebsite: false,
        slug: 'test-post-2',
        slugLock: true,
        updatedAt: '2025-01-06T20:17:31.465Z',
        createdAt: '2025-01-06T20:17:27.818Z',
        _status: 'published',
      },
    },
  },
}

export const AReallyLongTitle = {
  args: {
    ...Default.args,
    hero: {
      ...Default.args.hero,
      post: {
        ...Default.args.hero.post,
        title:
          'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      },
    },
  },
}
