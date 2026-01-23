'use client';

import React from 'react';
import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Autocomplete = ({ element, onAction }: ComponentRenderProps) => {
  const {
    name,
    label,
    placeholder,
    options = [],
    value,
    defaultValue,
    multiple,
    freeSolo,
    disabled,
    loading,
    loadingText = 'Loading...',
    noOptionsText = 'No options',
    filterSelectedOptions,
    disableCloseOnSelect,
    fullWidth = true,
    size = 'medium',
    variant = 'outlined',
    error,
    helperText,
    action,
    sx,
    style
  } = element.props;

  const handleChange = (_: any, newValue: any) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { name, value: newValue } } as never);
    }
  };

  return (
    <MuiAutocomplete
      options={options as any[]}
      value={value as any}
      defaultValue={defaultValue as any}
      multiple={multiple as boolean}
      freeSolo={freeSolo as boolean}
      disabled={disabled as boolean}
      loading={loading as boolean}
      loadingText={loadingText as string}
      noOptionsText={noOptionsText as string}
      filterSelectedOptions={filterSelectedOptions as boolean}
      disableCloseOnSelect={disableCloseOnSelect as boolean}
      fullWidth={fullWidth as boolean}
      size={size as 'small' | 'medium'}
      onChange={handleChange}
      sx={sx as any}
      style={style as React.CSSProperties}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name as string}
          label={label as string}
          placeholder={placeholder as string}
          variant={variant as 'outlined' | 'filled' | 'standard'}
          error={error as boolean}
          helperText={helperText as string}
        />
      )}
    />
  );
};
