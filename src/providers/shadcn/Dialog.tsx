import React from 'react';
import {
  Dialog as ShadcnDialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';

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

/**
 * Shadcn Dialog Adapter
 * Maps library's DialogProps to shadcn/ui Dialog
 */
export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'md',
  fullWidth,
  fullScreen,
}) => {
  // Map maxWidth to Tailwind classes
  const widthClass = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }[maxWidth];

  return (
    <ShadcnDialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={`${widthClass} ${fullWidth ? 'w-full' : ''} ${
          fullScreen ? 'max-w-full w-screen h-screen' : ''
        }`}
      >
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        
        <div className="py-4">{children}</div>
        
        {actions && (
          <DialogFooter>
            {actions}
          </DialogFooter>
        )}
      </DialogContent>
    </ShadcnDialog>
  );
};

Dialog.displayName = 'ShadcnDialog';
