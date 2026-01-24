import type { Preview } from '@storybook/react';
import React from 'react';
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
    description: 'Switch between light, dark, and custom theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light', icon: 'sun' },
        { value: 'dark', title: 'Dark', icon: 'moon' },
        { value: 'custom', title: 'Custom', icon: 'paintbrush' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
  tenantId: {
    name: 'Tenant ID',
    description: 'Select tenant for multi-tenant testing',
    defaultValue: 'tenant-1',
    toolbar: {
      icon: 'user',
      items: [
        { value: 'tenant-1', title: 'Tenant 1 (Default)' },
        { value: 'tenant-2', title: 'Tenant 2 (Enterprise)' },
        { value: 'tenant-3', title: 'Tenant 3 (Startup)' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
  featureFlags: {
    name: 'Feature Flags',
    description: 'Toggle feature flags for testing',
    defaultValue: {
      darkMode: false,
      advancedSearch: true,
      betaFeatures: false,
      exportData: true,
      notifications: true,
    },
    toolbar: {
      icon: 'wrench',
      items: [
        { value: 'all-enabled', title: 'All Enabled' },
        { value: 'all-disabled', title: 'All Disabled' },
        { value: 'default', title: 'Default' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

// Global decorator to wrap all stories with UIProvider and RenderContext
const withUIProvider = (Story: any, context: any) => {
  const provider = context.globals.provider as UIProviderType;
  const themeMode = context.globals.theme as 'light' | 'dark' | 'custom';
  const tenantId = context.globals.tenantId as string;
  const featureFlagsPreset = context.globals.featureFlags as string | Record<string, boolean>;

  // Handle feature flags presets
  let featureFlags: Record<string, boolean>;
  if (typeof featureFlagsPreset === 'string') {
    switch (featureFlagsPreset) {
      case 'all-enabled':
        featureFlags = {
          darkMode: true,
          advancedSearch: true,
          betaFeatures: true,
          exportData: true,
          notifications: true,
        };
        break;
      case 'all-disabled':
        featureFlags = {
          darkMode: false,
          advancedSearch: false,
          betaFeatures: false,
          exportData: false,
          notifications: false,
        };
        break;
      default: // 'default'
        featureFlags = {
          darkMode: false,
          advancedSearch: true,
          betaFeatures: false,
          exportData: true,
          notifications: true,
        };
    }
  } else {
    featureFlags = featureFlagsPreset || {
      darkMode: false,
      advancedSearch: true,
      betaFeatures: false,
      exportData: true,
      notifications: true,
    };
  }

  // Apply custom theme if selected
  const customThemeColors = themeMode === 'custom' ? {
    primary: '#6366f1',
    secondary: '#ec4899',
    background: '#0f172a',
    foreground: '#f1f5f9',
  } : undefined;

  return (
    <RenderContextProvider
      value={{
        depth: 0,
        maxDepth: 50,
        provider: provider,
        tenantId: tenantId,
        theme: {
          mode: themeMode === 'custom' ? 'dark' : themeMode,
          colors: customThemeColors,
        },
        featureFlags: featureFlags,
      }}
    >
      <div 
        className={themeMode} 
        style={{ 
          minHeight: '100vh',
          backgroundColor: customThemeColors?.background || (themeMode === 'dark' ? '#1a1a1a' : '#ffffff'),
          color: customThemeColors?.foreground || (themeMode === 'dark' ? '#ffffff' : '#000000'),
        }}
      >
        <div style={{ padding: '2rem', minHeight: '100vh' }}>
          <Story />
        </div>
      </div>
    </RenderContextProvider>
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
