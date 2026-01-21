import React from 'react';
import { TextField } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Input = ({ element }: ComponentRenderProps) => {
  const { label, placeholder, type = 'text', name, required, style, value, onChange } = element.props;

  return (
    <TextField
      label={label as React.ReactNode}
      placeholder={placeholder as string}
      type={type as string}
      name={name as string}
      required={required as boolean}
      value={value}
      onChange={(e) => (onChange as (val: string) => void)?.(e.target.value)}
      fullWidth
      variant="outlined"
      style={style as React.CSSProperties}
    />
  );
};
