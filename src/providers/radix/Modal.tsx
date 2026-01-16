/**
 * Radix UI Dialog Wrapper
 * Adapts Radix UI Dialog to match internal Modal API
 */

import React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import type { ModalProps } from '../../core/types';

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullScreen = false,
  className,
}) => {
  const widthMap = {
    xs: '400px',
    sm: '600px',
    md: '800px',
    lg: '1000px',
    xl: '1200px',
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
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'var(--color-background)',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            maxWidth: fullScreen ? '100%' : widthMap[maxWidth],
            width: fullScreen ? '100%' : '90%',
            maxHeight: fullScreen ? '100%' : '90vh',
            height: fullScreen ? '100%' : 'auto',
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
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close"
          >
            <Cross2Icon width={20} height={20} />
          </RadixDialog.Close>
          <RadixDialog.Description style={{ marginBottom: actions ? '24px' : 0 }}>
            {children}
          </RadixDialog.Description>
          {actions && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
                marginTop: '24px',
              }}
            >
              {actions}
            </div>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Modal;
