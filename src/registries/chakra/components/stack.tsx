import React from 'react';
import { Stack as ChakraStack } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Stack = ({ element, children }: ComponentRenderProps) => {
  const { direction = 'column', gap, style } = element.props;

  return (
    <ChakraStack
      direction={direction === 'row' ? 'row' : 'column'}
      spacing={gap ? `${gap}px` : 4} // Chakra default spacing is 4 = 1rem, but gap in pixels or standard scale
      style={style as React.CSSProperties}
    >
      {(element.props.children || children) as React.ReactNode}
    </ChakraStack>
  );
};
