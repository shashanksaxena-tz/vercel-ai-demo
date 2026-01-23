'use client';

import React from 'react';
import { Spinner as ChakraSpinner, Box, Text, VStack } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Spinner = ({ element }: ComponentRenderProps) => {
  const {
    size = 'md',
    color = 'blue.500',
    borderWidth = '4px',
    label,
    sx,
    style
  } = element.props;

  return (
    <VStack style={style as React.CSSProperties}>
      <ChakraSpinner
        size={size as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}
        color={color as string}
        borderWidth={borderWidth as string}
      />
      {label && (
        <Text fontSize="sm" color="gray.600">
          {label as string}
        </Text>
      )}
    </VStack>
  );
};
