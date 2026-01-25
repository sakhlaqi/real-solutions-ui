/**
 * Theme & Design Token Types
 * 
 * Canonical type definitions for the theme system.
 * These types are the source of truth shared across:
 * - UI library (component styling)
 * - Presentation app (runtime theme application)
 * - API (theme storage and validation)
 * 
 * **Design Principles:**
 * - Semantic tokens (not component-specific)
 * - JSON serializable (no functions, classes, symbols)
 * - Mode-based overrides (dark, compact, highContrast)
 * - Versioned for backwards compatibility
 */

/**
 * Theme Metadata
 * 
 * Information about the theme itself (not visual tokens)
 */
export interface ThemeMeta {
  /** Unique theme identifier */
  id: string;
  
  /** Human-readable theme name */
  name: string;
  
  /** Theme description */
  description?: string;
  
  /** Theme version (semver) */
  version: string;
  
  /** Theme author/creator */
  author?: string;
  
  /** Theme category/preset type */
  category?: 'official' | 'preset' | 'custom' | 'enterprise';
  
  /** Tags for categorization */
  tags?: string[];
  
  /** Creation timestamp */
  createdAt?: string;
  
  /** Last update timestamp */
  updatedAt?: string;
}

/**
 * Color Tokens
 * 
 * Semantic color system using design token naming
 */
export interface ColorTokens {
  /** Primary brand color */
  primary: string;
  
  /** Primary color variants */
  primaryLight?: string;
  primaryDark?: string;
  primaryContrast?: string;
  
  /** Secondary brand color */
  secondary: string;
  
  /** Secondary color variants */
  secondaryLight?: string;
  secondaryDark?: string;
  secondaryContrast?: string;
  
  /** Accent/highlight color */
  accent?: string;
  accentLight?: string;
  accentDark?: string;
  
  /** Background colors */
  background: string;
  backgroundSecondary?: string;
  backgroundTertiary?: string;
  
  /** Surface colors (cards, panels) */
  surface: string;
  surfaceElevated?: string;
  surfaceOverlay?: string;
  
  /** Text colors */
  textPrimary: string;
  textSecondary: string;
  textTertiary?: string;
  textDisabled?: string;
  textInverse?: string;
  
  /** Border colors */
  border: string;
  borderLight?: string;
  borderFocus?: string;
  
  /** Semantic state colors */
  success: string;
  successLight?: string;
  successDark?: string;
  
  warning: string;
  warningLight?: string;
  warningDark?: string;
  
  error: string;
  errorLight?: string;
  errorDark?: string;
  
  info: string;
  infoLight?: string;
  infoDark?: string;
}

/**
 * Typography Tokens
 * 
 * Font families, sizes, weights, and line heights
 */
export interface TypographyTokens {
  /** Font families */
  fontFamily: {
    /** Primary font (body text) */
    primary: string;
    /** Secondary font (headings, special) */
    secondary?: string;
    /** Monospace font (code) */
    monospace?: string;
  };
  
  /** Font sizes (in rem or px) */
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl'?: string;
  };
  
  /** Font weights */
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  
  /** Line heights */
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
    loose: number;
  };
  
  /** Letter spacing */
  letterSpacing?: {
    tight: string;
    normal: string;
    wide: string;
  };
}

/**
 * Spacing Tokens
 * 
 * Consistent spacing scale for margins, padding, gaps
 */
export interface SpacingTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl'?: string;
  '5xl'?: string;
}

/**
 * Radius Tokens
 * 
 * Border radius values for different component sizes
 */
export interface RadiusTokens {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl'?: string;
  full: string;
}

/**
 * Shadow Tokens
 * 
 * Elevation and depth through shadows
 */
export interface ShadowTokens {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl'?: string;
  inner?: string;
}

/**
 * Motion Tokens
 * 
 * Animation durations and easing functions
 */
export interface MotionTokens {
  /** Animation durations (in ms) */
  duration: {
    instant: number;
    fast: number;
    normal: number;
    slow: number;
    slower: number;
  };
  
  /** Easing functions */
  easing: {
    linear: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
    spring?: string;
  };
}

/**
 * Breakpoint Tokens
 * 
 * Responsive design breakpoints (in px)
 */
export interface BreakpointTokens {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl'?: number;
}

/**
 * Z-Index Tokens
 * 
 * Layering system for overlays, modals, tooltips
 */
export interface ZIndexTokens {
  base: number;
  dropdown: number;
  sticky: number;
  overlay: number;
  modal: number;
  popover: number;
  tooltip: number;
  toast: number;
}

/**
 * Design Tokens
 * 
 * Complete set of semantic design tokens
 */
export interface DesignTokens {
  /** Color system */
  colors: ColorTokens;
  
  /** Typography system */
  typography: TypographyTokens;
  
  /** Spacing scale */
  spacing: SpacingTokens;
  
  /** Border radius scale */
  radius: RadiusTokens;
  
  /** Shadow scale */
  shadows: ShadowTokens;
  
  /** Motion/animation tokens */
  motion: MotionTokens;
  
  /** Responsive breakpoints */
  breakpoints: BreakpointTokens;
  
  /** Z-index layering */
  zIndex: ZIndexTokens;
}

/**
 * Theme Mode
 * 
 * Partial token overrides for different modes (dark, compact, etc.)
 */
export interface ThemeMode {
  /** Mode name */
  name: string;
  
  /** Mode label (user-facing) */
  label: string;
  
  /** Partial token overrides */
  tokens: Partial<DesignTokens>;
}

/**
 * Theme Modes Collection
 * 
 * Named modes that override base tokens
 */
export interface ThemeModes {
  /** Dark mode tokens */
  dark?: ThemeMode;
  
  /** Compact mode (reduced spacing) */
  compact?: ThemeMode;
  
  /** High contrast mode (accessibility) */
  highContrast?: ThemeMode;
  
  /** Custom modes */
  [key: string]: ThemeMode | undefined;
}

/**
 * Complete Theme
 * 
 * Combines metadata, base tokens, and mode overrides
 */
export interface Theme {
  /** Theme metadata */
  meta: ThemeMeta;
  
  /** Base design tokens (light mode default) */
  tokens: DesignTokens;
  
  /** Optional mode overrides */
  modes?: ThemeModes;
}

/**
 * Theme Preset
 * 
 * Named theme that can be selected by tenants
 */
export interface ThemePreset extends Theme {
  /** Whether this preset is built-in (immutable) */
  isBuiltIn?: boolean;
  
  /** Whether this preset is active/available */
  isActive?: boolean;
}

/**
 * Applied Theme
 * 
 * Theme with a specific mode applied (runtime representation)
 */
export interface AppliedTheme {
  /** Original theme */
  theme: Theme;
  
  /** Applied mode name (if any) */
  mode?: string;
  
  /** Merged tokens (base + mode overrides) */
  tokens: DesignTokens;
}

/**
 * Theme Selection
 * 
 * Tenant's theme choice
 */
export interface ThemeSelection {
  /** Selected theme ID */
  themeId: string;
  
  /** Selected mode (optional) */
  mode?: string;
  
  /** Custom token overrides (optional) */
  customTokens?: Partial<DesignTokens>;
}
