# Phase 8: Versioning, Safety & Governance

**Status**: ✅ Complete  
**Date**: January 25, 2026

## Overview

Phase 8 implements enterprise-grade governance for the template system, ensuring long-term scalability, safety, and maintainability through versioning, migration support, deprecation handling, template locking, and comprehensive validation.

## 🎯 Goals Achieved

✅ **Semantic versioning** with full semver support (major.minor.patch)  
✅ **Migration system** with hooks and utilities for version upgrades  
✅ **Deprecation warnings** with severity levels and replacement guidance  
✅ **Template locking** to prevent modification of published templates  
✅ **JSON validation** with 9 built-in linting rules  
✅ **Lifecycle management** (draft → preview → published → deprecated → archived)  
✅ **Governance utilities** for health checks and workflow automation

## 📦 What Was Built

### 1. Versioning System (`versioning.ts`)

**Semantic Version Management**:
```typescript
interface SemanticVersion {
  major: number;
  minor: number;
  patch: number;
  prerelease?: string;
  build?: string;
}

// Parse and compare versions
const v1 = parseVersion('1.2.3');
const v2 = parseVersion('2.0.0');
compareVersions(v1, v2); // 'less'

// Version bumping
bumpVersion(v1, 'major'); // { major: 2, minor: 0, patch: 0 }

// Range checking
satisfiesVersion(v1, '^1.0.0'); // true
```

**Features**:
- Full semver parsing with prerelease/build metadata
- Version comparison (greater/equal/less)
- Range satisfaction (^, ~, >=, >, <=, <, =)
- Version bumping (major, minor, patch)
- Breaking change detection
- Stability checking

### 2. Migration System (`migration.ts`)

**Version Migration with Hooks**:
```typescript
// Register migration
migrationRegistry.register('my-template', {
  id: 'v1-to-v2-colors',
  from: '1.0.0',
  to: '2.0.0',
  description: 'Migrate color scheme',
  breaking: true,
  migrate: (data, context) => {
    MigrationUtils.renameProperty(data, 'theme.colors', 'theme.tokens');
    return data;
  },
});

// Run migration
const result = await migrationRegistry.migrate(
  'my-template',
  oldData,
  '1.0.0',
  '2.0.0'
);
```

**Migration Utilities**:
- `renameProperty()` - Rename nested properties
- `moveProperty()` - Move properties to new location
- `transformProperty()` - Transform values
- `removeProperty()` - Delete properties
- `addProperty()` - Add with defaults
- `mergeObjects()` - Merge configurations

**Features**:
- Migration chaining (automatically applies multiple migrations)
- Dry-run mode for testing
- Context tracking with warnings/errors
- Breaking change detection
- Migration path validation

### 3. Deprecation System (`deprecation.ts`)

**Deprecation Tracking & Warnings**:
```typescript
// Create deprecation notice
const deprecation = createDeprecation(
  'theme.palette.primary',
  '2.0.0',  // Deprecated since
  '3.0.0',  // Will be removed in
  'Use design tokens instead',
  {
    replacement: 'theme.tokens.colors.primary',
    severity: 'warning',
  }
);

// Register deprecation
deprecationRegistry.register('my-template', deprecation);

// Check for deprecations
const found = deprecationRegistry.check('my-template', '2.5.0', data);
```

**Features**:
- Automatic deprecation detection
- Severity levels (warning/error)
- Replacement guidance
- Console warnings with formatted messages
- Once-only warnings to prevent spam
- Function deprecation decorator

### 4. Template Locking (`locking.ts`)

**Lifecycle & Immutability Management**:
```typescript
// Template lifecycle states
type TemplateStatus = 
  | 'draft'       // In development
  | 'preview'     // Testing
  | 'published'   // Production
  | 'deprecated'  // Discouraged
  | 'archived';   // No longer available

// Lock template
templateGovernance.lock('my-template');

// Transition status
templateGovernance.transition('my-template', 'published');

// Check if can modify
templateGovernance.canModify('my-template'); // false if locked/published

// Publish (auto-locks)
publishTemplate('my-template', 'author@example.com');
```

**Features**:
- State machine for template lifecycle
- Auto-locking on publish
- Status transition history
- Modification guards
- Force unlock capability
- Audit trail with timestamps and authors

### 5. Validation & Linting (`validation.ts`)

**9 Built-in Validation Rules**:

1. **required-fields** (error) - Ensures id, name, version present
2. **valid-version** (error) - Validates semver format
3. **naming-convention** (warning) - Enforces kebab-case IDs
4. **no-empty-strings** (warning) - Prevents empty values
5. **changelog-required** (warning) - Published templates need changelog
6. **breaking-changes-documented** (error) - Major versions need breaking change docs
7. **author-info** (info) - Suggests adding author
8. **license-specified** (info) - Suggests adding license
9. **tags-present** (info) - Suggests adding tags for discoverability

**Usage**:
```typescript
const result = templateValidator.validate(template, {
  templateId: 'my-template',
  version: '1.0.0',
});

if (!result.valid) {
  console.log(formatValidationResult(result));
  // ❌ Validation failed
  // 
  // Errors:
  //   ❌ [version.breakingChanges] Major version requires breaking changes documentation
  //      💡 Document breaking changes for major version updates
}
```

**Features**:
- Extensible rule system
- Severity levels (error/warning/info)
- Nested object validation
- Helpful suggestions
- JSON schema definition
- Formatted output

### 6. Governance Utilities (`index.ts`)

**High-level Governance APIs**:

```typescript
// Create versioned template
const template = GovernanceUtils.createTemplate(
  'marketing-hero',
  'Marketing Hero Section',
  '0.1.0'
);

// Prepare for publish
const result = GovernanceUtils.prepareForPublish(template, {
  author: 'design-team@example.com',
  changelog: ['Initial release', 'Responsive design'],
  breakingChanges: ['Removed old grid system'],
});

// Check template health
const health = GovernanceUtils.checkHealth(template);
console.log(`Healthy: ${health.healthy}`);
console.log(`Issues: ${health.issues.length}`);
console.log(`Warnings: ${health.warnings.length}`);
```

## 🏗️ Architecture

```
src/core/governance/
├── index.ts            # Main exports & utilities
├── versioning.ts       # Semver parsing, comparison, bumping
├── migration.ts        # Migration registry & utilities
├── deprecation.ts      # Deprecation tracking & warnings
├── locking.ts          # Lifecycle & immutability
├── validation.ts       # JSON schema & linting rules
└── examples.ts         # Usage examples
```

**Global Registries**:
- `migrationRegistry` - Template migrations
- `deprecationRegistry` - Deprecation notices
- `templateGovernance` - Lifecycle management
- `templateValidator` - Validation rules

## 📚 Usage Examples

### Example 1: Version a Template

```typescript
import { parseVersion, bumpVersion, versionToString } from '@/core/governance';

const current = parseVersion('1.2.3');
const next = bumpVersion(current, 'minor');
console.log(versionToString(next)); // "1.3.0"
```

### Example 2: Add Migration

```typescript
import { migrationRegistry, MigrationUtils } from '@/core/governance';

migrationRegistry.register('hero-section', {
  id: 'v2-color-tokens',
  from: '1.0.0',
  to: '2.0.0',
  breaking: true,
  migrate: (data) => {
    MigrationUtils.renameProperty(data, 'colors.primary', 'tokens.primary');
    return data;
  },
});
```

### Example 3: Deprecate Property

```typescript
import { deprecationRegistry, createDeprecation } from '@/core/governance';

deprecationRegistry.register('hero-section', createDeprecation(
  'layout.grid',
  '2.0.0',
  '3.0.0',
  'Grid layout is deprecated',
  { replacement: 'layout.flex' }
));
```

### Example 4: Publish Template

```typescript
import { publishTemplate, GovernanceUtils } from '@/core/governance';

// Validate before publish
const health = GovernanceUtils.checkHealth(template);
if (!health.healthy) {
  console.error('Template not ready:', health.issues);
  return;
}

// Publish and lock
const result = publishTemplate('hero-section', 'john@example.com');
console.log(result.locked); // true
```

### Example 5: Validate Template

```typescript
import { templateValidator, formatValidationResult } from '@/core/governance';

const result = templateValidator.validate(template, {
  templateId: 'hero-section',
  version: '1.0.0',
});

console.log(formatValidationResult(result));
```

## 🔧 Integration Points

### With Template System

Templates now include versioning metadata:

```typescript
interface VersionedTemplate {
  id: string;
  name: string;
  version: TemplateVersion;
  status: TemplateStatus;
  locked: boolean;
  // ... other fields
}
```

### With Theme Presets

Theme presets can specify version requirements:

```typescript
interface ThemePreset {
  minLibraryVersion?: string;  // "^2.0.0"
  maxLibraryVersion?: string;  // "<3.0.0"
  // ...
}
```

### With Tenant Customization

Tenant overrides are validated before application:

```typescript
// Before applying override
const validation = templateValidator.validate(override, context);
if (!validation.valid) {
  throw new Error('Invalid override configuration');
}
```

## 🎨 Workflow: Publishing a Template

```typescript
import {
  GovernanceUtils,
  templateValidator,
  publishTemplate,
  bumpVersion,
} from '@/core/governance';

// 1. Create template
const template = GovernanceUtils.createTemplate(
  'product-grid',
  'Product Grid Section',
  '0.1.0'
);

// 2. Develop and iterate...
// (template remains in draft status)

// 3. Prepare for release
template.version.version = bumpVersion(template.version.version, 'minor');
template.version.versionString = '0.2.0';
template.version.changelog = [
  'Added responsive breakpoints',
  'Improved accessibility',
];

// 4. Validate
const validation = templateValidator.validate(template, {
  templateId: template.id,
  version: template.version.versionString,
});

if (!validation.valid) {
  console.error('Validation failed:', validation.errors);
  return;
}

// 5. Publish
const result = publishTemplate(template.id, 'design-team@example.com');
if (result.success) {
  console.log('✅ Template published and locked');
}

// 6. Template is now immutable
// Any modification attempts will throw error
```

## 🧪 Testing

See [examples.ts](./examples.ts) for comprehensive usage examples:

- `example1_CreateVersionedTemplate()` - Template creation
- `example2_RegisterMigration()` - Migration setup
- `example3_DeprecateProperty()` - Deprecation notices
- `example4_PublishTemplate()` - Publishing workflow
- `example5_ValidateTemplate()` - Validation
- `example6_CompleteWorkflow()` - Full lifecycle
- `example7_VersionComparison()` - Version utilities

Run examples:
```typescript
import { example6_CompleteWorkflow } from '@/core/governance/examples';
await example6_CompleteWorkflow();
```

## 🚀 Benefits

### For Template Authors

- **Clear versioning** - Semantic versioning for all templates
- **Safe upgrades** - Automated migrations handle breaking changes
- **Early warnings** - Deprecation notices guide users to new patterns
- **Quality gates** - Validation prevents publishing broken templates
- **Immutability** - Published templates can't be accidentally changed

### For Template Users

- **Reliable updates** - Migrations ensure smooth version transitions
- **Clear communication** - Changelog and deprecation notices
- **Stability** - Locked templates guarantee consistency
- **Compatibility** - Version range checking prevents incompatibilities

### For Organizations

- **Governance** - Enterprise-grade lifecycle management
- **Auditability** - Complete history of status transitions
- **Safety** - Validation and locking prevent errors
- **Scalability** - Designed for large template libraries
- **Compliance** - License and author tracking

## 📊 Key Metrics

- **6 core modules** - Versioning, migration, deprecation, locking, validation, utilities
- **9 validation rules** - Comprehensive quality checks
- **5 lifecycle states** - Draft → Preview → Published → Deprecated → Archived
- **8 migration utilities** - Common transformation operations
- **10+ version operations** - Parse, compare, bump, check ranges

## 🔮 Future Enhancements

1. **Version History Storage** - Persist all versions with rollback capability
2. **Automated Changelog Generation** - Generate from commit messages
3. **Visual Diff Tool** - Show changes between versions
4. **Migration Testing** - Automated migration validation
5. **Deprecation Dashboard** - Track all deprecations across templates
6. **Compliance Reports** - License, author, validation summaries
7. **API Versioning** - Extend governance to API endpoints
8. **Template Analytics** - Usage metrics per version

## 📝 Notes

- All published templates are automatically locked (immutable)
- Major version bumps require breaking changes documentation
- Deprecations should be added at least one minor version before removal
- Migrations are chainable and run sequentially
- Validation is extensible - add custom rules via `templateValidator.addRule()`

## 🎓 Best Practices

1. **Always validate before publish** - Use `GovernanceUtils.checkHealth()`
2. **Document breaking changes** - Required for major versions
3. **Provide migration paths** - Register migrations for breaking changes
4. **Use deprecation warnings** - Give users time to adapt
5. **Follow semver strictly** - Breaking = major, features = minor, fixes = patch
6. **Lock published templates** - Prevent accidental modifications
7. **Add metadata** - Author, license, tags improve discoverability

---

**Phase 8 Complete** ✅  
Enterprise-grade governance system ready for production use.

**Next Steps**:
- Integrate with existing template registry
- Add validation to template creation UI
- Create governance dashboard
- Set up automated validation in CI/CD

