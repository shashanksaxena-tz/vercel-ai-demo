'use client';

import React from 'react';
import { Drawer as MuiDrawer, Box, IconButton, Typography, Divider } from '@mui/material';

const CloseIcon = () => (
  <Box component="span" sx={{ fontSize: '1.25rem', fontWeight: 'bold', lineHeight: 1 }}>×</Box>
);
import { ComponentRenderProps } from '@json-render/react';

export const Drawer = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    open = false,
    title,
    anchor = 'right',
    variant = 'temporary',
    width = 320,
    showCloseButton = true,
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
    <MuiDrawer
      open={open as boolean}
      anchor={anchor as 'left' | 'right' | 'top' | 'bottom'}
      variant={variant as 'temporary' | 'persistent' | 'permanent'}
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: anchor === 'left' || anchor === 'right' ? width : 'auto',
          height: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100%',
        },
        ...sx as any
      }}
      style={style as React.CSSProperties}
    >
      {(title || showCloseButton) && (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
            }}
          >
            {title && (
              <Typography variant="h6">
                {title as string}
              </Typography>
            )}
            {showCloseButton && (
              <IconButton onClick={handleClose} edge="end">
                <CloseIcon />
              </IconButton>
            )}
          </Box>
          <Divider />
        </>
      )}
      <Box sx={{ p: 2 }}>
        {children}
      </Box>
    </MuiDrawer>
  );
};
