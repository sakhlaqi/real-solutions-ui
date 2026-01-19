/**
 * Adaptive BottomNavigation Component
 * 
 * Uses MUI BottomNavigation for all providers.
 */

import React from 'react';
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
  return <MUIBottomNavigation {...props} />;
};

BottomNavigation.displayName = 'AdapterBottomNavigation';
