/**
 * Internal Provider Components
 * 
 * NOTE: Due to architectural differences between the existing internal components
 * and the new shared component interfaces, internal components are accessed directly.
 * 
 * The adapters in ../adapters use the existing internal components directly.
 * This file exists for namespace consistency but doesn't wrap components.
 * 
 * To use internal components explicitly:
 * - Import directly from component directories: import { Button } from '@sakhlaqi/ui/buttons'
 * - Or use the adaptive components which default to internal implementation
 */

// Placeholder exports for namespace consistency
// Actual components are imported directly by adapters
export const __namespace = 'internal';
