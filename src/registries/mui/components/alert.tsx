import React from 'react';
import { Alert as MuiAlert, AlertTitle } from '@mui/material';
import { ComponentRenderProps } from '@json-render/react';
import * as LucideIcons from 'lucide-react';

export const Alert = ({ element }: ComponentRenderProps) => {
  const { title, description, variant = 'default', icon, style } = element.props;

  let severity: 'success' | 'info' | 'warning' | 'error' = 'info';

  if (variant === 'destructive') severity = 'error';

  let IconComponent: React.ElementType | null = null;
  if (icon) {
    const normalizeName = (str: string) => str.split(/[-_]/).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
    const iconName = normalizeName(icon as string);
     // @ts-expect-error - Dynamic access
    const LucideIcon = LucideIcons[iconName] || LucideIcons[icon] || LucideIcons.Info;
    IconComponent = LucideIcon;
  }

  const titleNode = title as React.ReactNode;
  const descriptionNode = description as React.ReactNode;

  return (
    <MuiAlert
      severity={severity}
      icon={IconComponent ? React.createElement(IconComponent, { size: 20 }) : undefined}
      style={style as React.CSSProperties}
    >
      {titleNode && <AlertTitle>{titleNode}</AlertTitle>}
      {descriptionNode}
    </MuiAlert>
  );
};
