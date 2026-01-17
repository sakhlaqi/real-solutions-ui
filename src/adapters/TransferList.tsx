/**
 * Adapter TransferList Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { TransferList as InternalTransferList, TransferListProps } from '../forms';

/**
 * Adaptive TransferList Component
 * 
 * @example
 * ```tsx
 * <TransferList
 *   leftItems={availableItems}
 *   rightItems={selectedItems}
 *   onTransfer={handleTransfer}
 *   leftTitle="Available"
 *   rightTitle="Selected"
 * />
 * ```
 */
export const TransferList: React.FC<TransferListProps> = (props) => {
  // TransferList always uses internal implementation as it's a complex
  // dual-list component with transfer logic
  return <InternalTransferList {...props} />;
};

TransferList.displayName = 'AdapterTransferList';
