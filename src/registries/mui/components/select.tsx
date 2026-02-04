import React from 'react';
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, SelectChangeEvent } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Select = ({ element }: ComponentRenderProps) => {
  const { label, options, name, placeholder, style, value, onChange } = element.props;
  const labelId = `select-${name}-label`;
  const placeholderNode = placeholder as React.ReactNode;

  return (
    <FormControl fullWidth style={style as React.CSSProperties}>
      <InputLabel id={labelId}>{label as React.ReactNode}</InputLabel>
      <MuiSelect
        labelId={labelId}
        label={label as React.ReactNode}
        name={name as string}
        value={(value as string) || ''}
        onChange={(e: SelectChangeEvent) => (onChange as (val: string) => void)?.(e.target.value)}
      >
        {placeholderNode && (
            <MenuItem value="" disabled>
                {placeholderNode}
            </MenuItem>
        )}
        {(options as { label: string; value: string }[])?.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};
