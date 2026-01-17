import React from 'react';
import {
  Accordion as ShadcnAccordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion';
import type { AccordionProps as BaseAccordionProps } from '../../core/types';

/**
 * Shadcn Accordion Adapter
 * Maps library's AccordionProps to shadcn/ui Accordion
 */
export const Accordion: React.FC<BaseAccordionProps> = ({
  items,
  defaultExpanded,
  onChange,
  multiple = false,
}) => {
  const accordionProps = multiple
    ? { type: 'multiple' as const, defaultValue: defaultExpanded, onValueChange: onChange, collapsible: true }
    : { type: 'single' as const, defaultValue: defaultExpanded, onValueChange: onChange, collapsible: true };

  return (
    <ShadcnAccordion {...accordionProps as any}>
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </ShadcnAccordion>
  );
};

Accordion.displayName = 'ShadcnAccordion';
