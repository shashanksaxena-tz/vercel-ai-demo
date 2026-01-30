'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Container Component
const containerVariants = cva(
  'mx-auto w-full px-4 sm:px-6 lg:px-8',
  {
    variants: {
      maxWidth: {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl',
        '2xl': 'max-w-screen-2xl',
        full: 'max-w-full',
      },
      centered: {
        true: 'flex flex-col items-center',
        false: '',
      },
    },
    defaultVariants: {
      maxWidth: 'xl',
      centered: false,
    },
  }
);

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth, centered, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(containerVariants({ maxWidth, centered, className }))}
      {...props}
    />
  )
);
Container.displayName = 'Container';

// Row Component (Flex Row)
const rowVariants = cva(
  'flex',
  {
    variants: {
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
      gap: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
      },
      wrap: {
        true: 'flex-wrap',
        false: 'flex-nowrap',
      },
      reverse: {
        true: 'flex-row-reverse',
        false: '',
      },
    },
    defaultVariants: {
      align: 'center',
      justify: 'start',
      gap: 'md',
      wrap: false,
      reverse: false,
    },
  }
);

interface RowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof rowVariants> {}

const Row = React.forwardRef<HTMLDivElement, RowProps>(
  ({ className, align, justify, gap, wrap, reverse, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(rowVariants({ align, justify, gap, wrap, reverse, className }))}
      {...props}
    />
  )
);
Row.displayName = 'Row';

// Column Component (Flex Column)
const columnVariants = cva(
  'flex flex-col',
  {
    variants: {
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
      gap: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
      },
    },
    defaultVariants: {
      align: 'stretch',
      justify: 'start',
      gap: 'md',
    },
  }
);

interface ColumnProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof columnVariants> {}

const Column = React.forwardRef<HTMLDivElement, ColumnProps>(
  ({ className, align, justify, gap, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(columnVariants({ align, justify, gap, className }))}
      {...props}
    />
  )
);
Column.displayName = 'Column';

// Grid Component
interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
}

const gapMap = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, columns = 3, gap = 'md', responsive, ...props }, ref) => {
    const responsiveClasses = responsive
      ? `sm:grid-cols-${responsive.sm || columns} md:grid-cols-${responsive.md || columns} lg:grid-cols-${responsive.lg || columns}`
      : '';

    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          `grid-cols-${columns}`,
          gapMap[gap],
          responsiveClasses,
          className
        )}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        {...props}
      />
    );
  }
);
Grid.displayName = 'Grid';

// Stack Component
const stackVariants = cva(
  'flex',
  {
    variants: {
      direction: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      },
      spacing: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
      },
    },
    defaultVariants: {
      direction: 'vertical',
      spacing: 'md',
      align: 'stretch',
    },
  }
);

interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  divider?: boolean;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, spacing, align, divider, children, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const isVertical = direction === 'vertical';

    return (
      <div
        ref={ref}
        className={cn(stackVariants({ direction, spacing, align, className }))}
        {...props}
      >
        {divider
          ? childArray.map((child, index) => (
              <React.Fragment key={index}>
                {child}
                {index < childArray.length - 1 && (
                  <div
                    className={cn(
                      'bg-border',
                      isVertical ? 'h-px w-full' : 'h-full w-px'
                    )}
                  />
                )}
              </React.Fragment>
            ))
          : children}
      </div>
    );
  }
);
Stack.displayName = 'Stack';

// Spacer Component
interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  flexible?: boolean;
}

const spacerSizes = {
  xs: 'h-1 w-1',
  sm: 'h-2 w-2',
  md: 'h-4 w-4',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
};

const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size = 'md', flexible = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        flexible ? 'flex-1' : spacerSizes[size],
        className
      )}
      {...props}
    />
  )
);
Spacer.displayName = 'Spacer';

// Divider Component
interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  label?: string;
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', variant = 'solid', label, ...props }, ref) => {
    const isHorizontal = orientation === 'horizontal';
    const borderStyle = {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    }[variant];

    if (label && isHorizontal) {
      return (
        <div ref={ref} className={cn('flex items-center', className)} {...props}>
          <div className={cn('flex-1 border-t border-border', borderStyle)} />
          <span className="px-3 text-sm text-muted-foreground">{label}</span>
          <div className={cn('flex-1 border-t border-border', borderStyle)} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          isHorizontal
            ? 'h-px w-full border-t border-border'
            : 'h-full w-px border-l border-border',
          borderStyle,
          className
        )}
        {...props}
      />
    );
  }
);
Divider.displayName = 'Divider';

export {
  Container,
  containerVariants,
  Row,
  rowVariants,
  Column,
  columnVariants,
  Grid,
  Stack,
  stackVariants,
  Spacer,
  Divider,
};
