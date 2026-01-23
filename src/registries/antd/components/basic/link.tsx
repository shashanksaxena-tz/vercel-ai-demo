'use client';

import React from 'react';
import { Typography } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

const { Link: AntLink } = Typography;

export const Link = ({ element, onAction, children }: ComponentRenderProps) => {
  const {
    href,
    target,
    rel,
    label,
    action,
    type,
    underline,
    disabled,
    copyable,
    ellipsis,
    className,
    style
  } = element.props;

  const handleClick = (e: React.MouseEvent) => {
    if (action && onAction) {
      e.preventDefault();
      onAction({ name: action as string });
    }
  };

  return (
    <AntLink
      href={href as string}
      target={target as string}
      rel={rel as string}
      onClick={action ? handleClick : undefined}
      type={type as 'secondary' | 'success' | 'warning' | 'danger'}
      underline={underline as boolean}
      disabled={disabled as boolean}
      copyable={copyable as boolean}
      ellipsis={ellipsis as boolean}
      className={className as string}
      style={style as React.CSSProperties}
    >
      {(label as string) || children}
    </AntLink>
  );
};
