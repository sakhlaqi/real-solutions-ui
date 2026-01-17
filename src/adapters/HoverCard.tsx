/**
 * Adaptive HoverCard Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';
import { useUIContext } from '../core/context';
import { HoverCard as ShadcnHoverCard } from '../providers/shadcn';

export interface HoverCardProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
  className?: string;
}

/**
 * Adaptive HoverCard Component
 * 
 * @example
 * ```tsx
 * <HoverCard>
 *   <HoverCardTrigger>Hover me</HoverCardTrigger>
 *   <HoverCardContent>Content</HoverCardContent>
 * </HoverCard>
 * ```
 */
export const HoverCard: React.FC<HoverCardProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnHoverCard {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnHoverCard {...props} />;
};

HoverCard.displayName = 'AdapterHoverCard';
