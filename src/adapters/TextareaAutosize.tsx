/**
 * Adapter TextareaAutosize Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { TextareaAutosize as InternalTextareaAutosize, TextareaAutosizeProps } from '../forms';

/**
 * Adaptive TextareaAutosize Component
 * 
 * @example
 * ```tsx
 * <TextareaAutosize
 *   value={text}
 *   onChange={(e) => setText(e.target.value)}
 *   minRows={3}
 *   maxRows={10}
 *   placeholder="Enter text..."
 * />
 * ```
 */
export const TextareaAutosize: React.FC<TextareaAutosizeProps> = (props) => {
  // TextareaAutosize always uses internal implementation for consistent
  // auto-resize behavior
  return <InternalTextareaAutosize {...props} />;
};

TextareaAutosize.displayName = 'AdapterTextareaAutosize';
