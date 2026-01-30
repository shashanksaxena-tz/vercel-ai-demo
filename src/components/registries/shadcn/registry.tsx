'use client';

/**
 * Shadcn/UI Registry
 * Maps json-render catalog components to Shadcn implementations
 */

import * as React from 'react';
import type { ComponentRegistry, ComponentRenderProps } from '@json-render/react';
import type { RegistryDefinition, RegistryTheme } from '@/lib/registry';
import * as UI from '@/components/ui';

// Helper type to extract props from ComponentRenderProps
type ExtractProps<T extends ComponentRenderProps> = T['element']['props'];

// Helper to wrap components and extract props from element
function createComponent<P extends Record<string, unknown>>(
  Component: React.ComponentType<P & { children?: React.ReactNode }>
): React.ComponentType<ComponentRenderProps<P>> {
  return function WrappedComponent({ element, children }: ComponentRenderProps<P>) {
    const props = element.props as P;
    return <Component {...props}>{children}</Component>;
  };
}

// Shadcn Theme
const shadcnTheme: RegistryTheme = {
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

// Component Registry - Maps catalog component names to React components
// Each component receives ComponentRenderProps with { element, children }
// Props are accessed via element.props
const shadcnComponents: ComponentRegistry = {
  // Layout Components
  Container: ({ element, children }) => <UI.Container {...element.props}>{children}</UI.Container>,
  Row: ({ element, children }) => <UI.Row {...element.props}>{children}</UI.Row>,
  Column: ({ element, children }) => <UI.Column {...element.props}>{children}</UI.Column>,
  Grid: ({ element, children }) => <UI.Grid {...element.props}>{children}</UI.Grid>,
  Stack: ({ element, children }) => <UI.Stack {...element.props}>{children}</UI.Stack>,
  Spacer: ({ element }) => <UI.Spacer {...element.props} />,
  Divider: ({ element }) => <UI.Divider {...element.props} />,

  // Card Components
  Card: ({ element, children }) => <UI.Card {...element.props}>{children}</UI.Card>,
  CardHeader: ({ element }) => <UI.CardHeader {...element.props} />,
  CardBody: ({ element, children }) => <UI.CardBody {...element.props}>{children}</UI.CardBody>,
  CardFooter: ({ element, children }) => <UI.CardFooter {...element.props}>{children}</UI.CardFooter>,

  // Typography Components
  Heading: ({ element }) => <UI.Heading {...element.props} />,
  Text: ({ element }) => <UI.Text {...element.props} />,
  Link: ({ element }) => <UI.Link {...element.props} />,

  // Button Components
  Button: ({ element }) => <UI.Button {...element.props} />,
  IconButton: ({ element }) => {
    const { icon, label, ...rest } = element.props as { icon: string; label: string };
    return (
      <UI.Button {...rest} aria-label={label}>
        <UI.Icon name={icon} />
      </UI.Button>
    );
  },
  ButtonGroup: ({ children }) => (
    <div className="inline-flex -space-x-px">{children}</div>
  ),

  // Form Components
  Input: ({ element }) => <UI.Input {...element.props} />,
  TextArea: ({ element }) => <UI.TextArea {...element.props} />,
  Select: ({ element }) => {
    const { options, label, placeholder, ...rest } = element.props as { options?: { value: string; label: string }[]; label?: string; placeholder?: string };
    return (
      <div className="space-y-1.5">
        {label && <label className="text-sm font-medium">{label}</label>}
        <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          {placeholder && <option value="">{placeholder}</option>}
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    );
  },
  Checkbox: ({ element }) => {
    const { label, ...rest } = element.props as { label?: string };
    return (
      <label className="flex items-center gap-2">
        <input type="checkbox" className="h-4 w-4 rounded border-input" {...rest} />
        <span className="text-sm">{label}</span>
      </label>
    );
  },
  Radio: ({ element }) => {
    const { label, value, ...rest } = element.props as { label?: string; value?: string };
    return (
      <label className="flex items-center gap-2">
        <input type="radio" value={value} className="h-4 w-4" {...rest} />
        <span className="text-sm">{label}</span>
      </label>
    );
  },
  RadioGroup: ({ element, children }) => {
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
  Switch: ({ element }) => {
    const { label, ...rest } = element.props as { label?: string };
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
  Slider: ({ element }) => {
    const { label, min = 0, max = 100, ...rest } = element.props as { label?: string; min?: number; max?: number };
    return (
      <div className="space-y-1.5">
        {label && <label className="text-sm font-medium">{label}</label>}
        <input type="range" min={min} max={max} className="w-full accent-primary" {...rest} />
      </div>
    );
  },

  // Data Display
  Badge: ({ element }) => <UI.Badge {...element.props} />,
  Avatar: ({ element }) => <UI.Avatar {...element.props} />,
  AvatarGroup: ({ element, children }) => <UI.AvatarGroup {...element.props}>{children}</UI.AvatarGroup>,
  Icon: ({ element }) => <UI.Icon {...element.props} />,
  Image: ({ element }) => <UI.Image {...element.props} />,
  List: ({ element, children }) => <UI.List {...element.props}>{children}</UI.List>,
  ListItem: ({ element, children }) => <UI.ListItem {...element.props}>{children}</UI.ListItem>,
  Table: ({ element, children }) => <UI.Table {...element.props}>{children}</UI.Table>,
  TableHeader: ({ children }) => <UI.TableHeader>{children}</UI.TableHeader>,
  TableBody: ({ children }) => <UI.TableBody>{children}</UI.TableBody>,
  TableRow: ({ element, children }) => <UI.TableRow {...element.props}>{children}</UI.TableRow>,
  TableCell: ({ element, children }) => <UI.TableCell {...element.props}>{children}</UI.TableCell>,
  Metric: ({ element }) => <UI.Metric {...element.props} />,
  Progress: ({ element }) => <UI.Progress {...element.props} />,

  // Feedback
  Alert: ({ element }) => <UI.Alert {...element.props} />,
  Toast: ({ element }) => {
    const { title, description, status } = element.props as { title: string; description?: string; status?: string };
    return (
      <div className={`rounded-lg border p-4 ${status === 'success' ? 'bg-green-50 border-green-200' : status === 'error' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
        <p className="font-medium">{title}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    );
  },
  Skeleton: ({ element }) => <UI.Skeleton {...element.props} />,
  Spinner: ({ element }) => <UI.Spinner {...element.props} />,
  EmptyState: ({ element }) => <UI.EmptyState {...element.props} />,

  // Navigation
  Tabs: ({ element, children }) => <UI.Tabs {...element.props}>{children}</UI.Tabs>,
  TabList: ({ children }) => <UI.TabsList>{children}</UI.TabsList>,
  Tab: ({ element }) => {
    const { value, label, ...rest } = element.props as { value: string; label: string };
    return <UI.TabsTrigger value={value} {...rest}>{label}</UI.TabsTrigger>;
  },
  TabPanel: ({ element, children }) => {
    const { value } = element.props as { value: string };
    return <UI.TabsContent value={value}>{children}</UI.TabsContent>;
  },
  Breadcrumb: ({ element, children }) => <UI.Breadcrumb {...element.props}>{children}</UI.Breadcrumb>,
  BreadcrumbItem: ({ element }) => <UI.BreadcrumbItem {...element.props} />,
  Pagination: ({ element }) => <UI.Pagination {...element.props} />,
  NavMenu: ({ element, children }) => <UI.NavMenu {...element.props}>{children}</UI.NavMenu>,
  NavItem: ({ element }) => <UI.NavItem {...element.props} />,

  // Overlay Components (simplified)
  Modal: ({ element, children }) => {
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
  Drawer: ({ element, children }) => {
    const { title, placement = 'right' } = element.props as { title?: string; placement?: string };
    return (
      <div className={`fixed inset-y-0 ${placement === 'left' ? 'left-0' : 'right-0'} z-50 w-80 bg-background shadow-lg p-6`}>
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        {children}
      </div>
    );
  },
  Tooltip: ({ element, children }) => {
    const { content } = element.props as { content: string };
    return (
      <span className="relative group">
        {children}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
          {content}
        </span>
      </span>
    );
  },
  Popover: ({ children }) => <div className="relative">{children}</div>,
  Dropdown: ({ element, children }) => {
    const { trigger } = element.props as { trigger: string };
    return (
      <div className="relative group">
        <button className="px-3 py-2">{trigger}</button>
        <div className="absolute z-50 mt-1 bg-background border rounded-md shadow-lg hidden group-hover:block">
          {children}
        </div>
      </div>
    );
  },
  DropdownItem: ({ element }) => {
    const { label, icon, disabled, destructive } = element.props as { label: string; icon?: string; disabled?: boolean; destructive?: boolean };
    return (
      <button
        disabled={disabled}
        className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted ${destructive ? 'text-red-600' : ''} ${disabled ? 'opacity-50' : ''}`}
      >
        {icon && <UI.Icon name={icon} size="sm" />}
        {label}
      </button>
    );
  },

  // Collapse & Accordion
  Accordion: ({ element, children }) => <UI.Accordion {...element.props}>{children}</UI.Accordion>,
  AccordionItem: ({ element, children }) => <UI.AccordionItem {...element.props}>{children}</UI.AccordionItem>,
  Collapsible: ({ element, children }) => <UI.Collapsible {...element.props}>{children}</UI.Collapsible>,

  // Specialized Components
  Chart: ({ element }) => {
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
  DatePicker: ({ element }) => {
    const { label, placeholder } = element.props as { label?: string; placeholder?: string };
    return <UI.Input type="date" label={label} placeholder={placeholder} />;
  },
  FileUpload: ({ element }) => {
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
  Rating: ({ element }) => <UI.Rating {...element.props} />,
  TagInput: ({ element }) => {
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
  ColorPicker: ({ element }) => {
    const { label } = element.props as { label?: string };
    return (
      <div className="space-y-1.5">
        {label && <label className="text-sm font-medium">{label}</label>}
        <input type="color" className="h-10 w-20 rounded cursor-pointer" />
      </div>
    );
  },
  Timeline: ({ element, children }) => <UI.Timeline {...element.props}>{children}</UI.Timeline>,
  TimelineItem: ({ element }) => <UI.TimelineItem {...element.props} />,
  Stepper: ({ element, children }) => <UI.Stepper {...element.props}>{children}</UI.Stepper>,
  Step: ({ element }) => <UI.Step {...element.props} />,
  Code: ({ element }) => <UI.Code {...element.props} />,
  Kbd: ({ element }) => <UI.Kbd {...element.props} />,
  Quote: ({ element }) => <UI.Quote {...element.props} />,
  Stat: ({ element }) => <UI.Stat {...element.props} />,
  Tag: ({ element }) => <UI.Tag {...element.props} />,
};

// Registry Definition
export const shadcnRegistry: RegistryDefinition = {
  name: 'shadcn',
  displayName: 'Shadcn/UI',
  description: 'Beautiful and accessible components built with Radix UI and Tailwind CSS',
  framework: 'shadcn',
  components: shadcnComponents,
  theme: shadcnTheme,
};

export { shadcnComponents, shadcnTheme };
