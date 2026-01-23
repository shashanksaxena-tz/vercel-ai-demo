'use client';

import React from 'react';
import { DatePicker as AntDatePicker, Form } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const DatePicker = ({ element, onAction }: ComponentRenderProps) => {
  const {
    name,
    label,
    value,
    placeholder,
    disabled,
    required,
    picker = 'date',
    format,
    showTime,
    showToday = true,
    allowClear = true,
    size = 'middle',
    status,
    action,
    style
  } = element.props;

  const handleChange = (date: any, dateString: string | string[]) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { name, value: dateString, date } } as never);
    }
  };

  const datePicker = (
    <AntDatePicker
      placeholder={placeholder as string}
      disabled={disabled as boolean}
      picker={picker as 'date' | 'week' | 'month' | 'quarter' | 'year'}
      format={format as string}
      showTime={showTime as boolean}
      showToday={showToday as boolean}
      allowClear={allowClear as boolean}
      size={size as 'large' | 'middle' | 'small'}
      status={status as 'error' | 'warning'}
      onChange={handleChange}
      style={{ width: '100%', ...style as React.CSSProperties }}
    />
  );

  if (label) {
    return (
      <Form.Item label={label as string} required={required as boolean}>
        {datePicker}
      </Form.Item>
    );
  }

  return datePicker;
};
