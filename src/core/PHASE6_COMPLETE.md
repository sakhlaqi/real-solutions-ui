# 🧩 Phase 6 Complete – Tenant Customization Model

**Status:** ✅ COMPLETE  
**Build:** Successful (14.46s, 0 errors)  
**Date:** January 2025

## Overview

Phase 6 delivers a **fork-free tenant customization model** that allows tenants to customize templates without modifying base code. Using JSON-based overrides with dot notation paths, tenants can rebrand and customize content while maintaining upgrade compatibility.

## Key Features

✅ **JSON Override System** – Deep path notation for precise customization  
✅ **Runtime Application** – Apply overrides at render time, no code changes  
✅ **Schema Validation** – Validate overrides against template schemas  
✅ **Type-Safe** – Full TypeScript support with validation  
✅ **Upgrade-Safe** – Overrides merge with template updates  
✅ **Flexible** – Works with any JSON-serializable data structure

## Architecture

### Tenant System Structure

```
/core/tenant/
├── types.ts              # Type system (TenantCustomization, OverrideMap, ValidationResult)
├── parser.ts             # Path parser (dot notation, wildcards)
├── applicator.ts         # Override application logic
├── validator.ts          # Schema validation system
├── index.ts              # Main export point
└── examples/
    ├── index.ts          # 6 example tenant configs
    └── usage.tsx         # 8 usage examples
```

## Usage Examples

### 1. Basic Override Application

```typescript
import { applyTenantCustomization } from '@real-solutions/ui/core/tenant';

const tenantConfig = {
  tenantId: 'acme-corp',
  tenantName: 'Acme Corporation',
  baseTemplate: 'marketing-page',
  overrides: {
    'theme.colors.primary': '#ff5722',
    'theme.colors.secondary': '#ff9800',
    'pages.home.sections.hero.props.title': 'Welcome to Acme Corporation',
    'pages.home.sections.hero.props.subtitle': 'Building the future of enterprise software',
  },
};

// Apply customization to template
const result = applyTenantCustomization(marketingPageTemplate, tenantConfig);

console.log(result.customized.pages.home.sections.hero.props.title);
// Output: "Welcome to Acme Corporation"

console.log(result.appliedPaths);
// Output: ['theme.colors.primary', 'theme.colors.secondary', ...]

console.log(result.tenant);
// Output: { id: 'acme-corp', name: 'Acme Corporation' }
```

### 2. With Validation

```typescript
import { 
  applyTenantCustomization, 
  validateOverrides, 
  createTemplateSchema 
} from '@real-solutions/ui/core/tenant';

const schema = createTemplateSchema();

// Validate before applying
const validation = validateOverrides(tenantConfig.overrides, schema);

if (!validation.valid) {
  console.error('Validation errors:', validation.errors);
  // Handle invalid overrides
}

// Apply with automatic validation
const result = applyTenantCustomization(
  marketingPageTemplate,
  tenantConfig,
  {
    validate: true,
    schema,
    strict: false, // Warn instead of throw
  }
);
```

### 3. Simple Override Map

```typescript
import { applyOverrides } from '@real-solutions/ui/core/tenant';

// Quick overrides without full TenantCustomization object
const overrides = {
  'theme.colors.primary': '#9c27b0',
  'pages.home.sections.hero.props.title': 'Custom Title',
};

const customized = applyOverrides(marketingPageTemplate, overrides);
```

### 4. Runtime Loading from API

```typescript
async function loadTenantTemplate(tenantId: string) {
  // Fetch tenant config from API
  const response = await fetch(`/api/tenants/${tenantId}/customization`);
  const tenantConfig = await response.json();

  // Apply customization
  const result = applyTenantCustomization(
    baseTemplate,
    tenantConfig,
    {
      validate: true,
      schema: createTemplateSchema(),
      strict: false,
    }
  );

  return result.customized;
}
```

### 5. Theme Integration

```typescript
import { createTheme } from '@mui/material/styles';
import { themePresetRegistry, presetToMuiTheme } from '@real-solutions/ui/core/theme';
import { applyOverrides } from '@real-solutions/ui/core/tenant';

// Get base theme preset
const basePreset = themePresetRegistry.get('marketing-page-mui');

// Apply tenant overrides
const customizedPreset = applyOverrides(basePreset, {
  'colors.primary': '#ff5722',
  'colors.secondary': '#ff9800',
  'typography.fontFamily': 'Inter, sans-serif',
});

// Convert to MUI theme
const muiTheme = createTheme(presetToMuiTheme(customizedPreset));
```

### 6. React Context Pattern

```typescript
import React from 'react';
import { applyTenantCustomization, type TenantCustomization } from '@real-solutions/ui/core/tenant';

interface TenantContextType {
  customization?: TenantCustomization;
  applyCustomization: <T>(data: T) => T;
}

const TenantContext = React.createContext<TenantContextType>({
  applyCustomization: (data) => data,
});

function TenantProvider({ children, customization }) {
  const applyCustomization = (data) => {
    return applyTenantCustomization(data, customization).customized;
  };

  return (
    <TenantContext.Provider value={{ customization, applyCustomization }}>
      {children}
    </TenantContext.Provider>
  );
}

function useTenant() {
  return React.useContext(TenantContext);
}

// Usage
function MyComponent() {
  const { applyCustomization } = useTenant();
  const template = applyCustomization(baseTemplate);
  
  return <div>{template.pages.home.sections.hero.props.title}</div>;
}
```

## Override Path Notation

### Basic Paths

```typescript
{
  // Simple property
  'theme.colors.primary': '#ff5722',
  
  // Nested property
  'pages.home.sections.hero.props.title': 'Welcome',
  
  // Array notation (both formats supported)
  'pages.home.sections[0].props.title': 'First Section',
  'pages.home.sections.0.props.title': 'First Section',
}
```

### Wildcard Patterns (Schema Only)

```typescript
{
  allowedPaths: {
    'theme.*': { type: 'any' },              // Any theme property
    'theme.colors.*': { type: 'string' },    // Any color
    'pages.*.title': { type: 'string' },     // Title on any page
    'pages.**': { type: 'any' },             // Any nested page property
  }
}
```

## Example Tenant Configurations

### 1. Acme Corp - Full Branding

```typescript
{
  tenantId: 'acme-corp',
  tenantName: 'Acme Corporation',
  baseTemplate: 'marketing-page',
  overrides: {
    'theme.colors.primary': '#ff5722',
    'theme.colors.secondary': '#ff9800',
    'theme.typography.fontFamily': 'Inter, sans-serif',
    'metadata.title': 'Acme Corp - Enterprise Solutions',
    'pages.home.sections.hero.props.title': 'Welcome to Acme Corporation',
    'pages.home.sections.hero.props.subtitle': 'Building the future of enterprise software',
    'pages.home.sections.hero.props.buttonText': 'Get Started with Acme',
  }
}
```

### 2. TechStart - Startup Theme

```typescript
{
  tenantId: 'techstart',
  tenantName: 'TechStart Inc',
  baseTemplate: 'landing-page',
  overrides: {
    'theme.colors.primary': '#9c27b0',
    'theme.colors.secondary': '#00bcd4',
    'theme.typography.fontFamily': 'Montserrat, sans-serif',
    'theme.radius.md': 12,
    'theme.radius.lg': 20,
    'pages.home.sections.hero.props.title': 'The Future of Team Collaboration',
    'pages.home.sections.hero.props.buttonText': 'Start Free Trial',
  }
}
```

### 3. GreenLeaf - Environmental Blog

```typescript
{
  tenantId: 'greenleaf',
  tenantName: 'GreenLeaf Environmental',
  baseTemplate: 'blog',
  overrides: {
    'theme.colors.primary': '#2e7d32',
    'theme.colors.secondary': '#8bc34a',
    'theme.colors.background': '#f1f8e9',
    'theme.typography.fontFamily': 'Merriweather, serif',
    'theme.typography.fontSize': 18,
    'pages.home.sections.header.props.title': 'The GreenLeaf Chronicle',
  }
}
```

### 4. Minimal Override - Colors Only

```typescript
{
  tenantId: 'minimal-brand',
  tenantName: 'Minimal Brand',
  baseTemplate: 'marketing-page',
  overrides: {
    'theme.colors.primary': '#e91e63',
    'theme.colors.secondary': '#673ab7',
  }
}
```

## Schema Validation

### Template Schema

```typescript
import { createTemplateSchema } from '@real-solutions/ui/core/tenant';

const schema = createTemplateSchema();
// Returns schema with:
// - theme.colors.* (hex color validation)
// - theme.typography.* (font settings)
// - theme.spacing.* (spacing values)
// - metadata.* (template metadata)
// - pages.*.sections.*.props.* (content properties)
```

### Custom Schema

```typescript
const customSchema = {
  allowedPaths: {
    // Color validation with pattern
    'theme.colors.primary': {
      type: 'string',
      pattern: /^#[0-9a-f]{6}$/i,
      description: 'Primary brand color',
    },
    
    // Number with range
    'theme.spacing.md': {
      type: 'number',
      min: 8,
      max: 32,
      description: 'Medium spacing value',
    },
    
    // Required string
    'metadata.title': {
      type: 'string',
      required: true,
      description: 'Template title',
    },
    
    // Enum values
    'theme.mode': {
      type: 'string',
      enum: ['light', 'dark'],
      description: 'Theme mode',
    },
    
    // Wildcard pattern
    'pages.**.title': {
      type: 'string',
      description: 'Any page title',
    },
  },
  allowUnknownPaths: false, // Strict mode
};
```

### Validation Result

```typescript
interface ValidationResult {
  valid: boolean;
  errors: Array<{
    path: string;
    message: string;
    expectedType?: string;
    receivedType?: string;
    value?: any;
  }>;
  warnings?: Array<{
    path: string;
    message: string;
    suggestion?: string;
  }>;
}
```

## Parser Utilities

### Path Manipulation

```typescript
import {
  parseOverridePath,
  getValueAtPath,
  setValueAtPath,
  pathExists,
  deleteValueAtPath,
  getAllPaths,
  matchPath,
} from '@real-solutions/ui/core/tenant';

// Parse path
parseOverridePath('theme.colors.primary');
// ['theme', 'colors', 'primary']

// Get value
getValueAtPath(obj, 'theme.colors.primary');
// '#1976d2'

// Set value (mutates)
setValueAtPath(obj, 'theme.colors.primary', '#ff5722');

// Check existence
pathExists(obj, 'theme.colors.primary');
// true

// Delete (mutates)
deleteValueAtPath(obj, 'theme.colors.primary');

// Get all paths
getAllPaths(obj);
// ['theme.colors.primary', 'theme.colors.secondary', ...]

// Pattern matching
matchPath('theme.colors.primary', 'theme.*.*'); // true
matchPath('theme.colors.primary', 'theme.**');  // true
matchPath('theme.colors.primary', 'pages.**');  // false
```

## Advanced Features

### Extract Overrides

```typescript
import { extractOverrides } from '@real-solutions/ui/core/tenant';

const original = {
  theme: { colors: { primary: '#1976d2' } },
  metadata: { title: 'Original' },
};

const customized = {
  theme: { colors: { primary: '#ff5722' } },
  metadata: { title: 'Customized' },
};

const overrides = extractOverrides(original, customized);
// {
//   'theme.colors.primary': '#ff5722',
//   'metadata.title': 'Customized'
// }
```

### Merge Overrides

```typescript
import { mergeOverrides } from '@real-solutions/ui/core/tenant';

const base = { 'theme.colors.primary': '#1976d2' };
const tenant1 = { 'theme.colors.secondary': '#757575' };
const tenant2 = { 'metadata.title': 'Custom' };

const merged = mergeOverrides(base, tenant1, tenant2);
// {
//   'theme.colors.primary': '#1976d2',
//   'theme.colors.secondary': '#757575',
//   'metadata.title': 'Custom'
// }
```

### Filter Overrides

```typescript
import { filterOverridesByPattern } from '@real-solutions/ui/core/tenant';

const overrides = {
  'theme.colors.primary': '#ff5722',
  'theme.spacing.md': 16,
  'pages.home.title': 'Home',
};

const themeOverrides = filterOverridesByPattern(overrides, 'theme');
// {
//   'theme.colors.primary': '#ff5722',
//   'theme.spacing.md': 16
// }
```

## Type System

### TenantCustomization

```typescript
interface TenantCustomization {
  tenantId: string;
  tenantName: string;
  baseTemplate: string;
  overrides: OverrideMap;
  metadata?: {
    createdAt?: string;
    updatedAt?: string;
    version?: string;
    description?: string;
  };
}
```

### OverrideMap

```typescript
interface OverrideMap {
  [path: string]: OverrideValue;
}

type OverrideValue = 
  | string 
  | number 
  | boolean 
  | null 
  | OverrideValue[] 
  | { [key: string]: OverrideValue };
```

### AppliedCustomization

```typescript
interface AppliedCustomization<T> {
  original: T;
  customized: T;
  appliedPaths: string[];
  tenant: {
    id: string;
    name: string;
  };
}
```

## Integration Examples

### With Template System

```typescript
import { getTemplate } from '@real-solutions/ui/core/templates';
import { applyTenantCustomization } from '@real-solutions/ui/core/tenant';

const template = getTemplate('marketing-page');
const customized = applyTenantCustomization(template, tenantConfig);
```

### With Theme Presets

```typescript
import { themePresetRegistry } from '@real-solutions/ui/core/theme';
import { applyOverrides } from '@real-solutions/ui/core/tenant';

const preset = themePresetRegistry.get('marketing-page-mui');
const customizedTheme = applyOverrides(preset, tenantConfig.overrides);
```

### With Provider Context

```typescript
<TenantProvider customization={tenantConfig}>
  <App />
</TenantProvider>

// Inside components
function MyComponent() {
  const { applyCustomization } = useTenant();
  const data = applyCustomization(baseData);
  return <div>{data.title}</div>;
}
```

## Upgrade Safety

### How Overrides Stay Safe

1. **Shallow Overrides**: Only override specific paths, don't replace entire objects
2. **Deep Merge**: Base template updates merge with overrides
3. **Path-Based**: Changes to base template don't affect override paths
4. **Validation**: Schema validation catches breaking changes

### Example

```typescript
// Tenant override
{ 'theme.colors.primary': '#ff5722' }

// Base template v1
{ theme: { colors: { primary: '#1976d2', secondary: '#757575' } } }

// Base template v2 (adds new color)
{ theme: { colors: { primary: '#1976d2', secondary: '#757575', tertiary: '#00bcd4' } } }

// Result with override
{ theme: { colors: { primary: '#ff5722', secondary: '#757575', tertiary: '#00bcd4' } } }
//                     ↑ Override        ↑ Original       ↑ New (from update)
```

## Best Practices

### 1. Use Specific Paths

```typescript
// ✅ Good - specific
'pages.home.sections.hero.props.title': 'Custom Title'

// ❌ Bad - too broad
'pages': { home: { sections: { hero: { props: { title: 'Custom Title' } } } } }
```

### 2. Validate Before Deployment

```typescript
const validation = validateOverrides(overrides, schema);
if (!validation.valid) {
  console.error('Fix these issues:', validation.errors);
  throw new Error('Invalid tenant customization');
}
```

### 3. Use Metadata

```typescript
{
  tenantId: 'acme',
  tenantName: 'Acme Corp',
  baseTemplate: 'marketing-page',
  overrides: { /* ... */ },
  metadata: {
    createdAt: '2026-01-25T00:00:00Z',
    version: '1.0.0',
    description: 'Q1 2026 branding update',
  }
}
```

### 4. Test with Strict Mode

```typescript
// Development: strict mode to catch errors
applyTenantCustomization(template, config, { strict: true });

// Production: lenient mode to avoid crashes
applyTenantCustomization(template, config, { strict: false });
```

## Testing

```bash
# Type check
npm run type-check  ✅ 0 errors

# Build
npm run build      ✅ 14.46s (0 errors)
```

## Architecture Benefits

✅ **No Code Forks** – Tenants customize via JSON, not code  
✅ **Runtime Flexibility** – Load configs from DB/API  
✅ **Type Safety** – Full TypeScript validation  
✅ **Schema Validation** – Prevent invalid customizations  
✅ **Upgrade Safe** – Overrides survive template updates  
✅ **Developer Friendly** – Simple dot notation syntax  
✅ **Scalable** – Works with any JSON structure

## Files Created

- `core/tenant/types.ts` (150 lines) - Type system
- `core/tenant/parser.ts` (180 lines) - Path parser utilities
- `core/tenant/applicator.ts` (160 lines) - Override application
- `core/tenant/validator.ts` (230 lines) - Schema validation
- `core/tenant/index.ts` (30 lines) - Main export
- `core/tenant/examples/index.ts` (200 lines) - 6 example configs
- `core/tenant/examples/usage.tsx` (280 lines) - 8 usage examples

**Total:** ~1,230 lines of production code + examples

## Summary

Phase 6 delivers a **production-ready tenant customization system** with:

✅ **JSON Override System** – Dot notation paths for precise control  
✅ **Runtime Application** – Apply at render time, no code changes  
✅ **Schema Validation** – Type-safe with validation errors  
✅ **6 Example Configs** – Real-world tenant customizations  
✅ **8 Usage Patterns** – React context, API loading, strict mode  
✅ **Upgrade Safe** – Deep merge preserves tenant changes  
✅ **Build Verified** – 0 TypeScript errors

Tenants can now **fully customize templates** (branding, content, theme) through simple JSON configurations, maintaining **zero code forks** and **full upgrade compatibility**.
