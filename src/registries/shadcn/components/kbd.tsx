import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Kbd = ({ element, children }: ComponentRenderProps) => {
  const {
    keys,
    children: propsChildren,
    size = 'default',
    style
  } = element.props;

  const keysArray = keys as string[] | undefined;

  const sizeStyles = {
    sm: 'text-xs px-1 py-0.5 min-w-[1.25rem]',
    default: 'text-xs px-1.5 py-0.5 min-w-[1.5rem]',
    lg: 'text-sm px-2 py-1 min-w-[2rem]',
  };

  const renderKey = (key: string, idx: number) => (
    <React.Fragment key={idx}>
      {idx > 0 && <span className="text-muted-foreground mx-1">+</span>}
      <kbd
        className={cn(
          'inline-flex items-center justify-center font-mono font-medium bg-muted border rounded shadow-sm',
          sizeStyles[(size as keyof typeof sizeStyles) || 'default']
        )}
      >
        {key}
      </kbd>
    </React.Fragment>
  );

  if (keysArray?.length) {
    return (
      <span className="inline-flex items-center" style={style as React.CSSProperties}>
        {keysArray.map((key, idx) => renderKey(key, idx))}
      </span>
    );
  }

  const content = propsChildren || children;
  if (typeof content === 'string') {
    const parts = content.split('+').map((k) => k.trim());
    return (
      <span className="inline-flex items-center" style={style as React.CSSProperties}>
        {parts.map((key, idx) => renderKey(key, idx))}
      </span>
    );
  }

  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center font-mono font-medium bg-muted border rounded shadow-sm',
        sizeStyles[(size as keyof typeof sizeStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      {content as React.ReactNode}
    </kbd>
  );
};
