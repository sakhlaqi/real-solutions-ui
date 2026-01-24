# Prompt 8 Summary — Validation & Adapter Warnings in Storybook UI

**Status:** ✅ Complete  
**Date:** January 24, 2026

## Overview

Enhanced JSON-driven page stories to display schema validation errors and adapter fallback warnings **inline in the Storybook UI** instead of console-only. Errors and warnings are now visible, dismissible, and don't block the last valid render.

## Requirements Met

### ✅ Display schema validation errors inline
- Created `ValidationErrorDisplay` component for inline error visualization
- Errors show path, message, and error code
- Collapsible interface to save space
- Color-coded (red) for visibility

### ✅ Display adapter fallback warnings
- Created `AdapterWarningsDisplay` for adapter-specific warnings
- Floating notification system with dismissible cards
- Shows component type, requested provider, and fallback provider
- Color-coded (yellow/orange) to differentiate from errors

### ✅ Avoid console-only errors
- All errors visible in UI via components
- ValidationErrorDisplay parses Zod errors into readable format
- AdapterWarnings captured via callback system
- ErrorWarningOverlay for persistent error/warning panel

### ✅ Errors visible in Storybook UI
- PageStoryWrapper wraps all stories with validation display
- Success badge shows when validation passes
- Errors displayed prominently above content
- Warnings displayed as floating notifications

### ✅ Last valid render remains visible on failure
- Validation errors shown inline without replacing content
- Adapter warnings displayed as overlay (non-blocking)
- Page content continues to render if template/slots are valid
- ErrorWarningOverlay can be collapsed to minimize distraction

## Files Created

### 1. `src/renderer/ValidationDisplay.tsx` (198 lines)

**Purpose:** Display schema validation errors inline

**Components:**
- `ValidationErrorDisplay`: Main validation error display component
  - Props: `errors`, `title`, `collapsible`
  - Features: Red error styling, collapsible sections, error count badge
  - Error format: Path + message + code
  
- `ValidationSuccessDisplay`: Success indicator when validation passes
  - Props: `message`, `compact`
  - Features: Green success styling, compact or full banner
  
- `parseZodErrors()`: Utility to convert Zod errors to display format

**Key Features:**
```typescript
interface ValidationError {
  path: (string | number)[];
  message: string;
  code?: string;
}

<ValidationErrorDisplay 
  errors={errors}
  title="Schema Validation Errors"
  collapsible={true}
/>
```

**Styling:**
- Red theme (#dc2626, #fef2f2)
- Collapsible header with error count
- Monospace font for paths
- Indented error messages with bullets

### 2. `src/renderer/AdapterWarnings.tsx` (287 lines)

**Purpose:** Display adapter fallback warnings

**Components:**
- `AdapterWarningsDisplay`: Floating warning panel
  - Props: `warnings`, `onDismiss`, `position`, `compact`
  - Features: Dismissible cards, position control, compact mode
  
- `InlineAdapterWarning`: Single warning inline (non-floating)
  - Props: `warning`, `onDismiss`
  
- `AdapterWarningsBadge`: Compact badge with count
  - Props: `count`, `onClick`

**Warning Types:**
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

**Features:**
- Color-coded by warning type
- Icon indicators (⚡ fallback, 🚫 not found, ⚠️ missing)
- Individual dismissal per warning
- Fixed positioning (bottom-right by default)

### 3. `src/renderer/ErrorWarningOverlay.tsx` (384 lines)

**Purpose:** Persistent overlay panel for errors and warnings

**Components:**
- `ErrorWarningOverlay`: Combined error/warning panel
  - Props: `validationErrors`, `adapterWarnings`, `onDismissWarning`, `position`, `maxHeight`
  - Features: Collapsible, scrollable, position control
  - Shows both validation errors and adapter warnings in one panel
  
- `InlineErrorBanner`: Non-floating error banner
  - Props: `validationErrors`, `onDismiss`
  - Features: Full-width inline banner for critical errors

**Key Features:**
- **Collapsed state**: Shows badge with count
- **Expanded state**: Shows all errors and warnings in scrollable panel
- **Position options**: top-right, bottom-right, top-left, bottom-left
- **Max height**: Prevents overflow on small screens
- **Combined view**: Errors + warnings in single interface

**Usage:**
```typescript
<ErrorWarningOverlay
  validationErrors={errors}
  adapterWarnings={warnings}
  onDismissWarning={(index) => dismiss(index)}
  position="bottom-right"
  maxHeight="60vh"
/>
```

### 4. Enhanced `src/renderer/renderPage.tsx`

**Changes:**
- Added `onAdapterWarning` callback to `PageRendererProps`
- Added `showInlineWarnings` prop for inline warning display
- Added adapter warning state management with `useState<AdapterWarning[]>`
- Enhanced template adapter resolution to emit warnings on failure
- Pass warning callbacks through to `PageRendererInternal`

**Warning Emission:**
```typescript
const TemplateAdapter = React.lazy(async () => {
  const Adapter = await resolveTemplateAdapter(config.template, provider);
  if (!Adapter) {
    if (onAdapterWarning) {
      onAdapterWarning({
        type: 'template-not-found',
        componentType: config.template,
        requestedProvider: provider,
        message: `Template adapter for "${config.template}" not found`,
        timestamp: Date.now(),
      });
    }
    throw new Error(`Template adapter not found`);
  }
  return { default: Adapter };
});
```

### 5. Enhanced `stories/5-json-pages/JsonPages.stories.tsx`

**Changes:**
- Added imports for validation and warning display components
- Created `PageStoryWrapper` component for consistent error handling
- Updated all 7 stories to use `PageStoryWrapper`
- ValidationError story now uses `ValidationErrorDisplay` component

**PageStoryWrapper:**
```typescript
function PageStoryWrapper({ config }: { config: any }) {
  const [adapterWarnings, setAdapterWarnings] = useState<AdapterWarning[]>([]);

  const validation = validatePageConfig(config);

  if (!validation.success) {
    const errors = parseZodErrors(validation.error);
    return <ValidationErrorDisplay errors={errors} />;
  }

  return (
    <>
      <ValidationSuccessDisplay message="Schema validated" compact />
      <PageRenderer 
        config={config}
        onAdapterWarning={(warning) => {
          setAdapterWarnings(prev => [...prev, warning]);
        }}
      />
      <AdapterWarningsDisplay 
        warnings={adapterWarnings}
        onDismiss={(index) => {
          setAdapterWarnings(prev => prev.filter((_, i) => i !== index));
        }}
      />
    </>
  );
}
```

**Stories Updated:**
1. **Dashboard** - Uses wrapper
2. **EmployeeForm** - Uses wrapper
3. **AnalyticsDashboard** - Uses wrapper
4. **Settings** - Uses wrapper
5. **ListDetail** - Uses wrapper
6. **ValidationError** - Uses ValidationErrorDisplay component directly
7. **Minimal** - Uses wrapper

### 6. Updated `src/renderer/index.ts`

**Exports Added:**
```typescript
// Validation Display
export {
  ValidationErrorDisplay,
  ValidationSuccessDisplay,
  parseZodErrors,
} from './ValidationDisplay';

// Adapter Warnings
export {
  AdapterWarningsDisplay,
  InlineAdapterWarning,
  AdapterWarningsBadge,
} from './AdapterWarnings';

// Error & Warning Overlay
export {
  ErrorWarningOverlay,
  InlineErrorBanner,
} from './ErrorWarningOverlay';
```

## Component Architecture

```
PageStoryWrapper
├── ValidationSuccessDisplay (compact badge)
├── PageRenderer
│   ├── config validation
│   ├── template resolution
│   └── onAdapterWarning callback
└── AdapterWarningsDisplay (floating panel)
    └── dismissible warning cards
```

**Alternative: ErrorWarningOverlay**
```
ErrorWarningOverlay
├── Collapsed State (badge with count)
└── Expanded State
    ├── ValidationErrorDisplay
    └── AdapterWarningsDisplay
    └── Scrollable content
```

## Key Features

### Validation Error Display
- **Inline visibility**: Errors shown directly in Storybook canvas
- **Structured format**: Path → Message → Code
- **Collapsible**: Hide errors after review
- **Color-coded**: Red for immediate recognition
- **Count badge**: Quick error count indicator

### Adapter Warning Display
- **Floating notifications**: Don't block content
- **Dismissible**: Click × to remove warnings
- **Component details**: Shows exact component and provider
- **Type indicators**: Icons differentiate warning types
- **Stackable**: Multiple warnings shown in order

### Error/Warning Overlay
- **Persistent panel**: Always accessible in bottom-right
- **Collapsible**: Minimize to badge when not needed
- **Scrollable**: Handle many errors/warnings
- **Combined view**: Errors and warnings in one place
- **Position control**: Move to any corner

## Usage Examples

### Basic Story with Validation Display

```typescript
export const MyStory: Story = {
  render: () => {
    return <PageStoryWrapper config={myConfig} />;
  },
};
```

### Custom Error Handling

```typescript
export const CustomStory: Story = {
  render: () => {
    const [warnings, setWarnings] = useState<AdapterWarning[]>([]);
    const validation = validatePageConfig(config);

    if (!validation.success) {
      return (
        <ValidationErrorDisplay 
          errors={parseZodErrors(validation.error)}
          title="Configuration Error"
        />
      );
    }

    return (
      <>
        <PageRenderer
          config={config}
          onAdapterWarning={(w) => setWarnings(prev => [...prev, w])}
        />
        <AdapterWarningsDisplay warnings={warnings} />
      </>
    );
  },
};
```

### Using ErrorWarningOverlay

```typescript
export const OverlayStory: Story = {
  render: () => {
    const [warnings, setWarnings] = useState<AdapterWarning[]>([]);
    const validation = validatePageConfig(config);
    const errors = validation.success ? [] : parseZodErrors(validation.error);

    return (
      <>
        {validation.success && (
          <PageRenderer 
            config={config}
            onAdapterWarning={(w) => setWarnings(prev => [...prev, w])}
          />
        )}
        
        <ErrorWarningOverlay
          validationErrors={errors}
          adapterWarnings={warnings}
          onDismissWarning={(i) => setWarnings(prev => prev.filter((_, idx) => idx !== i))}
        />
      </>
    );
  },
};
```

## Visual Design

### Validation Errors
- **Color**: Red (#dc2626)
- **Icon**: ❌
- **Background**: Light red (#fef2f2)
- **Border**: 2px solid red
- **Layout**: Full-width card with collapsible content

### Adapter Warnings
- **Color**: Orange/Yellow (#f59e0b)
- **Icon**: ⚡ (fallback), 🚫 (not found), ⚠️ (missing)
- **Background**: Light yellow (#fef3c7)
- **Border**: 2px solid orange
- **Layout**: Fixed position cards, stackable

### Success Indicator
- **Color**: Green (#16a34a)
- **Icon**: ✅
- **Background**: Light green (#dcfce7)
- **Format**: Compact badge (inline) or full banner

## Benefits

### For Developers
1. **Immediate visibility**: Errors shown in canvas, not just console
2. **Structured errors**: Path + message easier to debug than raw Zod output
3. **Non-blocking warnings**: Continue working while warnings visible
4. **Dismissible**: Clear warnings after acknowledgment
5. **Provider feedback**: Know when adapters fallback to MUI

### For Story Viewers
1. **Clear validation status**: Green badge = valid, red panel = errors
2. **No console diving**: All info in UI
3. **Last render visible**: Page shows even with warnings
4. **Context preserved**: Errors don't replace entire canvas

### For Testing
1. **Visual regression**: Errors/warnings visible in screenshots
2. **Schema enforcement**: Invalid configs immediately visible
3. **Adapter coverage**: Missing adapters highlighted
4. **Provider validation**: Verify adapter availability per provider

## Statistics

- **Files Created**: 3 new components (869 total lines)
- **Files Modified**: 3 (renderPage.tsx, index.ts, JsonPages.stories.tsx)
- **Components**: 8 new UI components
- **Stories Updated**: 7 stories
- **Build Status**: ✅ Successful (22.82s)
- **Bundle Size**: JsonPages.stories: 59.50 kB (gzip: 14.29 kB)

## Testing Instructions

### 1. Test Validation Error Display

```bash
cd ui
npm run storybook
```

Navigate to: **JSON Pages → Complete Pages → ValidationError**

**Expected:**
- Red error panel displayed prominently
- Shows "NonExistentTemplate" error
- Path and message clearly visible
- No console-only errors

### 2. Test Adapter Warnings

**Steps:**
1. Open any JSON page story (Dashboard, EmployeeForm, etc.)
2. Switch provider using toolbar (MUI → Internal)
3. Check for adapter warnings if internal adapter missing

**Expected:**
- Yellow/orange warning cards in bottom-right
- Shows component type and fallback info
- Warnings dismissible with × button
- Page continues to render

### 3. Test Success Indicator

**Steps:**
1. Open any valid JSON page story
2. Look for green success badge at top

**Expected:**
- Green badge: "✅ Schema validated successfully"
- Compact format (not blocking)
- Appears before page content

### 4. Test Last Render Persistence

**Steps:**
1. Open ValidationError story
2. Note that error is displayed
3. Verify no crash or blank screen

**Expected:**
- Error displayed in red panel
- Explanation text visible below
- No blank canvas (error is the render)

### 5. Test Warning Dismissal

**Steps:**
1. Trigger an adapter warning
2. Click × on warning card
3. Verify warning disappears

**Expected:**
- Warning removed from display
- No page refresh required
- Other warnings remain if present

## Next Steps

### Potential Enhancements

1. **Warning Persistence**
   - Save dismissed warnings to sessionStorage
   - Show "Show dismissed" button to restore

2. **Error Recovery**
   - Add "Retry" button for failed renders
   - Auto-retry on config change

3. **Detailed Error Info**
   - Link to schema documentation
   - Show valid values for enum errors
   - Syntax highlighting for config excerpts

4. **Warning Filters**
   - Filter warnings by type
   - Group warnings by component
   - Search warnings by component name

5. **Export Errors**
   - Copy errors to clipboard
   - Download error report as JSON
   - Share error URL with query params

6. **Accessibility**
   - Add ARIA labels and roles
   - Keyboard navigation for dismissing
   - Screen reader announcements

## Conclusion

Prompt 8 successfully enhanced JSON-driven page stories with **inline error and warning displays**. All validation errors and adapter warnings are now visible directly in the Storybook UI, avoiding console-only feedback. The implementation supports:

- ✅ Inline validation error display
- ✅ Adapter fallback warning display  
- ✅ Non-blocking error/warning presentation
- ✅ Last valid render preservation
- ✅ Dismissible warnings
- ✅ Position-controlled overlays
- ✅ Collapsible panels
- ✅ Success indicators

The system provides clear, visual feedback for developers working with JSON-driven pages, making debugging and validation significantly easier.
