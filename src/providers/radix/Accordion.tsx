/**
 * Radix UI Accordion Wrapper
 * Adapts Radix UI Accordion to match internal Accordion API
 */

import React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import type { AccordionProps } from '../../core/types';

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultExpanded,
  multiple = false,
  className,
}) => {
  const defaultValue = defaultExpanded 
    ? (typeof defaultExpanded === 'string' ? defaultExpanded : defaultExpanded)
    : undefined;

  return (
    <RadixAccordion.Root
      type={multiple ? 'multiple' : 'single'}
      defaultValue={defaultValue as any}
      collapsible={!multiple}
      className={className}
      style={{
        borderRadius: '6px',
        backgroundColor: 'var(--color-background)',
      }}
    >
      {items.map((item, index) => (
        <RadixAccordion.Item
          key={item.id || `item-${index}`}
          value={item.id || `item-${index}`}
          style={{
            borderBottom: index < items.length - 1 ? '1px solid var(--gray-6)' : 'none',
          }}
        >
          <RadixAccordion.Header>
            <RadixAccordion.Trigger
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 500,
              }}
            >
              {item.summary}
              <ChevronDownIcon
                style={{
                  transition: 'transform 300ms',
                }}
              />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content
            style={{
              padding: '0 16px 16px',
              overflow: 'hidden',
            }}
          >
            {item.content}
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
};

export default Accordion;
