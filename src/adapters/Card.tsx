/**
 * Adaptive Card Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';
import { useUIContext } from '../core/context';
import { Card as InternalCard } from '../layout';
import { Card as MUICard } from '../providers/mui';
import { Card as RadixCard } from '../providers/radix';

export interface CardProps {
  children: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  elevation?: number;
  variant?: 'outlined' | 'elevation';
  className?: string;
  onClick?: () => void;
}

/**
 * Adaptive Card Component
 * 
 * @example
 * ```tsx
 * <Card padding="lg" elevation={2}>
 *   <h3>Card Title</h3>
 *   <p>Card content</p>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUICard {...props} />;
  }
  
  if (provider === 'radix') {
    return <RadixCard {...props} />;
  }
  
  // Internal Card uses simpler props
  const { elevation, variant, ...internalProps } = props;
  return <InternalCard {...internalProps} />;
};

Card.displayName = 'AdapterCard';
