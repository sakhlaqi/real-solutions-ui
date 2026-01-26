/**
 * Sign-In Template Story
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { 
  signInTemplate,
  signInTemplateThemePresetId 
} from '../../core/templates';

const SignInTemplatePreview = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      <div style={{ 
        background: '#1976d2',
        color: 'white',
        padding: '24px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>
          {signInTemplate.metadata.title}
        </h1>
      </div>
      
      <div style={{ flex: 1, padding: '60px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '1200px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#1976d2', fontWeight: 700 }}>
              Authentication Template
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#666', maxWidth: '800px', margin: '0 auto' }}>
              {signInTemplate.metadata.description}
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            marginBottom: '60px'
          }}>
            {Object.entries(signInTemplate.pages).map(([pageId, page]) => (
              <div key={pageId} style={{
                background: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '40px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ margin: '0 0 16px', color: '#1976d2', fontSize: '1.5rem', fontWeight: 600 }}>
                  {page.title}
                </h3>
                <p style={{ margin: '0 0 24px', color: '#666', fontSize: '0.875rem' }}>
                  {Object.keys(page.sections).length} sections
                </p>
                
                {/* Mock form UI */}
                <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '24px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: 600, color: '#333' }}>
                      Email
                    </label>
                    <div style={{ 
                      border: '1px solid #ccc', 
                      borderRadius: '4px', 
                      padding: '12px',
                      background: '#fafafa'
                    }}>
                      user@example.com
                    </div>
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem', fontWeight: 600, color: '#333' }}>
                      Password
                    </label>
                    <div style={{ 
                      border: '1px solid #ccc', 
                      borderRadius: '4px', 
                      padding: '12px',
                      background: '#fafafa'
                    }}>
                      ••••••••
                    </div>
                  </div>
                  <button style={{
                    width: '100%',
                    background: '#1976d2',
                    color: 'white',
                    padding: '12px',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    cursor: 'pointer'
                  }}>
                    {pageId === 'signIn' ? 'Sign In' : pageId === 'signUp' ? 'Sign Up' : 'Reset Password'}
                  </button>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e0e0e0' }}>
                  <div style={{ fontSize: '0.875rem', color: '#999', marginBottom: '8px' }}>Sections:</div>
                  <ul style={{ margin: 0, padding: '0 0 0 20px', color: '#666', fontSize: '0.875rem' }}>
                    {Object.keys(page.sections).map(sectionId => (
                      <li key={sectionId}>{sectionId}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div style={{ 
            background: 'white', 
            padding: '40px', 
            borderRadius: '8px',
            border: '1px solid #e0e0e0'
          }}>
            <h3 style={{ margin: '0 0 24px', fontSize: '1.5rem', color: '#1976d2' }}>Template Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '0.875rem', color: '#666' }}>
                  Template ID
                </div>
                <div>{signInTemplate.id}</div>
              </div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '0.875rem', color: '#666' }}>
                  Theme Preset
                </div>
                <div>{signInTemplateThemePresetId}</div>
              </div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '0.875rem', color: '#666' }}>
                  Pages
                </div>
                <div>{Object.keys(signInTemplate.pages).length}</div>
              </div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: '8px', fontSize: '0.875rem', color: '#666' }}>
                  Primary Color
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '20px', background: '#1976d2', borderRadius: '4px' }}></div>
                  #1976d2
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Templates/Sign-In',
  component: SignInTemplatePreview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Sign-In Template

Professional authentication pages for sign-in, sign-up, and password reset flows.

## Features
- **Professional Design**: Clean, trustworthy aesthetic
- **Multiple Pages**: Sign In, Sign Up, Forgot Password
- **Form-Focused**: Optimized layouts for authentication flows
- **Consistent Branding**: Blue color scheme for security and trust

## Theme Preset
Uses the \`${signInTemplateThemePresetId}\` theme preset with:
- Primary Color: #1976d2 (Blue)
- Secondary Color: #424242 (Gray)
- Font: Roboto

## Use Cases
- User authentication
- Account creation
- Password recovery
- Enterprise applications
- SaaS platforms

## Pages Included
${Object.entries(signInTemplate.pages).map(([id, page]) => 
  `- **${page.title}**: ${Object.keys(page.sections).length} sections`
).join('\n')}

## Design Philosophy
Clean, minimal design that builds trust and keeps users focused on the authentication task.
Uses standard Material Design patterns for familiarity.
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignInTemplatePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AuthenticationFlows: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Complete authentication template with sign-in, sign-up, and password reset pages.',
      },
    },
  },
};
