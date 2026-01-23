'use client';

import React from 'react';
import { Image as AntImage } from 'antd';
import { ComponentRenderProps } from '@json-render/react';

export const Image = ({ element }: ComponentRenderProps) => {
  const {
    src,
    alt,
    width,
    height,
    fallback,
    placeholder,
    preview,
    className,
    style
  } = element.props;

  return (
    <AntImage
      src={src as string}
      alt={alt as string}
      width={width as number | string}
      height={height as number | string}
      fallback={fallback as string}
      placeholder={placeholder as boolean | React.ReactNode}
      preview={preview as boolean}
      className={className as string}
      style={style as React.CSSProperties}
    />
  );
};
