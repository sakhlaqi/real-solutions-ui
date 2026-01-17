/**
 * Adaptive Breadcrumb Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';
import { useUIContext } from '../core/context';
import { Breadcrumb as ShadcnBreadcrumb } from '../providers/shadcn';

export interface BreadcrumbProps {
  children: ReactNode;
  separator?: ReactNode;
  className?: string;
}

/**
 * Adaptive Breadcrumb Component
 * 
 * @example
 * ```tsx
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 * ```
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnBreadcrumb {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnBreadcrumb {...props} />;
};

Breadcrumb.displayName = 'AdapterBreadcrumb';
