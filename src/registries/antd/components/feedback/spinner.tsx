'use client';

import React from 'react';
import { Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ComponentRenderProps } from '@json-render/react';

export const Spinner = ({ element, children }: ComponentRenderProps) => {
  const {
    spinning = true,
    size = 'default',
    tip,
    delay,
    indicator,
    fullscreen,
    style
  } = element.props;

  const customIndicator = indicator ? undefined : <LoadingOutlined spin />;

  return (
    <Spin
      spinning={spinning as boolean}
      size={size as 'small' | 'default' | 'large'}
      tip={tip as React.ReactNode}
      delay={delay as number}
      indicator={customIndicator}
      fullscreen={fullscreen as boolean}
      style={style as React.CSSProperties}
    >
      {children}
    </Spin>
  );
};
