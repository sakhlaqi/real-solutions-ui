/**
 * Radix UI Typography Wrapper
 * Adapts Radix UI Text/Heading to match internal Typography API
 */

import React from 'react';
import { Text, Heading } from '@radix-ui/themes';
import type { TypographyProps } from '../../core/types';

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body1',
  color: _color,
  align,
  gutterBottom = false,
  noWrap = false,
  className,
}) => {
  // Map variant to Radix component and size
  const isHeading = variant && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant);
  
  if (isHeading) {
    // Use Radix Heading for h1-h6
    const level = parseInt(variant.replace('h', '')) as 1 | 2 | 3 | 4 | 5 | 6;
    const size = level <= 2 ? '8' : level <= 4 ? '6' : '4';
    
    return (
      <Heading
        as={variant as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}
        size={size}
        className={className}
        style={{
          textAlign: align,
          marginBottom: gutterBottom ? '0.5em' : undefined,
          whiteSpace: noWrap ? 'nowrap' : undefined,
          overflow: noWrap ? 'hidden' : undefined,
          textOverflow: noWrap ? 'ellipsis' : undefined,
        }}
      >
        {children}
      </Heading>
    );
  }

  // Use Radix Text for body text
  const size = variant === 'caption' ? '1' :
               variant === 'body2' ? '2' :
               variant === 'body1' ? '3' :
               variant === 'button' ? '2' :
               variant === 'overline' ? '1' : '3';

  const weight = variant === 'button' ? 'medium' :
                 variant === 'overline' ? 'medium' : 'regular';

  return (
    <Text
      as="p"
      size={size}
      weight={weight}
      className={className}
      style={{
        textAlign: align,
        marginBottom: gutterBottom ? '0.5em' : undefined,
        whiteSpace: noWrap ? 'nowrap' : undefined,
        overflow: noWrap ? 'hidden' : undefined,
        textOverflow: noWrap ? 'ellipsis' : undefined,
        textTransform: variant === 'overline' ? 'uppercase' : undefined,
        letterSpacing: variant === 'overline' ? '0.08em' : undefined,
      }}
    >
      {children}
    </Text>
  );
};
