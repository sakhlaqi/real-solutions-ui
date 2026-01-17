# @sakhlaqi/ui Component Library

A comprehensive, production-ready React UI component library with **four UI provider options**: Internal, Material-UI, Radix UI, and Shadcn UI.

## 📦 Installation

### From GitHub Packages

```bash
npm install @sakhlaqi/ui
```

> **Note:** Requires GitHub authentication. See [GITHUB_PACKAGES_SETUP.md](./GITHUB_PACKAGES_SETUP.md) for complete setup instructions.

### Local Development (Monorepo)

For development within the real-solutions workspace:

```bash
cd presentation
npm install ../ui
```

## ✨ Features

- ✅ **60+ Adaptive Components with Shadcn Support** - **Quad-provider architecture** (Internal + Material-UI + Radix UI + Shadcn UI) ✨ **NEW in v3.1**
- ✅ **TypeScript Support** - Full type safety and IntelliSense
- ✅ **Dynamic Provider Switching** - Change UI framework at runtime
- ✅ **Accessible by Default** - ARIA roles, keyboard navigation, focus management
- ✅ **Responsive & Mobile-Friendly** - Works seamlessly across all devices
- ✅ **Themeable** - CSS custom properties for easy theming + Tailwind CSS for Shadcn
- ✅ **Tree-Shakeable** - Import only what you need
- ✅ **React 18 & 19 Compatible** - Works with latest React versions
- ✅ **Production Ready** - Battle-tested with comprehensive documentation
- ✅ **Bug Fixed** - All critical runtime errors resolved (Jan 2026)

## 🎨 Choose Your UI Framework

**v3.1** introduces support for **four UI providers**:

1. **internal** - Lightweight custom components with minimal dependencies
2. **mui** - Material Design components from Material-UI (@mui/material)
3. **radix** - Modern, accessible components from Radix UI
4. **shadcn** - Beautiful, customizable components built on Radix UI + Tailwind CSS ✨ **NEW**

Switch between them at any time without changing your component code!

## 🚀 Quick Start

### Basic Setup with UIProvider

```tsx
import { UIProvider, Button, Input, Card } from '@sakhlaqi/ui';
import '@sakhlaqi/ui/styles';
import '@radix-ui/themes/styles.css'; // Required if using Radix provider

function App() {
  return (
    <UIProvider defaultProvider="shadcn">
      <Card>
        <h1>Welcome</h1>
        <Input label="Email" placeholder="Enter email" />
        <Button variant="contained">Click Me</Button>
      </Card>
    </UIProvider>
  );
}
```

### Switch Between Providers

```tsx
import { useUIContext, Button } from '@sakhlaqi/ui';

function ProviderSwitcher() {
  const { provider, setProvider } = useUIContext();
  
  return (
    <div>
      <Button 
        variant={provider === 'internal' ? 'contained' : 'outlined'}
        onClick={() => setProvider('internal')}
      >
        Internal UI
      </Button>
      <Button 
        variant={provider === 'mui' ? 'contained' : 'outlined'}
        onClick={() => setProvider('mui')}
      >
        Material-UI
      </Button>
      <Button 
        variant={provider === 'radix' ? 'contained' : 'outlined'}
        onClick={() => setProvider('radix')}
      >
        Radix UI
      </Button>
      <Button 
        variant={provider === 'shadcn' ? 'contained' : 'outlined'}
        onClick={() => setProvider('shadcn')}
      >
        Shadcn UI ✨
      </Button>
    </div>
  );
}
```
```

### Import Components

```tsx
// Import components
import { Button, Input, Card } from '@sakhlaqi/ui';
import { Heading, Text } from '@sakhlaqi/ui/typography';
import { Alert } from '@sakhlaqi/ui/feedback';

// Import styles (once in your main file)
import '@sakhlaqi/ui/styles';

function App() {
  return (
    <Card>
      <Heading level={1}>Welcome</Heading>
      <Text>This is a text component</Text>
      <Button variant="primary">Click me</Button>
    </Card>
  );
}
```

### Import Specific Categories (Tree-Shaking)

```tsx
import { Button } from 'ui/buttons';
import { Input, Select } from 'ui/forms';
import { Modal } from 'ui/overlay';
import { Heading, Text } from 'ui/typography';
```

## 📦 Adaptive Components (60 Total with Shadcn Support)

The library provides **60 adaptive components** that automatically switch between Internal, Material-UI, Radix UI, and **Shadcn UI** implementations based on `UIProvider`.

### Components with Full Shadcn Support (60)

#### Core Components
`Avatar`, `Badge`, `Button`, `ButtonGroup`, `Card`, `Checkbox`, `Input`, `Progress`, `Select`, `Slider`, `Switch`, `Textarea`, `Toast`, `Toggle`, `Tooltip`, `Typography`

#### Form Components
`DatePicker`, `Drawer`, `DropdownMenu`, `Form`, `Pagination`, `Popover`, `RadioGroup`, `Tabs`

#### Layout & Navigation
`Accordion`, `Alert`, `AppBar`, `Breadcrumbs`, `ContextMenu`, `Dialog`, `Divider`, `Spinner`, `Table`

#### New Shadcn-Native Components (29)
`AlertDialog`, `AspectRatio`, `Calendar`, `Chart`, `Collapsible`, `Combobox`, `Command`, `DataTable`, `Empty`, `Field`, `HoverCard`, `InputGroup`, `InputOTP`, `Item`, `Kbd`, `Label`, `Menubar`, `NativeSelect`, `NavigationMenu`, `Resizable`, `ScrollArea`, `Separator`, `Sheet`, `Sidebar`, `Skeleton`, `Sonner`, `ToggleGroup`

> 📖 All components support dynamic provider switching at runtime
`LineChart`, `BarChart`, `PieChart`

### Navigation (6)
`Tabs`, `Breadcrumbs`, `Pagination`, `Stepper`, `Menu`, `BottomNavigation`

### Layout (5)
`Accordion`, `Dialog`, `AppBar`, `Divider`, `Popover`

### Buttons (3)
`ButtonGroup`, `ToggleButton`, `SpeedDial`

### Utility (2)
`DatePicker`, `Backdrop`, `Toolbar`

> 📖 See [ADAPTIVE_COMPONENTS.md](./ADAPTIVE_COMPONENTS.md) for complete documentation

## 📦 Component Categories

### Base Components
- `Button` - Action button with variants
- `Input` - Form input with validation
- `Card` - Content container

### Layout
- `AppShell`, `Header`, `Footer`, `Sidebar`, `Drawer`
- `Container`, `Grid`, `GridItem`, `Flex`
- `Section`, `Divider`, `Spacer`

### Navigation
- `Navbar`, `Breadcrumbs`, `Tabs`, `Pagination`, `Stepper`

### Forms
- `Form`, `PasswordInput`, `Select`, `Checkbox`, `RadioGroup`
- `Toggle`, `Textarea`, `FileUpload`

### Buttons
- `IconButton`, `ButtonGroup`

### Data Display
- `Badge`, `Avatar`, `Tooltip`, `List`, `ListItem`

### Feedback
- `Alert`, `Spinner`, `ProgressBar`

### Overlay
- `Modal`

### Typography
### Subpath Imports (Recommended)

```tsx
// Base components
import { Button, Input, Card } from '@sakhlaqi/ui';

// Typography
import { Heading, Text } from '@sakhlaqi/ui/typography';

// Forms
import { Form, Select, Checkbox } from '@sakhlaqi/ui/forms';

// Layout
import { Container, Grid, Flex } from '@sakhlaqi/ui/layout';

// Navigation
import { Navbar, Tabs, Breadcrumbs } from '@sakhlaqi/ui/navigation';

// Data Display
import { Badge, Avatar, Tooltip } from '@sakhlaqi/ui/data-display';

// Feedback
import { Alert, Spinner, ProgressBar } from '@sakhlaqi/ui/feedback';

// Overlay
import { Modal } from '@sakhlaqi/ui/overlay';

// Utility
import { ErrorBoundary, ThemeProvider } from '@sakhlaqi/ui/utility';
```

## 📦 Component Categories

### Base (3)
- `Button`, `Input`, `Card`

### Typography (2)
- `Heading`, `Text`

### Forms (8)
- `Form`, `PasswordInput`, `Select`, `Checkbox`, `RadioGroup`, `Toggle`, `Textarea`, `FileUpload`

### Buttons (4)
- `IconButton`, `ButtonGroup`, `ToggleButton`, `FloatingActionButton`

### Layout (11)
- `AppShell`, `Header`, `Footer`, `Sidebar`, `Drawer`, `Container`, `Grid`, `GridItem`, `Flex`, `Section`, `Divider`, `Spacer`

### Navigation (5)
- `Navbar`, `Breadcrumbs`, `Tabs`, `Pagination`, `Stepper`

### Data Display (4)
- `Badge`, `Avatar`, `Tooltip`, `List`, `ListItem`

### Feedback (5)
- `Alert`, `Spinner`, `ProgressBar`, `Skeleton`, `LinearProgress`

### Overlay (1)
- `Modal`

### Utility (3)
- `ErrorBoundary`, `Portal`, `ThemeProvider`, `useTheme`


## 🎨 Theming

The library uses CSS custom properties for easy theming:

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #6b7280;
  --error-color: #dc2626;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  
  --text-primary: #111827;
  --text-secondary: #6b7280;
  --text-muted: #9ca3af;
  
  --surface-bg: #ffffff;
  --border-color: #e5e7eb;
  --hover-bg: #f3f4f6;
}
```

### Dark Mode Support

```tsx
import { ThemeProvider } from '@sakhlaqi/ui/utility';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <YourApp />
    </ThemeProvider>
  );
}
```

## 💡 Examples

### Form Example

```tsx
import { Form, Input, PasswordInput, Button } from '@sakhlaqi/ui/forms';
import '@sakhlaqi/ui/styles';

function LoginForm() {
  return (
    <Form onSubmit={(e) => console.log('Submit')}>
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        required
        fullWidth
      />
      <PasswordInput
        label="Password"
        placeholder="Enter password"
        required
        fullWidth
      />
      <Button type="submit" fullWidth>
        Sign In
      </Button>
    </Form>
  );
}
```

### Modal Example

```tsx
import { Modal, Button, Flex } from '@sakhlaqi/ui';
import { useState } from 'react';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        size="md"
        footer={
          <Flex gap="0.5rem" justify="end">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary">Confirm</Button>
          </Flex>
        }
      >
        Are you sure you want to proceed?
      </Modal>
    </>
  );
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Working on the Library

```bash
# Install dependencies
cd ui

## 🔧 Development

### For Monorepo Development

```bash
# Install dependencies
cd ui
npm install

# Build library (with TypeScript checks)
npm run build

# Build library (skip TypeScript checks - faster for testing)
npm run build:force

# Rebuild after changes
npm run build

# Type check only (no build)
npm run type-check

# Lint
npm run lint
```

### Build Scripts Explained

- `npm run build` - Full build with TypeScript type checking (recommended for production)
- `npm run build:force` - Skip TypeScript, build JavaScript only (faster for development/testing)
- `npm run type-check` - Run TypeScript checks without building

> **Note**: `build:force` is useful during development when you want to quickly test changes without fixing all TypeScript warnings. However, always run `npm run build` before publishing to ensure type safety.

### Publishing Updates

See [GITHUB_PACKAGES_SETUP.md](./GITHUB_PACKAGES_SETUP.md) for complete publishing instructions.

**Quick publish:**
```bash
cd ui
npm version patch  # or minor/major
git push origin main
# GitHub Actions publishes automatically
```

### Monorepo Structure

```
real-solutions/
├── api/           # Django backend
├── presentation/  # React frontend (uses @sakhlaqi/ui)
└── ui/            # Component library (this package)
    ├── src/       # Source components
    │   ├── base/
    │   ├── layout/
    │   ├── forms/
    │   └── ...
    ├── dist/      # Built library
    └── package.json
```

## 📚 Documentation

- **Setup Guide:** [GITHUB_PACKAGES_SETUP.md](./GITHUB_PACKAGES_SETUP.md)
- **Repository:** https://github.com/sakhlaqi/real-solutions-ui
- **GitHub Packages:** https://github.com/sakhlaqi?tab=packages
- **Issues:** https://github.com/sakhlaqi/real-solutions-ui/issues

## 📄 License

MIT © Real Solutions

---

**Built with ❤️ for Real Solutions**
