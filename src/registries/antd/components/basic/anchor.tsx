'use client';

import React from 'react';
import { Anchor as AntAnchor } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Anchor = ({ element }: ComponentRenderProps) => {
  const {
    items,
    affix = true,
    bounds,
    offsetTop,
    targetOffset,
    direction = 'vertical',
    className,
    style
  } = element.props;

  const anchorItems = (items as Array<{ key: string; href: string; title: string; children?: any[] }>)?.map(item => ({
    key: item.key,
    href: item.href,
    title: item.title,
    children: item.children
  }));

  return (
    <AntAnchor
      items={anchorItems}
      affix={affix as boolean}
      bounds={bounds as number}
      offsetTop={offsetTop as number}
      targetOffset={targetOffset as number}
      direction={direction as 'vertical' | 'horizontal'}
      className={className as string}
      style={style as React.CSSProperties}
    />
  );
};
