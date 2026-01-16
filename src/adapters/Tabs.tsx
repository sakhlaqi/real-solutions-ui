/**
 * Adapter Tabs Component
 * 
 * Dynamically switches between internal and MUI tabs implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { BaseTabsProps } from '../core/types';
import { useUIContext } from '../core/context';
import { Tabs as InternalTabs } from '../navigation';
import { Tabs as MUITabs } from '../providers/mui';

/**
 * Adaptive Tabs Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
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
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUITabs {...props} />;
  }
  
  // Transform MUI-style tabs to internal format
  const { tabs, value, onChange, variant, orientation, ...restProps } = props;
  const internalTabs = tabs.map((tab: any) => ({
    id: String(tab.value),
    label: tab.label,
    content: tab.content || <></>,
    disabled: tab.disabled,
    icon: tab.icon,
  }));
  
  // Map MUI variant to internal variant
  let internalVariant: 'line' | 'enclosed' | 'pills' | undefined;
  if (variant === 'standard') internalVariant = 'line';
  else if (variant === 'fullWidth') internalVariant = 'enclosed';
  else if (variant === 'scrollable') internalVariant = 'pills';
  
  return <InternalTabs 
    {...restProps} 
    tabs={internalTabs} 
    activeTab={String(value)}
    onChange={(tabId) => onChange?.(tabId as any)}
    variant={internalVariant}
  />;
};

Tabs.displayName = 'AdapterTabs';
