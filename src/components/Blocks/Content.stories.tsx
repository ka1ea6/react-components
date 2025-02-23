import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { ContentBlock } from './Content'
import { BlocksTest } from '../../tests/payload'

const meta: Meta<typeof ContentBlock> = {
  title: 'Reusable Blocks/ContentBlock',
  component: ContentBlock,
}

export default meta
type Story = StoryObj<typeof ContentBlock>

export const Default: Story = {
  args: {
    ...BlocksTest.content.halfWithEmbeddedImage,
  },
}

export const Media: Story = {
  args: {
    ...BlocksTest.content.media,
  },
}

export const ThreeColumns: Story = {
  args: {
    ...BlocksTest.content.oneThirdWithImageTheme3Collumns,
  },
}

export const HeaderAndThreeColumns: Story = {
  args: {
    ...BlocksTest.content.headerAndTheme3Collumns,
  },
}

export const BoxesWithThreeColumns: Story = {
  args: {
    ...BlocksTest.content.boxesWithThreeColumns,
  },
}

export const BoxesWithImage: Story = {
  args: {
    ...Default.args,
    theme: {
      ...Default.args.theme,
      settings: {
        ...Default.args.theme?.settings,
        box: 'line',
      },
    },
  },
}

export const Features: Story = {
  args: {
    ...BlocksTest.content.halfWithFeature,
  },
}
