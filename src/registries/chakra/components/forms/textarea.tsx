'use client';

import React from 'react';
import { Textarea as ChakraTextarea, Field, Box } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Textarea = ({ element, onAction }: ComponentRenderProps) => {
  const {
    name,
    label,
    placeholder,
    value,
    defaultValue,
    disabled,
    required,
    invalid,
    errorMessage,
    helperText,
    rows = 4,
    resize = 'vertical',
    size = 'md',
    variant = 'outline',
    action,
    sx,
    style
  } = element.props;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { name, value: e.target.value } } as never);
    }
  };

  return (
    <Field.Root invalid={invalid as boolean} required={required as boolean}>
      {Boolean(label) && <Field.Label>{label as string}</Field.Label>}
      <ChakraTextarea
        name={name as string}
        placeholder={placeholder as string}
        value={value as string}
        defaultValue={defaultValue as string}
        disabled={disabled as boolean}
        rows={rows as number}
        resize={resize as 'none' | 'vertical' | 'horizontal' | 'both'}
        size={size as 'xs' | 'sm' | 'md' | 'lg'}
        variant={variant === 'filled' ? 'subtle' : variant as 'outline' | 'subtle' | 'flushed'}
        onChange={handleChange}
        style={style as React.CSSProperties}
      />
      {helperText && !invalid && <Field.HelperText>{helperText as string}</Field.HelperText>}
      {invalid && errorMessage && <Field.ErrorText>{errorMessage as string}</Field.ErrorText>}
    </Field.Root>
  );
};
