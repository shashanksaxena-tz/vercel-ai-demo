'use client';

import React from 'react';
import { Button as AntButton } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Button = ({ element, onAction, children }: ComponentRenderProps) => {
  const {
    variant = 'default',
    size = 'default',
    label,
    action,
    disabled,
    loading,
    icon,
    block,
    shape,
    htmlType,
    className,
    style
  } = element.props;

  // Map variants to Ant Design types
  let type: 'primary' | 'default' | 'dashed' | 'link' | 'text' = 'primary';
  let danger = false;

  switch (variant) {
    case 'secondary':
      type = 'default';
      break;
    case 'destructive':
      type = 'primary';
      danger = true;
      break;
    case 'ghost':
      type = 'text';
      break;
    case 'link':
      type = 'link';
      break;
    case 'outline':
      type = 'dashed';
      break;
    case 'default':
    default:
      type = 'primary';
      break;
  }

  // Map sizes
  let antSize: 'small' | 'middle' | 'large' = 'middle';
  switch (size) {
    case 'sm':
      antSize = 'small';
      break;
    case 'lg':
      antSize = 'large';
      break;
    default:
      antSize = 'middle';
      break;
  }

  const handleClick = () => {
    if (action && onAction) {
      onAction({ name: action as string });
    }
  };

  return (
    <AntButton
      type={type}
      danger={danger}
      size={antSize}
      onClick={handleClick}
      disabled={disabled as boolean}
      loading={loading as boolean}
      block={block as boolean}
      shape={shape as 'default' | 'circle' | 'round'}
      htmlType={htmlType as 'button' | 'submit' | 'reset'}
      className={className as string}
      style={style as React.CSSProperties}
    >
      {Boolean(icon) && <span className="mr-2">{icon as React.ReactNode}</span>}
      {(label as string) || children}
    </AntButton>
  );
};
