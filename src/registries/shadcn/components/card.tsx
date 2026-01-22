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

export const Card = ({ element, children }: ComponentRenderProps) => {
  const { title, description, footer, variant, style } = element.props;

  return (
    <ShadcnCard
      className={variant === 'elevated' ? 'shadow-lg' : ''}
      style={style as React.CSSProperties}
    >
      {(!!title || !!description) && (
        <CardHeader>
          {!!title && <CardTitle>{title as React.ReactNode}</CardTitle>}
          {!!description && <CardDescription>{description as React.ReactNode}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
      {!!footer && (
        <CardFooter>
          {typeof footer === 'string' ? <p className="text-sm text-muted-foreground">{footer}</p> : footer as React.ReactNode}
        </CardFooter>
      )}
    </ShadcnCard>
  );
};
