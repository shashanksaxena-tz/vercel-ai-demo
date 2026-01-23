'use client';

import React from 'react';
import { Popover as MuiPopover, Box, Typography } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Popover = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    open = false,
    anchorEl,
    title,
    content,
    anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
    transformOrigin = { vertical: 'top', horizontal: 'left' },
    closeAction,
    sx,
    style
  } = element.props;

  const handleClose = () => {
    if (closeAction && onAction) {
      onAction({ name: closeAction as string });
    }
  };

  return (
    <MuiPopover
      open={open as boolean}
      anchorEl={anchorEl as Element | null}
      onClose={handleClose}
      anchorOrigin={anchorOrigin as any}
      transformOrigin={transformOrigin as any}
      sx={sx as any}
      style={style as React.CSSProperties}
    >
      <Box sx={{ p: 2 }}>
        {title && (
          <Typography variant="h6" gutterBottom>
            {title as string}
          </Typography>
        )}
        {content && (
          <Typography>
            {content as string}
          </Typography>
        )}
        {children}
      </Box>
    </MuiPopover>
  );
};
