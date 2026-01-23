'use client';

import React from 'react';
import { List as AntList, Avatar, Typography } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const List = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    items = [],
    bordered,
    size = 'default',
    split = true,
    loading,
    header,
    footer,
    pagination,
    grid,
    itemLayout = 'horizontal',
    action,
    style
  } = element.props;

  const handleItemClick = (item: any, index: number) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { item, index } } as never);
    }
  };

  if (children) {
    return (
      <AntList
        bordered={bordered as boolean}
        size={size as 'default' | 'large' | 'small'}
        split={split as boolean}
        loading={loading as boolean}
        header={header as React.ReactNode}
        footer={footer as React.ReactNode}
        pagination={pagination as any}
        grid={grid as any}
        itemLayout={itemLayout as 'horizontal' | 'vertical'}
        style={style as React.CSSProperties}
      >
        {children}
      </AntList>
    );
  }

  return (
    <AntList
      dataSource={items as any[]}
      bordered={bordered as boolean}
      size={size as 'default' | 'large' | 'small'}
      split={split as boolean}
      loading={loading as boolean}
      header={header as React.ReactNode}
      footer={footer as React.ReactNode}
      pagination={pagination as any}
      grid={grid as any}
      itemLayout={itemLayout as 'horizontal' | 'vertical'}
      style={style as React.CSSProperties}
      renderItem={(item: any, index) => (
        <AntList.Item
          onClick={() => handleItemClick(item, index)}
          style={{ cursor: action ? 'pointer' : 'default' }}
          actions={item.actions}
          extra={item.extra}
        >
          <AntList.Item.Meta
            avatar={item.avatar && <Avatar src={item.avatar} />}
            title={item.title}
            description={item.description}
          />
          {item.content}
        </AntList.Item>
      )}
    />
  );
};
