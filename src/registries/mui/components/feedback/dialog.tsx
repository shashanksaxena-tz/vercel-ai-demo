'use client';

import React from 'react';
import { Dialog as MuiDialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, IconButton, Box } from '@mui/material';

const CloseIcon = () => (
  <Box component="span" sx={{ fontSize: '1.25rem', fontWeight: 'bold', lineHeight: 1 }}>×</Box>
);
import { ComponentRenderProps } from '@json-render/react';

export const Dialog = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    open = false,
    title,
    description,
    maxWidth = 'sm',
    fullWidth = true,
    fullScreen,
    showCloseButton = true,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmAction,
    cancelAction,
    closeAction,
    sx,
    style
  } = element.props;

  const handleClose = () => {
    if (closeAction && onAction) {
      onAction({ name: closeAction as string });
    }
  };

  const handleConfirm = () => {
    if (confirmAction && onAction) {
      onAction({ name: confirmAction as string });
    }
  };

  const handleCancel = () => {
    if (cancelAction && onAction) {
      onAction({ name: cancelAction as string });
    }
    handleClose();
  };

  return (
    <MuiDialog
      open={open as boolean}
      onClose={handleClose}
      maxWidth={maxWidth as 'xs' | 'sm' | 'md' | 'lg' | 'xl'}
      fullWidth={fullWidth as boolean}
      fullScreen={fullScreen as boolean}
      sx={sx as any}
      style={style as React.CSSProperties}
    >
      {title && (
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {title as string}
          {showCloseButton && (
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}
      <DialogContent>
        {description && <DialogContentText>{description as string}</DialogContentText>}
        {children}
      </DialogContent>
      {(confirmAction || cancelAction) && (
        <DialogActions>
          {cancelAction && (
            <Button onClick={handleCancel} color="inherit">
              {cancelText as string}
            </Button>
          )}
          {confirmAction && (
            <Button onClick={handleConfirm} variant="contained" autoFocus>
              {confirmText as string}
            </Button>
          )}
        </DialogActions>
      )}
    </MuiDialog>
  );
};
