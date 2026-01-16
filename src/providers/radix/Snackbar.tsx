/**
 * Radix UI Toast/Snackbar Wrapper
 * Adapts Radix UI Toast to match internal Snackbar API
 */

import React from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { Cross2Icon } from '@radix-ui/react-icons';
import type { SnackbarProps } from '../../core/types';

export const Snackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  severity = 'info',
  autoHideDuration = 6000,
  onClose,
  action,
  className,
}) => {
  const colorMap = {
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',
    success: '#4caf50',
  };

  return (
    <RadixToast.Provider swipeDirection="right">
      <RadixToast.Root
        open={open}
        onOpenChange={(isOpen) => !isOpen && onClose?.()}
        duration={autoHideDuration}
        className={className}
        style={{
          backgroundColor: colorMap[severity],
          color: 'white',
          padding: '16px',
          borderRadius: '6px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <RadixToast.Description>{message}</RadixToast.Description>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {action}
          <RadixToast.Close asChild>
            <button
              style={{
                border: 'none',
                background: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
              }}
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </RadixToast.Close>
        </div>
      </RadixToast.Root>
      <RadixToast.Viewport
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          width: '390px',
          maxWidth: '100vw',
          padding: '16px',
          zIndex: 2000,
        }}
      />
    </RadixToast.Provider>
  );
};

export default Snackbar;
