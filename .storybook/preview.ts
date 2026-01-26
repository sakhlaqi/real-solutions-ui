import type { Preview } from '@storybook/react';
import { withThemeProvider, withViewport, withContainer } from './decorators';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'fullscreen',
    docs: {
      toc: true,
    },
  },
  globalTypes: {
    themePreset: {
      description: 'Theme Preset',
      defaultValue: 'marketing-page-mui',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'marketing-page-mui', title: 'Marketing (Blue)', icon: 'circle' },
          { value: 'landing-page-mui', title: 'Landing (Indigo)', icon: 'circle' },
          { value: 'blog-mui', title: 'Blog (Green)', icon: 'circle' },
          { value: 'auth-mui', title: 'Auth (Blue)', icon: 'circle' },
        ],
        dynamicTitle: true,
      },
    },
    themeMode: {
      description: 'Theme Mode',
      defaultValue: 'light',
      toolbar: {
        title: 'Mode',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
    viewport: {
      description: 'Viewport Size',
      defaultValue: 'desktop',
      toolbar: {
        title: 'Viewport',
        icon: 'mobile',
        items: [
          { value: 'mobile', title: 'Mobile (375px)', icon: 'mobile' },
          { value: 'tablet', title: 'Tablet (768px)', icon: 'tablet' },
          { value: 'desktop', title: 'Desktop (100%)', icon: 'browser' },
          { value: 'wide', title: 'Wide (1920px)', icon: 'grow' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withThemeProvider, withViewport, withContainer],
};

export default preview;
