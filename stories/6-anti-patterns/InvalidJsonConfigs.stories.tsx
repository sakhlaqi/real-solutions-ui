import type { Meta, StoryObj } from '@storybook/react';
import { validatePageConfig } from '../../src/schema';
import { ValidationErrorDisplay } from '../../src/renderer/ValidationDisplay';

/**
 * Anti-Pattern: Invalid JSON Configurations
 * 
 * Demonstrates what happens when JSON page configs violate the schema.
 * Each story shows the validation error and explains the correct approach.
 */

const meta = {
  title: 'Anti-Patterns/Invalid JSON Configs',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# ❌ Anti-Pattern: Invalid JSON Configurations

This section demonstrates **common mistakes** when writing JSON page configs.

## Why This Matters

- **Prevents runtime crashes** - Validation catches errors early
- **Clear error messages** - Know exactly what's wrong and where
- **Type safety** - Schema ensures configs match expected structure
- **Educational** - Learn from mistakes without breaking production

## ✅ Correct Pattern

Always validate configs before rendering.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Helper component to show validation errors
 */
function InvalidConfigDemo({
  title,
  description,
  invalidConfig,
  correctConfig,
  explanation,
}: {
  title: string;
  description: string;
  invalidConfig: any;
  correctConfig: any;
  explanation: string;
}) {
  // Validate the invalid config to get errors
  const result = validatePageConfig(invalidConfig);
  
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

      {/* Show validation errors */}
      {!result.success && (
        <div style={{ marginBottom: '20px' }}>
          <ValidationErrorDisplay
            errors={result.error.errors}
            title="Schema Validation Failed"
            collapsible={false}
          />
        </div>
      )}

      <div style={{
        padding: '16px',
        backgroundColor: '#fffbeb',
        border: '2px solid #fcd34d',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <p style={{ margin: 0, color: '#78350f' }}>
          <strong>⚠️ Why this fails:</strong> {explanation}
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
          ❌ Invalid Config
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
          {JSON.stringify(invalidConfig, null, 2)}
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
          ✅ Correct Config
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
          {JSON.stringify(correctConfig, null, 2)}
        </pre>
      </details>
    </div>
  );
}

/**
 * Missing Required Fields
 */
export const MissingRequiredFields: Story = {
  render: () => (
    <InvalidConfigDemo
      title="Missing Required Fields"
      description="Template is missing required 'type' property"
      explanation="Every template must have a 'type' field that specifies which component to render. Without it, the renderer doesn't know what to create."
      invalidConfig={{
        metadata: {
          title: 'Dashboard',
          version: '1.0',
        },
        template: {
          props: {
            title: 'My Dashboard',
          },
        },
      }}
      correctConfig={{
        metadata: {
          title: 'Dashboard',
          version: '1.0',
        },
        template: {
          type: 'container',
          props: {
            title: 'My Dashboard',
          },
        },
      }}
    />
  ),
};

/**
 * Invalid Template Type
 */
export const InvalidTemplateType: Story = {
  render: () => (
    <InvalidConfigDemo
      title="Invalid Template Type"
      description="Template type 'superButton' doesn't exist"
      explanation="The 'type' field must match one of the supported component types (button, card, input, etc.). Typos or custom types that aren't registered will fail validation."
      invalidConfig={{
        metadata: {
          title: 'Form',
          version: '1.0',
        },
        template: {
          type: 'superButton',
          props: {
            label: 'Click Me',
          },
        },
      }}
      correctConfig={{
        metadata: {
          title: 'Form',
          version: '1.0',
        },
        template: {
          type: 'button',
          props: {
            children: 'Click Me',
            variant: 'contained',
          },
        },
      }}
    />
  ),
};

/**
 * Wrong Data Types
 */
export const WrongDataTypes: Story = {
  render: () => (
    <InvalidConfigDemo
      title="Wrong Data Types"
      description="Props have incorrect types (string instead of number, etc.)"
      explanation="Schema validation enforces type safety. If a prop expects a number but receives a string, validation fails. This prevents runtime type errors."
      invalidConfig={{
        metadata: {
          title: 'Settings',
          version: '1.0',
        },
        template: {
          type: 'stack',
          props: {
            spacing: 'two',
            direction: 123,
            padding: true,
          },
          children: [],
        },
      }}
      correctConfig={{
        metadata: {
          title: 'Settings',
          version: '1.0',
        },
        template: {
          type: 'stack',
          props: {
            spacing: 2,
            direction: 'column',
            padding: '16px',
          },
          children: [],
        },
      }}
    />
  ),
};

/**
 * Missing Metadata
 */
export const MissingMetadata: Story = {
  render: () => (
    <InvalidConfigDemo
      title="Missing Metadata"
      description="Config is missing required metadata section"
      explanation="Every page config must have a 'metadata' section with at least 'title' and 'version'. This provides essential information about the page."
      invalidConfig={{
        template: {
          type: 'container',
          props: {
            title: 'My Page',
          },
        },
      }}
      correctConfig={{
        metadata: {
          title: 'My Page',
          version: '1.0',
        },
        template: {
          type: 'container',
          props: {
            title: 'My Page',
          },
        },
      }}
    />
  ),
};
