/**
 * Adaptive Accordion Component
 * 
 * Uses MUI Accordion for all providers.
 */

import React from 'react';
import { Accordion as MUIAccordion } from '../providers/mui';
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
  return <MUIAccordion {...props} />;
};

Accordion.displayName = 'AdapterAccordion';
