import type { Preview, ReactRenderer } from '@storybook/react'
// /** @type { import('@storybook/react').Preview } */
// .storybook/preview.js
import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/blocks'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { withThemeByClassName } from '@storybook/addon-themes'
const basePath = location.pathname.split('/').slice(0, -1).join('/')
const apiMockServiceWorkerUrl = `${basePath}/apiMockServiceWorker.js`
import { ComponentCode } from './componentCode'
import React from 'react'
// import { AOSInit } from '@/lib/utils/AOSInit'
import { Observer } from 'tailwindcss-intersect';

import '../src/globals.css'
initialize({
  serviceWorker: {
    url: apiMockServiceWorkerUrl,
    options: {
      updateViaCache: 'none',
    },
  },
})
const preview = {
  parameters: {
    tags: ['autodocs'],
    nextjs: {
      appDirectory: true,
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Style Guide', 'Reusable Blocks', 'Example Pages', 'Website Components'],
        locales: '',
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      page: (context) => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <ComponentCode of={context.meta} />
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
    },
  },
  loaders: [mswLoader], // 👈 Add the MSW loader to all stories
  decorators: [
    (Story) => (
      <>
        <Story />
      </>
    ),
    Observer.start(),
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
        green: 'green',
      },
      defaultTheme: 'light',
    }),
  ],
}

export default preview
