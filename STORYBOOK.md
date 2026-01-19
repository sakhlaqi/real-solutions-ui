# Storybook Documentation

This directory contains the Storybook setup and configuration for the multi-provider UI component library.

## 🚀 Getting Started

### Running Storybook

```bash
npm run storybook
```

This will start the Storybook development server at `http://localhost:6006`

### Building Storybook

```bash
npm run build-storybook
```

This creates a static build of Storybook in the `storybook-static` directory.

## 📁 Structure

```
.storybook/
├── main.ts           # Storybook configuration
└── preview.tsx       # Global decorators and parameters

src/
├── docs/             # Documentation pages (MDX)
│   ├── Introduction.mdx
│   └── ProviderGuide.mdx
└── adapters/         # Component stories
    ├── Button.stories.tsx
    ├── Input.stories.tsx
    ├── Checkbox.stories.tsx
    ├── Switch.stories.tsx
    ├── Select.stories.tsx
    ├── Card.stories.tsx
    ├── Alert.stories.tsx
    ├── Dialog.stories.tsx
    ├── Tabs.stories.tsx
    ├── Tooltip.stories.tsx
    ├── Badge.stories.tsx
    ├── Slider.stories.tsx
    ├── RadioGroup.stories.tsx
    └── Spinner.stories.tsx
```

## 🎨 Provider Switching

Storybook includes a global toolbar control that allows you to switch between UI providers:

- **internal** — Custom in-house components
- **mui** — Material-UI

To switch providers:
1. Look for the "UI Provider" dropdown in the Storybook toolbar
2. Select a provider from the dropdown
3. Components will automatically re-render using the selected provider

## 🌗 Theme Switching

You can also toggle between light and dark themes using the "Theme Mode" dropdown in the toolbar.

## 📖 Writing Stories

### Basic Story Structure

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../adapters/ComponentName';

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Define controls for props
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Default props
  },
};
```

### Story Best Practices

1. **Create multiple variants** — Show different states and configurations
2. **Use descriptive names** — Name stories clearly (Default, Disabled, Loading, etc.)
3. **Add documentation** — Use JSDoc comments to describe supported providers
4. **Include interactive examples** — Use React hooks for interactive stories
5. **Test edge cases** — Show error states, long text, etc.

### Example Story with Multiple Variants

```tsx
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button {...args} size="small">Small</Button>
      <Button {...args} size="medium">Medium</Button>
      <Button {...args} size="large">Large</Button>
    </div>
  ),
  args: {
    variant: 'contained',
    color: 'primary',
  },
};
```

### Interactive Stories

```tsx
import { useState } from 'react';

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label="Type something"
      />
    );
  },
};
```

## 🎯 Global Decorator

The global decorator wraps all stories with the `UIProvider` component and handles:

- Provider switching via toolbar
- Theme mode switching
- Consistent padding and layout
- Provider-specific theme wrappers (e.g., MUI ThemeProvider)

Location: `.storybook/preview.tsx`

```tsx
const withUIProvider = (Story: any, context: any) => {
  const provider = context.globals.provider as UIProviderType;
  const themeMode = context.globals.theme as 'light' | 'dark';

  return (
    <UIProvider
      defaultProvider={provider}
      defaultTheme={{ mode: themeMode }}
    >
      <div style={{ padding: '2rem', minHeight: '100vh' }}>
        <Story />
      </div>
    </UIProvider>
  );
};
```

## 📝 Documentation Pages (MDX)

MDX files in `src/docs/` appear as documentation pages in Storybook.

### Creating a Documentation Page

```mdx
import { Meta } from '@storybook/blocks';

<Meta title="Introduction/YourPage" />

# Your Page Title

Content goes here...

## Code Examples

\`\`\`tsx
// Your code example
\`\`\`
```

## 🔧 Configuration

### Main Configuration (`.storybook/main.ts`)

- Defines story locations
- Configures addons
- Sets up Vite integration
- Enables TypeScript support
- Configures documentation generation

### Preview Configuration (`.storybook/preview.tsx`)

- Defines global decorators
- Sets up provider switching toolbar
- Configures theme switching
- Sets default parameters

## 🧪 Testing Components

### Manual Testing Checklist

For each story, verify:

1. ✅ Renders correctly in all providers (internal, mui)
2. ✅ Works in both light and dark themes
3. ✅ Interactive features work as expected
4. ✅ Accessibility features function properly
5. ✅ Props controls work correctly
6. ✅ No console errors or warnings

### Provider-Specific Testing

Some components may have different behaviors across providers:

- **Animations**: MUI has built-in animations
- **Portal rendering**: Different providers handle overlays differently

Document any significant behavioral differences in the component's story.

## 🚦 Addons

Storybook is configured with the following addons:

- **@storybook/addon-a11y** — Accessibility testing
- **@chromatic-com/storybook** — Visual regression testing

## 🎓 Learning Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Writing Stories](https://storybook.js.org/docs/writing-stories)
- [Args](https://storybook.js.org/docs/writing-stories/args)
- [Controls](https://storybook.js.org/docs/essentials/controls)
- [Actions](https://storybook.js.org/docs/essentials/actions)

## 🐛 Troubleshooting

### Storybook Won't Start

1. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
2. Clear Storybook cache: `rm -rf node_modules/.cache/storybook`
3. Check for port conflicts (default port is 6006)

### Stories Not Appearing

1. Check story file naming: `*.stories.tsx`
2. Verify story location matches glob pattern in `main.ts`
3. Check for syntax errors in story files

### Provider Switching Not Working

1. Verify UIProvider is imported correctly
2. Check that the provider prop is being passed from context
3. Ensure all provider implementations exist

### Component Not Rendering

1. Check if component is imported correctly
2. Verify component exists in all selected providers
3. Check browser console for errors

## 📦 Deployment

To deploy Storybook:

1. Build the static site: `npm run build-storybook`
2. Deploy the `storybook-static` directory to your hosting service
3. Popular options: Netlify, Vercel, GitHub Pages, Chromatic

### Example: Deploy to GitHub Pages

```bash
npm run build-storybook
npx gh-pages -d storybook-static
```

## 🤝 Contributing

When adding new components:

1. Create a story file in `src/adapters/[ComponentName].stories.tsx`
2. Include multiple variants (Default, Sizes, Colors, States, etc.)
3. Add interactive examples where appropriate
4. Document supported providers in JSDoc comments
5. Test across all providers and themes
6. Update this README if adding new patterns

## 📄 License

Same as the main project license.
