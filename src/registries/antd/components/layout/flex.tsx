'use client';

import React from 'react';
import { Flex as AntFlex } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Flex = ({ element, children }: ComponentRenderProps) => {
  const {
    vertical,
    wrap,
    justify = 'normal',
    align = 'normal',
    flex,
    gap = 0,
    component = 'div',
    style
  } = element.props;

  return (
    <AntFlex
      vertical={vertical as boolean}
      wrap={wrap as 'nowrap' | 'wrap' | 'wrap-reverse'}
      justify={justify as 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | 'normal'}
      align={align as 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'normal'}
      flex={flex as string}
      gap={gap as 'small' | 'middle' | 'large' | number}
      component={component as any}
      style={style as React.CSSProperties}
    >
      {children}
    </AntFlex>
  );
};
