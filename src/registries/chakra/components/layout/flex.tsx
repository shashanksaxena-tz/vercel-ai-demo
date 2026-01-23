'use client';

import React from 'react';
import { Flex as ChakraFlex } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Flex = ({ element, children }: ComponentRenderProps) => {
  const {
    direction = 'row',
    justify = 'flex-start',
    align = 'stretch',
    wrap = 'nowrap',
    gap = 0,
    p,
    m,
    bg,
    w,
    h,
    sx,
    style
  } = element.props;

  return (
    <ChakraFlex
      direction={direction as 'row' | 'column' | 'row-reverse' | 'column-reverse'}
      justify={justify as any}
      align={align as any}
      wrap={wrap as 'nowrap' | 'wrap' | 'wrap-reverse'}
      gap={gap}
      p={p}
      m={m}
      bg={bg as string}
      w={w}
      h={h}
      style={style as React.CSSProperties}
    >
      {children}
    </ChakraFlex>
  );
};
