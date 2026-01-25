/**
 * MUI Accordion Wrapper Component
 */

import React, { useState } from 'react';
import {
  Accordion as MUIAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  expanded?: string | string[];
  defaultExpanded?: string | string[];
  onChange?: (id: string | string[]) => void;
  multiple?: boolean;
  disabled?: boolean;
}

/**
 * MUI Accordion wrapper component
 */
export const Accordion: React.FC<AccordionProps> = ({
  items,
  expanded: controlledExpanded,
  defaultExpanded,
  onChange,
  multiple = false,
  disabled = false,
}) => {
  // Internal state for uncontrolled mode
  const [internalExpanded, setInternalExpanded] = useState<string | string[]>(() => {
    if (defaultExpanded !== undefined) {
      return defaultExpanded;
    }
    return multiple ? [] : '';
  });

  // Use controlled value if provided, otherwise use internal state
  const expanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const isExpanded = (id: string) => {
    if (Array.isArray(expanded)) {
      return expanded.includes(id);
    }
    return expanded === id;
  };

  const handleChange = (id: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    let newExpanded: string | string[];

    if (multiple) {
      // Multiple mode: manage array of expanded items
      const currentExpanded = Array.isArray(expanded) ? expanded : expanded ? [expanded] : [];
      if (isExpanded) {
        newExpanded = [...currentExpanded, id];
      } else {
        newExpanded = currentExpanded.filter((item) => item !== id);
      }
    } else {
      // Single mode: only one item can be expanded
      newExpanded = isExpanded ? id : '';
    }

    // Update internal state if uncontrolled
    if (controlledExpanded === undefined) {
      setInternalExpanded(newExpanded);
    }

    // Call onChange callback
    if (onChange) {
      onChange(newExpanded);
    }
  };

  return (
    <>
      {items.map((item) => (
        <MUIAccordion
          key={item.id}
          expanded={isExpanded(item.id)}
          onChange={handleChange(item.id)}
          disabled={item.disabled || disabled}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${item.id}-content`}
            id={`${item.id}-header`}
          >
            <Typography>{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {typeof item.content === 'string' ? (
              <Typography>{item.content}</Typography>
            ) : (
              item.content
            )}
          </AccordionDetails>
        </MUIAccordion>
      ))}
    </>
  );
};

Accordion.displayName = 'MUIAccordion';
