'use client';

import React from 'react';
import { Divider as AntDivider } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Divider = ({ element, children }: ComponentRenderProps) => {
  const {
    type = 'horizontal',
    orientation,
    orientationMargin,
    dashed,
    plain,
    text,
    className,
    style
  } = element.props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dividerProps: any = {
    type: type as 'horizontal' | 'vertical',
    dashed: dashed as boolean,
    plain: plain as boolean,
    className: className as string,
    style: style as React.CSSProperties,
  };

  if (orientation) {
    dividerProps.orientation = orientation;
  }
  if (orientationMargin !== undefined) {
    dividerProps.orientationMargin = orientationMargin;
  }

  return (
    <AntDivider {...dividerProps}>
      {(text as string) || children}
    </AntDivider>
  );
};
