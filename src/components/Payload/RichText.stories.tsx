import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { RichText, type RichTextProps } from './RichText/index';

export default {
  title: 'Blocks/RichText',
  component: RichText,
  tags: [ 'autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-white dark:bg-gray-900 p-4">
      <Story />
     </div>
    ),
  ],
} as Meta;



type RichTextStory = StoryObj<typeof RichText>

const Template = (args: RichTextProps) => <RichText {...args} />;
export const Default: RichTextStory = {
    render: Template,
  
args: {
  content: {
    root: {
      children: [
        {
          type: 'text',
          text: 'This is a regular text.',
        },
        {
          type: 'text',
          text: 'This is bold text.',
          format: 1, // IS_BOLD
        },
        {
          type: 'text',
          text: 'This is italic text.',
          format: 2, // IS_ITALIC
        },
        {
          type: 'text',
          text: 'This is underline text.',
          format: 4, // IS_UNDERLINE
        },
        {
          type: 'text',
          text: 'This is strikethrough text.',
          format: 8, // IS_STRIKETHROUGH
        },
        {
          type: 'text',
          text: 'This is subscript text.',
          format: 16, // IS_SUBSCRIPT
        },
        {
          type: 'text',
          text: 'This is superscript text.',
          format: 32, // IS_SUPERSCRIPT
        },
        {
          type: 'text',
          text: 'This is code text.',
          format: 64, // IS_CODE
        },
        {
          type: 'table',
          children: [
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  children: [
                    {
                      type: 'text',
                      text: 'Cell 1',
                    },
                  ],
                },
                {
                  type: 'tableCell',
                  children: [
                    {
                      type: 'text',
                      text: 'Cell 2',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableRow',
              children: [
                {
                  type: 'tableCell',
                  children: [
                    {
                      type: 'text',
                      text: 'Cell 3',
                    },
                  ],
                },
                {
                  type: 'tableCell',
                  children: [
                    {
                      type: 'text',
                      text: 'Cell 4',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
  enableGutter: true,
  enableProse: true,
}
}