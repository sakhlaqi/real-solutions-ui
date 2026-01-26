/**
 * Internal Theme Provider Adapter
 * 
 * Converts ThemePreset to CSS variables for internal provider
 */

import type { ThemePreset } from '../types';

/**
 * Convert ThemePreset to CSS Variables
 * 
 * @example
 * ```tsx
 * import { marketingPagePreset } from '@/core/theme/presets';
 * import { presetToCSSVariables } from '@/core/theme/adapters/internal';
 * 
 * function App() {
 *   const cssVars = presetToCSSVariables(marketingPagePreset);
 *   
 *   return (
 *     <div style={cssVars}>
 *       <YourApp />
 *     </div>
 *   );
 * }
 * ```
 */
export function presetToCSSVariables(preset: ThemePreset): React.CSSProperties {
  const vars: Record<string, string> = {};

  // Mode
  vars['--theme-mode'] = preset.mode;

  // Colors
  vars['--color-primary'] = preset.colors.primary;
  vars['--color-primary-light'] = preset.colors.primaryLight || preset.colors.primary;
  vars['--color-primary-dark'] = preset.colors.primaryDark || preset.colors.primary;
  vars['--color-primary-contrast'] = preset.colors.primaryContrast || '#ffffff';

  vars['--color-secondary'] = preset.colors.secondary;
  vars['--color-secondary-light'] = preset.colors.secondaryLight || preset.colors.secondary;
  vars['--color-secondary-dark'] = preset.colors.secondaryDark || preset.colors.secondary;
  vars['--color-secondary-contrast'] = preset.colors.secondaryContrast || '#ffffff';

  vars['--color-background'] = preset.colors.background || '#ffffff';
  vars['--color-surface'] = preset.colors.surface || '#f5f5f5';
  vars['--color-paper'] = preset.colors.paper || '#ffffff';

  vars['--color-text-primary'] = preset.colors.textPrimary || '#212121';
  vars['--color-text-secondary'] = preset.colors.textSecondary || '#757575';
  vars['--color-text-disabled'] = preset.colors.textDisabled || '#9e9e9e';

  vars['--color-success'] = preset.colors.success || '#4caf50';
  vars['--color-warning'] = preset.colors.warning || '#ff9800';
  vars['--color-error'] = preset.colors.error || '#f44336';
  vars['--color-info'] = preset.colors.info || '#2196f3';

  vars['--color-border'] = preset.colors.border || '#e0e0e0';
  vars['--color-divider'] = preset.colors.divider || '#e0e0e0';
  vars['--color-overlay'] = preset.colors.overlay || 'rgba(0, 0, 0, 0.5)';

  // Typography
  vars['--font-family'] = preset.typography.fontFamily;
  vars['--font-size-base'] = `${preset.typography.fontSize}px`;
  vars['--font-weight-base'] = `${preset.typography.fontWeight}`;

  // Spacing
  vars['--spacing-unit'] = `${preset.spacing.unit}px`;
  vars['--spacing-xs'] = `${preset.spacing.xs}px`;
  vars['--spacing-sm'] = `${preset.spacing.sm}px`;
  vars['--spacing-md'] = `${preset.spacing.md}px`;
  vars['--spacing-lg'] = `${preset.spacing.lg}px`;
  vars['--spacing-xl'] = `${preset.spacing.xl}px`;
  vars['--spacing-2xl'] = `${preset.spacing['2xl']}px`;
  vars['--spacing-3xl'] = `${preset.spacing['3xl']}px`;

  // Radius
  vars['--radius-none'] = `${preset.radius.none}px`;
  vars['--radius-sm'] = `${preset.radius.sm}px`;
  vars['--radius-md'] = `${preset.radius.md}px`;
  vars['--radius-lg'] = `${preset.radius.lg}px`;
  vars['--radius-xl'] = `${preset.radius.xl}px`;
  vars['--radius-full'] = `${preset.radius.full}px`;

  // Shadows
  vars['--shadow-none'] = preset.shadows.none;
  vars['--shadow-sm'] = preset.shadows.sm;
  vars['--shadow-md'] = preset.shadows.md;
  vars['--shadow-lg'] = preset.shadows.lg;
  vars['--shadow-xl'] = preset.shadows.xl;
  vars['--shadow-2xl'] = preset.shadows['2xl'];

  return vars as React.CSSProperties;
}

/**
 * Generate CSS string from preset
 */
export function presetToCSS(preset: ThemePreset, selector = ':root'): string {
  const vars = presetToCSSVariables(preset);
  
  const cssLines = [
    `${selector} {`,
    ...Object.entries(vars).map(([key, value]) => `  ${key}: ${value};`),
    '}',
  ];

  return cssLines.join('\n');
}
