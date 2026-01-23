'use client';

import React from 'react';
import { RadioGroup, Field, Stack, Text } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Radio = ({ element, onAction }: ComponentRenderProps) => {
  const {
    name,
    label,
    value,
    defaultValue,
    options = [],
    disabled,
    required,
    invalid,
    errorMessage,
    helperText,
    orientation = 'vertical',
    colorPalette = 'blue',
    size = 'md',
    action,
    sx,
    style
  } = element.props;

  const handleChange = (details: { value: string }) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { name, value: details.value } } as never);
    }
  };

  return (
    <Field.Root invalid={invalid as boolean} required={required as boolean} style={style as React.CSSProperties}>
      {Boolean(label) && <Field.Label>{label as string}</Field.Label>}
      <RadioGroup.Root
        name={name as string}
        value={value as string}
        defaultValue={defaultValue as string}
        onValueChange={handleChange}
        colorPalette={colorPalette as string}
        size={size as 'sm' | 'md' | 'lg'}
        orientation={orientation as 'horizontal' | 'vertical'}
      >
        <Stack direction={orientation === 'horizontal' ? 'row' : 'column'} gap={2}>
          {(options as { value: string; label: string; disabled?: boolean }[]).map((option) => (
            <RadioGroup.Item
              key={option.value}
              value={option.value}
              disabled={disabled as boolean || option.disabled}
            >
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </Stack>
      </RadioGroup.Root>
      {helperText && !invalid && <Field.HelperText>{helperText as string}</Field.HelperText>}
      {invalid && errorMessage && <Field.ErrorText>{errorMessage as string}</Field.ErrorText>}
    </Field.Root>
  );
};
