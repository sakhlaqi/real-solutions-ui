/**
 * Adapter FileUpload Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { FileUpload as InternalFileUpload, FileUploadProps } from '../forms';

/**
 * Adaptive FileUpload Component
 * 
 * @example
 * ```tsx
 * <FileUpload
 *   onUpload={handleUpload}
 *   accept="image/*"
 *   multiple
 *   maxSize={5242880}
 * />
 * ```
 */
export const FileUpload: React.FC<FileUploadProps> = (props) => {
  // FileUpload always uses internal implementation for consistent
  // drag-and-drop behavior and file handling
  return <InternalFileUpload {...props} />;
};

FileUpload.displayName = 'AdapterFileUpload';
