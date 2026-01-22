import React from 'react';
import { Switch as ChakraSwitch, FormControl, FormLabel, Flex } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Switch = ({ element }: ComponentRenderProps) => {
  const { label, name, checked, style } = element.props;

  if (label) {
    return (
      <FormControl display="flex" alignItems="center" style={style as React.CSSProperties}>
        <FormLabel htmlFor={name as string} mb="0">
          {label as string}
        </FormLabel>
        <ChakraSwitch id={name as string} name={name as string} defaultChecked={checked as boolean} />
      </FormControl>
    );
  }

  return <ChakraSwitch name={name as string} defaultChecked={checked as boolean} style={style as React.CSSProperties} />;
};
