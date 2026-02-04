import React from 'react';
import { Avatar as MuiAvatar } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Avatar = ({ element }: ComponentRenderProps) => {
  const { src, fallback, alt, style } = element.props;

  return (
    <MuiAvatar
      src={src as string}
      alt={alt as string}
      style={style as React.CSSProperties}
    >
      {!src && (fallback as React.ReactNode)}
    </MuiAvatar>
  );
};
