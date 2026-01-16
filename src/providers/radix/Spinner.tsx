/**
 * Radix UI Spinner Wrapper
 * Adapts Radix UI Spinner to match internal Spinner API
 */

import React from 'react';
import { Spinner as RadixSpinner } from '@radix-ui/themes';
import type { SpinnerProps } from '../../core/types';

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'medium',
  color = 'primary',
  className,
}) => {
  const sizeMap = { small: '1', medium: '2', large: '3' };
  const radixSize = sizeMap[size];

  return <RadixSpinner size={radixSize as any} className={className} />;
};

export default Spinner;
