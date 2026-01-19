/**
 * Adapter TextareaAutosize Component
 * 
 * Uses MUI TextareaAutosize for all providers.
 * Internal implementation is deprecated in favor of MUI's implementation.
 */

import React from 'react';
import { TextareaAutosize as MUITextareaAutosize, TextareaAutosizeProps as MUITextareaAutosizeProps } from '../providers/mui/TextareaAutosize';

export type TextareaAutosizeProps = MUITextareaAutosizeProps;

/**
 * Adaptive TextareaAutosize Component
 * 
 * @example
 * ```tsx
 * <TextareaAutosize
 *   value={text}
 *   onChange={(value) => setText(value)}
 *   minRows={3}
 *   maxRows={10}
 *   placeholder="Enter text..."
 * />
 * ```
 */
export const TextareaAutosize: React.FC<TextareaAutosizeProps> = (props) => {
  return <MUITextareaAutosize {...props} />;
};

TextareaAutosize.displayName = 'AdapterTextareaAutosize';
