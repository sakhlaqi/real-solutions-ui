import React, { useState } from 'react';
import './Accordion.css';

export interface AccordionItemProps {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  defaultExpanded?: string | string[];
  multiple?: boolean;
  onChange?: (expanded: string | string[]) => void;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultExpanded = [],
  multiple = false,
  onChange,
  className = '',
}) => {
  const [expanded, setExpanded] = useState<string | string[]>(
    Array.isArray(defaultExpanded) ? defaultExpanded : [defaultExpanded].filter(Boolean)
  );

  const isExpanded = (id: string): boolean => {
    return Array.isArray(expanded) ? expanded.includes(id) : expanded === id;
  };

  const handleToggle = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item?.disabled) return;

    let newExpanded: string | string[];

    if (multiple) {
      const expandedArray = Array.isArray(expanded) ? expanded : expanded ? [expanded] : [];
      newExpanded = expandedArray.includes(id)
        ? expandedArray.filter(item => item !== id)
        : [...expandedArray, id];
    } else {
      newExpanded = isExpanded(id) ? '' : id;
    }

    setExpanded(newExpanded);
    onChange?.(newExpanded);
  };

  return (
    <div className={`accordion ${className}`}>
      {items.map((item) => {
        const itemExpanded = isExpanded(item.id);

        return (
          <div
            key={item.id}
            className={`accordion-item ${itemExpanded ? 'expanded' : ''} ${
              item.disabled ? 'disabled' : ''
            }`}
          >
            <button
              className="accordion-header"
              onClick={() => handleToggle(item.id)}
              disabled={item.disabled}
              aria-expanded={itemExpanded}
              type="button"
            >
              <div className="accordion-title">{item.title}</div>
              <svg
                className={`accordion-icon ${itemExpanded ? 'expanded' : ''}`}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className={`accordion-panel ${itemExpanded ? 'expanded' : ''}`}>
              <div className="accordion-content">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
