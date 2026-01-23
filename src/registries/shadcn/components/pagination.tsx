import React from 'react';
import { ComponentRenderProps } from '@json-render/react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Pagination = ({ element, onAction }: ComponentRenderProps) => {
  const {
    currentPage = 1,
    totalPages = 1,
    showFirstLast = true,
    siblingCount = 1,
    style
  } = element.props;

  const current = currentPage as number;
  const total = totalPages as number;
  const siblings = siblingCount as number;

  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const getPageNumbers = () => {
    const totalNumbers = siblings * 2 + 3;
    if (total <= totalNumbers) return range(1, total);

    const leftSiblingIndex = Math.max(current - siblings, 1);
    const rightSiblingIndex = Math.min(current + siblings, total);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < total - 1;

    if (!showLeftDots && showRightDots) {
      const leftRange = range(1, 3 + 2 * siblings);
      return [...leftRange, '...', total];
    }

    if (showLeftDots && !showRightDots) {
      const rightRange = range(total - (2 + 2 * siblings), total);
      return [1, '...', ...rightRange];
    }

    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [1, '...', ...middleRange, '...', total];
  };

  return (
    <nav
      className="flex items-center justify-center gap-1"
      style={style as React.CSSProperties}
      aria-label="Pagination"
    >
      {showFirstLast ? (
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={current === 1}
          onClick={() => onAction?.({ name: 'page_change', params: { page: 1 } })}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
      ) : null}
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        disabled={current === 1}
        onClick={() => onAction?.({ name: 'page_change', params: { page: current - 1 } })}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <Button
            key={index}
            variant={page === current ? 'default' : 'outline'}
            size="icon"
            className="h-8 w-8"
            onClick={() => onAction?.({ name: 'page_change', params: { page } })}
          >
            {page}
          </Button>
        ) : (
          <span key={index} className="px-2 text-muted-foreground">...</span>
        )
      ))}

      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        disabled={current === total}
        onClick={() => onAction?.({ name: 'page_change', params: { page: current + 1 } })}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      {showFirstLast ? (
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={current === total}
          onClick={() => onAction?.({ name: 'page_change', params: { page: total } })}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      ) : null}
    </nav>
  );
};
