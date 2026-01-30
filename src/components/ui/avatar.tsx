'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      size: 'md',
      rounded: 'full',
    },
  }
);

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  name?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, rounded, src, name, status, ...props }, ref) => (
  <div className="relative inline-flex">
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size, rounded, className }))}
      {...props}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={name || 'Avatar'}
          className="aspect-square h-full w-full object-cover"
        />
      )}
      <AvatarPrimitive.Fallback
        className="flex h-full w-full items-center justify-center bg-muted font-medium"
      >
        {name ? getInitials(name) : '?'}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
    {status && (
      <span
        className={cn(
          'absolute bottom-0 right-0 block rounded-full ring-2 ring-background',
          statusColors[status],
          size === 'xs' && 'h-1.5 w-1.5',
          size === 'sm' && 'h-2 w-2',
          size === 'md' && 'h-2.5 w-2.5',
          size === 'lg' && 'h-3 w-3',
          size === 'xl' && 'h-4 w-4'
        )}
      />
    )}
  </div>
));
Avatar.displayName = 'Avatar';

// Avatar Group
interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max = 4, size = 'md', children, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const visibleChildren = max ? childArray.slice(0, max) : childArray;
    const remainingCount = max ? childArray.length - max : 0;

    const overlapClasses = {
      xs: '-ml-1.5',
      sm: '-ml-2',
      md: '-ml-3',
      lg: '-ml-4',
      xl: '-ml-5',
    };

    return (
      <div ref={ref} className={cn('flex items-center', className)} {...props}>
        {visibleChildren.map((child, index) => (
          <div
            key={index}
            className={cn(
              'ring-2 ring-background rounded-full',
              index > 0 && overlapClasses[size]
            )}
          >
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<AvatarProps>, { size })
              : child}
          </div>
        ))}
        {remainingCount > 0 && (
          <div
            className={cn(
              'flex items-center justify-center rounded-full bg-muted font-medium ring-2 ring-background',
              avatarVariants({ size }),
              overlapClasses[size]
            )}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = 'AvatarGroup';

export { Avatar, avatarVariants, AvatarGroup };
