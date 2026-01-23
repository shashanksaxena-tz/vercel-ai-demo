import React from 'react';
import { Container as MuiContainer, Breakpoint } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Container = ({ element, children }: ComponentRenderProps) => {
  const { maxWidth = 'lg', style } = element.props;

  return (
    <MuiContainer
      maxWidth={maxWidth === 'none' ? false : (maxWidth as Breakpoint)}
      style={style as React.CSSProperties}
    >
      {children}
    </MuiContainer>
  );
};
