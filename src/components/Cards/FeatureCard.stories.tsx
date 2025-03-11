import type { Meta, StoryObj } from '@storybook/react'
import { FeatureCard } from './FeatureCard'
import { ImageTest, BlocksTest, HeroTest, RichTextTest } from '../../tests/payload'

const meta: Meta<typeof FeatureCard> = {
  title: 'Reusable Blocks/FeatureCard',
  component: FeatureCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    settings: {
      card: {
        control: 'select',
        options: ['solid', 'light', 'gradient', 'radial'],
        description: 'The visual style variant of the card',
      },
    },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    content: { control: 'object' },
    statistic: { control: 'text' },
    // buttonText: { control: 'text' },
    // buttonHref: { control: 'text' },
    // icon: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof FeatureCard>

export const Solid: Story = {
  args: {
    settings: { card: 'solid', iconSize: 'large' },
    title: 'Results',
    icon: { type: 'kit', icon: 'software' },
    statistic: '85%',
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                mode: 'normal',
                type: 'text',
              },
            ],
          },
        ],
      },
    },
  },
}

export const Minimal: Story = {
  args: {
    settings: { card: 'outline', iconSize: 'small', },
    title: 'Lorem ipsum dolor sit',
    icon: { type: 'kit', icon: 'software' },
    
    width: '1/4',

    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                mode: 'normal',
                type: 'text',
              },
            ],
          },
        ],
      },
    },
  },
}

export const Light: Story = {
  args: {
    settings: { card: 'light' },
    icon: { type: 'kit', icon: 'software' },
    title: 'Lorem ipsum dolor sit amet',
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                mode: 'normal',
                type: 'text',
              },
            ],
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
                text: 'Ut enim ad minim veniam, quis nostrud exercitation ',
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
            children: [
              {
                text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                mode: 'normal',
                type: 'text',
              },
            ],
          },
        ],
      },
    },
  },
}

export const Gradient: Story = {
  args: {
    settings: { card: 'gradient' },
    title: 'Lorem ipsum dolor sit amet',
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                mode: 'normal',
                type: 'text',
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                mode: 'normal',
                type: 'text',
              },
            ],
          },
        ],
      },
    },
  },
}

export const Radial: Story = {
  args: {
    settings: { card: 'radial' },
    subtitle: 'go to the next level',
    title: 'Lorem ipsum dolor sit amet',
    link: { label: 'Go here', url: '#'},
  },
}

export const NoIcon: Story = {
  args: {
    ...Light.args,
    icon: undefined,
  },
}

export const CustomStyling: Story = {
  args: {
    ...Solid.args,
    className: 'max-w-md bg-brand-green',
  },
}

export const IconOutline: Story = {
  args: {
    icon: { type: 'fa-thin', icon: 'robot' },
    title: 'Sed at eros vel lacus varius varius nec id metus.',
    content: RichTextTest.simple,
    settings: {
      card: 'outline',
      icon: 'large',
    },
  },
}
export const NoOutline: Story = {
  args: {
    icon: { type: 'fa-thin', icon: 'lightbulb' },
    link: { label: 'label', type: 'custom', url: '#' },
    title: 'Intelligent Insights',
    statistic: '80%',
    content:
      'They provide valuable insights and improve ways of working, saving time and boosting efficiency across your organisation.',
    settings: { card: 'light' },
  },
}

export const IconOutlineCTA: Story = {
  args: {
    icon: { type: 'fa-thin', icon: 'robot' },
    title: 'Sed at eros vel lacus varius varius nec id metus.',
    link: { label: 'label', type: 'custom', url: '#' },
    content: RichTextTest.simple,
    settings: {
      card: 'outline',
      iconSize: 'large',
    },
  },
}

export const SmallIcon: Story = {
  args: {
    icon: { type: 'fa-thin', icon: 'lightbulb' },
    link: { type: 'custom', url: '#' },
    title: 'Sed at eros vel lacus varius varius nec id metus.',
    content: RichTextTest.simple,
    
    statistic: '80%',
    settings: {
      card: 'radial',
      iconSize: 'small',
    },
  },
}

export const Image: Story = {
  args: {
    image: ImageTest.hero,
    icon: { type: 'fa-thin', icon: 'lightbulb' },
    link: { label: 'label', type: 'custom', url: '#' },
    title: 'Sed at eros vel lacus varius varius nec id metus.',
    subtitle: 'Varius varius nec id metus.',
    content: RichTextTest.simple,
    statistic: '80%',
    settings: {
      card: 'light',
      iconSize: 'large',

    },
  },
}


export const TitleImage: Story = {
  args: {
    image: ImageTest.hero,
    // icon: { type: 'fa-thin', icon: 'lightbulb' },
    link: { label: 'find out more', type: 'custom', url: '#' },
    title: 'Sed at eros vel lacus varius varius nec id metus.',
    // subtitle: 'Varius varius nec id metus.',
    content: RichTextTest.simple,
    // statistic: '80%',
    settings: {
      card: 'light',
      // iconSize: 'small',

    },
  },
}


export const TitleImagePlainText: Story = {
  args: {
    image: ImageTest.hero,
    // icon: { type: 'fa-thin', icon: 'lightbulb' },
    link: { label: 'find out more', type: 'custom', url: '#' },
    title: 'Sed at eros vel lacus varius varius nec id metus.',
    // subtitle: 'Varius varius nec id metus.',
    content: 'Varius varius nec id metus. Sed at eros vel lacus varius varius nec id metus.',
    // statistic: '80%',
    settings: {
      card: 'light',
      // iconSize: 'small',

    },
  },
}