'use client';

import React from 'react';
import { Snackbar as MuiSnackbar, Alert, IconButton } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Snackbar = ({ element, onAction }: ComponentRenderProps) => {
  const {
    open = false,
    message,
    severity = 'info',
    autoHideDuration = 6000,
    vertical = 'bottom',
    horizontal = 'left',
    variant = 'filled',
    showCloseButton = true,
    closeAction,
    action,
    actionLabel,
    sx,
    style
  } = element.props;

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    if (closeAction && onAction) {
      onAction({ name: closeAction as string });
    }
  };

  const handleAction = () => {
    if (action && onAction) {
      onAction({ name: action as string });
    }
  };

  return (
    <MuiSnackbar
      open={open as boolean}
      autoHideDuration={autoHideDuration as number}
      onClose={handleClose}
      anchorOrigin={{
        vertical: vertical as 'top' | 'bottom',
        horizontal: horizontal as 'left' | 'center' | 'right'
      }}
      sx={sx as any}
      style={style as React.CSSProperties}
    >
      <Alert
        onClose={showCloseButton ? handleClose : undefined}
        severity={severity as 'error' | 'warning' | 'info' | 'success'}
        variant={variant as 'filled' | 'outlined' | 'standard'}
        action={
          action ? (
            <IconButton color="inherit" size="small" onClick={handleAction}>
              {(actionLabel || 'Action') as React.ReactNode}
            </IconButton>
          ) : undefined
        }
        sx={{ width: '100%' }}
      >
        {message as string}
      </Alert>
    </MuiSnackbar>
  );
};
