# Theme Architecture

## Single Source of Truth

**Theme presets are now stored in the API/database**, not hardcoded in the UI library. This ensures:

- ✅ No duplication between API and UI
- ✅ Single source of truth for all themes
- ✅ Centralized theme management
- ✅ No manual synchronization needed
- ✅ Dynamic theme loading

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      API/Database                            │
│  • Official theme presets (Default, Dark, Brand Light/Dark) │
│  • Custom tenant themes                                      │
│  • Theme versioning & auditing                               │
│  • Single source of truth ✓                                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTP GET /api/tenants/themes/
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   Presentation App                           │
│  • Fetches themes from API on startup                        │
│  • Registers themes in ThemeRegistry                         │
│  • Uses TenantThemeProvider for theme application            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Theme JSON
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      UI Library                              │
│  • ThemeRegistry (dynamic, populated from API)               │
│  • Fallback theme (minimal, offline support)                 │
│  • Theme types, schemas, utilities                           │
│  • NO hardcoded presets ✗                                    │
└─────────────────────────────────────────────────────────────┘
```

## Usage

### Presentation App

The presentation app already fetches tenant configuration from the API, which includes the selected theme:

```typescript
// themes/TenantThemeProvider.tsx
const { resolvedTheme } = useTenantTheme();
// Theme comes from API via tenant config
```

### UI Library

The UI library provides:

1. **Dynamic Theme Registry** - Populated from API
2. **Fallback Theme** - Minimal theme for offline/error scenarios
3. **Type System** - TypeScript types and Zod schemas
4. **Utilities** - Theme manipulation functions

```typescript
import { ThemeRegistry, fallbackTheme } from '@sakhlaqi/ui/theme';

// Register themes from API
const themesFromAPI = await fetch('/api/tenants/themes/');
ThemeRegistry.registerMany(themesFromAPI);

// Get theme by ID
const theme = ThemeRegistry.getById('default');

// Fallback always available
const fallback = ThemeRegistry.getFallback();
```

## Fallback Theme

A minimal fallback theme is always available for:
- API unavailable/offline scenarios
- Error recovery
- Development without backend

The fallback theme provides basic neutral styling to ensure the application remains functional.

## Migration from Old System

### What Changed

**Before:**
- ✗ Hardcoded presets in `ui/src/theme/presets/`
- ✗ Duplicated between UI and API
- ✗ Manual synchronization required
- ✗ Risk of drift/inconsistency

**After:**
- ✓ Presets only in API/database
- ✓ Single source of truth
- ✓ Dynamic loading from API
- ✓ Fallback theme for offline support

### Removed Files

- `ui/src/theme/presets/default.ts` ❌ (now in API)
- `ui/src/theme/presets/dark.ts` ❌ (now in API)
- `ui/src/theme/presets/brand-light.ts` ❌ (now in API)
- `ui/src/theme/presets/brand-dark.ts` ❌ (now in API)

### New Files

- `ui/src/theme/fallback.ts` ✅ (minimal fallback theme)

### Updated Files

- `ui/src/theme/registry.ts` - Now dynamic, not hardcoded
- `ui/src/theme/presets/index.ts` - Exports only fallback
- `ui/src/theme/index.ts` - Updated exports

## Managing Themes

### API Side (Single Source of Truth)

**Seed/Update Presets:**
```bash
cd api
python manage.py seed_theme_presets --reset
```

**Create Custom Theme:**
- Use Django Admin or API endpoint
- Stored in database
- Available to tenants immediately

### Presentation Side

Themes are automatically fetched from API during app initialization.

**Manual Theme Registration (if needed):**
```typescript
import { ThemeRegistry } from '@sakhlaqi/ui/theme';

// Register single theme
ThemeRegistry.register(themeFromAPI);

// Register multiple themes
ThemeRegistry.registerMany(themesFromAPI);

// Clear registry
ThemeRegistry.clear();
```

## Benefits

1. **Single Source of Truth**
   - All themes managed in one place (API/database)
   - No duplication or drift

2. **Centralized Management**
   - Update presets via database
   - Tenants see changes immediately
   - No code deployments needed

3. **Flexibility**
   - Easy to add new presets
   - Tenant-specific custom themes
   - Theme versioning built-in

4. **Resilience**
   - Fallback theme for offline scenarios
   - Graceful degradation
   - Application remains functional

## Theme Schema

All themes (API and UI) conform to the same canonical schema defined in `ui/src/theme/theme.types.ts`.

See [theme.types.ts](./src/theme/theme.types.ts) for full schema documentation.

## Development

**Without Backend:**
- UI library works standalone
- Uses fallback theme
- All components functional

**With Backend:**
- Fetch themes from API
- Register in ThemeRegistry
- Full theme functionality

## Summary

✅ **API/Database** = Single source of truth for all themes
✅ **UI Library** = Dynamic registry + fallback theme
✅ **Presentation** = Fetches themes from API
✅ **No Duplication** = Themes defined once
✅ **Maintainable** = Update in one place
