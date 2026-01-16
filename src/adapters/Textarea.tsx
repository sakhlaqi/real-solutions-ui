/**
 * Adaptive Textarea Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Textarea as InternalTextarea } from '../forms';
import { Textarea as MUITextarea } from '../providers/mui';
import { Textarea as RadixTextarea } from '../providers/radix';

export interface TextareaProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  error?: string | boolean;
  helperText?: string;
  maxLength?: number;
}

/**
 * Adaptive Textarea Component
 * 
 * @example
 * ```tsx
 * <Textarea
 *   label="Description"
 *   placeholder="Enter description"
 *   value={text}
 *   onChange={(e) => setText(e.target.value)}
 *   rows={4}
 * />
 * ```
 */
export const Textarea: React.FC<TextareaProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUITextarea {...props} />;
  }
  
  if (provider === 'radix') {
    return <RadixTextarea {...props} />;
  }
  
  // Transform props for internal (error must be string)
  const { error, ...otherProps } = props;
  const internalError = typeof error === 'boolean' ? undefined : error;
  return <InternalTextarea {...otherProps} error={internalError} />;
};

Textarea.displayName = 'AdapterTextarea';
