/**
 * MUI Stepper Wrapper Component
 */

import React from 'react';
import {
  Stepper as MUIStepper,
  Step as MUIStep,
  StepLabel,
  StepButton,
} from '@mui/material';

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
 * MUI Stepper wrapper component
 */
export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  onStepClick,
  orientation = 'horizontal',
  alternativeLabel = false,
}) => {
  return (
    <MUIStepper
      activeStep={activeStep}
      orientation={orientation}
      alternativeLabel={alternativeLabel}
    >
      {steps.map((step, index) => (
        <MUIStep key={index}>
          {onStepClick ? (
            <StepButton onClick={() => onStepClick(index)}>
              <StepLabel optional={step.optional ? step.description : undefined}>
                {step.label}
              </StepLabel>
            </StepButton>
          ) : (
            <StepLabel optional={step.optional ? step.description : undefined}>
              {step.label}
            </StepLabel>
          )}
        </MUIStep>
      ))}
    </MUIStepper>
  );
};

Stepper.displayName = 'MUIStepper';
