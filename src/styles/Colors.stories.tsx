import React from 'react'
import Colors from './Colors'

export default {
  title: 'Style Guide/Colors',
  component: Colors,
}

const Template = (args: any) => <Colors {...args} />

export const Default = {
  render: Template,
}
