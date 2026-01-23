'use client';

import React from 'react';
import { Wrap, WrapItem } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const FlexWrap = ({ element, children }: ComponentRenderProps) => {
  const {
    spacing = 2,
    justify,
    align,
    direction,
    shouldWrapChildren = true,
    sx,
    style
  } = element.props;

  if (!shouldWrapChildren) {
    return (
      <Wrap
        gap={spacing as number}
        justify={justify as any}
        align={align as any}
        direction={direction as any}
        style={style as React.CSSProperties}
      >
        {children}
      </Wrap>
    );
  }

  return (
    <Wrap
      gap={spacing as number}
      justify={justify as any}
      align={align as any}
      direction={direction as any}
      style={style as React.CSSProperties}
    >
      {React.Children.map(children, (child, index) => (
        <WrapItem key={index}>{child}</WrapItem>
      ))}
    </Wrap>
  );
};
