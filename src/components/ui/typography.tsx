'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Heading Component
const headingVariants = cva(
  'font-heading tracking-tight',
  {
    variants: {
      level: {
        '1': 'text-4xl font-bold md:text-5xl lg:text-6xl',
        '2': 'text-3xl font-bold md:text-4xl',
        '3': 'text-2xl font-semibold md:text-3xl',
        '4': 'text-xl font-semibold md:text-2xl',
        '5': 'text-lg font-semibold md:text-xl',
        '6': 'text-base font-semibold md:text-lg',
      },
      color: {
        default: 'text-foreground',
        primary: 'text-primary',
        secondary: 'text-secondary',
        accent: 'text-accent',
        success: 'text-green-600',
        warning: 'text-yellow-600',
        error: 'text-red-600',
        info: 'text-blue-600',
        muted: 'text-muted-foreground',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      level: '2',
      color: 'default',
      align: 'left',
    },
  }
);

interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'>,
    VariantProps<typeof headingVariants> {
  text?: string;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = '2', color, align, weight, text, children, ...props }, ref) => {
    const Tag = `h${level}` as const;
    return React.createElement(
      Tag,
      {
        ref,
        className: cn(headingVariants({ level, color, align, weight, className })),
        ...props,
      },
      text || children
    );
  }
);
Heading.displayName = 'Heading';

// Text Component
const textVariants = cva(
  '',
  {
    variants: {
      variant: {
        body: 'text-base',
        caption: 'text-xs',
        overline: 'text-xs uppercase tracking-wider',
        label: 'text-sm font-medium',
      },
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
      },
      color: {
        default: 'text-foreground',
        primary: 'text-primary',
        secondary: 'text-secondary-foreground',
        accent: 'text-accent-foreground',
        success: 'text-green-600',
        warning: 'text-yellow-600',
        error: 'text-red-600',
        info: 'text-blue-600',
        muted: 'text-muted-foreground',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
      },
      truncate: {
        true: 'truncate',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'body',
      size: 'md',
      color: 'default',
      weight: 'normal',
      align: 'left',
      truncate: false,
    },
  }
);

interface TextProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>,
    VariantProps<typeof textVariants> {
  content?: string;
  lines?: number;
  as?: 'p' | 'span' | 'div';
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({
    className,
    variant,
    size,
    color,
    weight,
    align,
    truncate,
    content,
    lines,
    as: Component = 'p',
    children,
    style,
    ...props
  }, ref) => {
    const lineClampStyle = lines ? {
      display: '-webkit-box',
      WebkitLineClamp: lines,
      WebkitBoxOrient: 'vertical' as const,
      overflow: 'hidden',
    } : {};

    return (
      <Component
        ref={ref as React.Ref<HTMLParagraphElement>}
        className={cn(textVariants({ variant, size, color, weight, align, truncate, className }))}
        style={{ ...lineClampStyle, ...style }}
        {...props}
      >
        {content || children}
      </Component>
    );
  }
);
Text.displayName = 'Text';

// Link Component
const linkVariants = cva(
  'inline-flex items-center gap-1 transition-colors',
  {
    variants: {
      variant: {
        default: 'text-primary hover:text-primary/80',
        subtle: 'text-muted-foreground hover:text-foreground',
        underline: 'underline underline-offset-4 hover:text-primary',
      },
      color: {
        default: '',
        primary: 'text-primary hover:text-primary/80',
        secondary: 'text-secondary hover:text-secondary/80',
        accent: 'text-accent hover:text-accent/80',
        success: 'text-green-600 hover:text-green-700',
        warning: 'text-yellow-600 hover:text-yellow-700',
        error: 'text-red-600 hover:text-red-700',
        info: 'text-blue-600 hover:text-blue-700',
        muted: 'text-muted-foreground hover:text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
      color: 'default',
    },
  }
);

interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>,
    VariantProps<typeof linkVariants> {
  text?: string;
  external?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, color, text, external, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(linkVariants({ variant, color, className }))}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {text || children}
      {external && (
        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </a>
  )
);
Link.displayName = 'Link';

export { Heading, headingVariants, Text, textVariants, Link, linkVariants };
