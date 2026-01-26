/**
 * Landing Page Template Story
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { 
  landingPageTemplate,
  landingPageThemePresetId 
} from '../../core/templates';

const LandingPagePreview = () => {
  return (
    <div>
      <div style={{ 
        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
          {landingPageTemplate.metadata.title}
        </h1>
        <p style={{ margin: '24px 0 0', fontSize: '1.5rem', opacity: 0.95 }}>
          {landingPageTemplate.metadata.description}
        </p>
        <div style={{ marginTop: '48px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button style={{
            background: '#ec4899',
            color: 'white',
            padding: '16px 40px',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.125rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}>
            Start Free Trial
          </button>
          <button style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            padding: '16px 40px',
            border: '2px solid white',
            borderRadius: '12px',
            fontSize: '1.125rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}>
            Learn More
          </button>
        </div>
      </div>
      
      <div style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '20px', color: '#1e293b', fontWeight: 800 }}>
            Modern Landing Page
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '800px', margin: '0 auto' }}>
            Bold, modern design perfect for SaaS products, app launches, and startups.
            Features larger typography and vibrant colors.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginBottom: '80px'
        }}>
          {Object.entries(landingPageTemplate.pages).map(([pageId, page]) => (
            <div key={pageId} style={{
              border: '2px solid #e2e8f0',
              borderRadius: '16px',
              padding: '32px',
              background: 'white',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}>
              <h3 style={{ margin: '0 0 16px', color: '#6366f1', fontSize: '1.5rem', fontWeight: 700 }}>
                {page.title}
              </h3>
              <p style={{ margin: '0 0 20px', color: '#64748b', fontSize: '0.875rem' }}>
                {Object.keys(page.sections).length} sections
              </p>
              <ul style={{ margin: 0, padding: '0 0 0 24px', color: '#64748b' }}>
                {Object.keys(page.sections).map(sectionId => (
                  <li key={sectionId} style={{ marginBottom: '8px' }}>{sectionId}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)', 
          padding: '48px', 
          borderRadius: '16px',
          color: 'white',
          marginTop: '80px'
        }}>
          <h3 style={{ margin: '0 0 32px', fontSize: '2rem', fontWeight: 800 }}>Template Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '8px', opacity: 0.9, fontSize: '0.875rem' }}>
                Template ID
              </div>
              <div style={{ fontSize: '1.125rem' }}>{landingPageTemplate.id}</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '8px', opacity: 0.9, fontSize: '0.875rem' }}>
                Theme Preset
              </div>
              <div style={{ fontSize: '1.125rem' }}>{landingPageThemePresetId}</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '8px', opacity: 0.9, fontSize: '0.875rem' }}>
                Font Family
              </div>
              <div style={{ fontSize: '1.125rem' }}>Inter</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '8px', opacity: 0.9, fontSize: '0.875rem' }}>
                Primary Color
              </div>
              <div style={{ fontSize: '1.125rem' }}>#6366f1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Templates/Landing Page',
  component: LandingPagePreview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Landing Page Template

A bold, modern landing page template designed for SaaS products, app launches, and startups.

## Features
- **Bold Design**: Modern aesthetic with indigo and pink accents
- **Large Typography**: 3.5rem headlines for impact
- **Vibrant Colors**: Eye-catching gradient backgrounds
- **Modern Spacing**: Generous padding and larger border radius

## Theme Preset
Uses the \`${landingPageThemePresetId}\` theme preset with:
- Primary Color: #6366f1 (Indigo)
- Secondary Color: #ec4899 (Pink)
- Font: Inter

## Use Cases
- SaaS landing pages
- Product launches
- Startup websites
- App marketing

## Design Philosophy
Embraces modern web design trends with larger typography, tighter letter spacing,
and bold color combinations. Tailwind-inspired breakpoints and spacing system.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LandingPagePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Overview: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Modern landing page template with bold colors and large typography.',
      },
    },
  },
};
