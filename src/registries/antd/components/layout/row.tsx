'use client';

import React from 'react';
import { Row as AntRow } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Row = ({ element, children }: ComponentRenderProps) => {
  const {
    gutter = 0,
    align = 'top',
    justify = 'start',
    wrap = true,
    style
  } = element.props;

  return (
    <AntRow
      gutter={gutter as number | [number, number]}
      align={align as 'top' | 'middle' | 'bottom' | 'stretch'}
      justify={justify as 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'}
      wrap={wrap as boolean}
      style={style as React.CSSProperties}
    >
      {children}
    </AntRow>
  );
};
