/**
 * Blog Template Story
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { 
  blogTemplate,
  blogTemplateThemePresetId 
} from '../../core/templates';

const BlogTemplatePreview = () => {
  return (
    <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', lineHeight: 1.8 }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center',
        borderBottom: '4px solid #ff6f00'
      }}>
        <h1 style={{ margin: 0, fontSize: '3rem', fontWeight: 700, fontFamily: 'Georgia, serif' }}>
          {blogTemplate.metadata.title}
        </h1>
        <p style={{ margin: '20px 0 0', fontSize: '1.25rem', opacity: 0.95, fontStyle: 'italic' }}>
          {blogTemplate.metadata.description}
        </p>
      </div>
      
      <div style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto', background: '#f5f5f5' }}>
        <div style={{ background: 'white', padding: '48px', borderRadius: '8px', marginBottom: '48px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#2e7d32', fontWeight: 700 }}>
            Content-Focused Blog Template
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#555', marginBottom: '32px' }}>
            A clean, readable blog template optimized for long-form content. Features serif typography,
            generous line height, and subtle styling that keeps the focus on your content.
          </p>

          <div style={{ borderTop: '2px solid #e0e0e0', paddingTop: '32px' }}>
            <h3 style={{ color: '#ff6f00', marginBottom: '24px', fontSize: '1.75rem' }}>Template Pages</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {Object.entries(blogTemplate.pages).map(([pageId, page]) => (
                <div key={pageId} style={{
                  border: '1px solid #e0e0e0',
                  borderLeft: '4px solid #2e7d32',
                  padding: '24px',
                  background: '#fafafa'
                }}>
                  <h4 style={{ margin: '0 0 12px', color: '#2e7d32', fontSize: '1.5rem' }}>
                    {page.title}
                  </h4>
                  <p style={{ margin: '0 0 16px', color: '#666', fontSize: '1rem' }}>
                    {Object.keys(page.sections).length} sections
                  </p>
                  <ul style={{ margin: 0, padding: '0 0 0 24px', color: '#666' }}>
                    {Object.keys(page.sections).map(sectionId => (
                      <li key={sectionId} style={{ marginBottom: '8px' }}>{sectionId}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ 
          background: '#2e7d32', 
          padding: '40px', 
          borderRadius: '8px',
          color: 'white'
        }}>
          <h3 style={{ margin: '0 0 24px', fontSize: '1.75rem' }}>Design Characteristics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '0.875rem', opacity: 0.9 }}>
                Typography
              </div>
              <div>Georgia, serif</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '0.875rem', opacity: 0.9 }}>
                Base Font Size
              </div>
              <div>18px (larger for readability)</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '0.875rem', opacity: 0.9 }}>
                Line Height
              </div>
              <div>1.8 (extra spacing)</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '0.875rem', opacity: 0.9 }}>
                Primary Color
              </div>
              <div>#2e7d32 (Green)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Templates/Blog',
  component: BlogTemplatePreview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Blog Template

A content-focused blog template designed for maximum readability and long-form content.

## Features
- **Serif Typography**: Georgia font for classic, readable design
- **Large Font Size**: 18px base for comfortable reading
- **Extra Line Height**: 1.8 for optimal content consumption
- **Clean Layout**: Minimal distractions, focus on content
- **Subtle Shadows**: Gentle elevation without overwhelming

## Theme Preset
Uses the \`${blogTemplateThemePresetId}\` theme preset with:
- Primary Color: #2e7d32 (Green)
- Secondary Color: #ff6f00 (Orange)
- Font: Georgia, serif

## Use Cases
- Personal blogs
- Content marketing
- Documentation sites
- Editorial content
- News websites

## Design Philosophy
Optimized for reading with serif typography, larger font sizes, and generous spacing.
Minimal shadows and clean borders keep the focus on your content.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BlogTemplatePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ContentFocused: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Clean blog template optimized for long-form content and readability.',
      },
    },
  },
};
