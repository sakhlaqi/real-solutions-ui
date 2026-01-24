import React from 'react';
import type { DashboardLayoutProps } from '../../../core/templates/DashboardLayout/types';
// Fallback to MUI adapter
import { DashboardLayoutAdapter as MUIDashboardLayoutAdapter } from '../../mui/templates/DashboardLayoutAdapter';

/**
 * Internal DashboardLayout Adapter
 * 
 * Fallback implementation using MUI Box/Container.
 * Can be replaced with a custom internal implementation in the future.
 */
export const DashboardLayoutAdapter: React.FC<DashboardLayoutProps> = (props) => {
  return <MUIDashboardLayoutAdapter {...props} />;
};

export default DashboardLayoutAdapter;
