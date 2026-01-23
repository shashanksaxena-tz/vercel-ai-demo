import React from 'react';
import {
  Card as ShadcnCard,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Card = ({ element, children }: ComponentRenderProps) => {
  const { title, description, footer, variant, style } = element.props;

  const variantStyles = {
    default: 'border shadow-sm',
    elevated: 'border-0 shadow-lg hover:shadow-xl transition-shadow duration-300',
    outline: 'border-2 shadow-none',
    ghost: 'border-0 shadow-none bg-muted/30',
  };

  return (
    <ShadcnCard
      className={cn(
        'overflow-hidden',
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      {(!!title || !!description) && (
        <CardHeader className="space-y-1.5">
          {!!title && (
            <CardTitle className="text-lg font-semibold tracking-tight">
              {title as React.ReactNode}
            </CardTitle>
          )}
          {!!description && (
            <CardDescription className="text-sm text-muted-foreground">
              {description as React.ReactNode}
            </CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent className={!title && !description ? 'pt-6' : ''}>
        {children}
      </CardContent>
      {!!footer && (
        <CardFooter className="border-t bg-muted/30 px-6 py-4">
          {typeof footer === 'string' ? (
            <p className="text-sm text-muted-foreground">{footer}</p>
          ) : (
            footer as React.ReactNode
          )}
        </CardFooter>
      )}
    </ShadcnCard>
  );
};
