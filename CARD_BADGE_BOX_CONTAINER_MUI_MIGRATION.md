# Card, Badge, Box, Container MUI Migration - Complete

## Summary
Successfully migrated Card, Badge, Box, and Container components to use MUI implementations, deprecated internal versions, and verified existing Storybook documentation.

## Date
January 19, 2026

## Changes Made

### 1. MUI Implementations Enhanced

#### Card Component (`src/providers/mui/Card.tsx`)
**Enhanced Features:**
- Added `hover` prop for lift effect on hover
- Added `interactive` prop to make entire card clickable with CardActionArea
- Added `shadow` prop (backward compatibility with internal API)
- Added `xl` padding size option
- Exported MUI sub-components: `CardContent`, `CardHeader`, `CardActions`, `CardMedia`, `CardActionArea`
- Enhanced `sx` prop support for custom styling

**API:**
```typescript
interface CardProps {
  variant?: 'elevation' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  elevation?: number;  // 0-24
  shadow?: 'none' | 'sm' | 'md' | 'lg';  // deprecated, use elevation
  hover?: boolean;
  interactive?: boolean;
  sx?: SxProps<Theme>;
}
```

#### Badge Component (`src/providers/mui/Badge.tsx`)
**Enhanced Features:**
- Added `badgeContent` prop (alias for `content`)
- Added `showZero` prop to show badge when content is 0
- Added `anchorOrigin` prop for badge positioning
- Added `overlap` prop for rectangular/circular children
- Added `default` color option
- Enhanced `sx` prop support

**API:**
```typescript
interface BadgeProps {
  variant?: 'standard' | 'dot';
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  content?: React.ReactNode;
  badgeContent?: React.ReactNode;
  max?: number;
  showZero?: boolean;
  invisible?: boolean;
  anchorOrigin?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' };
  overlap?: 'rectangular' | 'circular';
  sx?: SxProps<Theme>;
}
```

#### Box Component (`src/providers/mui/Box.tsx`)
**New MUI Implementation:**
- Generic container with `sx` prop access
- Theme-aware spacing units
- Configurable display modes
- Component polymorphism via `component` prop

**API:**
```typescript
interface BoxProps {
  component?: React.ElementType;
  display?: 'block' | 'inline' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  width?: string | number;
  height?: string | number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  sx?: SxProps<Theme>;
}
```

#### Container Component (`src/providers/mui/Container.tsx`)
**New MUI Implementation:**
- Responsive max-width breakpoints
- Optional horizontal padding control
- Fixed width mode support

**API:**
```typescript
interface ContainerProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  disableGutters?: boolean;
  fixed?: boolean;
  sx?: SxProps<Theme>;
}
```

### 2. Adapters Updated

All four adapters now use MUI implementations exclusively:

#### Card Adapter (`src/adapters/Card.tsx`)
- **Before:** Used MUI Card but with limited props
- **After:** Uses enhanced MUI Card with full prop support
- Exports: `CardContent`, `CardHeader`, `CardActions`, `CardMedia`, `CardActionArea`
- Type export: `CardProps` (from `MUICardProps`)

#### Badge Adapter (`src/adapters/Badge.tsx`)
- **Before:** Used MUI Badge with basic props
- **After:** Uses enhanced MUI Badge with full feature set
- Type export: `BadgeProps` (from `MUIBadgeProps`)

#### Box Adapter (`src/adapters/Box.tsx`)
- **Before:** Used internal Box implementation
- **After:** Uses MUI Box with sx prop support
- Type export: `BoxProps` (from `MUIBoxProps`)

#### Container Adapter (`src/adapters/Container.tsx`)
- **Before:** Used internal Container implementation
- **After:** Uses MUI Container with responsive breakpoints
- Type export: `ContainerProps` (from `MUIContainerProps`)

### 3. Internal Components Deprecated

Added `@deprecated` JSDoc warnings to all internal implementations:

#### `src/base/Card.tsx`
```typescript
/**
 * @deprecated This internal Card component is deprecated.
 * The adapter now always uses MUI Card.
 * Please use the Card component from @sakhlaqi/ui/adapters instead.
 */
```

#### `src/data-display/Badge.tsx`
```typescript
/**
 * @deprecated This internal Badge component is deprecated.
 * The adapter now always uses MUI Badge.
 * Please use the Badge component from @sakhlaqi/ui/adapters instead.
 */
```

#### `src/layout/Box.tsx`
```typescript
/**
 * @deprecated This internal Box component is deprecated.
 * The adapter now always uses MUI Box.
 * Please use the Box component from @sakhlaqi/ui/adapters instead.
 */
```

#### `src/layout/Container.tsx`
```typescript
/**
 * @deprecated This internal Container component is deprecated.
 * The adapter now always uses MUI Container.
 * Please use the Container component from @sakhlaqi/ui/adapters instead.
 */
```

### 4. Storybook Documentation

All four components already have Storybook story files:
- **Card.stories.tsx** (144 lines) - Includes multiple variants, padding, elevation examples
- **Badge.stories.tsx** (140 lines) - Includes colors, dot variant, positioning examples
- **Box.stories.tsx** (93 lines) - Includes padding, margin, display examples
- **Container.stories.tsx** (148 lines) - Includes max-width, responsive examples

**Note:** Existing story files remain functional and demonstrate the adapter pattern.

### 5. MUI Provider Index Updated

Fixed duplicate exports in `src/providers/mui/index.ts`:

**Added:**
```typescript
export { Box } from './Box';
export type { BoxProps as MUIBoxProps } from './Box';
export { Container } from './Container';
export type { ContainerProps as MUIContainerProps } from './Container';
export { Card, CardContent, CardHeader, CardActions, CardMedia, CardActionArea } from './Card';
export type { CardProps as MUICardProps } from './Card';
export { Badge } from './Badge';
export type { BadgeProps as MUIBadgeProps } from './Badge';
```

**Removed:**
- Duplicate `Card` and `Badge` exports from earlier in the file

## Migration Guide

### For Card Component

**Before (Internal):**
```typescript
import { Card } from '@sakhlaqi/ui/base';

<Card padding="md" elevation={2} shadow="sm">
  <h3>Title</h3>
  <p>Content</p>
</Card>
```

**After (MUI):**
```typescript
import { Card, CardContent, CardHeader } from '@sakhlaqi/ui/adapters';

<Card padding="md" elevation={2} hover interactive>
  <CardHeader title="Title" />
  <CardContent>
    <p>Content</p>
  </CardContent>
</Card>
```

**New Features:**
- `hover` - Lift effect on hover
- `interactive` - Makes entire card clickable
- MUI sub-components for better structure
- `sx` prop for custom styling

### For Badge Component

**Before (Internal):**
```typescript
import { Badge } from '@sakhlaqi/ui/data-display';

<Badge variant="default" size="md">
  <NotificationIcon />
</Badge>
```

**After (MUI):**
```typescript
import { Badge } from '@sakhlaqi/ui/adapters';

<Badge badgeContent={5} color="error" max={99} showZero>
  <NotificationIcon />
</Badge>
```

**New Features:**
- `showZero` - Show badge when content is 0
- `anchorOrigin` - Position badge (top/bottom, left/right)
- `overlap` - Better alignment for circular/rectangular children
- `max` - Cap display value (e.g., 99+)

### For Box Component

**Before (Internal):**
```typescript
import { Box } from '@sakhlaqi/ui/layout';

<Box padding={16} margin={8} display="flex">
  Content
</Box>
```

**After (MUI):**
```typescript
import { Box } from '@sakhlaqi/ui/adapters';

<Box padding="md" margin="sm" display="flex" sx={{ bgcolor: 'primary.main' }}>
  Content
</Box>
```

**Key Changes:**
- Padding/margin now use theme spacing names ('sm', 'md', etc.) or numbers
- `sx` prop provides full theme access
- `component` prop for polymorphic rendering

### For Container Component

**Before (Internal):**
```typescript
import { Container } from '@sakhlaqi/ui/layout';

<Container maxWidth="lg" padding={true} centered={true}>
  Content
</Container>
```

**After (MUI):**
```typescript
import { Container } from '@sakhlaqi/ui/adapters';

<Container maxWidth="lg" disableGutters={false} fixed={false}>
  Content
</Container>
```

**Key Changes:**
- `disableGutters` replaces `padding` (inverted logic)
- `fixed` replaces `centered` (different behavior - fixed breakpoints)
- Responsive breakpoint system

## Build Results

### Before
- Bundle: 1,805.48 kB (gzipped: 488.33 kB)

### After
- Bundle: 1,817.26 kB (gzipped: 491.27 kB)
- **Increase: 11.78 kB uncompressed (2.94 kB gzipped)**

### Analysis
The slight increase is due to:
- Enhanced Card implementation with CardActionArea, hover animations
- Box and Container MUI components replacing internal CSS
- Badge enhancements (anchorOrigin, overlap positioning)

**Benefits:**
- Better accessibility (MUI ARIA support)
- Theme integration (consistent spacing, colors)
- More features (interactive cards, badge positioning)
- Reduced custom CSS maintenance
- Future-proof (MUI actively maintained)

## Files Modified

### Created/Enhanced (4 files)
- `src/providers/mui/Box.tsx` - New MUI Box wrapper
- `src/providers/mui/Container.tsx` - New MUI Container wrapper
- `src/providers/mui/Card.tsx` - Enhanced with hover, interactive, sub-components
- `src/providers/mui/Badge.tsx` - Enhanced with positioning, overlap, showZero

### Updated (9 files)
- `src/providers/mui/index.ts` - Added Box, Container exports, fixed duplicates
- `src/adapters/Card.tsx` - Updated to use enhanced MUI Card
- `src/adapters/Badge.tsx` - Updated to use enhanced MUI Badge
- `src/adapters/Box.tsx` - Updated to use MUI Box
- `src/adapters/Container.tsx` - Updated to use MUI Container
- `src/base/Card.tsx` - Added deprecation notice
- `src/data-display/Badge.tsx` - Added deprecation notice
- `src/layout/Box.tsx` - Added deprecation notice
- `src/layout/Container.tsx` - Added deprecation notice

### Existing Storybook Files (4 files)
- `src/adapters/Card.stories.tsx` - Already exists (144 lines)
- `src/adapters/Badge.stories.tsx` - Already exists (140 lines)
- `src/adapters/Box.stories.tsx` - Already exists (93 lines)
- `src/adapters/Container.stories.tsx` - Already exists (148 lines)

## Features Comparison

### Card

| Feature | Internal | MUI |
|---------|----------|-----|
| Variants | ✅ basic | ✅ elevation, outlined |
| Padding sizes | ✅ 4 sizes | ✅ 5 sizes (added xl) |
| Elevation | ✅ shadow prop | ✅ elevation (0-24) |
| Hover effect | ❌ | ✅ lift animation |
| Interactive | ✅ onClick | ✅ CardActionArea |
| Sub-components | ❌ | ✅ Header, Content, Actions, Media |
| Theme integration | ⚠️ CSS vars | ✅ Full MUI theme |
| Accessibility | ⚠️ Basic | ✅ Full ARIA |

### Badge

| Feature | Internal | MUI |
|---------|----------|-----|
| Colors | ✅ 6 colors | ✅ 7 colors (added default) |
| Variants | ✅ standard, dot | ✅ standard, dot |
| Max value | ❌ | ✅ 99+ capping |
| Show zero | ❌ | ✅ Optional display |
| Positioning | ❌ | ✅ anchorOrigin |
| Overlap mode | ❌ | ✅ rectangular/circular |
| Custom content | ⚠️ Limited | ✅ Any React node |
| Accessibility | ⚠️ Basic | ✅ Full ARIA |

### Box

| Feature | Internal | MUI |
|---------|----------|-----|
| Padding/margin | ✅ px values | ✅ theme spacing units |
| Display modes | ✅ 6 modes | ✅ 7 modes (added none) |
| Component prop | ❌ | ✅ Polymorphic |
| Width/height | ✅ | ✅ |
| Text align | ✅ | ✅ |
| Theme access | ❌ | ✅ sx prop |
| Type safety | ⚠️ Basic | ✅ Full TypeScript |

### Container

| Feature | Internal | MUI |
|---------|----------|-----|
| Max widths | ✅ 6 sizes | ✅ 5 breakpoints + false |
| Responsive | ⚠️ CSS only | ✅ MUI breakpoint system |
| Padding control | ✅ boolean | ✅ disableGutters |
| Fixed width | ❌ | ✅ fixed prop |
| Centering | ✅ centered prop | ✅ automatic |
| Theme integration | ❌ | ✅ Full MUI theme |

## Testing Recommendations

### Card
1. Test all variants (elevation, outlined)
2. Test all padding sizes (none through xl)
3. Test hover effect animation
4. Test interactive mode with keyboard navigation
5. Test sub-components (CardHeader, CardContent, etc.)
6. Test accessibility with screen readers

### Badge
1. Test all color variants
2. Test dot variant
3. Test max value capping (99+, 999+)
4. Test showZero functionality
5. Test all anchor origin positions (4 corners)
6. Test overlap modes with rectangular and circular children
7. Test with various badge content (numbers, text, icons)

### Box
1. Test all padding and margin sizes
2. Test all display modes
3. Test component polymorphism (div, section, article)
4. Test sx prop for theme access
5. Test responsive behavior

### Container
1. Test all maxWidth breakpoints (xs, sm, md, lg, xl)
2. Test disableGutters prop
3. Test fixed width mode
4. Test responsive resizing
5. Test with maxWidth={false} for full width

## Storybook Usage

### View Stories
```bash
cd ui
npm run storybook
```

### Stories Available
- **Card:** Multiple variants in existing stories
- **Badge:** Color and variant examples in existing stories
- **Box:** Layout examples in existing stories
- **Container:** Responsive examples in existing stories

## Next Steps (Optional)

1. **Remove Internal Implementations** (v4.0.0)
   - Delete `src/base/Card.tsx` and `Card.css`
   - Delete `src/data-display/Badge.tsx` and `Badge.css`
   - Delete `src/layout/Box.tsx` and `Box.css`
   - Delete `src/layout/Container.tsx` and `Container.css`
   - Update exports in index files

2. **Enhance Storybook Stories**
   - Add stories showcasing new Card features (hover, interactive)
   - Add stories demonstrating Badge positioning and overlap
   - Add stories showing Box sx prop usage
   - Add stories for Container responsive behavior

3. **Performance Optimization**
   - Analyze bundle size impact
   - Consider lazy loading for less-used sub-components
   - Optimize re-renders with React.memo where appropriate

4. **Documentation**
   - Update main README with new component features
   - Create migration examples for each component
   - Document theme customization options

## Benefits

### For Developers
- Consistent MUI component patterns across all base components
- Better TypeScript types from MUI
- Comprehensive prop support (sx, theme, etc.)
- Reduced custom CSS to maintain
- Better accessibility out of the box
- Industry-standard component APIs

### For Users
- Improved accessibility (ARIA attributes, keyboard navigation)
- Better responsive behavior
- Consistent styling with Material Design
- Smoother animations and transitions
- Better mobile experience
- More customization options via sx prop

### For the Project
- Reduced maintenance burden (MUI handles updates)
- Better documentation (MUI docs as reference)
- Stronger TypeScript support
- More features without additional code
- Easier onboarding (MUI is well-known)
- Future-proof component foundation

## Documentation Links

- [MUI Card Docs](https://mui.com/material-ui/react-card/)
- [MUI Badge Docs](https://mui.com/material-ui/react-badge/)
- [MUI Box Docs](https://mui.com/material-ui/react-box/)
- [MUI Container Docs](https://mui.com/material-ui/react-container/)
- [Card Storybook](http://localhost:6006/?path=/story/data-display-card--default)
- [Badge Storybook](http://localhost:6006/?path=/story/data-display-badge--default)
- [Box Storybook](http://localhost:6006/?path=/story/layout-box--default)
- [Container Storybook](http://localhost:6006/?path=/story/layout-container--default)
