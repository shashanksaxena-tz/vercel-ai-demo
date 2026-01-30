'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Breadcrumb Components
interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  separator?: React.ReactNode;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, separator = <ChevronRight className="h-4 w-4" />, children, ...props }, ref) => {
    const items = React.Children.toArray(children);

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn('flex items-center text-sm', className)}
        {...props}
      >
        <ol className="flex items-center gap-1.5">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5">
              {item}
              {index < items.length - 1 && (
                <span className="text-muted-foreground">{separator}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
);
Breadcrumb.displayName = 'Breadcrumb';

interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  href?: string;
  current?: boolean;
}

const BreadcrumbItem = React.forwardRef<HTMLSpanElement, BreadcrumbItemProps>(
  ({ className, label, href, current, ...props }, ref) => {
    if (current) {
      return (
        <span
          ref={ref}
          className={cn('font-medium text-foreground', className)}
          aria-current="page"
          {...props}
        >
          {label}
        </span>
      );
    }

    if (href) {
      return (
        <a
          href={href}
          className={cn(
            'text-muted-foreground hover:text-foreground transition-colors',
            className
          )}
        >
          {label}
        </a>
      );
    }

    return (
      <span
        ref={ref}
        className={cn('text-muted-foreground', className)}
        {...props}
      >
        {label}
      </span>
    );
  }
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

// Pagination Component
interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  totalPages: number;
  currentPage?: number;
  showFirstLast?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onPageChange?: (page: number) => void;
}

const sizeClasses = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-7 w-7 text-sm',
  md: 'h-8 w-8 text-sm',
  lg: 'h-10 w-10 text-base',
  xl: 'h-12 w-12 text-lg',
};

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({
    className,
    totalPages,
    currentPage = 1,
    showFirstLast = true,
    size = 'md',
    onPageChange,
    ...props
  }, ref) => {
    const pages = React.useMemo(() => {
      const result: (number | 'ellipsis')[] = [];
      const maxVisible = 7;

      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) result.push(i);
      } else {
        result.push(1);

        if (currentPage > 3) {
          result.push('ellipsis');
        }

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
          result.push(i);
        }

        if (currentPage < totalPages - 2) {
          result.push('ellipsis');
        }

        result.push(totalPages);
      }

      return result;
    }, [totalPages, currentPage]);

    const handlePageClick = (page: number) => {
      if (page !== currentPage && page >= 1 && page <= totalPages) {
        onPageChange?.(page);
      }
    };

    const buttonBase = cn(
      'inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 transition-colors',
      sizeClasses[size]
    );

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        className={cn('flex items-center gap-1', className)}
        {...props}
      >
        {showFirstLast && (
          <button
            className={buttonBase}
            onClick={() => handlePageClick(1)}
            disabled={currentPage === 1}
            aria-label="First page"
          >
            <ChevronLeft className="h-4 w-4" />
            <ChevronLeft className="h-4 w-4 -ml-2" />
          </button>
        )}
        <button
          className={buttonBase}
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className={cn('flex items-center justify-center', sizeClasses[size])}
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              className={cn(
                buttonBase,
                currentPage === page && 'bg-primary text-primary-foreground hover:bg-primary/90'
              )}
              onClick={() => handlePageClick(page)}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}

        <button
          className={buttonBase}
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        {showFirstLast && (
          <button
            className={buttonBase}
            onClick={() => handlePageClick(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Last page"
          >
            <ChevronRight className="h-4 w-4" />
            <ChevronRight className="h-4 w-4 -ml-2" />
          </button>
        )}
      </nav>
    );
  }
);
Pagination.displayName = 'Pagination';

// Nav Menu Components
interface NavMenuProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: 'horizontal' | 'vertical';
}

const NavMenu = React.forwardRef<HTMLElement, NavMenuProps>(
  ({ className, orientation = 'horizontal', children, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(
        'flex gap-1',
        orientation === 'vertical' ? 'flex-col' : 'flex-row items-center',
        className
      )}
      {...props}
    >
      {children}
    </nav>
  )
);
NavMenu.displayName = 'NavMenu';

interface NavItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
  badge?: string;
}

const NavItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ className, label, href = '#', icon, active, badge, ...props }, ref) => (
    <a
      ref={ref}
      href={href}
      className={cn(
        'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        active
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        className
      )}
      aria-current={active ? 'page' : undefined}
      {...props}
    >
      {icon}
      {label}
      {badge && (
        <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          {badge}
        </span>
      )}
    </a>
  )
);
NavItem.displayName = 'NavItem';

export {
  Breadcrumb,
  BreadcrumbItem,
  Pagination,
  NavMenu,
  NavItem,
};
