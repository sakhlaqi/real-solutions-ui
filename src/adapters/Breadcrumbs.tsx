/**
 * Adapter Breadcrumbs Component
 * 
 * Uses MUI Breadcrumbs for all providers.
 */

import React from 'react';
import { BreadcrumbsProps } from '../core/types';
import { Breadcrumbs as MUIBreadcrumbs } from '../providers/mui';

/**
 * Adaptive Breadcrumbs Component
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
  return <MUIBreadcrumbs {...props} />;
};

Breadcrumbs.displayName = 'AdapterBreadcrumbs';
