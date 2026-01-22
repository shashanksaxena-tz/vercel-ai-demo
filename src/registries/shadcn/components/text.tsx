import React from 'react';
import { cn } from '@/lib/utils';
import { ComponentRenderProps } from '@json-render/react';

export const Text = ({ element, children }: ComponentRenderProps) => {
  const { variant = 'p', children: propsChildren, content, style, className } = element.props;

  const styles: Record<string, string> = {
    h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
    h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
    h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
    h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
    p: 'leading-7 [&:not(:first-child)]:mt-6',
    body: 'leading-7 [&:not(:first-child)]:mt-6',
    caption: 'text-sm text-muted-foreground',
    blockquote: 'mt-6 border-l-2 pl-6 italic',
    code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
  };

  const Component = (['h1', 'h2', 'h3', 'h4', 'p', 'blockquote', 'code'].includes(variant as string) ? variant : 'div') as any;
  const textContent = content || propsChildren || children;

  return (
    <Component
      className={cn(styles[variant as string] || styles.p, className as string)}
      style={style as React.CSSProperties}
    >
      {textContent as React.ReactNode}
    </Component>
  );
};
