'use client';

import React from 'react';
import { Col as AntCol } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Col = ({ element, children }: ComponentRenderProps) => {
  const {
    span,
    offset,
    order,
    push,
    pull,
    flex,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    style
  } = element.props;

  return (
    <AntCol
      span={span as number}
      offset={offset as number}
      order={order as number}
      push={push as number}
      pull={pull as number}
      flex={flex as string | number}
      xs={xs as number | { span?: number; offset?: number; order?: number; pull?: number; push?: number }}
      sm={sm as number | { span?: number; offset?: number; order?: number; pull?: number; push?: number }}
      md={md as number | { span?: number; offset?: number; order?: number; pull?: number; push?: number }}
      lg={lg as number | { span?: number; offset?: number; order?: number; pull?: number; push?: number }}
      xl={xl as number | { span?: number; offset?: number; order?: number; pull?: number; push?: number }}
      xxl={xxl as number | { span?: number; offset?: number; order?: number; pull?: number; push?: number }}
      style={style as React.CSSProperties}
    >
      {children}
    </AntCol>
  );
};
