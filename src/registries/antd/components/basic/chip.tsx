'use client';

import React from 'react';
import { Tag, Avatar, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { ComponentRenderProps } from '@json-render/react';

export const Chip = ({ element, onAction, children }: ComponentRenderProps) => {
  const {
    content,
    avatar,
    color,
    variant = 'filled',
    size = 'default',
    closable,
    action,
    className,
    style
  } = element.props;

  const handleClose = () => {
    if (action && onAction) {
      onAction({ name: action as string, params: { action: 'close' } });
    }
  };

  const handleClick = () => {
    if (action && onAction) {
      onAction({ name: action as string, params: { action: 'click' } });
    }
  };

  const chipStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: size === 'sm' ? '2px 8px' : '4px 12px',
    borderRadius: 16,
    cursor: action ? 'pointer' : 'default',
    ...style as React.CSSProperties
  };

  return (
    <Tag
      color={color as string}
      bordered={variant === 'outlined'}
      onClick={action ? handleClick : undefined}
      className={className as string}
      style={chipStyle}
    >
      <Space size={4}>
        {avatar && (
          <Avatar size={size === 'sm' ? 16 : 20} src={avatar as string} />
        )}
        {(content as string) || children}
        {closable && (
          <CloseOutlined
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            style={{ fontSize: 10, cursor: 'pointer' }}
          />
        )}
      </Space>
    </Tag>
  );
};
