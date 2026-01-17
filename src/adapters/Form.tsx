/**
 * Adapter Form Component
 * 
 * Dynamically switches between internal, MUI, Radix, and Shadcn implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Form as InternalForm, FormProps } from '../forms';
import { Form as ShadcnForm } from '../providers/shadcn';

/**
 * Adaptive Form Component
 * 
 * @example
 * ```tsx
 * <Form onSubmit={handleSubmit}>
 *   <Input label="Name" />
 *   <Button type="submit">Submit</Button>
 * </Form>
 * ```
 */
export const Form: React.FC<FormProps> = (props) => {
  const { provider } = useUIContext();
  
  if (provider === 'shadcn') {
    return <ShadcnForm {...props as any} />;
  }
  
  // Form uses internal implementation for other providers
  return <InternalForm {...props} />;
};

Form.displayName = 'AdapterForm';
