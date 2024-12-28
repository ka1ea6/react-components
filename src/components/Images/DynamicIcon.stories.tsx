import React from 'react'
import { type StoryFn } from '@storybook/react'
import {DynamicIcon,  type DynamicIconProps } from './DynamicIcon'

export default {
  title: 'Images & Icons/DynamicIcon',
  component: DynamicIcon,
  tags: ['autodocs'],
}

const Template: StoryFn<DynamicIconProps> = (args) => (
  <div className="h-12 w-12 mb-2">
    <DynamicIcon {...args} />
  </div>
)

export const LightCloud = Template.bind({})
LightCloud.args = {
  type: 'light',
  iconName: 'cloud',
  size: '10x',
}

export const SolidUser = Template.bind({})
SolidUser.args = {
  type: 'solid',
  iconName: 'user',
  size: '10x',
}

export const RegularClock = Template.bind({})
RegularClock.args = {
  type: 'regular',
  iconName: 'clock',
  size: '10x',
}

export const DuotoneCamera = Template.bind({})
DuotoneCamera.args = {
  type: 'duotone',
  iconName: 'camera',
  size: '10x',
}

export const Automation = Template.bind({})
Automation.args = {
  type: 'kit',
  iconName: 'automation',
  size: '10x',
}

export const GitHub = Template.bind({})
GitHub.args = {
  type: 'brands',
  iconName: 'github',
  size: '10x',
}
