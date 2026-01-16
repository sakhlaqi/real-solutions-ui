# New Adaptive Components - Phase 2

**Date:** January 16, 2026
**Version:** v2.1.0

## Summary

Added 10 new adaptive components to the `@sakhlaqi/ui` library, bringing the total from 15 to **25 adaptive components**. These components follow the established adaptive pattern and provide seamless switching between internal and Material-UI implementations.

## New Components

### 1. **Card** (`src/adapters/Card.tsx`)
Material Design card container with elevation and variants.

**Key Features:**
- Padding control (none/sm/md/lg)
- Elevation shadows (MUI)
- Outlined variant support
- Click handler for interactive cards

**Prop Transformations:**
- Filters `elevation`, `variant` for internal (not supported)

---

### 2. **Tooltip** (`src/adapters/Tooltip.tsx`)
Contextual information on hover.

**Key Features:**
- Placement control (top/bottom/left/right)
- Arrow indicator
- Smooth animations (MUI)

**Note:** Currently uses MUI implementation for both providers (internal tooltip in overlay may not exist)

---

### 3. **Badge** (`src/adapters/Badge.tsx`)
Notification badge for icons and elements.

**Key Features:**
- Color variants (primary/secondary/error/warning/info/success)
- Dot variant for status indicators
- Max count display
- Visibility control

**Prop Transformations:**
- Maps `variant` 'standard'/'dot' → 'default' for internal
- Filters `max`, `invisible` props

---

### 4. **Avatar** (`src/adapters/Avatar.tsx`)
User profile image or initials display.

**Key Features:**
- Size variants (small/medium/large)
- Shape variants (circular/rounded/square)
- Image source or children (initials)
- Custom background color

**Prop Transformations:**
- Maps `size`: 'small'/'medium'/'large' → 'sm'/'md'/'lg'

---

### 5. **Chip** (`src/adapters/Chip.tsx`)
Compact element for tags and labels.

**Key Features:**
- Color variants
- Deletable chips (onDelete)
- Clickable chips (onClick)
- Icon support
- Filled/outlined variants

**Prop Transformations:**
- Transforms `label` prop → `children` for internal
- Filters `variant`, `size`, `deleteIcon`

---

### 6. **Spinner** (`src/adapters/Spinner.tsx`)
Loading indicator (circular progress).

**Key Features:**
- Size variants (small/medium/large)
- Color themes (primary/secondary/inherit)
- Indeterminate animation

**Prop Transformations:**
- Maps `size`: 'small'/'medium'/'large' → 'sm'/'md'/'lg' for internal
- Maps MUI sizes to pixel values (20/40/60)

---

### 7. **Slider** (`src/adapters/Slider.tsx`)
Range input slider.

**Key Features:**
- Single or range values
- Min/max bounds
- Step increments
- Marks support (MUI)
- Value label display (MUI)

**Prop Transformations:**
- Filters `marks`, `valueLabelDisplay` for internal

---

### 8. **Switch** (`src/adapters/Switch.tsx`)
Toggle switch for boolean values.

**Key Features:**
- Label support
- Color themes
- Size variants
- Disabled state

**Prop Transformations:**
- Filters `color`, `size` for internal
- Uses internal Toggle component

---

### 9. **RadioGroup** (`src/adapters/RadioGroup.tsx`)
Radio button group for single selection.

**Key Features:**
- Options array with labels
- Horizontal/vertical layout (row prop)
- Individual option disable
- Group-level disable

**Prop Transformations:**
- Provides default `name` prop (required by internal)
- Wraps `onChange` to convert string | number → string

---

### 10. **Pagination** (`src/adapters/Pagination.tsx`)
Page navigation component.

**Key Features:**
- Page count and current page
- First/last button visibility
- Sibling and boundary counts (MUI)
- Variant and shape control (MUI)

**Prop Transformations:**
- Transforms `page`/`count` → `currentPage`/`totalPages`
- Transforms `onChange` signature
- Filters `variant`, `shape`, `size`, `siblingCount`, `boundaryCount`

---

## Implementation Details

### MUI Wrapper Components Created

All 10 components have corresponding MUI wrapper components in `src/providers/mui/`:
- `Card.tsx` - MUI Card with padding mapping
- `Tooltip.tsx` - MUI Tooltip wrapper
- `Badge.tsx` - MUI Badge wrapper
- `Avatar.tsx` - MUI Avatar with size mapping
- `Chip.tsx` - MUI Chip wrapper
- `Slider.tsx` - MUI Slider with change handler mapping
- `Switch.tsx` - MUI Switch with FormControlLabel
- `RadioGroup.tsx` - MUI RadioGroup with Radio components
- `Pagination.tsx` - MUI Pagination with change handler

**Note:** Spinner uses MUI CircularProgress directly (no wrapper needed)

### Export Updates

Updated three export files:
1. **`src/providers/mui/index.ts`** - Added 9 new MUI component exports
2. **`src/adapters/index.ts`** - Added 10 new adapter exports
3. **`src/index.ts`** - Added 10 new adaptive component exports

### Conflict Resolution

Removed conflicting legacy exports from main `index.ts`:
- **Layout:** Removed `Card` export (now adaptive)
- **Navigation:** Removed `Pagination` export (now adaptive)
- **Data Display:** Removed `Badge`, `Avatar`, `Tooltip`, `Chip` exports (now adaptive)
- **Feedback:** Removed `Spinner` export (now adaptive)
- **Forms:** Removed `RadioGroup`, `Toggle` (Switch), `Slider` exports (now adaptive)

Users should now import these components from the root package to get adaptive versions:
```typescript
import { Card, Tooltip, Badge, Avatar, Chip, Spinner, Slider, Switch, RadioGroup, Pagination } from '@sakhlaqi/ui';
```

For explicit internal components:
```typescript
import { InternalComponents } from '@sakhlaqi/ui';
const { Card, Tooltip, ... } = InternalComponents;
```

---

## Testing

### Build Results

✅ **UI Library Build:** Success (0 errors)
- Output: `dist/index.js` 2,699.82 kB │ gzip: 608.01 kB
- Build time: 10.22s
- 2,639 modules transformed

### Type Safety

All components have proper TypeScript interfaces and pass strict type checking.

### Prop Transformations

All adapters include proper prop transformations to handle API differences:
- Size mapping (small/medium/large ↔ sm/md/lg)
- Variant mapping (standard/dot → default)
- Prop filtering (removing unsupported props)
- API structure changes (label → children, page/count → currentPage/totalPages)

---

## Documentation

Updated documentation files:
1. **`ADAPTIVE_COMPONENTS.md`** - Complete guide with all 25 components
   - Added sections 16-25 for new components
   - Updated "Recent Changes" with Phase 2
   - Updated non-adaptive component list
   - Updated version history to v2.1.0

2. **`NEW_ADAPTIVE_COMPONENTS_PHASE2.md`** - This document

---

## Usage Examples

### Card Component
```tsx
import { Card } from '@sakhlaqi/ui';

<Card padding="lg" elevation={3} variant="elevation">
  <h3>Card Title</h3>
  <p>Card content with Material Design elevation</p>
</Card>
```

### Badge Component
```tsx
import { Badge } from '@sakhlaqi/ui';
import NotificationsIcon from '@mui/icons-material/Notifications';

<Badge content={5} color="error">
  <NotificationsIcon />
</Badge>
```

### Avatar Component
```tsx
import { Avatar } from '@sakhlaqi/ui';

<Avatar src="/user.jpg" alt="User" size="large" />
<Avatar size="medium">JD</Avatar>
```

### Chip Component
```tsx
import { Chip } from '@sakhlaqi/ui';

<Chip 
  label="Active" 
  color="success" 
  onDelete={() => handleDelete()} 
/>
```

### Slider Component
```tsx
import { Slider } from '@sakhlaqi/ui';

<Slider 
  value={volume} 
  onChange={setVolume} 
  min={0} 
  max={100} 
  marks 
/>
```

### Switch Component
```tsx
import { Switch } from '@sakhlaqi/ui';

<Switch 
  checked={enabled} 
  onChange={setEnabled} 
  label="Enable notifications" 
/>
```

### RadioGroup Component
```tsx
import { RadioGroup } from '@sakhlaqi/ui';

<RadioGroup 
  value={selected}
  onChange={setSelected}
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]}
  row
/>
```

### Pagination Component
```tsx
import { Pagination } from '@sakhlaqi/ui';

<Pagination 
  count={10} 
  page={currentPage} 
  onChange={setPage}
  showFirstButton
  showLastButton
/>
```

---

## Breaking Changes

### Component Imports

Components that were previously always internal are now adaptive:
- `Card` - Import from root for adaptive, or use `InternalComponents.Card`
- `Pagination` - Import from root for adaptive, or use `InternalComponents.Pagination`
- `Badge`, `Avatar`, `Tooltip`, `Chip` - Same pattern
- `Spinner` - Same pattern
- `Slider`, `RadioGroup`, `Toggle` - Same pattern

### Migration Guide

**Before (v2.0.0):**
```typescript
import { Card, Badge, Avatar } from '@sakhlaqi/ui';
// Always used internal components
```

**After (v2.1.0):**
```typescript
// Adaptive components (recommended)
import { Card, Badge, Avatar } from '@sakhlaqi/ui';

// Explicit internal (if needed)
import { InternalComponents } from '@sakhlaqi/ui';
const { Card, Badge, Avatar } = InternalComponents;

// Explicit MUI (if needed)
import { MUIComponents } from '@sakhlaqi/ui';
const { Card, Badge, Avatar } = MUIComponents;
```

---

## Future Work

### Potential Additional Adapters

Components that could be made adaptive in future:
- **Drawer** - Side panel navigation
- **AppBar** - Application header bar
- **Menu** - Dropdown/context menus
- **Dialog** - Modal dialogs (currently SlideOver is internal only)
- **Stepper** - Multi-step forms
- **Autocomplete** - Search input with suggestions
- **Timeline** - Event timeline display

### Internal Component Implementations

Some adapters currently fall back to MUI for internal:
- **Tooltip** - Could implement internal tooltip component
- **Charts** - Could implement internal chart components (currently MUI-only)

### Theme Synchronization

- Synchronize theme colors between internal and MUI
- Map internal theme tokens to MUI theme
- Ensure consistent styling across providers

---

## Technical Notes

### Prop Transformation Pattern

All adapters follow this pattern:

```typescript
import { useUIContext } from '../core/context';
import { Component as InternalComponent } from '../[folder]';
import { Component as MUIComponent } from '../providers/mui';

export const Component: React.FC<Props> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIComponent {...props} />;
  }
  
  // Transform props for internal API
  const { muiOnlyProp, ...transformedProps } = props;
  const mappedProp = mapToInternal(props.muiProp);
  
  return <InternalComponent {...transformedProps} mappedProp={mappedProp} />;
};
```

### Size Mapping Convention

Standard size mapping between MUI and internal:
- `small` → `sm`
- `medium` → `md`
- `large` → `lg`
- `extra-large` → `xl` (when applicable)

### Color Variant Consistency

Both providers support these color variants:
- `primary`
- `secondary`
- `error`
- `warning`
- `info`
- `success`

Additional MUI-only variants are filtered for internal components.

---

## Conclusion

Phase 2 successfully expanded the adaptive component library from 15 to 25 components, providing comprehensive coverage of commonly-used UI elements. The library now offers flexible provider switching for most core components, allowing applications to choose between internal and Material-UI implementations based on their needs.

**Total Adaptive Components:** 25
**Build Status:** ✅ Success (0 errors)
**Documentation:** ✅ Complete
**Type Safety:** ✅ Strict TypeScript
**Bundle Size:** 2,699.82 kB (608.01 kB gzipped)

The library is now ready for v2.1.0 release. 🎉
