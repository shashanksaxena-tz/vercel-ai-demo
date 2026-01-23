'use client';

import React from 'react';
import { Collapse as AntCollapse } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Collapse = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items = [],
    defaultActiveKey,
    activeKey,
    accordion,
    bordered = true,
    ghost,
    expandIconPosition = 'start',
    collapsible,
    size = 'middle',
    action,
    style
  } = element.props;

  const handleChange = (key: string | string[]) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { activeKey: key } } as never);
    }
  };

  const collapseItems = (items as { key: string; label: string; children: React.ReactNode; showArrow?: boolean; extra?: React.ReactNode }[]).map(item => ({
    key: item.key,
    label: item.label,
    children: item.children,
    showArrow: item.showArrow,
    extra: item.extra,
  }));

  return (
    <AntCollapse
      items={collapseItems.length > 0 ? collapseItems : undefined}
      defaultActiveKey={defaultActiveKey as string | string[]}
      activeKey={activeKey as string | string[]}
      accordion={accordion as boolean}
      bordered={bordered as boolean}
      ghost={ghost as boolean}
      expandIconPosition={expandIconPosition as 'start' | 'end'}
      collapsible={collapsible as 'header' | 'icon' | 'disabled'}
      size={size as 'large' | 'middle' | 'small'}
      onChange={handleChange}
      style={style as React.CSSProperties}
    >
      {children}
    </AntCollapse>
  );
};
