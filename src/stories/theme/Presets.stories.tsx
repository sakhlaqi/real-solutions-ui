/**
 * Theme Preset Stories
 * 
 * Interactive showcase of all theme presets with live switching
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { themePresetRegistry } from '../../core/theme';

const ThemePresetShowcase = () => {
  const allPresets = themePresetRegistry.getAll();

  return (
    <div style={{ padding: '40px', background: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '16px', color: '#1e293b' }}>
          Theme Presets
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#64748b', marginBottom: '60px' }}>
          Pre-configured design token systems for templates. Use the toolbar above to switch themes.
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: '32px'
        }}>
          {allPresets.map((preset) => (
            <div key={preset.id} style={{
              background: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}>
              {/* Color Preview */}
              <div style={{ 
                height: '120px',
                background: `linear-gradient(135deg, ${preset.colors.primary} 0%, ${preset.colors.primaryDark} 100%)`,
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  display: 'flex',
                  gap: '8px'
                }}>
                  <div style={{ flex: 1, height: '32px', background: preset.colors.primary, borderRadius: '4px', border: '2px solid white' }}></div>
                  <div style={{ flex: 1, height: '32px', background: preset.colors.secondary, borderRadius: '4px', border: '2px solid white' }}></div>
                </div>
              </div>

              <div style={{ padding: '24px' }}>
                <h3 style={{ margin: '0 0 8px', fontSize: '1.5rem', fontWeight: 700, color: preset.colors.primary }}>
                  {preset.name}
                </h3>
                <div style={{ fontSize: '0.875rem', color: '#9ca3af', fontFamily: 'monospace', marginBottom: '20px' }}>
                  {preset.id}
                </div>

                {/* Typography Preview */}
                <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', marginBottom: '12px', textTransform: 'uppercase' }}>
                    Typography
                  </div>
                  <div style={{ fontFamily: preset.typography.fontFamily, fontSize: preset.typography.h1.fontSize, fontWeight: preset.typography.h1.fontWeight, color: '#1e293b', lineHeight: 1.2 }}>
                    Heading
                  </div>
                  <div style={{ fontFamily: preset.typography.fontFamily, fontSize: preset.typography.body.fontSize, color: '#64748b', marginTop: '8px' }}>
                    {preset.typography.fontFamily} • {preset.typography.fontSize}px base
                  </div>
                </div>

                {/* Design Tokens */}
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '16px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase' }}>
                      Spacing Unit
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>
                      {preset.spacing.unit}px
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase' }}>
                      Border Radius
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>
                      {preset.radius.md}px
                    </div>
                  </div>
                </div>

                {/* Color Swatches */}
                <div style={{ marginTop: '20px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', marginBottom: '12px', textTransform: 'uppercase' }}>
                    Color Palette
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                    {[
                      { color: preset.colors.primary, label: 'Primary' },
                      { color: preset.colors.secondary, label: 'Secondary' },
                      { color: preset.colors.success, label: 'Success' },
                      { color: preset.colors.error, label: 'Error' },
                    ].map(({ color, label }) => (
                      <div key={label}>
                        <div style={{ 
                          height: '40px', 
                          background: color, 
                          borderRadius: '6px',
                          border: '1px solid #e5e7eb'
                        }}></div>
                        <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '4px', textAlign: 'center' }}>
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Design Token Reference */}
        <div style={{ 
          marginTop: '60px',
          background: 'white',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
        }}>
          <h2 style={{ margin: '0 0 24px', fontSize: '2rem', fontWeight: 800 }}>
            Design Token System
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
            <div>
              <h3 style={{ margin: '0 0 12px', fontSize: '1.125rem', fontWeight: 700, color: '#1e293b' }}>
                Colors
              </h3>
              <ul style={{ margin: 0, padding: '0 0 0 20px', color: '#64748b' }}>
                <li>Primary (with light, dark, contrast)</li>
                <li>Secondary (with light, dark, contrast)</li>
                <li>Background, Surface, Paper</li>
                <li>Text (primary, secondary, disabled)</li>
                <li>Status (success, warning, error, info)</li>
                <li>UI (border, divider, overlay)</li>
              </ul>
            </div>
            <div>
              <h3 style={{ margin: '0 0 12px', fontSize: '1.125rem', fontWeight: 700, color: '#1e293b' }}>
                Typography
              </h3>
              <ul style={{ margin: 0, padding: '0 0 0 20px', color: '#64748b' }}>
                <li>Font family</li>
                <li>Base size & weight</li>
                <li>Heading scales (h1-h6)</li>
                <li>Body & caption styles</li>
                <li>Line heights</li>
                <li>Letter spacing</li>
              </ul>
            </div>
            <div>
              <h3 style={{ margin: '0 0 12px', fontSize: '1.125rem', fontWeight: 700, color: '#1e293b' }}>
                Spacing
              </h3>
              <ul style={{ margin: 0, padding: '0 0 0 20px', color: '#64748b' }}>
                <li>Unit-based (8px default)</li>
                <li>Scale: xs, sm, md, lg, xl</li>
                <li>Extended: 2xl, 3xl</li>
              </ul>
            </div>
            <div>
              <h3 style={{ margin: '0 0 12px', fontSize: '1.125rem', fontWeight: 700, color: '#1e293b' }}>
                Other Tokens
              </h3>
              <ul style={{ margin: 0, padding: '0 0 0 20px', color: '#64748b' }}>
                <li>Border radius (none to full)</li>
                <li>Shadows (none to 2xl)</li>
                <li>Breakpoints (xs to 2xl)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Theme/Presets',
  component: ThemePresetShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Theme Presets

Pre-configured design token systems that provide consistent theming across templates.

## Available Presets

- **Marketing Page** (marketing-page-mui): Professional blue theme
- **Landing Page** (landing-page-mui): Bold indigo with pink accents  
- **Blog** (blog-mui): Clean green with serif typography
- **Auth** (auth-mui): Trustworthy blue for authentication

## Design Tokens

Each preset includes:
- **Colors**: Primary, secondary, backgrounds, text, status, UI
- **Typography**: Font families, sizes, weights, scales
- **Spacing**: Unit-based system (8px default)
- **Radius**: Border radius scale
- **Shadows**: Shadow elevation scale
- **Breakpoints**: Responsive breakpoints

## Usage

\`\`\`typescript
import { themePresetRegistry } from '@real-solutions/ui/core/theme';

const preset = themePresetRegistry.get('marketing-page-mui');
\`\`\`

## Interactive

Use the **Theme** toolbar control above to switch between presets and see the visual differences.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemePresetShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {};

export const Comparison: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Compare all theme presets side-by-side. Switch themes using the toolbar.',
      },
    },
  },
};
