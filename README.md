# UI Component Library

A comprehensive, production-ready React UI component library built with React + TypeScript.

## Features

- ✅ **TypeScript Support** - Full type safety and IntelliSense
- ✅ **Accessible by Default** - ARIA roles, keyboard navigation, focus management
- ✅ **Responsive & Mobile-Friendly** - Works seamlessly across all devices
- ✅ **Themeable** - CSS custom properties for easy theming
- ✅ **Tree-Shakeable** - Import only what you need
- ✅ **No Dependencies** - Only peer dependencies on React
- ✅ **Well Documented** - Clear props and examples

## Local Development (Monorepo Setup)

This library is part of the `real-solutions` workspace. To use it locally in the presentation project:

### Option 1: File Path Dependency (Recommended)

1. **Add to presentation/package.json:**
```json
{
  "dependencies": {
    "ui": "file:../ui"
  }
}
```

2. **Install the dependency:**
```bash
cd presentation
npm install
```

3. **Import and use components:**
```tsx
import { Button, Input, Card, Heading, Text } from 'ui';

function MyComponent() {
  return (
    <Card padding="lg">
      <Heading level={2}>Welcome</Heading>
      <Input label="Email" placeholder="you@example.com" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

### Option 2: npm link (Alternative)

```bash
# In the ui directory
cd ui
npm link

# In the presentation directory
cd ../presentation
npm link ui
```

### Rebuilding After Changes

When you make changes to the component library:

```bash
cd ui
npm run build
```

The changes will be automatically reflected in the presentation project since it uses a local file reference.

## Installation (External Projects)

For using this library in other projects outside this workspace:

```bash
npm install ui
# or
yarn add ui
# or
pnpm add ui
```

## Usage

### Import All Components

```tsx
import { Button, Input, Card, Modal, Heading, Text } from 'ui';
import 'ui/styles';

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

## Component Categories

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
- `Heading`, `Text`

### Utility
- `ErrorBoundary`, `Portal`, `ThemeProvider`, `useTheme`

## Theming

The library uses CSS custom properties for theming:

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

### Dark Mode

```tsx
import { ThemeProvider } from 'ui/utility';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <YourApp />
    </ThemeProvider>
  );
}
```

## Examples

### Form Example

```tsx
import { Form, Input, PasswordInput, Button } from 'ui';

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
import { Modal, Button, Flex } from 'ui';
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
npm install

# Build library (required before first use)
npm run build

# Rebuild after making changes
npm run build

# Type check
npm run type-check

# Lint
npm run lint
```

### Workflow Tips

1. **After cloning the repo:**
   ```bash
   # Install dependencies for both projects
   cd presentation && npm install
   cd ../ui && npm install && npm run build
   ```

2. **When adding new components:**
   - Create component in `ui/src/`
   - Export from the appropriate index.ts
   - Run `npm run build` in ui directory
   - Component is immediately available in presentation

3. **Hot reload setup (optional):**
   For development with hot reloading, you can use `npm link` and run a file watcher:
   ```bash
   cd ui
   npm run build -- --watch  # If your vite config supports watch mode
   ```

### Project Structure

```
real-solutions/
├── api/           # Backend API
├── presentation/  # Frontend application (uses ui library)
└── ui/            # Shared component library
    ├── src/       # Source components
    │   ├── base/
    │   ├── layout/
    │   ├── forms/
    │   └── ...
    ├── dist/      # Built library (git ignored)
    └── package.json
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT © [Your Name]

## Links

- [Documentation](https://github.com/yourusername/ui)
- [Issues](https://github.com/yourusername/ui/issues)
- [Changelog](https://github.com/yourusername/ui/blob/main/CHANGELOG.md)
