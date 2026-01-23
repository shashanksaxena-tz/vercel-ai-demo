'use client';

import React from 'react';
import { Radio as AntRadio, Form, Space } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Radio = ({ element, onAction }: ComponentRenderProps) => {
  const {
    name,
    label,
    value,
    defaultValue,
    options = [],
    disabled,
    buttonStyle,
    optionType = 'default',
    size = 'middle',
    direction = 'horizontal',
    action,
    style
  } = element.props;

  const handleChange = (e: any) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { name, value: e.target.value } } as never);
    }
  };

  const radioGroup = (
    <AntRadio.Group
      name={name as string}
      value={value as string}
      defaultValue={defaultValue as string}
      disabled={disabled as boolean}
      buttonStyle={buttonStyle as 'outline' | 'solid'}
      optionType={optionType as 'default' | 'button'}
      size={size as 'large' | 'middle' | 'small'}
      onChange={handleChange}
      style={style as React.CSSProperties}
    >
      <Space direction={direction as 'horizontal' | 'vertical'}>
        {(options as { value: string; label: string; disabled?: boolean }[]).map((option) => (
          optionType === 'button' ? (
            <AntRadio.Button key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </AntRadio.Button>
          ) : (
            <AntRadio key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </AntRadio>
          )
        ))}
      </Space>
    </AntRadio.Group>
  );

  if (label) {
    return (
      <Form.Item label={label as string}>
        {radioGroup}
      </Form.Item>
    );
  }

  return radioGroup;
};
