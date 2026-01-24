# Visual Regression Quick Reference

Quick guide for maintaining deterministic stories for visual regression testing.

## 🚫 Never Use

| ❌ Don't Use | ✅ Use Instead | Example |
|-------------|---------------|---------|
| `new Date()` | `FIXED_DATES.NOW` | `const now = FIXED_DATES.NOW` |
| `Date.now()` | `FIXED_TIMESTAMPS.NOW` | `timestamp: FIXED_TIMESTAMPS.NOW` |
| `Math.random()` | Fixed values or `mockData` | `progress += 10` |
| `setTimeout(fn, ms)` | Immediate state change | `setLoading(true)` // Stop here |
| `setInterval(fn, ms)` | Fixed increments | See LinearProgress examples |
| `uuid()` | `generateDeterministicId()` | `id: generateDeterministicId('user')` |
| `faker.name()` | `mockData.users` | `const users = mockData.users` |
| Random data | `mockData.*` | See available datasets |

## ✅ Use These

### Fixed Dates
```typescript
import { FIXED_DATES } from './visual-regression-utils';

const now = FIXED_DATES.NOW;          // 2024-06-15 10:00:00
const future = FIXED_DATES.FUTURE;     // 2024-07-20
const past = FIXED_DATES.PAST;         // 2024-05-01
```

### Fixed Timestamps
```typescript
import { FIXED_TIMESTAMPS } from './visual-regression-utils';

const timestamp = FIXED_TIMESTAMPS.NOW;        // 1718452800000
const later = FIXED_TIMESTAMPS.NOW_PLUS_1S;    // +1 second
```

### Mock Data
```typescript
import { mockData } from './visual-regression-utils';

const users = mockData.users;      // 5 users
const products = mockData.products; // 5 products
const tasks = mockData.tasks;      // 5 tasks
```

### Disable Animations
```typescript
import { disableAnimations } from './visual-regression-utils';

export default {
  title: 'MyComponent',
  decorators: [disableAnimations],
};
```

## 📋 Pre-Commit Checklist

Before committing a new story:

- [ ] No `new Date()`
- [ ] No `Date.now()`
- [ ] No `Math.random()`
- [ ] No timers for state changes
- [ ] Uses fixed dates/timestamps
- [ ] Uses mock data
- [ ] Uses deterministic IDs
- [ ] Animations disabled if needed
- [ ] Story is reproducible

## 📁 Key Files

- **Utilities:** `stories/visual-regression-utils.ts`
- **CSS:** `.storybook/visual-regression.css`
- **Documentation:** `VISUAL_REGRESSION_PREP.md`
- **This Guide:** `VISUAL_REGRESSION_QUICK_REFERENCE.md`

## 🎯 Fixed Constants

### Dates
- `NOW` - 2024-06-15 10:00:00
- `MORNING` - 09:00:00
- `AFTERNOON` - 14:30:00
- `EVENING` - 18:00:00
- `FUTURE` - 2024-07-20
- `PAST` - 2024-05-01

### Timestamps
- `NOW` - 1718452800000
- `NOW_PLUS_1S` - +1 second
- `NOW_PLUS_1M` - +1 minute
- `NOW_PLUS_1H` - +1 hour

### Mock Data
- `users` - 5 users
- `products` - 5 products
- `tasks` - 5 tasks
- `metrics` - Dashboard metrics
- `chartData` - 6 months of chart data

## 🚀 Ready for Testing

All stories are now deterministic and ready for:
- Chromatic
- Percy
- Playwright screenshots
- Cypress snapshots
- Any visual regression tool

---

**Last Updated:** January 2026  
**Status:** ✅ All Stories Stabilized
