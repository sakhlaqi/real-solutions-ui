/**
 * Shadcn Tooltip Component
 * Wrapper that includes TooltipProvider for shadcn tooltips
 */

import React from 'react';
import {
  Tooltip as ShadcnTooltipPrimitive,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from './ui/tooltip';

export interface TooltipProps {
  title: string;
  children: React.ReactElement;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  arrow?: boolean;
}

/**
 * Shadcn Tooltip Component with automatic provider wrapping
 */
export const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  placement = 'top',
}) => {
  return (
    <TooltipProvider>
      <ShadcnTooltipPrimitive>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side={placement}>
          {title}
        </TooltipContent>
      </ShadcnTooltipPrimitive>
    </TooltipProvider>
  );
};
