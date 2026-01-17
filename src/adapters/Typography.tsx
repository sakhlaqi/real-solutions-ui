/**
 * Adapter Typography Component
 * 
 * Dynamically switches between internal, MUI, and Radix typography implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { TypographyProps } from '../core/types';
import { useUIContext } from '../core/context';
import { Heading, Text } from '../typography';
import { Typography as MUITypography } from '../providers/mui';
import { Typography as RadixTypography } from '../providers/radix';

/**
 * Adaptive Typography Component
 * 
 * Automatically switches between internal, MUI, and Radix implementations based on UIProvider.
 * 
 * @example
 * ```tsx
 * <Typography variant="h1">Page Title</Typography>
 * <Typography variant="body1" color="textSecondary">
 *   This is some body text.
 * </Typography>
 * ```
 */
export const Typography: React.FC<TypographyProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUITypography {...props} />;
  }
  
  if (provider === 'radix') {
    return <RadixTypography {...props} />;
  }
  
  // Internal implementation - map to Heading or Text
  const { variant = 'body1', children, align, gutterBottom, noWrap, className } = props;
  
  const isHeading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant);
  
  if (isHeading) {
    const level = parseInt(variant.replace('h', '')) as 1 | 2 | 3 | 4 | 5 | 6;
    const combinedClassName = [
      className,
      align ? `text-align-${align}` : '',
      gutterBottom ? 'gutter-bottom' : '',
      noWrap ? 'no-wrap' : '',
    ].filter(Boolean).join(' ');
    
    return (
      <Heading level={level} className={combinedClassName}>
        {children}
      </Heading>
    );
  }
  
  // Use Text component for body variants
  const sizeMap = {
    caption: 'xs' as const,
    body2: 'sm' as const,
    body1: 'md' as const,
    button: 'md' as const,
    overline: 'xs' as const,
  };
  
  const size = sizeMap[variant as keyof typeof sizeMap] || 'md';
  const weight = variant === 'button' ? 'medium' : 'normal';
  
  const combinedClassName = [
    className,
    gutterBottom ? 'gutter-bottom' : '',
    noWrap ? 'no-wrap' : '',
    variant === 'overline' ? 'text-overline' : '',
  ].filter(Boolean).join(' ');
  
  return (
    <Text 
      size={size} 
      weight={weight}
      align={align}
      className={combinedClassName}
    >
      {children}
    </Text>
  );
};

Typography.displayName = 'AdapterTypography';
