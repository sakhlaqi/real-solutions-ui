import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  ValidationErrorDisplay,
  ValidationSuccessDisplay,
  parseZodErrors,
  AdapterWarningsDisplay,
  AdapterWarningsBadge,
  ErrorWarningOverlay,
  InlineErrorBanner,
  type AdapterWarning,
  type ValidationError,
} from '../../src/renderer';

/**
 * Error & Warning Display Components
 * 
 * Visual components for displaying validation errors and adapter warnings
 * inline in the Storybook UI without console-only feedback.
 */

const meta = {
  title: 'Renderer/Error & Warning Display',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Error & Warning Display System

Visual feedback components for JSON-driven page stories.

## Components

- **ValidationErrorDisplay**: Schema validation errors
- **ValidationSuccessDisplay**: Success indicator
- **AdapterWarningsDisplay**: Adapter fallback warnings
- **ErrorWarningOverlay**: Combined error/warning panel
- **InlineErrorBanner**: Full-width error banner

## Features

- ✅ Inline error visibility (no console diving)
- ✅ Dismissible warnings
- ✅ Collapsible panels
- ✅ Position-controlled overlays
- ✅ Color-coded by severity
- ✅ Non-blocking presentation
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Validation Errors
 */
export const ValidationErrors: Story = {
  render: () => {
    const errors: ValidationError[] = [
      {
        path: ['template', 'type'],
        message: 'Invalid enum value. Expected DashboardLayout | TwoColumnLayout | TabsLayout, received "NonExistentTemplate"',
        code: 'invalid_enum_value',
      },
      {
        path: ['template', 'slots', 'header', 'type'],
        message: 'Required field missing',
        code: 'invalid_type',
      },
      {
        path: ['version'],
        message: 'Expected string, received number',
        code: 'invalid_type',
      },
    ];

    return (
      <div style={{ padding: '20px' }}>
        <h2>Validation Error Display</h2>
        <p>Displays schema validation errors inline with structured format:</p>
        <ValidationErrorDisplay errors={errors} />
      </div>
    );
  },
};

/**
 * Success Indicator
 */
export const SuccessIndicator: Story = {
  render: () => {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Validation Success Display</h2>
        
        <h3>Full Banner</h3>
        <ValidationSuccessDisplay message="Schema validated successfully" />
        
        <h3 style={{ marginTop: '32px' }}>Compact Badge</h3>
        <ValidationSuccessDisplay message="Schema validated successfully" compact />
      </div>
    );
  },
};

/**
 * Adapter Warnings
 */
export const AdapterWarnings: Story = {
  render: () => {
    const [warnings, setWarnings] = useState<AdapterWarning[]>([
      {
        type: 'adapter-fallback',
        componentType: 'SearchGridComposite',
        requestedProvider: 'internal',
        fallbackProvider: 'mui',
        message: 'Internal adapter not found, falling back to MUI implementation',
        timestamp: 1718452800000, // Fixed: 2024-06-15 10:00:00
      },
      {
        type: 'template-not-found',
        componentType: 'CustomLayout',
        requestedProvider: 'mui',
        message: 'Template adapter for "CustomLayout" not found for provider "mui"',
        timestamp: 1718452801000, // Fixed: 2024-06-15 10:00:01
      },
    ]);

    return (
      <div style={{ padding: '20px', minHeight: '400px' }}>
        <h2>Adapter Warnings Display</h2>
        <p>Shows adapter fallback warnings in bottom-right corner (floating).</p>
        <p>Click the × button to dismiss individual warnings.</p>
        
        <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <strong>Simulated warnings:</strong>
          <ul>
            <li>SearchGridComposite adapter fallback (internal → MUI)</li>
            <li>CustomLayout template not found</li>
          </ul>
        </div>

        <AdapterWarningsDisplay
          warnings={warnings}
          onDismiss={(index) => {
            setWarnings(prev => prev.filter((_, i) => i !== index));
          }}
          position="bottom"
        />
      </div>
    );
  },
};

/**
 * Warning Badge
 */
export const WarningBadge: Story = {
  render: () => {
    const [count, setCount] = useState(3);

    return (
      <div style={{ padding: '20px', minHeight: '400px' }}>
        <h2>Adapter Warning Badge</h2>
        <p>Compact badge showing warning count in bottom-right corner.</p>
        <p>Click the badge to open full warning panel (not implemented in this demo).</p>
        
        <button
          onClick={() => setCount(c => Math.max(0, c - 1))}
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Dismiss 1 Warning
        </button>

        <AdapterWarningsBadge count={count} onClick={() => alert('Open warning panel')} />
      </div>
    );
  },
};

/**
 * Error/Warning Overlay
 */
export const ErrorWarningPanel: Story = {
  render: () => {
    const [warnings, setWarnings] = useState<AdapterWarning[]>([
      {
        type: 'adapter-fallback',
        componentType: 'HeaderComposite',
        requestedProvider: 'internal',
        fallbackProvider: 'mui',
        message: 'Internal adapter not found, using MUI fallback',
        timestamp: 1718452800000, // Fixed: 2024-06-15 10:00:00
      },
    ]);

    const errors: ValidationError[] = [
      {
        path: ['template', 'type'],
        message: 'Invalid template type',
        code: 'invalid_enum_value',
      },
    ];

    return (
      <div style={{ padding: '20px', minHeight: '600px' }}>
        <h2>Error & Warning Overlay</h2>
        <p>Combined panel showing both validation errors and adapter warnings.</p>
        <p>Located in bottom-right corner. Click the ▼ button to collapse.</p>
        
        <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <strong>Features:</strong>
          <ul>
            <li>Collapsible to minimize distraction</li>
            <li>Scrollable content for many errors/warnings</li>
            <li>Shows both errors and warnings in one panel</li>
            <li>Individual warning dismissal</li>
            <li>Position control (top-right, bottom-right, etc.)</li>
          </ul>
        </div>

        <ErrorWarningOverlay
          validationErrors={errors}
          adapterWarnings={warnings}
          onDismissWarning={(index) => {
            setWarnings(prev => prev.filter((_, i) => i !== index));
          }}
          position="bottom-right"
        />
      </div>
    );
  },
};

/**
 * Inline Error Banner
 */
export const InlineBanner: Story = {
  render: () => {
    const [dismissed, setDismissed] = useState(false);

    const errors: ValidationError[] = [
      {
        path: ['template', 'type'],
        message: 'Invalid template type',
        code: 'invalid_enum_value',
      },
      {
        path: ['version'],
        message: 'Expected string, received number',
        code: 'invalid_type',
      },
    ];

    if (dismissed) {
      return (
        <div style={{ padding: '20px' }}>
          <h2>Inline Error Banner</h2>
          <p>Banner dismissed! Reload story to see it again.</p>
        </div>
      );
    }

    return (
      <div style={{ padding: '20px' }}>
        <h2>Inline Error Banner</h2>
        <p>Full-width error banner displayed inline (not floating).</p>
        
        <InlineErrorBanner
          validationErrors={errors}
          onDismiss={() => setDismissed(true)}
        />
        
        <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f0fdf4', border: '1px solid #16a34a', borderRadius: '8px' }}>
          <p style={{ margin: 0, color: '#166534' }}>
            ✅ Page content continues below the error banner
          </p>
        </div>
      </div>
    );
  },
};

/**
 * All Components Combined
 */
export const AllComponents: Story = {
  render: () => {
    const [adapterWarnings, setAdapterWarnings] = useState<AdapterWarning[]>([
      {
        type: 'adapter-fallback',
        componentType: 'SidebarComposite',
        requestedProvider: 'internal',
        fallbackProvider: 'mui',
        message: 'Using MUI fallback adapter',
        timestamp: 1718452800000, // Fixed: 2024-06-15 10:00:00
      },
    ]);

    const validationErrors: ValidationError[] = [
      {
        path: ['template', 'slots', 'header'],
        message: 'Required field missing',
        code: 'invalid_type',
      },
    ];

    return (
      <div style={{ padding: '20px', minHeight: '700px' }}>
        <h2>All Error/Warning Components</h2>
        
        {/* Success Badge */}
        <div style={{ marginBottom: '20px' }}>
          <h3>Success Indicator</h3>
          <ValidationSuccessDisplay message="Components loaded successfully" compact />
        </div>
        
        {/* Validation Errors */}
        <div style={{ marginBottom: '20px' }}>
          <h3>Validation Errors</h3>
          <ValidationErrorDisplay errors={validationErrors} />
        </div>
        
        {/* Page Content */}
        <div style={{ padding: '32px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <h3>Page Content</h3>
          <p>This is the actual page content. Notice how errors are displayed above,
             and warnings float in the bottom-right corner without blocking this content.</p>
        </div>
        
        {/* Adapter Warnings (Floating) */}
        <AdapterWarningsDisplay
          warnings={adapterWarnings}
          onDismiss={(index) => {
            setAdapterWarnings(prev => prev.filter((_, i) => i !== index));
          }}
          position="bottom"
        />
      </div>
    );
  },
};
