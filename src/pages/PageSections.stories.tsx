import React from 'react'
import Page from './PageSections'
import { Meta, StoryObj } from '@storybook/react'
import { FaInstagram, FaLinkedin } from 'react-icons/fa6'
import logoLight from '../../.storybook/public/cortex-reply-light.png'
import logoDark from '../../.storybook/public/cortex-reply-dark.png'

export default {
  title: 'Pages/PageSections',
  component: Page,
  decorators: [
    (Story: React.FC) => (
      <div className="bg-sidebar">
        <Story />
      </div>
    ),
  ],
  parameters: {
    nextjs: {
      appDirectory: true, // 👈 Set this
    },
    docs: {
      description: {
        component: 'Example page separators.',
      },
    },
  },
}

const Template = (args: any) => <Page {...args} />

type PageStory = StoryObj<typeof Page>

export const Default: PageStory = {
  render: Template,
  args: {
    title: 'Lorem Ipsum',
    subtitle: 'Dolor Sit Amet',
    hero: {
      type: 'dummy',
    },
    footer: {
      className: '',
      logoLight: logoLight,
      logoDark: logoDark,
      footerData: {
        about: {
          description: 'This is a sample description for the about section.',
          socialLinks: [
            {
              icon: <FaLinkedin />,
              href: 'https://www.linkedin.com/company/cortex-reply/',
            },
            {
              icon: <FaInstagram />,
              href: 'https://www.instagram.com/cortex.reply/',
            },
          ],
        },
        columnOne: {
          title: 'Column One',
          links: [
            { href: '/link1', label: 'Link 1' },
            { href: '/link2', label: 'Link 2' },
          ],
        },
        columnTwo: {
          title: 'Contact Us',
          location: '1234 Street Name, City, Country',
          mails: ['contact@example.com', 'support@example.com'],
        },
        columnThree: {
          title: 'Recent Insights',
          blogs: [
            {
              image: {
                src: '/assets/images/blog/blog-sm-1.jpg',
                alt: 'We provide a range of IT solutions',
              },
              title: 'We provide a range of IT solutions',
              date: '2025-01-02T00:00:00.000Z',
              slug: './blog-details',
            },
            {
              image: {
                src: '/assets/images/blog/blog-sm-2.jpg',
                alt: 'IT solutions enhance efficiency',
              },
              title: 'IT solutions enhance efficiency',
              date: '2025-01-02T00:00:00.000Z',
              slug: './blog-details',
            },
          ],
        },
        footerBottom: {
          copyrightText: 'copyright',
          links: [
            {
              label: 'Privacy Policy',
              href: '/privacy-policy',
              openNewTab: false,
            },
            {
              label: 'Contact Us',
              href: '/contact',
              openNewTab: false,
            },
          ],
        },
      },
    },
  },
}

export const LowImpactHero = {
  args: {
    ...Default.args,
    hero: {
      type: 'lowImpact',
      children: <h1 className="text-4xl font-bold">Low Impact Hero</h1>,
    },
  },
}

export const MediumImpactHero = {
  args: {
    ...Default.args,
    hero: {
      type: 'mediumImpact',
      media: 'stock1.jpg?height=400&width=800',
      children: <h1 className="text-4xl font-bold">Medium Impact Hero</h1>,
    },
  },
}

export const HighImpactHero = {
  args: {
    ...Default.args,
    hero: {
      type: 'highImpact',
      children: <h1 className="text-4xl font-bold">High Impact Hero</h1>,
      media: 'stock1.jpg?height=400&width=800',
    },
    heroBackgroundImage: 'stock1.jpg?height=400&width=800',
  },
}

export const PostHero = {
  args: {
    ...Default.args,
    hero: {
      type: 'post',
      children: <h1 className="text-4xl font-bold">Post Hero</h1>,
      media: 'stock1.jpg?height=400&width=800',
    },
    media: 'stock1.jpg?height=400&width=800',
  },
}

export const SectionHero = {
  args: {
    ...Default.args,
    hero: {
      type: 'section',
      children: <h1 className="text-4xl font-bold">Post Hero</h1>,
      media: 'stock1.jpg?height=400&width=800',
    },
    media: 'stock1.jpg?height=400&width=800',
  },
}
