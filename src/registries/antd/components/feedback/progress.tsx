'use client';

import React from 'react';
import { Progress as AntProgress } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Progress = ({ element }: ComponentRenderProps) => {
  const {
    percent = 0,
    type = 'line',
    status,
    showInfo = true,
    strokeColor,
    strokeWidth,
    strokeLinecap = 'round',
    trailColor,
    size = 'default',
    steps,
    format,
    style
  } = element.props;

  return (
    <AntProgress
      percent={percent as number}
      type={type as 'line' | 'circle' | 'dashboard'}
      status={status as 'success' | 'exception' | 'normal' | 'active'}
      showInfo={showInfo as boolean}
      strokeColor={strokeColor as string | { from: string; to: string }}
      strokeWidth={strokeWidth as number}
      strokeLinecap={strokeLinecap as 'round' | 'butt' | 'square'}
      trailColor={trailColor as string}
      size={size as 'default' | 'small' | [number, number]}
      steps={steps as number}
      format={format as (percent?: number) => React.ReactNode}
      style={style as React.CSSProperties}
    />
  );
};
