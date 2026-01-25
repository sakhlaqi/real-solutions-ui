/**
 * Design Tokens Storybook Story
 * 
 * Visualizes the complete design token system with all categories
 * and demonstrates token consumption via useTokens hook.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useTokens } from '../src/core/context/useTokens';
import { UIProvider } from '../src/core/context/UIProvider';

/**
 * Token Display Component
 * 
 * Demonstrates how to consume design tokens in components
 */
function TokenDisplay() {
  const tokens = useTokens();

  return (
    <div style={{ padding: '2rem', fontFamily: tokens.typography.fontFamily.base }}>
      <h1 style={{ 
        fontSize: tokens.typography.fontSize['3xl'], 
        fontWeight: tokens.typography.fontWeight.bold,
        marginBottom: tokens.spacing.xl,
        color: tokens.colors.text.primary,
      }}>
        Design Tokens Showcase
      </h1>

      {/* Colors Section */}
      <section style={{ marginBottom: tokens.spacing['2xl'] }}>
        <h2 style={{ 
          fontSize: tokens.typography.fontSize['2xl'],
          fontWeight: tokens.typography.fontWeight.semibold,
          marginBottom: tokens.spacing.lg,
          color: tokens.colors.text.primary,
        }}>
          Colors
        </h2>

        {/* Brand Colors */}
        <div style={{ marginBottom: tokens.spacing.lg }}>
          <h3 style={{ 
            fontSize: tokens.typography.fontSize.lg,
            fontWeight: tokens.typography.fontWeight.medium,
            marginBottom: tokens.spacing.md,
            color: tokens.colors.text.secondary,
          }}>
            Brand
          </h3>
          <div style={{ display: 'flex', gap: tokens.spacing.md, flexWrap: 'wrap' }}>
            {Object.entries(tokens.colors.brand).map(([name, value]) => (
              <div key={name} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: value,
                    borderRadius: tokens.radius.md,
                    boxShadow: tokens.shadows.md,
                    marginBottom: tokens.spacing.sm,
                  }}
                />
                <div style={{ 
                  fontSize: tokens.typography.fontSize.sm,
                  color: tokens.colors.text.secondary,
                }}>
                  {name}
                </div>
                <div style={{ 
                  fontSize: tokens.typography.fontSize.xs,
                  fontFamily: tokens.typography.fontFamily.mono,
                  color: tokens.colors.text.disabled,
                }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Background Colors */}
        <div style={{ marginBottom: tokens.spacing.lg }}>
          <h3 style={{ 
            fontSize: tokens.typography.fontSize.lg,
            fontWeight: tokens.typography.fontWeight.medium,
            marginBottom: tokens.spacing.md,
            color: tokens.colors.text.secondary,
          }}>
            Background
          </h3>
          <div style={{ display: 'flex', gap: tokens.spacing.md, flexWrap: 'wrap' }}>
            {Object.entries(tokens.colors.background).map(([name, value]) => (
              <div key={name} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: value,
                    border: `1px solid ${tokens.colors.border.default}`,
                    borderRadius: tokens.radius.md,
                    boxShadow: tokens.shadows.md,
                    marginBottom: tokens.spacing.sm,
                  }}
                />
                <div style={{ 
                  fontSize: tokens.typography.fontSize.sm,
                  color: tokens.colors.text.secondary,
                }}>
                  {name}
                </div>
                <div style={{ 
                  fontSize: tokens.typography.fontSize.xs,
                  fontFamily: tokens.typography.fontFamily.mono,
                  color: tokens.colors.text.disabled,
                }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* State Colors */}
        <div style={{ marginBottom: tokens.spacing.lg }}>
          <h3 style={{ 
            fontSize: tokens.typography.fontSize.lg,
            fontWeight: tokens.typography.fontWeight.medium,
            marginBottom: tokens.spacing.md,
            color: tokens.colors.text.secondary,
          }}>
            State
          </h3>
          <div style={{ display: 'flex', gap: tokens.spacing.md, flexWrap: 'wrap' }}>
            {Object.entries(tokens.colors.state).map(([name, value]) => (
              <div key={name} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: value,
                    borderRadius: tokens.radius.md,
                    boxShadow: tokens.shadows.md,
                    marginBottom: tokens.spacing.sm,
                  }}
                />
                <div style={{ 
                  fontSize: tokens.typography.fontSize.sm,
                  color: tokens.colors.text.secondary,
                }}>
                  {name}
                </div>
                <div style={{ 
                  fontSize: tokens.typography.fontSize.xs,
                  fontFamily: tokens.typography.fontFamily.mono,
                  color: tokens.colors.text.disabled,
                }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section style={{ marginBottom: tokens.spacing['2xl'] }}>
        <h2 style={{ 
          fontSize: tokens.typography.fontSize['2xl'],
          fontWeight: tokens.typography.fontWeight.semibold,
          marginBottom: tokens.spacing.lg,
          color: tokens.colors.text.primary,
        }}>
          Typography
        </h2>

        {/* Font Sizes */}
        <div style={{ marginBottom: tokens.spacing.lg }}>
          <h3 style={{ 
            fontSize: tokens.typography.fontSize.lg,
            fontWeight: tokens.typography.fontWeight.medium,
            marginBottom: tokens.spacing.md,
            color: tokens.colors.text.secondary,
          }}>
            Font Sizes
          </h3>
          {Object.entries(tokens.typography.fontSize).map(([name, value]) => (
            <div key={name} style={{ marginBottom: tokens.spacing.sm }}>
              <span style={{ 
                fontSize: value,
                color: tokens.colors.text.primary,
              }}>
                {name} - The quick brown fox jumps over the lazy dog
              </span>
              <span style={{ 
                fontSize: tokens.typography.fontSize.xs,
                fontFamily: tokens.typography.fontFamily.mono,
                color: tokens.colors.text.disabled,
                marginLeft: tokens.spacing.md,
              }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Font Weights */}
        <div style={{ marginBottom: tokens.spacing.lg }}>
          <h3 style={{ 
            fontSize: tokens.typography.fontSize.lg,
            fontWeight: tokens.typography.fontWeight.medium,
            marginBottom: tokens.spacing.md,
            color: tokens.colors.text.secondary,
          }}>
            Font Weights
          </h3>
          {Object.entries(tokens.typography.fontWeight).map(([name, value]) => (
            <div key={name} style={{ marginBottom: tokens.spacing.sm }}>
              <span style={{ 
                fontWeight: value,
                color: tokens.colors.text.primary,
              }}>
                {name} - The quick brown fox jumps over the lazy dog
              </span>
              <span style={{ 
                fontSize: tokens.typography.fontSize.xs,
                fontFamily: tokens.typography.fontFamily.mono,
                color: tokens.colors.text.disabled,
                marginLeft: tokens.spacing.md,
              }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing Section */}
      <section style={{ marginBottom: tokens.spacing['2xl'] }}>
        <h2 style={{ 
          fontSize: tokens.typography.fontSize['2xl'],
          fontWeight: tokens.typography.fontWeight.semibold,
          marginBottom: tokens.spacing.lg,
          color: tokens.colors.text.primary,
        }}>
          Spacing
        </h2>
        <div style={{ display: 'flex', gap: tokens.spacing.md, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          {Object.entries(tokens.spacing).map(([name, value]) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: value,
                  height: value,
                  backgroundColor: tokens.colors.brand.primary,
                  marginBottom: tokens.spacing.sm,
                  borderRadius: tokens.radius.sm,
                }}
              />
              <div style={{ 
                fontSize: tokens.typography.fontSize.sm,
                color: tokens.colors.text.secondary,
              }}>
                {name}
              </div>
              <div style={{ 
                fontSize: tokens.typography.fontSize.xs,
                fontFamily: tokens.typography.fontFamily.mono,
                color: tokens.colors.text.disabled,
              }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Border Radius Section */}
      <section style={{ marginBottom: tokens.spacing['2xl'] }}>
        <h2 style={{ 
          fontSize: tokens.typography.fontSize['2xl'],
          fontWeight: tokens.typography.fontWeight.semibold,
          marginBottom: tokens.spacing.lg,
          color: tokens.colors.text.primary,
        }}>
          Border Radius
        </h2>
        <div style={{ display: 'flex', gap: tokens.spacing.md, flexWrap: 'wrap' }}>
          {Object.entries(tokens.radius).map(([name, value]) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  backgroundColor: tokens.colors.brand.primary,
                  borderRadius: value,
                  marginBottom: tokens.spacing.sm,
                }}
              />
              <div style={{ 
                fontSize: tokens.typography.fontSize.sm,
                color: tokens.colors.text.secondary,
              }}>
                {name}
              </div>
              <div style={{ 
                fontSize: tokens.typography.fontSize.xs,
                fontFamily: tokens.typography.fontFamily.mono,
                color: tokens.colors.text.disabled,
              }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shadows Section */}
      <section style={{ marginBottom: tokens.spacing['2xl'] }}>
        <h2 style={{ 
          fontSize: tokens.typography.fontSize['2xl'],
          fontWeight: tokens.typography.fontWeight.semibold,
          marginBottom: tokens.spacing.lg,
          color: tokens.colors.text.primary,
        }}>
          Shadows
        </h2>
        <div style={{ display: 'flex', gap: tokens.spacing.lg, flexWrap: 'wrap' }}>
          {Object.entries(tokens.shadows).map(([name, value]) => (
            <div key={name} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  backgroundColor: tokens.colors.background.primary,
                  borderRadius: tokens.radius.lg,
                  boxShadow: value,
                  marginBottom: tokens.spacing.sm,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: tokens.colors.text.secondary,
                  fontSize: tokens.typography.fontSize.sm,
                }}
              >
                {name}
              </div>
              <div style={{ 
                fontSize: tokens.typography.fontSize.xs,
                fontFamily: tokens.typography.fontFamily.mono,
                color: tokens.colors.text.disabled,
                maxWidth: '120px',
                wordBreak: 'break-all',
              }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/**
 * Storybook Meta Configuration
 */
const meta: Meta<typeof TokenDisplay> = {
  title: 'Theme/Design Tokens',
  component: TokenDisplay,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete visualization of the design token system. Demonstrates all token categories and how to consume them via the useTokens() hook.',
      },
    },
  },
  decorators: [
    (Story) => (
      <UIProvider provider="mui">
        <Story />
      </UIProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TokenDisplay>;

/**
 * Default Story - Light Mode
 * 
 * Shows all design tokens in light mode (default)
 */
export const LightMode: Story = {};

/**
 * Dark Mode Story
 * 
 * Shows all design tokens in dark mode
 * Demonstrates how tokens change based on mode
 */
export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#121212', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};
