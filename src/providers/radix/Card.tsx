/**
 * Radix UI Card Wrapper
 * Adapts Radix UI Card to match internal Card API
 */

import React from 'react';
import { Card as RadixCard, Flex, Heading, Text } from '@radix-ui/themes';
import type { CardProps } from '../../core/types';

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  actions,
  media,
  variant = 'elevated',
  className,
}) => {
  return (
    <RadixCard className={className} variant={variant === 'outlined' ? 'classic' : 'surface'}>
      {media && <div style={{ marginBottom: '16px' }}>{media}</div>}
      {title && (
        <Heading as="h3" size="4" mb="2">
          {title}
        </Heading>
      )}
      {subtitle && (
        <Text as="p" size="2" color="gray" mb="3">
          {subtitle}
        </Text>
      )}
      {children && <div style={{ marginBottom: actions ? '16px' : 0 }}>{children}</div>}
      {actions && (
        <Flex gap="2" justify="end" mt="3">
          {actions}
        </Flex>
      )}
    </RadixCard>
  );
};

export default Card;
