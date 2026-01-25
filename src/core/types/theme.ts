/**
 * Theme Types and Interfaces
 */

export type UIProvider = 'internal' | 'mui';

export type ThemeMode = 'light' | 'dark';

export interface ThemeConfig {
  mode: ThemeMode;
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  borderRadius?: number;
  spacing?: number;
}
