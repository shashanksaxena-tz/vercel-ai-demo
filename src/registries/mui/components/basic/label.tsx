'use client';

import React from 'react';
import { InputLabel, FormLabel } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Label = ({ element, children }: ComponentRenderProps) => {
  const {
    content,
    htmlFor,
    required,
    error,
    disabled,
    focused,
    color,
    sx,
    style
  } = element.props;

  return (
    <FormLabel
      htmlFor={htmlFor as string}
      required={required as boolean}
      error={error as boolean}
      disabled={disabled as boolean}
      focused={focused as boolean}
      color={color as any}
      sx={sx as any}
      style={style as React.CSSProperties}
    >
      {(content as React.ReactNode) || children}
    </FormLabel>
  );
};
