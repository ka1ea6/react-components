import { StoryObj, Meta } from '@storybook/react'
import { HeadingImage } from './HeadingImage'

export default {
  title: 'Blocks/HeadingImage',
  component: HeadingImage,
  tags: ['autodocs'],
} as Meta

// const Template: StoryFn = (args) => <ConsultantProfile {...args} />;
type Story = StoryObj<typeof HeadingImage>

export const Default: Story = {
  args: {
    image: 'stock1.jpg',
    title: 'Title',
    subtitle: 'Subtitle',
    companyLogo: 'cortex-reply.png',
    customerLogo: 'cortex-reply.png',
  },
}
