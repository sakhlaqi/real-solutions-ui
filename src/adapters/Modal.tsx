/**
 * Adapter Modal Component
 * 
 * Uses MUI Dialog for all providers.
 * Internal implementation is deprecated in favor of MUI's production-ready component.
 */

import React from 'react';
import { BaseModalProps } from '../core/types';
import { Modal as MUIModal } from '../providers/mui';

/**
 * Adaptive Modal Component
 * 
 * Note: This component now uses MUI implementation for all providers.
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
  return <MUIModal {...props} />;
};

Modal.displayName = 'AdapterModal';
