# Page Sections Quick Reference

**Total Sections:** 17 blueprints across 12 categories

---

## Hero Sections (3)

| ID | Name | Use Case | Key Props |
|----|------|----------|-----------|
| `hero-simple` | Simple Hero | Basic landing page | heading, subheading, ctaText |
| `hero-with-email` | Hero with Email | Lead generation | heading, emailPlaceholder, submitText |
| `hero-with-image` | Hero with Image | Product showcase | heading, image, ctaText, imagePosition |

---

## Features Sections (3)

| ID | Name | Use Case | Key Props |
|----|------|----------|-----------|
| `features-grid` | Features Grid | Highlights/Benefits | features[], columns |
| `features-tabbed` | Tabbed Features | Interactive showcase | features[], defaultSelectedIndex |
| `features-comparison` | Feature Comparison | Plan comparison | plans[], featureCategories[] |

---

## Pricing (1)

| ID | Name | Use Case | Key Props |
|----|------|----------|-----------|
| `pricing-standard` | Standard Pricing | Subscription tiers | tiers[] (title, price, features, button) |

---

## FAQ (1)

| ID | Name | Use Case | Key Props |
|----|------|----------|-----------|
| `faq-accordion` | FAQ Accordion | Help/Support | questions[] (id, question, answer) |

---

## CTA (2)

| ID | Name | Use Case | Key Props |
|----|------|----------|-----------|
| `cta-simple` | Simple CTA | Centered banner | heading, primaryCta, secondaryCta |
| `cta-split` | Split CTA | Two-column form | heading, benefits[], rightContent |

---

## Footer (2)

| ID | Name | Use Case | Key Props |
|----|------|----------|-----------|
| `footer-minimal` | Minimal Footer | Simple sites | logo, copyright, socialLinks[] |
| `footer-full` | Full Footer | Corporate sites | linkColumns[], newsletter{} |

---

## Testimonials (1)

| ID | Name | Use Case | Key Props |
|----|------|----------|-----------|
| `testimonials-cards` | Testimonial Cards | Social proof | testimonials[] (name, role, quote, rating) |

---
## Logo Collection (1)

| ID | Name | Use Case | Key Props |
|----|------|----------|--------|
| `logo-collection-simple` | Logo Collection | Partner/customer logos | logos[] (name, logoLight, url), grayscale |

---

## Navigation (1)

| ID | Name | Use Case | Key Props |
|----|------|----------|--------|
| `navigation-app-bar` | App Bar | Website header | logo, menuItems[], ctaButtons[], position |

---

## Stats (1)

| ID | Name | Use Case | Key Props |
|----|------|----------|--------|
| `stats-grid` | Stats Grid | Key metrics | stats[] (value, label, suffix, icon), animated |

---

## Contact (1)

| ID | Name | Use Case | Key Props |
|----|------|----------|--------|
| `contact-form` | Contact Form | Inquiry/support | fields[] (name, label, type, validation), submitText |

---
## Common Props Pattern

```typescript
// Every section has:
{
  heading: string           // Main title
  subheading?: string       // Optional subtitle
  ...specificProps          // Section-specific configuration
}

// Layout configuration:
{
  layout: {
    container: 'centered' | 'full'
    maxWidth: 'sm' | 'md' | 'lg' | 'xl'
    spacing: { py: { xs: number, sm: number } }
    grid?: { xs: number, sm: number, md: number }
  }
}
```

---

## Typical Landing Page Structure

```json
[
  "navigation-app-bar",     // Top navigation
  "hero-with-email",        // Email capture
  "logo-collection-simple", // Trust indicators
  "features-grid",          // 6 key benefits
  "features-tabbed",        // 3 detailed features
  "stats-grid",             // Impact metrics
  "testimonials-cards",     // Social proof
  "pricing-standard",       // 3 tiers
  "faq-accordion",          // 4-5 questions
  "cta-simple",             // Final conversion
  "footer-full"             // Multi-column footer
]
```

---

## Section Files Location

```
ui/src/templates/page-sections/
├── hero/          (3 variants)
├── features/      (3 variants)
├── pricing/       (1 variant)
├── faq/           (1 variant)
├── cta/           (2 variants)
├── footer/        (2 variants)
├── testimonials/  (1 variant)
├── logo-collection/ (1 variant)
├── navigation/    (1 variant)
├── stats/         (1 variant)
└── contact/       (1 variant)
```

---

## Next Steps

1. **Phase 3:** Combine sections into website templates
2. **React Components:** Map JSON to MUI components
3. **Storybook:** Create visual previews
4. **Tenant Overrides:** Implement customization system
