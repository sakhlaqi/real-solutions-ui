import React from 'react';
import { Badge as ShadcnBadge } from './ui/badge';
import { cn } from './utils';

export interface BadgeProps {
  children: React.ReactElement;
  content?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  variant?: 'standard' | 'dot';
  max?: number;
  invisible?: boolean;
}

/**
 * Shadcn Badge Adapter
 * Maps library's BadgeProps to shadcn/ui Badge
 * Note: shadcn Badge is a label/tag style, not a notification badge wrapper
 * This adapter provides basic badge functionality
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  content,
  color,
  variant = 'standard',
  max = 99,
  invisible,
}) => {
  if (invisible || !content) {
    return children;
  }

  // Map color to shadcn variant
  const shadcnVariant = color === 'error' ? 'destructive' : 
                       color === 'secondary' ? 'secondary' : 
                       'default';

  // Format content with max value
  const displayContent = typeof content === 'number' && content > max
    ? `${max}+`
    : content;

  return (
    <div className="relative inline-block">
      {children}
      <ShadcnBadge
        variant={shadcnVariant}
        className={cn(
          'absolute -top-2 -right-2',
          variant === 'dot' && 'h-2 w-2 p-0 rounded-full'
        )}
      >
        {variant === 'standard' && displayContent}
      </ShadcnBadge>
    </div>
  );
};

Badge.displayName = 'ShadcnBadge';
