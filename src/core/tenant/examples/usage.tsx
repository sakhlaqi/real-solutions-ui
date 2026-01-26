/**
 * Usage Example: Applying Tenant Customization to a Template
 * 
 * This example shows how to use the tenant customization system at render time.
 */

import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  applyTenantCustomization,
  applyOverrides,
  extractOverrides,
  validateOverrides,
  createTemplateSchema,
  type TenantCustomization,
} from '../index';
import { themePresetRegistry, presetToMuiTheme } from '../../theme';

// Mock template structure for examples
const marketingPageTemplate = {
  pages: {
    home: {
      sections: {
        hero: {
          props: {
            title: 'Default Title',
          },
        },
      },
    },
  },
};

/**
 * Example 1: Basic Usage - Apply Tenant Customization
 */
function BasicExample() {
  const tenantConfig: TenantCustomization = {
    tenantId: 'acme-corp',
    tenantName: 'Acme Corporation',
    baseTemplate: 'marketing-page',
    overrides: {
      'theme.colors.primary': '#ff5722',
      'theme.colors.secondary': '#ff9800',
      'pages.home.sections.hero.props.title': 'Welcome to Acme Corporation',
    },
  };

  // Apply customization to template
  const customized = applyTenantCustomization(
    marketingPageTemplate,
    tenantConfig
  );

  console.log('Applied paths:', customized.appliedPaths);
  console.log('Tenant:', customized.tenant);

  return (
    <div>
      <h1>{customized.customized.pages.home.sections.hero.props.title}</h1>
    </div>
  );
}

/**
 * Example 2: With Validation - Validate Before Applying
 */
function ValidatedExample() {
  const tenantConfig: TenantCustomization = {
    tenantId: 'acme-corp',
    tenantName: 'Acme Corporation',
    baseTemplate: 'marketing-page',
    overrides: {
      'theme.colors.primary': '#ff5722',
      'theme.colors.secondary': 'invalid-color', // This will fail validation
    },
  };

  const schema = createTemplateSchema();

  // Validate overrides
  const validation = validateOverrides(tenantConfig.overrides, schema);

  if (!validation.valid) {
    console.error('Validation errors:', validation.errors);
    return <div>Invalid customization</div>;
  }

  // Apply if valid
  const customized = applyTenantCustomization(
    marketingPageTemplate,
    tenantConfig,
    { validate: true, schema }
  );

  return <div>Customized template loaded</div>;
}

/**
 * Example 3: Theme Integration - Apply to MUI Theme
 */
function ThemeIntegrationExample() {
  const tenantConfig: TenantCustomization = {
    tenantId: 'acme-corp',
    tenantName: 'Acme Corporation',
    baseTemplate: 'marketing-page',
    overrides: {
      'theme.colors.primary': '#ff5722',
      'theme.colors.secondary': '#ff9800',
    },
  };

  // Get base theme preset
  const basePreset = themePresetRegistry.get('marketing-page-mui');

  // Apply tenant overrides to theme
  const customizedPreset = applyOverrides(basePreset!, tenantConfig.overrides);

  // Convert to MUI theme
  const muiTheme = createTheme(presetToMuiTheme(customizedPreset));

  return (
    <ThemeProvider theme={muiTheme}>
      <div style={{ color: muiTheme.palette.primary.main }}>
        Themed with Acme branding
      </div>
    </ThemeProvider>
  );
}

/**
 * Example 4: Runtime Override - Load Tenant Config from API
 */
async function RuntimeExample() {
  // Fetch tenant config from API
  const response = await fetch('/api/tenants/acme-corp/customization');
  const tenantConfig: TenantCustomization = await response.json();

  // Apply customization
  const customized = applyTenantCustomization(
    marketingPageTemplate,
    tenantConfig,
    {
      validate: true,
      schema: createTemplateSchema(),
      strict: false, // Don't throw on errors, just warn
    }
  );

  return customized.customized;
}

/**
 * Example 5: Strict Mode - Throw on Validation Errors
 */
function StrictModeExample() {
  const tenantConfig: TenantCustomization = {
    tenantId: 'acme-corp',
    tenantName: 'Acme Corporation',
    baseTemplate: 'marketing-page',
    overrides: {
      'invalid.path': 'value', // This will throw in strict mode
    },
  };

  try {
    const customized = applyTenantCustomization(
      marketingPageTemplate,
      tenantConfig,
      {
        validate: true,
        schema: createTemplateSchema(),
        strict: true, // Throw on errors
      }
    );

    return <div>Success</div>;
  } catch (error) {
    console.error('Customization failed:', error);
    return <div>Error: {(error as Error).message}</div>;
  }
}

/**
 * Example 6: Simple Override Map - Without Full TenantCustomization
 */
function SimpleOverrideExample() {
  const overrides = {
    'theme.colors.primary': '#9c27b0',
    'pages.home.sections.hero.props.title': 'Custom Title',
  };

  // Apply simple overrides
  const customized = applyOverrides(marketingPageTemplate, overrides);

  return (
    <div>
      <h1>{customized.pages.home.sections.hero.props.title}</h1>
    </div>
  );
}

/**
 * Example 7: Extract Overrides - Get Diff Between Templates
 */
function ExtractOverridesExample() {
  const original = { theme: { colors: { primary: '#1976d2' } } };
  const customized = { theme: { colors: { primary: '#ff5722' } } };

  const overrides = extractOverrides(original, customized);
  console.log('Overrides:', overrides);
  // Output: { 'theme.colors.primary': '#ff5722' }
}

/**
 * Example 8: Component with Tenant Context
 */
interface TenantContextType {
  customization?: TenantCustomization;
  applyCustomization: <T>(data: T) => T;
}

const TenantContext = React.createContext<TenantContextType>({
  applyCustomization: (data) => data,
});

function TenantProvider({ 
  children, 
  customization 
}: { 
  children: React.ReactNode;
  customization: TenantCustomization;
}) {
  const applyCustomization = <T,>(data: T): T => {
    return applyTenantCustomization(data, customization).customized;
  };

  return (
    <TenantContext.Provider value={{ customization, applyCustomization }}>
      {children}
    </TenantContext.Provider>
  );
}

function useTenant() {
  return React.useContext(TenantContext);
}

// Usage in component
function TenantAwareComponent() {
  const { applyCustomization } = useTenant();
  
  const template = applyCustomization(marketingPageTemplate);

  return (
    <div>
      <h1>{template.pages.home.sections.hero.props.title}</h1>
    </div>
  );
}

export {
  BasicExample,
  ValidatedExample,
  ThemeIntegrationExample,
  RuntimeExample,
  StrictModeExample,
  SimpleOverrideExample,
  ExtractOverridesExample,
  TenantProvider,
  useTenant,
  TenantAwareComponent,
};
