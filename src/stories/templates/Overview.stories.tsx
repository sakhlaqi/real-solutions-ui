/**
 * Template Marketplace Overview Story
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { themePresetRegistry } from '../../core/theme';
import { 
  marketingPageTemplate,
  landingPageTemplate,
  blogTemplate,
  signInTemplate
} from '../../core/templates';

const templates = [
  {
    template: marketingPageTemplate,
    presetId: 'marketing-page-mui',
    category: 'Marketing',
    color: '#1976d2',
  },
  {
    template: landingPageTemplate,
    presetId: 'landing-page-mui',
    category: 'Landing',
    color: '#6366f1',
  },
  {
    template: blogTemplate,
    presetId: 'blog-mui',
    category: 'Content',
    color: '#2e7d32',
  },
  {
    template: signInTemplate,
    presetId: 'auth-mui',
    category: 'Authentication',
    color: '#1976d2',
  },
];

const TemplateMarketplace = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '3.5rem', fontWeight: 800 }}>
          Template Marketplace
        </h1>
        <p style={{ margin: '24px 0 0', fontSize: '1.5rem', opacity: 0.9, maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          Production-ready templates with theme presets and tenant customization support
        </p>
        <div style={{ marginTop: '40px', display: 'flex', gap: '32px', justifyContent: 'center', fontSize: '1.125rem' }}>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>{templates.length}</div>
            <div style={{ opacity: 0.8 }}>Templates</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>
              {templates.reduce((sum, t) => sum + Object.keys(t.template.pages).length, 0)}
            </div>
            <div style={{ opacity: 0.8 }}>Pages</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>4</div>
            <div style={{ opacity: 0.8 }}>Theme Presets</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '80px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '32px'
        }}>
          {templates.map(({ template, presetId, category, color }) => {
            const preset = themePresetRegistry.get(presetId);
            const sectionCount = Object.values(template.pages)
              .reduce((sum, page) => sum + Object.keys(page.sections).length, 0);

            return (
              <div key={template.id} style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                transition: 'transform 0.2s',
                cursor: 'pointer'
              }}>
                <div style={{ 
                  background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
                  color: 'white',
                  padding: '32px',
                  minHeight: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 700, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.1em',
                    opacity: 0.9,
                    marginBottom: '12px'
                  }}>
                    {category}
                  </div>
                  <h3 style={{ margin: '0 0 12px', fontSize: '1.75rem', fontWeight: 700 }}>
                    {template.metadata.title}
                  </h3>
                  <p style={{ margin: 0, opacity: 0.95, fontSize: '0.95rem' }}>
                    {template.metadata.description}
                  </p>
                </div>

                <div style={{ padding: '24px' }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                    marginBottom: '24px',
                    paddingBottom: '24px',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: color }}>
                        {Object.keys(template.pages).length}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase' }}>
                        Pages
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: color }}>
                        {sectionCount}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase' }}>
                        Sections
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: color }}>
                        {preset ? '✓' : '–'}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase' }}>
                        Theme
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                      Theme Preset
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', fontFamily: 'monospace' }}>
                      {presetId}
                    </div>
                  </div>

                  {preset && (
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                        Colors
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ 
                          flex: 1,
                          height: '32px',
                          background: preset.colors.primary,
                          borderRadius: '4px',
                          border: '1px solid #e5e7eb'
                        }} title={`Primary: ${preset.colors.primary}`}></div>
                        <div style={{ 
                          flex: 1,
                          height: '32px',
                          background: preset.colors.secondary,
                          borderRadius: '4px',
                          border: '1px solid #e5e7eb'
                        }} title={`Secondary: ${preset.colors.secondary}`}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ 
          marginTop: '80px',
          background: 'white',
          borderRadius: '16px',
          padding: '48px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
        }}>
          <h2 style={{ margin: '0 0 32px', fontSize: '2rem', fontWeight: 800 }}>
            Features
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            <div>
              <h3 style={{ margin: '0 0 12px', fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>
                🎨 Theme Presets
              </h3>
              <p style={{ margin: 0, color: '#64748b' }}>
                Pre-configured design tokens with colors, typography, spacing, and more
              </p>
            </div>
            <div>
              <h3 style={{ margin: '0 0 12px', fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>
                🔧 Tenant Customization
              </h3>
              <p style={{ margin: 0, color: '#64748b' }}>
                JSON-based overrides for fork-free customization
              </p>
            </div>
            <div>
              <h3 style={{ margin: '0 0 12px', fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>
                📱 Responsive Design
              </h3>
              <p style={{ margin: 0, color: '#64748b' }}>
                Mobile-first layouts that work on all devices
              </p>
            </div>
            <div>
              <h3 style={{ margin: '0 0 12px', fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>
                ✨ Production Ready
              </h3>
              <p style={{ margin: 0, color: '#64748b' }}>
                Battle-tested templates with TypeScript and full documentation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Templates/Overview',
  component: TemplateMarketplace,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Template Marketplace

Browse all available templates with their theme presets and customization options.

## Available Templates

1. **Marketing Page** - Professional corporate template
2. **Landing Page** - Bold, modern SaaS template  
3. **Blog** - Content-focused template with serif typography
4. **Sign-In** - Authentication pages for user flows

## Features

- **Theme Presets**: Each template has a pre-configured theme preset
- **Tenant Customization**: Fork-free customization via JSON overrides
- **Responsive**: Mobile-first design
- **Type-Safe**: Full TypeScript support
- **Documented**: Complete API documentation

## Interactive Controls

Use the toolbar to:
- **Theme**: Switch between theme presets
- **Mode**: Toggle light/dark mode
- **Viewport**: Test responsive layouts

## Getting Started

1. Browse templates in Storybook
2. Select a theme preset
3. Apply tenant customizations
4. Deploy your customized template
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TemplateMarketplace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Marketplace: Story = {};
