'use client';
// @ts-nocheck

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export const CategoryCard = ({ element, onAction }: ComponentRenderProps) => {
  const {
    id,
    name,
    description,
    image,
    productCount,
    variant = 'default',
    size = 'md',
    showArrow = true,
    style,
  } = element.props;

  const handleClick = () => {
    if (onAction) {
      onAction({ name: 'selectCategory', payload: { categoryId: id } } as never);
    }
  };

  const sizes = {
    sm: { card: 'h-32', text: 'text-sm', description: 'text-xs' },
    md: { card: 'h-48', text: 'text-lg', description: 'text-sm' },
    lg: { card: 'h-64', text: 'text-2xl', description: 'text-base' },
  };

  const sizeConfig = sizes[size as keyof typeof sizes] || sizes.md;

  if (variant === 'minimal') {
    return (
      <button
        onClick={handleClick}
        className="group text-left"
        style={style as React.CSSProperties}
      >
        <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-3">
          {image && (
            <img
              src={image as string}
              alt={name as string}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          )}
        </div>
        <h3 className="font-medium group-hover:text-primary transition-colors">
          {name as string}
        </h3>
        {productCount !== undefined && (
          <p className="text-sm text-muted-foreground">
            {productCount} products
          </p>
        )}
      </button>
    );
  }

  if (variant === 'banner') {
    return (
      <button
        onClick={handleClick}
        className={cn(
          'group relative w-full overflow-hidden rounded-lg bg-muted text-left',
          sizeConfig.card
        )}
        style={style as React.CSSProperties}
      >
        {image && (
          <img
            src={image as string}
            alt={name as string}
            className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative h-full flex flex-col justify-center p-6">
          <h3 className={cn('font-bold text-white', sizeConfig.text)}>
            {name as string}
          </h3>
          {description && (
            <p className={cn('text-white/80 mt-1 max-w-xs', sizeConfig.description)}>
              {description as string}
            </p>
          )}
          {showArrow && (
            <div className="flex items-center gap-2 mt-4 text-white">
              <span className="text-sm font-medium">Shop Now</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          )}
        </div>
      </button>
    );
  }

  if (variant === 'card') {
    return (
      <button
        onClick={handleClick}
        className="group border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow text-left"
        style={style as React.CSSProperties}
      >
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          {image && (
            <img
              src={image as string}
              alt={name as string}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold group-hover:text-primary transition-colors">
            {name as string}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {description as string}
            </p>
          )}
          {productCount !== undefined && (
            <p className="text-xs text-muted-foreground mt-2">
              {productCount} products
            </p>
          )}
        </div>
      </button>
    );
  }

  // Default overlay variant
  return (
    <button
      onClick={handleClick}
      className={cn(
        'group relative w-full overflow-hidden rounded-lg bg-muted',
        sizeConfig.card
      )}
      style={style as React.CSSProperties}
    >
      {image && (
        <img
          src={image as string}
          alt={name as string}
          className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
        <h3 className={cn('font-bold text-center', sizeConfig.text)}>
          {name as string}
        </h3>
        {productCount !== undefined && (
          <p className={cn('text-white/80 mt-1', sizeConfig.description)}>
            {productCount} products
          </p>
        )}
        {showArrow && (
          <ArrowRight className="h-5 w-5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
    </button>
  );
};
