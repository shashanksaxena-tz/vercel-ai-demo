'use client';

import React from 'react';
import { Stepper as MuiStepper, Step, StepLabel, StepContent, Button, Box, Typography } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Stepper = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    activeStep = 0,
    steps = [],
    orientation = 'horizontal',
    alternativeLabel,
    nonLinear,
    connector,
    action,
    sx,
    style
  } = element.props;

  const handleStepClick = (index: number) => {
    if (nonLinear && action && onAction) {
      onAction({ name: action as string, payload: { step: index } } as never);
    }
  };

  const handleNext = () => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { step: (activeStep as number) + 1, direction: 'next' } } as never);
    }
  };

  const handleBack = () => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { step: (activeStep as number) - 1, direction: 'back' } } as never);
    }
  };

  return (
    <Box sx={sx as any} style={style as React.CSSProperties}>
      <MuiStepper
        activeStep={activeStep as number}
        orientation={orientation as 'horizontal' | 'vertical'}
        alternativeLabel={alternativeLabel as boolean}
        nonLinear={nonLinear as boolean}
        connector={connector as React.ReactElement | undefined}
      >
        {(steps as { label: string; description?: string; optional?: boolean; completed?: boolean; error?: boolean }[]).map((step, index) => (
          <Step
            key={step.label}
            completed={step.completed}
            onClick={() => handleStepClick(index)}
            sx={{ cursor: nonLinear ? 'pointer' : 'default' }}
          >
            <StepLabel
              optional={step.optional ? <Typography variant="caption">Optional</Typography> : undefined}
              error={step.error}
            >
              {step.label}
            </StepLabel>
            {orientation === 'vertical' && step.description && (
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                    {index === (steps as any[]).length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Back
                  </Button>
                </Box>
              </StepContent>
            )}
          </Step>
        ))}
      </MuiStepper>
      {children}
    </Box>
  );
};
