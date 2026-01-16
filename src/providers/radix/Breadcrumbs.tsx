/**
 * Radix UI Breadcrumbs Wrapper  
 * Simple breadcrumbs implementation using Radix styling
 */

import React from 'react';
import { Text, Flex } from '@radix-ui/themes';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import type { BreadcrumbsProps } from '../../core/types';

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator,
  className,
}) => {
  const SeparatorComponent = separator || <ChevronRightIcon />;

  return (
    <Flex align="center" gap="2" className={className}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <Text
              as="a"
              href={item.href}
              size="2"
              onClick={item.onClick}
              style={{
                color: 'var(--blue-9)',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              {item.label}
            </Text>
          ) : (
            <Text
              size="2"
              color={index === items.length - 1 ? 'gray' : undefined}
              weight={index === items.length - 1 ? 'medium' : undefined}
            >
              {item.label}
            </Text>
          )}
          {index < items.length - 1 && (
            <span style={{ display: 'flex', alignItems: 'center', color: 'var(--gray-9)' }}>
              {SeparatorComponent}
            </span>
          )}
        </React.Fragment>
      ))}
    </Flex>
  );
};

export default Breadcrumbs;
