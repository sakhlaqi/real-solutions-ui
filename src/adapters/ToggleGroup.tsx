/**
 * Adaptive ToggleGroup Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';
import { useUIContext } from '../core/context';
import { ToggleGroup as ShadcnToggleGroup } from '../providers/shadcn';

export interface ToggleGroupProps {
  children: ReactNode;
  type?: 'single' | 'multiple';
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Adaptive ToggleGroup Component
 * 
 * @example
 * ```tsx
 * <ToggleGroup type="single" value={value} onValueChange={setValue}>
 *   <ToggleGroupItem value="a">A</ToggleGroupItem>
 *   <ToggleGroupItem value="b">B</ToggleGroupItem>
 * </ToggleGroup>
 * ```
 */
export const ToggleGroup: React.FC<ToggleGroupProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnToggleGroup {...props as any} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnToggleGroup {...props as any} />;
};

ToggleGroup.displayName = 'AdapterToggleGroup';
