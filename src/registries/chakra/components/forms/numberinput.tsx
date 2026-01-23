'use client';

import React from 'react';
import { NumberInput, Field, Box, Text } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const NumberInputComponent = ({ element, onAction }: ComponentRenderProps) => {
  const {
    name,
    label,
    value,
    defaultValue,
    min,
    max,
    step = 1,
    disabled,
    required,
    invalid,
    errorMessage,
    helperText,
    size = 'md',
    showStepper = true,
    action,
    sx,
    style
  } = element.props;

  const handleChange = (details: { value: string; valueAsNumber: number }) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { name, value: details.valueAsNumber } } as never);
    }
  };

  return (
    <Field.Root invalid={invalid as boolean} required={required as boolean} style={style as React.CSSProperties}>
      {Boolean(label) && <Field.Label>{label as string}</Field.Label>}
      <NumberInput.Root
        value={value?.toString()}
        defaultValue={defaultValue?.toString()}
        min={min as number}
        max={max as number}
        step={step as number}
        disabled={disabled as boolean}
        size={size as 'xs' | 'sm' | 'md' | 'lg'}
        onValueChange={handleChange}
      >
        <NumberInput.Control>
          <NumberInput.IncrementTrigger />
          <NumberInput.DecrementTrigger />
        </NumberInput.Control>
        <NumberInput.Input name={name as string} />
      </NumberInput.Root>
      {helperText && !invalid && <Field.HelperText>{helperText as string}</Field.HelperText>}
      {invalid && errorMessage && <Field.ErrorText>{errorMessage as string}</Field.ErrorText>}
    </Field.Root>
  );
};

export { NumberInputComponent as NumberInput };
