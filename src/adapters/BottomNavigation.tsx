/**
 * Adaptive BottomNavigation Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { BottomNavigation as InternalBottomNavigation } from '../navigation';
import { BottomNavigation as MUIBottomNavigation } from '../providers/mui';

export interface BottomNavigationAction {
  label: string;
  value: string;
  icon?: React.ReactElement;
}

export interface BottomNavigationProps {
  value: string;
  onChange: (value: string) => void;
  actions: BottomNavigationAction[];
  showLabels?: boolean;
}

/**
 * Adaptive BottomNavigation Component
 * 
 * @example
 * ```tsx
 * <BottomNavigation
 *   value={activeTab}
 *   onChange={setActiveTab}
 *   actions={[
 *     { label: 'Home', value: 'home', icon: <HomeIcon /> },
 *     { label: 'Search', value: 'search', icon: <SearchIcon /> },
 *   ]}
 * />
 * ```
 */
export const BottomNavigation: React.FC<BottomNavigationProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIBottomNavigation {...props} />;
  }
  
  // Transform actions to ensure icon is provided (internal requires it)
  const { actions, ...restProps } = props;
  const internalActions = actions.map(action => ({
    ...action,
    icon: action.icon || <span />,
  }));
  
  return <InternalBottomNavigation {...restProps} actions={internalActions} />;
};

BottomNavigation.displayName = 'AdapterBottomNavigation';
