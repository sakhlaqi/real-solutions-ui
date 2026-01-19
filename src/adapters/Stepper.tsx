/**
 * Adaptive Stepper Component
 * 
 * Uses MUI Stepper for all providers.
 */

import React from 'react';
import { Stepper as MUIStepper } from '../providers/mui';

export interface Step {
  label: string;
  description?: string;
  optional?: boolean;
}

export interface StepperProps {
  steps: Step[];
  activeStep: number;
  onStepClick?: (step: number) => void;
  orientation?: 'horizontal' | 'vertical';
  alternativeLabel?: boolean;
}

/**
 * Adaptive Stepper Component
 * 
 * @example
 * ```tsx
 * <Stepper
 *   steps={[
 *     { label: 'Select campaign', description: 'Choose campaign type' },
 *     { label: 'Create ad group' },
 *     { label: 'Create ads' }
 *   ]}
 *   activeStep={currentStep}
 * />
 * ```
 */
export const Stepper: React.FC<StepperProps> = (props) => {
  return <MUIStepper {...props} />;
};

Stepper.displayName = 'AdapterStepper';
