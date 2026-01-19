/**
 * Adapter Tag Component
 * 
 * Uses MUI Chip for all providers.
 */

import React from 'react';
import { Chip as MUIChip, ChipProps as MUIChipProps } from '../providers/mui';

// Tag is an alias for Chip
export type TagProps = MUIChipProps;

/**
 * Adaptive Tag Component
 * 
 * @example
 * ```tsx
 * <Tag label="New" variant="filled" color="success" />
 * ```
 */
export const Tag: React.FC<TagProps> = (props) => {
  return <MUIChip {...props} />;
};

Tag.displayName = 'AdapterTag';
