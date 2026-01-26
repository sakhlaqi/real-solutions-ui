/**
 * Theme Module - Complete Theming System
 * 
 * Includes presets, overrides, adapters, and legacy support
 */

// Types
export * from './types';

// Registry
export * from './registry';

// Utilities
export * from './utils';

// Presets
export * from './presets';

// Adapters
export * from './adapters/mui';
export * from './adapters/internal';

// Legacy
export * from './tokenMapper';

// Ensure presets are registered
import './presets';
