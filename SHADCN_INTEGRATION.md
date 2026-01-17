# shadcn/ui Integration

## Overview

The `@sakhlaqi/ui` library now supports **shadcn/ui** as a fourth UI provider alongside Internal, MUI, and Radix. This integration treats shadcn as a first-class provider, maintaining the same adapter pattern and consumer API.

## Architecture

### Provider Pattern

shadcn components are wrapped in adapters that map to the library's common interface:

```
Consumer Code (uses adapters)
    ↓
Adapter (routes based on provider)
    ↓
shadcn Provider Component (maps props)
    ↓
shadcn/ui Base Component
```

### Folder Structure

```
src/providers/shadcn/
├── ui/                     # Base shadcn components
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── accordion.tsx
│   ├── dialog.tsx
│   ├── label.tsx
│   └── index.ts
├── theme/                  # Theme provider
│   ├── ShadcnThemeProvider.tsx
│   └── index.ts
├── utils/                  # Utilities
│   ├── cn.ts              # className merger
│   └── index.ts
├── styles/                 # Global styles
│   └── globals.css        # CSS variables
├── Button.tsx              # Provider adapter
├── Input.tsx               # Provider adapter
└── index.ts                # Main exports
```

## Usage

### Basic Setup

```tsx
import { UIProvider } from '@sakhlaqi/ui';

function App() {
  return (
    <UIProvider 
      defaultProvider="shadcn"
      defaultTheme={{ mode: 'light' }}
    >
      {/* Your app */}
    </UIProvider>
  );
}
```

### Using Components

Components work the same regardless of provider:

```tsx
import { Button, Input } from '@sakhlaqi/ui';

function MyForm() {
  return (
    <>
      <Input 
        label="Email" 
        placeholder="Enter your email"
        fullWidth
      />
      <Button variant="contained" size="medium">
        Submit
      </Button>
    </>
  );
}
```

### Switching Providers

```tsx
import { useUIContext } from '@sakhlaqi/ui/core';

function ProviderSwitcher() {
  const { provider, setProvider } = useUIContext();

  return (
    <select value={provider} onChange={(e) => setProvider(e.target.value)}>
      <option value="internal">Internal</option>
      <option value="mui">Material-UI</option>
      <option value="radix">Radix</option>
      <option value="shadcn">shadcn/ui</option>
    </select>
  );
}
```

## Theming

### Theme Configuration

shadcn integrates with the library's theme system:

```tsx
const theme = {
  mode: 'dark',
  primaryColor: '#3b82f6',
  secondaryColor: '#8b5cf6',
  borderRadius: 0.5,
  fontFamily: 'Inter, sans-serif',
};

<UIProvider defaultProvider="shadcn" defaultTheme={theme}>
  <App />
</UIProvider>
```

### CSS Variables

shadcn uses CSS variables for theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96.1%;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode overrides */
}
```

### Dark Mode

Dark mode is controlled by the theme config:

```tsx
const { theme, toggleThemeMode } = useUIContext();

<button onClick={toggleThemeMode}>
  {theme.mode === 'light' ? '🌙' : '☀️'}
</button>
```

## Component Mapping

### Button

Library API → shadcn mapping:

| Library Prop | shadcn Prop | Notes |
|-------------|-------------|-------|
| `variant="contained"` | `variant="default"` | Filled button |
| `variant="outlined"` | `variant="outline"` | Outlined button |
| `variant="text"` | `variant="ghost"` | Text button |
| `color="error"` | `variant="destructive"` | Error/danger state |
| `size="small"` | `size="sm"` | Small size |
| `size="medium"` | `size="default"` | Default size |
| `size="large"` | `size="lg"` | Large size |

### Input

Library API → shadcn mapping:

| Library Prop | shadcn Implementation | Notes |
|-------------|----------------------|-------|
| `label` | `<Label>` component | Rendered above input |
| `error` | Red border + text | Error styling |
| `helperText` | Gray text below | Helper/error text |
| `startAdornment` | Absolute positioned | Icon/text at start |
| `endAdornment` | Absolute positioned | Icon/text at end |

## Dependencies

shadcn integration requires:

```json
{
  "dependencies": {
    "@radix-ui/react-accordion": "^1.x",
    "@radix-ui/react-dialog": "^1.x",
    "@radix-ui/react-label": "^1.x",
    "@radix-ui/react-slot": "^1.x",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.x",
    "lucide-react": "^0.x",
    "tailwind-merge": "^2.x"
  },
  "devDependencies": {
    "tailwindcss": "^3.x",
    "postcss": "^8.x",
    "autoprefixer": "^10.x",
    "tailwindcss-animate": "^1.x"
  }
}
```

## Implemented Components

Currently implemented shadcn components:

- ✅ Button
- ✅ Input
- ✅ Card (with Header, Content, Footer)
- ✅ Accordion
- ✅ Dialog/Modal
- ✅ Label

## Extending with More Components

To add a new shadcn component:

1. **Create base component** in `src/providers/shadcn/ui/`:

```tsx
// src/providers/shadcn/ui/badge.tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge: React.FC<BadgeProps> = ({ className, variant, ...props }) => (
  <div className={cn(badgeVariants({ variant }), className)} {...props} />
);
```

2. **Export from ui/index.ts**:

```tsx
export { Badge } from './badge';
export type { BadgeProps } from './badge';
```

3. **Create provider adapter** in `src/providers/shadcn/`:

```tsx
// src/providers/shadcn/Badge.tsx
import React from 'react';
import type { BaseBadgeProps } from '../../../core/types';
import { Badge as ShadcnBadge } from '../ui/badge';

export const Badge: React.FC<BaseBadgeProps> = ({ 
  children, 
  variant, 
  className 
}) => {
  return (
    <ShadcnBadge variant={variant} className={className}>
      {children}
    </ShadcnBadge>
  );
};
```

4. **Update adapter** in `src/adapters/`:

```tsx
// src/adapters/Badge.tsx
import { Badge as ShadcnBadge } from '../providers/shadcn';

export const Badge: React.FC<BaseBadgeProps> = (props) => {
  const { provider } = useUIContext();
  
  // ... other provider checks
  
  if (provider === 'shadcn') {
    return <ShadcnBadge {...props} />;
  }
  
  // ... fallback
};
```

## Best Practices

### 1. Type Safety

Always use proper TypeScript types:

```tsx
import type { ButtonProps } from '@sakhlaqi/ui';

const MyButton: React.FC<ButtonProps> = (props) => {
  // Type-safe component
};
```

### 2. className Handling

Use the `cn()` utility for combining classes:

```tsx
import { cn } from '@sakhlaqi/ui/providers/shadcn/utils';

<Button className={cn('custom-class', isActive && 'active')} />
```

### 3. Theme Consistency

Map theme tokens consistently across providers:

```tsx
// Good: Maps to primary color
primaryColor: '#3b82f6'

// Good: Maps to border radius
borderRadius: 0.5

// Avoid: Provider-specific values
```

### 4. Accessibility

Ensure all components maintain accessibility:

```tsx
<Button aria-label="Submit form">
  <SubmitIcon />
</Button>
```

## Troubleshooting

### Tailwind Classes Not Working

Ensure `tailwind.config.js` includes the shadcn paths:

```js
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  // ...
};
```

### Dark Mode Not Switching

Verify the `dark` class is applied to `<html>`:

```tsx
// UIProvider handles this automatically
<UIProvider defaultTheme={{ mode: 'dark' }}>
```

### CSS Variables Missing

Import global styles in your app:

```tsx
import '@sakhlaqi/ui/providers/shadcn/styles/globals.css';
```

## Migration Guide

### From Copy-Paste shadcn to Provider Pattern

If you were using shadcn components directly:

**Before:**
```tsx
import { Button } from '@/components/ui/button';

<Button variant="default">Click</Button>
```

**After:**
```tsx
import { Button } from '@sakhlaqi/ui';

<UIProvider defaultProvider="shadcn">
  <Button variant="contained">Click</Button>
</UIProvider>
```

## Performance

### Tree Shaking

The library supports tree shaking. Only imported providers are bundled:

```tsx
// Only shadcn components bundled
import { Button } from '@sakhlaqi/ui';
```

### Code Splitting

Import providers dynamically when needed:

```tsx
const shadcnComponents = await import('@sakhlaqi/ui/providers/shadcn');
```

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Library Architecture](./ARCHITECTURE.md)

## Support

For issues or questions:

1. Check existing adapters for examples
2. Review the [ARCHITECTURE.md](./ARCHITECTURE.md)
3. Open an issue on GitHub
