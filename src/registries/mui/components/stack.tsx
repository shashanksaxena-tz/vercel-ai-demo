import React from 'react';
import { Stack as MuiStack } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Stack = ({ element, children }: ComponentRenderProps) => {
  const { direction = 'column', gap = 2, style } = element.props;

  return (
    <MuiStack
      direction={direction === 'row' ? 'row' : 'column'}
      spacing={gap as number}
      style={style as React.CSSProperties}
    >
      {children}
    </MuiStack>
  );
};
