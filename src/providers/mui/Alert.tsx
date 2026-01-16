import React from 'react';
import { Alert as MuiAlert, AlertTitle } from '@mui/material';
import { BaseAlertProps } from '../../core/types';

export const Alert: React.FC<BaseAlertProps> = ({
  severity = 'info',
  variant = 'standard',
  children,
  onClose,
  title,
  icon,
  className,
}) => {
  return (
    <MuiAlert
      severity={severity}
      variant={variant}
      onClose={onClose}
      icon={icon}
      className={className}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </MuiAlert>
  );
};

Alert.displayName = 'MUIAlert';
