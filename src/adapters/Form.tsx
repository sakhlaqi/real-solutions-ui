/**
 * Adapter Form Component
 * 
 * Dynamically switches between internal, MUI, and Radix implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { Form as InternalForm, FormProps } from '../forms';

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
  // Form always uses internal implementation
  return <InternalForm {...props} />;
};

Form.displayName = 'AdapterForm';
