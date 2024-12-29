import React from 'react'
import AppLauncher from './AppLauncher'

export default {
  title: 'Header/AppLauncher',
  component: AppLauncher,
}

const Template = (args) => <AppLauncher {...args} />

export const Default = Template.bind({})
Default.args = {
  apps: [
    {
      name: 'Mail',
      icon: { type: 'light', name: 'inbox' },
      link: 'https://mail.example.com',
    },
    {
      name: 'Calendar',
      icon: { type: 'light', name: 'calendar' },
      link: 'https://calendar.example.com',
    },
    {
      name: 'Microsoft 365',
      icon: { type: 'light', name: 'browser' },
    },
    {
      name: 'OneDrive',
      icon: { type: 'light', name: 'browser' },
    },
    {
      name: 'Admin',
      icon: { type: 'light', name: 'browser' },
    },
    {
      name: 'Forms',
      icon: { type: 'light', name: 'browser' },
    },
    {
      name: 'Power Automate',
      icon: { type: 'light', name: 'browser' },
    },
    {
      name: 'SharePoint',
      icon: { type: 'light', name: 'browser' },
    },
    {
      name: 'Dropbox for Business',
      icon: { type: 'light', name: 'browser' },
    },
    {
      name: 'Atlassian Cloud',
      icon: { url: '/logos/atlassiancloud.png' },
    },
    {
      name: 'Amazon Web Services (AWS)',
      icon: { url: '/logos/dropbox.png' },
    },
    // Add more app items here...
  ],
}
