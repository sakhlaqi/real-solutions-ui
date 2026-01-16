/**
 * Radix UI Drawer Wrapper
 * Uses Dialog with side positioning for drawer effect
 */

import React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import type { DrawerProps } from '../../core/types';

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  anchor = 'left',
  children,
  title,
  className,
}) => {
  const positionStyles = {
    left: { left: 0, top: 0, bottom: 0, transform: 'translateX(0%)' },
    right: { right: 0, top: 0, bottom: 0, transform: 'translateX(0%)' },
    top: { top: 0, left: 0, right: 0, transform: 'translateY(0%)' },
    bottom: { bottom: 0, left: 0, right: 0, transform: 'translateY(0%)' },
  };

  return (
    <RadixDialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose?.()}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          }}
        />
        <RadixDialog.Content
          className={className}
          style={{
            position: 'fixed',
            ...positionStyles[anchor],
            backgroundColor: 'var(--color-background)',
            padding: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            width: (anchor === 'left' || anchor === 'right') ? '400px' : 'auto',
            maxWidth: '90vw',
            height: (anchor === 'top' || anchor === 'bottom') ? 'auto' : '100%',
            maxHeight: (anchor === 'top' || anchor === 'bottom') ? '90vh' : '100%',
            overflow: 'auto',
            zIndex: 1001,
          }}
        >
          {title && (
            <RadixDialog.Title
              style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                marginBottom: '16px',
                paddingRight: '40px',
              }}
            >
              {title}
            </RadixDialog.Title>
          )}
          <RadixDialog.Close
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
            }}
            aria-label="Close"
          >
            <Cross2Icon width={20} height={20} />
          </RadixDialog.Close>
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Drawer;
