'use client';

import React from 'react';
import { TextField } from '@mui/material';
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
    error,
    helperText,
    rows = 4,
    maxRows,
    minRows,
    fullWidth = true,
    variant = 'outlined',
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
    <TextField
      name={name as string}
      label={label as string}
      placeholder={placeholder as string}
      value={value as string}
      defaultValue={defaultValue as string}
      disabled={disabled as boolean}
      required={required as boolean}
      error={error as boolean}
      helperText={helperText as string}
      multiline
      rows={rows as number}
      maxRows={maxRows as number}
      minRows={minRows as number}
      fullWidth={fullWidth as boolean}
      variant={variant as 'outlined' | 'filled' | 'standard'}
      onChange={handleChange}
      sx={sx as any}
      style={style as React.CSSProperties}
    />
  );
};
