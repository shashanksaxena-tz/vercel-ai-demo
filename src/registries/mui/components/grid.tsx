import React from 'react';
import { Box } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Grid = ({ element, children }: ComponentRenderProps) => {
  const { columns = 1, gap = 2, style } = element.props;

  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${columns}, 1fr)`}
      gap={gap as number}
      style={style as React.CSSProperties}
    >
      {children}
    </Box>
  );
};
