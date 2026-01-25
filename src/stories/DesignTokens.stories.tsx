/**
 * Design Tokens Storybook Story
 * 
 * Visualizes the complete design token system
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useTokens } from '../core/context/useTokens';
import { UIProvider } from '../core/context/UIProvider';

function TokenDisplay() {
  const tokens = useTokens();

  if (!tokens) {
    return <div>Loading tokens...</div>;
  }

  return (
    <div style={{ padding: '2rem', fontFamily: tokens.typography.fontFamily.primary }}>
      <h1 style={{ 
        fontSize: tokens.typography.fontSize['3xl'], 
        fontWeight: tokens.typography.fontWeight.bold,
        marginBottom: tokens.spacing.xl,
        color: tokens.colors.textPrimary,
      }}>
        Design Tokens
      </h1>

      {/* Colors */}
      <section style={{ marginBottom: tokens.spacing.xl }}>
        <h2 style={{ fontSize: tokens.typography.fontSize['2xl'], marginBottom: tokens.spacing.md }}>Colors</h2>
        <div style={{ display: 'flex', gap: tokens.spacing.md, flexWrap: 'wrap' }}>
          <ColorBox name="Primary" color={tokens.colors.primary} tokens={tokens} />
          <ColorBox name="Secondary" color={tokens.colors.secondary} tokens={tokens} />
          <ColorBox name="Success" color={tokens.colors.success} tokens={tokens} />
          <ColorBox name="Error" color={tokens.colors.error} tokens={tokens} />
          <ColorBox name="Warning" color={tokens.colors.warning} tokens={tokens} />
          <ColorBox name="Info" color={tokens.colors.info} tokens={tokens} />
        </div>
      </section>

      {/* Spacing */}
      <section style={{ marginBottom: tokens.spacing.xl }}>
        <h2 style={{ fontSize: tokens.typography.fontSize['2xl'], marginBottom: tokens.spacing.md }}>Spacing</h2>
        <div style={{ display: 'flex', gap: tokens.spacing.lg, alignItems: 'flex-end' }}>
          {Object.entries(tokens.spacing).map(([name, value]) => (
            <div key={name}>
              <div style={{ width: value, height: value, backgroundColor: tokens.colors.primary }} />
              <div style={{ fontSize: tokens.typography.fontSize.xs }}>{name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ColorBox({ name, color, tokens }: { name: string; color: string; tokens: any }) {
  return (
    <div>
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: color,
          borderRadius: tokens.radius.md,
          boxShadow: tokens.shadows.sm,
        }}
      />
      <div style={{ fontSize: tokens.typography.fontSize.sm }}>{name}</div>
      <div style={{ fontSize: tokens.typography.fontSize.xs, fontFamily: tokens.typography.fontFamily.monospace }}>{color}</div>
    </div>
  );
}

const meta: Meta<typeof TokenDisplay> = {
  title: 'Theme/Design Tokens',
  component: TokenDisplay,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <UIProvider defaultProvider="mui">
        <Story />
      </UIProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TokenDisplay>;

export const LightMode: Story = {};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <UIProvider defaultProvider="mui" defaultTheme={{ mode: 'dark' }}>
        <div style={{ backgroundColor: '#121212', minHeight: '100vh', padding: '1rem' }}>
          <Story />
        </div>
      </UIProvider>
    ),
  ],
};
