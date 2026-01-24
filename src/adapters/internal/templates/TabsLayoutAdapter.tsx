import React from 'react';
import type { TabsLayoutProps } from '../../../core/templates/TabsLayout/types';
// Fallback to MUI adapter
import { TabsLayoutAdapter as MUITabsLayoutAdapter } from '../../mui/templates/TabsLayoutAdapter';

/**
 * Internal TabsLayout Adapter
 * 
 * Fallback implementation using MUI Tabs.
 * Can be replaced with a custom internal implementation in the future.
 */
export const TabsLayoutAdapter: React.FC<TabsLayoutProps> = (props) => {
  return <MUITabsLayoutAdapter {...props} />;
};

export default TabsLayoutAdapter;
