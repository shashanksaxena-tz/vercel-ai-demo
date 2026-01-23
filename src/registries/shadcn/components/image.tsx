import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Image = ({ element }: ComponentRenderProps) => {
  const {
    src,
    alt = '',
    width,
    height,
    aspectRatio,
    objectFit = 'cover',
    rounded = 'default',
    shadow,
    caption,
    style
  } = element.props;

  const roundedStyles = {
    none: 'rounded-none',
    default: 'rounded-lg',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  };

  const shadowStyles = {
    none: '',
    sm: 'shadow-sm',
    default: 'shadow',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const aspectRatioMap: Record<string, string> = {
    square: '1/1',
    video: '16/9',
    portrait: '3/4',
    wide: '21/9',
  };

  return (
    <figure className="inline-block" style={style as React.CSSProperties}>
      <img
        src={src as string}
        alt={alt as string}
        width={width as number}
        height={height as number}
        className={cn(
          'max-w-full',
          roundedStyles[(rounded as keyof typeof roundedStyles) || 'default'],
          shadow ? shadowStyles[(shadow as keyof typeof shadowStyles) || 'default'] : null
        )}
        style={{
          objectFit: objectFit as React.CSSProperties['objectFit'],
          aspectRatio: aspectRatio
            ? aspectRatioMap[aspectRatio as string] || (aspectRatio as string)
            : undefined,
        }}
      />
      {caption ? (
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          {caption as string}
        </figcaption>
      ) : null}
    </figure>
  );
};
