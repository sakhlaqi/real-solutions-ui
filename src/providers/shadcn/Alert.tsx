import React from 'react';
import type { BaseAlertProps } from '../../core/types';
import { Alert as ShadcnAlert, AlertTitle, AlertDescription } from './ui/alert';

/**
 * Shadcn Alert Adapter
 * Maps library's BaseAlertProps to shadcn/ui Alert
 */
export const Alert: React.FC<BaseAlertProps> = ({
  children,
  severity = 'info',
  onClose,
  title,
  icon,
  className,
}) => {
  // Map severity to shadcn variant
  const shadcnVariant = severity === 'error' ? 'destructive' :
                       severity === 'warning' ? 'warning' :
                       severity === 'success' ? 'success' :
                       severity === 'info' ? 'info' :
                       'default';

  return (
    <ShadcnAlert variant={shadcnVariant} onClose={onClose} className={className}>
      {icon && <span className="mr-2">{icon}</span>}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </ShadcnAlert>
  );
};

Alert.displayName = 'ShadcnAlert';

export { AlertTitle, AlertDescription };
