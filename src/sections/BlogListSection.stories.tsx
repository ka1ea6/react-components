import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { BlogListSection, type BlogProps } from './BlogListSection'

export default {
  title: 'Sections/BlogListSection',
  component: BlogListSection,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component:
          'A card component that displays a service with an icon, title, description, and a link.',
      },
    },
  },
  argTypes: {
    icon: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    slug: { control: 'text' },
  },
  decorators: [
    (Story) => (
      // <div className="bg-white dark:bg-gray-900 p-4">
      <Story />
      // </div>
    ),
  ],
} as Meta

const Template = (args: { blogs: BlogProps[] }) => <BlogListSection {...args} />

export const Default = Template.bind({})
Default.args = {
  blogs: [
    {
      slug: '/blog/pioneering-progress',
      image: {
        src: '/assets/images/blog/blog-lg-1.png',
        alt: 'Pioneering Progress, One Algorithm at a Time',
      },
      authors: [ { name: 'admin with a long name'}, { name: 'demo'}],
      categories: ['Technology', 'Other'],
      publishedAt: new Date(),
      commentCount: '05',
      title: 'Pioneering Progress, One Algorithm at a Time',
      description:
        'Aliquam eros justo, posuere lobortis non, viverra laoreet augue mattis start fermentum ullamcorper viverra laoreet. By Admin. Technology. 28th February 2022. Leave a comment.',
    },
    {
      slug: '/blog/innovative-solutions',
      image: {
        src: '/assets/images/blog/blog-lg-2.png',
        alt: 'Innovative Solutions for Modern Problems',
      },
      authors: [ { name: 'admin'}, { name: 'demo'}],
      publishedAt: new Date(),
      categories: ['Technology', 'Other'],
      commentCount: '10',
      title: 'Innovative Solutions for Modern Problems',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. By John Doe. Innovation. 15th March 2022. Leave a comment.',
    },
    {
      slug: '/blog/future-of-tech',
      image: {
        src: '/assets/images/blog/blog-lg-3.png',
        alt: 'The Future of Technology',
      },
      authors: [ { name: 'admin'}, { name: 'demo'}],
      publishedAt: new Date(),
      categories: ['Technology', 'Other'],
      commentCount: '08',
      title: 'The Future of Technology',
      description:
        'Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. By Jane Doe. Future. 22nd April 2022. Leave a comment.',
    },
  ],
}
