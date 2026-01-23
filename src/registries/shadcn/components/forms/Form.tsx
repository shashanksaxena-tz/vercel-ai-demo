'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Form = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    id,
    action,
    method = 'post',
    layout = 'vertical',
    spacing = 'default',
    disabled = false,
    style
  } = element.props;

  const spacingStyles = {
    compact: 'space-y-2',
    default: 'space-y-4',
    relaxed: 'space-y-6',
    loose: 'space-y-8',
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    onAction?.({
      name: action as string || 'submit',
      params: data,
    });
  };

  return (
    <form
      id={id as string}
      method={method as string}
      onSubmit={handleSubmit}
      className={cn(
        layout === 'vertical'
          ? spacingStyles[(spacing as keyof typeof spacingStyles) || 'default']
          : 'flex flex-wrap gap-4 items-end'
      )}
      style={style as React.CSSProperties}
    >
      <fieldset disabled={disabled as boolean} className="w-full">
        {children}
      </fieldset>
    </form>
  );
};
