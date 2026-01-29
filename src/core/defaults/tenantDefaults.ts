/**
 * Tenant Configuration Defaults
 * 
 * These defaults are applied by the UI when the backend returns null/empty values.
 * This keeps UI concerns in the UI layer, not in the API.
 */

export interface DefaultTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      inverse: string;
    };
    error: string;
    success: string;
    warning: string;
  };
  fonts: {
    primary: string;
    secondary: string;
    sizes: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

export interface DefaultRoute {
  path: string;
  pagePath: string;
  title: string;
  protected: boolean;
  layout: string;
  order: number;
  exact?: boolean;
}

export interface DefaultPage {
  id: string;
  title: string;
  description: string;
  layout: {
    type: string;
    version: string;
  };
  sections: Array<{
    id: string;
    type: string;
    version: string;
    props: Record<string, any>;
  }>;
  metadata: {
    metaTitle: string;
    metaDescription: string;
  };
}

/**
 * Default theme configuration
 * Applied when API returns null/undefined for theme
 */
export const DEFAULT_THEME: DefaultTheme = {
  colors: {
    primary: '#0066cc',
    secondary: '#ff6600',
    accent: '#00cc99',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: {
      primary: '#212529',
      secondary: '#6c757d',
      inverse: '#ffffff',
    },
    error: '#dc3545',
    success: '#28a745',
    warning: '#ffc107',
  },
  fonts: {
    primary: 'Inter, sans-serif',
    secondary: 'Georgia, serif',
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
  },
};

/**
 * Default route configuration
 * Applied when API returns empty array for routes
 */
export const DEFAULT_ROUTES: DefaultRoute[] = [
  {
    path: '/',
    pagePath: '/',
    title: 'Home',
    protected: false,
    layout: 'main',
    order: 0,
  },
  {
    path: '/login',
    pagePath: '/login',
    title: 'Login',
    protected: false,
    layout: 'none',
    order: 1,
  },
  {
    path: '/admin',
    pagePath: '/dashboard',
    title: 'Dashboard',
    protected: true,
    layout: 'admin',
    order: 2,
  },
];

/**
 * Generate default page configuration
 * Applied when API returns null for page_config
 * 
 * @param tenantName - Name of the tenant for personalization
 */
export function getDefaultPages(tenantName: string): Record<string, DefaultPage> {
  return {
    home: {
      id: 'home',
      title: 'Home',
      description: `Welcome to ${tenantName}`,
      layout: {
        type: 'default-layout',
        version: '1.0.0',
      },
      sections: [
        {
          id: 'welcome',
          type: 'hero-simple',
          version: '1.0.0',
          props: {
            heading: `Welcome to ${tenantName}`,
            subheading: 'Get started by assigning a template to this tenant',
            alignment: 'center',
          },
        },
      ],
      metadata: {
        metaTitle: `${tenantName} - Home`,
        metaDescription: `Welcome to ${tenantName}`,
      },
    },
  };
}

/**
 * Apply default theme if theme is null/undefined
 */
export function applyDefaultTheme(theme: DefaultTheme | null | undefined): DefaultTheme {
  return theme || DEFAULT_THEME;
}

/**
 * Apply default routes if routes array is empty
 */
export function applyDefaultRoutes(routes: DefaultRoute[] | null | undefined): DefaultRoute[] {
  return routes && routes.length > 0 ? routes : DEFAULT_ROUTES;
}

/**
 * Apply default pages if pages are null/undefined
 */
export function applyDefaultPages(
  pages: Record<string, DefaultPage> | null | undefined,
  tenantName: string
): Record<string, DefaultPage> {
  return pages || getDefaultPages(tenantName);
}
