# @sakhlaqi/ui Component Library

A comprehensive, production-ready React UI component library built with React + TypeScript.

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

- ✅ **45 Adaptive Components** - Dual-provider architecture (Internal + Material-UI)
- ✅ **TypeScript Support** - Full type safety and IntelliSense
- ✅ **Dynamic Provider Switching** - Change UI framework at runtime
- ✅ **Accessible by Default** - ARIA roles, keyboard navigation, focus management
- ✅ **Responsive & Mobile-Friendly** - Works seamlessly across all devices
- ✅ **Themeable** - CSS custom properties for easy theming
- ✅ **Tree-Shakeable** - Import only what you need
- ✅ **React 18 & 19 Compatible** - Works with latest React versions
- ✅ **Production Ready** - Battle-tested with comprehensive documentation

## 🚀 Quick Start

### Basic Setup with UIProvider

```tsx
import { UIProvider, Button, Input, Card } from '@sakhlaqi/ui';
import '@sakhlaqi/ui/styles';

function App() {
  return (
    <UIProvider defaultProvider="internal">
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
    </div>
  );
}
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

## 📦 Adaptive Components (45 Total)

The library provides **45 adaptive components** that automatically switch between Internal and Material-UI implementations based on `UIProvider`.

### Form Components (8)
`Button`, `IconButton`, `Input`, `Select`, `Checkbox`, `Rating`, `Textarea`, `RadioGroup`

### Data Display (8)  
`Table`, `TreeView`, `Card`, `Tooltip`, `Badge`, `Avatar`, `Chip`, `List`

### Feedback (7)
`Alert`, `Spinner`, `Slider`, `Switch`, `Progress`, `Skeleton`, `LinearProgress`

### Overlay (3)
`Modal`, `Snackbar`, `Drawer`

### Charts (3)
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

# Build library
npm run build

# Rebuild after changes
npm run build

# Type check
npm run type-check

# Lint
npm run lint
```

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
