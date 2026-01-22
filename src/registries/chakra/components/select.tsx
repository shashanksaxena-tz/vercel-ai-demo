import React from 'react';
import { Select as ChakraSelect, FormControl, FormLabel } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Select = ({ element }: ComponentRenderProps) => {
  const { label, options, name, placeholder, style } = element.props;

  const select = (
    <ChakraSelect name={name as string} placeholder={placeholder as string} style={style as React.CSSProperties}>
      {(options as any[])?.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </ChakraSelect>
  );

  if (label) {
    return (
      <FormControl style={style as React.CSSProperties}>
        <FormLabel>{label as string}</FormLabel>
        {select}
      </FormControl>
    );
  }

  return select;
};
