'use client';

import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { cn } from '@/lib/utils';

export const Pagination = ({ element, children, onAction }: ComponentRenderProps) => {
  const {
    currentPage = 1,
    totalPages = 1,
    siblingCount = 1,
    showFirstLast = true,
    showPrevNext = true,
    variant = 'default',
    size = 'default',
    style
  } = element.props;

  const current = currentPage as number;
  const total = totalPages as number;
  const siblings = siblingCount as number;

  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const generatePages = () => {
    const totalNumbers = siblings * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (total <= totalBlocks) {
      return range(1, total);
    }

    const leftSiblingIndex = Math.max(current - siblings, 1);
    const rightSiblingIndex = Math.min(current + siblings, total);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < total - 1;

    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblings;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, '...', total];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblings;
      const rightRange = range(total - rightItemCount + 1, total);
      return [1, '...', ...rightRange];
    }

    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [1, '...', ...middleRange, '...', total];
  };

  const pages = generatePages();

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    default: 'h-9 w-9 text-sm',
    lg: 'h-10 w-10 text-base',
  };

  const variantClasses = {
    default: 'border hover:bg-muted',
    outline: 'border-2',
    ghost: 'hover:bg-muted',
    filled: 'bg-muted hover:bg-muted/80',
  };

  const buttonClass = cn(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none',
    sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.default,
    variantClasses[variant as keyof typeof variantClasses] || variantClasses.default
  );

  const handlePageChange = (page: number) => {
    onAction?.({ name: 'pageChange', payload: { page } } as never);
  };

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center gap-1"
      style={style as React.CSSProperties}
    >
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(1)}
          disabled={current === 1}
          className={buttonClass}
          aria-label="Go to first page"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      )}
      {showPrevNext && (
        <button
          onClick={() => handlePageChange(current - 1)}
          disabled={current === 1}
          className={buttonClass}
          aria-label="Go to previous page"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className="px-2 text-muted-foreground">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(page as number)}
            className={cn(
              buttonClass,
              current === page && 'bg-primary text-primary-foreground hover:bg-primary/90'
            )}
            aria-current={current === page ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}
      {showPrevNext && (
        <button
          onClick={() => handlePageChange(current + 1)}
          disabled={current === total}
          className={buttonClass}
          aria-label="Go to next page"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(total)}
          disabled={current === total}
          className={buttonClass}
          aria-label="Go to last page"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      )}
      {children}
    </nav>
  );
};
