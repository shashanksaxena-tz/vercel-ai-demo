'use client';

import React from 'react';
import { Pagination as AntPagination } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Pagination = ({ element, onAction }: ComponentRenderProps) => {
  const {
    current = 1,
    total = 0,
    pageSize = 10,
    defaultCurrent = 1,
    defaultPageSize = 10,
    disabled,
    showSizeChanger,
    showQuickJumper,
    showTotal,
    simple,
    size = 'default',
    responsive,
    hideOnSinglePage,
    action,
    style
  } = element.props;

  const handleChange = (page: number, pageSize: number) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { page, pageSize } } as never);
    }
  };

  const handleShowSizeChange = (current: number, size: number) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { page: current, pageSize: size } } as never);
    }
  };

  return (
    <AntPagination
      current={current as number}
      total={total as number}
      pageSize={pageSize as number}
      defaultCurrent={defaultCurrent as number}
      defaultPageSize={defaultPageSize as number}
      disabled={disabled as boolean}
      showSizeChanger={showSizeChanger as boolean}
      showQuickJumper={showQuickJumper as boolean}
      showTotal={showTotal as (total: number, range: [number, number]) => React.ReactNode}
      simple={simple as boolean}
      size={size === 'default' ? undefined : size as 'small' | 'middle' | 'large'}
      responsive={responsive as boolean}
      hideOnSinglePage={hideOnSinglePage as boolean}
      onChange={handleChange}
      onShowSizeChange={handleShowSizeChange}
      style={style as React.CSSProperties}
    />
  );
};
