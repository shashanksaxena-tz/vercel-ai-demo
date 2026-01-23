'use client';

import React from 'react';
import { Tooltip as MuiTooltip, Box } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Tooltip = ({ element, children }: ComponentRenderProps) => {
  const {
    title,
    placement = 'top',
    arrow = true,
    open,
    enterDelay = 200,
    leaveDelay = 0,
    sx,
    style
  } = element.props;

  return (
    <MuiTooltip
      title={title as string}
      placement={placement as 'top' | 'bottom' | 'left' | 'right'}
      arrow={arrow as boolean}
      open={open as boolean | undefined}
      enterDelay={enterDelay as number}
      leaveDelay={leaveDelay as number}
    >
      <Box sx={sx as any} style={style as React.CSSProperties}>
        {children}
      </Box>
    </MuiTooltip>
  );
};
