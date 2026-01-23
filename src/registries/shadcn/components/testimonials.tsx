import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Quote, Star } from 'lucide-react';

export const Testimonials = ({ element }: ComponentRenderProps) => {
  const {
    items,
    columns = 3,
    variant = 'default',
    style
  } = element.props;

  const itemsArray = items as Array<{
    quote: string;
    author: string;
    role?: string;
    company?: string;
    avatar?: string;
    rating?: number;
  }>;

  const variantStyles = {
    default: 'bg-background border rounded-xl p-6',
    filled: 'bg-muted rounded-xl p-6',
    card: 'bg-background border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow',
  };

  return (
    <div
      className={cn('grid gap-6')}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        ...(style as React.CSSProperties),
      }}
    >
      {itemsArray?.map((item, idx) => (
        <div
          key={idx}
          className={cn(
            variantStyles[(variant as keyof typeof variantStyles) || 'default']
          )}
        >
          <Quote className="h-8 w-8 text-primary/20 mb-4" />

          {item.rating && item.rating > 0 && (
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, starIdx) => (
                <Star
                  key={starIdx}
                  className={cn(
                    'h-4 w-4',
                    starIdx < item.rating!
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-muted-foreground'
                  )}
                />
              ))}
            </div>
          )}

          <blockquote className="text-base leading-relaxed mb-6">
            "{item.quote}"
          </blockquote>

          <div className="flex items-center gap-4">
            {item.avatar && (
              <img
                src={item.avatar}
                alt={item.author}
                className="h-10 w-10 rounded-full object-cover"
              />
            )}
            <div>
              <p className="font-semibold text-sm">{item.author}</p>
              {(item.role || item.company) && (
                <p className="text-xs text-muted-foreground">
                  {item.role}
                  {item.role && item.company && ' at '}
                  {item.company}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
