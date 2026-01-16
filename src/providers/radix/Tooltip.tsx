/**
 * Radix UI Tooltip Wrapper
 * Adapts Radix UI Tooltip to match internal Tooltip API
 */

import React from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import type { TooltipProps } from '../../core/types';

export const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  placement = 'top',
  open,
  className,
}) => {
  return (
    <RadixTooltip.Provider delayDuration={200}>
      <RadixTooltip.Root open={open}>
        <RadixTooltip.Trigger asChild>
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={placement}
            className={className}
            style={{
              backgroundColor: 'var(--gray-12)',
              color: 'var(--gray-1)',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '0.875rem',
              maxWidth: '300px',
              zIndex: 1000,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}
          >
            {title}
            <RadixTooltip.Arrow style={{ fill: 'var(--gray-12)' }} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default Tooltip;
