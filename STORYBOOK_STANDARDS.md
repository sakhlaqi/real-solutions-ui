# Storybook Standards for Adapter Components

## Required Stories for Every Adapter Component

Every adapter-backed component MUST include these standardized stories:

### 1. **Default** ✅
The most basic, common use case with sensible defaults.

```tsx
export const Default: Story = {
  args: {
    // Minimal required props with default values
  },
};
```

### 2. **WithData** ✅
Shows the component populated with realistic mock data.

```tsx
export const WithData: Story = {
  args: {
    // Full set of props with realistic mock data
  },
};
```

### 3. **Loading** ✅
Demonstrates the loading state.

```tsx
export const Loading: Story = {
  args: {
    loading: true,
    // Other relevant props
  },
};
```

### 4. **Empty** ✅
Shows the empty state when no data is available.

```tsx
export const Empty: Story = {
  args: {
    data: [],
    emptyMessage: 'No data available',
    // Other relevant props
  },
};
```

### 5. **Error** ✅
Demonstrates error state handling.

```tsx
export const Error: Story = {
  args: {
    error: true,
    errorMessage: 'Failed to load data',
    // Other relevant props
  },
};
```

### 6. **AdapterFallback** ✅
Tests fallback behavior when Internal provider falls back to MUI.

```tsx
export const AdapterFallback: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tests adapter resolution. Internal provider falls back to MUI implementation.',
      },
    },
  },
  args: {
    // Same as Default
  },
};
```

## Standards

### ✅ DO
- Use mock data only
- Keep data realistic but simple
- Include all state variations
- Document provider behavior
- Test both providers (via toolbar)

### ❌ DON'T
- Make API calls
- Use provider branching in stories (use toolbar instead)
- Hard-code provider selection
- Include business logic
- Use real backend data

## Example: Complete Button Stories

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../src/adapters/Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

// 2. WithData
export const WithData: Story = {
  args: {
    children: 'Click Me',
    variant: 'contained',
    color: 'primary',
    size: 'medium',
  },
};

// 3. Loading
export const Loading: Story = {
  args: {
    children: 'Loading...',
    disabled: true,
    // Could include a spinner icon
  },
};

// 4. Empty (N/A for Button, but for data components)
// Not applicable for Button

// 5. Error (N/A for Button, but for form inputs)
export const Error: Story = {
  args: {
    children: 'Submit',
    color: 'error',
  },
};

// 6. AdapterFallback
export const AdapterFallback: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tests adapter resolution. Switch providers using toolbar.',
      },
    },
  },
  args: {
    children: 'Test Adapter',
    variant: 'outlined',
  },
};
```

## Component Categories

### Atoms (Simple Components)
- Required: Default, WithData, Loading, Disabled, AdapterFallback
- Optional: Sizes, Colors, Variants

### Molecules (Composite Components)
- Required: Default, WithData, Loading, Empty, Error, AdapterFallback
- Optional: Interactive states

### Composites (Complex Components)
- Required: ALL six stories
- Additional: Multiple data scenarios

### Layouts
- Required: Default, WithContent, Empty, AdapterFallback
- Optional: Responsive variations

## Audit Checklist

For each adapter component, verify:
- [ ] Has Default story
- [ ] Has WithData story  
- [ ] Has Loading story (if applicable)
- [ ] Has Empty story (if applicable)
- [ ] Has Error story (if applicable)
- [ ] Has AdapterFallback story
- [ ] Uses only mock data
- [ ] No API calls
- [ ] No provider branching
- [ ] Provider switching works via toolbar

## Priority Components for Standardization

1. **High Priority** (User-facing, data-driven):
   - SearchGridComposite
   - Table
   - XDataGrid
   - Form
   - Card
   - Select
   - Autocomplete

2. **Medium Priority** (Interactive):
   - Button
   - Input
   - Dialog
   - Modal
   - Alert
   - Snackbar

3. **Low Priority** (Layout):
   - Container
   - Stack
   - Box
   - Section
