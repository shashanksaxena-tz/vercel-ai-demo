'use client';

import React from 'react';
import { Typography } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

const { Text: AntText } = Typography;

export const Text = ({ element, children }: ComponentRenderProps) => {
  const {
    content,
    type,
    strong,
    italic,
    underline,
    delete: del,
    code,
    mark,
    keyboard,
    disabled,
    copyable,
    ellipsis,
    className,
    style
  } = element.props;

  return (
    <AntText
      type={type as 'secondary' | 'success' | 'warning' | 'danger'}
      strong={strong as boolean}
      italic={italic as boolean}
      underline={underline as boolean}
      delete={del as boolean}
      code={code as boolean}
      mark={mark as boolean}
      keyboard={keyboard as boolean}
      disabled={disabled as boolean}
      copyable={copyable as boolean}
      ellipsis={ellipsis as never}
      className={className as string}
      style={style as React.CSSProperties}
    >
      {(content as string) || children}
    </AntText>
  );
};
