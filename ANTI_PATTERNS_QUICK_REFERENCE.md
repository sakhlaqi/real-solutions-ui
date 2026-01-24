# Anti-Patterns Quick Reference

Quick guide for avoiding common mistakes in the UI library.

---

## 🚨 Invalid JSON Configs

### ❌ Don't
```typescript
// Missing required 'type' field
{
  metadata: { title: 'Page', version: '1.0' },
  template: {
    props: { title: 'Dashboard' }  // ❌ No 'type'!
  }
}

// Invalid template type
{
  template: {
    type: 'superButton'  // ❌ Doesn't exist!
  }
}

// Wrong data types
{
  template: {
    type: 'stack',
    props: {
      spacing: 'two',  // ❌ Should be number
      direction: 123   // ❌ Should be string
    }
  }
}
```

### ✅ Do
```typescript
// Always include 'type'
{
  metadata: { title: 'Page', version: '1.0' },
  template: {
    type: 'container',  // ✅ Required field
    props: { title: 'Dashboard' }
  }
}

// Use valid template types
{
  template: {
    type: 'button',  // ✅ Valid type
    props: {
      children: 'Click Me',
      variant: 'contained'
    }
  }
}

// Match schema types
{
  template: {
    type: 'stack',
    props: {
      spacing: 2,          // ✅ number
      direction: 'column'  // ✅ string
    }
  }
}
```

---

## 🔀 Unsupported Combinations

### ❌ Don't
```tsx
// Nested modals
<Modal open={outer}>
  <Modal open={inner}>  {/* ❌ Confusing UX */}
    ...
  </Modal>
</Modal>

// Excessive nesting
<Stack>
  <Stack>
    <Stack>
      <Stack>
        <Stack>
          <Button />  {/* ❌ 5 wrappers for 1 button! */}
        </Stack>
      </Stack>
    </Stack>
  </Stack>
</Stack>

// Button wrapping entire card
<Button onClick={...}>  {/* ❌ Accessibility violation */}
  <Card>
    <h3>Title</h3>
    <p>Long description...</p>
    <img src="..." />
  </Card>
</Button>

// Form without structure
<div>
  Name: <Input />      {/* ❌ No label association */}
  Email: <Input />     {/* ❌ No validation */}
  <Button>Submit</Button>
</div>
```

### ✅ Do
```tsx
// Sequential modals or wizard
<Modal open={step === 0}>
  <Button onClick={() => setStep(1)}>Next</Button>
</Modal>
<Modal open={step === 1}>
  <Button onClick={() => setStep(0)}>Back</Button>
</Modal>

// Minimal necessary structure
<Card>
  <Stack spacing={2}>
    <Button>Action 1</Button>
    <Button>Action 2</Button>
  </Stack>
</Card>

// Clickable card OR button in footer
<Card onClick={handleClick} style={{ cursor: 'pointer' }}>
  <h3>Title</h3>
  <p>Description</p>
  <Button onClick={handleAction}>Action</Button>
</Card>

// Proper form structure
<form onSubmit={handleSubmit}>
  <fieldset>
    <legend>User Info</legend>
    <label htmlFor="name">Name *</label>
    <Input id="name" required />
    
    <label htmlFor="email">Email *</label>
    <Input id="email" type="email" required />
  </fieldset>
  <Button type="submit">Submit</Button>
</form>
```

---

## 🔌 Direct Provider Usage

### ❌ Don't
```typescript
// Importing directly from provider
import { Button } from '../../providers/mui';
import { Card } from '../../providers/internal';

// Tightly coupled to MUI
function MyComponent() {
  return (
    <div>
      <Button variant="contained">MUI Button</Button>
    </div>
  );
}
// ❌ Can't switch providers without refactoring

// Mixing providers
function MyForm() {
  return (
    <Internal.Card>
      <MUI.TextField />         {/* ❌ Mixed providers */}
      <MUI.Button>Submit</MUI.Button>
    </Internal.Card>
  );
}
// ❌ Inconsistent styling, theme conflicts
```

### ✅ Do
```typescript
// ALWAYS use adapters
import { Button, Card, Input } from '../../adapters';

// Flexible, provider-agnostic
function MyComponent() {
  return (
    <Card>
      <Input placeholder="Name" />
      <Button variant="contained">Submit</Button>
    </Card>
  );
}
// ✅ Switch providers in config without code changes

// Consistent provider usage
function MyForm() {
  return (
    <Card>
      <Input placeholder="Name" />
      <Button>Submit</Button>
    </Card>
  );
}
// ✅ All components use same provider (configured globally)
```

---

## 🎯 Golden Rules

### Rule 1: Always Validate JSON Configs
```typescript
const result = validatePageConfig(config);
if (!result.success) {
  return <ValidationErrorDisplay errors={result.error.errors} />;
}
return <PageRenderer config={result.data} />;
```

### Rule 2: Keep Component Nesting Flat
```typescript
// ❌ Too deep
<Stack><Stack><Stack><Button /></Stack></Stack></Stack>

// ✅ Flat
<Stack spacing={2}>
  <Button />
  <Button />
</Stack>
```

### Rule 3: Never Import from `providers/`
```typescript
// ❌ NEVER
import { Button } from '../../providers/mui';

// ✅ ALWAYS
import { Button } from '../../adapters';
```

### Rule 4: Use Proper Form Structure
```typescript
<form>
  <fieldset>
    <legend>Section Title</legend>
    <label htmlFor="input1">Label</label>
    <Input id="input1" />
  </fieldset>
</form>
```

### Rule 5: Avoid Nested Overlays
```typescript
// ❌ Don't nest
<Modal><Modal>...</Modal></Modal>

// ✅ Use wizard or sequential
<Modal open={step === 0}>...</Modal>
<Modal open={step === 1}>...</Modal>
```

---

## 📋 Quick Checklist

Before committing code, verify:

- [ ] No direct imports from `providers/` (use `adapters`)
- [ ] All JSON configs validated with `validatePageConfig()`
- [ ] No modals inside modals
- [ ] Component nesting ≤ 3 levels deep
- [ ] All form inputs have associated labels
- [ ] No buttons wrapping large content blocks
- [ ] Consistent layout strategy (not random Stack/Flex mixing)
- [ ] Template configs include required `type` field
- [ ] Props match schema types (number vs string)
- [ ] No circular references in configs

---

## 🚦 Severity Levels

| Level | Description | Action |
|-------|-------------|--------|
| **🔴 Critical** | Crashes app or breaks core functionality | Fix immediately |
| **🟠 High** | Causes UX/accessibility issues | Fix before PR |
| **🟡 Medium** | Reduces maintainability | Fix when refactoring |
| **🟢 Low** | Minor optimization opportunity | Optional |

### Critical Issues
- Missing required fields in JSON configs
- Direct provider imports (breaks provider switching)
- Buttons wrapping entire cards (accessibility)

### High Issues
- Nested modals (UX confusion)
- Forms without labels (accessibility)
- Wrong data types in configs (runtime errors)

### Medium Issues
- Excessive nesting (performance/maintenance)
- Mixed layout components (developer confusion)
- Extra unknown fields (schema violations)

---

## 🔍 Where to Learn More

- **Storybook Section:** Anti-Patterns → [Story Name]
- **Validation Errors:** See `ValidationErrorDisplay` component
- **Adapter Benefits:** See DirectProviderUsage stories
- **Best Practices:** See each anti-pattern's "Correct Pattern" code

---

## 💡 Pro Tips

1. **Enable inline validation:** Set `showInlineWarnings={true}` in PageRenderer
2. **Use TypeScript:** Catches many errors before validation
3. **Check Storybook:** Browse anti-pattern examples to learn
4. **Read error paths:** Zod errors show exact location (e.g., `template.props.spacing`)
5. **Test in Storybook:** All patterns have working examples

---

## 📚 Related Documentation

- [PROMPT_9_SUMMARY.md](./PROMPT_9_SUMMARY.md) - Complete anti-patterns documentation
- [ERROR_WARNING_DISPLAY_QUICK_REFERENCE.md](./ERROR_WARNING_DISPLAY_QUICK_REFERENCE.md) - Error display guide
- [PROMPT_8_SUMMARY.md](./PROMPT_8_SUMMARY.md) - Validation system documentation

---

**Remember:** When in doubt, check Storybook's Anti-Patterns section. Every anti-pattern includes a correct alternative!
