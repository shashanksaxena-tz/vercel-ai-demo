'use client';

import React from 'react';
import { Box as ChakraBox } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Box = ({ element, children }: ComponentRenderProps) => {
  const {
    as = 'div',
    p,
    m,
    bg,
    color,
    w,
    h,
    minW,
    minH,
    maxW,
    maxH,
    display,
    flexDirection,
    justifyContent,
    alignItems,
    gap,
    borderRadius,
    border,
    boxShadow,
    overflow,
    position,
    top,
    right,
    bottom,
    left,
    zIndex,
    sx,
    style
  } = element.props;

  return (
    <ChakraBox
      as={as as React.ElementType}
      p={p}
      m={m}
      bg={bg as string}
      color={color as string}
      w={w}
      h={h}
      minW={minW}
      minH={minH}
      maxW={maxH}
      maxH={maxH}
      display={display as any}
      flexDirection={flexDirection as any}
      justifyContent={justifyContent as any}
      alignItems={alignItems as any}
      gap={gap}
      borderRadius={borderRadius as any}
      border={border as string}
      boxShadow={boxShadow as any}
      overflow={overflow as any}
      position={position as any}
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      zIndex={zIndex as number}
      style={style as React.CSSProperties}
    >
      {children}
    </ChakraBox>
  );
};
