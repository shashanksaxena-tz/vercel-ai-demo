'use client';

import React from 'react';
import { Box } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Kbd = ({ element, children }: ComponentRenderProps) => {
  const {
    content,
    sx,
    style
  } = element.props;

  return (
    <Box
      component="kbd"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
        fontSize: '0.75rem',
        fontWeight: 500,
        backgroundColor: 'grey.100',
        border: '1px solid',
        borderColor: 'grey.300',
        borderRadius: 0.5,
        padding: '0.15em 0.4em',
        boxShadow: 'inset 0 -1px 0 0 rgba(0,0,0,0.1)',
        minWidth: '1.5em',
        ...sx as any
      }}
      style={style as React.CSSProperties}
    >
      {(content as React.ReactNode) || children}
    </Box>
  );
};
