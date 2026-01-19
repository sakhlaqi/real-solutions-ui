/**
 * Adaptive Textarea Component
 * 
 * Uses MUI TextField (multiline) for all providers.
 * Internal implementation is deprecated in favor of MUI's production-ready component.
 */

import React from 'react';
import { Textarea as MUITextarea } from '../providers/mui';

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
 * Note: This component now uses MUI implementation for all providers.
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
  return <MUITextarea {...props} />;
};

Textarea.displayName = 'AdapterTextarea';
