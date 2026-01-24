# Error & Warning Display - Quick Reference

**Component Library for Visual Error Feedback in Storybook**

## Components Overview

| Component | Purpose | Location |
|-----------|---------|----------|
| **ValidationErrorDisplay** | Schema validation errors inline | Inline (non-blocking) |
| **ValidationSuccessDisplay** | Success indicator | Inline (compact badge) |
| **AdapterWarningsDisplay** | Adapter fallback warnings | Floating (bottom-right) |
| **AdapterWarningsBadge** | Warning count badge | Floating (compact) |
| **ErrorWarningOverlay** | Combined errors + warnings panel | Floating (collapsible) |
| **InlineErrorBanner** | Full-width error banner | Inline (top) |

## Quick Usage

### Basic Story Wrapper (Recommended)

```typescript
import { PageStoryWrapper } from '../stories/5-json-pages/JsonPages.stories';

export const MyStory: Story = {
  render: () => <PageStoryWrapper config={myConfig} />,
};
```

**Provides:**
- ✅ Schema validation
- ✅ Success badge
- ✅ Error display
- ✅ Adapter warnings (floating)

### Manual Implementation

```typescript
import { useState } from 'react';
import {
  validatePageConfig,
  PageRenderer,
  ValidationErrorDisplay,
  ValidationSuccessDisplay,
  AdapterWarningsDisplay,
  parseZodErrors,
} from '@sakhlaqi/ui';

function MyStory() {
  const [warnings, setWarnings] = useState([]);
  const validation = validatePageConfig(config);

  if (!validation.success) {
    return (
      <ValidationErrorDisplay 
        errors={parseZodErrors(validation.error)}
      />
    );
  }

  return (
    <>
      <ValidationSuccessDisplay message="Valid" compact />
      <PageRenderer 
        config={config}
        onAdapterWarning={(w) => setWarnings([...warnings, w])}
      />
      <AdapterWarningsDisplay 
        warnings={warnings}
        onDismiss={(i) => setWarnings(warnings.filter((_, idx) => idx !== i))}
      />
    </>
  );
}
```

## Component Props

### ValidationErrorDisplay

```typescript
<ValidationErrorDisplay
  errors={errors}           // ValidationError[]
  title="Validation Errors" // string (optional)
  collapsible={true}         // boolean (optional)
/>
```

**ValidationError type:**
```typescript
interface ValidationError {
  path: (string | number)[];
  message: string;
  code?: string;
}
```

### ValidationSuccessDisplay

```typescript
<ValidationSuccessDisplay
  message="Schema validated"  // string (optional)
  compact={false}             // boolean (optional)
/>
```

### AdapterWarningsDisplay

```typescript
<AdapterWarningsDisplay
  warnings={warnings}                    // AdapterWarning[]
  onDismiss={(index) => dismiss(index)}  // (index: number) => void
  position="bottom"                      // 'top' | 'bottom' (optional)
  compact={false}                        // boolean (optional)
/>
```

**AdapterWarning type:**
```typescript
interface AdapterWarning {
  type: 'adapter-fallback' | 'component-not-found' | 
        'template-not-found' | 'adapter-missing';
  componentType: string;
  requestedProvider: string;
  fallbackProvider?: string;
  message: string;
  timestamp: number;
}
```

### ErrorWarningOverlay

```typescript
<ErrorWarningOverlay
  validationErrors={errors}              // ValidationError[]
  adapterWarnings={warnings}             // AdapterWarning[]
  onDismissWarning={(i) => dismiss(i)}   // (index: number) => void
  position="bottom-right"                // Position (optional)
  maxHeight="60vh"                       // string (optional)
/>
```

**Position options:**
- `'top-right'` (default)
- `'bottom-right'`
- `'top-left'`
- `'bottom-left'`

### PageRenderer (Enhanced)

```typescript
<PageRenderer
  config={config}                     // PageConfig
  onAdapterWarning={(w) => handle(w)} // (warning: AdapterWarning) => void
  showInlineWarnings={false}          // boolean (optional)
  onRenderComplete={(result) => {}}   // (result: RenderResult) => void
/>
```

## Color Coding

| Type | Color | Icon | Use Case |
|------|-------|------|----------|
| **Error** | Red (#dc2626) | ❌ | Schema validation failures |
| **Warning** | Orange (#f59e0b) | ⚠️⚡🚫 | Adapter fallbacks, missing components |
| **Success** | Green (#16a34a) | ✅ | Valid schema, successful operations |

## Examples

### Example 1: Show Validation Errors

```typescript
const validation = validatePageConfig(config);
if (!validation.success) {
  const errors = parseZodErrors(validation.error);
  return <ValidationErrorDisplay errors={errors} />;
}
```

### Example 2: Track Adapter Warnings

```typescript
const [warnings, setWarnings] = useState<AdapterWarning[]>([]);

<PageRenderer
  config={config}
  onAdapterWarning={(warning) => {
    setWarnings(prev => [...prev, warning]);
  }}
/>
```

### Example 3: Combined Error/Warning Panel

```typescript
<ErrorWarningOverlay
  validationErrors={validationErrors}
  adapterWarnings={adapterWarnings}
  onDismissWarning={(index) => {
    setAdapterWarnings(prev => prev.filter((_, i) => i !== index));
  }}
  position="bottom-right"
/>
```

### Example 4: Inline Error Banner

```typescript
const [dismissed, setDismissed] = useState(false);

{!dismissed && (
  <InlineErrorBanner
    validationErrors={errors}
    onDismiss={() => setDismissed(true)}
  />
)}
```

## Utility Functions

### parseZodErrors()

Converts Zod validation errors to displayable format:

```typescript
import { parseZodErrors } from '@sakhlaqi/ui';

const validation = validatePageConfig(config);
if (!validation.success) {
  const errors = parseZodErrors(validation.error);
  // errors: ValidationError[]
}
```

## Testing Stories

### Storybook Stories Available

Navigate to: **Renderer → Error & Warning Display**

- **ValidationErrors**: Shows validation error display
- **SuccessIndicator**: Shows success badges (full + compact)
- **AdapterWarnings**: Shows floating adapter warnings
- **WarningBadge**: Shows compact warning count badge
- **ErrorWarningPanel**: Shows combined overlay panel
- **InlineBanner**: Shows full-width error banner
- **AllComponents**: Shows all components together

## Best Practices

### ✅ Do

- Use `PageStoryWrapper` for consistent error handling
- Show success indicators for valid configs
- Make warnings dismissible
- Use color coding (red = error, orange = warning, green = success)
- Parse Zod errors with `parseZodErrors()` before display

### ❌ Don't

- Don't rely on console-only errors
- Don't block content with error overlays (use floating panels)
- Don't show raw Zod error objects to users
- Don't forget to handle `onAdapterWarning` callback
- Don't ignore validation failures silently

## Troubleshooting

### Issue: Validation errors not showing

**Solution:** Ensure you're using `parseZodErrors()`:
```typescript
const errors = parseZodErrors(validation.error);
```

### Issue: Adapter warnings not appearing

**Solution:** Add `onAdapterWarning` callback to PageRenderer:
```typescript
<PageRenderer 
  config={config}
  onAdapterWarning={(w) => setWarnings(prev => [...prev, w])}
/>
```

### Issue: Warnings disappear on re-render

**Solution:** Use `useState` to persist warnings:
```typescript
const [warnings, setWarnings] = useState<AdapterWarning[]>([]);
```

### Issue: Too many duplicate warnings

**Solution:** Filter duplicates when adding warnings:
```typescript
setWarnings(prev => {
  if (prev.some(w => w.componentType === warning.componentType)) {
    return prev;
  }
  return [...prev, warning];
});
```

## Import Paths

```typescript
// From renderer
import {
  ValidationErrorDisplay,
  ValidationSuccessDisplay,
  parseZodErrors,
  AdapterWarningsDisplay,
  InlineAdapterWarning,
  AdapterWarningsBadge,
  ErrorWarningOverlay,
  InlineErrorBanner,
} from '../../src/renderer';

// Types
import type {
  ValidationError,
  AdapterWarning,
} from '../../src/renderer';
```

## File Locations

```
ui/
├── src/
│   └── renderer/
│       ├── ValidationDisplay.tsx      (198 lines)
│       ├── AdapterWarnings.tsx        (287 lines)
│       ├── ErrorWarningOverlay.tsx    (384 lines)
│       └── index.ts                   (exports)
└── stories/
    ├── 5-json-pages/
    │   └── JsonPages.stories.tsx      (uses PageStoryWrapper)
    └── renderer/
        └── ErrorWarningDisplay.stories.tsx (demos)
```

## Summary

This error/warning display system provides:
- ✅ Visual feedback in Storybook UI (not console-only)
- ✅ Structured error messages (path + message + code)
- ✅ Dismissible warnings
- ✅ Non-blocking overlays
- ✅ Color-coded severity
- ✅ Collapsible panels
- ✅ Last render preservation

Use `PageStoryWrapper` for the simplest integration!
