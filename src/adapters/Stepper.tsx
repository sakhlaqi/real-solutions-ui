/**
 * Adaptive Stepper Component
 * 
 * Automatically switches between internal and MUI implementations based on UIProvider.
 */

import React from 'react';
import { useUIContext } from '../core/context';
import { Stepper as InternalStepper } from '../navigation';
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
  const { provider } = useUIContext();
  
  if (provider === 'mui') {
    return <MUIStepper {...props} />;
  }
  
  // Transform activeStep to currentStep and add id field to steps
  const { activeStep, steps, alternativeLabel, ...internalProps } = props;
  
  const internalSteps = steps.map((step, index) => ({
    ...step,
    id: `step-${index}`,
  }));
  
  return <InternalStepper {...internalProps} steps={internalSteps} currentStep={activeStep} />;
};

Stepper.displayName = 'AdapterStepper';
