/**
 * MUI Accordion Wrapper Component
 */

import React from 'react';
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
  onChange?: (id: string) => void;
  multiple?: boolean;
  disabled?: boolean;
}

/**
 * MUI Accordion wrapper component
 */
export const Accordion: React.FC<AccordionProps> = ({
  items,
  expanded,
  onChange,
  disabled = false,
}) => {
  const isExpanded = (id: string) => {
    if (Array.isArray(expanded)) {
      return expanded.includes(id);
    }
    return expanded === id;
  };

  const handleChange = (id: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    if (onChange && isExpanded) {
      // Only trigger onChange when expanding (not collapsing)
      onChange(id);
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
