/**
 * Adapter Form Component
 * 
 * Dynamically switches between internal and MUI implementations
 * based on the current UIProvider context.
 */

import React from 'react';
import { Form as InternalForm, FormProps } from '../core/components/forms';

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
  // Form uses internal implementation for all providers
  return <InternalForm {...props} />;
};

Form.displayName = 'AdapterForm';
