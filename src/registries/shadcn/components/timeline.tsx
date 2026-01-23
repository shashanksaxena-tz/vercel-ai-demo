import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Circle, CheckCircle2 } from 'lucide-react';

export const Timeline = ({ element, children }: ComponentRenderProps) => {
  const {
    items,
    variant = 'default',
    orientation = 'vertical',
    style
  } = element.props;

  const itemsArray = items as Array<{
    title: string;
    description?: string;
    date?: string;
    icon?: string;
    status?: 'completed' | 'current' | 'upcoming';
  }>;

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'current':
        return <Circle className="h-4 w-4 text-primary fill-primary" />;
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  if (!itemsArray?.length) {
    return (
      <div
        className={cn(
          'relative',
          orientation === 'horizontal' ? 'flex gap-8' : ''
        )}
        style={style as React.CSSProperties}
      >
        {children}
      </div>
    );
  }

  if (orientation === 'horizontal') {
    return (
      <div className="relative flex gap-4 overflow-x-auto pb-4" style={style as React.CSSProperties}>
        {itemsArray.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center min-w-[150px]">
            <div className="flex items-center w-full">
              {idx > 0 && (
                <div
                  className={cn(
                    'flex-1 h-0.5',
                    item.status === 'completed' ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
              <div className="flex-shrink-0">{getStatusIcon(item.status)}</div>
              {idx < itemsArray.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5',
                    item.status === 'completed' ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </div>
            <div className="mt-3 text-center">
              {item.date && (
                <span className="text-xs text-muted-foreground block mb-1">
                  {item.date}
                </span>
              )}
              <h4 className="text-sm font-medium">{item.title}</h4>
              {item.description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" style={style as React.CSSProperties}>
      <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-muted" />
      <div className="space-y-6">
        {itemsArray.map((item, idx) => (
          <div key={idx} className="relative pl-8">
            <div className="absolute left-0 bg-background">
              {getStatusIcon(item.status)}
            </div>
            <div>
              {item.date && (
                <span className="text-xs text-muted-foreground block mb-1">
                  {item.date}
                </span>
              )}
              <h4 className="font-medium">{item.title}</h4>
              {item.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
