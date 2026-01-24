# Documentation Quick Reference

Quick navigation to all living specification documentation added in Prompt 10.

## 📚 Documentation Index

### Getting Started
- **[Getting Started Guide](stories/0-getting-started.mdx)**
  - Library overview
  - Quick start guide
  - Key concepts
  - Component finder
  - Contributing guidelines

### Component Documentation

#### Actions
- **[Button](stories/documentation/Button.mdx)**
  - Complete props reference (BaseButtonProps)
  - Variants: contained, outlined, text
  - Colors: primary, secondary, error, warning, info, success
  - Sizes: small, medium, large
  - 8+ usage examples

#### Inputs
- **[Input](stories/documentation/Input.mdx)**
  - Complete props reference (BaseInputProps)
  - Input types: text, password, email, number, tel, url, search
  - Form integration: React Hook Form, Formik
  - Validation patterns
  - 10+ usage examples

#### Layout
- **[Stack](stories/documentation/Stack.mdx)**
  - Layout component for spacing
  - Direction: row, column, reverse
  - Spacing system (0-10 theme units)
  - Alignment options
  - Common patterns

### Core Systems
- **[PageRenderer](stories/documentation/PageRenderer.mdx)**
  - JSON-to-React transformation
  - Schema validation
  - Template system
  - Component registry
  - Error handling
  - Security considerations

## 🔗 Quick Links

### By Use Case

**Need to add a button?** → [Button docs](stories/documentation/Button.mdx)  
**Need a text input?** → [Input docs](stories/documentation/Input.mdx)  
**Need to layout components?** → [Stack docs](stories/documentation/Stack.mdx)  
**Building from JSON?** → [PageRenderer docs](stories/documentation/PageRenderer.mdx)  
**Just getting started?** → [Getting Started](stories/0-getting-started.mdx)  

### By Topic

**Props reference?** → All component docs include TypeScript interfaces  
**Usage examples?** → All component docs include 5-10+ examples  
**When to use?** → All component docs have "When to Use" section  
**Troubleshooting?** → All component docs have "Troubleshooting" section  
**Best practices?** → All component docs have "Best Practices" section  

## 📊 Documentation Structure

Each component doc follows this pattern:

1. **Overview** - What it does
2. **When to Use / Not Use** - Clear guidance
3. **Props Reference** - TypeScript interfaces
4. **Required vs Optional** - Tables with defaults
5. **Usage Examples** - Production-ready code
6. **Adapter Behavior** - Provider differences
7. **Limitations** - Known issues
8. **Accessibility** - ARIA support (where applicable)
9. **Troubleshooting** - Common problems
10. **Best Practices** - Do's and Don'ts

## 🎯 Key Features

- ✅ **Living Specification** - Documentation stays in sync with code
- ✅ **Production-Ready Examples** - All code examples are copy-paste ready
- ✅ **TypeScript Interfaces** - Complete prop types from source
- ✅ **Comprehensive** - ~1,900 lines across 5 MDX files
- ✅ **Searchable** - Organized by category with cross-references
- ✅ **Best Practices** - Clear do's and don'ts for every component

## 📈 Coverage

| Category | Components | Status |
|----------|------------|--------|
| Getting Started | Overview Guide | ✅ Complete |
| Actions | Button | ✅ Complete |
| Inputs | Input | ✅ Complete |
| Layout | Stack | ✅ Complete |
| Core Systems | PageRenderer | ✅ Complete |

## 🚀 Viewing Documentation

### In Storybook
1. Run: `npm run storybook`
2. Navigate to "Documentation" in sidebar
3. Browse by category

### In Files
All documentation is in `stories/` directory:
```
stories/
  0-getting-started.mdx
  documentation/
    Button.mdx
    Input.mdx
    Stack.mdx
    PageRenderer.mdx
```

## 📝 Adding More Documentation

To add documentation for new components, follow the established pattern:

1. Create `stories/documentation/ComponentName.mdx`
2. Use this structure:
   - Overview
   - When to Use / Not Use
   - Props Reference
   - Usage Examples
   - Adapter Behavior
   - Limitations
   - Accessibility (if applicable)
   - Troubleshooting
   - Best Practices

3. Add TypeScript interface from source
4. Include 5-10 real code examples
5. Cross-reference related components

See existing docs for detailed examples.

---

**Last Updated:** January 2026  
**Total Documentation:** ~1,900 lines across 5 MDX files  
**Status:** ✅ Complete
