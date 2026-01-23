'use client';

import React from 'react';
import { Dialog, Button, CloseButton, Portal, Box, Text } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const Modal = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    open = false,
    title,
    size = 'md',
    centered,
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
    <Dialog.Root open={open as boolean} onOpenChange={(e) => !e.open && handleClose()} size={size as 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content style={style as React.CSSProperties}>
            {title && (
              <Dialog.Header>
                <Dialog.Title>{title as string}</Dialog.Title>
              </Dialog.Header>
            )}
            {showCloseButton && (
              <Dialog.CloseTrigger asChild position="absolute" top="2" right="2">
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            )}
            <Dialog.Body>
              {children}
            </Dialog.Body>
            {(confirmAction || cancelAction) && (
              <Dialog.Footer>
                {cancelAction && (
                  <Button variant="ghost" mr={3} onClick={handleCancel}>
                    {cancelText as string}
                  </Button>
                )}
                {confirmAction && (
                  <Button colorPalette="blue" onClick={handleConfirm}>
                    {confirmText as string}
                  </Button>
                )}
              </Dialog.Footer>
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
