/**
 * MUI Dialog Wrapper
 */

import React from 'react';
import {
  Dialog as MUIDialogBase,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  fullScreen?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  fullWidth = false,
  fullScreen = false,
}) => {
  return (
    <MUIDialogBase
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </MUIDialogBase>
  );
};

Dialog.displayName = 'MUIDialog';
