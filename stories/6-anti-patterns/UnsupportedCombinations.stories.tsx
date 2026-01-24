import type { Meta, StoryObj } from '@storybook/react';
import { Card, Button, Stack, Input, Modal, Tabs } from '../../src/adapters';
import * as MUIComponents from '../../src/providers/mui';

/**
 * Anti-Pattern: Unsupported Component Combinations
 * 
 * Demonstrates component combinations that either don't work well together
 * or violate the platform's design principles.
 */

const meta = {
  title: 'Anti-Patterns/Unsupported Combinations',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# ❌ Anti-Pattern: Unsupported Component Combinations

This section demonstrates **problematic component combinations** that should be avoided.

## Why This Matters

- **Poor UX** - Certain combinations confuse users
- **Accessibility** - Some combinations violate a11y guidelines
- **Maintenance** - Complex nesting makes code hard to maintain
- **Performance** - Unnecessary nesting impacts render performance

## Anti-Patterns Covered

1. **Nested Modals** - Modal inside modal (confusing UX)
2. **Forms without structure** - Missing FormContext or proper grouping
3. **Excessive nesting** - Too many layout containers
4. **Mixing layout components** - Stack inside Stack inside Flex
5. **Modal with complex routing** - Modals shouldn't contain navigation
6. **Non-interactive content in buttons** - Buttons wrapping entire cards

## ✅ Correct Patterns

Each anti-pattern story includes the correct approach to achieve the desired result.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Anti-Pattern Demo Wrapper
 */
function AntiPatternDemo({
  title,
  description,
  antiPattern,
  correctPattern,
  explanation,
  children,
}: {
  title: string;
  description: string;
  antiPattern: string;
  correctPattern: string;
  explanation: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '16px', color: '#dc2626' }}>❌ {title}</h2>
      
      <div style={{ 
        padding: '16px', 
        backgroundColor: '#fef2f2', 
        border: '2px solid #fecaca',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <p style={{ margin: 0, color: '#991b1b' }}>
          <strong>What's wrong:</strong> {description}
        </p>
      </div>

      <div style={{
        padding: '20px',
        backgroundColor: '#f9fafb',
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <h3 style={{ marginTop: 0, fontSize: '16px' }}>Anti-Pattern Example:</h3>
        {children}
      </div>

      <div style={{
        padding: '16px',
        backgroundColor: '#fffbeb',
        border: '2px solid #fcd34d',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <p style={{ margin: 0, color: '#78350f' }}>
          <strong>⚠️ Why this is problematic:</strong> {explanation}
        </p>
      </div>

      <details open>
        <summary style={{ 
          cursor: 'pointer',
          padding: '12px',
          backgroundColor: '#fef2f2',
          border: '2px solid #fecaca',
          borderRadius: '8px',
          marginBottom: '12px',
          fontWeight: 'bold',
          color: '#991b1b',
        }}>
          ❌ Anti-Pattern Code
        </summary>
        <pre style={{
          margin: '0 0 20px 0',
          padding: '16px',
          backgroundColor: '#1f2937',
          color: '#f9fafb',
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '13px',
        }}>
          {antiPattern}
        </pre>
      </details>

      <details open>
        <summary style={{
          cursor: 'pointer',
          padding: '12px',
          backgroundColor: '#f0fdf4',
          border: '2px solid #bbf7d0',
          borderRadius: '8px',
          marginBottom: '12px',
          fontWeight: 'bold',
          color: '#166534',
        }}>
          ✅ Correct Pattern Code
        </summary>
        <pre style={{
          margin: 0,
          padding: '16px',
          backgroundColor: '#1f2937',
          color: '#f9fafb',
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '13px',
        }}>
          {correctPattern}
        </pre>
      </details>
    </div>
  );
}

/**
 * Nested Modals
 */
export const NestedModals: Story = {
  render: () => (
    <AntiPatternDemo
      title="Nested Modals"
      description="Opening a modal from inside another modal"
      explanation="Creates confusing UX with multiple overlays, unclear escape behavior, and accessibility issues with focus management. Users can't tell which modal to close first."
      antiPattern={`// ❌ DON'T: Modal inside Modal
<Modal open={outerOpen}>
  <div>
    <h2>Outer Modal</h2>
    <Button onClick={() => setInnerOpen(true)}>
      Open Inner Modal
    </Button>
    
    <Modal open={innerOpen}>  {/* ❌ Nested modal */}
      <div>
        <h2>Inner Modal</h2>
        <p>This is confusing!</p>
      </div>
    </Modal>
  </div>
</Modal>`}
      correctPattern={`// ✅ DO: Sequential modals or wizard pattern
const [currentStep, setCurrentStep] = useState(0);

<Modal open={open}>
  {currentStep === 0 && (
    <div>
      <h2>Step 1</h2>
      <Button onClick={() => setCurrentStep(1)}>Next</Button>
    </div>
  )}
  {currentStep === 1 && (
    <div>
      <h2>Step 2</h2>
      <Button onClick={() => setCurrentStep(0)}>Back</Button>
    </div>
  )}
</Modal>

// OR: Close first modal before opening second
<Modal open={modalA && !modalB}>...</Modal>
<Modal open={modalB && !modalA}>...</Modal>`}
    >
      <div style={{
        padding: '16px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: '2px dashed #dc2626',
      }}>
        <p style={{ margin: 0, color: '#666', textAlign: 'center' }}>
          ⚠️ <strong>Nested Modal Example (Not Interactive)</strong><br />
          Imagine clicking a button that opens another modal on top of this one.
          Users would be confused about which overlay to close first.
        </p>
      </div>
    </AntiPatternDemo>
  ),
};

/**
 * Excessive Nesting
 */
export const ExcessiveNesting: Story = {
  render: () => (
    <AntiPatternDemo
      title="Excessive Layout Nesting"
      description="Multiple unnecessary layout containers wrapped around each other"
      explanation="Creates performance overhead, confusing styling behavior, and makes the component tree difficult to debug. Each layout component adds to render time."
      antiPattern={`// ❌ DON'T: Excessive nesting
<Stack spacing={2}>
  <Stack spacing={1}>
    <Stack spacing={0.5}>
      <Card>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Button>Action</Button>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  </Stack>
</Stack>

// 5 Stack components for 1 Button!`}
      correctPattern={`// ✅ DO: Minimal necessary structure
<Card>
  <Stack spacing={2}>
    <Button>Action</Button>
    <Button>Another Action</Button>
  </Stack>
</Card>

// OR: Use padding/margin on the component itself
<Card padding="lg">
  <Button>Action</Button>
</Card>

// Only nest layouts when you need different directions:
<Stack direction="column" spacing={2}>
  <Stack direction="row" spacing={1}>
    <Button>Save</Button>
    <Button>Cancel</Button>
  </Stack>
</Stack>`}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ padding: '8px', backgroundColor: '#fee', border: '1px solid #fcc' }}>
          Stack level 1
          <div style={{ padding: '8px', backgroundColor: '#fdd', border: '1px solid #fbb' }}>
            Stack level 2
            <div style={{ padding: '8px', backgroundColor: '#fcc', border: '1px solid #faa' }}>
              Stack level 3
              <div style={{ padding: '8px', backgroundColor: '#fbb', border: '1px solid #f99' }}>
                Stack level 4
                <div style={{ padding: '8px', backgroundColor: '#faa', border: '1px solid #f88' }}>
                  Stack level 5
                  <Button>Finally, a button!</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p style={{ margin: '8px 0 0', color: '#dc2626', fontSize: '14px' }}>
          ⚠️ This creates 5 unnecessary wrapper divs
        </p>
      </div>
    </AntiPatternDemo>
  ),
};

/**
 * Button Wrapping Large Content
 */
export const ButtonWrappingContent: Story = {
  render: () => (
    <AntiPatternDemo
      title="Button Wrapping Large Content"
      description="Wrapping entire cards or large sections in a button"
      explanation="Violates accessibility guidelines (buttons should be concise), confusing click targets, and poor semantic HTML. Makes keyboard navigation difficult."
      antiPattern={`// ❌ DON'T: Button wrapping entire card
<Button onClick={handleClick}>
  <Card>
    <h3>Product Title</h3>
    <img src="..." alt="Product" />
    <p>Long product description...</p>
    <p>Price: $99.99</p>
    <div>
      <span>Rating: 5 stars</span>
      <span>Reviews: 123</span>
    </div>
  </Card>
</Button>`}
      correctPattern={`// ✅ DO: Make the card clickable or use explicit action buttons
// Option 1: Clickable card
<Card 
  onClick={handleClick}
  style={{ cursor: 'pointer' }}
  role="button"
  tabIndex={0}
>
  <h3>Product Title</h3>
  <img src="..." alt="Product" />
  <p>Long product description...</p>
  <Stack direction="row" spacing={1}>
    <Button onClick={handleView}>View</Button>
    <Button onClick={handleBuy}>Buy Now</Button>
  </Stack>
</Card>

// Option 2: Button in footer
<Card>
  <h3>Product Title</h3>
  <p>Description...</p>
  <Stack direction="row" spacing={1}>
    <Button onClick={handleClick}>View Details</Button>
  </Stack>
</Card>`}
    >
      <div style={{ maxWidth: '400px' }}>
        <div style={{
          padding: '16px',
          border: '3px solid #dc2626',
          borderRadius: '8px',
          cursor: 'not-allowed',
          backgroundColor: '#fee',
        }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Product Card (Entire area is one button)</h4>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
            This entire card is wrapped in a {'<Button>'}. This makes every piece of text,
            every image, and every element inside a single click target.
          </p>
          <div style={{ display: 'flex', gap: '8px', fontSize: '12px' }}>
            <span>⭐⭐⭐⭐⭐</span>
            <span>123 reviews</span>
          </div>
          <p style={{ margin: '8px 0 0', color: '#dc2626', fontSize: '12px', fontWeight: 'bold' }}>
            ❌ Poor accessibility and UX
          </p>
        </div>
      </div>
    </AntiPatternDemo>
  ),
};

/**
 * Form Without Structure
 */
export const FormWithoutStructure: Story = {
  render: () => (
    <AntiPatternDemo
      title="Form Without Proper Structure"
      description="Form fields scattered without fieldsets, labels, or proper grouping"
      explanation="Makes forms inaccessible to screen readers, breaks form validation, no clear visual grouping, and difficult to maintain. Labels should be programmatically associated with inputs."
      antiPattern={`// ❌ DON'T: Unstructured form fields
<div>
  Name:
  <Input />
  Email:
  <Input />
  Phone:
  <Input />
  Department:
  <Input />
  <Button>Submit</Button>
</div>

// No labels, no fieldsets, no structure`}
      correctPattern={`// ✅ DO: Proper form structure
<form onSubmit={handleSubmit}>
  <Stack spacing={3}>
    <fieldset>
      <legend>Personal Information</legend>
      <Stack spacing={2}>
        <div>
          <label htmlFor="name">Name *</label>
          <Input id="name" required />
        </div>
        <div>
          <label htmlFor="email">Email *</label>
          <Input id="email" type="email" required />
        </div>
      </Stack>
    </fieldset>
    
    <fieldset>
      <legend>Contact Details</legend>
      <Stack spacing={2}>
        <div>
          <label htmlFor="phone">Phone</label>
          <Input id="phone" type="tel" />
        </div>
      </Stack>
    </fieldset>
    
    <Stack direction="row" spacing={2}>
      <Button type="submit">Submit</Button>
      <Button type="button">Cancel</Button>
    </Stack>
  </Stack>
</form>`}
    >
      <div style={{ padding: '16px', backgroundColor: '#fff', borderRadius: '8px', border: '2px dashed #dc2626' }}>
        <div style={{ marginBottom: '8px' }}>
          Name: <Input placeholder="No label!" />
        </div>
        <div style={{ marginBottom: '8px' }}>
          Email: <Input placeholder="Not associated!" />
        </div>
        <div style={{ marginBottom: '8px' }}>
          Phone: <Input placeholder="No validation!" />
        </div>
        <Button>Submit</Button>
        <p style={{ margin: '8px 0 0', color: '#dc2626', fontSize: '12px' }}>
          ❌ Inaccessible and poorly structured
        </p>
      </div>
    </AntiPatternDemo>
  ),
};

/**
 * Mixing Layout Components Unnecessarily
 */
export const MixedLayoutComponents: Story = {
  render: () => (
    <AntiPatternDemo
      title="Mixing Layout Components Without Purpose"
      description="Using Stack, Flex, Grid randomly without clear layout intent"
      explanation="Confuses developers, inconsistent spacing behavior, harder to maintain, and no clear visual hierarchy. Choose one layout pattern and stick with it."
      antiPattern={`// ❌ DON'T: Random layout mixing
<Stack direction="column">
  <Flex>
    <Stack direction="row">
      <div style={{ display: 'flex' }}>
        <Stack>
          <Button>What layout am I in?</Button>
        </Stack>
      </div>
    </Stack>
  </Flex>
</Stack>

// Stack → Flex → Stack → inline flex → Stack
// Too many layout paradigms!`}
      correctPattern={`// ✅ DO: Consistent layout strategy
// Option 1: Use Stack everywhere for simple layouts
<Stack spacing={2}>
  <Stack direction="row" spacing={1}>
    <Button>Save</Button>
    <Button>Cancel</Button>
  </Stack>
  <Stack spacing={1}>
    <Input />
    <Input />
  </Stack>
</Stack>

// Option 2: Use Grid for complex layouts
<div style={{ 
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '16px'
}}>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>

// Option 3: Use Flex for specific needs
<Flex justify="space-between" align="center">
  <h2>Title</h2>
  <Button>Action</Button>
</Flex>`}
    >
      <div style={{ fontSize: '14px', color: '#666' }}>
        <p style={{ marginBottom: '12px' }}>
          <strong>Layout Hierarchy:</strong>
        </p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Stack (vertical) → Stack (horizontal) → Stack (vertical) → Button</li>
          <li style={{ color: '#dc2626' }}>⚠️ 3 Stack components with alternating directions</li>
          <li style={{ color: '#dc2626' }}>⚠️ Confusing for developers to understand layout intent</li>
        </ul>
      </div>
    </AntiPatternDemo>
  ),
};

/**
 * Summary
 */
export const AntiPatternsSummary: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '900px' }}>
      <h1 style={{ marginBottom: '24px' }}>❌ Unsupported Combinations Summary</h1>
      
      <div style={{ 
        padding: '20px',
        backgroundColor: '#fffbeb',
        border: '3px solid #fbbf24',
        borderRadius: '12px',
        marginBottom: '32px',
      }}>
        <h3 style={{ marginTop: 0, color: '#92400e' }}>⚠️ These Patterns Cause Problems</h3>
        <p style={{ margin: 0, color: '#78350f' }}>
          While these combinations may technically work, they create UX, accessibility,
          performance, or maintainability issues. Avoid them in production code.
        </p>
      </div>

      <h2>Anti-Patterns to Avoid</h2>
      
      <div style={{ display: 'grid', gap: '16px' }}>
        {[
          {
            title: 'Nested Modals',
            problem: 'Multiple overlays confuse users',
            solution: 'Use sequential modals or wizard pattern',
            impact: 'UX, Accessibility',
          },
          {
            title: 'Excessive Nesting',
            problem: '5+ layout containers for simple content',
            solution: 'Flatten structure, use padding/margin',
            impact: 'Performance, Maintainability',
          },
          {
            title: 'Button Wrapping Large Content',
            problem: 'Entire cards wrapped in buttons',
            solution: 'Make card clickable or use explicit buttons',
            impact: 'Accessibility, UX',
          },
          {
            title: 'Unstructured Forms',
            problem: 'No labels, fieldsets, or grouping',
            solution: 'Use proper form elements with labels',
            impact: 'Accessibility, Validation',
          },
          {
            title: 'Mixed Layout Components',
            problem: 'Random Stack/Flex/Grid mixing',
            solution: 'Choose one layout strategy and be consistent',
            impact: 'Maintainability, Developer Experience',
          },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              padding: '16px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', color: '#dc2626' }}>{item.title}</h4>
            <p style={{ margin: '0 0 4px 0', fontSize: '14px' }}>
              <strong>Problem:</strong> {item.problem}
            </p>
            <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#166534' }}>
              <strong>Solution:</strong> {item.solution}
            </p>
            <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
              <strong>Impact:</strong> {item.impact}
            </p>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '32px',
        padding: '20px',
        backgroundColor: '#f0fdf4',
        border: '2px solid #16a34a',
        borderRadius: '12px',
      }}>
        <h3 style={{ marginTop: 0, color: '#166534' }}>✅ General Best Practices</h3>
        <ul style={{ margin: 0, color: '#166534' }}>
          <li><strong>Keep it simple:</strong> Fewer components = better performance and maintainability</li>
          <li><strong>Follow patterns:</strong> Use established UI patterns (wizard, form sections, etc.)</li>
          <li><strong>Think accessibility:</strong> Every component should be keyboard and screen reader friendly</li>
          <li><strong>Be consistent:</strong> Use the same layout strategy throughout your app</li>
          <li><strong>Test with real users:</strong> What seems logical to developers may confuse users</li>
        </ul>
      </div>
    </div>
  ),
};
