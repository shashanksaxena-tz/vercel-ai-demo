'use client';

import React from 'react';
import { Skeleton as ChakraSkeleton, Stack, Box, Circle } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Skeleton = ({ element, children }: ComponentRenderProps) => {
  const {
    type = 'text',
    loading = true,
    height,
    width,
    borderRadius,
    noOfLines = 3,
    gap = 4,
    size = '40px',
    sx,
    style
  } = element.props;

  if (!loading) {
    return <>{children}</>;
  }

  if (type === 'circle') {
    return (
      <ChakraSkeleton
        height={size as string}
        width={size as string}
        borderRadius="full"
        style={style as React.CSSProperties}
      />
    );
  }

  if (type === 'text') {
    return (
      <Stack gap={gap as number} style={style as React.CSSProperties}>
        {Array.from({ length: noOfLines as number }).map((_, index) => (
          <ChakraSkeleton
            key={index}
            height="16px"
            width={index === (noOfLines as number) - 1 ? '80%' : '100%'}
          />
        ))}
      </Stack>
    );
  }

  return (
    <ChakraSkeleton
      height={height as string}
      width={width as string}
      borderRadius={borderRadius as string}
      style={style as React.CSSProperties}
    >
      {children}
    </ChakraSkeleton>
  );
};
