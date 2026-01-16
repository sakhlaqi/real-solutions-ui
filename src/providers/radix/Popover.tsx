/**
 * Radix UI Popover Wrapper
 * Adapts Radix UI Popover to match internal Popover API
 */

import React from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import type { PopoverProps } from '../../core/types';

export const Popover: React.FC<PopoverProps> = ({
  open,
  onClose,
  anchorEl,
  children,
  content,
  placement = 'bottom',
  className,
}) => {
  return (
    <RadixPopover.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose?.()}>
      <RadixPopover.Trigger asChild={!!children}>
        {children || <button>Open Popover</button>}
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          side={placement}
          className={className}
          style={{
            backgroundColor: 'var(--color-background)',
            border: '1px solid var(--gray-7)',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            maxWidth: '400px',
            zIndex: 1000,
          }}
        >
          {content}
          <RadixPopover.Arrow style={{ fill: 'var(--gray-7)' }} />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};

export default Popover;
