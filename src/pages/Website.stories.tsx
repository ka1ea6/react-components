import React from 'react'

import Website from './Website'
import { fn } from '@storybook/test'
import { PhoneIcon, PlayCircleIcon, RectangleGroupIcon } from '@heroicons/react/20/solid'
import { ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon } from '@heroicons/react/24/outline'
import { DynamicIcon } from '@/components/Images'
import { Meta, StoryObj } from '@storybook/react'
import pattern1 from '@/images/hero/image-hero1.webp'
import { AOSInit } from '@/lib/utils/AOSInit'
import { ImageTest, BlocksTest, HeroTest, PagesTest } from '../tests/payload'
import logoLight from '../../.storybook/public/cortex-reply-light.png'
import logoDark from '../../.storybook/public/cortex-reply-dark.png'
import { FaInstagram, FaLinkedin } from 'react-icons/fa6'

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
  title: 'Example Pages/Website',
  component: Website,
  // decorators: [
  //   (Story: React.FC) => (
  //     <div>
  //       <Story />
  //     </div>
  //   ),
  // ],
}

const Template = (args: any) => (
  <>
    <Website {...args} />
  </>
)

type PageStory = StoryObj<typeof Website>

export const Default: PageStory = {
  render: Template,
  args: {
    title: 'Demo Page 1',
    section: 'Demo',
    description: 'Aenean ut ligula ac libero vehicula luctus',
    children: (
      <div className="prose max-w-none">
        <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
        <div className="aspect-video overflow-hidden rounded-lg bg-slate-100">
          <div className="flex h-full items-center justify-center">Video Placeholder</div>
        </div>
        <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vivamus lacinia odio vitae vestibulum vestibulum. Cras vehicula, libero a pharetra dictum,
          urna lectus porttitor lacus, at dapibus justo quam vel metus. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas. Sed non velit nec arcu
          volutpat dignissim in a lorem.
        </p>
        <p>
          Proin sagittis sem et elit fringilla, nec fringilla eros maximus. Nulla facilisi. Ut sit
          amet facilisis lectus. Fusce ornare metus at ante tristique, nec elementum eros fermentum.
          Integer volutpat magna sed justo tincidunt, sit amet aliquam arcu pellentesque. Phasellus
          imperdiet mi vitae ligula pharetra, a dignissim velit vehicula.
        </p>
        <p>
          Suspendisse potenti. Donec malesuada arcu at velit laoreet convallis. Sed at eros vel
          lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero
          convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis
          sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum
          felis.
        </p>
        <p>
          Aenean ut ligula ac libero vehicula luctus. Integer ultricies nisl id mi dictum, eget
          tincidunt augue interdum. Sed eu malesuada erat. Nam fringilla lectus id dolor gravida
          lacinia. Aliquam erat volutpat. Vestibulum nec ipsum vitae elit dapibus suscipit vel at
          ipsum.
        </p>
        <div className="aspect-video overflow-hidden rounded-lg bg-slate-100">
          <div className="flex h-full items-center justify-center">Video Placeholder</div>
        </div>
        <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
        <div className="aspect-video overflow-hidden rounded-lg bg-slate-100">
          <div className="flex h-full items-center justify-center">Video Placeholder</div>
        </div>
      </div>
    ),
    header: {
      menuItems: [
        {
          name: 'Documentation',
          items: [
            {
              name: 'Platforms & Services',
              description: 'Cloud services',
              href: '#',
              icon: ServiceIcon, // Pass the component, not <ChartPieIcon />
            },
            {
              name: 'Solutions & Propositions',
              description: 'Solutions that we have built',
              href: '#',
              icon: SolutionIcon,
            },
            {
              name: 'Products',
              description: 'Products that we sell',
              href: '#',
              icon: ProductIcon,
            },
          ],
        },
        {
          name: 'Resources',
          items: [
            { name: 'Documentation', href: '#', icon: ChartPieIcon },
            { name: 'API Reference', href: '#', icon: CursorArrowRaysIcon },
            { name: 'Github', href: '#', icon: GithubIcon },
          ],
          actions: [
            { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
            { name: 'Contact sales', href: '#', icon: PhoneIcon },
            { name: 'View all products', href: '#', icon: RectangleGroupIcon },
          ],
        },
        {
          name: 'Intranet',
          href: '#',
        },
      ],
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
    hero: {
      type: 'lowImpact',

      richText: {
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
                  text: 'Test Hero Text',
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

      links: [],
      media: null,
    },
    page: {
      id: 1,
      title: 'Demo Page 1',

      hero: {
        type: 'lowImpact',

        richText: {
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
                    text: 'Test Hero Text',
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

        links: [],
        media: null,
      },

      layout: [
        {
          id: '67a74c276365f244c8b6d149',
          blockName: null,

          columns: [
            {
              id: '67a74ea16365f244c8b6d14b',
              size: 'oneThird',

              richText: {
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
                  ],
                  direction: 'ltr',
                },
              },
              enableLink: null,

              link: {
                type: 'reference',
                newTab: null,
                url: null,
                label: null,
                appearance: 'default',
              },
            },
          ],
          blockType: 'content',

          theme: {
            settings: {
              theme: 'light',
              // background: 'image',
              // overlay: true,
              // image: {
              //   id: 1,
              //   alt: null,
              //   prefix: 'media',
              //   updatedAt: '2025-02-08T12:27:55.461Z',
              //   createdAt: '2025-02-08T12:27:55.461Z',
              //   url: '/stock1.jpg',
              //   thumbnailURL: '/stock1.jpg',
              //   filename: 'stock1.jpg',
              //   mimeType: 'image/jpeg',
              //   filesize: 346701,
              //   width: 2190,
              //   height: 1369,
              //   focalX: 50,
              //   focalY: 50,

              //   sizes: {
              //     thumbnail: {
              //       url: '/api/media/file/etpN-LCfCvz_906z2BUPn-300x188.jpg',
              //       width: 300,
              //       height: 188,
              //       mimeType: 'image/jpeg',
              //       filesize: 15812,
              //       filename: 'etpN-LCfCvz_906z2BUPn-300x188.jpg',
              //     },

              //     square: {
              //       url: '/api/media/file/etpN-LCfCvz_906z2BUPn-500x500.jpg',
              //       width: 500,
              //       height: 500,
              //       mimeType: 'image/jpeg',
              //       filesize: 51438,
              //       filename: 'etpN-LCfCvz_906z2BUPn-500x500.jpg',
              //     },

              //     small: {
              //       url: '/api/media/file/etpN-LCfCvz_906z2BUPn-600x375.jpg',
              //       width: 600,
              //       height: 375,
              //       mimeType: 'image/jpeg',
              //       filesize: 46315,
              //       filename: 'etpN-LCfCvz_906z2BUPn-600x375.jpg',
              //     },

              //     medium: {
              //       url: '/api/media/file/etpN-LCfCvz_906z2BUPn-900x563.jpg',
              //       width: 900,
              //       height: 563,
              //       mimeType: 'image/jpeg',
              //       filesize: 88535,
              //       filename: 'etpN-LCfCvz_906z2BUPn-900x563.jpg',
              //     },

              //     large: {
              //       url: '/api/media/file/etpN-LCfCvz_906z2BUPn-1400x875.jpg',
              //       width: 1400,
              //       height: 875,
              //       mimeType: 'image/jpeg',
              //       filesize: 172764,
              //       filename: 'etpN-LCfCvz_906z2BUPn-1400x875.jpg',
              //     },

              //     xlarge: {
              //       url: '/api/media/file/etpN-LCfCvz_906z2BUPn-1920x1200.jpg',
              //       width: 1920,
              //       height: 1200,
              //       mimeType: 'image/jpeg',
              //       filesize: 279466,
              //       filename: 'etpN-LCfCvz_906z2BUPn-1920x1200.jpg',
              //     },
              //   },
              // },
            },
          },
        },

        {
          id: '67a74edb6365f244c8b6d14d',

          media: {
            id: 2,
            alt: null,
            prefix: 'media',
            updatedAt: '2025-02-08T12:32:42.621Z',
            createdAt: '2025-02-08T12:32:42.621Z',
            url: '/stock1.jpg',
            thumbnailURL: '/api/media/file/Fayy0Ql49FqefU1Rv1Vg1-300x169.jpg',
            filename: 'Fayy0Ql49FqefU1Rv1Vg1.jpg',
            mimeType: 'image/jpeg',
            filesize: 174350,
            width: 2309,
            height: 1299,
            focalX: 50,
            focalY: 50,

            sizes: {
              thumbnail: {
                url: '/api/media/file/Fayy0Ql49FqefU1Rv1Vg1-300x169.jpg',
                width: 300,
                height: 169,
                mimeType: 'image/jpeg',
                filesize: 9560,
                filename: 'Fayy0Ql49FqefU1Rv1Vg1-300x169.jpg',
              },

              square: {
                url: '/api/media/file/Fayy0Ql49FqefU1Rv1Vg1-500x500.jpg',
                width: 500,
                height: 500,
                mimeType: 'image/jpeg',
                filesize: 29650,
                filename: 'Fayy0Ql49FqefU1Rv1Vg1-500x500.jpg',
              },

              small: {
                url: '/api/media/file/Fayy0Ql49FqefU1Rv1Vg1-600x338.jpg',
                width: 600,
                height: 338,
                mimeType: 'image/jpeg',
                filesize: 26905,
                filename: 'Fayy0Ql49FqefU1Rv1Vg1-600x338.jpg',
              },

              medium: {
                url: '/api/media/file/Fayy0Ql49FqefU1Rv1Vg1-900x506.jpg',
                width: 900,
                height: 506,
                mimeType: 'image/jpeg',
                filesize: 48121,
                filename: 'Fayy0Ql49FqefU1Rv1Vg1-900x506.jpg',
              },

              large: {
                url: '/api/media/file/Fayy0Ql49FqefU1Rv1Vg1-1400x788.jpg',
                width: 1400,
                height: 788,
                mimeType: 'image/jpeg',
                filesize: 87354,
                filename: 'Fayy0Ql49FqefU1Rv1Vg1-1400x788.jpg',
              },

              xlarge: {
                url: '/api/media/file/Fayy0Ql49FqefU1Rv1Vg1-1920x1080.jpg',
                width: 1920,
                height: 1080,
                mimeType: 'image/jpeg',
                filesize: 133780,
                filename: 'Fayy0Ql49FqefU1Rv1Vg1-1920x1080.jpg',
              },
            },
          },
          blockName: null,
          blockType: 'mediaBlock',
        },

        {
          id: '67a74ef36365f244c8b6d14f',
          title: 'Test Feature',
          description: null,
          blockName: null,

          features: [
            {
              id: '67a74efc6365f244c8b6d151',
              title: 'Feature 1',

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
                  ],
                  direction: 'ltr',
                },
              },

              link: {
                type: 'none',
                newTab: null,
                url: null,
              },

              icon: {
                type: 'fa-thin',
                icon: 'cloud',
              },
            },

            {
              id: '67a74f116365f244c8b6d153',
              title: 'Feature 2',

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
                  ],
                  direction: 'ltr',
                },
              },

              link: {
                type: 'none',
                newTab: null,
                url: null,
              },

              icon: {
                type: 'fa-thin',
                icon: 'user',
              },
            },

            {
              id: '67a74f246365f244c8b6d155',
              title: 'Feature 3',

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
                  ],
                  direction: 'ltr',
                },
              },

              link: {
                type: 'none',
                newTab: null,
                url: null,
              },

              icon: {
                type: 'fa-thin',
                icon: 'space',
              },
            },
          ],
          blockType: 'features',

          theme: {
            settings: {
              theme: 'dark',
              background: 'solid',
            },
          },
        },
        {
          id: '67a74c276365f244c8b6d149',
          blockName: 'light,background theme',

          columns: [
            {
              id: '67a74ea16365f244c8b6d14b',
              size: 'full',

              richText: {
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
                  ],
                  direction: 'ltr',
                },
              },
              enableLink: null,

              link: {
                type: 'reference',
                newTab: null,
                url: null,
                label: null,
                appearance: 'default',
              },
            },
          ],
          blockType: 'content',

          theme: {
            settings: {
              theme: 'light',
              background: 'image',

              image: {
                id: 1,
                alt: null,
                prefix: 'media',
                updatedAt: '2025-02-08T12:27:55.461Z',
                createdAt: '2025-02-08T12:27:55.461Z',
                url: '/stock1.jpg',
                thumbnailURL: '/stock1.jpg',
                filename: 'stock1.jpg',
                mimeType: 'image/jpeg',
                filesize: 346701,
                width: 2190,
                height: 1369,
                focalX: 50,
                focalY: 50,

                sizes: {
                  thumbnail: {
                    url: '/api/media/file/etpN-LCfCvz_906z2BUPn-300x188.jpg',
                    width: 300,
                    height: 188,
                    mimeType: 'image/jpeg',
                    filesize: 15812,
                    filename: 'etpN-LCfCvz_906z2BUPn-300x188.jpg',
                  },

                  square: {
                    url: '/api/media/file/etpN-LCfCvz_906z2BUPn-500x500.jpg',
                    width: 500,
                    height: 500,
                    mimeType: 'image/jpeg',
                    filesize: 51438,
                    filename: 'etpN-LCfCvz_906z2BUPn-500x500.jpg',
                  },

                  small: {
                    url: '/api/media/file/etpN-LCfCvz_906z2BUPn-600x375.jpg',
                    width: 600,
                    height: 375,
                    mimeType: 'image/jpeg',
                    filesize: 46315,
                    filename: 'etpN-LCfCvz_906z2BUPn-600x375.jpg',
                  },

                  medium: {
                    url: '/api/media/file/etpN-LCfCvz_906z2BUPn-900x563.jpg',
                    width: 900,
                    height: 563,
                    mimeType: 'image/jpeg',
                    filesize: 88535,
                    filename: 'etpN-LCfCvz_906z2BUPn-900x563.jpg',
                  },

                  large: {
                    url: '/api/media/file/etpN-LCfCvz_906z2BUPn-1400x875.jpg',
                    width: 1400,
                    height: 875,
                    mimeType: 'image/jpeg',
                    filesize: 172764,
                    filename: 'etpN-LCfCvz_906z2BUPn-1400x875.jpg',
                  },

                  xlarge: {
                    url: '/api/media/file/etpN-LCfCvz_906z2BUPn-1920x1200.jpg',
                    width: 1920,
                    height: 1200,
                    mimeType: 'image/jpeg',
                    filesize: 279466,
                    filename: 'etpN-LCfCvz_906z2BUPn-1920x1200.jpg',
                  },
                },
              },
            },
          },
        },
        {
          id: '67a7859083ee5e530f094671',
          blockName: 'last',

          columns: [
            {
              id: '67a7859883ee5e530f094673',
              size: 'full',

              richText: {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,

                  children: [
                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Suspendisse potenti. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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
                      tag: 'h3',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Sed at eros vel lacus varius varius nec id metus. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Duis sed nisl euismod, ullamcorper augue at.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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
              enableLink: null,

              link: {
                type: 'reference',
                newTab: null,
                url: null,
                label: null,
                appearance: 'default',
              },
            },
          ],
          blockType: 'content',

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

      meta: {
        title: null,
        image: null,
        description: null,
      },
      publishedAt: '2025-02-08T12:21:09.440Z',

      links: [],
      slug: 'demo-page-1',
      slugLock: true,
      parent: null,

      breadcrumbs: [
        {
          id: '67a74fd4738d7abda09e2fc2',
          doc: 1,
          url: null,
          label: 'Demo Page 1',
        },
      ],
      updatedAt: '2025-02-08T12:36:36.948Z',
      createdAt: '2025-02-08T12:20:41.149Z',
      _status: 'published',
    },
    edit: true,
  },
}

export const LowImpactHero = {
  args: {
    ...Default.args,
    hero: {
      type: 'lowImpact',
      children: <h1 className="text-4xl font-bold">Low Impact Hero</h1>,
    },
    heroBackgroundImage: 'stock1.jpg?height=400&width=800',
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
    heroBackgroundImage: 'stock1.jpg?height=400&width=800',
  },
}

export const HighImpactHero = {
  args: {
    ...Default.args,
    hero: HeroTest.highImpactSimple,
    media: 'stock1.jpg?height=400&width=800',
  },
}

export const PostHero = {
  args: {
    ...Default.args,
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
  },
}

export const SectionHero = {
  args: {
    ...Default.args,
    hero: {
      type: 'sectionHero',
      image: pattern1,
      title: 'Services',
      breadcrumbItems: [
        {
          label: 'Home',
          href: '/',
        },
        {
          label: 'Service',
        },
      ],
    },
  },
}

export const RandomText = {
  args: {
    ...Default.args,
    hero: {
      type: 'mediumImpact',
      media: 'stock1.jpg?height=400&width=800',
      children: <h1 className="text-4xl font-bold">Medium Impact Hero</h1>,
    },
    relatedContent: [
      {
        title: 'Related Links',
        links: [
          { title: 'Employee Handbook', url: '/handbook' },
          { title: 'IT Support', url: '/it-support' },
          { title: 'HR Portal', url: '/hr' },
          { title: 'Company Directory', url: '/directory' },
        ],
      },
    ],
    page: {
      id: 19,
      title: 'Test Page',

      hero: {
        type: 'highImpact',

        richText: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,

            children: [
              {
                tag: 'h1',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'Sed non velit nec arcu volutpat dignissim in a lorem.',
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
        links: [],

        media: {
          id: 34,
          alt: 'Global digital mesh network',
          prefix: 'media',
          updatedAt: '2025-01-08T23:05:26.243Z',
          createdAt: '2025-01-08T23:05:26.243Z',
          url: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF.jpg',
          thumbnailURL: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF-300x200.jpg',
          filename: 'a-Ht-M8SAwtqOdjTkdVwF.jpg',
          mimeType: 'image/jpeg',
          filesize: 190660,
          width: 2121,
          height: 1414,
          focalX: 50,
          focalY: 50,

          sizes: {
            thumbnail: {
              url: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF-300x200.jpg',
              width: 300,
              height: 200,
              mimeType: 'image/jpeg',
              filesize: 11319,
              filename: 'a-Ht-M8SAwtqOdjTkdVwF-300x200.jpg',
            },
            square: {
              url: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF-500x500.jpg',
              width: 500,
              height: 500,
              mimeType: 'image/jpeg',
              filesize: 38667,
              filename: 'a-Ht-M8SAwtqOdjTkdVwF-500x500.jpg',
            },
            small: {
              url: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF-600x400.jpg',
              width: 600,
              height: 400,
              mimeType: 'image/jpeg',
              filesize: 32551,
              filename: 'a-Ht-M8SAwtqOdjTkdVwF-600x400.jpg',
            },
            medium: {
              url: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF-900x600.jpg',
              width: 900,
              height: 600,
              mimeType: 'image/jpeg',
              filesize: 58719,
              filename: 'a-Ht-M8SAwtqOdjTkdVwF-900x600.jpg',
            },
            large: {
              url: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF-1400x933.jpg',
              width: 1400,
              height: 933,
              mimeType: 'image/jpeg',
              filesize: 107469,
              filename: 'a-Ht-M8SAwtqOdjTkdVwF-1400x933.jpg',
            },

            xlarge: {
              url: '/api/media/file/a-Ht-M8SAwtqOdjTkdVwF-1920x1280.jpg',
              width: 1920,
              height: 1280,
              mimeType: 'image/jpeg',
              filesize: 165278,
              filename: 'a-Ht-M8SAwtqOdjTkdVwF-1920x1280.jpg',
            },
          },
        },
      },
      layout: [
        {
          id: '67828accbfbb3500011b4cd7',
          blockName: null,
          columns: [
            {
              id: '67828accbfbb3500011b4cd6',
              size: 'full',

              richText: {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,

                  children: [
                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Aenean ut ligula ac libero vehicula luctus.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,
                      children: [],
                      direction: 'ltr',
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

                      children: [
                        {
                          mode: 'normal',
                          text: ' ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: null,
                      textStyle: '',
                      textFormat: 0,
                    },
                    {
                      tag: 'h3',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Aenean ut ligula ac libero vehicula luctus.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: ' Vivamus lacinia odio vitae vestibulum vestibulum. Cras vehicula, libero a pharetra dictum, urna lectus porttitor lacus, at dapibus justo quam vel metus. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: 'Pellentesque habitant morbi tristique sen',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 8,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: 'ectus et netus et malesuada fames ac turpis egestas. Sed non velit nec arcu volutpat dignissim in a lorem.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
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
                          text: 'Proin sagittis sem et elit fringilla, nec fringilla eros maximus. Nulla facilisi. Ut sit amet facilisis lectus. Fusce ornare metus at ante tristique, nec elementum eros fermentum. Integer volutpat magna sed justo tincidunt, sit amet aliquam arcu pellentesque. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: 'Phasellus imperdiet mi vitae ligula pharetra, a dignissim velit vehicula.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 2,
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

                      children: [
                        {
                          mode: 'normal',
                          text: ' ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: null,
                      textStyle: '',
                      textFormat: 0,
                    },
                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Aenean ut ligula ac libero vehicula luctus.',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
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

                      children: [
                        {
                          mode: 'normal',
                          text: ' ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: null,
                      textStyle: '',
                      textFormat: 0,
                    },
                  ],
                  direction: 'ltr',
                },
              },
              enableLink: null,

              link: {
                type: 'reference',
                newTab: null,
                url: null,
                label: null,
                appearance: 'default',
              },
            },
          ],
          blockType: 'content',
        },
        {
          id: '67828accbfbb3500011b4cdb',
          title: 'Aenean ut ligula ac libero vehicula luctus. I',

          description: {
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
                      text: 'Suspendisse potenti. ',
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

                  children: [
                    {
                      mode: 'normal',
                      text: 'Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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
          blockName: null,
          features: [
            {
              id: '67828accbfbb3500011b4cd8',
              title: 'Aenean ut ligula ac libero vehicula luctus. ',

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
                  ],
                  direction: 'ltr',
                },
              },
              link: {
                type: 'none',
                newTab: null,
                url: '/',
                label: 'Home',
              },

              icon: {
                type: 'fa-thin',
                icon: 'home',
              },
            },
            {
              id: '67828accbfbb3500011b4cd9',
              title: 'Lorem ipsum dolor sit amet',

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
                  ],
                  direction: 'ltr',
                },
              },
              link: {
                type: 'none',
                newTab: true,
                url: '',
                label: 'test',
              },

              icon: {
                type: 'fa-kit',
                icon: 'microsoft-office',
              },
            },
            {
              id: '67828accbfbb3500011b4cda',
              title: 'Sed non velit nec arcu volutpat dignissim in a lorem.',

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
                          text: 'Proin sagittis sem et elit fringilla, nec fringilla eros maximus. Nulla facilisi. Ut sit amet facilisis lectus. Fusce ornare metus at ante tristique, nec elementum eros fermentum.',
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
              link: {
                type: 'custom',
                newTab: null,
                url: '#',
                label: '#',
              },

              icon: {
                type: 'fa-thin',
                icon: 'screen-users',
              },
            },
          ],
          blockType: 'features',
        },
        {
          id: '67828be29b9e476536d9588d',
          blockName: null,

          columns: [
            {
              id: '67828be59b9e476536d9588e',
              size: 'half',

              richText: {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,

                  children: [
                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Suspendisse potenti. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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
                      tag: 'h3',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Aliquam erat volutpat. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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
                      tag: 'h4',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Aliquam erat volutpat. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Vivamus lacinia odio vitae vestibulum vestibulum. Cras vehicula, libero a pharetra dictum, urna lectus porttitor lacus, at dapibus justo quam vel metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed non velit nec arcu volutpat dignissim in a lorem.',
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
              enableLink: null,

              link: {
                type: 'reference',
                newTab: null,
                url: null,
                label: null,
                appearance: 'default',
              },
            },
            {
              id: '67828c239b9e476536d9588f',
              size: 'half',

              richText: {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,

                  children: [
                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Aliquam erat volutpat. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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
                      tag: 'h3',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Suspendisse potenti. ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
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
              enableLink: null,

              link: {
                type: 'reference',
                newTab: null,
                url: null,
                label: null,
                appearance: 'default',
              },
            },
          ],
          blockType: 'content',
        },
      ],
      meta: {
        title: null,
        image: null,
        description: null,
      },
      publishedAt: '2025-01-11T15:14:20.488Z',
      publishedToWebsite: false,
      slug: 'test-page',
      slugLock: true,
      parent: null,
      breadcrumbs: [
        {
          id: '67828dcbbfbb3500011b4d28',
          doc: 19,
          url: null,
          label: 'Test Page',
        },
      ],
      updatedAt: '2025-01-11T15:27:07.957Z',
      createdAt: '2025-01-11T15:14:20.282Z',
      _status: 'published',
    },
    edit: true,
  },
}

export const ReusableContent = {
  args: {
    ...Default.args,
    page: {
      id: 1,
      title: 'Test Proposal',

      hero: {
        type: 'lowImpact',
        richText: null,

        links: [],
        media: null,
      },

      layout: [
        {
          id: '67a8fefea2a234ac414429cd',

          reusableContent: {
            id: 1,
            title: 'Test Content',

            hero: {
              type: 'lowImpact',
              richText: null,

              links: [],
              media: null,
            },

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

                    settings: {
                      card: 'default',
                      contents: 'statistic',
                    },

                    link: {
                      type: 'none',
                      newTab: null,
                      url: null,
                    },

                    icon: {
                      type: 'fa-thin',
                      icon: 'cloud',
                    },
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

            meta: {
              title: null,
              image: null,
              description: null,
            },
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
      ],
      publishedAt: '2025-02-09T19:16:29.260Z',

      authors: [],

      populatedAuthors: [],
      slug: 'test-proposal',
      slugLock: true,
      updatedAt: '2025-02-09T19:16:29.261Z',
      createdAt: '2025-02-09T19:15:56.240Z',
      _status: 'published',
    },
  },
}

export const CollapsableArea = {
  args: {
    ...Default.args,
    page: {
      id: 1,
      title: 'Test Proposal',
      hero: {
        type: 'lowImpact',
        richText: null,
        links: [],
        media: null,
      },
      layout: [
        {
          id: '67a8fefea2a234ac414429cd',
          id: 1,
          title: 'Test Content',
          richText: {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'block',

                  fields: {
                    id: '67a9d3b5a12bfd151775ff09',

                    theme: {
                      settings: {
                        theme: 'default',
                        background: 'transparent',
                      },
                    },
                    features: [
                      {
                        id: '67a9d48149ed6d71a5065363',

                        icon: {
                          icon: 'people',
                          type: 'fa-thin',
                        },
                        link: {
                          type: 'none',
                        },
                        title: 'Members of staff',
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
                                children: [],
                                direction: null,
                                textStyle: '',
                                textFormat: 0,
                              },
                            ],
                            direction: null,
                          },
                        },

                        settings: {
                          card: 'default',
                          contents: 'icon',
                        },
                        statistic: '15,000',
                      },
                      {
                        id: '67aa42c295a3c6324d117378',

                        icon: {
                          icon: 'building',
                          type: 'fa-thin',
                        },
                        link: {
                          type: 'none',
                        },
                        title: 'Offices',

                        settings: {
                          card: 'default',
                          contents: 'statistic',
                        },
                        statistic: '44 offfices across 20 countries ',
                      },
                    ],
                    blockName: '',
                    blockType: 'features',
                  },
                  format: '',
                  version: 2,
                },
              ],
              direction: null,
            },
          },
          customId: null,
          blockName: 'About Reply',
          blockType: 'collasableBlock',
        },
      ],
      publishedAt: '2025-02-09T19:16:29.260Z',

      authors: [],

      populatedAuthors: [],
      slug: 'test-proposal',
      slugLock: true,
      updatedAt: '2025-02-09T19:16:29.261Z',
      createdAt: '2025-02-09T19:15:56.240Z',
      _status: 'published',
    },
  },
}

export const ProposalWithReusableContent = {
  args: {
    ...Default.args,
    page: {
      id: 1,
      title: 'Test Proposal',

      hero: {
        type: 'lowImpact',
        richText: null,

        links: [],
        media: null,
      },

      layout: [
        {
          id: '67a8fefea2a234ac414429cd',
          reusableContent: {
            id: 1,
            title: 'Test Content',

            hero: {
              type: 'lowImpact',
              richText: null,

              links: [],
              media: null,
            },

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

                    settings: {
                      card: 'default',
                      contents: 'statistic',
                    },

                    link: {
                      type: 'none',
                      newTab: null,
                      url: null,
                    },

                    icon: {
                      type: 'fa-thin',
                      icon: 'cloud',
                    },
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

            meta: {
              title: null,
              image: null,
              description: null,
            },
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
      ],
      publishedAt: '2025-02-09T19:16:29.260Z',

      authors: [],

      populatedAuthors: [],
      slug: 'test-proposal',
      slugLock: true,
      updatedAt: '2025-02-09T19:16:29.261Z',
      createdAt: '2025-02-09T19:15:56.240Z',
      _status: 'published',
    },
  },
}

export const EmbeddedFeatures = {
  args: {
    ...Default.args,
    page: {
      id: 1,
      title: 'Test Proposal',

      hero: {
        type: 'lowImpact',
        richText: null,
        links: [],
        media: null,
      },
      layout: [
        {
          id: '67a9d50949ed6d71a5065365',

          reusableContent: {
            id: 1,
            title: 'About Reply',

            hero: {
              type: 'lowImpact',
              richText: null,
              links: [],
              media: null,
            },
            layout: [
              {
                id: '67a9d3a814dc05a61f79f97d',
                blockName: null,

                columns: [
                  {
                    id: '67a9d3ab14dc05a61f79f97e',
                    size: 'full',

                    richText: {
                      root: {
                        type: 'root',
                        format: '',
                        indent: 0,
                        version: 1,

                        children: [
                          {
                            type: 'block',

                            fields: {
                              id: '67a9d3b5a12bfd151775ff09',

                              theme: {
                                settings: {
                                  theme: 'default',
                                  background: 'transparent',
                                },
                              },
                              features: [
                                {
                                  id: '67a9d48149ed6d71a5065363',

                                  icon: {
                                    icon: 'people',
                                    type: 'fa-thin',
                                  },
                                  link: {
                                    type: 'none',
                                  },
                                  title: 'Members of staff',
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
                                          children: [],
                                          direction: null,
                                          textStyle: '',
                                          textFormat: 0,
                                        },
                                      ],
                                      direction: null,
                                    },
                                  },

                                  settings: {
                                    card: 'default',
                                    contents: 'icon',
                                  },
                                  statistic: '15,000',
                                },
                                {
                                  id: '67aa42c295a3c6324d117378',

                                  icon: {
                                    icon: 'building',
                                    type: 'fa-thin',
                                  },
                                  link: {
                                    type: 'none',
                                  },
                                  title: 'Offices',

                                  settings: {
                                    card: 'default',
                                    contents: 'statistic',
                                  },
                                  statistic: '44 offfices across 20 countries ',
                                },
                              ],
                              blockName: '',
                              blockType: 'features',
                            },
                            format: '',
                            version: 2,
                          },
                        ],
                        direction: null,
                      },
                    },
                    enableLink: null,

                    link: {
                      type: 'reference',
                      newTab: null,
                      url: null,
                      label: null,
                      appearance: 'default',
                    },
                  },
                  {
                    id: '67a9d4d249ed6d71a5065364',
                    size: 'full',

                    richText: {
                      root: {
                        type: 'root',
                        format: '',
                        indent: 0,
                        version: 1,

                        children: [
                          {
                            type: 'block',

                            fields: {
                              id: '67a9d4dba5ed1838d20c7698',
                              media: {
                                id: 2,
                                alt: null,
                                prefix: 'media',
                                updatedAt: '2025-02-08T12:32:42.621Z',
                                createdAt: '2025-02-08T12:32:42.621Z',
                                url: '/slide_3_transparent_trimmed.png',
                                thumbnailURL: '/api/media/file/Fayy0Ql49FqefU1Rv1Vg1-300x169.jpg',
                                filename: 'Fayy0Ql49FqefU1Rv1Vg1.jpg',
                                mimeType: 'image/jpeg',
                                filesize: 174350,
                                width: 2309,
                                height: 1299,
                                focalX: 50,
                                focalY: 50,
                              },
                              blockName: '',
                              blockType: 'mediaBlock',
                            },
                            format: '',
                            version: 2,
                          },
                        ],
                        direction: null,
                      },
                    },
                    enableLink: null,

                    link: {
                      type: 'none',
                      newTab: null,
                      url: null,
                      label: null,
                      appearance: 'default',
                    },
                  },
                ],
                blockType: 'content',
                theme: {
                  settings: {
                    theme: 'green',
                    background: 'solid',
                    image: null,
                    overlay: null,
                  },
                },
              },
            ],

            meta: {
              title: null,
              image: null,
              description: null,
            },
            publishedAt: '2025-02-10T10:25:51.839Z',
            links: [],
            slug: 'about-reply',
            slugLock: true,
            updatedAt: '2025-02-10T18:45:48.581Z',
            createdAt: '2025-02-10T10:25:51.836Z',
          },
          customId: null,
          blockName: 'About Reply',
          blockType: 'reusableContentBlock',
          theme: {
            settings: {
              theme: 'green',
              background: 'solid',
              image: null,
              overlay: null,
            },
          },
        },
      ],
      publishedAt: '2025-02-10T17:49:57.369Z',
      authors: [],
      populatedAuthors: [],
      slug: 'test-proposal',
      slugLock: true,
      updatedAt: '2025-02-10T17:49:57.370Z',
      createdAt: '2025-02-10T10:29:21.057Z',
      _status: 'published',
    },
  },
}

export const SideBySide = {
  args: {
    ...Default.args,
    page: {
      id: 1,
      title: 'Test Proposal',

      hero: {
        type: 'lowImpact',
        richText: null,
        links: [],
        media: null,
      },
      layout: [
        {
          id: '67a9d50949ed6d71a5065365',

          reusableContent: {
            id: 1,
            title: 'About Reply',

            hero: {
              type: 'lowImpact',
              richText: null,
              links: [],
              media: null,
            },
            layout: [
              {
                id: '67a9d3a814dc05a61f79f97d',
                blockName: null,

                columns: [
                  {
                    id: '67a9d3ab14dc05a61f79f97e',
                    size: 'oneThird',

                    richText: {
                      root: {
                        type: 'root',
                        format: '',
                        indent: 0,
                        version: 1,

                        children: [
                          {
                            type: 'block',

                            fields: {
                              id: '67a9d3b5a12bfd151775ff09',

                              theme: {
                                settings: {
                                  theme: 'default',
                                  background: 'transparent',
                                },
                              },
                              features: [
                                {
                                  id: '67a9d48149ed6d71a5065363',

                                  icon: {
                                    icon: 'people',
                                    type: 'fa-thin',
                                  },
                                  link: {
                                    type: 'none',
                                  },
                                  title: 'Members of staff',
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
                                          children: [],
                                          direction: null,
                                          textStyle: '',
                                          textFormat: 0,
                                        },
                                      ],
                                      direction: null,
                                    },
                                  },

                                  settings: {
                                    card: 'default',
                                    contents: 'icon',
                                  },
                                  statistic: '15,000',
                                },
                                {
                                  id: '67aa42c295a3c6324d117378',

                                  icon: {
                                    icon: 'building',
                                    type: 'fa-thin',
                                  },
                                  link: {
                                    type: 'none',
                                  },
                                  title: 'Offices',

                                  settings: {
                                    card: 'default',
                                    contents: 'statistic',
                                  },
                                  statistic: '44 offfices across 20 countries ',
                                },
                              ],
                              blockName: '',
                              blockType: 'features',
                            },
                            format: '',
                            version: 2,
                          },
                        ],
                        direction: null,
                      },
                    },
                    enableLink: null,

                    link: {
                      type: 'reference',
                      newTab: null,
                      url: null,
                      label: null,
                      appearance: 'default',
                    },
                  },
                  {
                    id: '67a9d4d249ed6d71a5065364',
                    size: 'twoThirds',

                    richText: {
                      root: {
                        type: 'root',
                        format: '',
                        indent: 0,
                        version: 1,

                        children: [
                          {
                            type: 'block',

                            fields: {
                              id: '67a9d4dba5ed1838d20c7698',
                              media: {
                                id: 2,
                                alt: null,
                                prefix: 'media',
                                updatedAt: '2025-02-08T12:32:42.621Z',
                                createdAt: '2025-02-08T12:32:42.621Z',
                                url: '/slide_3_transparent_trimmed.png',
                                thumbnailURL: '/api/media/file/Fayy0Ql49FqefU1Rv1Vg1-300x169.jpg',
                                filename: 'Fayy0Ql49FqefU1Rv1Vg1.jpg',
                                mimeType: 'image/jpeg',
                                filesize: 174350,
                                width: 2309,
                                height: 1299,
                                focalX: 50,
                                focalY: 50,
                              },
                              blockName: '',
                              blockType: 'mediaBlock',
                            },
                            format: '',
                            version: 2,
                          },
                        ],
                        direction: null,
                      },
                    },
                    enableLink: null,

                    link: {
                      type: 'none',
                      newTab: null,
                      url: null,
                      label: null,
                      appearance: 'default',
                    },
                  },
                ],
                blockType: 'content',
                theme: {
                  settings: {
                    theme: 'green',
                    background: 'solid',
                    image: null,
                    overlay: null,
                  },
                },
              },
            ],

            meta: {
              title: null,
              image: null,
              description: null,
            },
            publishedAt: '2025-02-10T10:25:51.839Z',
            links: [],
            slug: 'about-reply',
            slugLock: true,
            updatedAt: '2025-02-10T18:45:48.581Z',
            createdAt: '2025-02-10T10:25:51.836Z',
          },
          customId: null,
          blockName: 'About Reply',
          blockType: 'reusableContentBlock',
        },
      ],
      publishedAt: '2025-02-10T17:49:57.369Z',
      authors: [],
      populatedAuthors: [],
      slug: 'test-proposal',
      slugLock: true,
      updatedAt: '2025-02-10T17:49:57.370Z',
      createdAt: '2025-02-10T10:29:21.057Z',
      _status: 'published',
    },
  },
}

export const Broken = {
  args: {
    ...Default.args,
    hero: PagesTest.digitalColleaguesOverview.hero,
    page: {
      id: 45,
      title: 'Amazon Connect GTM',

      hero: {
        type: 'lowImpact',

        richText: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,

            children: [
              {
                tag: 'h1',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'Go-to-Market Strategy for Amazon Connect in the Insurance Industry',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
              },
            ],
            direction: 'ltr',
          },
        },
        links: [],
        media: null,
      },
      layout: [
        {
          id: '67aa3ea149ed6d71a5065366',
          blockName: null,

          columns: [
            {
              id: '67aa3ea549ed6d71a5065367',
              size: 'full',

              richText: {
                root: {
                  type: 'root',
                  format: '',
                  indent: 0,
                  version: 1,

                  children: [
                    {
                      tag: 'h2',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Executive Summary',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Amazon Connect is a cloud-based, AI-powered contact center solution that offers scalability, cost efficiency, and seamless integration with the AWS ecosystem. This document outlines a comprehensive go-to-market (GTM) strategy tailored for the insurance industry. Our approach leverages targeted customer segmentation, proprietary insurance-specific intellectual property (IPR), and the AWS Marketplace as a strategic distribution channel. In addition, we delve into customer journey mapping, sales and technical enablement, robust customer success initiatives, strategic pricing, and partnership expansion—all designed to drive adoption and long-term success.',
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
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 0,
                    },
                    {
                      tag: 'h3',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Market Opportunity & Positioning',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Opportunity:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: '• ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: 'Challenges for Insurance Companies:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: ' High operational costs, complex customer interactions, strict compliance needs, and the need for improved customer experience.',
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

                      children: [
                        {
                          mode: 'normal',
                          text: 'Positioning:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: '• ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: 'Modern and AI-Driven:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: ' A cloud-native contact center that uses AI for automation and efficiency.',
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

                      children: [
                        {
                          mode: 'normal',
                          text: '• ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: 'Tailored for Insurance:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: ' Includes ready-to-use workflows for claims processing, policy renewals, fraud detection, and compliance.',
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
                      tag: 'h3',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Target Customer Segments',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Primary:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: '• Large insurance companies (health, auto, life, property & casualty)',
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

                      children: [
                        {
                          mode: 'normal',
                          text: 'Secondary:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: '• Insurance service providers and BPOs handling claims, customer support, and policy administration',
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
                      tag: 'h3',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Key Differentiators',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: '• ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: 'Pre-Built Insurance Workflows:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: ' Quick deployment for common insurance use cases.',
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

                      children: [
                        {
                          mode: 'normal',
                          text: '• ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: 'AI & Automation:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: ' Use of AWS AI/ML services (e.g., Amazon Lex and Transcribe) to streamline operations.',
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

                      children: [
                        {
                          mode: 'normal',
                          text: '• ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: 'AWS Integration:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: ' Seamless deployment and scaling with other AWS services.',
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

                      children: [
                        {
                          mode: 'normal',
                          text: '• ',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 0,
                          version: 1,
                        },
                        {
                          mode: 'normal',
                          text: 'Compliance & Security:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },

                        {
                          mode: 'normal',
                          text: ' Designed to meet industry-specific regulatory standards.',
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
                      tag: 'h3',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Sales & Distribution Strategy',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Direct Sales & ABM:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: '• Target decision-makers (CIOs, CTOs, Heads of Claims/Customer Service) with tailored messaging.',
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

                      children: [
                        {
                          mode: 'normal',
                          text: 'AWS Marketplace:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: '• List our packaged solutions and accelerators for easy adoption.',
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

                      children: [
                        {
                          mode: 'normal',
                          text: 'Digital Marketing:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: '• Content marketing, SEO/PPC, and social media campaigns focused on insurance industry pain points.',
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
                      tag: 'h3',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Pricing, Packaging & Partnerships',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Pricing & Packaging:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: '• Flexible models (usage-based, tiered subscriptions) and bundled offerings combining Amazon Connect with our proprietary insurance add-ons.',
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

                      children: [
                        {
                          mode: 'normal',
                          text: '• Pilot programs and trial periods to lower barriers to entry.',
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

                      children: [
                        {
                          mode: 'normal',
                          text: 'Partnerships:',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: '• Collaborate with AWS consulting partners and insurtech firms.',
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

                      children: [
                        {
                          mode: 'normal',
                          text: '• Leverage local partnerships for regional market expansion.',
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
                      tag: 'h3',
                      type: 'heading',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Roadmap & Key Metrics',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'Short-Term (0-3 Months):',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: '• Conduct market research, develop key content, and prepare for pilot launches.',
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

                      children: [
                        {
                          mode: 'normal',
                          text: 'Mid-Term (3-6 Months):',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: '• Secure pilot customers, launch initial AWS Marketplace listings, and kick off targeted marketing campaigns.',
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

                      children: [
                        {
                          mode: 'normal',
                          text: 'Long-Term (6-12 Months):',
                          type: 'text',
                          style: '',
                          detail: 0,
                          format: 1,
                          version: 1,
                        },
                      ],
                      direction: 'ltr',
                      textStyle: '',
                      textFormat: 1,
                    },
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: '• Scale sales, broaden the partner network, and continuously enhance product features.',
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
              enableLink: null,

              link: {
                type: 'none',
                newTab: null,
                url: null,
                label: null,
                appearance: 'default',
              },
            },
          ],
          blockType: 'content',
          theme: {
            settings: {
              theme: 'default',
              background: 'transparent',
              image: null,
              overlay: null,
              box: 'none',
            },
          },
        },
      ],
      meta: {
        title: null,
        image: null,
        description: null,
      },
      publishedAt: '2025-02-10T18:06:28.093Z',
      links: [],

      slug: 'amazon-connect-gtm',
      slugLock: true,
      parent: {
        id: 16,
        title: 'AWS Partnership',
        slug: 'aws-partnership',
      },
      breadcrumbs: [
        {
          id: '6825ccbdb3eae80001ae4297',
          doc: 15,
          url: null,
          label: 'Partnerships',
        },
        {
          id: '6825ccbdb3eae80001ae4298',
          doc: 16,
          url: null,
          label: 'AWS Partnership',
        },

        {
          id: '6825ccbdb3eae80001ae4299',
          doc: 45,
          url: null,
          label: 'Amazon Connect GTM',
        },
      ],
      updatedAt: '2025-05-15T11:15:09.886Z',
      createdAt: '2025-02-10T17:59:45.462Z',
      _status: 'published',
    },
  },
}

export const WithImage = {
  args: {
    ...Default.args,
    page: {
      id: 1,
      title: 'Test Page',

      hero: {
        type: 'lowImpact',

        richText: {
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
                    text: 'Test Page',
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

        links: [],
        media: null,
      },

      layout: [
        {
          id: '681a4999a2fd5620877e41a0',
          blockName: null,

          columns: [
            {
              id: '681a499ca2fd5620877e41a2',
              size: 'full',

              richText: {
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
                          text: 'image below',
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
                      type: 'block',

                      fields: {
                        id: '681a49b9a0eff783489b8eea',

                        media: {
                          id: 1,
                          alt: 'Logo',
                          updatedAt: '2025-05-06T17:41:52.026Z',
                          createdAt: '2025-05-06T17:41:51.884Z',
                          url: '/api/images/file/aWkuXsguxANsbGKAUk7Dc.png',
                          thumbnailURL: '/api/images/file/aWkuXsguxANsbGKAUk7Dc-300x292.png',
                          filename: 'aWkuXsguxANsbGKAUk7Dc.png',
                          mimeType: 'image/png',
                          filesize: 14892,
                          width: 690,
                          height: 672,
                          focalX: 50,
                          focalY: 50,

                          sizes: {
                            thumbnail: {
                              url: '/api/images/file/aWkuXsguxANsbGKAUk7Dc-300x292.png',
                              width: 300,
                              height: 292,
                              mimeType: 'image/png',
                              filesize: 7250,
                              filename: 'aWkuXsguxANsbGKAUk7Dc-300x292.png',
                            },

                            square: {
                              url: '/api/images/file/aWkuXsguxANsbGKAUk7Dc-500x500.png',
                              width: 500,
                              height: 500,
                              mimeType: 'image/png',
                              filesize: 14930,
                              filename: 'aWkuXsguxANsbGKAUk7Dc-500x500.png',
                            },

                            small: {
                              url: '/api/images/file/aWkuXsguxANsbGKAUk7Dc-600x584.png',
                              width: 600,
                              height: 584,
                              mimeType: 'image/png',
                              filesize: 19090,
                              filename: 'aWkuXsguxANsbGKAUk7Dc-600x584.png',
                            },

                            medium: {
                              url: null,
                              width: null,
                              height: null,
                              mimeType: null,
                              filesize: null,
                              filename: null,
                            },

                            large: {
                              url: null,
                              width: null,
                              height: null,
                              mimeType: null,
                              filesize: null,
                              filename: null,
                            },

                            xlarge: {
                              url: null,
                              width: null,
                              height: null,
                              mimeType: null,
                              filesize: null,
                              filename: null,
                            },
                          },
                        },

                        theme: {
                          settings: {
                            theme: 'default',
                            background: 'transparent',
                          },
                        },
                        blockName: '',
                        blockType: 'imageBlock',
                      },
                      format: '',
                      version: 2,
                    },

                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      version: 1,

                      children: [
                        {
                          mode: 'normal',
                          text: 'image above',
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
              enableLink: null,

              link: {
                type: 'none',
                newTab: null,
                url: null,
                label: null,
                appearance: 'default',
              },
            },
          ],
          blockType: 'content',

          theme: {
            settings: {
              theme: 'default',
              background: 'transparent',
              image: null,
              overlay: null,
              box: 'none',
            },
          },
        },
      ],

      meta: {
        title: null,
        image: null,
        description: null,
      },
      publishedAt: '2025-05-06T17:41:05.653Z',

      links: [],
      slug: 'test-page',
      slugLock: true,
      parent: null,

      breadcrumbs: [
        {
          id: '681a4b7baef9bb382c80db11',
          doc: 1,
          url: null,
          label: 'Test Page',
        },
      ],
      updatedAt: '2025-05-06T17:48:43.724Z',
      createdAt: '2025-05-06T17:41:05.493Z',
      _status: 'published',
    },
  },
}
