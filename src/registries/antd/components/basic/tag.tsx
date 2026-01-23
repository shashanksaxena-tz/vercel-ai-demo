'use client';

import React from 'react';
import { Tag as AntTag } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Tag = ({ element, onAction, children }: ComponentRenderProps) => {
  const {
    content,
    color,
    closable,
    bordered,
    icon,
    action,
    className,
    style
  } = element.props;

  const handleClose = () => {
    if (action && onAction) {
      onAction({ name: action as string });
    }
  };

  return (
    <AntTag
      color={color as string}
      closable={closable as boolean}
      bordered={bordered as boolean}
      icon={icon as React.ReactNode}
      onClose={closable ? handleClose : undefined}
      className={className as string}
      style={style as React.CSSProperties}
    >
      {(content as string) || children}
    </AntTag>
  );
};
