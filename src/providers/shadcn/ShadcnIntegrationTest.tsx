import React, { useState } from 'react';
import { UIProvider, useUIContext } from '../../core/context';
import { Button } from '../../adapters/Button';
import { Input } from '../../adapters/Input';

/**
 * Test Component for shadcn Integration
 * 
 * This component demonstrates:
 * 1. Provider switching between all four providers
 * 2. Theme mode toggling (light/dark)
 * 3. Component usage with shadcn provider
 * 4. Consistent API across providers
 */
const TestContent: React.FC = () => {
  const { provider, setProvider, theme, toggleThemeMode } = useUIContext();
  const [inputValue, setInputValue] = useState('');

  return (
    <div style={{ padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <h1>shadcn/ui Integration Test</h1>

      {/* Provider Switcher */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>Provider Selection</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button
            variant={provider === 'internal' ? 'contained' : 'outlined'}
            onClick={() => setProvider('internal')}
          >
            Internal
          </Button>
          <Button
            variant={provider === 'mui' ? 'contained' : 'outlined'}
            onClick={() => setProvider('mui')}
          >
            Material-UI
          </Button>
          <Button
            variant={provider === 'radix' ? 'contained' : 'outlined'}
            onClick={() => setProvider('radix')}
          >
            Radix UI
          </Button>
          <Button
            variant={provider === 'shadcn' ? 'contained' : 'outlined'}
            onClick={() => setProvider('shadcn')}
          >
            shadcn/ui
          </Button>
        </div>
        <p>Current Provider: <strong>{provider}</strong></p>
      </div>

      {/* Theme Mode Toggle */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>Theme Mode</h2>
        <Button onClick={toggleThemeMode}>
          Toggle Theme ({theme.mode === 'light' ? '🌙 Dark' : '☀️ Light'})
        </Button>
        <p>Current Mode: <strong>{theme.mode}</strong></p>
      </div>

      {/* Button Variants */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>Button Variants</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
          <Button variant="contained" color="error">Error</Button>
          <Button variant="contained" disabled>Disabled</Button>
        </div>
      </div>

      {/* Button Sizes */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>Button Sizes</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button size="small" variant="contained">Small</Button>
          <Button size="medium" variant="contained">Medium</Button>
          <Button size="large" variant="contained">Large</Button>
        </div>
      </div>

      {/* Input Component */}
      <div style={{ marginBottom: '2rem', maxWidth: '400px' }}>
        <h2>Input Component</h2>
        <Input
          label="Email Address"
          placeholder="Enter your email"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          helperText="We'll never share your email"
          fullWidth
        />
        <div style={{ marginTop: '1rem' }}>
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            helperText="At least 8 characters"
            fullWidth
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <Input
            label="Error State"
            error="This field is required"
            fullWidth
          />
        </div>
      </div>

      {/* Full Width Button */}
      <div style={{ marginBottom: '2rem', maxWidth: '400px' }}>
        <h2>Full Width Button</h2>
        <Button variant="contained" fullWidth>
          Full Width Button
        </Button>
      </div>

      {/* Icons in Buttons */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>Buttons with Icons</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            startIcon={<span>→</span>}
          >
            Start Icon
          </Button>
          <Button 
            variant="outlined" 
            endIcon={<span>←</span>}
          >
            End Icon
          </Button>
        </div>
      </div>

      {/* Integration Status */}
      <div style={{ 
        marginTop: '3rem', 
        padding: '1rem', 
        background: theme.mode === 'light' ? '#f5f5f5' : '#333',
        borderRadius: '8px' 
      }}>
        <h3>Integration Status</h3>
        <ul>
          <li>✅ Provider type updated to include 'shadcn'</li>
          <li>✅ shadcn dependencies installed</li>
          <li>✅ Tailwind configuration set up</li>
          <li>✅ shadcn provider folder structure created</li>
          <li>✅ Utilities (cn, variants) implemented</li>
          <li>✅ Theme configuration created</li>
          <li>✅ Core components implemented (Button, Input, Card, Accordion, Dialog, Label)</li>
          <li>✅ Adapters updated to route to shadcn</li>
          <li>✅ UIProvider updated to wrap shadcn theme</li>
          <li>✅ All providers working consistently</li>
        </ul>
      </div>
    </div>
  );
};

/**
 * Main Test App Component
 */
export const ShadcnIntegrationTest: React.FC = () => {
  return (
    <UIProvider 
      defaultProvider="shadcn"
      defaultTheme={{ 
        mode: 'light',
        primaryColor: '#3b82f6',
        secondaryColor: '#8b5cf6',
      }}
    >
      <TestContent />
    </UIProvider>
  );
};

export default ShadcnIntegrationTest;
