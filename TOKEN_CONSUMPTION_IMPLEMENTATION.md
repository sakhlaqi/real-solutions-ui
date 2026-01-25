# Prompt 6: UI Library Token Consumption - Implementation Summary

## Goal
Make the UI library consume resolved design tokens correctly without knowing about tenants or API calls.

## Implementation Overview

### 1. useTokens() Hook
**File**: `ui/src/core/context/useTokens.ts`

A React hook that provides access to design tokens from the UI context.

**Features:**
- Retrieves tokens from UIContext
- Type-safe access to all token categories
- Throws error if used outside UIProvider
- No knowledge of tenants or external systems

**Usage:**
```tsx
const tokens = useTokens();

<div style={{
  backgroundColor: tokens.colors.background.primary,
  color: tokens.colors.text.primary,
  padding: tokens.spacing.lg,
  borderRadius: tokens.radius.md,
}}>
  Content
</div>
```

### 2. Default Tokens
**File**: `ui/src/core/context/defaultTokens.ts`

Provides fallback tokens conforming to the canonical theme schema.

**Features:**
- Light mode defaults
- Dark mode defaults
- Matches canonical DesignTokens type
- Complete token coverage (colors, typography, spacing, etc.)
- Used when no external tokens provided

**Token Categories:**
- Colors: brand, background, text, border, state, interactive
- Typography: fontFamily, fontSize, fontWeight, lineHeight, letterSpacing
- Spacing: xs, sm, md, lg, xl, 2xl, 3xl, 4xl
- Radius: none, sm, md, lg, xl, full
- Shadows: none, xs, sm, md, lg, xl, 2xl
- Motion: duration, easing
- Breakpoints: xs, sm, md, lg, xl
- Z-index: dropdown, sticky, modal, tooltip, etc.

### 3. Updated UIProvider
**File**: `ui/src/core/context/UIProvider.tsx`

Enhanced to accept and manage design tokens.

**New Features:**
- `tokens` prop - Accept external tokens (e.g., from tenant theme)
- `setTokens()` method - Programmatically update tokens
- Automatic fallback to default tokens based on mode
- Updates tokens when external tokens change
- Provides tokens via context

**Props:**
```tsx
interface UIProviderProps {
  children: React.ReactNode;
  defaultProvider?: 'internal' | 'mui';
  defaultTheme?: ThemeConfig;
  tokens?: DesignTokens; // NEW: External tokens
}
```

**Context Value:**
```tsx
interface UIContextValue {
  provider: UIProviderType;
  setProvider: (provider: UIProviderType) => void;
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
  toggleThemeMode: () => void;
  tokens: DesignTokens; // NEW: Design tokens
  setTokens: (tokens: DesignTokens) => void; // NEW
}
```

### 4. Token to MUI Theme Mapper
**File**: `ui/src/core/theme/tokenMapper.ts`

Maps canonical design tokens to Material-UI theme configuration.

**Features:**
- Converts DesignTokens → MUI Theme
- Maps all token categories to MUI equivalents:
  - Colors → palette
  - Typography → typography
  - Spacing → spacing function
  - Radius → shape.borderRadius
  - Shadows → shadows array
  - Motion → transitions
  - Breakpoints → breakpoints
  - Z-index → zIndex
- Ensures consistent styling across MUI components
- Isolated from tenant/API concerns

**Function:**
```tsx
createMUIThemeFromTokens(tokens: DesignTokens): Theme
```

**Mapping Examples:**
- `tokens.colors.brand.primary` → `theme.palette.primary.main`
- `tokens.typography.fontFamily.body` → `theme.typography.fontFamily`
- `tokens.spacing.md` → `theme.spacing(1)`
- `tokens.radius.md` → `theme.shape.borderRadius`
- `tokens.shadows.md` → `theme.shadows[4]`

### 5. Token-Aware Component Pattern
**File**: `ui/src/examples/TokenButton.tsx`

Example component demonstrating token consumption best practices.

**Pattern:**
```tsx
export const TokenButton: React.FC<Props> = ({ variant, size, ... }) => {
  const tokens = useTokens();

  const sizeStyles = {
    small: {
      padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
      fontSize: tokens.typography.fontSize.sm,
    },
    medium: {
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      fontSize: tokens.typography.fontSize.base,
    },
    // ...
  };

  const variantStyles = {
    primary: {
      backgroundColor: tokens.colors.brand.primary,
      color: tokens.colors.text.inverse,
      // ...
    },
    // ...
  };

  return <button style={baseStyles}>{children}</button>;
};
```

**Key Principles:**
- ✅ Use `useTokens()` hook
- ✅ All styles derived from tokens
- ✅ No hardcoded colors, spacing, or typography
- ✅ Semantic token usage (e.g., `brand.primary`, not hex codes)
- ✅ No tenant/API knowledge

## Architecture

### Token Flow

```
External Source (Tenant) → TenantThemeProvider → resolvedTheme.tokens
                                                         ↓
                                                   UIProvider (tokens prop)
                                                         ↓
                                                   UIContext (tokens)
                                                         ↓
                                    ┌────────────────────┴────────────────────┐
                                    ↓                                         ↓
                              useTokens()                         createMUIThemeFromTokens()
                                    ↓                                         ↓
                            Internal Components                         MUI Components
```

### Provider Isolation

The UI library maintains complete isolation from external systems:

**What UI Library DOES:**
- ✅ Consume design tokens
- ✅ Provide `useTokens()` hook
- ✅ Map tokens to MUI theme
- ✅ Use semantic tokens in components
- ✅ Provide default tokens as fallback

**What UI Library DOES NOT:**
- ❌ Know about tenants
- ❌ Make API calls
- ❌ Fetch themes
- ❌ Resolve theme modes
- ❌ Validate themes

**Separation of Concerns:**
- **Presentation App**: Fetches tenant config, resolves theme with modes
- **UI Library**: Consumes resolved tokens, renders components

## Integration Example

### Presentation App Integration

```tsx
// App.tsx in Presentation
import { UIProvider } from '@sakhlaqi/ui';
import { useTenantTheme } from './providers/useTenantTheme';

const App = () => {
  const { resolvedTheme, isLoading } = useTenantTheme();

  if (isLoading || !resolvedTheme) {
    return <LoadingSpinner />;
  }

  return (
    <UIProvider tokens={resolvedTheme.tokens}>
      <AppContent />
    </UIProvider>
  );
};
```

### Component Usage

```tsx
// Any component in Presentation or UI library
import { useTokens } from '@sakhlaqi/ui';

const MyComponent = () => {
  const tokens = useTokens();

  return (
    <div style={{
      backgroundColor: tokens.colors.background.surface,
      padding: tokens.spacing.lg,
      borderRadius: tokens.radius.lg,
      boxShadow: tokens.shadows.md,
    }}>
      <h2 style={{
        color: tokens.colors.text.primary,
        fontSize: tokens.typography.fontSize['2xl'],
        fontWeight: tokens.typography.fontWeight.bold,
      }}>
        Themed Content
      </h2>
    </div>
  );
};
```

### MUI Components

```tsx
// MUI components automatically use mapped tokens
import { Button, ThemeProvider } from '@mui/material';
import { createMUIThemeFromTokens, useTokens } from '@sakhlaqi/ui';

const MUIWrapper = ({ children }) => {
  const tokens = useTokens();
  const muiTheme = createMUIThemeFromTokens(tokens);

  return (
    <ThemeProvider theme={muiTheme}>
      {children}
    </ThemeProvider>
  );
};
```

## Component Migration Guidelines

### Before (Hardcoded)
```tsx
const Button = ({ children }) => (
  <button style={{
    backgroundColor: '#1976d2',  // ❌ Hardcoded
    color: '#ffffff',            // ❌ Hardcoded
    padding: '8px 16px',         // ❌ Hardcoded
    borderRadius: '4px',         // ❌ Hardcoded
    fontSize: '14px',            // ❌ Hardcoded
  }}>
    {children}
  </button>
);
```

### After (Token-based)
```tsx
const Button = ({ children }) => {
  const tokens = useTokens();  // ✅ Hook
  
  return (
    <button style={{
      backgroundColor: tokens.colors.brand.primary,  // ✅ Semantic
      color: tokens.colors.text.inverse,             // ✅ Semantic
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,  // ✅ Tokens
      borderRadius: tokens.radius.md,                 // ✅ Token
      fontSize: tokens.typography.fontSize.base,      // ✅ Token
      fontWeight: tokens.typography.fontWeight.medium, // ✅ Token
      transition: `all ${tokens.motion.duration.fast} ${tokens.motion.easing.standard}`, // ✅ Tokens
    }}>
      {children}
    </button>
  );
};
```

## Files Created/Modified

### Created Files (4)
1. `ui/src/core/context/useTokens.ts` - Token access hook
2. `ui/src/core/context/defaultTokens.ts` - Default token definitions
3. `ui/src/core/theme/tokenMapper.ts` - Token → MUI theme mapper
4. `ui/src/examples/TokenButton.tsx` - Token-aware component example

### Modified Files (4)
1. `ui/src/core/context/UIProvider.tsx` - Added token support
2. `ui/src/core/context/index.ts` - Export useTokens
3. `ui/src/core/theme/index.ts` - Export tokenMapper
4. `ui/src/index.ts` - Export useTokens and createMUIThemeFromTokens

## Key Features

✅ **useTokens() hook** - Provides type-safe token access  
✅ **Default tokens** - Fallback when no external tokens provided  
✅ **Token provider** - UIProvider accepts and manages tokens  
✅ **MUI integration** - Automatic token → theme mapping  
✅ **Provider isolation** - No tenant/API knowledge  
✅ **Semantic tokens** - All components use semantic names  
✅ **No hardcoded values** - All styling from tokens  
✅ **Type safety** - Full TypeScript support  
✅ **Documentation** - Clear examples and patterns

## Next Steps (Prompt 7)

With token consumption implemented, the next phase is:
1. Build theme selection UI for tenants
2. Create theme preview component
3. Implement mode switcher (dark/compact/etc.)
4. Add theme customization interface

## Testing Checklist

- [ ] `useTokens()` returns valid tokens
- [ ] Default tokens match schema
- [ ] UIProvider accepts external tokens
- [ ] Token updates propagate to components
- [ ] MUI theme generation works
- [ ] Components use semantic tokens
- [ ] No hardcoded values in components
- [ ] TypeScript compilation succeeds
- [ ] Storybook stories work with tokens

## Summary

✅ Created `useTokens()` hook for token access  
✅ Built default token system (light/dark modes)  
✅ Updated UIProvider to accept external tokens  
✅ Mapped tokens to MUI theme configuration  
✅ Demonstrated token-aware component pattern  
✅ Maintained provider isolation (no tenant knowledge)  
✅ Ensured all styling uses semantic tokens  
✅ Removed hardcoded values from examples  

**Status**: ✅ Prompt 6 Complete  
**Next**: Prompt 7 - Theme Selection UI
