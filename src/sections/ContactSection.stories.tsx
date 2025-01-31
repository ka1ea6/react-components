import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ContactSection, type ContactSectionProps } from './ContactSection';
import { Toaster } from 'sonner'

export default {
  title: 'Website Components/ContactSection',
  component: ContactSection,
  tags: ['autodocs'],

  parameters: {
    docs: {
      description: {
        component: 'A card component that displays a service with an icon, title, description, and a link.',
      },
    },
  },
  argTypes: {
  },
  decorators: [
    (Story) => (
      <>
        <Story />
      <Toaster richColors position="top-right" closeButton visibleToasts={9} />
      </>
    ),
  ],
} as Meta;

const Template: StoryFn<ContactSectionProps> = (args) => <ContactSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  sectionHeading: {
    title: 'Get in Touch',
    subtitle: 'We would love to hear from you',
  },
  image: {
    src: '/assets/images/contact.png',
    alt: 'Contact Us',
    blurDataURL: 'data:image/jpeg;base64,...', // Add your blur data URL here
  },
  contactInfo: {
    sectionHeading: {
      title: 'Contact Information',
      subtitle: 'Reach out to us through any of the following methods',
    },
    location: '123 Main Street, Anytown, AT 12345',
    mail: 'info@example.com',
    phone: '+1 (555) 123-4567',
  },
  locations: [
    {
      title: 'Head Office',
      location: '123 Main Street, Anytown, AT 12345',
      mails: ['headoffice@example.com'],
      phoneNumbers: ['+1 (555) 123-4567'],
      embedUrl: 'https://www.google.com/maps/embed?...', // Add your Google Maps embed URL here
    },
    {
      title: 'Branch Office',
      location: '456 Elm Street, Othertown, OT 67890',
      mails: ['branchoffice@example.com'],
      phoneNumbers: ['+1 (555) 987-6543'],
      embedUrl: 'https://www.google.com/maps/embed?...', // Add your Google Maps embed URL here
    },
  ],
};