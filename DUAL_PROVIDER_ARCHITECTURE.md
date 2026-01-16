# @sakhlaqi/ui - Dual-Provider Architecture

## Overview

`@sakhlaqi/ui` is a comprehensive React component library featuring a **dual-provider architecture** that supports both internal components (default) and Material-UI components (opt-in). This design allows you to:

- **Keep existing internal components as the default** (no breaking changes)
- **Opt into Material-UI components** via configuration
- **Switch providers dynamically** at runtime
- **Mix implementations** for gradual migration
- **Maintain a consistent API** across both providers

## Installation

```bash
npm install @sakhlaqi/ui
```

### Peer Dependencies

```bash
npm install react react-dom
```

## Quick Start

### Basic Usage (Internal Components - Default)

```tsx
import { UIProvider, Button, Input, Table } from '@sakhlaqi/ui';

function App() {
  return (
    <UIProvider defaultProvider="internal">
      <div>
        <Button variant="contained" color="primary">
          Click Me
        </Button>
        <Input label="Name" placeholder="Enter your name" />
      </div>
    </UIProvider>
  );
}
```

### Using Material-UI Components

```tsx
import { UIProvider, Button, Input } from '@sakhlaqi/ui';

function App() {
  return (
    <UIProvider defaultProvider="mui">
      <div>
        {/* Now uses Material-UI Button */}
        <Button variant="contained" color="primary">
          Material UI Button
        </Button>
      </div>
    </UIProvider>
  );
}
```

### Dynamic Provider Switching

```tsx
import { UIProvider, useUIContext, Button } from '@sakhlaqi/ui';

function ProviderToggle() {
  const { provider, setProvider } = useUIContext();
  
  return (
    <div>
      <button onClick={() => setProvider(provider === 'internal' ? 'mui' : 'internal')}>
        Current: {provider} - Click to Switch
      </button>
      
      <Button variant="contained" color="primary">
        This button changes implementation!
      </Button>
    </div>
  );
}

function App() {
  return (
    <UIProvider defaultProvider="internal">
      <ProviderToggle />
    </UIProvider>
  );
}
```

## Architecture

### Component Layers

```
┌─────────────────────────────────────────┐
│          Adapter Components             │  ← Public API (Consumers use these)
│   (Auto-switch between providers)       │
├─────────────────────────────────────────┤
│          UIProvider Context             │  ← Provider selection & theme
├──────────────────┬──────────────────────┤
│  Internal Provider│   MUI Provider      │  ← Implementation layers
│  (Existing)      │   (Material-UI)     │
└──────────────────┴──────────────────────┘
```

### Directory Structure

```
src/
├── core/                      # Core infrastructure
│   ├── types/                # Shared interfaces & types
│   ├── context/              # UIProvider context
│   └── theme/                # Theme mapping utilities
│
├── adapters/                 # Public-facing adaptive components
│   ├── Button.tsx           # Auto-switches implementation
│   ├── Input.tsx
│   ├── Table.tsx
│   └── ...
│
├── providers/
│   ├── internal/            # Internal component exports
│   │   └── index.ts        # Re-exports from existing components
│   │
│   └── mui/                 # Material-UI wrappers
│       ├── Button.tsx      # Wraps MUI Button
│       ├── Input.tsx       # Wraps MUI TextField
│       ├── Table.tsx       # Wraps MUI Table
│       ├── DataGrid.tsx    # Wraps MUI X DataGrid
│       └── ...
│
└── [existing structure]     # Forms, buttons, layout, etc.
```

## API Reference

### UIProvider

The root provider component that enables provider switching and theming.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultProvider` | `'internal' \| 'mui'` | `'internal'` | Initial UI provider |
| `defaultTheme` | `ThemeConfig` | See below | Theme configuration |

**Theme Config:**

```tsx
interface ThemeConfig {
  mode: 'light' | 'dark';
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  borderRadius?: number;
  spacing?: number;
}
```

### useUIContext Hook

Access and control the UI provider and theme.

```tsx
const { 
  provider,      // Current provider: 'internal' | 'mui'
  setProvider,   // Switch provider
  theme,         // Current theme config
  setTheme,      // Update theme
  toggleThemeMode // Toggle light/dark mode
} = useUIContext();
```

## Component API

All adapter components follow a **unified interface** regardless of the underlying implementation:

### Button

```tsx
interface BaseButtonProps {
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  disabled?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}
```

**Example:**

```tsx
<Button 
  variant="contained" 
  color="primary" 
  startIcon={<SaveIcon />}
  onClick={() => console.log('Saved!')}
>
  Save
</Button>
```

### Input

```tsx
interface BaseInputProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
}
```

**Example:**

```tsx
<Input
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
  required
  fullWidth
/>
```

### Table

```tsx
interface BaseTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  loading?: boolean;
  error?: string;
  onRowClick?: (row: T) => void;
  pagination?: boolean;
  checkboxSelection?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
}
```

**Example:**

```tsx
<Table
  columns={[
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'role', headerName: 'Role', width: 150 }
  ]}
  rows={users}
  pagination
  checkboxSelection
  onSelectionChange={(selected) => console.log(selected)}
/>
```

### DatePicker

```tsx
<DatePicker
  label="Select Date"
  value={selectedDate}
  onChange={(date) => setSelectedDate(date)}
  minDate={new Date()}
  fullWidth
/>
```

### TreeView

```tsx
<TreeView
  nodes={[
    {
      id: '1',
      label: 'Parent',
      children: [
        { id: '1-1', label: 'Child 1' },
        { id: '1-2', label: 'Child 2' }
      ]
    }
  ]}
  onNodeSelect={(nodeId) => console.log(nodeId)}
/>
```

### Charts

```tsx
import { LineChart, BarChart, PieChart } from '@sakhlaqi/ui';

<LineChart
  series={[
    {
      name: 'Revenue',
      data: [
        { x: 'Jan', y: 1000 },
        { x: 'Feb', y: 1500 },
        { x: 'Mar', y: 1200 }
      ]
    }
  ]}
  height={400}
  showGrid
  showLegend
/>

<BarChart
  series={[{ name: 'Sales', data: [...] }]}
  orientation="vertical"
  stacked
/>

<PieChart
  data={[
    { label: 'A', value: 30 },
    { label: 'B', value: 70 }
  ]}
  showLegend
  innerRadius={50}  // Donut chart
/>
```

## Advanced Usage

### Direct Provider Access

For explicit control over implementation:

```tsx
import { InternalComponents, MUIComponents } from '@sakhlaqi/ui';

// Always use internal Button
<InternalComponents.Button>Internal</InternalComponents.Button>

// Always use MUI Button
<MUIComponents.Button>Material UI</MUIComponents.Button>
```

### Theme Customization

```tsx
import { UIProvider, useUIContext } from '@sakhlaqi/ui';

function ThemeCustomizer() {
  const { theme, setTheme } = useUIContext();
  
  return (
    <div>
      <button onClick={() => setTheme({
        ...theme,
        primaryColor: '#ff5722',
        borderRadius: 16
      })}>
        Change Theme
      </button>
    </div>
  );
}
```

### Material-UI Theme Integration

When using `defaultProvider="mui"`, the library automatically creates a MUI theme from your design tokens:

```tsx
<UIProvider 
  defaultProvider="mui"
  defaultTheme={{
    mode: 'dark',
    primaryColor: '#3f51b5',
    secondaryColor: '#f50057'
  }}
>
  {/* MUI components use these theme values */}
</UIProvider>
```

### Tree-Shaking

Import specific components for optimal bundle size:

```tsx
import { Button } from '@sakhlaqi/ui/adapters';
import { UIProvider } from '@sakhlaqi/ui/core';
```

## Migration Guide

### Existing Apps (No Breaking Changes)

```tsx
// Before (still works!)
import { Button, Input } from '@sakhlaqi/ui';

// After (same code, just add UIProvider)
import { UIProvider, Button, Input } from '@sakhlaqi/ui';

function App() {
  return (
    <UIProvider>  {/* Defaults to 'internal' */}
      <Button>Works exactly the same!</Button>
    </UIProvider>
  );
}
```

### Gradual MUI Adoption

```tsx
import { UIProvider, useUIContext } from '@sakhlaqi/ui';
import { Button } from '@sakhlaqi/ui/adapters';
import { MUIComponents } from '@sakhlaqi/ui';

function MixedApp() {
  return (
    <UIProvider defaultProvider="internal">
      {/* Uses internal button */}
      <Button>Internal Button</Button>
      
      {/* Explicitly use MUI button */}
      <MUIComponents.Button>MUI Button</MUIComponents.Button>
    </UIProvider>
  );
}
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import { BaseButtonProps, BaseInputProps, Column } from '@sakhlaqi/ui';

interface User {
  id: number;
  name: string;
  email: string;
}

const columns: Column<User>[] = [
  { field: 'name', headerName: 'Name', width: 200 },
  { 
    field: 'email', 
    headerName: 'Email', 
    renderCell: (row) => <a href={`mailto:${row.email}`}>{row.email}</a>
  }
];
```

## Components Included

### Adaptive Components (Auto-switch)
- **Forms:** Input, Select, Checkbox, DatePicker
- **Buttons:** Button, IconButton
- **Data Display:** Table, TreeView
- **Charts:** LineChart, BarChart, PieChart

### MUI-Specific Components
- **Advanced Table:** DataGrid (MUI X DataGrid with sorting, filtering, pagination)
- **Date/Time:** DatePicker, TimePicker (MUI X Date Pickers)
- **Charts:** Full chart suite (MUI X Charts)

### Internal Components (67+ components)
All existing internal components remain available and are the default implementation.

## Best Practices

1. **Always wrap your app with UIProvider**
   ```tsx
   <UIProvider defaultProvider="internal">
     <App />
   </UIProvider>
   ```

2. **Use adapter components for flexibility**
   ```tsx
   import { Button } from '@sakhlaqi/ui';  // Auto-switching
   ```

3. **Use direct imports for performance**
   ```tsx
   import { Button } from '@sakhlaqi/ui/adapters';
   ```

4. **Type your custom components**
   ```tsx
   interface Props extends BaseButtonProps {
     customProp: string;
   }
   ```

5. **Test both providers**
   ```tsx
   // In tests
   render(
     <UIProvider defaultProvider="internal">
       <Component />
     </UIProvider>
   );
   ```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- React 18+ or React 19+
- TypeScript 5.0+

## License

See LICENSE file

## Contributing

Contributions welcome! Please read CONTRIBUTING.md
