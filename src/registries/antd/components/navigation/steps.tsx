'use client';

import React from 'react';
import { Steps as AntSteps } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Steps = ({ element, onAction }: ComponentRenderProps) => {
  const {
    items = [],
    current = 0,
    direction = 'horizontal',
    type = 'default',
    size = 'default',
    status,
    initial = 0,
    labelPlacement = 'horizontal',
    progressDot,
    responsive = true,
    action,
    style
  } = element.props;

  const handleChange = (current: number) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { current } } as never);
    }
  };

  return (
    <AntSteps
      items={items as any[]}
      current={current as number}
      direction={direction as 'horizontal' | 'vertical'}
      type={type as 'default' | 'navigation' | 'inline'}
      size={size as 'default' | 'small'}
      status={status as 'wait' | 'process' | 'finish' | 'error'}
      initial={initial as number}
      labelPlacement={labelPlacement as 'horizontal' | 'vertical'}
      progressDot={progressDot as boolean}
      responsive={responsive as boolean}
      onChange={handleChange}
      style={style as React.CSSProperties}
    />
  );
};
