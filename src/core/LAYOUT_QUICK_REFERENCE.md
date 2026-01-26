# 🧩 Layout System Quick Reference

## Available Layouts

### Application Layouts
```typescript
import { 
  DashboardLayout,
  TwoColumnLayout,
  TabsLayout 
} from '@sakhlaqi/ui/core/templates';
```

### Marketing Layouts
```typescript
import { 
  MarketingLayout,
  LandingLayout,
  BlankPageLayout 
} from '@sakhlaqi/ui/core/templates';
```

---

## Direct Usage

### MarketingLayout
```tsx
<MarketingLayout
  slots={{
    header: <NavBar />,
    main: <Content />,
    sidebar: <TableOfContents />,
    footer: <Footer />
  }}
  stickyHeader={true}
  sidebarPosition="right"
  sidebarVisible={true}
  stickySidebar={true}
  maxWidth={1280}
/>
```

### LandingLayout
```tsx
<LandingLayout
  slots={{
    header: <MinimalNav />,
    main: <LandingContent />,
    footer: <MinimalFooter />
  }}
  transparentHeader={true}
  smoothScroll={true}
  maxWidth={1200}
/>
```

### BlankPageLayout
```tsx
<BlankPageLayout
  slots={{ content: <CustomContent /> }}
  applyTheme={true}
  fullHeight={true}
  maxWidth={500}
  padding={24}
/>
```

---

## JSON-Driven Usage

### 1. Import the renderer
```typescript
import { useLayoutRenderer } from '@sakhlaqi/ui/core/behaviours';
```

### 2. Define your config
```typescript
const layoutConfig = {
  template: {
    type: 'marketing-layout',
    version: '1.0.0',
    props: {
      stickyHeader: true,
      maxWidth: 1280
    }
  },
  sections: [
    { 
      id: 'hero', 
      type: 'hero-center-aligned',
      props: { heading: 'Welcome' }
    },
    { 
      id: 'features', 
      type: 'features-grid-3-columns' 
    }
  ],
  metadata: {
    title: 'Home Page'
  }
};
```

### 3. Render
```tsx
function Page() {
  const { Template, sections, errors } = useLayoutRenderer(layoutConfig);

  if (!Template) return <div>Loading...</div>;

  return (
    <Template>
      {sections.map(({ id, Component, props }) => (
        Component ? <Component key={id} {...props} /> : null
      ))}
    </Template>
  );
}
```

---

## Layout IDs (for JSON)

| Layout ID | Use Case |
|-----------|----------|
| `dashboard-layout` | Admin panels, dashboards |
| `two-column-layout` | Master-detail, settings |
| `tabs-layout` | Multi-view content |
| `marketing-layout` | Marketing sites, blogs |
| `landing-layout` | Landing pages, campaigns |
| `blank-layout` | Custom designs, auth pages |

---

## Props Reference

### MarketingLayout Props
```typescript
{
  slots: { header?, main, sidebar?, footer? }
  sidebarVisible?: boolean         // default: false
  sidebarPosition?: 'left'|'right' // default: 'right'
  sidebarWidth?: number            // default: 280
  stickyHeader?: boolean           // default: true
  stickySidebar?: boolean          // default: false
  maxWidth?: number | 'full'       // default: 'full'
}
```

### LandingLayout Props
```typescript
{
  slots: { header?, main, footer? }
  stickyHeader?: boolean           // default: true
  transparentHeader?: boolean      // default: false
  maxWidth?: number | 'full'       // default: 1200
  smoothScroll?: boolean           // default: true
}
```

### BlankPageLayout Props
```typescript
{
  slots: { content }
  applyTheme?: boolean             // default: true
  fullHeight?: boolean             // default: true
  maxWidth?: number | 'full'       // default: 'full'
  padding?: number | 'none'        // default: 'none'
}
```

---

## Auto-Registration

Import to register all layouts:
```typescript
import '@sakhlaqi/ui/core/templates/registerLayouts';
```

Or call manually:
```typescript
import { registerAllLayouts } from '@sakhlaqi/ui/core/templates/registerLayouts';
registerAllLayouts();
```

---

## Examples

See `core/templates/layoutValidationExamples.ts` for complete examples:
- Marketing website
- Landing page campaign
- Dashboard application
- Blog with sidebar
- Custom auth page

---

## Support

- **Documentation:** `core/PHASE3_COMPLETE.md`
- **Examples:** `core/templates/layoutValidationExamples.ts`
- **Types:** All layouts fully typed with TypeScript
- **Tests:** All layouts validated with JSON renderer
