'use client';

import React from 'react';
import { Menu as AntMenu } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Menu = ({ element, onAction }: ComponentRenderProps) => {
  const {
    items = [],
    mode = 'vertical',
    theme = 'light',
    defaultSelectedKeys = [],
    defaultOpenKeys = [],
    selectedKeys,
    openKeys,
    inlineCollapsed,
    selectable = true,
    multiple,
    action,
    style
  } = element.props;

  const handleClick = (info: any) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { key: info.key, keyPath: info.keyPath } } as never);
    }
  };

  const handleSelect = (info: any) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { selectedKeys: info.selectedKeys } } as never);
    }
  };

  return (
    <AntMenu
      items={items as any[]}
      mode={mode as 'vertical' | 'horizontal' | 'inline'}
      theme={theme as 'light' | 'dark'}
      defaultSelectedKeys={defaultSelectedKeys as string[]}
      defaultOpenKeys={defaultOpenKeys as string[]}
      selectedKeys={selectedKeys as string[]}
      openKeys={openKeys as string[]}
      inlineCollapsed={inlineCollapsed as boolean}
      selectable={selectable as boolean}
      multiple={multiple as boolean}
      onClick={handleClick}
      onSelect={handleSelect}
      style={style as React.CSSProperties}
    />
  );
};
