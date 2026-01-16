/**
 * Adapter Breadcrumbs Component
 * 
 * Dynamically switches between internal and MUI breadcrumbs implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { BreadcrumbsProps } from '../core/types';
import { useUIContext } from '../core/context';
import { Breadcrumbs as InternalBreadcrumbs } from '../navigation';
import { Breadcrumbs as MUIBreadcrumbs } from '../providers/mui';
import { Breadcrumbs as RadixBreadcrumbs } from '../providers/radix';

/**
 * Adaptive Breadcrumbs Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 * 
 * @example
 * ```tsx
 * <Breadcrumbs
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Details' }
 *   ]}
 * />
 * ```
 */
export const Breadcrumbs: React.FC<BreadcrumbsProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIBreadcrumbs {...props} />;
  }
  
  if (provider === 'radix') {
    return <RadixBreadcrumbs {...props} />;
  }
  
  return <InternalBreadcrumbs {...props} />;
};

Breadcrumbs.displayName = 'AdapterBreadcrumbs';
