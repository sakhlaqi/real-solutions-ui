# Storybook Stories Organization

This Storybook is organized following **Atomic Design** principles to serve as a living specification for the UI platform.

## Folder Structure

### 1-atoms/ 
**Basic building blocks** - Smallest, indivisible UI elements

- Button, Input, Typography
- Badge, Avatar, Chip
- Divider, Separator, Paper
- Icon, IconButton
- Skeleton, Spinner, Progress, LinearProgress
- Switch, Checkbox, Rating, Toggle
- Tooltip, Backdrop

**Purpose:** Foundation components that cannot be broken down further. These are the raw materials of your UI.

---

### 2-molecules/
**Simple combinations of atoms** - Groups of atoms functioning together

- ButtonGroup, Select, MultiSelect, Autocomplete
- DatePicker, DateTimePicker, RadioGroup
- Tabs, Alert, Snackbar
- Menu, DropdownMenu, ContextMenu
- Breadcrumbs, Pagination, Stepper
- Slider, Textarea, TextareaAutosize
- List, Accordion
- Dialog, Modal, Popover
- Timeline, ImageList
- SpeedDial, Lightbox

**Purpose:** Simple UI patterns that combine multiple atoms into functional units. Still relatively simple with focused functionality.

---

### 3-composites/
**Complex, data-driven components** - Sophisticated combinations with business logic

- Card (with complex content)
- Table, XDataGrid
- Form (multi-field forms)
- TransferList
- Charts
- Masonry
- SimpleTreeView, RichTreeView, TreeItem
- HeaderComposite, SidebarComposite, SearchGridComposite

**Purpose:** Complex components that handle data, state, and business logic. These are feature-complete UI patterns.

---

### 4-layouts/
**Structural components** - Page structure and spatial arrangement

- AppBar, Navbar, Sidebar
- Drawer, SlideOver, BottomSheet
- Container, Box, Stack, Flex
- Section, Toolbar
- BottomNavigation

**Purpose:** Components that define page structure, spacing, and arrangement. These don't render content but organize other components.

---

### 5-json-pages/
**JSON-driven pages and templates** - Complete page specifications

- PageRenderer (JSON → React)
- DashboardLayout
- TwoColumnLayout
- TabsLayout

**Purpose:** Full-page compositions driven by JSON configuration. This is the heart of the multi-tenant platform's flexibility.

---

### 6-anti-patterns/
**What NOT to do** - Examples of incorrect usage

- *(To be populated with examples)*
- Improper provider mixing
- Breaking adapter contracts
- Theme violations
- Accessibility failures

**Purpose:** Educational examples showing common mistakes and why they're problematic. Helps developers understand the "why" behind design decisions.

---

## Story Naming Convention

Each story file should follow this pattern:

```
[ComponentName].stories.tsx
```

Within each story file, use this structure:

```tsx
const meta = {
  title: 'Category/ComponentName',
  component: ComponentName,
  // ...
};

export const Default: Story = { ... };
export const Variant: Story = { ... };
```

## How to Use This Storybook

### For Designers
- Browse **1-atoms** and **2-molecules** to understand available building blocks
- Review **5-json-pages** to see how pages are composed
- Check **6-anti-patterns** to avoid common mistakes

### For Developers
- Use **1-atoms** and **2-molecules** as API reference
- Study **3-composites** for complex component patterns
- Reference **4-layouts** for structural best practices
- Use **5-json-pages** to understand JSON schema requirements

### For Platform Engineers
- Maintain adapter implementations using stories as specifications
- Add new stories when adding components
- Update **6-anti-patterns** when discovering common mistakes
- Keep stories synchronized with component behavior

## Adding New Stories

1. **Determine the correct category** using atomic design principles
2. **Place the story file** in the appropriate folder
3. **Follow the existing pattern** for that category
4. **Include all variants** that demonstrate the component's capabilities
5. **Add documentation** explaining usage and props
6. **Test with all providers** (internal, MUI, shadcn) to ensure adapter works

## Migration Notes

Stories were reorganized from:
```
src/adapters/*.stories.tsx → stories/[1-6]-[category]/
stories/composites/ → stories/3-composites/
stories/pages/ → stories/5-json-pages/
stories/templates/ → stories/5-json-pages/
```

All component behavior remains unchanged. This is purely a structural refactor for better organization and discoverability.
