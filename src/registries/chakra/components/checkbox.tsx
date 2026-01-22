import React from 'react';
import { Checkbox as ChakraCheckbox, FormControl, FormLabel } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Checkbox = ({ element }: ComponentRenderProps) => {
  const { label, name, checked, style } = element.props;

  return (
    <ChakraCheckbox
      name={name as string}
      defaultChecked={checked as boolean}
      style={style as React.CSSProperties}
    >
      {label as string}
    </ChakraCheckbox>
  );
};
