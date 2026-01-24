import type { Meta, StoryObj } from '@storybook/react';
import { Button, Input, Stack } from '../../src/adapters';
import * as MUI from '../../src/providers/mui';

/**
 * Anti-Pattern: Direct Provider Usage
 * 
 * Demonstrates why importing directly from MUI or Internal providers
 * instead of using adapters is discouraged.
 */

const meta = {
  title: 'Anti-Patterns/Direct Provider Usage',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# ❌ Anti-Pattern: Direct Provider Usage

This section demonstrates why **directly importing from providers** (MUI, Internal) 
is discouraged and why you should always use the **adapter layer**.

## Why Adapters Matter

The adapter layer provides several critical benefits:

### 1. **Provider Switching**
\`\`\`typescript
// ❌ Tightly coupled to MUI - can't switch providers
import { Button } from '../../providers/mui';

// ✅ Flexible - can switch providers globally
import { Button } from '../../adapters';
\`\`\`

### 2. **Consistent API**
Different providers have different props and behaviors. Adapters normalize these:
- MUI uses \`onClick\`, Ant Design uses \`onPress\`
- MUI uses \`variant="contained"\`, Ant Design uses \`type="primary"\`
- Adapters provide one consistent API

### 3. **Fallback Handling**
Adapters can gracefully fallback when components aren't available:
\`\`\`typescript
// If MUI Timeline isn't available, adapter falls back to Internal
<Timeline provider="mui" />  // → Falls back to Internal automatically
\`\`\`

### 4. **Type Safety**
Adapters provide unified TypeScript types across all providers.

### 5. **Future-Proofing**
Want to add a new provider (Ant Design, Chakra UI)? Just update adapters.
Direct provider usage requires refactoring every component.

## The Rule

**ALWAYS import from \`adapters\`, NEVER from \`providers/mui\` or \`providers/internal\`.**

## When Direct Usage is OK

Only in these specific scenarios:
- **Provider-specific demos** (showing MUI vs Internal differences)
- **Testing** (unit tests for specific provider implementations)
- **Migration** (temporary during refactoring)

Even then, always document WHY you're breaking the rule.
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
function DirectUsageDemo({
  title,
  description,
  problem,
  solution,
  antiPatternCode,
  correctCode,
  children,
}: {
  title: string;
  description: string;
  problem: string;
  solution: string;
  antiPatternCode: string;
  correctCode: string;
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
          <strong>Anti-Pattern:</strong> {description}
        </p>
      </div>

      <div style={{
        padding: '20px',
        backgroundColor: '#f9fafb',
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <h3 style={{ marginTop: 0, fontSize: '16px' }}>Visual Example:</h3>
        {children}
      </div>

      <div style={{
        padding: '16px',
        backgroundColor: '#fffbeb',
        border: '2px solid #fcd34d',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <p style={{ margin: '0 0 8px 0', color: '#78350f' }}>
          <strong>⚠️ Why this is problematic:</strong>
        </p>
        <p style={{ margin: 0, color: '#78350f' }}>
          {problem}
        </p>
      </div>

      <div style={{
        padding: '16px',
        backgroundColor: '#f0fdf4',
        border: '2px solid #bbf7d0',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <p style={{ margin: '0 0 8px 0', color: '#166534' }}>
          <strong>✅ Why adapters are better:</strong>
        </p>
        <p style={{ margin: 0, color: '#166534' }}>
          {solution}
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
          {antiPatternCode}
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
          {correctCode}
        </pre>
      </details>
    </div>
  );
}

/**
 * Direct MUI Import
 */
export const DirectMUIImport: Story = {
  render: () => (
    <DirectUsageDemo
      title="Direct MUI Import"
      description="Importing Button directly from MUI provider"
      problem="Tightly couples your code to MUI. If you want to switch to Ant Design, Internal, or any other provider, you'd need to refactor every component. Makes the codebase rigid and difficult to maintain."
      solution="Using adapters allows you to switch providers globally with a single configuration change. The adapter layer handles provider-specific differences and provides a consistent API."
      antiPatternCode={`// ❌ DON'T: Direct import from provider
import { Button } from '../../providers/mui';

function MyComponent() {
  return (
    <div>
      <Button variant="contained" color="primary">
        Save
      </Button>
      <Button variant="outlined">
        Cancel
      </Button>
    </div>
  );
}

// Now this component ONLY works with MUI
// Can't switch to another provider without refactoring`}
      correctCode={`// ✅ DO: Use adapter layer
import { Button } from '../../adapters';

function MyComponent() {
  return (
    <div>
      <Button variant="contained" color="primary">
        Save
      </Button>
      <Button variant="outlined">
        Cancel
      </Button>
    </div>
  );
}

// Works with any provider!
// Switch providers in config without changing component code`}
    >
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{
          padding: '12px',
          backgroundColor: '#fee',
          border: '2px solid #dc2626',
          borderRadius: '8px',
        }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold', color: '#991b1b' }}>
            ❌ Direct MUI Button
          </p>
          <MUI.Button variant="contained">MUI Button</MUI.Button>
        </div>
        
        <div style={{ fontSize: '24px' }}>→</div>
        
        <div style={{
          padding: '12px',
          backgroundColor: '#f0fdf4',
          border: '2px solid #16a34a',
          borderRadius: '8px',
        }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 'bold', color: '#166534' }}>
            ✅ Adapter Button
          </p>
          <Button variant="contained">Adapter Button</Button>
        </div>
      </div>
      <p style={{ margin: '12px 0 0', fontSize: '14px', color: '#666' }}>
        Both look the same, but only the adapter version is flexible!
      </p>
    </DirectUsageDemo>
  ),
};

/**
 * Mixing Providers
 */
export const MixingProviders: Story = {
  render: () => (
    <DirectUsageDemo
      title="Mixing Providers Directly"
      description="Using both MUI and adapter components without consistency"
      problem="Creates inconsistent styling, unpredictable behavior when providers have conflicting styles, harder to debug issues, and makes it unclear which provider a component uses. Theme conflicts can break the entire UI."
      solution="Adapters enforce consistency by using a single provider at a time. You choose the provider globally, and all components follow that choice. If you need provider-specific features, use the adapter's provider prop."
      antiPatternCode={`// ❌ DON'T: Mix providers directly
import { Button as MUIButton } from '../../providers/mui';
import { Input } from '../../adapters';

function MyForm() {
  return (
    <div>
      <Input placeholder="Name" />  {/* Adapter */}
      <MUIButton>Submit</MUIButton>  {/* Direct MUI */}
    </div>
  );
}

// Inconsistent - Input uses adapter, Button doesn't`}
      correctCode={`// ✅ DO: Use adapters consistently
import { Button, Input } from '../../adapters';

function MyForm() {
  return (
    <div>
      <Input placeholder="Name" />
      <Button>Submit</Button>
    </div>
  );
}

// All components use adapters = consistent provider usage`}
    >
      <div style={{ maxWidth: '400px' }}>
        <Stack spacing={2}>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            When you mix direct provider imports with adapters, you lose consistency and control.
          </p>
          <div style={{
            padding: '16px',
            backgroundColor: '#f9fafb',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
          }}>
            <Input placeholder="Adapter Input" fullWidth />
            <div style={{ marginTop: '8px' }}>
              <MUI.Button variant="contained">Direct MUI Button</MUI.Button>
            </div>
            <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#dc2626' }}>
              ❌ Inconsistent approach
            </p>
          </div>
        </Stack>
      </div>
    </DirectUsageDemo>
  ),
};

/**
 * Bypassing Adapter Fallbacks
 */
export const BypassingFallbacks: Story = {
  render: () => (
    <DirectUsageDemo
      title="Bypassing Adapter Fallbacks"
      description="Directly using provider components that may not exist"
      problem="If a component isn't available in the current provider (e.g., Timeline in MUI), direct usage will crash. Adapters automatically fallback to Internal or show a warning, preventing application crashes."
      solution="Adapters detect when a component isn't available and either fallback to an equivalent component from another provider or display a helpful warning. Your app never crashes due to missing components."
      antiPatternCode={`// ❌ DON'T: Direct provider usage without checking availability
import { Timeline } from '../../providers/mui';

function MyTimeline() {
  // CRASH! MUI Timeline might not be installed
  // or may not exist in the version you're using
  return (
    <Timeline>
      <TimelineItem>Event 1</TimelineItem>
      <TimelineItem>Event 2</TimelineItem>
    </Timeline>
  );
}

// Application crashes if Timeline isn't available`}
      correctCode={`// ✅ DO: Use adapter with automatic fallback
import { Timeline } from '../../adapters';

function MyTimeline() {
  // Adapter checks if MUI Timeline exists
  // If not, automatically falls back to Internal Timeline
  // If that doesn't exist, shows a helpful warning
  return (
    <Timeline provider="mui">
      <TimelineItem>Event 1</TimelineItem>
      <TimelineItem>Event 2</TimelineItem>
    </Timeline>
  );
}

// Never crashes! Falls back gracefully`}
    >
      <div style={{ maxWidth: '600px' }}>
        <div style={{
          padding: '16px',
          backgroundColor: '#f9fafb',
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
        }}>
          <h4 style={{ margin: '0 0 12px 0' }}>Adapter Fallback Flow</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ padding: '4px 8px', backgroundColor: '#e0e7ff', borderRadius: '4px', fontFamily: 'monospace', fontSize: '12px' }}>
                {'<Timeline provider="mui" />'}
              </div>
              <span>→</span>
              <span>Check if MUI Timeline exists</span>
            </div>
            <div style={{ marginLeft: '40px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✅ Exists?</span>
              <span>→</span>
              <span>Render MUI Timeline</span>
            </div>
            <div style={{ marginLeft: '40px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>❌ Missing?</span>
              <span>→</span>
              <span>Try Internal Timeline</span>
            </div>
            <div style={{ marginLeft: '80px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>✅ Exists?</span>
              <span>→</span>
              <span>Render Internal Timeline</span>
            </div>
            <div style={{ marginLeft: '80px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>❌ Missing?</span>
              <span>→</span>
              <span>Show warning badge</span>
            </div>
          </div>
          <p style={{ margin: '12px 0 0', padding: '12px', backgroundColor: '#f0fdf4', border: '1px solid #16a34a', borderRadius: '4px', color: '#166534', fontSize: '13px' }}>
            ✅ Application never crashes! Users always see something.
          </p>
        </div>
      </div>
    </DirectUsageDemo>
  ),
};

/**
 * No Type Safety
 */
export const NoTypeSafety: Story = {
  render: () => (
    <DirectUsageDemo
      title="Losing Type Safety"
      description="Direct provider usage loses unified type checking"
      problem="Each provider has different prop types. MUI's Button has different props than Internal's Button. Direct usage means you need to know each provider's specific types. TypeScript can't catch errors when you switch providers."
      solution="Adapters provide unified TypeScript types that work across all providers. One set of types, one API, full type safety regardless of which provider you're using."
      antiPatternCode={`// ❌ DON'T: Provider-specific types
import { Button as MUIButton } from '../../providers/mui';
import { Button as InternalButton } from '../../providers/internal';

// Different prop types for each provider!
<MUIButton variant="contained" color="primary">MUI</MUIButton>
<InternalButton type="primary" size="large">Internal</InternalButton>

// If you switch providers, TypeScript won't warn you
// about incompatible props until runtime`}
      correctCode={`// ✅ DO: Unified adapter types
import { Button } from '../../adapters';

// Same props work for all providers
<Button variant="contained" color="primary">
  Works with any provider
</Button>

// TypeScript validates props regardless of provider
// Switch providers without refactoring or type errors`}
    >
      <div style={{ maxWidth: '600px' }}>
        <Stack spacing={2}>
          <div style={{
            padding: '12px',
            backgroundColor: '#fee',
            border: '2px solid #dc2626',
            borderRadius: '8px',
          }}>
            <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#991b1b' }}>
              ❌ Without Adapters: Provider-Specific Types
            </p>
            <pre style={{
              margin: 0,
              padding: '8px',
              backgroundColor: '#1f2937',
              color: '#f9fafb',
              borderRadius: '4px',
              fontSize: '11px',
              overflow: 'auto',
            }}>
{`// MUI Button props
interface MUIButtonProps {
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'error';
  size?: 'small' | 'medium' | 'large';
}

// Internal Button props (different!)
interface InternalButtonProps {
  type?: 'default' | 'primary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
}`}
            </pre>
          </div>

          <div style={{
            padding: '12px',
            backgroundColor: '#f0fdf4',
            border: '2px solid #16a34a',
            borderRadius: '8px',
          }}>
            <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#166534' }}>
              ✅ With Adapters: Unified Types
            </p>
            <pre style={{
              margin: 0,
              padding: '8px',
              backgroundColor: '#1f2937',
              color: '#f9fafb',
              borderRadius: '4px',
              fontSize: '11px',
              overflow: 'auto',
            }}>
{`// Adapter Button props (works with all providers!)
interface AdapterButtonProps {
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'error';
  size?: 'small' | 'medium' | 'large';
  // Adapter translates to provider-specific props
}

// ONE interface, works everywhere`}
            </pre>
          </div>
        </Stack>
      </div>
    </DirectUsageDemo>
  ),
};

/**
 * Summary
 */
export const DirectUsageSummary: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '900px' }}>
      <h1 style={{ marginBottom: '24px' }}>❌ Direct Provider Usage Summary</h1>
      
      <div style={{ 
        padding: '20px',
        backgroundColor: '#fef2f2',
        border: '3px solid #dc2626',
        borderRadius: '12px',
        marginBottom: '32px',
      }}>
        <h3 style={{ marginTop: 0, color: '#991b1b' }}>❌ Never Import Directly from Providers</h3>
        <p style={{ margin: 0, color: '#991b1b', fontSize: '16px' }}>
          <strong>ALWAYS use adapters. NEVER import from providers/mui or providers/internal.</strong>
        </p>
      </div>

      <h2>Why Adapters Are Critical</h2>
      
      <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
        {[
          {
            benefit: 'Provider Switching',
            description: 'Switch from MUI to Ant Design globally without refactoring',
            example: 'Change config.provider from "mui" to "antd" - done!',
          },
          {
            benefit: 'Consistent API',
            description: 'One set of props works across all providers',
            example: '<Button variant="contained"> works with MUI, Internal, Ant Design',
          },
          {
            benefit: 'Automatic Fallbacks',
            description: 'Missing components fall back gracefully instead of crashing',
            example: 'MUI Timeline missing? Falls back to Internal Timeline',
          },
          {
            benefit: 'Type Safety',
            description: 'Unified TypeScript types prevent runtime errors',
            example: 'TypeScript catches prop mismatches regardless of provider',
          },
          {
            benefit: 'Future-Proof',
            description: 'Add new providers without refactoring existing code',
            example: 'Want Chakra UI? Update adapters, existing code still works',
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
            <h4 style={{ margin: '0 0 8px 0', color: '#16a34a' }}>✅ {item.benefit}</h4>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
              {item.description}
            </p>
            <p style={{ 
              margin: 0, 
              fontSize: '13px', 
              fontFamily: 'monospace', 
              backgroundColor: '#f0fdf4', 
              padding: '8px', 
              borderRadius: '4px',
              color: '#166534',
            }}>
              {item.example}
            </p>
          </div>
        ))}
      </div>

      <div style={{ 
        padding: '20px',
        backgroundColor: '#fffbeb',
        border: '2px solid #fbbf24',
        borderRadius: '12px',
        marginBottom: '20px',
      }}>
        <h3 style={{ marginTop: 0, color: '#92400e' }}>⚠️ When Direct Usage is Acceptable</h3>
        <ul style={{ margin: 0, color: '#78350f' }}>
          <li><strong>Provider comparison demos</strong> - Showing MUI vs Internal side-by-side</li>
          <li><strong>Unit tests</strong> - Testing specific provider implementations</li>
          <li><strong>Migration period</strong> - Temporary during refactoring (with comments explaining why)</li>
        </ul>
        <p style={{ margin: '12px 0 0', fontWeight: 'bold', color: '#92400e' }}>
          Even then, ALWAYS document WHY you're breaking the rule and add a TODO to fix it.
        </p>
      </div>

      <div style={{ 
        padding: '20px',
        backgroundColor: '#f0fdf4',
        border: '2px solid #16a34a',
        borderRadius: '12px',
      }}>
        <h3 style={{ marginTop: 0, color: '#166534' }}>✅ The Golden Rule</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ 
            padding: '16px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            border: '1px solid #bbf7d0',
          }}>
            <pre style={{ 
              margin: 0, 
              fontSize: '14px',
              color: '#166534',
            }}>
{`// ✅ ALWAYS DO THIS:
import { Button, Card, Input } from '../../adapters';

// ❌ NEVER DO THIS:
import { Button } from '../../providers/mui';
import { Card } from '../../providers/internal';`}
            </pre>
          </div>
          <p style={{ margin: 0, color: '#166534', fontSize: '15px' }}>
            <strong>Simple rule:</strong> If your import path includes <code>/providers/</code>, you're doing it wrong.
          </p>
        </div>
      </div>
    </div>
  ),
};
