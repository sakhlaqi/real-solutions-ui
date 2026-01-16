import React from 'react';
import { Snackbar as MuiSnackbar, Alert } from '@mui/material';
import { SnackbarProps } from '../../core/types';

export const Snackbar: React.FC<SnackbarProps> = ({
  open,
  onClose,
  message,
  severity = 'info',
  autoHideDuration = 6000,
  position = 'bottom-center',
}) => {
  const [vertical, horizontal] = position.split('-') as ['top' | 'bottom', 'left' | 'center' | 'right'];

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

Snackbar.displayName = 'MUISnackbar';
