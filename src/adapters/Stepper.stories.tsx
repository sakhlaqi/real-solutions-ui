import type { Meta, StoryObj } from '@storybook/react';
import { Stepper, Step } from './Stepper';
import { Button } from './Button';
import { useState } from 'react';

const meta: Meta<typeof Stepper> = {
  title: 'Navigation/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const basicSteps: Step[] = [
  { label: 'Select campaign settings' },
  { label: 'Create an ad group' },
  { label: 'Create an ad' },
];

export const Default: Story = {
  args: {
    steps: basicSteps,
    activeStep: 1,
  },
};

export const WithDescriptions: Story = {
  args: {
    steps: [
      { label: 'Select campaign settings', description: 'Choose your campaign type and settings' },
      { label: 'Create an ad group', description: 'Set up your ad group targeting' },
      { label: 'Create an ad', description: 'Design your advertisement' },
    ],
    activeStep: 1,
  },
};

export const Interactive: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(0);
    const steps: Step[] = [
      { label: 'Account Info', description: 'Enter your personal details' },
      { label: 'Address', description: 'Provide your shipping address' },
      { label: 'Payment', description: 'Add payment information' },
      { label: 'Review', description: 'Review and submit' },
    ];

    const handleNext = () => {
      setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const handleBack = () => {
      setActiveStep((prev) => Math.max(prev - 1, 0));
    };

    return (
      <div style={{ maxWidth: 600 }}>
        <Stepper steps={steps} activeStep={activeStep} />
        <div style={{ marginTop: '2rem', padding: '2rem', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
          <h3>Step {activeStep + 1}: {steps[activeStep].label}</h3>
          <p>{steps[activeStep].description}</p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <Button onClick={handleBack} disabled={activeStep === 0}>
              Back
            </Button>
            <Button
              onClick={handleNext}
              variant="contained"
              color="primary"
              disabled={activeStep === steps.length - 1}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

export const VerticalOrientation: Story = {
  args: {
    steps: [
      { label: 'Select campaign settings', description: 'Choose your campaign type' },
      { label: 'Create an ad group', description: 'Set up targeting' },
      { label: 'Create an ad', description: 'Design your ad' },
    ],
    activeStep: 1,
    orientation: 'vertical',
  },
};

export const WithOptionalStep: Story = {
  args: {
    steps: [
      { label: 'Select campaign settings' },
      { label: 'Create an ad group' },
      { label: 'Add promotional code', optional: true },
      { label: 'Create an ad' },
    ],
    activeStep: 2,
  },
};

export const AllSteps: Story = {
  render: () => {
    const steps: Step[] = [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
      { label: 'Step 4' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>First Step</div>
          <Stepper steps={steps} activeStep={0} />
        </div>
        <div>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Middle Step</div>
          <Stepper steps={steps} activeStep={2} />
        </div>
        <div>
          <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Last Step</div>
          <Stepper steps={steps} activeStep={3} />
        </div>
      </div>
    );
  },
};

export const CheckoutFlow: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(0);
    const steps: Step[] = [
      { label: 'Shopping Cart', description: 'Review your items' },
      { label: 'Shipping', description: 'Enter shipping details' },
      { label: 'Payment', description: 'Payment information' },
      { label: 'Confirmation', description: 'Order confirmation' },
    ];

    const stepContent = [
      'Your cart contains 3 items totaling $299.97',
      'Please enter your shipping address and select delivery method',
      'Enter your payment details to complete the purchase',
      'Thank you! Your order has been placed successfully',
    ];

    const handleNext = () => {
      setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
      setActiveStep((prev) => prev - 1);
    };

    const handleReset = () => {
      setActiveStep(0);
    };

    return (
      <div style={{ maxWidth: 700 }}>
        <Stepper steps={steps} activeStep={activeStep} />
        <div style={{ marginTop: '2rem' }}>
          {activeStep === steps.length ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
              <h2>All steps completed!</h2>
              <Button onClick={handleReset} variant="contained" color="primary" style={{ marginTop: '1rem' }}>
                Start Over
              </Button>
            </div>
          ) : (
            <div>
              <div style={{ padding: '2rem', border: '1px solid #e0e0e0', borderRadius: '4px', marginBottom: '1rem' }}>
                <h3>{steps[activeStep].label}</h3>
                <p>{stepContent[activeStep]}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between' }}>
                <Button onClick={handleBack} disabled={activeStep === 0}>
                  Back
                </Button>
                <Button onClick={handleNext} variant="contained" color="primary">
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
};

export const ClickableSteps: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState([0]);

    const steps: Step[] = [
      { label: 'Personal Info' },
      { label: 'Contact Details' },
      { label: 'Preferences' },
      { label: 'Review' },
    ];

    const handleStepClick = (step: number) => {
      if (completedSteps.includes(step) || step <= Math.max(...completedSteps) + 1) {
        setActiveStep(step);
      }
    };

    const handleNext = () => {
      if (!completedSteps.includes(activeStep)) {
        setCompletedSteps([...completedSteps, activeStep]);
      }
      if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1);
      }
    };

    return (
      <div style={{ maxWidth: 600 }}>
        <Stepper steps={steps} activeStep={activeStep} onStepClick={handleStepClick} />
        <div style={{ marginTop: '2rem', padding: '2rem', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
          <h3>{steps[activeStep].label}</h3>
          <p>Content for {steps[activeStep].label}</p>
          <Button onClick={handleNext} variant="contained" color="primary" style={{ marginTop: '1rem' }}>
            {activeStep === steps.length - 1 ? 'Submit' : 'Continue'}
          </Button>
        </div>
      </div>
    );
  },
};
