import React from 'react';
import './Stepper.css';

export interface Step {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  orientation?: 'horizontal' | 'vertical';
  onStepClick?: (stepIndex: number) => void;
  clickable?: boolean;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  orientation = 'horizontal',
  onStepClick,
  clickable = false,
  className = '',
}) => {
  const handleStepClick = (index: number) => {
    if (clickable && onStepClick) {
      onStepClick(index);
    }
  };

  return (
    <div className={`stepper stepper-${orientation} ${className}`}>
      {steps.map((step, index) => {
        const status =
          index < currentStep
            ? 'completed'
            : index === currentStep
            ? 'active'
            : 'upcoming';

        return (
          <div key={step.id} className="stepper-step">
            <div
              className={`stepper-step-button ${clickable ? 'stepper-step-clickable' : ''}`}
              onClick={() => handleStepClick(index)}
              role={clickable ? 'button' : undefined}
              tabIndex={clickable ? 0 : undefined}
            >
              <div className={`stepper-indicator stepper-indicator-${status}`}>
                {step.icon || (
                  <span className="stepper-number">
                    {status === 'completed' ? '✓' : index + 1}
                  </span>
                )}
              </div>
              <div className="stepper-content">
                <div className={`stepper-label stepper-label-${status}`}>
                  {step.label}
                </div>
                {step.description && (
                  <div className="stepper-description">{step.description}</div>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`stepper-separator ${
                  index < currentStep ? 'stepper-separator-completed' : ''
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
