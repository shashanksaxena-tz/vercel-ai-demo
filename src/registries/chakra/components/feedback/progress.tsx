'use client';

import React from 'react';
import { Progress, ProgressCircle, Box, Text } from '@chakra-ui/react';
import { ComponentRenderProps } from '@json-render/react';

export const ProgressComponent = ({ element }: ComponentRenderProps) => {
  const {
    value = 0,
    type = 'linear',
    colorPalette = 'blue',
    size = 'md',
    showLabel,
    label,
    sx,
    style
  } = element.props;

  if (type === 'circular') {
    return (
      <ProgressCircle.Root
        value={value as number}
        size={size as 'xs' | 'sm' | 'md' | 'lg'}
        style={style as React.CSSProperties}
      >
        <ProgressCircle.Circle>
          <ProgressCircle.Track />
          <ProgressCircle.Range />
        </ProgressCircle.Circle>
        {showLabel && (
          <ProgressCircle.ValueText>
            {(label || `${value}%`) as React.ReactNode}
          </ProgressCircle.ValueText>
        )}
      </ProgressCircle.Root>
    );
  }

  return (
    <Box style={style as React.CSSProperties}>
      {showLabel && (
        <Text fontSize="sm" mb={1}>
          {(label || `${value}%`) as React.ReactNode}
        </Text>
      )}
      <Progress.Root
        value={value as number}
        size={size as 'xs' | 'sm' | 'md' | 'lg'}
        colorPalette={colorPalette as string}
      >
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </Box>
  );
};

export { ProgressComponent as Progress };
