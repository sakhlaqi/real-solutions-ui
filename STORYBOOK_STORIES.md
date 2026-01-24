# Storybook Stories Implementation

## Overview

Complete Storybook story suite for templates, composites, and JSON-driven pages with provider switching support.

## Created Files

### Configuration
- **/.storybook/preview.tsx** - Updated with RenderContextProvider for adapter system
- **/.storybook/main.ts** - Added `/stories/**` pattern

### Template Stories (3 files)
1. **/stories/templates/DashboardLayout.stories.tsx**
   - 6 story variants: Empty, Complete, NoSidebar, NarrowSidebar, WideSidebar, MainOnly
   - Controls: sidebarVisible (boolean), sidebarWidth (range 200-400)
   - Sample components for visual testing

2. **/stories/templates/TwoColumnLayout.stories.tsx**
   - 6 story variants: Equal, Complete, MasterDetail, ContentWithSidebar, NoGap, LargeGap
   - Controls: leftWidth (ratio 0.2-0.8), gap (range 0-48)
   - Demonstrates master-detail and content-sidebar patterns

3. **/stories/templates/TabsLayout.stories.tsx**
   - 5 story variants: Basic, Complete, TwoTabs, ControlledMode, ManyTabs
   - Controls: activeTab (text), tabLabels (object), onTabChange (action)
   - Shows controlled/uncontrolled modes

### Composite Stories (3 files)
1. **/stories/composites/SearchGridComposite.stories.tsx**
   - 10 story variants: Basic, Complete, WithSearch, WithFilters, WithRowActions, WithToolbarActions, Empty, Loading, MultipleSelection, CustomRenderers
   - Sample employee data with realistic columns
   - Demonstrates search, filtering, pagination, selection, actions

2. **/stories/composites/HeaderComposite.stories.tsx**
   - 12 story variants: Basic, Complete, WithBreadcrumbs, WithActions, WithBackButton, SingleAction, WithSubtitle, DeepNavigation, MultipleActions, Minimal, FormHeader, LongContent
   - Covers navigation, actions, breadcrumbs, back button
   - Common use cases for page headers

3. **/stories/composites/SidebarComposite.stories.tsx**
   - 11 story variants: Basic, Complete, WithNesting, WithBadges, Collapsible, Collapsed, Wide, SettingsSidebar, NoIcons, DeepNesting, DocumentOutline
   - Navigation patterns with icons, badges, nesting
   - Collapsible sidebar functionality

### Example JSON Pages (3 files)
1. **/pages/examples/dashboard.json**
   - DashboardLayout with sidebar and data grid
   - HeaderComposite with breadcrumbs
   - SidebarComposite with navigation items
   - SearchGridComposite with employee data

2. **/pages/examples/list-detail.json**
   - TwoColumnLayout (30/70 master-detail split)
   - HeaderComposite with back button and actions
   - SearchGridComposite in left column
   - Card component in right column

3. **/pages/examples/settings.json**
   - TabsLayout with 4 tabs (Profile, Account, Notifications, Security)
   - HeaderComposite with breadcrumbs
   - Card components in each tab panel

### Page Stories (1 file)
1. **/stories/pages/PageRenderer.stories.tsx**
   - 7 story variants: Dashboard, ListDetail, Settings, Minimal, Complex, InvalidTemplate, InvalidComponent
   - Loads and renders JSON page configurations
   - Demonstrates full JSON-driven architecture
   - Error handling examples

## Features

### Provider Switching
- **UI Provider toolbar**: Switch between MUI and Internal providers
- All components (templates, composites, atomics) adapt automatically
- Lazy loading with Suspense for async adapter resolution

### Interactive Controls
- **Boolean toggles**: sidebarVisible, searchEnabled, collapsible
- **Range sliders**: sidebarWidth (200-400), leftWidth (0.2-0.8), gap (0-48)
- **Text inputs**: title, subtitle, searchPlaceholder, activeTab
- **Object editors**: data, columns, filters, breadcrumbs, actions
- **Action logging**: onTabChange, rowActions, toolbarActions

### Sample Content
All stories include realistic sample content:
- **Employee data**: Name, email, department, role, salary, status
- **Navigation items**: Hierarchical menus with icons and badges
- **Breadcrumbs**: Multi-level navigation paths
- **Actions**: Primary, secondary, danger variants
- **Task data**: Title, assignee, status, priority, due date

### Documentation
Each story includes:
- **Component description**: Purpose and use cases
- **Provider support**: MUI/Internal behavior
- **Feature list**: Capabilities and options
- **Code examples**: Usage patterns
- **Story descriptions**: What each variant demonstrates

## Story Count Summary

| Category   | Files | Stories |
|------------|-------|---------|
| Templates  | 3     | 17      |
| Composites | 3     | 33      |
| Pages      | 1     | 7       |
| **Total**  | **7** | **57**  |

Plus 3 JSON page configuration examples.

## Usage

### Run Storybook
```bash
cd ui
npm run storybook
```

### Navigate Stories
- **Templates**: Composites > Templates > [DashboardLayout | TwoColumnLayout | TabsLayout]
- **Composites**: Composites > [SearchGridComposite | HeaderComposite | SidebarComposite]
- **Pages**: Pages > PageRenderer

### Switch Providers
Use the **UI Provider** toolbar at the top of Storybook:
- **MUI**: Uses Material-UI components
- **Internal**: Uses internal components (or fallback to MUI)

### Modify Props
Use the **Controls** panel to interactively change props:
- Toggle booleans (sidebar visibility, search enabled)
- Adjust ranges (widths, gaps)
- Edit objects (data, columns, actions)
- Change text (titles, placeholders)

## Architecture Patterns

### Wrapper Pattern
All stories use a consistent wrapper pattern:
```tsx
const ComponentWrapper = (props) => {
  const context = useRenderContext();
  const provider = context.provider || 'mui';
  
  const Adapter = React.lazy(async () => {
    const adapter = await resolveComponentAdapter(type, provider);
    return { default: adapter };
  });
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Adapter {...props} />
    </Suspense>
  );
};
```

### Story Structure
```tsx
export const StoryName: Story = {
  args: {
    prop1: value1,
    prop2: value2,
  },
};
```

### Meta Configuration
```tsx
const meta = {
  title: 'Category/Component',
  component: Wrapper,
  parameters: {
    layout: 'padded',
    docs: { ... },
  },
  tags: ['autodocs'],
  argTypes: { ... },
} satisfies Meta<typeof Wrapper>;
```

## Next Steps

1. **Test in Browser**: Run Storybook and verify all stories load
2. **Provider Switching**: Test switching between MUI and Internal providers
3. **Interactive Testing**: Use controls to modify props and see updates
4. **Visual Regression**: Setup Chromatic or Percy for visual testing
5. **Accessibility**: Run a11y addon on all stories
6. **Documentation**: Review generated docs for completeness

## Benefits

✅ **Visual Testing**: All components visible in isolation
✅ **Provider Switching**: Test both MUI and Internal implementations
✅ **Interactive Controls**: Modify props without code changes
✅ **Documentation**: Auto-generated docs from JSDoc and stories
✅ **Example Pages**: Real-world JSON page configurations
✅ **Error Handling**: Stories demonstrating error states
✅ **Comprehensive Coverage**: 57 stories across templates, composites, and pages
✅ **Realistic Data**: Sample content for meaningful visual testing
✅ **Multiple Variants**: Different configurations for each component
✅ **JSON-Driven**: Full demonstration of JSON-to-UI architecture
