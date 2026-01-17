/**
 * Adapter SplitButton Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { SplitButton as InternalSplitButton, SplitButtonProps } from '../buttons';

/**
 * Adaptive SplitButton Component
 * 
 * @example
 * ```tsx
 * <SplitButton 
 *   mainAction={{ label: 'Save', onClick: handleSave }}
 *   options={[
 *     { label: 'Save and Close', onClick: handleSaveClose },
 *     { label: 'Save as Draft', onClick: handleDraft }
 *   ]}
 * />
 * ```
 */
export const SplitButton: React.FC<SplitButtonProps> = (props) => {
  // SplitButton always uses internal implementation as it's a complex
  // composite component with dropdown logic
  return <InternalSplitButton {...props} />;
};

SplitButton.displayName = 'AdapterSplitButton';
