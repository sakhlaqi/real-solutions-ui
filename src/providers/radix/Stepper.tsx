/**
 * Radix UI Stepper Wrapper
 * Simple stepper implementation
 */

import React from 'react';
import { Flex, Text, Separator } from '@radix-ui/themes';
import { CheckIcon } from '@radix-ui/react-icons';
import type { StepperProps } from '../../core/types';

export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep = 0,
  orientation = 'horizontal',
  className,
}) => {
  return (
    <Flex
      direction={orientation === 'vertical' ? 'column' : 'row'}
      align="center"
      gap="2"
      className={className}
    >
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <Flex direction="column" align="center" gap="2">
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: index <= activeStep ? 'var(--blue-9)' : 'var(--gray-6)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 500,
              }}
            >
              {index < activeStep ? <CheckIcon /> : index + 1}
            </div>
            <Text size="2" weight={index === activeStep ? 'medium' : 'regular'}>
              {step.label}
            </Text>
          </Flex>
          {index < steps.length - 1 && (
            <Separator
              orientation={orientation === 'vertical' ? 'vertical' : 'horizontal'}
              size="4"
              style={{
                flex: orientation === 'horizontal' ? 1 : undefined,
                height: orientation === 'vertical' ? '32px' : undefined,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </Flex>
  );
};

export default Stepper;
