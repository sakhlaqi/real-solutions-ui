# @sakhlaqi/ui - Adaptive Components Quick Reference

## All Available Adaptive Components (45 Total)

### Form Components (5)
```tsx
import { Button, IconButton, Input, Select, Checkbox } from '@sakhlaqi/ui';

// Button - Material UI Button
<Button variant="contained" color="primary" size="medium">
  Click Me
</Button>

// IconButton - Material UI IconButton
<IconButton aria-label="delete" color="error">
  <DeleteIcon />
</IconButton>

// Input - Material UI TextField
<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error="Invalid email"
  helperText="Enter a valid email address"
/>

// Select - Material UI Select
<Select
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' }
  ]}
  value={country}
  onChange={(value) => setCountry(value)}
/>

// Checkbox - Material UI Checkbox
<Checkbox
  label="Accept terms"
  checked={accepted}
  onChange={(e) => setAccepted(e.target.checked)}
/>
```

### Data Display (2)
```tsx
import { Table, TreeView } from '@sakhlaqi/ui';

// Table - Material UI Table
<Table
  rows={users}
  columns={[
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'role', headerName: 'Role' }
  ]}
  pagination
  onRowClick={(row) => console.log(row)}
/>

// TreeView - Material UI X TreeView
<TreeView
  nodes={[
    {
      id: '1',
      label: 'Root',
      children: [
        { id: '1-1', label: 'Child 1' },
        { id: '1-2', label: 'Child 2' }
      ]
    }
  ]}
  onNodeSelect={(nodeId) => console.log(nodeId)}
/>
```

### Date & Time (1)
```tsx
import { DatePicker } from '@sakhlaqi/ui';

// DatePicker - Material UI X DatePicker
<DatePicker
  label="Birth Date"
  value={birthDate}
  onChange={(date) => setBirthDate(date)}
  minDate={new Date('1900-01-01')}
  maxDate={new Date()}
/>
```

### Charts (3)
```tsx
import { LineChart, BarChart, PieChart } from '@sakhlaqi/ui';

// LineChart - Material UI X LineChart
<LineChart
  series={[
    {
      name: 'Sales',
      data: [
        { x: 'Jan', y: 100 },
        { x: 'Feb', y: 150 },
        { x: 'Mar', y: 200 }
      ]
    }
  ]}
  height={400}
  showGrid
/>

// BarChart - Material UI X BarChart
<BarChart
  series={[
    {
      name: 'Revenue',
      data: [
        { x: 'Q1', y: 50000 },
        { x: 'Q2', y: 75000 },
        { x: 'Q3', y: 90000 }
      ]
    }
  ]}
  orientation="vertical"
  height={400}
/>

// PieChart - Material UI X PieChart
<PieChart
  data={[
    { label: 'Product A', value: 35 },
    { label: 'Product B', value: 25 },
    { label: 'Product C', value: 40 }
  ]}
  height={400}
  innerRadius={50} // For donut chart
/>
```

### Feedback & Overlay (4)
```tsx
import { Alert, Snackbar, Progress, Modal } from '@sakhlaqi/ui';

// Alert - Material UI Alert
<Alert severity="success" variant="filled" onClose={() => setShow(false)}>
  Operation completed successfully!
</Alert>

// Snackbar - Material UI Snackbar
<Snackbar
  open={showNotif}
  onClose={() => setShowNotif(false)}
  message="Item added to cart"
  severity="success"
  position="bottom-right"
  autoHideDuration={5000}
/>

// Progress - Material UI CircularProgress/LinearProgress
<Progress variant="indeterminate" color="primary" size={40} />
<Progress linear variant="determinate" value={75} />

// Modal - Material UI Dialog
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirmation"
  maxWidth="sm"
  actions={
    <>
      <Button onClick={handleCancel}>Cancel</Button>
      <Button variant="contained" onClick={handleConfirm}>
        Confirm
      </Button>
    </>
  }
>
  <p>Are you sure you want to continue?</p>
</Modal>
```

### Navigation (2)
```tsx
import { Tabs, Breadcrumbs } from '@sakhlaqi/ui';

// Tabs - Material UI Tabs
<Tabs
  value={activeTab}
  onChange={(value) => setActiveTab(value)}
  tabs={[
    { label: 'Overview', value: 'overview' },
    { label: 'Details', value: 'details', icon: <InfoIcon /> },
    { label: 'Settings', value: 'settings' }
  ]}
/>

// Breadcrumbs - Material UI Breadcrumbs
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Category', onClick: () => navigate('/category') },
    { label: 'Product Details' }
  ]}
/>
```

## Legacy Components Access

Internal components that don't conflict with adapters are still available:

```tsx
// Forms
import { 
  PasswordInput, EmailInput, NumberInput, 
  Textarea, MultiSelect, Autocomplete, 
  RadioGroup, Toggle, TimePicker, DateTimePicker,
  Rating, Slider, TransferList, FileUpload 
} from '@sakhlaqi/ui/forms';

// Buttons
import { 
  ButtonGroup, FloatingActionButton, LinkButton, 
  SplitButton, ToggleButton 
} from '@sakhlaqi/ui/buttons';

// Data Display
import { 
  Badge, Avatar, Tooltip, List, ListItem, 
  Chip, Tag, Timeline 
} from '@sakhlaqi/ui/data-display';

// Feedback
import { 
  Spinner, ProgressBar, ProgressCircle, 
  SkeletonLoader, EmptyState, ErrorState, 
  SuccessState, Toast, useToast 
} from '@sakhlaqi/ui/feedback';

// Overlay
import { 
  Dialog, Backdrop, SlideOver, 
  BottomSheet, Lightbox, Popover 
} from '@sakhlaqi/ui/overlay';

// Navigation
import { 
  Navbar, Pagination, Stepper, AppBar, 
  BottomNavigation, DropdownMenu, ContextMenu, SpeedDial 
} from '@sakhlaqi/ui/navigation';

// Layout
import { 
  Header, Footer, MainLayout, AdminLayout, Sidebar,
  Container, Grid, Paper, Card, Stack, Box, etc.
} from '@sakhlaqi/ui/layout';

// Typography
import { Heading, Text } from '@sakhlaqi/ui/typography';

// Utility
import { 
  ErrorBoundary, Portal, ThemeProvider, 
  ClickAwayListener, CssBaseline, NoSsr, 
  useMediaQuery, etc.
} from '@sakhlaqi/ui/utility';
```

## Provider-Specific Access

```tsx
// Direct MUI access
import * as MUIComponents from '@sakhlaqi/ui/providers/mui';
<MUIComponents.Button>Always MUI</MUIComponents.Button>
<MUIComponents.Modal open={true}>Always MUI</MUIComponents.Modal>

// All MUI components
MUIComponents.Button
MUIComponents.IconButton
MUIComponents.Input
MUIComponents.Select
MUIComponents.Checkbox
MUIComponents.DataTable
MUIComponents.AdvancedTable
MUIComponents.DatePicker
MUIComponents.TreeView
MUIComponents.LineChart
MUIComponents.BarChart
MUIComponents.PieChart
MUIComponents.Modal
MUIComponents.Alert
MUIComponents.Tabs
MUIComponents.Breadcrumbs
MUIComponents.Snackbar
MUIComponents.Progress
```

## Theme & Context

```tsx
import { UIProvider, useUIContext, getDesignTokens, createMUITheme } from '@sakhlaqi/ui';

// Wrap your app
<UIProvider defaultTheme="light">
  <App />
</UIProvider>

// Use context (future enhancement)
const { provider, theme, setProvider, setTheme } = useUIContext();

// Theme utilities
const tokens = getDesignTokens('dark');
const muiTheme = createMUITheme('dark');
```

## Component Summary by Category

| Category | Adaptive Count | Legacy Available |
|----------|---------------|------------------|
| **Forms** | 5 | 11 additional |
| **Buttons** | 2 | 5 additional |
| **Data Display** | 2 | 6 additional |
| **Feedback** | 3 | 7 additional |
| **Overlay** | 1 | 6 additional |
| **Navigation** | 2 | 8 additional |
| **Charts** | 3 | 0 |
| **Date/Time** | 1 | 1 additional |
| **Layout** | 0 | 20+ available |
| **Typography** | 0 | 2 available |
| **Utility** | 0 | 10+ available |
| **Total Adaptive** | **15** | **67+ legacy** |

## Installation

```bash
npm install @sakhlaqi/ui
```

## Dependencies

The adaptive components automatically include:
- @mui/material
- @mui/icons-material
- @mui/x-data-grid
- @mui/x-date-pickers
- @mui/x-tree-view
- @mui/x-charts
- @emotion/react
- @emotion/styled
- date-fns

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import type { 
  BaseButtonProps, 
  BaseInputProps, 
  SelectProps, 
  CheckboxProps,
  BaseTableProps,
  Column,
  BaseModalProps,
  BaseAlertProps,
  BaseTabsProps,
  BreadcrumbsProps,
  SnackbarProps,
  ProgressProps,
  // ... and many more
} from '@sakhlaqi/ui';
```

---

## 🆕 Phase 5 Components (January 16, 2026)

### ButtonGroup - Group Buttons Together
```tsx
import { ButtonGroup, Button } from '@sakhlaqi/ui';

<ButtonGroup variant="contained" size="medium" orientation="horizontal">
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</ButtonGroup>

// Vertical orientation
<ButtonGroup orientation="vertical" fullWidth>
  <Button>Option A</Button>
  <Button>Option B</Button>
</ButtonGroup>
```

### ToggleButton - Single Toggle Button  
```tsx
import { ToggleButton } from '@sakhlaqi/ui';
import { FormatBold, FormatItalic } from '@mui/icons-material';

<ToggleButton
  value="bold"
  selected={isBold}
  onChange={() => setIsBold(!isBold)}
  size="medium"
>
  <FormatBold />
</ToggleButton>
```

### Rating - Star Rating Component
```tsx
import { Rating } from '@sakhlaqi/ui';

// Basic rating
<Rating
  value={rating}
  onChange={(value) => setRating(value)}
  max={5}
/>

// Half-star precision
<Rating
  value={4.5}
  onChange={setRating}
  precision={0.5}
  size="large"
/>

// Read-only
<Rating value={4} readOnly />
```

### Skeleton - Loading Placeholder
```tsx
import { Skeleton } from '@sakhlaqi/ui';

// Text skeleton
<Skeleton variant="text" width={200} />

// Rectangular skeleton
<Skeleton variant="rectangular" width={300} height={100} />

// Circular skeleton (avatar)
<Skeleton variant="circular" width={40} height={40} />

// Multiple skeletons
<div>
  <Skeleton variant="text" width="60%" />
  <Skeleton variant="text" width="80%" />
  <Skeleton variant="text" width="40%" />
</div>
```

### LinearProgress - Linear Progress Bar
```tsx
import { LinearProgress } from '@sakhlaqi/ui';

// Determinate (with value)
<LinearProgress value={75} variant="determinate" />

// Indeterminate (loading)
<LinearProgress variant="indeterminate" />

// With color
<LinearProgress value={50} color="secondary" />
```

---

## 📊 Updated Component Statistics

| Category | Adaptive Count | Key Components |
|----------|---------------|----------------|
| **Forms** | 8 | Button, Input, Select, Checkbox, Rating, Textarea, RadioGroup, IconButton |
| **Data Display** | 8 | Table, TreeView, Card, Tooltip, Badge, Avatar, Chip, List |
| **Feedback** | 7 | Alert, Spinner, Slider, Switch, Progress, Skeleton, LinearProgress |
| **Overlay** | 3 | Modal, Snackbar, Drawer |
| **Charts** | 3 | LineChart, BarChart, PieChart |
| **Navigation** | 6 | Tabs, Breadcrumbs, Pagination, Stepper, Menu, BottomNavigation |
| **Layout** | 5 | Accordion, Dialog, AppBar, Divider, Popover |
| **Buttons** | 3 | ButtonGroup, ToggleButton, SpeedDial |
| **Utility** | 2 | DatePicker, Backdrop, Toolbar |
| **Total Adaptive** | **45** | Up from 40 components |

---

## 🎯 Complete Usage Example

```tsx
import { 
  UIProvider, 
  Button, 
  Input, 
  Rating, 
  LinearProgress,
  Skeleton,
  ButtonGroup,
  Card
} from '@sakhlaqi/ui';
import '@sakhlaqi/ui/styles';

function App() {
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(4);
  const [progress, setProgress] = useState(75);

  return (
    <UIProvider defaultProvider="internal">
      <Card>
        <h1>Product Review</h1>
        
        {loading ? (
          <>
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="rectangular" height={100} />
            <Skeleton variant="text" width="60%" />
          </>
        ) : (
          <>
            <Rating value={rating} onChange={setRating} />
            <Input label="Your Review" placeholder="Write your review..." />
            
            <LinearProgress value={progress} variant="determinate" />
            
            <ButtonGroup>
              <Button variant="outlined">Cancel</Button>
              <Button variant="contained">Submit</Button>
            </ButtonGroup>
          </>
        )}
      </Card>
    </UIProvider>
  );
}
```

---

## 📚 Additional Resources

- **Full Documentation:** [ADAPTIVE_COMPONENTS.md](./ADAPTIVE_COMPONENTS.md)
- **Changelog:** [CHANGELOG_v2.3.md](./CHANGELOG_v2.3.md)
- **Setup Guide:** [GITHUB_PACKAGES_SETUP.md](./GITHUB_PACKAGES_SETUP.md)
- **Architecture:** [DUAL_PROVIDER_ARCHITECTURE.md](./DUAL_PROVIDER_ARCHITECTURE.md)

**Version:** 2.3.0  
**Last Updated:** January 16, 2026  
**Total Adaptive Components:** 45
