import type { Meta, StoryObj } from '@storybook/react'
import { ContentCard } from './ContentCard'

const meta: Meta<typeof ContentCard> = {
  title: 'Reusable Blocks/ContentCard',
  component: ContentCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'light', 'gradient', 'radial'],
      description: 'The visual style variant of the card',
    },
    heading: { control: 'text' },
    subheading: { control: 'text' },
    content: { control: 'object' },
    statistic: { control: 'text' },
    buttonText: { control: 'text' },
    buttonHref: { control: 'text' },
    icon: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof ContentCard>

export const Solid: Story = {
  args: {
    variant: 'solid',
    heading: 'Results',
    icon: { type: 'kit', iconName: 'software' },
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
    variant: 'outline',
    heading: 'Lorem ipsum dolor sit',
    icon: { type: 'kit', iconName: 'software' },
    iconSize: 'small',
    width: '1/4',
    
    // content: {
    //   root: {
    //     children: [
    //       {
    //         type: 'paragraph',
    //         children: [
    //           {
    //             text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    //             mode: 'normal',
    //             type: 'text',
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
}

export const Light: Story = {
  args: {
    variant: 'light',
    icon: { type: 'kit', iconName: 'software' },
    heading: 'Lorem ipsum dolor sit amet',
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
    variant: 'gradient',
    heading: 'Lorem ipsum dolor sit amet',
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
    variant: 'radial',
    subheading: 'go to the next level',
    heading: 'Lorem ipsum dolor sit amet',
    buttonText: 'Go here',
    buttonHref: '#',
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
    className: 'max-w-md',
  },
}
