/**
 * Tenant Customization Stories
 * 
 * Interactive examples of tenant customization system
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { 
  applyTenantCustomization,
  type TenantCustomization 
} from '../../core/tenant';
import { 
  acmeCorpCustomization,
  techStartCustomization,
  greenLeafCustomization,
  secureAuthCustomization
} from '../../core/tenant/examples';

const TenantCustomizationShowcase = ({ tenantConfig }: { tenantConfig: TenantCustomization }) => {
  // Mock template data
  const mockTemplate = {
    id: tenantConfig.baseTemplate,
    metadata: {
      title: `${tenantConfig.baseTemplate} Template`,
      description: 'Base template description',
    },
    theme: {
      colors: {
        primary: '#1976d2',
        secondary: '#757575',
      },
      typography: {
        fontFamily: 'Roboto, sans-serif',
      },
    },
    pages: {
      home: {
        title: 'Home',
        sections: {
          hero: {
            props: {
              title: 'Default Title',
              subtitle: 'Default Subtitle',
              buttonText: 'Get Started',
            },
          },
        },
      },
    },
  };

  const result = applyTenantCustomization(mockTemplate, tenantConfig);
  const { customized, appliedPaths } = result;

  return (
    <div style={{ padding: '40px', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          marginBottom: '32px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
        }}>
          <h1 style={{ margin: '0 0 16px', fontSize: '2.5rem', fontWeight: 800 }}>
            {tenantConfig.tenantName}
          </h1>
          <p style={{ margin: '0 0 24px', fontSize: '1.125rem', color: '#64748b' }}>
            {tenantConfig.metadata?.description}
          </p>
          <div style={{ display: 'flex', gap: '32px', fontSize: '0.875rem' }}>
            <div>
              <span style={{ fontWeight: 600, color: '#6b7280' }}>Tenant ID:</span>{' '}
              <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{tenantConfig.tenantId}</span>
            </div>
            <div>
              <span style={{ fontWeight: 600, color: '#6b7280' }}>Base Template:</span>{' '}
              <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{tenantConfig.baseTemplate}</span>
            </div>
            <div>
              <span style={{ fontWeight: 600, color: '#6b7280' }}>Overrides:</span>{' '}
              <span style={{ fontFamily: 'monospace', color: '#1e293b' }}>{appliedPaths.length}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
          {/* Preview */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}>
            <div style={{ 
              background: customized.theme?.colors?.primary || '#1976d2',
              color: 'white',
              padding: '48px 32px',
              textAlign: 'center'
            }}>
              <h2 style={{ 
                margin: '0 0 16px', 
                fontSize: '2rem',
                fontFamily: customized.theme?.typography?.fontFamily || 'Roboto, sans-serif'
              }}>
                {customized.pages?.home?.sections?.hero?.props?.title || 'Default Title'}
              </h2>
              <p style={{ margin: '0 0 24px', fontSize: '1.125rem', opacity: 0.95 }}>
                {customized.pages?.home?.sections?.hero?.props?.subtitle || 'Default Subtitle'}
              </p>
              <button style={{
                background: customized.theme?.colors?.secondary || '#757575',
                color: 'white',
                padding: '12px 32px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}>
                {customized.pages?.home?.sections?.hero?.props?.buttonText || 'Get Started'}
              </button>
            </div>

            <div style={{ padding: '32px' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '1.25rem', fontWeight: 700 }}>
                Customized Theme
              </h3>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    height: '60px',
                    background: customized.theme?.colors?.primary,
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}></div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '8px', textAlign: 'center' }}>
                    Primary
                  </div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#9ca3af', textAlign: 'center' }}>
                    {customized.theme?.colors?.primary}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    height: '60px',
                    background: customized.theme?.colors?.secondary,
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}></div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '8px', textAlign: 'center' }}>
                    Secondary
                  </div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#9ca3af', textAlign: 'center' }}>
                    {customized.theme?.colors?.secondary}
                  </div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6b7280', marginBottom: '8px' }}>
                  Font Family
                </div>
                <div style={{ 
                  fontFamily: customized.theme?.typography?.fontFamily,
                  fontSize: '1.125rem',
                  color: '#1e293b'
                }}>
                  {customized.theme?.typography?.fontFamily || 'Not customized'}
                </div>
              </div>
            </div>
          </div>

          {/* Overrides */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '1.25rem', fontWeight: 700 }}>
              Applied Overrides ({appliedPaths.length})
            </h3>
            <div style={{ 
              maxHeight: '500px',
              overflowY: 'auto',
              fontSize: '0.875rem'
            }}>
              {appliedPaths.map((path, idx) => (
                <div key={idx} style={{
                  padding: '12px',
                  background: idx % 2 === 0 ? '#f8fafc' : 'white',
                  borderLeft: '3px solid #3b82f6',
                  marginBottom: '8px',
                  borderRadius: '4px'
                }}>
                  <div style={{ fontFamily: 'monospace', color: '#1e293b', fontWeight: 600, marginBottom: '4px' }}>
                    {path}
                  </div>
                  <div style={{ fontFamily: 'monospace', color: '#64748b', fontSize: '0.75rem' }}>
                    {JSON.stringify(tenantConfig.overrides[path])}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* JSON Configuration */}
        <div style={{
          background: '#1e293b',
          color: '#e2e8f0',
          borderRadius: '16px',
          padding: '32px',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          overflow: 'auto'
        }}>
          <div style={{ marginBottom: '16px', fontSize: '1rem', fontWeight: 700, color: 'white' }}>
            Tenant Configuration JSON
          </div>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(tenantConfig, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Customization/Tenants',
  component: TenantCustomizationShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Tenant Customization

Fork-free customization system that allows tenants to override template properties via JSON.

## Features

- **JSON Override System**: Use dot notation paths for precise customization
- **Runtime Application**: Apply overrides at render time, no code changes
- **Schema Validation**: Validate overrides against template schemas
- **Upgrade Safe**: Overrides merge with template updates

## Example Tenants

- **Acme Corp**: Marketing page with orange branding
- **TechStart**: Landing page with purple/cyan colors
- **GreenLeaf**: Blog with environmental green theme
- **SecureAuth**: Authentication pages with security blue

## Usage

\`\`\`typescript
const tenantConfig = {
  tenantId: 'acme',
  baseTemplate: 'marketing-page',
  overrides: {
    'theme.colors.primary': '#ff5722',
    'pages.home.sections.hero.props.title': 'Welcome to Acme'
  }
};

const result = applyTenantCustomization(template, tenantConfig);
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TenantCustomizationShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AcmeCorp: Story = {
  args: {
    tenantConfig: acmeCorpCustomization,
  },
};

export const TechStart: Story = {
  args: {
    tenantConfig: techStartCustomization,
  },
};

export const GreenLeaf: Story = {
  args: {
    tenantConfig: greenLeafCustomization,
  },
};

export const SecureAuth: Story = {
  args: {
    tenantConfig: secureAuthCustomization,
  },
};
