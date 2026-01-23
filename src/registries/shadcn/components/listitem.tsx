import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const ListItem = ({ element, children }: ComponentRenderProps) => {
  const {
    text,
    description,
    icon,
    trailing,
    avatar,
    style
  } = element.props;

  return (
    <li
      className="flex items-start gap-3 py-2"
      style={style as React.CSSProperties}
    >
      {avatar ? (
        <img
          src={avatar as string}
          alt=""
          className="h-10 w-10 rounded-full object-cover flex-shrink-0"
        />
      ) : null}
      {icon && !avatar ? (
        <span className="flex-shrink-0 text-muted-foreground">{icon as string}</span>
      ) : null}
      <div className="flex-1 min-w-0">
        {text ? (
          <span className="font-medium block truncate">{text as string}</span>
        ) : null}
        {description ? (
          <p className="text-sm text-muted-foreground mt-0.5">{description as string}</p>
        ) : null}
        {children}
      </div>
      {trailing ? (
        <span className="flex-shrink-0 text-muted-foreground text-sm">
          {trailing as string}
        </span>
      ) : null}
    </li>
  );
};
