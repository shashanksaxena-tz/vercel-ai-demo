'use client';

import React from 'react';
import { Modal as AntModal, Button, Space } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Modal = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    open = false,
    title,
    width = 520,
    centered,
    closable = true,
    maskClosable = true,
    keyboard = true,
    destroyOnClose,
    confirmLoading,
    okText = 'OK',
    cancelText = 'Cancel',
    okType = 'primary',
    confirmAction,
    cancelAction,
    closeAction,
    footer,
    style
  } = element.props;

  const handleOk = () => {
    if (confirmAction && onAction) {
      onAction({ name: confirmAction as string });
    }
  };

  const handleCancel = () => {
    if (cancelAction && onAction) {
      onAction({ name: cancelAction as string });
    }
    if (closeAction && onAction) {
      onAction({ name: closeAction as string });
    }
  };

  return (
    <AntModal
      open={open as boolean}
      title={title as React.ReactNode}
      width={width as number | string}
      centered={centered as boolean}
      closable={closable as boolean}
      maskClosable={maskClosable as boolean}
      keyboard={keyboard as boolean}
      destroyOnClose={destroyOnClose as boolean}
      confirmLoading={confirmLoading as boolean}
      okText={okText as string}
      cancelText={cancelText as string}
      okType={okType as 'primary' | 'default' | 'dashed' | 'link' | 'text'}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={footer === null ? null : undefined}
      style={style as React.CSSProperties}
    >
      {children}
    </AntModal>
  );
};
