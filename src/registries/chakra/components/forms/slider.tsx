'use client';

import React from 'react';
import { Slider, Field, Box, Text } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const SliderComponent = ({ element, onAction }: ComponentRenderProps) => {
  const {
    name,
    label,
    value,
    defaultValue = [50],
    min = 0,
    max = 100,
    step = 1,
    disabled,
    colorPalette = 'blue',
    showMarks,
    action,
    sx,
    style
  } = element.props;

  const handleChange = (details: { value: number[] }) => {
    if (action && onAction) {
      onAction({ name: action as string, payload: { name, value: details.value[0] } } as never);
    }
  };

  // Ensure value is an array for Slider v3
  const sliderValue = Array.isArray(value) ? value : value !== undefined ? [value as number] : undefined;
  const sliderDefaultValue = Array.isArray(defaultValue) ? defaultValue : [defaultValue as number];

  return (
    <Field.Root style={style as React.CSSProperties}>
      {Boolean(label) && <Field.Label>{label as string}</Field.Label>}
      <Slider.Root
        value={sliderValue}
        defaultValue={sliderDefaultValue}
        min={min as number}
        max={max as number}
        step={step as number}
        disabled={disabled as boolean}
        colorPalette={colorPalette as string}
        onValueChange={handleChange}
      >
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0}>
            <Slider.HiddenInput name={name as string} />
          </Slider.Thumb>
        </Slider.Control>
        {showMarks && (
          <Slider.MarkerGroup>
            <Slider.Marker value={min as number}>{String(min)}</Slider.Marker>
            <Slider.Marker value={max as number}>{String(max)}</Slider.Marker>
          </Slider.MarkerGroup>
        )}
      </Slider.Root>
    </Field.Root>
  );
};

export { SliderComponent as Slider };
