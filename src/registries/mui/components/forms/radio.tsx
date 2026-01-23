'use client';

import React from 'react';
import { RadioGroup, FormControlLabel, Radio as MuiRadio, FormControl, FormLabel, FormHelperText } from '@mui/material';
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
    error,
    helperText,
    row = false,
    color = 'primary',
    size = 'medium',
    action,
    sx,
    style
  } = element.props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { name, value: e.target.value } } as never);
    }
  };

  return (
    <FormControl error={error as boolean} sx={sx as any} style={style as React.CSSProperties}>
      {label && <FormLabel>{label as string}</FormLabel>}
      <RadioGroup
        name={name as string}
        value={value as string}
        defaultValue={defaultValue as string}
        row={row as boolean}
        onChange={handleChange}
      >
        {(options as { value: string; label: string; disabled?: boolean }[]).map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <MuiRadio
                color={color as 'primary' | 'secondary' | 'default'}
                size={size as 'small' | 'medium'}
                disabled={disabled as boolean || option.disabled}
                required={required as boolean}
              />
            }
            label={option.label}
          />
        ))}
      </RadioGroup>
      {helperText && <FormHelperText>{helperText as string}</FormHelperText>}
    </FormControl>
  );
};
