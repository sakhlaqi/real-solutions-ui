/**
 * Marketing Page Template Story
 * 
 * Full website template with multiple pages and sections
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { 
  marketingPageTemplate, 
  marketingPageTheme,
  marketingPageThemePresetId 
} from '../../core/templates';

// Mock component to render template structure
const MarketingPagePreview = () => {
  return (
    <div>
      <div style={{ 
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '3rem', fontWeight: 700 }}>
          {marketingPageTemplate.metadata.title}
        </h1>
        <p style={{ margin: '20px 0 0', fontSize: '1.25rem', opacity: 0.9 }}>
          {marketingPageTemplate.metadata.description}
        </p>
        <div style={{ marginTop: '40px' }}>
          <button style={{
            background: 'white',
            color: '#1976d2',
            padding: '12px 32px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}>
            Get Started
          </button>
        </div>
      </div>
      
      <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#333' }}>
            Professional Marketing Template
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#666', maxWidth: '800px', margin: '0 auto' }}>
            A complete marketing page template with hero section, features, testimonials, and more.
            Perfect for corporate websites and business landing pages.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '60px'
        }}>
          {Object.entries(marketingPageTemplate.pages).map(([pageId, page]) => (
            <div key={pageId} style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '24px',
              background: 'white'
            }}>
              <h3 style={{ margin: '0 0 12px', color: '#1976d2' }}>
                {page.title}
              </h3>
              <p style={{ margin: '0 0 16px', color: '#666', fontSize: '0.875rem' }}>
                {Object.keys(page.sections).length} sections
              </p>
              <ul style={{ margin: 0, padding: '0 0 0 20px', color: '#666', fontSize: '0.875rem' }}>
                {Object.keys(page.sections).map(sectionId => (
                  <li key={sectionId}>{sectionId}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ 
          background: '#f5f5f5', 
          padding: '40px', 
          borderRadius: '8px',
          marginTop: '60px'
        }}>
          <h3 style={{ margin: '0 0 24px', fontSize: '1.5rem' }}>Template Metadata</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '4px', fontSize: '0.875rem', color: '#666' }}>
                Template ID
              </div>
              <div>{marketingPageTemplate.id}</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '4px', fontSize: '0.875rem', color: '#666' }}>
                Theme Preset
              </div>
              <div>{marketingPageThemePresetId}</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '4px', fontSize: '0.875rem', color: '#666' }}>
                Pages
              </div>
              <div>{Object.keys(marketingPageTemplate.pages).length}</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '4px', fontSize: '0.875rem', color: '#666' }}>
                Total Sections
              </div>
              <div>
                {Object.values(marketingPageTemplate.pages)
                  .reduce((sum, page) => sum + Object.keys(page.sections).length, 0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Templates/Marketing Page',
  component: MarketingPagePreview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Marketing Page Template

A professional marketing website template designed for corporate websites and business landing pages.

## Features
- **Professional Design**: Clean, corporate aesthetic with blue color scheme
- **Multiple Pages**: Home page with various sections
- **Responsive**: Mobile-first design that works on all devices
- **Theme**: Roboto font with professional spacing and shadows

## Theme Preset
Uses the \`${marketingPageThemePresetId}\` theme preset with:
- Primary Color: #1976d2 (Material Blue)
- Secondary Color: #757575 (Gray)
- Font: Roboto

## Use Cases
- Corporate websites
- Business landing pages
- Professional services
- B2B marketing

## Pages
${Object.entries(marketingPageTemplate.pages).map(([id, page]) => 
  `- **${page.title}**: ${Object.keys(page.sections).length} sections`
).join('\n')}
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MarketingPagePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Overview: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Complete marketing page template with all sections and features.',
      },
    },
  },
};
