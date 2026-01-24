import React from 'react';
import type { HeaderCompositeProps } from '../../../core/composites/Header/types';
// Fallback to MUI adapter
import { HeaderCompositeAdapter as MUIHeaderAdapter } from '../../mui/composites/HeaderCompositeAdapter';

/**
 * Internal HeaderComposite Adapter
 * 
 * Fallback implementation using MUI AppBar.
 * Can be replaced with a custom internal implementation in the future.
 */
export const HeaderCompositeAdapter: React.FC<HeaderCompositeProps> = (props) => {
  return <MUIHeaderAdapter {...props} />;
};

export default HeaderCompositeAdapter;
