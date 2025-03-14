import type { Meta, StoryObj } from '@storybook/react'
import { FeaturesBlock } from './FeaturesBlock'
import { ImageTest, BlocksTest, HeroTest, RichTextTest } from '../../tests/payload'

const meta: Meta<typeof FeaturesBlock> = {
  title: 'Reusable Blocks/FeaturesBlock',
  component: FeaturesBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof FeaturesBlock>

export const Default: Story = {
  args: {
    title: 'Lorem ipsum dolor sit amet',
    description: 'Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus.',
    features: [
      {
        icon: { type: 'fa-thin', icon: 'robot' },
        title: 'Sed at eros vel lacus varius varius nec id metus.',
        content: RichTextTest.simple,
          settings: {
            card: 'outline',
            icon: 'large',
          },
      },
      {
        icon: { type: 'fa-thin', icon: 'lightbulb' },
        link: { label: 'label', type: 'custom', url: '#' },
        title: 'Intelligent Insights',
        statistic: '80%',
        content:
          'They provide valuable insights and improve ways of working, saving time and boosting efficiency across your organisation.',
          settings: {
            card: 'light',
          },
      },
      {
        icon: { type: 'fa-kit', icon: 'software' },
        // link: { reference: { relationTo: 'pages', value: { slug: 'contact' } } },
        title: 'Collaborative Partners',
        statistic: '80%',
        content:
          'Digital colleagues work alongside human employees, assisting with tasks and enhancing overall performance.',
          settings: {
            card: 'solid',
          },
      },
    ],
  },
}

export const MoreOptions: Story = {
  args: {
    
    features: [
      {
        icon: { type: 'fa-thin', icon: 'robot' },
        title: 'Sed at eros vel lacus varius varius nec id metus.',
        link: { label: 'label', type: 'custom', url: '#' },
        content: RichTextTest.simple,
          settings: {
            card: 'outline',
            iconSize: 'large',
          },
      },
      {
        icon: { type: 'fa-thin', icon: 'lightbulb' },
        link: { label: 'label', type: 'custom', url: '#' },
        title: 'Sed at eros vel lacus varius varius nec id metus.',
        content: RichTextTest.simple,
        statistic: '80%',
          settings: {
            card: 'radial',
            iconSize: 'small',
          },
      },
      {
        icon: { type: 'fa-kit', icon: 'software' },
        // link: { reference: { relationTo: 'pages', value: { slug: 'contact' } } },
        title: 'Sed at eros vel lacus.',
        content: RichTextTest.simple,
        statistic: '80%',
          settings: {
            card: 'gradient',
            iconSize: 'large',
          },
      },
    ],
  },
}


export const OtherOptions: Story = {
  args: {
    
    features: [
      {
        icon: { type: 'fa-thin', icon: 'robot' },
        title: 'Sed at eros vel lacus varius varius nec id metus.',
        link: { label: 'label', type: 'custom', url: '#' },
        content: RichTextTest.simple,
          settings: {
            card: 'outline',
            iconSize: 'small',
          },
      },
      {
        icon: { type: 'fa-thin', icon: 'lightbulb' },
        link: { label: 'label', type: 'custom', url: '#' },
        title: 'Sed at eros vel lacus varius varius nec id metus.',
        content: RichTextTest.simple,
          settings: {
            card: 'light',
            iconSize: 'small',
          },
      },
      {
        icon: { type: 'fa-kit', icon: 'software' },
        // link: { reference: { relationTo: 'pages', value: { slug: 'contact' } } },
        title: 'Sed at eros vel lacus.',
        content: RichTextTest.simple,
        statistic: '80%',
          settings: {
            card: 'gradient',
            iconSize: 'small',
          },
      },
    ],
  },
}

export const TwoFeatures: Story = {
  args: {
    title: 'What Are Digital Colleagues?',
    features: [
      {
        icon: { type: 'fa-thin', icon: 'robot' },
        title: 'AI-Powered Assistants',
        content:
          'Digital colleagues are generative AI tools that augment your existing workforce, enhancing productivity and customer experience.',
      },
      {
        icon: { type: 'fa-thin', icon: 'lightbulb' },
        title: 'Intelligent Insights',
        content:
          'They provide valuable insights and improve ways of working, saving time and boosting efficiency across your organisation.',
      },
    ],
  },
}

export const FiveFeatures: Story = {
  args: {
    title: 'Lorum ipsum dolor sit amet',
    features: [
      {
        icon: { type: 'fa-thin', icon: 'robot' },
        title: 'Lorem ipsum dolor sit amet',
        content:
          'lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus.',
      },
      {
        icon: { type: 'fa-thin', icon: 'lightbulb' },
        title: 'Sed at eros vel lacus varius varius nec id metus',
        content:
          'Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus.',
      },
      {
        icon: { type: 'fa-thin', icon: 'robot' },
        title: 'Lorem ipsum dolor sit amet',
        content:
          'lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus.',
      },
      {
        icon: { type: 'fa-thin', icon: 'lightbulb' },
        title: 'Sed at eros vel lacus varius varius nec id metus',
        content:
          'Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus.',
      },
      {
        icon: { type: 'fa-thin', icon: 'robot' },
        title: 'Lorem ipsum dolor sit amet',
        content:
          'lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus.',
      },
    ],
  },
}

export const OneFeature: Story = {
  args: {
    title: 'What Are Digital Colleagues?',
    features: [
      {
        icon: { type: 'fa-thin', icon: 'robot' },
        title: 'AI-Powered Assistants',
        content:
          'Digital colleagues are generative AI tools that augment your existing workforce, enhancing productivity and customer experience.',
      },
    ],
  },
}

export const NoIcon: Story = {
  args: {
    title: 'What Are Digital Colleagues?',
    features: [
      {
        title: 'AI-Powered Assistants',
        content:
          'Digital colleagues are generative AI tools that augment your existing workforce, enhancing productivity and customer experience.',
      },
    ],
  },
}

export const NoTitle: Story = {
  args: {
    features: [
      {
        icon: { type: 'fa-thin', icon: 'robot' },
        title: 'AI-Powered Assistants',
        content:
          'Digital colleagues are generative AI tools that augment your existing workforce, enhancing productivity and customer experience.',
      },
      {
        icon: { type: 'fa-thin', icon: 'lightbulb' },
        title: 'Intelligent Insights',
        content:
          'They provide valuable insights and improve ways of working, saving time and boosting efficiency across your organisation.',
      },
      {
        icon: { type: 'fa-kit', icon: 'delivery' },
        title: 'Collaborative Partners',
        content:
          'Digital colleagues work alongside human employees, assisting with tasks and enhancing overall performance.',
      },
    ],
  },
}

export const Cards: Story = {
  args: {
    title: 'Test Content',
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
}


export const ThreeCards: Story = {
  args: {
    title: 'Test Content',
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
}