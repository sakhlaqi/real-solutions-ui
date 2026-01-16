/**
 * Adapter Modal Component
 * 
 * Dynamically switches between internal and MUI modal implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { BaseModalProps } from '../core/types';
import { useUIContext } from '../core/context';
import { Modal as InternalModal } from '../overlay';
import { Modal as MUIModal } from '../providers/mui';

/**
 * Adaptive Modal Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 * 
 * @example
 * ```tsx
 * <Modal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirmation"
 *   actions={<Button onClick={handleConfirm}>Confirm</Button>}
 * >
 *   <p>Are you sure you want to proceed?</p>
 * </Modal>
 * ```
 */
export const Modal: React.FC<BaseModalProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIModal {...props} />;
  }
  
  // Transform props - internal uses 'isOpen', MUI uses 'open'
  const { open, ...restProps } = props;
  
  return <InternalModal {...restProps} isOpen={open} />;
};

Modal.displayName = 'AdapterModal';
