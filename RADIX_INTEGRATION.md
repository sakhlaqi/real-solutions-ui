# ⚠️ DEPRECATED - Radix UI Integration Guide

> **This document is obsolete as of v3.1.0**
> 
> Radix UI support has been removed from this library. This document is kept for historical reference only.
> 
> For migration information, see [SHADCN_RADIX_REMOVAL_COMPLETE.md](./SHADCN_RADIX_REMOVAL_COMPLETE.md)

---

## Overview

As of version 3.0.0, @sakhlaqi/ui now supports **three UI providers**:
- **internal** - Custom internal components
- **mui** - Material-UI components  
- **radix** - Radix UI components ✨ **NEW**

This gives you maximum flexibility to choose the UI framework that best fits your project needs.

## Installation

Install the library with all dependencies:

```bash
npm install @sakhlaqi/ui
```

The Radix UI dependencies are included automatically. If you're already using the library, update to v3.0.0+:

```bash
npm install @sakhlaqi/ui@latest
```

## Quick Start

### Using Radix Provider

Wrap your application with `UIProvider` and set the provider to `radix`:

```tsx
import { UIProvider } from '@sakhlaqi/ui/core';
import '@radix-ui/themes/styles.css'; // Import Radix Themes styles

function App() {
  return (
    <UIProvider defaultProvider="radix" defaultTheme={{ mode: 'light' }}>
      {/* Your app content */}
    </UIProvider>
  );
}
```

### Using Components

All 45 adaptive components work seamlessly with the Radix provider:

```tsx
import { Button, Input, Select, Modal, Tabs } from '@sakhlaqi/ui/adapters';

function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} title="Welcome">
        <p>This modal is powered by Radix UI!</p>
      </Modal>
    </>
  );
}
```

## Switching Between Providers

You can dynamically switch providers at runtime:

```tsx
import { useUIContext } from '@sakhlaqi/ui/core';

function ProviderSwitcher() {
  const { provider, setProvider } = useUIContext();

  return (
    <div>
      <p>Current Provider: {provider}</p>
      <button onClick={() => setProvider('internal')}>Use Internal</button>
      <button onClick={() => setProvider('mui')}>Use Material-UI</button>
      <button onClick={() => setProvider('radix')}>Use Radix UI</button>
    </div>
  );
}
```

## Theme Configuration

### Radix Theme Integration

When using `provider="radix"`, the library automatically maps your design tokens to Radix Themes:

```tsx
<UIProvider 
  defaultProvider="radix"
  defaultTheme={{
    mode: 'dark',
    primaryColor: '#1976d2',    // Maps to Radix 'blue'
    secondaryColor: '#dc004e',   // Maps to Radix 'crimson'
    borderRadius: 12,            // Maps to Radix 'large' radius
    fontFamily: 'Inter',
  }}
>
  <App />
</UIProvider>
```

### Color Mapping

Design token colors are automatically mapped to Radix color scales:

| Design Token | Radix Color |
|--------------|-------------|
| #1976d2, #2196f3 | blue |
| #dc004e, #f50057 | crimson |
| #f44336 | red |
| #ff9800 | orange |
| #4caf50, #2e7d32 | green |
| #9c27b0 | purple |
| #3f51b5 | indigo |
| #00bcd4 | cyan |

### Radius Mapping

| BorderRadius | Radix Radius |
|--------------|--------------|
| ≤4px | small |
| 5-11px | medium |
| ≥12px | large |

## Supported Components (45 Total)

### Form Components (8)
- Button, IconButton
- Input, Select, Checkbox
- Switch, RadioGroup, Slider

### Layout & Navigation (10)
- Tabs, Menu, Stepper, Accordion
- AppBar, BottomNavigation, Toolbar
- Breadcrumbs, Drawer, Divider

### Feedback (7)
- Alert, Snackbar, Progress, LinearProgress
- Spinner, Tooltip, Skeleton

### Overlay (6)
- Modal, Dialog, Popover
- Backdrop, SpeedDial, Drawer

### Data Display (9)
- Card, Badge, Avatar, Chip
- Table, List, TreeView, DatePicker, Charts

### Advanced (5)
- ButtonGroup, ToggleButton, Rating
- Pagination, Autocomplete

## Architecture

### Component Structure

```
@sakhlaqi/ui
├── core/              # Context, types, theme
│   ├── context/       # UIProvider, useUIContext
│   ├── types/         # TypeScript interfaces
│   └── theme/         # Theme integration (MUI, Radix)
├── adapters/          # 45 adaptive components
│   ├── Button.tsx     # Routes to internal/mui/radix
│   └── ...
├── providers/
│   ├── internal/      # Custom components
│   ├── mui/           # MUI wrappers
│   └── radix/         # Radix wrappers ✨ NEW
└── base/             # Base components
```

### How It Works

Each adaptive component checks the current provider and routes to the appropriate implementation:

```tsx
// adapters/Button.tsx
export const Button: React.FC<ButtonProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIButton {...props} />;
  }
  
  if (provider === 'radix') {
    return <RadixButton {...props} />;
  }
  
  return <InternalButton {...props} />;
};
```

## Radix-Specific Features

### Primitives-Based

Radix components are built on unstyled primitives, giving you:
- **Accessibility** - Built-in ARIA attributes and keyboard navigation
- **Flexibility** - Easy to customize and style
- **Composability** - Compound components for complex UI patterns

### Radix Themes Integration

The library uses **@radix-ui/themes** for styled components and **@radix-ui/react-*** primitives for headless components.

### Styling

Radix components use CSS variables from Radix Themes. You can customize them:

```css
:root {
  --accent-9: #1976d2;  /* Primary color */
  --gray-12: #1a1a1a;   /* Text color */
}
```

## Migration from v2.x to v3.0

### No Breaking Changes for Existing Users

If you're using `internal` or `mui` providers, **nothing changes**. Your code will work exactly the same.

### Adding Radix Support

1. Update to v3.0.0:
```bash
npm install @sakhlaqi/ui@^3.0.0
```

2. Import Radix Themes styles:
```tsx
import '@radix-ui/themes/styles.css';
```

3. Switch provider to 'radix':
```tsx
<UIProvider defaultProvider="radix">
```

## Best Practices

### Provider Selection

- **internal** - Lightweight, minimal dependencies, full control
- **mui** - Material Design, rich component ecosystem, Google-style
- **radix** - Modern, accessible, highly customizable, minimal styling

### Bundle Size Optimization

Each provider is tree-shakeable. Import only what you need:

```tsx
// Only import Radix components if using Radix provider
import { Button } from '@sakhlaqi/ui/adapters';

// Direct provider imports (not recommended unless needed)
import { Button } from '@sakhlaqi/ui/providers/radix';
```

### Theme Consistency

Keep your design tokens in the `UIProvider` theme config to ensure consistency across providers:

```tsx
const theme = {
  mode: 'light',
  primaryColor: '#1976d2',
  secondaryColor: '#dc004e',
  borderRadius: 8,
  spacing: 8,
  fontFamily: 'Inter',
};

<UIProvider defaultProvider="radix" defaultTheme={theme}>
```

## Examples

### Form with Radix

```tsx
import { Input, Select, Checkbox, Button } from '@sakhlaqi/ui/adapters';

function SignupForm() {
  return (
    <form>
      <Input label="Email" type="email" required />
      <Input label="Password" type="password" required />
      <Select
        label="Country"
        options={['USA', 'Canada', 'UK']}
      />
      <Checkbox label="Accept terms and conditions" />
      <Button type="submit" variant="contained" color="primary">
        Sign Up
      </Button>
    </form>
  );
}
```

### Dashboard with Radix

```tsx
import { Card, Tabs, Progress, Badge } from '@sakhlaqi/ui/adapters';

function Dashboard() {
  return (
    <div>
      <Tabs
        tabs={[
          { label: 'Overview', value: 'overview', content: <OverviewTab /> },
          { label: 'Analytics', value: 'analytics', content: <AnalyticsTab /> },
        ]}
      />
      
      <Card title="Project Status">
        <Badge color="success">Active</Badge>
        <Progress value={75} variant="determinate" />
      </Card>
    </div>
  );
}
```

## Troubleshooting

### Styles Not Loading

Make sure you've imported Radix Themes styles:

```tsx
import '@radix-ui/themes/styles.css';
```

### Provider Not Switching

Ensure `UIProvider` is at the root of your app:

```tsx
// ✅ Correct
<UIProvider defaultProvider="radix">
  <App />
</UIProvider>

// ❌ Wrong - UIProvider not at root
<App>
  <UIProvider defaultProvider="radix">
    <Component />
  </UIProvider>
</App>
```

### TypeScript Errors

Make sure you're using TypeScript 5.0+:

```bash
npm install -D typescript@^5.0.0
```

## Resources

- [Radix UI Documentation](https://www.radix-ui.com/)
- [Radix Themes](https://www.radix-ui.com/themes)
- [Radix Primitives](https://www.radix-ui.com/primitives)
- [@sakhlaqi/ui Documentation](./README.md)

## Support

For issues or questions:
- GitHub Issues: https://github.com/sakhlaqi/real-solutions-ui/issues
- Documentation: See README.md and other guides

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history and migration guides.
