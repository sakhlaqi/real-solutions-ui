import React, { ReactNode } from 'react';
import { Card as ShadcnCard, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from './ui/card';
import { cn } from './utils';

export interface CardProps {
  children: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  elevation?: number;
  variant?: 'outlined' | 'elevation';
  className?: string;
  onClick?: () => void;
}

/**
 * Shadcn Card Adapter
 * Maps library's CardProps to shadcn/ui Card
 */
export const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  variant,
  className,
  onClick,
}) => {
  // Map padding to Tailwind classes
  const paddingClass = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  }[padding];

  return (
    <ShadcnCard
      onClick={onClick}
      className={cn(
        paddingClass,
        variant === 'outlined' && 'border-2',
        className
      )}
    >
      {children}
    </ShadcnCard>
  );
};

Card.displayName = 'ShadcnCard';

// Export sub-components for direct use
export { CardHeader, CardContent, CardFooter, CardTitle, CardDescription };
