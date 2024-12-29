import type { Meta, StoryFn } from '@storybook/react'
import { AnimatedBorder } from './AnimatedBorder'
import * as React from 'react'

const meta: Meta<typeof AnimatedBorder> = {
  title: 'Animation/AnimatedBorder',
  component: AnimatedBorder,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
    duration: { control: { type: 'range', min: 1, max: 10, step: 0.5 } },
    strokeWidth: { control: { type: 'range', min: 1, max: 10, step: 1 } },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '3rem' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

const Template: StoryFn<typeof AnimatedBorder> = (args) => <AnimatedBorder {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <div className="p-4 bg-white">Animated border on visibility</div>,
};

export const RoundedBottom = Template.bind({});
RoundedBottom.args = {
  children: <div className="p-4 rounded-b-xl bg-primary text-primary-foreground">Animated border on visibility</div>,
  borderRadius: '8',
  color: '#10B981', // Green color
};




export const CustomColor = Template.bind({});
CustomColor.args = {
  children: <div className="p-4 bg-primary text-primary-foreground rounded-xl">Custom color border</div>,
  borderRadius: '8',
  color: '#10B981', // Green color
  topEdgeIncluded: false,
};

export const SlowAnimation = Template.bind({});
SlowAnimation.args = {
  children: <div className="p-4 bg-white">Slow animation</div>,
  duration: 5,
};

export const ThickBorder = Template.bind({});
ThickBorder.args = {
  children: <div className="p-4 bg-white">Thick border</div>,
  strokeWidth: 4,
};

