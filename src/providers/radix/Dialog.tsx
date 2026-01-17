/**
 * Radix UI Dialog Wrapper (separate from Modal)
 * Adapts Radix UI AlertDialog to match internal Dialog API
 */

import React from 'react';
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import { Flex, Button } from '@radix-ui/themes';
import type { DialogProps } from '../../core/types';

export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  onConfirm,
  onCancel,
  title,
  children,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading,
  className,
}) => {
  return (
    <RadixAlertDialog.Root open={open} onOpenChange={(isOpen: boolean) => { if (!isOpen) { onClose?.(); onCancel?.(); } }}>
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          }}
        />
        <RadixAlertDialog.Content
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
            maxWidth: '500px',
            width: '90%',
            zIndex: 1001,
          }}
        >
          <RadixAlertDialog.Title
            style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            {title}
          </RadixAlertDialog.Title>
          <RadixAlertDialog.Description
            style={{
              fontSize: '1rem',
              color: 'var(--gray-11)',
              marginBottom: '24px',
            }}
          >
            {children}
          </RadixAlertDialog.Description>
          <Flex gap="3" justify="end">
            <RadixAlertDialog.Cancel asChild>
              <Button variant="soft" color="gray" onClick={onCancel || onClose}>
                {cancelText}
              </Button>
            </RadixAlertDialog.Cancel>
            <RadixAlertDialog.Action asChild>
              <Button
                variant="solid"
                onClick={onConfirm}
                disabled={loading}
              >
                {confirmText}
              </Button>
            </RadixAlertDialog.Action>
          </Flex>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  );
};

export default Dialog;
