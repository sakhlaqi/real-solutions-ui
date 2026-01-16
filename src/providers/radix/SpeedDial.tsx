/**
 * Radix UI SpeedDial Wrapper
 * Simple speed dial implementation with floating action button
 */

import React, { useState } from 'react';
import { Flex, IconButton } from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import type { SpeedDialProps } from '../../core/types';

export const SpeedDial: React.FC<SpeedDialProps> = ({
  ariaLabel,
  icon = <PlusIcon />,
  actions,
  direction = 'up',
  hidden = false,
  className,
}) => {
  const [open, setOpen] = useState(false);

  if (hidden) return null;

  return (
    <div
      className={className}
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        zIndex: 1000,
      }}
    >
      <Flex direction={direction === 'up' ? 'column-reverse' : 'column'} gap="2" align="end">
        {open && actions.map((action, index) => (
          <Flex key={index} align="center" gap="2">
            {action.tooltipTitle && (
              <span
                style={{
                  backgroundColor: 'var(--gray-12)',
                  color: 'var(--gray-1)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                }}
              >
                {action.tooltipTitle}
              </span>
            )}
            <IconButton
              size="3"
              onClick={action.onClick}
              aria-label={action.tooltipTitle}
            >
              {action.icon}
            </IconButton>
          </Flex>
        ))}
        <IconButton
          size="4"
          onClick={() => setOpen(!open)}
          aria-label={ariaLabel}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
          }}
        >
          {icon}
        </IconButton>
      </Flex>
    </div>
  );
};

export default SpeedDial;
