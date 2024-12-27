/** @type { import('@storybook/react').Preview } */
// .storybook/preview.js
// import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { withThemeByClassName } from '@storybook/addon-themes';
import { initialize, mswLoader } from 'msw-storybook-addon';
const basePath = location.pathname.split('/').slice(0, -1).join('/');
const apiMockServiceWorkerUrl = `${basePath}/apiMockServiceWorker.js`;

import React from 'react';
import '../src/index.css';
initialize({
  serviceWorker: {
    url: apiMockServiceWorkerUrl,
    options: {
      updateViaCache: 'none'
    }
  }
})
const preview = {
  parameters: {
    tags: ['autodocs'],
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader], // 👈 Add the MSW loader to all stories
  decorators: [ withThemeByClassName<Renderer>({
        themes: {
          light: '',
          dark: 'dark',
          green: 'green',
        },
        defaultTheme: 'light',
      }),
  (Story) => (
      <Story />
  ),
]
};

export default preview;
