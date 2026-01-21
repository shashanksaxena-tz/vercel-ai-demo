import React from 'react';
import { Checkbox as MuiCheckbox, FormControlLabel, FormGroup } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Checkbox = ({ element }: ComponentRenderProps) => {
  const { label, name, checked, onChange, style, disabled } = element.props;

  return (
    <FormGroup style={style as React.CSSProperties}>
      <FormControlLabel
        control={
          <MuiCheckbox
            name={name as string}
            checked={checked as boolean}
            onChange={(e) => (onChange as (val: boolean) => void)?.(e.target.checked)}
            disabled={disabled as boolean}
          />
        }
        label={label as React.ReactNode}
      />
    </FormGroup>
  );
};
