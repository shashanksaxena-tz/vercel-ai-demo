'use client';

import React from 'react';
import { Typography } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

const { Paragraph: AntParagraph } = Typography;

export const Paragraph = ({ element, children }: ComponentRenderProps) => {
  const {
    content,
    type,
    strong,
    italic,
    underline,
    delete: del,
    copyable,
    ellipsis,
    className,
    style
  } = element.props;

  return (
    <AntParagraph
      type={type as 'secondary' | 'success' | 'warning' | 'danger'}
      strong={strong as boolean}
      italic={italic as boolean}
      underline={underline as boolean}
      delete={del as boolean}
      copyable={copyable as boolean}
      ellipsis={ellipsis as boolean | { rows?: number; expandable?: boolean }}
      className={className as string}
      style={style as React.CSSProperties}
    >
      {(content as string) || children}
    </AntParagraph>
  );
};
