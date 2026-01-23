'use client';

import React from 'react';
import { Slider as AntSlider, Form } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Slider = ({ element, onAction }: ComponentRenderProps) => {
  const {
    name,
    label,
    value,
    defaultValue,
    min = 0,
    max = 100,
    step = 1,
    disabled,
    range,
    marks,
    vertical,
    reverse,
    tooltip,
    included = true,
    action,
    style
  } = element.props;

  const handleChange = (val: number | [number, number]) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { name, value: val } } as never);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sliderProps: any = {
    value,
    defaultValue,
    min: min as number,
    max: max as number,
    step: step as number,
    disabled: disabled as boolean,
    range: range as boolean,
    marks: marks as Record<number, string>,
    vertical: vertical as boolean,
    reverse: reverse as boolean,
    tooltip,
    included: included as boolean,
    onChange: handleChange,
    style: style as React.CSSProperties,
  };

  const slider = <AntSlider {...sliderProps} />;

  if (label) {
    return (
      <Form.Item label={label as string}>
        {slider}
      </Form.Item>
    );
  }

  return slider;
};
