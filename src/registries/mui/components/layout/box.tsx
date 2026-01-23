'use client';

import React from 'react';
import { Box as MuiBox } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Box = ({ element, children }: ComponentRenderProps) => {
  const {
    component = 'div',
    display,
    flexDirection,
    justifyContent,
    alignItems,
    flexWrap,
    gap,
    p,
    m,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    bgcolor,
    color,
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
    <MuiBox
      component={component as React.ElementType}
      sx={{
        display,
        flexDirection,
        justifyContent,
        alignItems,
        flexWrap,
        gap,
        p,
        m,
        width,
        height,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
        bgcolor,
        color,
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
        ...sx as any
      }}
      style={style as React.CSSProperties}
    >
      {children}
    </MuiBox>
  );
};
