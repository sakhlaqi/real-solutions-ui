# 🧩 Phase 3 - Layout System Architecture

## Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    LAYOUT SYSTEM (Phase 3)                      │
│                                                                 │
│  ┌─────────────────────┐  ┌──────────────────────────────┐    │
│  │ Application Layouts │  │    Marketing Layouts         │    │
│  │ (Existing - Audited)│  │    (Phase 3 - New)          │    │
│  └─────────────────────┘  └──────────────────────────────┘    │
│           │                            │                        │
│           ├── DashboardLayout          ├── MarketingLayout  ✨ │
│           ├── TwoColumnLayout          ├── LandingLayout    ✨ │
│           └── TabsLayout               └── BlankPageLayout  ✨ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   TEMPLATE REGISTRY                             │
│  ┌───────────────────────────────────────────────────────┐     │
│  │  registerTemplate() → templateRegistry → getTemplate()│     │
│  └───────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   JSON RENDERER                                 │
│  ┌───────────────────────────────────────────────────────┐     │
│  │  useLayoutRenderer(layoutConfig)                      │     │
│  │    ├── Resolves template from registry               │     │
│  │    ├── Resolves sections from registry               │     │
│  │    └── Returns: { Template, sections, errors }       │     │
│  └───────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   RENDERED OUTPUT                               │
│  <Template>                                                     │
│    <Section1 />                                                 │
│    <Section2 />                                                 │
│    <Section3 />                                                 │
│  </Template>                                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Layout Hierarchy

### DashboardLayout
```
┌─────────────────────────────────────┐
│          Header (Nav)               │
├──────────┬──────────────────────────┤
│          │                          │
│ Sidebar  │     Main Content         │
│  (Nav)   │      (Dashboard)         │
│          │                          │
├──────────┴──────────────────────────┤
│          Footer                     │
└─────────────────────────────────────┘
```

### TwoColumnLayout
```
┌─────────────────────────────────────┐
│          Header                     │
├──────────────┬──────────────────────┤
│              │                      │
│    Left      │       Right          │
│  (Master)    │      (Detail)        │
│              │                      │
├──────────────┴──────────────────────┤
│          Footer                     │
└─────────────────────────────────────┘
```

### TabsLayout
```
┌─────────────────────────────────────┐
│          Header                     │
├─────────────────────────────────────┤
│  [Tab 1] [Tab 2] [Tab 3]           │
├─────────────────────────────────────┤
│                                     │
│      Tab Content Area               │
│                                     │
├─────────────────────────────────────┤
│          Footer                     │
└─────────────────────────────────────┘
```

### MarketingLayout ✨
```
┌─────────────────────────────────────┐
│    Header (Sticky, Nav + CTA)       │
├──────────────────────┬──────────────┤
│                      │              │
│   Main Content       │   Sidebar    │
│   (Full sections)    │   (TOC)      │
│                      │   (Sticky)   │
│                      │              │
├──────────────────────┴──────────────┤
│    Footer (Links, Newsletter)       │
└─────────────────────────────────────┘
```

### LandingLayout ✨
```
┌─────────────────────────────────────┐
│  Header (Transparent/Sticky)        │
├─────────────────────────────────────┤
│                                     │
│         Hero Section                │
│                                     │
├─────────────────────────────────────┤
│         Features Section            │
├─────────────────────────────────────┤
│         Social Proof                │
├─────────────────────────────────────┤
│         Pricing/CTA                 │
├─────────────────────────────────────┤
│    Footer (Minimal)                 │
└─────────────────────────────────────┘
```

### BlankPageLayout ✨
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│                                     │
│        Custom Content               │
│        (Full Control)               │
│                                     │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

---

## Data Flow

### Direct Usage
```typescript
User Code
   ↓
Import Layout Component
   ↓
<MarketingLayout slots={{...}} />
   ↓
Rendered Layout
```

### JSON-Driven Usage
```typescript
JSON Config
   ↓
useLayoutRenderer(config)
   ↓
templateRegistry.getTemplate(id)
   ↓
sectionRegistry.getSection(id)
   ↓
{ Template, sections[] }
   ↓
<Template>
  {sections.map(Section)}
</Template>
   ↓
Rendered Page
```

---

## Integration Points

### Phase 1: Template Marketplace Foundation
```
BaseRegistry
    ↓
templateRegistry
    ↓
registerTemplate()
getTemplate()
```

### Phase 2: Section Blueprints
```
45 Section Blueprints (JSON)
    ↓
sectionRegistry
    ↓
Layout Main Slot
```

### Phase 3: Layout Alignment (Current)
```
6 Layouts
    ↓
Registered in templateRegistry
    ↓
useLayoutRenderer
    ↓
Dynamic Page Composition
```

---

## File Organization

```
ui/src/core/
├── templates/
│   ├── DashboardLayout/
│   │   ├── DashboardLayout.tsx
│   │   ├── types.ts
│   │   └── index.ts
│   ├── TwoColumnLayout/
│   │   ├── TwoColumnLayout.tsx
│   │   ├── types.ts
│   │   └── index.ts
│   ├── TabsLayout/
│   │   ├── TabsLayout.tsx
│   │   ├── types.ts
│   │   └── index.ts
│   ├── MarketingLayout/           ✨ NEW
│   │   ├── MarketingLayout.tsx
│   │   ├── types.ts
│   │   └── index.ts
│   ├── LandingLayout/             ✨ NEW
│   │   ├── LandingLayout.tsx
│   │   ├── types.ts
│   │   └── index.ts
│   ├── BlankPageLayout/           ✨ NEW
│   │   ├── BlankPageLayout.tsx
│   │   ├── types.ts
│   │   └── index.ts
│   ├── registerLayouts.ts         ✨ NEW
│   ├── layoutValidationExamples.ts ✨ NEW
│   └── index.ts
├── registry/
│   ├── templateRegistry.ts
│   ├── sectionRegistry.ts
│   └── ...
├── behaviours/
│   ├── useLayoutRenderer.ts
│   └── ...
└── template-sections/
    └── (45 JSON blueprints)
```

---

## Usage Patterns

### Pattern 1: Direct Import
```typescript
import { MarketingLayout } from '@sakhlaqi/ui';

<MarketingLayout
  slots={{ header, main, sidebar, footer }}
  stickyHeader={true}
/>
```

### Pattern 2: JSON Configuration
```typescript
import { useLayoutRenderer } from '@sakhlaqi/ui';

const config = {
  template: { type: 'marketing-layout' },
  sections: [...]
};

const { Template, sections } = useLayoutRenderer(config);
```

### Pattern 3: Registry Access
```typescript
import { getTemplate } from '@sakhlaqi/ui';

const Layout = getTemplate('marketing-layout');
```

---

## Type System

```typescript
// Layout Props Pattern
interface LayoutProps {
  slots: LayoutSlots;
  // Layout-specific options
  stickyHeader?: boolean;
  maxWidth?: number | 'full';
  // Common props
  className?: string;
  style?: CSSProperties;
  testId?: string;
}

// Registry Entry Pattern
interface TemplateRegistryEntry {
  metadata: {
    id: string;
    name: string;
    category: string;
    version: string;
  };
  status: 'active' | 'deprecated';
  content: ComponentType;
}
```

---

## Testing Strategy

### Unit Tests
- Component rendering
- Prop validation
- Slot rendering
- Style application

### Integration Tests
- Registry registration
- JSON rendering
- Section composition
- Error handling

### E2E Tests
- Full page rendering
- Layout switching
- Responsive behavior
- Theme integration

---

## Performance Characteristics

| Layout | Bundle Size | Render Time | Complexity |
|--------|-------------|-------------|------------|
| DashboardLayout | ~2KB | Fast | Medium |
| TwoColumnLayout | ~2KB | Fast | Low |
| TabsLayout | ~2KB | Fast | Medium |
| MarketingLayout | ~3KB | Fast | Medium |
| LandingLayout | ~2KB | Fast | Low |
| BlankPageLayout | ~1KB | Fastest | Minimal |

---

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Accessibility

All layouts include:
- ✅ Semantic HTML (`<header>`, `<main>`, `<aside>`, `<footer>`)
- ✅ ARIA landmarks
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ Focus management
- ✅ data-testid attributes

---

## Next Steps

1. **Phase 4: Template Assembly**
   - Combine layouts + sections
   - Create pre-built templates
   - Tenant customization

2. **Phase 5: Visual Builder**
   - Drag-and-drop interface
   - Live preview
   - Export to JSON

3. **Phase 6: Template Marketplace**
   - Browse templates
   - Install/customize
   - Share templates

---

*Architecture diagram created for Phase 3*  
*Date: January 25, 2026*
