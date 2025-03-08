import React from 'react'
import Colors from './Colors'

export default {
  title: 'Style Guide/Colors',
  component: Colors,
}

const Template = (args: any) => (
  <div style={{ padding: '40px' }}>
    <Colors {...args} />
  </div>
);
export const Default = {
  render: Template,
}
