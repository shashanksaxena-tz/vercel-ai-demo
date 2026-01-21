import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';

export const Text = ({ element, children }: ComponentRenderProps) => {
  const { variant = 'p', children: propsChildren, content, style, align, color } = element.props;

  let muiVariant: TypographyProps['variant'] = 'body1';

  switch (variant) {
    case 'h1': muiVariant = 'h1'; break;
    case 'h2': muiVariant = 'h2'; break;
    case 'h3': muiVariant = 'h3'; break;
    case 'h4': muiVariant = 'h4'; break;
    case 'p': muiVariant = 'body1'; break;
    case 'blockquote': muiVariant = 'body1'; break;
    case 'code': muiVariant = 'body2'; break;
    default: muiVariant = 'body1'; break;
  }

  const textContent = content || propsChildren || children;

  return (
    <Typography
      variant={muiVariant}
      align={align as TypographyProps['align']}
      color={color as string}
      style={style as React.CSSProperties}
      sx={variant === 'code' ? { fontFamily: 'monospace', bgcolor: 'action.hover', p: 0.5, borderRadius: 1 } : {}}
    >
      {textContent as React.ReactNode}
    </Typography>
  );
};
