'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const tabsListVariants = cva(
  'inline-flex items-center justify-center',
  {
    variants: {
      variant: {
        line: 'border-b border-border',
        enclosed: 'rounded-lg bg-muted p-1',
        pills: 'gap-1',
        'soft-rounded': 'gap-1',
      },
      size: {
        xs: 'h-7',
        sm: 'h-8',
        md: 'h-10',
        lg: 'h-12',
        xl: 'h-14',
      },
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col h-auto',
      },
    },
    defaultVariants: {
      variant: 'line',
      size: 'md',
      orientation: 'horizontal',
    },
  }
);

const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        line: 'border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground hover:text-foreground -mb-px',
        enclosed: 'rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow',
        pills: 'rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground',
        'soft-rounded': 'rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary',
      },
      size: {
        xs: 'h-6 px-2 text-xs',
        sm: 'h-7 px-2.5 text-xs',
        md: 'h-9 px-3 text-sm',
        lg: 'h-11 px-4 text-base',
        xl: 'h-13 px-5 text-lg',
      },
    },
    defaultVariants: {
      variant: 'line',
      size: 'md',
    },
  }
);

interface TabsProps
  extends Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>, 'orientation'>,
    VariantProps<typeof tabsListVariants> {}

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(({ className, variant, size, orientation, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    orientation={orientation ?? undefined}
    className={cn('w-full', className)}
    {...props}
  />
));
Tabs.displayName = 'Tabs';

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, size, orientation, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant, size, orientation, className }))}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {
  icon?: React.ReactNode;
  label?: string;
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, size, icon, label, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, size, className }))}
    {...props}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {label || children}
  </TabsPrimitive.Trigger>
));
TabsTrigger.displayName = 'TabsTrigger';

interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {}

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = 'TabsContent';

// Simplified Tab and TabPanel for json-render compatibility
interface TabProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const Tab: React.FC<TabProps> = ({ value, label, icon, disabled }) => (
  <TabsTrigger value={value} disabled={disabled} icon={icon} label={label} />
);

interface TabPanelProps {
  value: string;
  children?: React.ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({ value, children }) => (
  <TabsContent value={value}>{children}</TabsContent>
);

export {
  Tabs,
  TabsList,
  tabsListVariants,
  TabsTrigger,
  tabsTriggerVariants,
  TabsContent,
  Tab,
  TabPanel,
};
