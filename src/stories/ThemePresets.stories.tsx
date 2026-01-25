/**
 * Theme Presets Storybook Story
 * 
 * Visualizes all official theme presets with mode comparisons
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { UIProvider } from '../src/core/context/UIProvider';
import { ThemeRegistry } from '../src/theme/registry';
import { useTokens } from '../src/core/context/useTokens';
import type { Theme } from '../src/theme.types';

/**
 * Theme Preset Viewer Component
 */
function ThemePresetViewer() {
  const [selectedThemeId, setSelectedThemeId] = useState('default');
  const [selectedMode, setSelectedMode] = useState<string | undefined>(undefined);
  
  const allThemes = ThemeRegistry.getAll();
  const selectedTheme = ThemeRegistry.getById(selectedThemeId);
  const supportedModes = selectedTheme ? ThemeRegistry.getSupportedModes(selectedThemeId) : [];
  
  const tokens = useTokens();

  if (!selectedTheme) {
    return <div>Theme not found</div>;
  }

  return (
    <div style={{ 
      padding: tokens.spacing.xl,
      backgroundColor: tokens.colors.background.primary,
      minHeight: '100vh',
    }}>
      {/* Header */}
      <div style={{ marginBottom: tokens.spacing['2xl'] }}>
        <h1 style={{ 
          fontSize: tokens.typography.fontSize['3xl'],
          fontWeight: tokens.typography.fontWeight.bold,
          marginBottom: tokens.spacing.md,
          color: tokens.colors.text.primary,
        }}>
          Theme Presets
        </h1>
        <p style={{ 
          fontSize: tokens.typography.fontSize.lg,
          color: tokens.colors.text.secondary,
        }}>
          Official built-in themes with mode support
        </p>
      </div>

      {/* Theme Selector */}
      <div style={{ 
        marginBottom: tokens.spacing.xl,
        padding: tokens.spacing.lg,
        backgroundColor: tokens.colors.background.secondary,
        borderRadius: tokens.radius.lg,
        boxShadow: tokens.shadows.sm,
      }}>
        <label style={{ 
          display: 'block',
          fontSize: tokens.typography.fontSize.sm,
          fontWeight: tokens.typography.fontWeight.medium,
          marginBottom: tokens.spacing.sm,
          color: tokens.colors.text.secondary,
        }}>
          Select Theme Preset
        </label>
        <select
          value={selectedThemeId}
          onChange={(e) => {
            setSelectedThemeId(e.target.value);
            setSelectedMode(undefined);
          }}
          style={{ 
            width: '100%',
            padding: tokens.spacing.md,
            fontSize: tokens.typography.fontSize.base,
            borderRadius: tokens.radius.md,
            border: `1px solid ${tokens.colors.border.default}`,
            backgroundColor: tokens.colors.background.primary,
            color: tokens.colors.text.primary,
          }}
        >
          {allThemes.map((theme) => (
            <option key={theme.meta.id} value={theme.meta.id}>
              {theme.meta.name} (v{theme.meta.version})
            </option>
          ))}
        </select>

        {/* Mode Selector */}
        {supportedModes.length > 0 && (
          <div style={{ marginTop: tokens.spacing.lg }}>
            <label style={{ 
              display: 'block',
              fontSize: tokens.typography.fontSize.sm,
              fontWeight: tokens.typography.fontWeight.medium,
              marginBottom: tokens.spacing.sm,
              color: tokens.colors.text.secondary,
            }}>
              Select Mode
            </label>
            <div style={{ display: 'flex', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedMode(undefined)}
                style={{
                  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
                  fontSize: tokens.typography.fontSize.sm,
                  borderRadius: tokens.radius.md,
                  border: selectedMode === undefined 
                    ? `2px solid ${tokens.colors.brand.primary}`
                    : `1px solid ${tokens.colors.border.default}`,
                  backgroundColor: selectedMode === undefined
                    ? tokens.colors.brand.primary
                    : tokens.colors.background.primary,
                  color: selectedMode === undefined
                    ? tokens.colors.text.inverse
                    : tokens.colors.text.primary,
                  cursor: 'pointer',
                  fontWeight: selectedMode === undefined 
                    ? tokens.typography.fontWeight.semibold 
                    : tokens.typography.fontWeight.normal,
                }}
              >
                Base (No Mode)
              </button>
              {supportedModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedMode(mode)}
                  style={{
                    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
                    fontSize: tokens.typography.fontSize.sm,
                    borderRadius: tokens.radius.md,
                    border: selectedMode === mode 
                      ? `2px solid ${tokens.colors.brand.primary}`
                      : `1px solid ${tokens.colors.border.default}`,
                    backgroundColor: selectedMode === mode
                      ? tokens.colors.brand.primary
                      : tokens.colors.background.primary,
                    color: selectedMode === mode
                      ? tokens.colors.text.inverse
                      : tokens.colors.text.primary,
                    cursor: 'pointer',
                    fontWeight: selectedMode === mode 
                      ? tokens.typography.fontWeight.semibold 
                      : tokens.typography.fontWeight.normal,
                  }}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Theme Metadata */}
      <div style={{ 
        marginBottom: tokens.spacing.xl,
        padding: tokens.spacing.lg,
        backgroundColor: tokens.colors.background.secondary,
        borderRadius: tokens.radius.lg,
        boxShadow: tokens.shadows.sm,
      }}>
        <h2 style={{ 
          fontSize: tokens.typography.fontSize.xl,
          fontWeight: tokens.typography.fontWeight.semibold,
          marginBottom: tokens.spacing.md,
          color: tokens.colors.text.primary,
        }}>
          Theme Metadata
        </h2>
        <dl style={{ 
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: tokens.spacing.md,
          fontSize: tokens.typography.fontSize.sm,
        }}>
          <dt style={{ fontWeight: tokens.typography.fontWeight.medium, color: tokens.colors.text.secondary }}>
            ID:
          </dt>
          <dd style={{ color: tokens.colors.text.primary, fontFamily: tokens.typography.fontFamily.mono }}>
            {selectedTheme.meta.id}
          </dd>
          
          <dt style={{ fontWeight: tokens.typography.fontWeight.medium, color: tokens.colors.text.secondary }}>
            Name:
          </dt>
          <dd style={{ color: tokens.colors.text.primary }}>
            {selectedTheme.meta.name}
          </dd>
          
          <dt style={{ fontWeight: tokens.typography.fontWeight.medium, color: tokens.colors.text.secondary }}>
            Description:
          </dt>
          <dd style={{ color: tokens.colors.text.primary }}>
            {selectedTheme.meta.description}
          </dd>
          
          <dt style={{ fontWeight: tokens.typography.fontWeight.medium, color: tokens.colors.text.secondary }}>
            Version:
          </dt>
          <dd style={{ color: tokens.colors.text.primary }}>
            {selectedTheme.meta.version}
          </dd>
          
          <dt style={{ fontWeight: tokens.typography.fontWeight.medium, color: tokens.colors.text.secondary }}>
            Author:
          </dt>
          <dd style={{ color: tokens.colors.text.primary }}>
            {selectedTheme.meta.author}
          </dd>
          
          <dt style={{ fontWeight: tokens.typography.fontWeight.medium, color: tokens.colors.text.secondary }}>
            Supported Modes:
          </dt>
          <dd style={{ color: tokens.colors.text.primary }}>
            {supportedModes.length > 0 ? supportedModes.join(', ') : 'None'}
          </dd>
          
          <dt style={{ fontWeight: tokens.typography.fontWeight.medium, color: tokens.colors.text.secondary }}>
            Active Mode:
          </dt>
          <dd style={{ color: tokens.colors.text.primary }}>
            {selectedMode || 'Base theme (no mode)'}
          </dd>
        </dl>
      </div>

      {/* Color Palette Preview */}
      <div style={{ 
        marginBottom: tokens.spacing.xl,
      }}>
        <h2 style={{ 
          fontSize: tokens.typography.fontSize.xl,
          fontWeight: tokens.typography.fontWeight.semibold,
          marginBottom: tokens.spacing.lg,
          color: tokens.colors.text.primary,
        }}>
          Color Palette
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: tokens.spacing.md }}>
          {/* Brand Colors */}
          <ColorSwatch label="Brand Primary" color={tokens.colors.brand.primary} />
          <ColorSwatch label="Brand Secondary" color={tokens.colors.brand.secondary} />
          <ColorSwatch label="Brand Accent" color={tokens.colors.brand.accent} />
          
          {/* Background Colors */}
          <ColorSwatch label="BG Primary" color={tokens.colors.background.primary} />
          <ColorSwatch label="BG Secondary" color={tokens.colors.background.secondary} />
          <ColorSwatch label="BG Tertiary" color={tokens.colors.background.tertiary} />
          
          {/* Text Colors */}
          <ColorSwatch label="Text Primary" color={tokens.colors.text.primary} />
          <ColorSwatch label="Text Secondary" color={tokens.colors.text.secondary} />
          
          {/* State Colors */}
          <ColorSwatch label="Error" color={tokens.colors.state.error} />
          <ColorSwatch label="Warning" color={tokens.colors.state.warning} />
          <ColorSwatch label="Success" color={tokens.colors.state.success} />
          <ColorSwatch label="Info" color={tokens.colors.state.info} />
        </div>
      </div>

      {/* Component Preview */}
      <div style={{ 
        padding: tokens.spacing.lg,
        backgroundColor: tokens.colors.background.secondary,
        borderRadius: tokens.radius.lg,
        boxShadow: tokens.shadows.sm,
      }}>
        <h2 style={{ 
          fontSize: tokens.typography.fontSize.xl,
          fontWeight: tokens.typography.fontWeight.semibold,
          marginBottom: tokens.spacing.lg,
          color: tokens.colors.text.primary,
        }}>
          Component Preview
        </h2>
        
        {/* Sample Components */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.lg }}>
          {/* Buttons */}
          <div>
            <h3 style={{ 
              fontSize: tokens.typography.fontSize.md,
              fontWeight: tokens.typography.fontWeight.medium,
              marginBottom: tokens.spacing.md,
              color: tokens.colors.text.secondary,
            }}>
              Buttons
            </h3>
            <div style={{ display: 'flex', gap: tokens.spacing.md, flexWrap: 'wrap' }}>
              <button style={{
                padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
                backgroundColor: tokens.colors.brand.primary,
                color: tokens.colors.text.inverse,
                border: 'none',
                borderRadius: tokens.radius.md,
                fontSize: tokens.typography.fontSize.base,
                fontWeight: tokens.typography.fontWeight.medium,
                cursor: 'pointer',
                boxShadow: tokens.shadows.sm,
              }}>
                Primary Button
              </button>
              <button style={{
                padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
                backgroundColor: 'transparent',
                color: tokens.colors.brand.primary,
                border: `2px solid ${tokens.colors.brand.primary}`,
                borderRadius: tokens.radius.md,
                fontSize: tokens.typography.fontSize.base,
                fontWeight: tokens.typography.fontWeight.medium,
                cursor: 'pointer',
              }}>
                Secondary Button
              </button>
            </div>
          </div>

          {/* Cards */}
          <div>
            <h3 style={{ 
              fontSize: tokens.typography.fontSize.md,
              fontWeight: tokens.typography.fontWeight.medium,
              marginBottom: tokens.spacing.md,
              color: tokens.colors.text.secondary,
            }}>
              Cards
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: tokens.spacing.md }}>
              {['Error', 'Warning', 'Success', 'Info'].map((state) => {
                const stateKey = state.toLowerCase() as 'error' | 'warning' | 'success' | 'info';
                return (
                  <div
                    key={state}
                    style={{
                      padding: tokens.spacing.lg,
                      backgroundColor: tokens.colors.background.primary,
                      borderLeft: `4px solid ${tokens.colors.state[stateKey]}`,
                      borderRadius: tokens.radius.md,
                      boxShadow: tokens.shadows.md,
                    }}
                  >
                    <h4 style={{ 
                      fontSize: tokens.typography.fontSize.md,
                      fontWeight: tokens.typography.fontWeight.semibold,
                      marginBottom: tokens.spacing.sm,
                      color: tokens.colors.state[stateKey],
                    }}>
                      {state}
                    </h4>
                    <p style={{ 
                      fontSize: tokens.typography.fontSize.sm,
                      color: tokens.colors.text.secondary,
                      lineHeight: tokens.typography.lineHeight.normal,
                    }}>
                      This is a {state.toLowerCase()} state card example.
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Color Swatch Component
 */
function ColorSwatch({ label, color }: { label: string; color: string }) {
  const tokens = useTokens();
  
  return (
    <div style={{
      padding: tokens.spacing.md,
      backgroundColor: tokens.colors.background.primary,
      borderRadius: tokens.radius.md,
      boxShadow: tokens.shadows.sm,
      border: `1px solid ${tokens.colors.border.default}`,
    }}>
      <div
        style={{
          width: '100%',
          height: '80px',
          backgroundColor: color,
          borderRadius: tokens.radius.sm,
          marginBottom: tokens.spacing.sm,
        }}
      />
      <div style={{ 
        fontSize: tokens.typography.fontSize.sm,
        fontWeight: tokens.typography.fontWeight.medium,
        marginBottom: tokens.spacing.xs,
        color: tokens.colors.text.primary,
      }}>
        {label}
      </div>
      <div style={{ 
        fontSize: tokens.typography.fontSize.xs,
        fontFamily: tokens.typography.fontFamily.mono,
        color: tokens.colors.text.disabled,
      }}>
        {color}
      </div>
    </div>
  );
}

/**
 * Storybook Meta Configuration
 */
const meta: Meta<typeof ThemePresetViewer> = {
  title: 'Theme/Presets',
  component: ThemePresetViewer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Interactive viewer for all official theme presets. Compare themes and their modes side-by-side.',
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
type Story = StoryObj<typeof ThemePresetViewer>;

/**
 * Interactive Preset Viewer
 */
export const PresetViewer: Story = {};

/**
 * All Presets Grid
 * 
 * Shows all presets in a grid layout for quick comparison
 */
export const AllPresetsGrid: Story = {
  render: () => {
    const tokens = useTokens();
    const allThemes = ThemeRegistry.getAll();
    
    return (
      <UIProvider provider="mui">
        <div style={{ 
          padding: tokens.spacing.xl,
          backgroundColor: tokens.colors.background.primary,
          minHeight: '100vh',
        }}>
          <h1 style={{ 
            fontSize: tokens.typography.fontSize['3xl'],
            fontWeight: tokens.typography.fontWeight.bold,
            marginBottom: tokens.spacing.xl,
            color: tokens.colors.text.primary,
          }}>
            All Theme Presets
          </h1>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: tokens.spacing.lg 
          }}>
            {allThemes.map((theme) => (
              <div
                key={theme.meta.id}
                style={{
                  padding: tokens.spacing.lg,
                  backgroundColor: tokens.colors.background.secondary,
                  borderRadius: tokens.radius.lg,
                  boxShadow: tokens.shadows.md,
                }}
              >
                <h2 style={{ 
                  fontSize: tokens.typography.fontSize.xl,
                  fontWeight: tokens.typography.fontWeight.semibold,
                  marginBottom: tokens.spacing.sm,
                  color: tokens.colors.text.primary,
                }}>
                  {theme.meta.name}
                </h2>
                <p style={{ 
                  fontSize: tokens.typography.fontSize.sm,
                  color: tokens.colors.text.secondary,
                  marginBottom: tokens.spacing.md,
                }}>
                  {theme.meta.description}
                </p>
                
                {/* Color swatches */}
                <div style={{ 
                  display: 'flex', 
                  gap: tokens.spacing.xs,
                  marginTop: tokens.spacing.md,
                }}>
                  {Object.values(theme.tokens.colors.brand).slice(0, 3).map((color, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: '40px',
                        backgroundColor: color,
                        borderRadius: tokens.radius.sm,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </UIProvider>
    );
  },
};
