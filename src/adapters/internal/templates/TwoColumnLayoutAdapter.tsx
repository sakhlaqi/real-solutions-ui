import React from 'react';
import type { TwoColumnLayoutProps } from '../../../core/templates/TwoColumnLayout/types';
// Fallback to MUI adapter
import { TwoColumnLayoutAdapter as MUITwoColumnLayoutAdapter } from '../../mui/templates/TwoColumnLayoutAdapter';

/**
 * Internal TwoColumnLayout Adapter
 * 
 * Fallback implementation using MUI Box.
 * Can be replaced with a custom internal implementation in the future.
 */
export const TwoColumnLayoutAdapter: React.FC<TwoColumnLayoutProps> = (props) => {
  return <MUITwoColumnLayoutAdapter {...props} />;
};

export default TwoColumnLayoutAdapter;
