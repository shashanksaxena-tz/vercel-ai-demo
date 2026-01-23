'use client';

import React from 'react';
import { Center as ChakraCenter } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Center = ({ element, children }: ComponentRenderProps) => {
  const {
    p,
    m,
    bg,
    w,
    h,
    sx,
    style
  } = element.props;

  return (
    <ChakraCenter
      p={p}
      m={m}
      bg={bg as string}
      w={w}
      h={h}
      style={style as React.CSSProperties}
    >
      {children}
    </ChakraCenter>
  );
};
