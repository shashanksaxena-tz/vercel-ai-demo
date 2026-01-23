'use client';

import React from 'react';
import { Input, Form } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

const { TextArea: AntTextArea } = Input;

export const Textarea = ({ element, onAction }: ComponentRenderProps) => {
  const {
    name,
    label,
    placeholder,
    value,
    defaultValue,
    disabled,
    required,
    maxLength,
    showCount,
    autoSize,
    rows = 4,
    status,
    action,
    style
  } = element.props;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { name, value: e.target.value } } as never);
    }
  };

  const textarea = (
    <AntTextArea
      name={name as string}
      placeholder={placeholder as string}
      value={value as string}
      defaultValue={defaultValue as string}
      disabled={disabled as boolean}
      maxLength={maxLength as number}
      showCount={showCount as boolean}
      autoSize={autoSize as boolean | { minRows: number; maxRows: number }}
      rows={rows as number}
      status={status as 'error' | 'warning'}
      onChange={handleChange}
      style={style as React.CSSProperties}
    />
  );

  if (label) {
    return (
      <Form.Item label={label as string} required={required as boolean}>
        {textarea}
      </Form.Item>
    );
  }

  return textarea;
};
