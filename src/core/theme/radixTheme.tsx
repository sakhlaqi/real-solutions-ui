/**
 * Radix UI Theme Integration
 * Maps design tokens to Radix Themes configuration
 */

import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { ThemeConfig } from '../types';

/**
 * Maps design token colors to Radix color scales
 */
export const mapToRadixColor = (color?: string): string => {
  if (!color) return 'blue';
  
  // Color mapping
  const colorMap: Record<string, string> = {
    '#1976d2': 'blue',
    '#2196f3': 'blue',
    '#0288d1': 'blue',
    '#dc004e': 'crimson',
    '#f50057': 'crimson',
    '#c51162': 'crimson',
    '#f44336': 'red',
    '#ff9800': 'orange',
    '#ffeb3b': 'yellow',
    '#4caf50': 'green',
    '#2e7d32': 'green',
    '#9c27b0': 'purple',
    '#673ab7': 'violet',
    '#3f51b5': 'indigo',
    '#00bcd4': 'cyan',
    '#009688': 'teal',
  };

  return colorMap[color.toLowerCase()] || 'blue';
};

/**
 * Maps theme mode to Radix appearance
 */
export const mapThemeMode = (mode?: 'light' | 'dark'): 'light' | 'dark' => {
  return mode || 'light';
};

/**
 * Radix Theme Provider Props
 */
export interface RadixThemeProviderProps {
  children: React.ReactNode;
  theme: ThemeConfig;
}

/**
 * Radix Theme Provider Component
 * Wraps application with Radix Themes provider
 */
export const RadixThemeProvider: React.FC<RadixThemeProviderProps> = ({ children, theme }) => {
  const accentColor = mapToRadixColor(theme.primaryColor);
  const grayColor = 'slate'; // Default gray scale
  const appearance = mapThemeMode(theme.mode);
  const radius = theme.borderRadius ? 
    (theme.borderRadius <= 4 ? 'small' : theme.borderRadius >= 12 ? 'large' : 'medium') : 
    'medium';

  return (
    <Theme
      accentColor={accentColor as any}
      grayColor={grayColor as any}
      appearance={appearance}
      radius={radius as any}
      scaling="100%"
      hasBackground={false}
    >
      {children}
    </Theme>
  );
};

export default RadixThemeProvider;
