import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { Footer, type SectionProps } from './Footer'
import { FaInstagram, FaLinkedin } from 'react-icons/fa6'
import logoLight from '../../../.storybook/public/cortex-reply-light.png'
import logoDark from '../../../.storybook/public/cortex-reply-dark.png'

export default {
  title: 'Footer/Footer',
  component: Footer,
  parameters: {
    docs: {
      description: {
        component:
          'A footer component that displays various sections including about, links, and contact information.',
      },
    },
  },
  argTypes: {
    className: { control: 'text' },
    footerData: { control: 'object' },
  },
} as Meta

const Template: StoryFn<SectionProps> = (args) => <Footer {...args} />

export const Default = Template.bind({})
Default.args = {
  className: '',
  logoLight:logoLight,
  logoDark:logoDark,
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
}


export const NoBlog = Template.bind({})
NoBlog.args = {
  className: '',
  logoLight:logoLight,
  logoDark:logoDark,
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
}
