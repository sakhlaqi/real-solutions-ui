# Core Architecture Documentation

## Overview

The `/core` directory contains a layered UI architecture designed for scalability, tenant customization, and template marketplace functionality. This structure enables JSON-driven page composition and supports thousands of tenant layouts.

## Directory Structure

```
/core
  /components        # Atomic, provider-adapted UI components (MUI-backed)
  /composites        # Reusable UI patterns composed from components
  /template-sections # Layout-aware page sections (JSON blueprints)
  /templates         # Full-page templates composed of sections
  /registry          # Template & section registration system
  /behaviours        # Hooks, controllers, and cross-cutting logic
  /context           # React context providers
  /theme             # Theme configuration and utilities
  /types             # TypeScript type definitions
```

## Layer Responsibilities

### 1. Components (`/components`)

**Purpose**: Atomic UI elements, MUI-backed, adapter-safe

**Characteristics**:
- Single responsibility
- No layout assumptions
- Provider-adapted (MUI/shadcn)
- Fully accessible
- Theme-aware

**Examples**:
- `Button`, `Card`, `DataGrid`, `TreeView`, `DatePickers`
- Located in subdirectories: `buttons/`, `forms/`, `data-display/`, etc.

**Usage**:
```tsx
import { Button, Card } from '@/core/components';
```

### 2. Composites (`/composites`)

**Purpose**: Reusable UI patterns with no layout assumptions

**Characteristics**:
- Composed from components
- Encapsulate common patterns
- No spacing/positioning logic
- Configurable through props

**Examples**:
- `PricingCards` - Collection of pricing options
- `SidebarNavigation` - Navigation menu pattern
- `StatsGrid` - Statistics display grid
- `SearchGrid` - Search with data grid
- `Header` - Application header composite

**Usage**:
```tsx
import { SearchGridComposite } from '@/core/composites';
```

### 3. Template Sections (`/template-sections`)

**Purpose**: Layout-aware page blocks (JSON blueprints)

**Characteristics**:
- Own spacing, grid, responsive behavior
- Consume composites + components
- Defined as JSON blueprints with schemas
- 45 sections across 21 categories

**Categories**:
- Marketing: `hero/`, `features/`, `pricing/`, `cta/`, `footer/`, `testimonials/`
- Content: `blog/`, `faq/`, `stats/`, `contact/`
- E-commerce: `checkout/`
- Applications: `dashboard/`, `auth/`, `profile/`, `settings/`
- Media: `gallery/`
- Navigation: `navigation/`, `logo-collection/`
- Notifications: `notifications/`

**JSON Blueprint Structure**:
```json
{
  "id": "hero-simple",
  "category": "hero",
  "name": "Simple Hero",
  "description": "...",
  "schema": { /* JSON Schema validation */ },
  "defaultProps": { /* Default configuration */ },
  "slots": { /* Editable content areas */ },
  "layout": { /* Responsive layout config */ },
  "styling": { /* MUI theme integration */ },
  "interactions": { /* User interaction patterns */ },
  "accessibility": { /* A11y configuration */ },
  "examples": [ /* Usage examples */ ]
}
```

**Usage**:
```tsx
import { loadSectionJson } from '@/core/template-sections';

const heroConfig = await loadSectionJson('hero', 'simple.json');
```

### 4. Templates (`/templates`)

**Purpose**: Full-page compositions

**Characteristics**:
- Compose template-sections
- Define page structure
- No direct UI rendering
- Layout orchestration

**Examples**:
- `DashboardLayout` - Dashboard page template
- `TwoColumnLayout` - Two-column page layout
- `TabsLayout` - Tabbed page interface

**Usage**:
```tsx
import { DashboardLayout } from '@/core/templates';
```

### 5. Registry (`/registry`)

**Purpose**: Template & section component registration

**Key Files**:
- `BaseRegistry.ts` - Generic registry implementation
- `templateRegistry.ts` - Full-page template registration
- `sectionRegistry.ts` - Page section registration
- `PageSectionRegistry.ts` - Legacy section registry
- `WebsiteTemplateRegistry.ts` - Legacy template registry

**Features**:
- Maps string IDs → React components
- Version management
- Category and tag-based queries
- Search functionality
- Stats and metadata

**Usage**:
```tsx
import { 
  registerTemplate, 
  registerSection,
  getTemplate,
  getSection 
} from '@/core/registry';

// Register a template
registerTemplate({
  metadata: {
    id: 'landing-basic',
    name: 'Basic Landing Page',
    version: '1.0.0',
    category: 'landing',
  },
  status: 'active',
  content: LandingBasicTemplate,
});

// Register a section
registerSection({
  metadata: {
    id: 'hero-simple',
    name: 'Simple Hero',
    version: '1.0.0',
    category: 'hero',
  },
  status: 'active',
  content: HeroSimpleSection,
});

// Retrieve components
const Template = getTemplate('landing-basic');
const Section = getSection('hero-simple');
```

### 6. Behaviours (`/behaviours`)

**Purpose**: Hooks, controllers, and cross-cutting logic

**Key Hooks**:

#### `useLayoutRenderer`
JSON-driven layout rendering:
```tsx
import { useLayoutRenderer } from '@/core/behaviours';

const layout = {
  template: { type: 'landing-basic' },
  sections: [
    { id: 'hero', type: 'hero-simple', props: { heading: 'Welcome' } },
    { id: 'features', type: 'features-grid', props: { items: [...] } },
  ],
};

const { Template, sections, errors } = useLayoutRenderer(layout);

return (
  <Template>
    {sections.map(({ id, Component, props }) => (
      <Component key={id} {...props} />
    ))}
  </Template>
);
```

#### `useLayoutFromJson`
Parse and render layouts from JSON:
```tsx
import { useLayoutFromJson } from '@/core/behaviours';

const jsonString = '{ "template": { "type": "landing-basic" }, ... }';
const { Template, sections } = useLayoutFromJson(jsonString);
```

#### `useTenantTheme`
Tenant-specific theme management:
```tsx
import { useTenantTheme } from '@/core/behaviours';

const themeConfig = useTenantTheme();
const theme = createTheme(themeConfig);
```

#### `useTemplateRegistry`
Access registry in components:
```tsx
import { useTemplateRegistry } from '@/core/behaviours';

const { 
  searchTemplates, 
  searchSections,
  templateCount,
  sectionCount 
} = useTemplateRegistry();
```

## JSON-Driven Layout Engine

The system supports fully JSON-driven page composition:

```json
{
  "template": {
    "type": "landing-basic",
    "version": "1.0.0",
    "props": {
      "navigation": { ... }
    }
  },
  "sections": [
    {
      "id": "hero-section",
      "type": "hero-simple",
      "version": "1.0.0",
      "props": {
        "heading": "Welcome to Our Product",
        "subheading": "Build amazing things",
        "primaryAction": {
          "label": "Get Started",
          "href": "/signup"
        }
      }
    },
    {
      "id": "features-section",
      "type": "features-grid",
      "props": {
        "heading": "Features",
        "items": [...]
      }
    }
  ],
  "metadata": {
    "title": "Home Page",
    "description": "Landing page"
  }
}
```

## Migration Guide

### From Old Structure to New

**Old**: `templates/page-sections/*`  
**New**: `core/template-sections/*`

**Old**: `templates/website-templates/*`  
**New**: `core/templates/*`

**Old**: `templates/registry/*`  
**New**: `core/registry/*`

### Updating Imports

```tsx
// Before
import { PageSectionRegistry } from '@/templates/registry';

// After
import { sectionRegistry, registerSection } from '@/core/registry';
```

```tsx
// Before
import heroSimple from '@/templates/page-sections/hero/simple.json';

// After
import { loadSectionJson } from '@/core/template-sections';
const heroSimple = await loadSectionJson('hero', 'simple.json');
```

## Benefits of New Architecture

1. **Scalability**: Clear separation of concerns enables thousands of tenant layouts
2. **Template Marketplace**: Registry system supports browsing, searching, and installing templates
3. **JSON-Driven**: Layouts defined in JSON enable runtime customization
4. **Type Safety**: Full TypeScript support with strict typing
5. **Versioning**: Built-in version management for templates and sections
6. **Discoverability**: Search and categorization for templates
7. **Composability**: Clean layering from atoms → molecules → organisms → templates
8. **Testability**: Each layer can be tested independently
9. **Maintainability**: Responsibilities clearly defined
10. **Extensibility**: Easy to add new templates and sections

## Future Enhancements

- [ ] Visual template builder UI
- [ ] Template preview system
- [ ] Runtime template installation
- [ ] Template dependency management
- [ ] Template analytics and usage tracking
- [ ] A/B testing for templates
- [ ] Template versioning and rollback
- [ ] Collaborative template editing

## Statistics

- **45 Template Sections** across 21 categories
- **~62,000 lines** of JSON blueprints
- **65+ examples** demonstrating section usage
- **Complete accessibility** (ARIA, keyboard navigation)
- **Full responsive support** (5 breakpoints: xs, sm, md, lg, xl)
- **Theme integration** (light/dark mode)
- **Production-ready** sections with comprehensive features
