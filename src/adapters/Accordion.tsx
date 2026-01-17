/**
 * Adaptive Accordion Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Accordion as InternalAccordion } from '../layout';
import { Accordion as MUIAccordion } from '../providers/mui';
import { Accordion as RadixAccordion } from '../providers/radix';
import { Accordion as ShadcnAccordion } from '../providers/shadcn';
import type { AccordionProps } from '../core/types';

/**
 * Adaptive Accordion Component
 * 
 * @example
 * ```tsx
 * <Accordion
 *   items={[
 *     { id: '1', title: 'Panel 1', content: 'Content 1' },
 *     { id: '2', title: 'Panel 2', content: 'Content 2' }
 *   ]}
 *   expanded={expandedPanel}
 *   onChange={setExpandedPanel}
 * />
 * ```
 */
export const Accordion: React.FC<AccordionProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIAccordion {...props} />;
  }
  
  if (provider === 'radix') {
    return <RadixAccordion {...props} />;
  }

  if (provider === 'shadcn') {
    return <ShadcnAccordion {...props} />;
  }
  
  // Transform for internal Accordion
  const { onChange, defaultExpanded, items, multiple } = props;
  
  return (
    <InternalAccordion
      items={items}
      defaultExpanded={defaultExpanded}
      multiple={multiple}
      onChange={onChange}
    />
  );
};

Accordion.displayName = 'AdapterAccordion';
