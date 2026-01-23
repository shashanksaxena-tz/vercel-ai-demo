'use client';

import React, { useState } from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Toggle = ({ element, onAction }: ComponentRenderProps) => {
  const {
    label,
    name,
    pressed,
    defaultPressed = false,
    disabled = false,
    variant = 'default',
    size = 'default',
    icon,
    style
  } = element.props;

  const [isPressed, setIsPressed] = useState((pressed ?? defaultPressed) as boolean);

  const variantStyles = {
    default: 'bg-transparent hover:bg-muted hover:text-muted-foreground',
    outline: 'border border-input bg-transparent hover:bg-muted hover:text-muted-foreground',
  };

  const sizeStyles = {
    sm: 'h-8 px-2 text-xs',
    default: 'h-10 px-3 text-sm',
    lg: 'h-12 px-4 text-base',
  };

  const handleToggle = () => {
    const newValue = !isPressed;
    setIsPressed(newValue);
    onAction?.({
      name: 'change',
      params: { name, value: newValue, pressed: newValue },
    });
  };

  return (
    <button
      type="button"
      name={name as string}
      disabled={disabled as boolean}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variantStyles[(variant as keyof typeof variantStyles) || 'default'],
        sizeStyles[(size as keyof typeof sizeStyles) || 'default'],
        isPressed && 'bg-muted text-muted-foreground'
      )}
      style={style as React.CSSProperties}
      aria-pressed={isPressed}
      onClick={handleToggle}
    >
      {icon ? <span className={cn(label && 'mr-2')}>{icon as string}</span> : null}
      {label ? label as string : null}
    </button>
  );
};
