import React from 'react';
import { Container as ChakraContainer } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Container = ({ element, children }: ComponentRenderProps) => {
  const { maxWidth, style } = element.props;

  return (
    <ChakraContainer maxW={maxWidth as string || 'container.xl'} style={style as React.CSSProperties}>
      {(element.props.children || children) as React.ReactNode}
    </ChakraContainer>
  );
};
