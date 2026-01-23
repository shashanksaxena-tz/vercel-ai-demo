'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronDown } from 'lucide-react';

export const CategoryNav = ({ element, onAction }: ComponentRenderProps) => {
  const {
    categories,
    activeCategory,
    variant = 'vertical',
    showCount = true,
    collapsible = false,
    style,
  } = element.props;

  const [expandedCategories, setExpandedCategories] = React.useState<Set<string>>(new Set());

  const categoryList = categories as Array<{
    id: string;
    name: string;
    count?: number;
    icon?: string;
    children?: Array<{
      id: string;
      name: string;
      count?: number;
    }>;
  }> | undefined;

  const handleCategoryClick = (categoryId: string) => {
    if (onAction) {
      onAction({ name: 'selectCategory', payload: { categoryId } } as never);
    }
  };

  const toggleExpanded = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  if (variant === 'horizontal') {
    return (
      <nav
        className="flex flex-wrap gap-2"
        style={style as React.CSSProperties}
      >
        {categoryList?.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            )}
          >
            {category.name}
            {showCount && category.count !== undefined && (
              <span className="ml-1 text-xs opacity-70">({category.count})</span>
            )}
          </button>
        ))}
      </nav>
    );
  }

  if (variant === 'pills') {
    return (
      <nav
        className="flex flex-wrap gap-2"
        style={style as React.CSSProperties}
      >
        {categoryList?.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={cn(
              'px-3 py-1.5 rounded-md text-sm transition-colors border',
              activeCategory === category.id
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-transparent hover:border-muted-foreground/30'
            )}
          >
            {category.name}
          </button>
        ))}
      </nav>
    );
  }

  // Vertical variant (default)
  return (
    <nav className="space-y-1" style={style as React.CSSProperties}>
      {categoryList?.map((category) => {
        const hasChildren = category.children && category.children.length > 0;
        const isExpanded = expandedCategories.has(category.id);
        const isActive = activeCategory === category.id;

        return (
          <div key={category.id}>
            <div className="flex items-center">
              {collapsible && hasChildren && (
                <button
                  onClick={() => toggleExpanded(category.id)}
                  className="p-1 hover:bg-muted rounded mr-1"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
              <button
                onClick={() => handleCategoryClick(category.id)}
                className={cn(
                  'flex-1 flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors text-left',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                )}
              >
                <span className="font-medium">{category.name}</span>
                {showCount && category.count !== undefined && (
                  <span
                    className={cn(
                      'text-xs',
                      isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    )}
                  >
                    {category.count}
                  </span>
                )}
              </button>
            </div>
            {hasChildren && (!collapsible || isExpanded) && (
              <div className="ml-6 mt-1 space-y-1">
                {category.children?.map((child) => {
                  const isChildActive = activeCategory === child.id;
                  return (
                    <button
                      key={child.id}
                      onClick={() => handleCategoryClick(child.id)}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-1.5 rounded-md text-sm transition-colors text-left',
                        isChildActive
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <span>{child.name}</span>
                      {showCount && child.count !== undefined && (
                        <span className="text-xs opacity-70">{child.count}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};
