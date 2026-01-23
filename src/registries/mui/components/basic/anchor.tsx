'use client';

import React from 'react';
import { Link } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Anchor = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    href,
    target,
    rel,
    content,
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
    <Link
      href={href as string}
      target={target as string}
      rel={rel as string || (target === '_blank' ? 'noopener noreferrer' : undefined)}
      onClick={handleClick}
      sx={{
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
        ...sx as any
      }}
      style={style as React.CSSProperties}
    >
      {(content as React.ReactNode) || children}
    </Link>
  );
};
