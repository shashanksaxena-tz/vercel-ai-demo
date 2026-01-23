'use client';

import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Breadcrumb = ({ element, onAction }: ComponentRenderProps) => {
  const {
    items = [],
    separator,
    maxItems,
    sx,
    style
  } = element.props;

  const handleClick = (href: string, action?: string) => (e: React.MouseEvent) => {
    if (action && onAction) {
      e.preventDefault();
      onAction({ name: action, payload: { href } } as never);
    }
  };

  return (
    <Breadcrumbs
      separator={(separator || '›') as React.ReactNode}
      maxItems={maxItems as number}
      sx={sx as any}
      style={style as React.CSSProperties}
    >
      {(items as { label: string; href?: string; action?: string; current?: boolean }[]).map((item, index) => {
        if (item.current || index === (items as any[]).length - 1) {
          return (
            <Typography key={index} color="text.primary">
              {item.label}
            </Typography>
          );
        }
        return (
          <Link
            key={index}
            underline="hover"
            color="inherit"
            href={item.href || '#'}
            onClick={handleClick(item.href || '', item.action)}
          >
            {item.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
