'use client';

import React from 'react';
import { Drawer as AntDrawer, Button, Space } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Drawer = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    open = false,
    title,
    placement = 'right',
    width = 378,
    height = 378,
    closable = true,
    mask = true,
    maskClosable = true,
    keyboard = true,
    destroyOnClose,
    extra,
    footer,
    closeAction,
    style
  } = element.props;

  const handleClose = () => {
    if (closeAction && onAction) {
      onAction({ name: closeAction as string });
    }
  };

  return (
    <AntDrawer
      open={open as boolean}
      title={title as React.ReactNode}
      placement={placement as 'top' | 'right' | 'bottom' | 'left'}
      width={width as number | string}
      height={height as number | string}
      closable={closable as boolean}
      mask={mask as boolean}
      maskClosable={maskClosable as boolean}
      keyboard={keyboard as boolean}
      destroyOnClose={destroyOnClose as boolean}
      extra={extra as React.ReactNode}
      footer={footer as React.ReactNode}
      onClose={handleClose}
      style={style as React.CSSProperties}
    >
      {children}
    </AntDrawer>
  );
};
