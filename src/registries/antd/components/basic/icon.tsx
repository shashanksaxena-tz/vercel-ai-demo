'use client';

import React from 'react';
import * as AntIcons from '@ant-design/icons';
import { ComponentRenderProps } from '@json-render/react';

export const Icon = ({ element }: ComponentRenderProps) => {
  const {
    name,
    size = 16,
    color,
    spin,
    rotate,
    twoToneColor,
    className,
    style
  } = element.props;

  // Dynamically get icon from ant-design/icons
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (AntIcons as unknown as Record<string, React.ComponentType<any>>)[name as string];

  if (!IconComponent) {
    // Fallback to a default icon or render nothing
    return (
      <span
        className={className as string}
        style={{
          fontSize: size as number,
          color: color as string,
          ...style as React.CSSProperties
        }}
      >
        ?
      </span>
    );
  }

  return (
    <IconComponent
      spin={spin as boolean}
      rotate={rotate as number}
      twoToneColor={twoToneColor as string}
      className={className as string}
      style={{
        fontSize: size as number,
        color: color as string,
        ...style as React.CSSProperties
      }}
    />
  );
};
