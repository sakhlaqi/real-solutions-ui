# Provider-Adapter Quick Reference

## API Reference

### Resolver Functions

```typescript
import {
  resolveComponentAdapter,
  resolveTemplateAdapter,
  hasComponentAdapter,
  hasTemplateAdapter,
  getComponentAdapterTypes,
  getTemplateAdapterTypes,
  clearAdapterCache,
  type UIProvider
} from './adapters';
```

#### `resolveComponentAdapter(type, provider)`
Resolves a component adapter for the given type and provider.

**Parameters**:
- `type: string` - Component type (e.g., 'SearchGridComposite')
- `provider: UIProvider` - UI provider ('mui' | 'internal')

**Returns**: `Promise<React.ComponentType<any> | null>`

**Example**:
```typescript
const Adapter = await resolveComponentAdapter('SearchGridComposite', 'mui');
```

#### `resolveTemplateAdapter(type, provider)`
Resolves a template adapter for the given type and provider.

**Parameters**:
- `type: string` - Template type (e.g., 'DashboardLayout')
- `provider: UIProvider` - UI provider ('mui' | 'internal')

**Returns**: `Promise<React.ComponentType<any> | null>`

**Example**:
```typescript
const Adapter = await resolveTemplateAdapter('DashboardLayout', 'mui');
```

#### `hasComponentAdapter(type, provider)`
Checks if a component adapter exists.

**Returns**: `Promise<boolean>`

#### `hasTemplateAdapter(type, provider)`
Checks if a template adapter exists.

**Returns**: `Promise<boolean>`

#### `getComponentAdapterTypes(provider)`
Gets all available component adapter types for a provider.

**Returns**: `Promise<string[]>`

#### `getTemplateAdapterTypes(provider)`
Gets all available template adapter types for a provider.

**Returns**: `Promise<string[]>`

#### `clearAdapterCache()`
Clears the adapter cache. Useful for testing or HMR.

---

## Available Adapters

### Composite Adapters

| Component | MUI Implementation | Internal Implementation |
|-----------|-------------------|------------------------|
| `SearchGridComposite` | MUI X DataGrid | Fallback to MUI |
| `HeaderComposite` | AppBar + Toolbar | Fallback to MUI |
| `SidebarComposite` | Drawer + List | Fallback to MUI |

### Template Adapters

| Template | MUI Implementation | Internal Implementation |
|----------|-------------------|------------------------|
| `DashboardLayout` | Box flex layout | Fallback to MUI |
| `TwoColumnLayout` | Box grid layout | Fallback to MUI |
| `TabsLayout` | Tabs + Tab | Fallback to MUI |

---

## Renderer API

### PageRenderer

```typescript
import { PageRenderer } from './renderer';

<PageRenderer
  config={pageConfig}
  options={{
    provider: 'mui',      // 'mui' | 'internal'
    maxDepth: 50,         // Max component tree depth
    debug: true,          // Enable debug logs
    onError: (err) => {}, // Error handler
    data: {}              // Data context
  }}
  loading={<Spinner />}
  errorComponent={ErrorPage}
  onRenderComplete={(result) => {}}
/>
```

### renderNode

```typescript
import { renderNode } from './renderer';

const element = renderNode(
  jsonNode,
  {
    depth: 0,
    provider: 'mui',
    maxDepth: 50,
    data: {}
  },
  {
    debug: true,
    onError: (err) => {}
  }
);
```

### renderPage / renderPageSync

```typescript
import { renderPage, renderPageSync } from './renderer';

// Async
const element = await renderPage(pageConfig, {
  provider: 'mui',
  debug: true
});

// Sync (for SSR)
const element = renderPageSync(pageConfig, {
  provider: 'mui'
});
```

---

## JSON Schema

### Page Configuration

```typescript
interface PageConfig {
  version: string;           // Schema version (e.g., '1.0.0')
  template: string;          // Template type
  slots: Record<string, JsonNode | JsonNode[]>;
  metadata?: {
    title?: string;
    description?: string;
  };
}
```

### JSON Node

```typescript
interface JsonNode {
  type: string;              // Component type
  props?: Record<string, any>;
  children?: JsonNode[];
  slots?: Record<string, JsonNode | JsonNode[]>;
  on?: Record<string, string | { behavior: string; params?: any[] }>;
  key?: string | number;
}
```

### Example

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
        ],
        "actions": [
          {
            "id": "add",
            "label": "Add Item",
            "variant": "primary"
          }
        ]
      }
    },
    "sidebar": {
      "type": "SidebarComposite",
      "props": {
        "items": [
          {
            "id": "overview",
            "label": "Overview",
            "path": "/",
            "active": true
          }
        ]
      }
    },
    "main": {
      "type": "SearchGridComposite",
      "props": {
        "dataSource": "employees",
        "columns": [
          {
            "id": "name",
            "label": "Name",
            "field": "name",
            "sortable": true
          },
          {
            "id": "email",
            "label": "Email",
            "field": "email"
          }
        ],
        "data": [],
        "searchEnabled": true,
        "pageSizeOptions": [10, 25, 50]
      }
    }
  }
}
```

---

## Component Props

### SearchGridComposite

```typescript
interface SearchGridCompositeProps<T> {
  dataSource: string;
  columns: ColumnDefinition<T>[];
  data?: T[];
  filters?: FilterDefinition[];
  searchEnabled?: boolean;
  searchPlaceholder?: string;
  rowActions?: ActionDefinition[];
  toolbarActions?: ActionDefinition[];
  selectionMode?: 'none' | 'single' | 'multiple';
  onSelectionChange?: (rows: T[]) => void;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyMessage?: string;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
}
```

### HeaderComposite

```typescript
interface HeaderCompositeProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ActionDefinition[];
  showBackButton?: boolean;
  onBack?: () => void;
  children?: ReactNode;
}
```

### SidebarComposite

```typescript
interface SidebarCompositeProps {
  items: NavigationItem[];
  header?: ReactNode;
  footer?: ReactNode;
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  onNavigate?: (item: NavigationItem) => void;
}
```

### DashboardLayout

```typescript
interface DashboardLayoutProps {
  slots: DashboardLayoutSlots;
  sidebarVisible?: boolean;
  sidebarWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface DashboardLayoutSlots {
  header?: ReactNode;
  sidebar?: ReactNode;
  main: ReactNode;
  footer?: ReactNode;
}
```

### TwoColumnLayout

```typescript
interface TwoColumnLayoutProps {
  slots: TwoColumnLayoutSlots;
  leftWidth?: number;      // Ratio 0-1
  gap?: number;            // Gap in pixels
  className?: string;
  style?: React.CSSProperties;
}

interface TwoColumnLayoutSlots {
  header?: ReactNode;
  left: ReactNode;
  right: ReactNode;
  footer?: ReactNode;
}
```

### TabsLayout

```typescript
interface TabsLayoutProps {
  slots: TabsLayoutSlots;
  activeTab?: string;
  onTabChange?: (key: string) => void;
  tabLabels?: Record<string, string>;
  className?: string;
  style?: React.CSSProperties;
}

interface TabsLayoutSlots {
  header?: ReactNode;
  tabs: Record<string, ReactNode>;
  footer?: ReactNode;
}
```

---

## Common Types

### ColumnDefinition

```typescript
interface ColumnDefinition<T> {
  id: string;
  label: string;
  field: keyof T | string;
  width?: number | string;
  sortable?: boolean;
  render?: (value: any, row: T) => ReactNode;
  align?: 'left' | 'center' | 'right';
}
```

### FilterDefinition

```typescript
interface FilterDefinition {
  id: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'number' | 'boolean';
  field: string;
  options?: Array<{ label: string; value: any }>;
  defaultValue?: any;
}
```

### ActionDefinition

```typescript
interface ActionDefinition {
  id: string;
  label: string;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  onClick?: () => void;
}
```

### NavigationItem

```typescript
interface NavigationItem {
  id: string;
  label: string;
  icon?: ReactNode;
  path?: string;
  active?: boolean;
  disabled?: boolean;
  badge?: string | number;
  children?: NavigationItem[];
  onClick?: () => void;
}
```

### BreadcrumbItem

```typescript
interface BreadcrumbItem {
  label: string;
  path?: string;
  onClick?: () => void;
}
```

---

## Error Handling

### RenderError

```typescript
interface RenderError {
  type: 'COMPONENT_NOT_FOUND' | 'TEMPLATE_NOT_FOUND' | 
        'RENDER_ERROR' | 'MAX_DEPTH_EXCEEDED' | 'INVALID_PROPS';
  message: string;
  key?: string;
  depth?: number;
  originalError?: Error;
  path?: string[];
}
```

### Fallback Components

```typescript
import {
  ComponentNotFound,
  TemplateNotFound,
  RenderErrorBoundary,
  MaxDepthExceeded
} from './renderer';

// Usage
<RenderErrorBoundary
  fallback={CustomErrorComponent}
  onError={(error, errorInfo) => {}}
>
  <YourComponent />
</RenderErrorBoundary>
```

---

## Best Practices

### 1. Provider Selection
```typescript
// Use MUI for production
<PageRenderer config={config} options={{ provider: 'mui' }} />

// Use internal for custom implementations
<PageRenderer config={config} options={{ provider: 'internal' }} />
```

### 2. Error Handling
```typescript
<PageRenderer
  config={config}
  options={{
    onError: (error) => {
      // Log to monitoring service
      console.error('[Renderer]', error);
    }
  }}
  errorComponent={CustomErrorPage}
/>
```

### 3. Performance
```typescript
// Enable code splitting
const Adapter = React.lazy(() => resolveComponentAdapter(type, provider));

// Clear cache when needed (e.g., HMR)
if (import.meta.hot) {
  import.meta.hot.accept(() => clearAdapterCache());
}
```

### 4. Testing
```typescript
import { clearAdapterCache } from './adapters';

afterEach(() => {
  clearAdapterCache();
});

test('renders with MUI adapter', async () => {
  const adapter = await resolveComponentAdapter('SearchGridComposite', 'mui');
  expect(adapter).toBeDefined();
});
```

---

## Troubleshooting

### Adapter Not Found
**Issue**: `Adapter for "X" not found for provider "Y"`

**Solutions**:
1. Check adapter is exported from `/adapters/{provider}/composites|templates/index.ts`
2. Verify adapter is registered in resolver.ts
3. Clear cache: `clearAdapterCache()`

### Max Depth Exceeded
**Issue**: `Maximum render depth exceeded`

**Solutions**:
1. Increase maxDepth: `options={{ maxDepth: 100 }}`
2. Check for circular references in JSON
3. Simplify component tree

### Circular Dependencies
**Issue**: Module import errors

**Solutions**:
1. Use lazy imports in resolver
2. Avoid importing renderer in adapters
3. Use type-only imports: `import type { ... }`

---

## Additional Resources

- [PROVIDER_ADAPTER_INTEGRATION.md](./PROVIDER_ADAPTER_INTEGRATION.md) - Full documentation
- [ADAPTER_IMPLEMENTATION_SUMMARY.md](./ADAPTER_IMPLEMENTATION_SUMMARY.md) - Implementation details
- [JSON Schema Documentation](./src/schema/README.md) - Schema validation
- [Registry Documentation](./src/registry/README.md) - Component registry
