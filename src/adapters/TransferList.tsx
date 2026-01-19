/**
 * Adapter TransferList Component
 * 
 * Uses MUI TransferList for all providers.
 * Internal implementation is deprecated in favor of MUI's implementation.
 */

import React from 'react';
import { TransferList as MUITransferList, TransferListProps as MUITransferListProps } from '../providers/mui/TransferList';

export type TransferListProps = MUITransferListProps;

/**
 * Adaptive TransferList Component
 * 
 * @example
 * ```tsx
 * <TransferList
 *   leftItems={availableItems}
 *   rightItems={selectedItems}
 *   onChange={(left, right) => handleChange(left, right)}
 *   leftTitle="Available"
 *   rightTitle="Selected"
 * />
 * ```
 */
export const TransferList: React.FC<TransferListProps> = (props) => {
  return <MUITransferList {...props} />;
};

TransferList.displayName = 'AdapterTransferList';
