'use client';

import React from 'react';
import { Box } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Code = ({ element, children }: ComponentRenderProps) => {
  const {
    content,
    inline = true,
    language,
    sx,
    style
  } = element.props;

  if (inline) {
    return (
      <Box
        component="code"
        sx={{
          fontFamily: 'monospace',
          fontSize: '0.875em',
          backgroundColor: 'action.hover',
          padding: '0.2em 0.4em',
          borderRadius: 0.5,
          ...sx as any
        }}
        style={style as React.CSSProperties}
      >
        {(content as React.ReactNode) || children}
      </Box>
    );
  }

  return (
    <Box
      component="pre"
      sx={{
        fontFamily: 'monospace',
        fontSize: '0.875rem',
        backgroundColor: 'grey.900',
        color: 'grey.100',
        padding: 2,
        borderRadius: 1,
        overflow: 'auto',
        ...sx as any
      }}
      style={style as React.CSSProperties}
    >
      <code>{(content as React.ReactNode) || children}</code>
    </Box>
  );
};
