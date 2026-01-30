'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

// Image Component
const imageVariants = cva(
  'object-cover',
  {
    variants: {
      fit: {
        cover: 'object-cover',
        contain: 'object-contain',
        fill: 'object-fill',
        none: 'object-none',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      fit: 'cover',
      rounded: 'md',
    },
  }
);

interface ImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof imageVariants> {
  fallback?: string;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, alt, fit, rounded, fallback, onError, ...props }, ref) => {
    const [imgSrc, setImgSrc] = React.useState(src);
    const [hasError, setHasError] = React.useState(false);

    React.useEffect(() => {
      setImgSrc(src);
      setHasError(false);
    }, [src]);

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (!hasError && fallback) {
        setImgSrc(fallback);
        setHasError(true);
      }
      onError?.(e);
    };

    return (
      <img
        ref={ref}
        src={imgSrc}
        alt={alt}
        className={cn(imageVariants({ fit, rounded, className }))}
        onError={handleError}
        {...props}
      />
    );
  }
);
Image.displayName = 'Image';

// Icon Component
const iconSizes = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
};

const iconColors = {
  default: 'text-current',
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600',
  info: 'text-blue-600',
  muted: 'text-muted-foreground',
};

interface IconProps extends React.SVGAttributes<SVGElement> {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'muted';
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, name, size = 'md', color = 'default', ...props }, ref) => {
    // Convert kebab-case or snake_case to PascalCase
    const iconName = name
      .split(/[-_]/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    const LucideIcon = (LucideIcons as unknown as Record<string, React.ComponentType<LucideIcons.LucideProps>>)[iconName];

    if (!LucideIcon) {
      // Return a placeholder for unknown icons
      return (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded bg-muted',
            iconSizes[size],
            className
          )}
        >
          ?
        </span>
      );
    }

    return (
      <LucideIcon
        ref={ref as React.Ref<SVGSVGElement>}
        className={cn(iconSizes[size], iconColors[color], className)}
        {...props}
      />
    );
  }
);
Icon.displayName = 'Icon';

// Code Block Component
interface CodeProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

const Code = React.forwardRef<HTMLPreElement, CodeProps>(
  ({ className, code, language = 'text', showLineNumbers, highlightLines = [], ...props }, ref) => {
    const lines = code.split('\n');

    return (
      <pre
        ref={ref}
        className={cn(
          'overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-50',
          className
        )}
        {...props}
      >
        <code className={`language-${language}`}>
          {showLineNumbers ? (
            <table className="w-full border-collapse">
              <tbody>
                {lines.map((line, index) => (
                  <tr
                    key={index}
                    className={cn(
                      highlightLines.includes(index + 1) && 'bg-yellow-500/10'
                    )}
                  >
                    <td className="select-none pr-4 text-right text-slate-500 w-8">
                      {index + 1}
                    </td>
                    <td className="whitespace-pre">{line}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            code
          )}
        </code>
      </pre>
    );
  }
);
Code.displayName = 'Code';

// Keyboard Shortcut Display
interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  keys: string[];
}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, keys, ...props }, ref) => (
    <span ref={ref} className={cn('inline-flex items-center gap-1', className)} {...props}>
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            {key}
          </kbd>
          {index < keys.length - 1 && <span className="text-muted-foreground">+</span>}
        </React.Fragment>
      ))}
    </span>
  )
);
Kbd.displayName = 'Kbd';

// Quote/Blockquote Component
interface QuoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  text: string;
  author?: string;
  source?: string;
}

const Quote = React.forwardRef<HTMLQuoteElement, QuoteProps>(
  ({ className, text, author, source, ...props }, ref) => (
    <figure className={cn('', className)}>
      <blockquote
        ref={ref}
        className="border-l-4 border-primary pl-4 italic text-muted-foreground"
        {...props}
      >
        <p>{text}</p>
      </blockquote>
      {(author || source) && (
        <figcaption className="mt-2 text-sm">
          {author && <span className="font-medium">{author}</span>}
          {author && source && <span className="mx-1">—</span>}
          {source && <cite className="text-muted-foreground">{source}</cite>}
        </figcaption>
      )}
    </figure>
  )
);
Quote.displayName = 'Quote';

// Rating Component
interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  value?: number;
  readonly?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onValueChange?: (value: number) => void;
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({
    className,
    max = 5,
    value = 0,
    readonly = false,
    size = 'md',
    onValueChange,
    ...props
  }, ref) => {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);
    const displayValue = hoverValue ?? value;

    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center gap-0.5', className)}
        {...props}
      >
        {Array.from({ length: max }).map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= displayValue;

          return (
            <button
              key={index}
              type="button"
              disabled={readonly}
              className={cn(
                'transition-colors',
                iconSizes[size],
                isFilled ? 'text-yellow-400' : 'text-muted',
                !readonly && 'cursor-pointer hover:text-yellow-400'
              )}
              onClick={() => !readonly && onValueChange?.(starValue)}
              onMouseEnter={() => !readonly && setHoverValue(starValue)}
              onMouseLeave={() => !readonly && setHoverValue(null)}
            >
              <LucideIcons.Star
                className="h-full w-full"
                fill={isFilled ? 'currentColor' : 'none'}
              />
            </button>
          );
        })}
      </div>
    );
  }
);
Rating.displayName = 'Rating';

export {
  Image,
  imageVariants,
  Icon,
  Code,
  Kbd,
  Quote,
  Rating,
};
