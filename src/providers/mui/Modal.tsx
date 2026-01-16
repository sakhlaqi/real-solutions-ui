import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BaseModalProps } from '../../core/types';

export const Modal: React.FC<BaseModalProps> = ({
  open,
  onClose,
  children,
  title,
  maxWidth = 'sm',
  fullWidth = false,
  fullScreen = false,
  actions,
  className,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      className={className}
    >
      {title && (
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {title}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ marginLeft: 'auto' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

Modal.displayName = 'MUIModal';
