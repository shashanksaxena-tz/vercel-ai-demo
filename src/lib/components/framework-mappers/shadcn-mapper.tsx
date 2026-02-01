'use client';

/**
 * Shadcn/UI Framework Mapper
 * Maps universal component types to Shadcn/UI implementations
 */

import * as React from 'react';
import type { ComponentRegistry, ComponentRenderProps } from '@json-render/react';
import type { RegistryTheme } from '@/lib/registry';
import * as UI from '@/components/ui';
import { cn } from '@/lib/utils';

// ============================================================================
// Theme Configuration
// ============================================================================

export const shadcnTheme: RegistryTheme = {
  name: 'Shadcn Default',
  colors: {
    primary: 'hsl(222.2 47.4% 11.2%)',
    secondary: 'hsl(210 40% 96.1%)',
    accent: 'hsl(210 40% 96.1%)',
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(222.2 84% 4.9%)',
    muted: 'hsl(210 40% 96.1%)',
    success: 'hsl(142.1 76.2% 36.3%)',
    warning: 'hsl(45.4 93.4% 47.5%)',
    error: 'hsl(0 84.2% 60.2%)',
    info: 'hsl(217.2 91.2% 59.8%)',
  },
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  borderRadius: '0.5rem',
  shadows: true,
};

// ============================================================================
// Helper Types
// ============================================================================

interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  centered?: boolean;
  className?: string;
}

interface RowProps {
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
  reverse?: boolean;
}

interface ColumnProps {
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

interface GridProps {
  columns?: number;
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: { sm?: number; md?: number; lg?: number };
}

interface StackProps {
  direction?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  divider?: boolean;
}

interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  flexible?: boolean;
}

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  label?: string;
}

interface CardProps {
  variant?: 'elevated' | 'outlined' | 'filled' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  hoverable?: boolean;
  clickable?: boolean;
}

interface HeadingProps {
  level: '1' | '2' | '3' | '4' | '5' | '6';
  text: string;
  color?: string;
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

interface TextProps {
  content: string;
  variant?: 'body' | 'caption' | 'overline' | 'label';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right' | 'justify';
  truncate?: boolean;
  lines?: number;
}

interface LinkProps {
  text: string;
  href: string;
  external?: boolean;
  variant?: 'default' | 'subtle' | 'underline';
  color?: string;
}

interface ButtonProps {
  label: string;
  variant?: 'solid' | 'outline' | 'ghost' | 'link' | 'soft';
  color?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: string;
  rightIcon?: string;
}

interface BadgeProps {
  text: string;
  variant?: 'solid' | 'subtle' | 'outline';
  color?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: boolean;
}

interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  status?: 'online' | 'offline' | 'away' | 'busy';
}

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'none';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  fallback?: string;
}

interface AlertProps {
  title?: string;
  description: string;
  variant?: 'solid' | 'subtle' | 'outline' | 'left-accent';
  status: 'info' | 'success' | 'warning' | 'error';
  closable?: boolean;
  icon?: string;
}

interface ProgressProps {
  value: number;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  showValue?: boolean;
  variant?: 'linear' | 'circular';
}

interface MetricProps {
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: string;
  valuePath?: string;
  format?: 'currency' | 'percent' | 'number' | 'compact';
}

// Marketing Component Props
interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: { label: string; href?: string };
  secondaryAction?: { label: string; href?: string };
  image?: string;
  imageAlt?: string;
  alignment?: 'left' | 'center' | 'right';
  variant?: 'simple' | 'split' | 'centered' | 'with-image';
  backgroundImage?: string;
  overlay?: boolean;
}

interface FeatureCardProps {
  icon?: string;
  title: string;
  description: string;
  link?: { label: string; href: string };
  variant?: 'simple' | 'bordered' | 'filled' | 'icon-top' | 'icon-left';
}

interface FeatureGridProps {
  columns?: number;
  gap?: string;
  variant?: 'simple' | 'cards' | 'icons';
}

interface PricingCardProps {
  name: string;
  description?: string;
  price: string;
  period?: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  ctaLabel?: string;
  ctaHref?: string;
  variant?: 'simple' | 'bordered' | 'highlighted';
}

interface PricingTableProps {
  columns?: number;
  variant?: 'simple' | 'comparison';
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating?: number;
  variant?: 'simple' | 'bordered' | 'filled' | 'with-image';
}

interface TestimonialCarouselProps {
  autoplay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

interface CTASectionProps {
  title: string;
  description?: string;
  primaryAction?: { label: string; href?: string };
  secondaryAction?: { label: string; href?: string };
  variant?: 'simple' | 'centered' | 'with-image' | 'split';
  backgroundColor?: string;
}

interface FAQProps {
  items?: Array<{ question: string; answer: string }>;
  variant?: 'simple' | 'bordered' | 'separated';
}

interface FooterProps {
  logo?: string;
  companyName?: string;
  description?: string;
  links?: Array<{ title: string; items: Array<{ label: string; href: string }> }>;
  socialLinks?: Array<{ icon: string; href: string; label: string }>;
  copyright?: string;
  variant?: 'simple' | 'centered' | 'multi-column';
}

interface NavbarProps {
  logo?: string;
  brand?: string;
  links?: Array<{ label: string; href: string; active?: boolean }>;
  actions?: Array<{ label: string; href?: string; variant?: string }>;
  sticky?: boolean;
  transparent?: boolean;
  variant?: 'simple' | 'centered' | 'with-actions';
}

interface SidebarNavProps {
  items?: Array<{ label: string; href: string; icon?: string; active?: boolean; badge?: string }>;
  collapsed?: boolean;
  variant?: 'simple' | 'bordered' | 'filled';
}

interface StatsGridProps {
  columns?: number;
  variant?: 'simple' | 'cards' | 'bordered';
}

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: string;
  description?: string;
  variant?: 'simple' | 'bordered' | 'filled';
}

interface LogoCloudProps {
  title?: string;
  variant?: 'simple' | 'grid' | 'carousel';
}

interface NewsletterProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonLabel?: string;
  variant?: 'simple' | 'inline' | 'stacked';
}

interface TeamGridProps {
  columns?: number;
  variant?: 'simple' | 'cards' | 'with-social';
}

interface TeamMemberCardProps {
  name: string;
  role?: string;
  bio?: string;
  avatar?: string;
  socialLinks?: Array<{ icon: string; href: string }>;
  variant?: 'simple' | 'bordered' | 'filled';
}

interface BannerProps {
  message: string;
  action?: { label: string; href?: string };
  dismissible?: boolean;
  variant?: 'info' | 'warning' | 'success' | 'error';
  position?: 'top' | 'bottom';
}

interface AnnouncementBarProps {
  message: string;
  link?: { label: string; href: string };
  dismissible?: boolean;
  backgroundColor?: string;
}

interface BreadcrumbProps {
  separator?: string;
}

interface PaginationProps {
  totalPages: number;
  currentPage?: number;
  showFirstLast?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

// ============================================================================
// Gap utility
// ============================================================================

const gapClasses = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

// ============================================================================
// Shadcn Component Mapper
// ============================================================================

export const shadcnMapper: ComponentRegistry = {
  // ============================================================================
  // Layout Components
  // ============================================================================

  Container: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as ContainerProps;
    return <UI.Container {...props}>{children}</UI.Container>;
  },

  Row: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as RowProps;
    return <UI.Row {...props}>{children}</UI.Row>;
  },

  Column: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as ColumnProps;
    return <UI.Column {...props}>{children}</UI.Column>;
  },

  Grid: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as GridProps;
    return <UI.Grid {...props}>{children}</UI.Grid>;
  },

  Stack: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as StackProps;
    return <UI.Stack {...props}>{children}</UI.Stack>;
  },

  Spacer: ({ element }: ComponentRenderProps) => {
    const props = element.props as SpacerProps;
    return <UI.Spacer {...props} />;
  },

  Divider: ({ element }: ComponentRenderProps) => {
    const props = element.props as DividerProps;
    return <UI.Divider {...props} />;
  },

  // ============================================================================
  // Card Components
  // ============================================================================

  Card: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as CardProps;
    return <UI.Card {...props}>{children}</UI.Card>;
  },

  CardHeader: ({ element }: ComponentRenderProps) => {
    const props = element.props as { title?: string; subtitle?: string; avatar?: string; action?: string };
    return <UI.CardHeader {...props} />;
  },

  CardBody: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.CardBody {...(props as any)}>{children}</UI.CardBody>;
  },

  CardFooter: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.CardFooter {...(props as any)}>{children}</UI.CardFooter>;
  },

  // ============================================================================
  // Typography Components
  // ============================================================================

  Heading: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Heading {...(props as any)} />;
  },

  Text: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Text {...(props as any)} />;
  },

  Link: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Link {...(props as any)} />;
  },

  // ============================================================================
  // Button Components
  // ============================================================================

  Button: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Button {...(props as any)} />;
  },

  IconButton: ({ element }: ComponentRenderProps) => {
    const { icon, label, ...rest } = element.props as { icon: string; label: string } & Record<string, unknown>;
    return (
      <UI.Button {...rest} aria-label={label}>
        <UI.Icon name={icon} />
      </UI.Button>
    );
  },

  ButtonGroup: ({ children }: ComponentRenderProps) => (
    <div className="inline-flex -space-x-px">{children}</div>
  ),

  // ============================================================================
  // Form Components
  // ============================================================================

  Input: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Input {...props} />;
  },

  TextArea: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.TextArea {...props} />;
  },

  Select: ({ element }: ComponentRenderProps) => {
    const { options, label, placeholder, ...rest } = element.props as {
      options?: { value: string; label: string }[];
      label?: string;
      placeholder?: string;
    };
    return (
      <div className="space-y-1.5">
        {label && <label className="text-sm font-medium">{label}</label>}
        <select
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  },

  Checkbox: ({ element }: ComponentRenderProps) => {
    const { label, ...rest } = element.props as { label?: string } & Record<string, unknown>;
    return (
      <label className="flex items-center gap-2">
        <input type="checkbox" className="h-4 w-4 rounded border-input" {...rest} />
        <span className="text-sm">{label}</span>
      </label>
    );
  },

  Radio: ({ element }: ComponentRenderProps) => {
    const { label, value, ...rest } = element.props as { label?: string; value?: string } & Record<string, unknown>;
    return (
      <label className="flex items-center gap-2">
        <input type="radio" value={value} className="h-4 w-4" {...rest} />
        <span className="text-sm">{label}</span>
      </label>
    );
  },

  RadioGroup: ({ element, children }: ComponentRenderProps) => {
    const { label, orientation } = element.props as { label?: string; orientation?: string };
    return (
      <fieldset className="space-y-2">
        {label && <legend className="text-sm font-medium">{label}</legend>}
        <div className={orientation === 'horizontal' ? 'flex gap-4' : 'space-y-2'}>
          {children}
        </div>
      </fieldset>
    );
  },

  Switch: ({ element }: ComponentRenderProps) => {
    const { label, ...rest } = element.props as { label?: string } & Record<string, unknown>;
    return (
      <label className="flex items-center gap-2">
        <button
          role="switch"
          className="peer h-5 w-9 rounded-full bg-input data-[state=checked]:bg-primary"
          {...rest}
        />
        {label && <span className="text-sm">{label}</span>}
      </label>
    );
  },

  Slider: ({ element }: ComponentRenderProps) => {
    const { label, min = 0, max = 100, ...rest } = element.props as { label?: string; min?: number; max?: number };
    return (
      <div className="space-y-1.5">
        {label && <label className="text-sm font-medium">{label}</label>}
        <input type="range" min={min} max={max} className="w-full accent-primary" {...rest} />
      </div>
    );
  },

  // ============================================================================
  // Data Display Components
  // ============================================================================

  Badge: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Badge {...(props as any)} />;
  },

  Avatar: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Avatar {...(props as any)} />;
  },

  AvatarGroup: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.AvatarGroup {...(props as any)}>{children}</UI.AvatarGroup>;
  },

  Icon: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Icon {...(props as any)} />;
  },

  Image: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Image {...(props as any)} />;
  },

  List: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.List {...(props as any)}>{children}</UI.List>;
  },

  ListItem: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.ListItem {...(props as any)}>{children}</UI.ListItem>;
  },

  Table: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Table {...(props as any)}>{children}</UI.Table>;
  },

  TableHeader: ({ children }: ComponentRenderProps) => (
    <UI.TableHeader>{children}</UI.TableHeader>
  ),

  TableBody: ({ children }: ComponentRenderProps) => (
    <UI.TableBody>{children}</UI.TableBody>
  ),

  TableRow: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as { hoverable?: boolean; selected?: boolean };
    return <UI.TableRow {...props}>{children}</UI.TableRow>;
  },

  TableCell: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.TableCell {...(props as any)}>{children}</UI.TableCell>;
  },

  Metric: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Metric {...(props as any)} />;
  },

  Progress: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Progress {...(props as any)} />;
  },

  // ============================================================================
  // Feedback Components
  // ============================================================================

  Alert: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Alert {...(props as any)} />;
  },

  Toast: ({ element }: ComponentRenderProps) => {
    const { title, description, status } = element.props as { title: string; description?: string; status?: string };
    return (
      <div className={cn(
        'rounded-lg border p-4',
        status === 'success' && 'bg-green-50 border-green-200',
        status === 'error' && 'bg-red-50 border-red-200',
        status === 'warning' && 'bg-yellow-50 border-yellow-200',
        (!status || status === 'info') && 'bg-blue-50 border-blue-200'
      )}>
        <p className="font-medium">{title}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    );
  },

  Skeleton: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Skeleton {...(props as any)} />;
  },

  Spinner: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Spinner {...(props as any)} />;
  },

  EmptyState: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.EmptyState {...(props as any)} />;
  },

  // ============================================================================
  // Navigation Components
  // ============================================================================

  Tabs: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Tabs {...(props as any)}>{children}</UI.Tabs>;
  },

  TabList: ({ children }: ComponentRenderProps) => (
    <UI.TabsList>{children}</UI.TabsList>
  ),

  Tab: ({ element }: ComponentRenderProps) => {
    const { value, label, ...rest } = element.props as { value: string; label: string } & Record<string, unknown>;
    return <UI.TabsTrigger value={value} {...rest}>{label}</UI.TabsTrigger>;
  },

  TabPanel: ({ element, children }: ComponentRenderProps) => {
    const { value } = element.props as { value: string };
    return <UI.TabsContent value={value}>{children}</UI.TabsContent>;
  },

  Breadcrumb: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as BreadcrumbProps;
    return <UI.Breadcrumb {...props}>{children}</UI.Breadcrumb>;
  },

  BreadcrumbItem: ({ element }: ComponentRenderProps) => {
    const props = element.props as { label: string; href?: string; current?: boolean };
    return <UI.BreadcrumbItem {...props} />;
  },

  Pagination: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Pagination {...(props as any)} />;
  },

  NavMenu: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.NavMenu {...(props as any)}>{children}</UI.NavMenu>;
  },

  NavItem: ({ element }: ComponentRenderProps) => {
    const props = element.props as { label: string; href?: string; icon?: string; active?: boolean; badge?: string };
    return <UI.NavItem {...props} />;
  },

  // ============================================================================
  // Overlay Components
  // ============================================================================

  Modal: ({ element, children }: ComponentRenderProps) => {
    const { title } = element.props as { title?: string };
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-background rounded-lg shadow-lg max-w-lg w-full p-6">
          {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
          {children}
        </div>
      </div>
    );
  },

  Drawer: ({ element, children }: ComponentRenderProps) => {
    const { title, placement = 'right' } = element.props as { title?: string; placement?: string };
    return (
      <div className={cn(
        'fixed inset-y-0 z-50 w-80 bg-background shadow-lg p-6',
        placement === 'left' ? 'left-0' : 'right-0'
      )}>
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        {children}
      </div>
    );
  },

  Tooltip: ({ element, children }: ComponentRenderProps) => {
    const { content } = element.props as { content: string };
    return (
      <span className="relative group">
        {children}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {content}
        </span>
      </span>
    );
  },

  Popover: ({ children }: ComponentRenderProps) => (
    <div className="relative">{children}</div>
  ),

  Dropdown: ({ element, children }: ComponentRenderProps) => {
    const { trigger } = element.props as { trigger: string };
    return (
      <div className="relative group">
        <button className="px-3 py-2">{trigger}</button>
        <div className="absolute z-50 mt-1 bg-background border rounded-md shadow-lg hidden group-hover:block min-w-[160px]">
          {children}
        </div>
      </div>
    );
  },

  DropdownItem: ({ element }: ComponentRenderProps) => {
    const { label, icon, disabled, destructive } = element.props as {
      label: string;
      icon?: string;
      disabled?: boolean;
      destructive?: boolean;
    };
    return (
      <button
        disabled={disabled}
        className={cn(
          'w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted',
          destructive && 'text-red-600',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        {icon && <UI.Icon name={icon} size="sm" />}
        {label}
      </button>
    );
  },

  // ============================================================================
  // Collapse & Accordion
  // ============================================================================

  Accordion: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as { allowMultiple?: boolean; defaultExpanded?: string[] };
    return <UI.Accordion {...props}>{children}</UI.Accordion>;
  },

  AccordionItem: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as { value: string; title: string; icon?: string };
    return <UI.AccordionItem {...props}>{children}</UI.AccordionItem>;
  },

  Collapsible: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as { title: string; defaultOpen?: boolean };
    return <UI.Collapsible {...props}>{children}</UI.Collapsible>;
  },

  // ============================================================================
  // Specialized Components
  // ============================================================================

  Chart: ({ element }: ComponentRenderProps) => {
    const { type, height = 200 } = element.props as { type: string; height?: number };
    return (
      <div className="w-full bg-muted rounded-lg flex items-center justify-center" style={{ height }}>
        <span className="text-muted-foreground">Chart: {type}</span>
      </div>
    );
  },

  Calendar: () => (
    <div className="p-4 border rounded-lg bg-muted/50">Calendar Placeholder</div>
  ),

  DatePicker: ({ element }: ComponentRenderProps) => {
    const { label, placeholder } = element.props as { label?: string; placeholder?: string };
    return <UI.Input type="date" label={label} placeholder={placeholder} />;
  },

  FileUpload: ({ element }: ComponentRenderProps) => {
    const { label, accept } = element.props as { label?: string; accept?: string };
    return (
      <div className="space-y-1.5">
        {label && <label className="text-sm font-medium">{label}</label>}
        <input
          type="file"
          accept={accept}
          className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
      </div>
    );
  },

  Rating: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Rating {...(props as any)} />;
  },

  TagInput: ({ element }: ComponentRenderProps) => {
    const { label, placeholder } = element.props as { label?: string; placeholder?: string };
    return (
      <div className="space-y-1.5">
        {label && <label className="text-sm font-medium">{label}</label>}
        <div className="flex flex-wrap gap-1 p-2 border rounded-md min-h-[40px]">
          <input placeholder={placeholder} className="flex-1 min-w-[100px] outline-none bg-transparent" />
        </div>
      </div>
    );
  },

  ColorPicker: ({ element }: ComponentRenderProps) => {
    const { label } = element.props as { label?: string };
    return (
      <div className="space-y-1.5">
        {label && <label className="text-sm font-medium">{label}</label>}
        <input type="color" className="h-10 w-20 rounded cursor-pointer" />
      </div>
    );
  },

  Timeline: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Timeline {...(props as any)}>{children}</UI.Timeline>;
  },

  TimelineItem: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.TimelineItem {...(props as any)} />;
  },

  Stepper: ({ element, children }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Stepper {...(props as any)}>{children}</UI.Stepper>;
  },

  Step: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Step {...(props as any)} />;
  },

  Code: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Code {...(props as any)} />;
  },

  Kbd: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Kbd {...(props as any)} />;
  },

  Quote: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Quote {...(props as any)} />;
  },

  Stat: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Stat {...(props as any)} />;
  },

  Tag: ({ element }: ComponentRenderProps) => {
    const props = element.props as Record<string, unknown>;
    return <UI.Tag {...(props as any)} />;
  },

  // ============================================================================
  // Marketing & Landing Page Components
  // ============================================================================

  Hero: ({ element }: ComponentRenderProps) => {
    const {
      title,
      subtitle,
      description,
      primaryAction,
      secondaryAction,
      image,
      imageAlt,
      alignment = 'center',
      variant = 'simple',
      backgroundImage,
      overlay,
    } = element.props as unknown as HeroProps;

    const alignmentClasses = {
      left: 'text-left items-start',
      center: 'text-center items-center',
      right: 'text-right items-end',
    };

    if (variant === 'split') {
      return (
        <section className="relative py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={cn('flex flex-col gap-6', alignmentClasses[alignment])}>
                {subtitle && (
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">{subtitle}</span>
                )}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">{title}</h1>
                {description && (
                  <p className="text-lg text-muted-foreground max-w-xl">{description}</p>
                )}
                {(primaryAction || secondaryAction) && (
                  <div className="flex flex-wrap gap-4 mt-4">
                    {primaryAction && (
                      <a
                        href={primaryAction.href || '#'}
                        className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                      >
                        {primaryAction.label}
                      </a>
                    )}
                    {secondaryAction && (
                      <a
                        href={secondaryAction.href || '#'}
                        className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                      >
                        {secondaryAction.label}
                      </a>
                    )}
                  </div>
                )}
              </div>
              {image && (
                <div className="relative aspect-video lg:aspect-square rounded-xl overflow-hidden shadow-2xl">
                  <img src={image} alt={imageAlt || title} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </section>
      );
    }

    return (
      <section
        className={cn(
          'relative py-20 lg:py-32',
          backgroundImage && 'bg-cover bg-center bg-no-repeat'
        )}
        style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
      >
        {overlay && backgroundImage && (
          <div className="absolute inset-0 bg-background/80" />
        )}
        <div className={cn('container mx-auto px-4 relative z-10', alignmentClasses[alignment])}>
          <div className={cn('flex flex-col gap-6 max-w-4xl', alignment === 'center' && 'mx-auto')}>
            {subtitle && (
              <span className="text-sm font-medium text-primary uppercase tracking-wider">{subtitle}</span>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl">{description}</p>
            )}
            {(primaryAction || secondaryAction) && (
              <div className={cn('flex flex-wrap gap-4 mt-4', alignment === 'center' && 'justify-center')}>
                {primaryAction && (
                  <a
                    href={primaryAction.href || '#'}
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    {primaryAction.label}
                  </a>
                )}
                {secondaryAction && (
                  <a
                    href={secondaryAction.href || '#'}
                    className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                  >
                    {secondaryAction.label}
                  </a>
                )}
              </div>
            )}
          </div>
          {image && variant === 'with-image' && (
            <div className="mt-12 rounded-xl overflow-hidden shadow-2xl">
              <img src={image} alt={imageAlt || title} className="w-full" />
            </div>
          )}
        </div>
      </section>
    );
  },

  FeatureCard: ({ element }: ComponentRenderProps) => {
    const {
      icon,
      title,
      description,
      link,
      variant = 'simple',
    } = element.props as unknown as FeatureCardProps;

    const variantClasses = {
      simple: '',
      bordered: 'border rounded-lg p-6',
      filled: 'bg-muted rounded-lg p-6',
      'icon-top': 'text-center',
      'icon-left': 'flex gap-4',
    };

    return (
      <div className={cn('space-y-3', variantClasses[variant])}>
        {icon && (
          <div className={cn(
            'w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary',
            variant === 'icon-left' && 'flex-shrink-0'
          )}>
            <UI.Icon name={icon} size="lg" />
          </div>
        )}
        <div className={variant === 'icon-left' ? 'flex-1' : ''}>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-muted-foreground mt-1">{description}</p>
          {link && (
            <a
              href={link.href}
              className="inline-flex items-center gap-1 text-primary hover:underline mt-3 text-sm font-medium"
            >
              {link.label}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>
      </div>
    );
  },

  FeatureGrid: ({ element, children }: ComponentRenderProps) => {
    const { columns = 3, gap = 'lg', variant = 'simple' } = element.props as FeatureGridProps;
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className={cn('grid', gapClasses[gap as keyof typeof gapClasses] || 'gap-6')}
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {children}
          </div>
        </div>
      </section>
    );
  },

  PricingCard: ({ element }: ComponentRenderProps) => {
    const {
      name,
      description,
      price,
      period = '/month',
      features,
      highlighted = false,
      badge,
      ctaLabel = 'Get Started',
      ctaHref = '#',
      variant = 'simple',
    } = element.props as unknown as PricingCardProps;

    return (
      <div
        className={cn(
          'relative rounded-xl p-6 flex flex-col',
          highlighted ? 'bg-primary text-primary-foreground shadow-xl scale-105' : 'bg-card border',
          variant === 'bordered' && !highlighted && 'border-2'
        )}
      >
        {badge && (
          <span className={cn(
            'absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium rounded-full',
            highlighted ? 'bg-background text-foreground' : 'bg-primary text-primary-foreground'
          )}>
            {badge}
          </span>
        )}
        <div className="mb-6">
          <h3 className="text-xl font-semibold">{name}</h3>
          {description && (
            <p className={cn('text-sm mt-1', highlighted ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
              {description}
            </p>
          )}
        </div>
        <div className="mb-6">
          <span className="text-4xl font-bold">{price}</span>
          <span className={cn('text-sm', highlighted ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
            {period}
          </span>
        </div>
        <ul className="space-y-3 mb-6 flex-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <svg
                className={cn('w-5 h-5 flex-shrink-0 mt-0.5', highlighted ? 'text-primary-foreground' : 'text-primary')}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <a
          href={ctaHref}
          className={cn(
            'w-full py-3 rounded-lg font-medium text-center transition-colors',
            highlighted
              ? 'bg-background text-foreground hover:bg-background/90'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          )}
        >
          {ctaLabel}
        </a>
      </div>
    );
  },

  PricingTable: ({ element, children }: ComponentRenderProps) => {
    const { columns = 3, variant = 'simple' } = element.props as PricingTableProps;
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="grid gap-8 items-stretch"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {children}
          </div>
        </div>
      </section>
    );
  },

  TestimonialCard: ({ element }: ComponentRenderProps) => {
    const {
      quote,
      author,
      role,
      company,
      avatar,
      rating,
      variant = 'simple',
    } = element.props as unknown as TestimonialCardProps;

    return (
      <div
        className={cn(
          'p-6 rounded-xl',
          variant === 'bordered' && 'border',
          variant === 'filled' && 'bg-muted'
        )}
      >
        {rating && (
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={cn('w-5 h-5', i < rating ? 'text-yellow-400' : 'text-muted')}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        )}
        <blockquote className="text-lg italic mb-4">&ldquo;{quote}&rdquo;</blockquote>
        <div className="flex items-center gap-3">
          {avatar && (
            <img src={avatar} alt={author} className="w-12 h-12 rounded-full object-cover" />
          )}
          <div>
            <p className="font-semibold">{author}</p>
            {(role || company) && (
              <p className="text-sm text-muted-foreground">
                {role}{role && company && ' at '}{company}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  },

  TestimonialCarousel: ({ element, children }: ComponentRenderProps) => {
    const { showDots = true, showArrows = true } = element.props as TestimonialCarouselProps;
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex gap-6">
                {children}
              </div>
            </div>
            {showArrows && (
              <>
                <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-background border shadow-md flex items-center justify-center hover:bg-muted">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-background border shadow-md flex items-center justify-center hover:bg-muted">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
          {showDots && (
            <div className="flex justify-center gap-2 mt-6">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  className={cn(
                    'w-2 h-2 rounded-full transition-colors',
                    i === 0 ? 'bg-primary' : 'bg-muted-foreground/30'
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  },

  CTASection: ({ element }: ComponentRenderProps) => {
    const {
      title,
      description,
      primaryAction,
      secondaryAction,
      variant = 'centered',
      backgroundColor,
    } = element.props as unknown as CTASectionProps;

    return (
      <section
        className={cn(
          'py-16 lg:py-24',
          backgroundColor || 'bg-primary text-primary-foreground'
        )}
      >
        <div className="container mx-auto px-4">
          <div className={cn(
            'flex flex-col gap-6',
            variant === 'centered' && 'items-center text-center',
            variant === 'split' && 'lg:flex-row lg:items-center lg:justify-between'
          )}>
            <div className={variant === 'split' ? 'lg:max-w-xl' : 'max-w-2xl mx-auto'}>
              <h2 className="text-3xl lg:text-4xl font-bold">{title}</h2>
              {description && (
                <p className={cn('mt-4 text-lg', backgroundColor ? '' : 'text-primary-foreground/80')}>
                  {description}
                </p>
              )}
            </div>
            {(primaryAction || secondaryAction) && (
              <div className={cn('flex flex-wrap gap-4', variant === 'centered' && 'justify-center')}>
                {primaryAction && (
                  <a
                    href={primaryAction.href || '#'}
                    className="inline-flex items-center justify-center px-6 py-3 bg-background text-foreground rounded-lg font-medium hover:bg-background/90 transition-colors"
                  >
                    {primaryAction.label}
                  </a>
                )}
                {secondaryAction && (
                  <a
                    href={secondaryAction.href || '#'}
                    className={cn(
                      'inline-flex items-center justify-center px-6 py-3 border rounded-lg font-medium transition-colors',
                      backgroundColor ? 'border-current hover:bg-white/10' : 'border-primary-foreground/30 hover:bg-primary-foreground/10'
                    )}
                  >
                    {secondaryAction.label}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  },

  FAQ: ({ element, children }: ComponentRenderProps) => {
    const { items = [], variant = 'simple' } = element.props as FAQProps;
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className={cn(
            'space-y-4',
            variant === 'bordered' && 'divide-y',
            variant === 'separated' && 'space-y-6'
          )}>
            {items.length > 0 ? items.map((item, index) => (
              <details
                key={index}
                className={cn(
                  'group',
                  variant === 'bordered' && 'py-4',
                  variant === 'separated' && 'bg-muted rounded-lg p-4'
                )}
              >
                <summary className="flex justify-between items-center cursor-pointer list-none font-medium">
                  {item.question}
                  <svg
                    className="w-5 h-5 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-muted-foreground">{item.answer}</p>
              </details>
            )) : children}
          </div>
        </div>
      </section>
    );
  },

  Footer: ({ element }: ComponentRenderProps) => {
    const {
      logo,
      companyName,
      description,
      links = [],
      socialLinks = [],
      copyright,
      variant = 'multi-column',
    } = element.props as FooterProps;

    return (
      <footer className="bg-muted/50 border-t">
        <div className="container mx-auto px-4 py-12">
          {variant === 'multi-column' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2">
                {logo && <img src={logo} alt={companyName || 'Logo'} className="h-8 mb-4" />}
                {companyName && !logo && <h3 className="text-xl font-bold mb-4">{companyName}</h3>}
                {description && <p className="text-muted-foreground max-w-sm">{description}</p>}
                {socialLinks.length > 0 && (
                  <div className="flex gap-4 mt-6">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
                      >
                        <UI.Icon name={social.icon} size="sm" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
              {links.map((column, index) => (
                <div key={index}>
                  <h4 className="font-semibold mb-4">{column.title}</h4>
                  <ul className="space-y-2">
                    {column.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <a
                          href={item.href}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {copyright && (
            <div className={cn(
              'text-center text-sm text-muted-foreground',
              variant === 'multi-column' && 'mt-12 pt-8 border-t'
            )}>
              {copyright}
            </div>
          )}
        </div>
      </footer>
    );
  },

  Navbar: ({ element }: ComponentRenderProps) => {
    const {
      logo,
      brand,
      links = [],
      actions = [],
      sticky = true,
      transparent = false,
      variant = 'simple',
    } = element.props as NavbarProps;

    return (
      <header
        className={cn(
          'w-full z-50 border-b',
          sticky && 'sticky top-0',
          transparent ? 'bg-transparent' : 'bg-background'
        )}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              {logo && <img src={logo} alt={brand || 'Logo'} className="h-8" />}
              {brand && !logo && <span className="text-xl font-bold">{brand}</span>}
              {links.length > 0 && (
                <ul className="hidden md:flex items-center gap-6">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className={cn(
                          'text-sm font-medium transition-colors',
                          link.active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {actions.length > 0 && (
              <div className="flex items-center gap-3">
                {actions.map((action, index) => (
                  <a
                    key={index}
                    href={action.href || '#'}
                    className={cn(
                      'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                      action.variant === 'outline'
                        ? 'border hover:bg-muted'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    )}
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            )}
          </nav>
        </div>
      </header>
    );
  },

  SidebarNav: ({ element }: ComponentRenderProps) => {
    const {
      items = [],
      collapsed = false,
      variant = 'simple',
    } = element.props as SidebarNavProps;

    return (
      <aside
        className={cn(
          'h-full bg-muted/30 border-r',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        <nav className="p-4">
          <ul className="space-y-1">
            {items.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    item.active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  {item.icon && <UI.Icon name={item.icon} size="sm" />}
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    );
  },

  StatsGrid: ({ element, children }: ComponentRenderProps) => {
    const { columns = 4, variant = 'simple' } = element.props as StatsGridProps;
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div
            className={cn(
              'grid gap-6',
              variant === 'bordered' && 'divide-x'
            )}
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {children}
          </div>
        </div>
      </section>
    );
  },

  StatCard: ({ element }: ComponentRenderProps) => {
    const {
      label,
      value,
      change,
      changeType = 'neutral',
      icon,
      description,
      variant = 'simple',
    } = element.props as unknown as StatCardProps;

    return (
      <div
        className={cn(
          'p-6',
          variant === 'bordered' && 'border rounded-lg',
          variant === 'filled' && 'bg-muted rounded-lg'
        )}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          {icon && <UI.Icon name={icon} className="text-muted-foreground" />}
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-bold">{value}</span>
          {change && (
            <span
              className={cn(
                'flex items-center text-sm font-medium',
                changeType === 'positive' && 'text-green-600',
                changeType === 'negative' && 'text-red-600',
                changeType === 'neutral' && 'text-muted-foreground'
              )}
            >
              {changeType === 'positive' && (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              )}
              {changeType === 'negative' && (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              {change}
            </span>
          )}
        </div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    );
  },

  LogoCloud: ({ element, children }: ComponentRenderProps) => {
    const { title, variant = 'simple' } = element.props as LogoCloudProps;
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          {title && (
            <p className="text-center text-sm text-muted-foreground mb-8">{title}</p>
          )}
          <div
            className={cn(
              'flex flex-wrap items-center justify-center gap-8 lg:gap-12',
              variant === 'grid' && 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6'
            )}
          >
            {children}
          </div>
        </div>
      </section>
    );
  },

  Newsletter: ({ element }: ComponentRenderProps) => {
    const {
      title = 'Subscribe to our newsletter',
      description,
      placeholder = 'Enter your email',
      buttonLabel = 'Subscribe',
      variant = 'inline',
    } = element.props as NewsletterProps;

    return (
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h3 className="text-2xl font-bold">{title}</h3>
          {description && (
            <p className="mt-2 text-muted-foreground">{description}</p>
          )}
          <form
            className={cn(
              'mt-6',
              variant === 'inline' && 'flex gap-3 max-w-md mx-auto',
              variant === 'stacked' && 'space-y-3 max-w-md mx-auto'
            )}
          >
            <input
              type="email"
              placeholder={placeholder}
              className="flex-1 h-11 px-4 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="h-11 px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              {buttonLabel}
            </button>
          </form>
        </div>
      </section>
    );
  },

  TeamGrid: ({ element, children }: ComponentRenderProps) => {
    const { columns = 3, variant = 'simple' } = element.props as TeamGridProps;
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="grid gap-8"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {children}
          </div>
        </div>
      </section>
    );
  },

  TeamMemberCard: ({ element }: ComponentRenderProps) => {
    const {
      name,
      role,
      bio,
      avatar,
      socialLinks = [],
      variant = 'simple',
    } = element.props as unknown as TeamMemberCardProps;

    return (
      <div
        className={cn(
          'text-center',
          variant === 'bordered' && 'border rounded-xl p-6',
          variant === 'filled' && 'bg-muted rounded-xl p-6'
        )}
      >
        {avatar && (
          <img
            src={avatar}
            alt={name}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />
        )}
        <h3 className="text-lg font-semibold">{name}</h3>
        {role && <p className="text-sm text-muted-foreground">{role}</p>}
        {bio && <p className="mt-3 text-sm text-muted-foreground">{bio}</p>}
        {socialLinks.length > 0 && (
          <div className="flex justify-center gap-3 mt-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
              >
                <UI.Icon name={social.icon} size="sm" />
              </a>
            ))}
          </div>
        )}
      </div>
    );
  },

  Banner: ({ element }: ComponentRenderProps) => {
    const {
      message,
      action,
      dismissible = true,
      variant = 'info',
      position = 'top',
    } = element.props as unknown as BannerProps;

    const variantClasses = {
      info: 'bg-blue-600 text-white',
      warning: 'bg-yellow-500 text-black',
      success: 'bg-green-600 text-white',
      error: 'bg-red-600 text-white',
    };

    return (
      <div
        className={cn(
          'w-full py-3 px-4',
          variantClasses[variant],
          position === 'top' && 'fixed top-0 left-0 right-0 z-50'
        )}
      >
        <div className="container mx-auto flex items-center justify-center gap-4">
          <p className="text-sm font-medium">{message}</p>
          {action && (
            <a
              href={action.href || '#'}
              className="text-sm font-semibold underline underline-offset-4 hover:no-underline"
            >
              {action.label}
            </a>
          )}
          {dismissible && (
            <button className="absolute right-4 hover:opacity-70">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  },

  AnnouncementBar: ({ element }: ComponentRenderProps) => {
    const {
      message,
      link,
      dismissible = false,
      backgroundColor = 'bg-primary',
    } = element.props as unknown as AnnouncementBarProps;

    return (
      <div className={cn('w-full py-2 px-4 text-center', backgroundColor, 'text-primary-foreground')}>
        <p className="text-sm">
          {message}
          {link && (
            <a
              href={link.href}
              className="ml-2 font-semibold underline underline-offset-4 hover:no-underline"
            >
              {link.label}
            </a>
          )}
        </p>
        {dismissible && (
          <button className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  },

  // ============================================================================
  // Dashboard Components
  // ============================================================================

  DashboardStats: ({ element, children }: ComponentRenderProps) => {
    const { columns = 4 } = element.props as { columns?: number };
    return (
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {children}
      </div>
    );
  },

  MetricCard: ({ element }: ComponentRenderProps) => {
    const {
      label,
      value,
      change,
      changeType = 'neutral',
      icon,
      description,
      sparkline,
    } = element.props as unknown as StatCardProps & { sparkline?: boolean };

    return (
      <div className="bg-card border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          {icon && (
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <UI.Icon name={icon} className="text-primary" />
            </div>
          )}
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-3xl font-bold">{value}</span>
          {change && (
            <span
              className={cn(
                'flex items-center text-sm font-medium',
                changeType === 'positive' && 'text-green-600',
                changeType === 'negative' && 'text-red-600',
                changeType === 'neutral' && 'text-muted-foreground'
              )}
            >
              {changeType !== 'neutral' && (
                <svg
                  className={cn('w-4 h-4 mr-1', changeType === 'negative' && 'rotate-180')}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              )}
              {change}
            </span>
          )}
        </div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
        {sparkline && (
          <div className="mt-4 h-12 bg-muted/50 rounded flex items-center justify-center">
            <span className="text-xs text-muted-foreground">Sparkline</span>
          </div>
        )}
      </div>
    );
  },

  DataTable: ({ element, children }: ComponentRenderProps) => {
    const {
      searchable = true,
      filterable = true,
      sortable = true,
      paginated = true,
    } = element.props as {
      searchable?: boolean;
      filterable?: boolean;
      sortable?: boolean;
      paginated?: boolean;
    };

    return (
      <div className="bg-card border rounded-xl">
        {(searchable || filterable) && (
          <div className="p-4 border-b flex items-center justify-between gap-4">
            {searchable && (
              <div className="relative flex-1 max-w-sm">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full h-9 pl-9 pr-4 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            )}
            {filterable && (
              <button className="h-9 px-4 border rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                Filter
              </button>
            )}
          </div>
        )}
        <div className="overflow-x-auto">
          {children}
        </div>
        {paginated && (
          <div className="p-4 border-t flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Showing 1-10 of 100</span>
            <div className="flex gap-1">
              <button className="h-8 w-8 flex items-center justify-center rounded border hover:bg-muted">{'<'}</button>
              <button className="h-8 w-8 flex items-center justify-center rounded border bg-primary text-primary-foreground">1</button>
              <button className="h-8 w-8 flex items-center justify-center rounded border hover:bg-muted">2</button>
              <button className="h-8 w-8 flex items-center justify-center rounded border hover:bg-muted">3</button>
              <button className="h-8 w-8 flex items-center justify-center rounded border hover:bg-muted">{'>'}</button>
            </div>
          </div>
        )}
      </div>
    );
  },

  // ============================================================================
  // E-commerce Components
  // ============================================================================

  ProductCard: ({ element }: ComponentRenderProps) => {
    const {
      image,
      title,
      price,
      originalPrice,
      rating,
      badge,
      inStock = true,
    } = element.props as {
      image: string;
      title: string;
      price: string;
      originalPrice?: string;
      rating?: number;
      badge?: string;
      inStock?: boolean;
    };

    return (
      <div className="group bg-card border rounded-xl overflow-hidden">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {badge && (
            <span className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
              {badge}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium truncate">{title}</h3>
          {rating && (
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={cn('w-4 h-4', i < rating ? 'text-yellow-400' : 'text-muted')}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          )}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-bold">{price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>
            )}
          </div>
          {!inStock && (
            <p className="mt-2 text-sm text-red-600">Out of stock</p>
          )}
        </div>
      </div>
    );
  },

  CartItem: ({ element }: ComponentRenderProps) => {
    const {
      image,
      title,
      price,
      quantity = 1,
      variant,
    } = element.props as {
      image: string;
      title: string;
      price: string;
      quantity?: number;
      variant?: string;
    };

    return (
      <div className="flex gap-4 py-4 border-b">
        <img src={image} alt={title} className="w-20 h-20 rounded-lg object-cover" />
        <div className="flex-1">
          <h4 className="font-medium">{title}</h4>
          {variant && <p className="text-sm text-muted-foreground">{variant}</p>}
          <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center border rounded">
              <button className="w-8 h-8 flex items-center justify-center hover:bg-muted">-</button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button className="w-8 h-8 flex items-center justify-center hover:bg-muted">+</button>
            </div>
            <span className="font-medium">{price}</span>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-foreground">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  },

  CartSummary: ({ element }: ComponentRenderProps) => {
    const {
      subtotal,
      shipping,
      tax,
      total,
      ctaLabel = 'Checkout',
    } = element.props as {
      subtotal: string;
      shipping?: string;
      tax?: string;
      total: string;
      ctaLabel?: string;
    };

    return (
      <div className="bg-muted/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{subtotal}</span>
          </div>
          {shipping && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping}</span>
            </div>
          )}
          {tax && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>{tax}</span>
            </div>
          )}
          <div className="pt-3 border-t flex justify-between font-semibold">
            <span>Total</span>
            <span>{total}</span>
          </div>
        </div>
        <button className="w-full mt-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
          {ctaLabel}
        </button>
      </div>
    );
  },

  // ============================================================================
  // Authentication Components
  // ============================================================================

  AuthForm: ({ element, children }: ComponentRenderProps) => {
    const {
      title,
      description,
      submitLabel = 'Submit',
      footerText,
      footerLink,
      socialProviders = [],
    } = element.props as {
      title?: string;
      description?: string;
      submitLabel?: string;
      footerText?: string;
      footerLink?: { label: string; href: string };
      socialProviders?: Array<{ name: string; icon: string }>;
    };

    return (
      <div className="w-full max-w-md mx-auto p-8 bg-card border rounded-xl">
        {title && <h2 className="text-2xl font-bold text-center">{title}</h2>}
        {description && (
          <p className="mt-2 text-center text-muted-foreground">{description}</p>
        )}
        {socialProviders.length > 0 && (
          <div className="mt-6 space-y-3">
            {socialProviders.map((provider, index) => (
              <button
                key={index}
                className="w-full flex items-center justify-center gap-3 py-2.5 border rounded-lg font-medium hover:bg-muted transition-colors"
              >
                <UI.Icon name={provider.icon} />
                Continue with {provider.name}
              </button>
            ))}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
              </div>
            </div>
          </div>
        )}
        <form className="mt-6 space-y-4">
          {children}
          <button
            type="submit"
            className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            {submitLabel}
          </button>
        </form>
        {(footerText || footerLink) && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {footerText}{' '}
            {footerLink && (
              <a href={footerLink.href} className="text-primary hover:underline">
                {footerLink.label}
              </a>
            )}
          </p>
        )}
      </div>
    );
  },

  // ============================================================================
  // Additional Layout Components
  // ============================================================================

  Section: ({ element, children }: ComponentRenderProps) => {
    const {
      padding = 'lg',
      background,
      className,
    } = element.props as {
      padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
      background?: string;
      className?: string;
    };

    const paddingClasses = {
      none: '',
      sm: 'py-8',
      md: 'py-12',
      lg: 'py-16',
      xl: 'py-24',
    };

    return (
      <section className={cn(paddingClasses[padding], background, className)}>
        {children}
      </section>
    );
  },

  Box: ({ element, children }: ComponentRenderProps) => {
    const { className, ...rest } = element.props as { className?: string } & Record<string, unknown>;
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  },

  Center: ({ element, children }: ComponentRenderProps) => {
    const { className } = element.props as { className?: string };
    return (
      <div className={cn('flex items-center justify-center', className)}>
        {children}
      </div>
    );
  },

  Flex: ({ element, children }: ComponentRenderProps) => {
    const {
      direction = 'row',
      align = 'stretch',
      justify = 'start',
      wrap = false,
      gap = 'md',
      className,
    } = element.props as {
      direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
      align?: string;
      justify?: string;
      wrap?: boolean;
      gap?: string;
      className?: string;
    };

    return (
      <div
        className={cn(
          'flex',
          direction === 'column' && 'flex-col',
          direction === 'row-reverse' && 'flex-row-reverse',
          direction === 'column-reverse' && 'flex-col-reverse',
          wrap && 'flex-wrap',
          gapClasses[gap as keyof typeof gapClasses] || 'gap-4',
          className
        )}
      >
        {children}
      </div>
    );
  },

  AspectRatio: ({ element, children }: ComponentRenderProps) => {
    const { ratio = 16 / 9, className } = element.props as { ratio?: number; className?: string };
    return (
      <div className={cn('relative', className)} style={{ paddingBottom: `${(1 / ratio) * 100}%` }}>
        <div className="absolute inset-0">{children}</div>
      </div>
    );
  },

  VisuallyHidden: ({ children }: ComponentRenderProps) => (
    <span className="sr-only">{children}</span>
  ),
};

// Export the mapper and theme
export default shadcnMapper;
