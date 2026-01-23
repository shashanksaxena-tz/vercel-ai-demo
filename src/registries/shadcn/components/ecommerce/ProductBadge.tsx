'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { Tag, Sparkles, Clock, Flame, Zap, Award } from 'lucide-react';

export const ProductBadge = ({ element }: ComponentRenderProps) => {
  const {
    label,
    type = 'default',
    size = 'md',
    icon,
    style,
  } = element.props;

  const types = {
    default: 'bg-primary text-primary-foreground',
    sale: 'bg-destructive text-destructive-foreground',
    new: 'bg-green-500 text-white',
    bestseller: 'bg-yellow-500 text-yellow-950',
    limited: 'bg-purple-500 text-white',
    flash: 'bg-orange-500 text-white',
    exclusive: 'bg-gradient-to-r from-purple-600 to-pink-500 text-white',
    outOfStock: 'bg-muted text-muted-foreground',
    lowStock: 'bg-amber-500 text-amber-950',
  };

  const sizes = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  const icons = {
    sale: Tag,
    new: Sparkles,
    limited: Clock,
    bestseller: Flame,
    flash: Zap,
    exclusive: Award,
  };

  const IconComponent = icon
    ? icons[icon as keyof typeof icons]
    : icons[type as keyof typeof icons];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-semibold rounded',
        types[type as keyof typeof types] || types.default,
        sizes[size as keyof typeof sizes] || sizes.md
      )}
      style={style as React.CSSProperties}
    >
      {IconComponent && <IconComponent className="h-3 w-3" />}
      {label as string}
    </span>
  );
};
