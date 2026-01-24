import type { Preview } from '@storybook/react';
import React from 'react';
import { UIProvider } from '../src/core/context/UIProvider';
import { RenderContextProvider } from '../src/renderer/RenderContext';
import type { UIProvider as UIProviderType } from '../src/adapters';

// Storybook global types for toolbar
export const globalTypes = {
  provider: {
    name: 'UI Provider',
    description: 'Switch between UI implementation providers (affects adapters)',
    defaultValue: 'mui',
    toolbar: {
      icon: 'component',
      items: [
        { value: 'mui', title: 'Material-UI (MUI)', icon: 'paintbrush' },
        { value: 'internal', title: 'Internal (Fallback)', icon: 'box' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
  theme: {
    name: 'Theme Mode',
    description: 'Switch between light and dark theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light', icon: 'sun' },
        { value: 'dark', title: 'Dark', icon: 'moon' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

// Global decorator to wrap all stories with UIProvider and RenderContext
const withUIProvider = (Story: any, context: any) => {
  const provider = context.globals.provider as UIProviderType;
  const themeMode = context.globals.theme as 'light' | 'dark';

  return (
    <UIProvider
      defaultProvider={provider === 'mui' ? 'internal' : 'internal'}
      defaultTheme={{ mode: themeMode }}
    >
      <RenderContextProvider
        value={{
          depth: 0,
          maxDepth: 50,
          provider: provider,
        }}
      >
        <div className={themeMode} style={{ minHeight: '100vh' }}>
          <div className="bg-background text-foreground" style={{ padding: '2rem', minHeight: '100vh' }}>
            <Story />
          </div>
        </div>
      </RenderContextProvider>
    </UIProvider>
  );
};

const preview: Preview = {
  decorators: [withUIProvider],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
      ],
    },
    docs: {
      toc: true,
    },
  },
};

export default preview;
