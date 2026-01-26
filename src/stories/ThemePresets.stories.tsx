/**
 * Theme Presets Storybook Story
 * 
 * Visualizes all official theme presets with mode comparisons
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { themePresetRegistry } from '../core/theme/registry';
import type { ThemePreset } from '../core/theme/types';
import '../core/theme/presets'; // Auto-register presets

/**
 * Theme Preset Viewer Component
 */
function ThemePresetViewerContent() {
  const allPresets = themePresetRegistry.getAll();
  const [selectedPresetId, setSelectedPresetId] = useState(allPresets[0]?.id || 'marketing-page-mui');
  const [selectedMode, setSelectedMode] = useState<'light' | 'dark'>('light');
  
  const selectedPreset = themePresetRegistry.get(selectedPresetId);

  // Check if there are any themes
  if (allPresets.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>No theme presets registered. Please register theme presets first.</p>
      </div>
    );
  }

  if (!selectedPreset) {
    return <div>Theme preset not found</div>;
  }

  // Use the preset's tokens directly (flat structure)
  const { colors, typography, spacing, radius, shadows } = selectedPreset;
  
  // Helper to convert spacing number to px
  const sp = (key: keyof typeof spacing) => `${spacing[key]}px`;

  return (
    <div style={{ 
      padding: sp('xl'),
      backgroundColor: colors.background || '#fff',
      minHeight: '100vh',
    }}>
      {/* Header */}
      <div style={{ marginBottom: sp('2xl') }}>
        <h1 style={{ 
          fontSize: '1.875rem',
          fontWeight: 700,
          marginBottom: sp('md'),
          color: colors.textPrimary || '#000',
        }}>
          Theme Presets
        </h1>
        <p style={{ 
          fontSize: '1.125rem',
          color: colors.textSecondary || '#666',
        }}>
          Official built-in themes with mode support
        </p>
      </div>

      {/* Theme Selector */}
      <div style={{ 
        marginBottom: sp('xl'),
        padding: sp('lg'),
        backgroundColor: colors.surface || '#f5f5f5',
        borderRadius: `${radius.lg}px`,
        boxShadow: shadows.sm,
      }}>
        <label style={{ 
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: 500,
          marginBottom: sp('sm'),
          color: colors.textSecondary || '#666',
        }}>
          Select Theme Preset
        </label>
        <select
          value={selectedPresetId}
          onChange={(e) => {
            setSelectedPresetId(e.target.value);
            setSelectedMode('light');
          }}
          style={{ 
            width: '100%',
            padding: sp('md'),
            fontSize: '1rem',
            borderRadius: `${radius.md}px`,
            border: `1px solid ${colors.border || '#e0e0e0'}`,
            backgroundColor: colors.background || '#fff',
            color: colors.textPrimary || '#000',
          }}
        >
          {allPresets.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {preset.name}
            </option>
          ))}
        </select>

        {/* Mode Selector */}
        <div style={{ marginTop: sp('lg') }}>
          <label style={{ 
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 500,
            marginBottom: sp('sm'),
            color: colors.textSecondary || '#666',
          }}>
            Theme Mode
          </label>
          <div style={{ display: 'flex', gap: sp('sm') }}>
            {(['light', 'dark'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedMode(mode)}
                style={{
                  padding: `${sp('sm')} ${sp('md')}`,
                  fontSize: '0.875rem',
                  borderRadius: `${radius.md}px`,
                  border: selectedMode === mode 
                    ? `2px solid ${colors.primary}`
                    : `1px solid ${colors.border || '#e0e0e0'}`,
                  backgroundColor: selectedMode === mode
                    ? colors.primary
                    : colors.background || '#fff',
                  color: selectedMode === mode
                    ? colors.primaryContrast || '#fff'
                    : colors.textPrimary || '#000',
                  cursor: 'pointer',
                  fontWeight: selectedMode === mode ? 600 : 400,
                  textTransform: 'capitalize',
                }}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Theme Metadata */}
      <div style={{ 
        marginBottom: sp('xl'),
        padding: sp('lg'),
        backgroundColor: colors.surface || '#f5f5f5',
        borderRadius: `${radius.lg}px`,
        boxShadow: shadows.sm,
      }}>
        <h2 style={{ 
          fontSize: '1.25rem',
          fontWeight: 600,
          marginBottom: sp('md'),
          color: colors.textPrimary || '#000',
        }}>
          Theme Metadata
        </h2>
        <dl style={{ 
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: sp('md'),
          fontSize: '0.875rem',
        }}>
          <dt style={{ fontWeight: 500, color: colors.textSecondary || '#666' }}>
            ID:
          </dt>
          <dd style={{ color: colors.textPrimary || '#000', fontFamily: 'monospace' }}>
            {selectedPreset.id}
          </dd>
          
          <dt style={{ fontWeight: 500, color: colors.textSecondary || '#666' }}>
            Name:
          </dt>
          <dd style={{ color: colors.textPrimary || '#000' }}>
            {selectedPreset.name}
          </dd>
          
          <dt style={{ fontWeight: 500, color: colors.textSecondary || '#666' }}>
            Description:
          </dt>
          <dd style={{ color: colors.textPrimary || '#000' }}>
            {selectedPreset.description}
          </dd>
          
          <dt style={{ fontWeight: 500, color: colors.textSecondary || '#666' }}>
            Version:
          </dt>
          <dd style={{ color: colors.textPrimary || '#000' }}>
            {selectedPreset.version}
          </dd>
          
          <dt style={{ fontWeight: 500, color: colors.textSecondary || '#666' }}>
            Mode:
          </dt>
          <dd style={{ color: colors.textPrimary || '#000' }}>
            {selectedPreset.mode}
          </dd>
          
          <dt style={{ fontWeight: 500, color: colors.textSecondary || '#666' }}>
            Active Mode:
          </dt>
          <dd style={{ color: colors.textPrimary || '#000' }}>
            {selectedMode}
          </dd>
        </dl>
      </div>

      {/* Color Palette Preview */}
      <div style={{ 
        marginBottom: sp('xl'),
      }}>
        <h2 style={{ 
          fontSize: '1.25rem',
          fontWeight: 600,
          marginBottom: sp('lg'),
          color: colors.textPrimary || '#000',
        }}>
          Color Palette
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
          gap: sp('md') 
        }}>
          <ColorSwatch label="Primary" color={colors.primary} preset={selectedPreset} />
          <ColorSwatch label="Secondary" color={colors.secondary} preset={selectedPreset} />
          {colors.background && <ColorSwatch label="Background" color={colors.background} preset={selectedPreset} />}
          {colors.surface && <ColorSwatch label="Surface" color={colors.surface} preset={selectedPreset} />}
          {colors.textPrimary && <ColorSwatch label="Text Primary" color={colors.textPrimary} preset={selectedPreset} />}
          {colors.textSecondary && <ColorSwatch label="Text Secondary" color={colors.textSecondary} preset={selectedPreset} />}
          {colors.success && <ColorSwatch label="Success" color={colors.success} preset={selectedPreset} />}
          {colors.warning && <ColorSwatch label="Warning" color={colors.warning} preset={selectedPreset} />}
          {colors.error && <ColorSwatch label="Error" color={colors.error} preset={selectedPreset} />}
          {colors.info && <ColorSwatch label="Info" color={colors.info} preset={selectedPreset} />}
        </div>
      </div>

      {/* Typography Preview */}
      <div style={{ 
        marginBottom: sp('xl'),
      }}>
        <h2 style={{ 
          fontSize: '1.25rem',
          fontWeight: 600,
          marginBottom: sp('lg'),
          color: colors.textPrimary || '#000',
        }}>
          Typography
        </h2>
        <div style={{ 
          padding: sp('lg'),
          backgroundColor: colors.surface || '#f5f5f5',
          borderRadius: `${radius.lg}px`,
        }}>
          <div style={{ fontFamily: typography.fontFamily, marginBottom: sp('md') }}>
            <div style={{ fontSize: '0.75rem', color: colors.textSecondary || '#666', marginBottom: sp('xs') }}>
              Font Family
            </div>
            <div style={{ color: colors.textPrimary || '#000' }}>
              {typography.fontFamily}
            </div>
          </div>
          {typography.h1 && (
            <div style={{...typography.h1, color: colors.textPrimary || '#000', marginBottom: sp('sm')}}>
              Heading 1
            </div>
          )}
          {typography.h2 && (
            <div style={{...typography.h2, color: colors.textPrimary || '#000', marginBottom: sp('sm')}}>
              Heading 2
            </div>
          )}
          {typography.body && (
            <div style={{...typography.body, color: colors.textPrimary || '#000'}}>
              Body text sample
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Color Swatch Component  
 */
function ColorSwatch({ label, color, preset }: { label: string; color: string; preset: ThemePreset }) {
  const { spacing, radius, shadows, colors } = preset;
  const sp = (key: keyof typeof spacing) => `${spacing[key]}px`;
  
  return (
    <div style={{
      padding: sp('md'),
      backgroundColor: colors.background || '#fff',
      borderRadius: `${radius.md}px`,
      boxShadow: shadows.sm,
      border: `1px solid ${colors.border || '#e0e0e0'}`,
    }}>
      <div
        style={{
          width: '100%',
          height: '80px',
          backgroundColor: color,
          borderRadius: `${radius.sm}px`,
          marginBottom: sp('sm'),
        }}
      />
      <div style={{ 
        fontSize: '0.875rem',
        fontWeight: 500,
        marginBottom: sp('xs'),
        color: colors.textPrimary || '#000',
      }}>
        {label}
      </div>
      <div style={{ 
        fontSize: '0.75rem',
        fontFamily: 'monospace',
        color: colors.textDisabled || '#999',
      }}>
        {color}
      </div>
    </div>
  );
}

/**
 * Storybook Meta Configuration
 */
const meta: Meta<typeof ThemePresetViewerContent> = {
  title: 'Theme/Presets',
  component: ThemePresetViewerContent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Interactive viewer for all official theme presets. Compare themes and their modes side-by-side.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemePresetViewerContent>;

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
    const allPresets = themePresetRegistry.getAll();
    
    return (
      <div style={{ 
        padding: '32px',
        backgroundColor: '#fff',
        minHeight: '100vh',
      }}>
        <h1 style={{ 
          fontSize: '1.875rem',
          fontWeight: 700,
          marginBottom: '32px',
          color: '#000',
        }}>
          All Theme Presets
        </h1>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px' 
        }}>
          {allPresets.map((preset) => (
            <div
              key={preset.id}
              style={{
                padding: '24px',
                backgroundColor: preset.colors.surface || '#f5f5f5',
                borderRadius: `${preset.radius.lg}px`,
                boxShadow: preset.shadows.md,
              }}
            >
              <h2 style={{ 
                fontSize: '1.25rem',
                fontWeight: 600,
                marginBottom: '8px',
                color: preset.colors.textPrimary || '#000',
              }}>
                {preset.name}
              </h2>
              <p style={{ 
                fontSize: '0.875rem',
                color: preset.colors.textSecondary || '#666',
                marginBottom: '16px',
              }}>
                {preset.description}
              </p>
              <div style={{ 
                fontSize: '0.75rem',
                color: preset.colors.textDisabled || '#999',
                marginTop: '8px',
              }}>
                Mode: {preset.mode} • v{preset.version}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
