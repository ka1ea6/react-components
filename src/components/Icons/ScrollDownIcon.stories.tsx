import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ScrollDownIcon } from './ScrollDownIcon';

export default {
  title: 'Icons/ScrollDownIcon',
  component: ScrollDownIcon,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A component that shows a scroll down icon with animation.',
      },
    },
  },
} as Meta;

const Template: StoryFn = (args) => <ScrollDownIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};