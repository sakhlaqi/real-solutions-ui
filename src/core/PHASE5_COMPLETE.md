# 🧩 Phase 5 Complete – Theme Presets & Tokens

**Status:** ✅ COMPLETE  
**Build:** Successful (13.83s, 0 errors)  
**Date:** January 2025

## Overview

Phase 5 delivers an **upgrade-safe theming system** that makes templates visually distinct while enabling customization through JSON-based overrides. Templates now have rich, pre-configured themes that work seamlessly with both MUI and Internal (CSS Variables) providers.

## Key Features

✅ **Rich Theme Presets** – Full design token systems extracted from MUI templates  
✅ **JSON Diff Overrides** – Customize themes without breaking upgrades  
✅ **Provider Adapters** – Works with MUI `createTheme()` and CSS Variables  
✅ **Backwards Compatible** – Existing basic `ThemeConfig` still supported  
✅ **Type-Safe** – Full TypeScript support with extended types

## Architecture

### Theme System Structure

```
/core/theme/
├── types.ts              # Extended theme types (ThemePreset, ThemeOverride)
├── registry.ts           # Central preset registry with override support
├── utils.ts              # JSON diff utilities, deep merge, CSS generation
├── index.ts              # Main export point
├── presets/
│   ├── marketing-page.ts # Professional blue theme (#1976d2)
│   ├── landing-page.ts   # Bold indigo theme (#6366f1)
│   ├── blog.ts           # Clean green theme (#2e7d32)
│   ├── auth.ts           # Trustworthy blue theme (#1976d2)
│   └── index.ts          # Auto-registration
└── adapters/
    ├── mui.ts            # MUI theme converter
    └── internal.ts       # CSS Variables converter
```

### Type System

**ThemePreset** – Rich design tokens:
```typescript
interface ThemePreset {
  id: string;
  name: string;
  mode: 'light' | 'dark';
  colors: ColorPalette;        // primary, secondary, backgrounds, text, status, UI
  typography: TypographyConfig; // fontFamily, scales, h1-h6, body, caption
  spacing: SpacingScale;        // unit-based (xs, sm, md, lg, xl, 2xl, 3xl)
  radius: RadiusScale;          // none, sm, md, lg, xl, full
  shadows: ShadowScale;         // none, sm, md, lg, xl, 2xl
  breakpoints: Breakpoints;     // xs, sm, md, lg, xl, 2xl
  provider: {                   // Compatibility flags
    supportsMui: boolean;
    supportsInternal: boolean;
  };
}
```

**ThemeOverride** – Partial updates:
```typescript
type ThemeOverride = Partial<Omit<ThemePreset, 'id' | 'name' | 'provider'>>;
```

**ResolvedTheme** – Preset + overrides:
```typescript
interface ResolvedTheme extends ThemePreset {
  appliedOverrides?: ThemeOverride;
}
```

## Usage Examples

### 1. Basic Usage (Backwards Compatible)

```typescript
import { marketingPageTheme } from '@real-solutions/ui/core/templates/marketing-page';

// Still works with existing ThemeConfig interface
<ThemeProvider theme={marketingPageTheme}>
  <App />
</ThemeProvider>
```

### 2. Rich Preset Usage

```typescript
import { themePresetRegistry } from '@real-solutions/ui/core/theme';

// Get a preset
const preset = themePresetRegistry.get('marketing-page-mui');

console.log(preset.colors.primary);      // '#1976d2'
console.log(preset.typography.h1);       // { fontSize: '2.5rem', fontWeight: 700, ... }
console.log(preset.spacing.md);          // 16 (2 * 8px unit)
```

### 3. Apply JSON Diff Overrides

```typescript
import { themePresetRegistry } from '@real-solutions/ui/core/theme';

// Customize a preset
const customTheme = themePresetRegistry.applyOverrides('marketing-page-mui', {
  colors: {
    primary: '#ff0000',  // Override primary color
    secondary: '#00ff00',
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: { fontSize: '3rem' },  // Override h1 size
  },
  radius: {
    md: 8,  // Override medium radius
  },
});

// Deep merge preserves other values
console.log(customTheme.colors.background);  // Original value preserved
console.log(customTheme.colors.primary);     // '#ff0000' (overridden)
```

### 4. Create Theme Variant

```typescript
import { themePresetRegistry } from '@real-solutions/ui/core/theme';

// Create a dark variant
const darkMarketingTheme = themePresetRegistry.createVariant(
  'marketing-page-mui',
  'dark',
  {
    mode: 'dark',
    colors: {
      background: '#121212',
      surface: '#1e1e1e',
      paper: '#2a2a2a',
    },
  }
);
```

### 5. MUI Provider Integration

```typescript
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themePresetRegistry, presetToMuiTheme } from '@real-solutions/ui/core/theme';

// Convert preset to MUI theme
const preset = themePresetRegistry.get('landing-page-mui');
const muiTheme = createTheme(presetToMuiTheme(preset));

// Use with MUI
<ThemeProvider theme={muiTheme}>
  <App />
</ThemeProvider>
```

### 6. CSS Variables Integration

```typescript
import { themePresetRegistry, presetToCSSVariables, presetToCSS } from '@real-solutions/ui/core/theme';

const preset = themePresetRegistry.get('blog-mui');

// Option 1: React CSSProperties
const cssVars = presetToCSSVariables(preset);
<div style={cssVars}>
  <App />
</div>

// Option 2: CSS String
const cssString = presetToCSS(preset);
// Inject into <style> tag or CSS file
```

### 7. Template Theme Customization

```typescript
import { 
  marketingPageThemePresetId, 
  marketingPageTheme 
} from '@real-solutions/ui/core/templates/marketing-page';
import { themePresetRegistry } from '@real-solutions/ui/core/theme';

// Option 1: Use basic config
<ThemeProvider theme={marketingPageTheme}>
  <MarketingPage />
</ThemeProvider>

// Option 2: Customize via preset
const customTheme = themePresetRegistry.applyOverrides(marketingPageThemePresetId, {
  colors: { primary: '#9c27b0' },  // Purple instead of blue
});

<ThemeProvider theme={customTheme}>
  <MarketingPage />
</ThemeProvider>
```

## Available Presets

### 1. Marketing Page (`marketing-page-mui`)

**Theme:** Professional blue (#1976d2)  
**Font:** Roboto  
**Use Case:** Corporate marketing sites, business landing pages

```typescript
const preset = themePresetRegistry.get('marketing-page-mui');
// Colors: Blue primary, gray secondary
// Typography: Standard weights (300-700)
// Spacing: 8px unit base
// Radius: Moderate (4-16px)
```

### 2. Landing Page (`landing-page-mui`)

**Theme:** Bold indigo (#6366f1) with pink accent (#ec4899)  
**Font:** Inter  
**Use Case:** Product launches, SaaS landing pages, modern web apps

```typescript
const preset = themePresetRegistry.get('landing-page-mui');
// Colors: Indigo primary, pink secondary
// Typography: Larger sizes (h1: 3.5rem), tight letter spacing
// Spacing: 8px unit base
// Radius: Larger (8-24px) for modern look
// Breakpoints: Tailwind-inspired (640/768/1024/1280/1536)
```

### 3. Blog (`blog-mui`)

**Theme:** Clean green (#2e7d32) with orange accent (#ff6f00)  
**Font:** Georgia (serif)  
**Use Case:** Content sites, blogs, documentation

```typescript
const preset = themePresetRegistry.get('blog-mui');
// Colors: Green primary, orange secondary
// Typography: Larger base (18px), extra line height (1.8) for readability
// Spacing: 8px unit base
// Radius: Subtle (2-12px)
// Shadows: Minimal for content focus
```

### 4. Auth (`auth-mui`)

**Theme:** Trustworthy blue (#1976d2) with gray accent  
**Font:** Roboto  
**Use Case:** Sign-in, sign-up, password reset pages

```typescript
const preset = themePresetRegistry.get('auth-mui');
// Colors: Blue primary, gray secondary
// Typography: Button styles with uppercase transform
// Spacing: 8px unit base
// Radius: Standard (4-16px)
// Shadows: Standard elevation
```

## Design Token Reference

### Color Palette Structure

```typescript
colors: {
  // Primary color with variants
  primary: string;           // Main brand color
  primaryLight: string;      // Lighter shade
  primaryDark: string;       // Darker shade
  primaryContrast: string;   // Contrast text color

  // Secondary color with variants
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  secondaryContrast: string;

  // Backgrounds
  background: string;        // Page background
  surface: string;           // Card/surface background
  paper: string;             // Elevated surface

  // Text colors
  textPrimary: string;       // Main text
  textSecondary: string;     // Secondary text
  textDisabled: string;      // Disabled text

  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;

  // UI colors
  border: string;
  divider: string;
  overlay: string;
}
```

### Typography Scale

```typescript
typography: {
  fontFamily: string;        // Base font
  fontSize: number;          // Base size (px)
  fontWeight: number;        // Base weight

  // Heading styles
  h1: { fontSize, fontWeight, lineHeight, letterSpacing }
  h2: { fontSize, fontWeight, lineHeight, letterSpacing }
  h3: { fontSize, fontWeight, lineHeight, letterSpacing }
  h4: { fontSize, fontWeight, lineHeight, letterSpacing }
  h5: { fontSize, fontWeight, lineHeight, letterSpacing }
  h6: { fontSize, fontWeight, lineHeight, letterSpacing }

  // Body styles
  body: { fontSize, fontWeight, lineHeight }
  caption: { fontSize, fontWeight, lineHeight }
}
```

### Spacing Scale (Unit-Based)

```typescript
spacing: {
  unit: 8,      // Base unit (8px)
  xs: 4,        // 0.5 * unit
  sm: 8,        // 1 * unit
  md: 16,       // 2 * unit
  lg: 24,       // 3 * unit
  xl: 32,       // 4 * unit
  '2xl': 48,    // 6 * unit
  '3xl': 64,    // 8 * unit
}
```

### Border Radius Scale

```typescript
radius: {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,  // Perfect circles
}
```

### Shadow Scale

```typescript
shadows: {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
}
```

## Advanced Features

### Theme Registry API

```typescript
import { themePresetRegistry } from '@real-solutions/ui/core/theme';

// Get preset
themePresetRegistry.get('marketing-page-mui');

// Get all presets
themePresetRegistry.getAll();

// Filter by mode
themePresetRegistry.getByMode('light');

// Filter by provider
themePresetRegistry.getByProvider('mui');

// Apply overrides (deep merge)
themePresetRegistry.applyOverrides('blog-mui', { colors: { primary: '#000' } });

// Create variant
themePresetRegistry.createVariant('auth-mui', 'dark', { mode: 'dark' });
```

### Utility Functions

```typescript
import {
  applyThemeOverrides,
  basicConfigToOverride,
  extractThemeDiff,
  themeToCSSVariables,
} from '@real-solutions/ui/core/theme';

// Apply overrides
const customized = applyThemeOverrides(basePreset, { colors: { primary: '#000' } });

// Convert basic config to override
const override = basicConfigToOverride({ primaryColor: '#ff0000', mode: 'light' });

// Extract diff between themes
const diff = extractThemeDiff(theme1, theme2);

// Generate CSS variables
const cssVars = themeToCSSVariables(preset);
```

## Migration Guide

### From Basic Theming

**Before:**
```typescript
const theme = {
  mode: 'light',
  primaryColor: '#1976d2',
  secondaryColor: '#757575',
  fontFamily: 'Roboto',
  borderRadius: 4,
  spacing: 8,
};
```

**After (Option 1 - Use Preset):**
```typescript
import { themePresetRegistry } from '@real-solutions/ui/core/theme';
const theme = themePresetRegistry.get('marketing-page-mui');
```

**After (Option 2 - Customize Preset):**
```typescript
import { themePresetRegistry } from '@real-solutions/ui/core/theme';
const theme = themePresetRegistry.applyOverrides('marketing-page-mui', {
  colors: { primary: '#1976d2', secondary: '#757575' },
  typography: { fontFamily: 'Roboto' },
});
```

### Backwards Compatibility

All templates still export basic `ThemeConfig` objects for existing integrations:

```typescript
// Still works
import { marketingPageTheme } from '@real-solutions/ui/core/templates/marketing-page';
<ThemeProvider theme={marketingPageTheme} />

// New way (richer features)
import { marketingPageThemePresetId } from '@real-solutions/ui/core/templates/marketing-page';
import { themePresetRegistry } from '@real-solutions/ui/core/theme';
const richTheme = themePresetRegistry.get(marketingPageThemePresetId);
```

## Upgrade Safety

### JSON Diff Overrides

Theme customizations use **partial overrides** that merge with presets:

```typescript
// Only override what you need
const customTheme = themePresetRegistry.applyOverrides('marketing-page-mui', {
  colors: { primary: '#9c27b0' },  // Purple instead of blue
});

// All other values preserved from preset
customTheme.colors.secondary;     // Original value
customTheme.typography.fontFamily; // Original value
customTheme.spacing.md;            // Original value
```

When presets are updated in future library versions, your overrides merge with the new values, preserving customizations while gaining new features.

### Deep Merge Strategy

The override system uses deep merging:

```typescript
const override = {
  colors: {
    primary: '#ff0000',  // Override only primary
  },
};

// Merges deeply
const result = applyOverrides(preset, override);
result.colors.primary;    // '#ff0000' (overridden)
result.colors.secondary;  // Original value (preserved)
result.colors.background; // Original value (preserved)
```

## CSS Variables Output

### Generated Variables

```css
:root {
  /* Colors */
  --color-primary: #1976d2;
  --color-primary-light: #42a5f5;
  --color-primary-dark: #1565c0;
  --color-primary-contrast: #ffffff;
  
  --color-secondary: #757575;
  --color-secondary-light: #a4a4a4;
  --color-secondary-dark: #494949;
  --color-secondary-contrast: #ffffff;
  
  --color-background: #fafafa;
  --color-surface: #ffffff;
  --color-paper: #ffffff;
  
  --color-text-primary: rgba(0, 0, 0, 0.87);
  --color-text-secondary: rgba(0, 0, 0, 0.6);
  --color-text-disabled: rgba(0, 0, 0, 0.38);
  
  --color-success: #4caf50;
  --color-warning: #ff9800;
  --color-error: #f44336;
  --color-info: #2196f3;
  
  --color-border: rgba(0, 0, 0, 0.12);
  --color-divider: rgba(0, 0, 0, 0.12);
  --color-overlay: rgba(0, 0, 0, 0.5);
  
  /* Typography */
  --font-family: 'Roboto', sans-serif;
  --font-size: 16px;
  --font-weight: 400;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;
  
  /* Radius */
  --radius-none: 0;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
}
```

## Testing

```bash
# Type check
npm run type-check  ✅ 0 errors

# Build
npm run build      ✅ 13.83s (0 errors)
```

## Next Steps

### Immediate Enhancements
- [ ] Dark mode presets for each template
- [ ] Theme variant generator UI
- [ ] Visual theme editor component
- [ ] Export/import theme JSON

### Future Features
- [ ] Theme marketplace
- [ ] A/B testing for themes
- [ ] Theme analytics
- [ ] Accessibility compliance checker

## Summary

Phase 5 delivers a **production-ready theming system** with:

✅ **4 Rich Presets** – Marketing, Landing, Blog, Auth  
✅ **Full Design Tokens** – Colors, typography, spacing, radius, shadows, breakpoints  
✅ **JSON Override System** – Upgrade-safe customization via deep merge  
✅ **Provider Adapters** – MUI and CSS Variables support  
✅ **Type-Safe** – Complete TypeScript coverage  
✅ **Backwards Compatible** – Existing code continues to work  
✅ **Build Verified** – 0 TypeScript errors

Templates now have **distinct visual identities** while remaining **fully customizable** and **upgrade-safe** through the JSON diff override system.
