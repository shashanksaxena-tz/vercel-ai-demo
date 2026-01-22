import React from 'react';
import { Text as ChakraText, Heading } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Text = ({ element, children }: ComponentRenderProps) => {
  const { variant = 'p', style } = element.props;
  const content = element.props.children || children;

  if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant as string)) {
    return (
      <Heading as={variant as any} size={variant === 'h1' ? '2xl' : variant === 'h2' ? 'xl' : 'lg'} style={style as React.CSSProperties}>
        {content as React.ReactNode}
      </Heading>
    );
  }

  if (variant === 'blockquote') {
    return (
      <ChakraText as="blockquote" borderLeft="4px" borderColor="gray.200" pl={4} py={2} style={style as React.CSSProperties}>
        {content as React.ReactNode}
      </ChakraText>
    );
  }

  if (variant === 'code') {
    return (
      <ChakraText as="code" bg="gray.100" p={1} rounded="md" fontFamily="mono" style={style as React.CSSProperties}>
        {content as React.ReactNode}
      </ChakraText>
    );
  }

  return (
    <ChakraText style={style as React.CSSProperties}>
      {content as React.ReactNode}
    </ChakraText>
  );
};
