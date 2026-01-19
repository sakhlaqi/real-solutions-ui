/**
 * Adapter Tabs Component
 * 
 * Uses MUI Tabs for all providers.
 */

import React from 'react';
import { BaseTabsProps } from '../core/types';
import { Tabs as MUITabs } from '../providers/mui';

/**
 * Adaptive Tabs Component
 * 
 * @example
 * ```tsx
 * <Tabs
 *   value={activeTab}
 *   onChange={(value) => setActiveTab(value)}
 *   tabs={[
 *     { label: 'Overview', value: 'overview' },
 *     { label: 'Details', value: 'details' },
 *     { label: 'Settings', value: 'settings' }
 *   ]}
 * />
 * ```
 */
export const Tabs: React.FC<BaseTabsProps> = (props) => {
  return <MUITabs {...props} />;
};

Tabs.displayName = 'AdapterTabs';
