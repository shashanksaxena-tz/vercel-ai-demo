import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Quote, Star } from 'lucide-react';

export const Testimonial = ({ element }: ComponentRenderProps) => {
  const {
    quote,
    author,
    role,
    company,
    avatar,
    rating,
    variant = 'default',
    style
  } = element.props;

  const variantStyles = {
    default: 'bg-background border rounded-xl p-6',
    filled: 'bg-muted rounded-xl p-6',
    minimal: '',
    card: 'bg-background border rounded-xl p-6 shadow-lg',
  };

  const ratingNum = rating as number;

  return (
    <div
      className={cn(
        variantStyles[(variant as keyof typeof variantStyles) || 'default']
      )}
      style={style as React.CSSProperties}
    >
      {variant !== 'minimal' ? (
        <Quote className="h-8 w-8 text-primary/20 mb-4" />
      ) : null}

      {ratingNum && ratingNum > 0 ? (
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Star
              key={idx}
              className={cn(
                'h-4 w-4',
                idx < ratingNum
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-muted-foreground'
              )}
            />
          ))}
        </div>
      ) : null}

      <blockquote className="text-lg leading-relaxed mb-6">
        "{quote as string}"
      </blockquote>

      <div className="flex items-center gap-4">
        {avatar ? (
          <img
            src={avatar as string}
            alt={author as string}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : null}
        <div>
          <p className="font-semibold">{author as string}</p>
          {(role || company) ? (
            <p className="text-sm text-muted-foreground">
              {role ? (role as string) : ''}
              {role && company ? ' at ' : ''}
              {company ? (company as string) : ''}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
