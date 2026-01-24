# Provider-Adapter Integration

## Overview

The Provider-Adapter system enables JSON-rendered components to work with multiple UI libraries (MUI, internal) without leaking provider-specific imports. This architecture maintains separation of concerns and allows runtime provider switching.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    JSON Configuration                    │
│                  (Provider-agnostic)                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                      Renderer                            │
│              (renderNode, renderPage)                    │
│                                                          │
│  • Validates JSON                                        │
│  • Resolves adapters based on provider                   │
│  • Handles errors & fallbacks                            │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  Adapter Resolver                        │
│             (resolveComponentAdapter,                    │
│              resolveTemplateAdapter)                     │
│                                                          │
│  • Lazy-loads adapters                                   │
│  • Maps types to provider implementations                │
│  • Returns null if adapter not found                     │
└────────┬────────────────────────────────────────┬───────┘
         │                                        │
         ▼                                        ▼
┌─────────────────┐                    ┌─────────────────┐
│  MUI Adapters   │                    │Internal Adapters│
│                 │                    │                 │
│ • SearchGrid    │                    │ • SearchGrid    │
│ • Header        │                    │ • Header        │
│ • Sidebar       │                    │ • Sidebar       │
│ • Dashboard     │                    │ • Dashboard     │
│ • TwoColumn     │                    │ • TwoColumn     │
│ • Tabs          │                    │ • Tabs          │
└─────────────────┘                    └─────────────────┘
```

## Directory Structure

```
/src
├── adapters/
│   ├── resolver.ts                    # Adapter resolution logic
│   ├── index.ts                       # Public API
│   ├── mui/
│   │   ├── composites/
│   │   │   ├── SearchGridCompositeAdapter.tsx
│   │   │   ├── HeaderCompositeAdapter.tsx
│   │   │   ├── SidebarCompositeAdapter.tsx
│   │   │   └── index.ts
│   │   └── templates/
│   │       ├── DashboardLayoutAdapter.tsx
│   │       ├── TwoColumnLayoutAdapter.tsx
│   │       ├── TabsLayoutAdapter.tsx
│   │       └── index.ts
│   └── internal/
│       ├── composites/
│       │   ├── SearchGridCompositeAdapter.tsx  # Fallback to MUI
│       │   ├── HeaderCompositeAdapter.tsx      # Fallback to MUI
│       │   ├── SidebarCompositeAdapter.tsx     # Fallback to MUI
│       │   └── index.ts
│       └── templates/
│           ├── DashboardLayoutAdapter.tsx      # Fallback to MUI
│           ├── TwoColumnLayoutAdapter.tsx      # Fallback to MUI
│           ├── TabsLayoutAdapter.tsx           # Fallback to MUI
│           └── index.ts
├── core/
│   ├── composites/                    # Core composite logic (provider-agnostic)
│   └── templates/                     # Core template logic (provider-agnostic)
└── renderer/
    ├── renderNode.tsx                 # Uses adapter resolver for composites
    ├── renderPage.tsx                 # Uses adapter resolver for templates
    └── types.ts                       # Includes provider in RenderContext
```

## Key Components

### 1. Adapter Resolver (`/adapters/resolver.ts`)

**Purpose**: Dynamically resolves the correct adapter based on UI provider.

**Key Functions**:
```typescript
resolveComponentAdapter(componentType, provider): Promise<ComponentType | null>
resolveTemplateAdapter(templateType, provider): Promise<ComponentType | null>
hasComponentAdapter(componentType, provider): Promise<boolean>
hasTemplateAdapter(templateType, provider): Promise<boolean>
```

**Features**:
- Lazy-loading via dynamic imports
- Caching for performance
- Returns null if adapter not found (graceful degradation)

### 2. MUI Adapters

#### Composites (`/adapters/mui/composites/`)

**SearchGridCompositeAdapter**:
- Wraps MUI DataGrid (X-Data-Grid)
- Maps props: columns, filters, pagination, selection
- Handles: search, sorting, row actions, toolbar actions

**HeaderCompositeAdapter**:
- Uses MUI AppBar + Toolbar
- Supports: breadcrumbs, title, subtitle, actions

**SidebarCompositeAdapter**:
- Uses MUI Drawer + List
- Supports: collapsible, nested navigation, badges

#### Templates (`/adapters/mui/templates/`)

**DashboardLayoutAdapter**:
- Uses MUI Box for flex layout
- Slots: header, sidebar, main, footer
- Configurable sidebar width

**TwoColumnLayoutAdapter**:
- Uses MUI Box with flex
- Configurable column width ratio
- Optional header/footer

**TabsLayoutAdapter**:
- Uses MUI Tabs + Tab
- Automatic tab panel management
- Controlled/uncontrolled mode

### 3. Internal Adapters (`/adapters/internal/`)

Currently fallback to MUI adapters. Can be replaced with custom implementations:

```typescript
// Example custom implementation
export const SearchGridCompositeAdapter = (props) => {
  // Custom internal implementation
  return <CustomDataGrid {...props} />;
};
```

### 4. Renderer Integration

#### renderNode.tsx

```typescript
// Detect composite components
const compositeTypes = ['SearchGridComposite', 'HeaderComposite', 'SidebarComposite'];
const isComposite = compositeTypes.includes(type);

if (isComposite) {
  // Use React.lazy for async adapter resolution
  const AdapterWrapper = React.lazy(async () => {
    const Adapter = await resolveComponentAdapter(type, provider);
    return { default: Adapter };
  });

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <AdapterWrapper {...props} />
    </React.Suspense>
  );
}
```

#### renderPage.tsx

```typescript
// Resolve template adapter
const TemplateAdapter = React.lazy(async () => {
  const Adapter = await resolveTemplateAdapter(config.template, provider);
  return { default: Adapter };
});

return (
  <RenderContextProvider value={context}>
    <React.Suspense fallback={<div>Loading template...</div>}>
      <TemplateAdapter slots={renderedSlots} />
    </React.Suspense>
  </RenderContextProvider>
);
```

### 5. RenderContext

Extended to include provider:

```typescript
interface RenderContext {
  depth: number;
  maxDepth?: number;
  data?: Record<string, any>;
  onError?: (error: RenderError) => void;
  provider?: UIProvider;  // 'mui' | 'internal'
}
```

## Usage

### Basic Page Rendering

```tsx
import { PageRenderer } from './renderer';

function App() {
  return (
    <PageRenderer
      config={pageConfig}
      options={{
        provider: 'mui',  // or 'internal'
        maxDepth: 50,
        debug: true,
      }}
    />
  );
}
```

### JSON Configuration

```json
{
  "version": "1.0.0",
  "template": "DashboardLayout",
  "slots": {
    "header": {
      "type": "HeaderComposite",
      "props": {
        "title": "Dashboard",
        "breadcrumbs": [
          { "label": "Home", "path": "/" },
          { "label": "Dashboard" }
        ]
      }
    },
    "sidebar": {
      "type": "SidebarComposite",
      "props": {
        "items": [
          { "id": "1", "label": "Overview", "path": "/" }
        ]
      }
    },
    "main": {
      "type": "SearchGridComposite",
      "props": {
        "dataSource": "employees",
        "columns": [
          { "id": "name", "label": "Name", "field": "name" }
        ]
      }
    }
  }
}
```

### Programmatic Adapter Resolution

```typescript
import { resolveComponentAdapter, resolveTemplateAdapter } from './adapters';

// Get MUI SearchGrid adapter
const SearchGridAdapter = await resolveComponentAdapter('SearchGridComposite', 'mui');

// Get internal Dashboard adapter
const DashboardAdapter = await resolveTemplateAdapter('DashboardLayout', 'internal');

// Check if adapter exists
const hasAdapter = await hasComponentAdapter('SearchGridComposite', 'mui');
```

### Adding New Adapters

1. **Create MUI Adapter**:
```typescript
// /adapters/mui/composites/NewCompositeAdapter.tsx
export const NewCompositeAdapter = (props: NewCompositeProps) => {
  // MUI implementation
  return <MuiComponent {...props} />;
};
```

2. **Create Internal Adapter**:
```typescript
// /adapters/internal/composites/NewCompositeAdapter.tsx
export const NewCompositeAdapter = (props: NewCompositeProps) => {
  // Fallback to MUI or custom implementation
  return <MUINewCompositeAdapter {...props} />;
};
```

3. **Export from index**:
```typescript
// /adapters/mui/composites/index.ts
export { NewCompositeAdapter } from './NewCompositeAdapter';

// /adapters/internal/composites/index.ts
export { NewCompositeAdapter } from './NewCompositeAdapter';
```

4. **Update Resolver**:
```typescript
// /adapters/resolver.ts
componentAdaptersCache = {
  mui: {
    // ... existing
    NewComposite: muiComposites.NewCompositeAdapter,
  },
  internal: {
    // ... existing
    NewComposite: internalComposites.NewCompositeAdapter,
  },
};
```

5. **Register in ComponentRegistry**:
```typescript
// /registry/ComponentRegistry.ts
export const ComponentRegistry = {
  // ... existing
  NewComposite,
};
```

## Benefits

✅ **Provider Isolation**: No provider-specific imports leak outside adapter layer  
✅ **Runtime Switching**: Change provider without recompiling  
✅ **Lazy Loading**: Adapters loaded on demand, reducing bundle size  
✅ **Type Safety**: Full TypeScript support with shared prop interfaces  
✅ **Graceful Degradation**: Falls back to default provider if adapter not found  
✅ **Testability**: Easy to mock adapters in tests  
✅ **Extensibility**: Add new providers without modifying core logic

## Error Handling

### Adapter Not Found

```typescript
// Returns null, handled by fallback component
const Adapter = await resolveComponentAdapter('UnknownComponent', 'mui');
if (!Adapter) {
  return <ComponentNotFound type="UnknownComponent" />;
}
```

### Provider Not Supported

```typescript
// Falls back to 'mui' provider
const provider = context.provider || 'mui';
```

### Async Loading Errors

```typescript
<React.Suspense fallback={<LoadingSpinner />}>
  <AdapterWrapper {...props} />
</React.Suspense>
```

## Performance

- **Lazy Loading**: Adapters loaded only when needed
- **Caching**: Adapter maps cached after first load
- **Code Splitting**: Each provider's adapters in separate chunks
- **Tree Shaking**: Unused adapters eliminated from bundle

## Testing

```typescript
import { resolveComponentAdapter, clearAdapterCache } from './adapters';

describe('Adapter Resolution', () => {
  afterEach(() => {
    clearAdapterCache();
  });

  it('resolves MUI adapter', async () => {
    const adapter = await resolveComponentAdapter('SearchGridComposite', 'mui');
    expect(adapter).toBeDefined();
  });

  it('returns null for unknown adapter', async () => {
    const adapter = await resolveComponentAdapter('UnknownComponent', 'mui');
    expect(adapter).toBeNull();
  });
});
```

## Migration Guide

### From Direct Imports

**Before**:
```typescript
import { SearchGridComposite } from './composites/SearchGrid';
<SearchGridComposite {...props} />
```

**After**:
```typescript
// Use JSON configuration
{
  "type": "SearchGridComposite",
  "props": { ... }
}

// Or programmatic
const Adapter = await resolveComponentAdapter('SearchGridComposite', 'mui');
<Adapter {...props} />
```

### From Registry-Only

**Before**:
```typescript
const Component = getComponent('SearchGridComposite');
<Component {...props} />
```

**After**:
```typescript
// Renderer handles adapter resolution automatically
renderNode(jsonNode, context, options);
```

## Future Enhancements

- [ ] Support for more providers (Radix, Chakra, Ant Design)
- [ ] Hot module replacement for adapter updates
- [ ] Adapter versioning and compatibility checks
- [ ] Performance monitoring and analytics
- [ ] Visual adapter testing with Storybook
- [ ] Adapter documentation generator
