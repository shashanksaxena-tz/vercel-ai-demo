'use client';

import React from 'react';
import { Link as MuiLink } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Link = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    href,
    target,
    rel,
    content,
    color = 'primary',
    underline = 'hover',
    action,
    sx,
    style
  } = element.props;

  const handleClick = (e: React.MouseEvent) => {
    if (action && onAction) {
      e.preventDefault();
      onAction({ name: action as string });
    }
  };

  return (
    <MuiLink
      href={href as string}
      target={target as string}
      rel={rel as string || (target === '_blank' ? 'noopener noreferrer' : undefined)}
      color={color as any}
      underline={underline as 'none' | 'hover' | 'always'}
      onClick={handleClick}
      sx={sx as any}
      style={style as React.CSSProperties}
    >
      {(content as React.ReactNode) || children}
    </MuiLink>
  );
};
