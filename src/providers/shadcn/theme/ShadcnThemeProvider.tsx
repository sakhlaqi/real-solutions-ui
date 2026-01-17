import React, { useEffect } from 'react';
import type { ThemeConfig } from '../../../core/types/theme';
import '../styles/globals.css';

export interface ShadcnThemeProviderProps {
  children: React.ReactNode;
  theme: ThemeConfig;
}

/**
 * Theme provider for shadcn/ui components
 * Maps ThemeConfig tokens to CSS variables and manages dark mode
 */
export const ShadcnThemeProvider: React.FC<ShadcnThemeProviderProps> = ({
  children,
  theme,
}) => {
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply theme mode (light/dark)
    if (theme.mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Map custom colors if provided
    if (theme.primaryColor) {
      const hsl = hexToHSL(theme.primaryColor);
      root.style.setProperty('--primary', hsl);
    }

    if (theme.secondaryColor) {
      const hsl = hexToHSL(theme.secondaryColor);
      root.style.setProperty('--secondary', hsl);
    }

    // Map border radius if provided
    if (theme.borderRadius !== undefined) {
      root.style.setProperty('--radius', `${theme.borderRadius}rem`);
    }

    // Font family
    if (theme.fontFamily) {
      root.style.setProperty('font-family', theme.fontFamily);
    }
  }, [theme]);

  return <>{children}</>;
};

/**
 * Convert hex color to HSL format required by shadcn CSS variables
 */
function hexToHSL(hex: string): string {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  // Convert to degrees and percentages
  const hDeg = Math.round(h * 360);
  const sPercent = Math.round(s * 100);
  const lPercent = Math.round(l * 100);

  return `${hDeg} ${sPercent}% ${lPercent}%`;
}
