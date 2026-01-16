/**
 * Adaptive Accordion Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Accordion as InternalAccordion } from '../layout';
import { Accordion as MUIAccordion } from '../providers/mui';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  expanded?: string | string[];
  onChange?: (id: string) => void;
  multiple?: boolean;
  disabled?: boolean;
}

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
  
  // Transform for internal Accordion
  const { onChange, expanded, items, multiple } = props;
  
  const handleChange = (expandedValue: string | string[]) => {
    // Internal onChange expects the full expanded state, just extract the id
    const id = Array.isArray(expandedValue) ? expandedValue[0] : expandedValue;
    onChange?.(id);
  };
  
  return (
    <InternalAccordion
      items={items}
      defaultExpanded={expanded}
      multiple={multiple}
      onChange={handleChange}
    />
  );
};

Accordion.displayName = 'AdapterAccordion';
