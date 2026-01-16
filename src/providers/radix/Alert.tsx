/**
 * Radix UI Alert Wrapper
 * Adapts Radix UI Alert Dialog to match internal Alert API
 */

import React from 'react';
import { Callout } from '@radix-ui/themes';
import { InfoCircledIcon, CheckCircledIcon, CrossCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import type { AlertProps } from '../../core/types';

export const Alert: React.FC<AlertProps> = ({
  severity = 'info',
  title,
  children,
  onClose,
  className,
}) => {
  const iconMap = {
    error: <CrossCircledIcon />,
    warning: <ExclamationTriangleIcon />,
    info: <InfoCircledIcon />,
    success: <CheckCircledIcon />,
  };

  const colorMap = {
    error: 'red',
    warning: 'orange',
    info: 'blue',
    success: 'green',
  };

  return (
    <Callout.Root
      color={colorMap[severity] as any}
      className={className}
      style={{ position: 'relative' }}
    >
      <Callout.Icon>
        {iconMap[severity]}
      </Callout.Icon>
      <Callout.Text>
        {title && <strong style={{ display: 'block', marginBottom: '4px' }}>{title}</strong>}
        {children}
      </Callout.Text>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: '4px',
          }}
          aria-label="Close"
        >
          <CrossCircledIcon />
        </button>
      )}
    </Callout.Root>
  );
};

export default Alert;
