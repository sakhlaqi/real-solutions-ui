/**
 * Adaptive AlertDialog Component
 * 
 * Automatically switches between provider implementations based on UIProvider.
 */

import React, { ReactNode } from 'react';
import { useUIContext } from '../core/context';
import { AlertDialog as ShadcnAlertDialog } from '../providers/shadcn';

export interface AlertDialogProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/**
 * Adaptive AlertDialog Component
 * 
 * @example
 * ```tsx
 * <AlertDialog open={open} onOpenChange={setOpen}>
 *   {children}
 * </AlertDialog>
 * ```
 */
export const AlertDialog: React.FC<AlertDialogProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn' || provider === 'radix') {
    return <ShadcnAlertDialog {...props} />;
  }
  
  // Fallback to shadcn for other providers
  return <ShadcnAlertDialog {...props} />;
};

AlertDialog.displayName = 'AdapterAlertDialog';
