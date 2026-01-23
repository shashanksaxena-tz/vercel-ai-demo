'use client';

import React from 'react';
import { Drawer, Button, CloseButton, Portal, Box, Text } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const DrawerComponent = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    open = false,
    title,
    placement = 'end',
    size = 'md',
    showCloseButton = true,
    confirmText,
    cancelText = 'Close',
    confirmAction,
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

  // Map placement for v3 API
  const placementMap: Record<string, 'start' | 'end' | 'top' | 'bottom'> = {
    left: 'start',
    right: 'end',
    top: 'top',
    bottom: 'bottom',
  };

  return (
    <Drawer.Root
      open={open as boolean}
      onOpenChange={(e) => !e.open && handleClose()}
      placement={placementMap[placement as string] || 'end'}
      size={size as 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content style={style as React.CSSProperties}>
            {showCloseButton && (
              <Drawer.CloseTrigger asChild position="absolute" top="2" right="2">
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            )}
            {title && (
              <Drawer.Header>
                <Drawer.Title>{title as string}</Drawer.Title>
              </Drawer.Header>
            )}
            <Drawer.Body>
              {children}
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline" mr={3} onClick={handleClose}>
                {cancelText as string}
              </Button>
              {confirmAction && (
                <Button colorPalette="blue" onClick={handleConfirm}>
                  {confirmText as string}
                </Button>
              )}
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export { DrawerComponent as Drawer };
