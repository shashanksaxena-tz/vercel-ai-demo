import React from 'react';
import { Input as ChakraInput, FormControl, FormLabel } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Input = ({ element }: ComponentRenderProps) => {
  const { label, placeholder, type = 'text', name, required, style } = element.props;

  const input = (
    <ChakraInput
      name={name as string}
      type={type as string}
      placeholder={placeholder as string}
      isRequired={required as boolean}
      style={style as React.CSSProperties}
    />
  );

  if (label) {
    return (
      <FormControl isRequired={required as boolean} style={style as React.CSSProperties}>
        <FormLabel>{label as string}</FormLabel>
        {input}
      </FormControl>
    );
  }

  return input;
};
