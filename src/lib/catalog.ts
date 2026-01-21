import { z } from 'zod';

// --- Atoms ---

export const ButtonSchema = z.object({
  label: z.string(),
  variant: z.enum(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']).optional(),
  size: z.enum(['default', 'sm', 'lg', 'icon']).optional(),
  onClick: z.string().optional(), // Action ID
  disabled: z.boolean().optional(),
});

export const TextSchema = z.object({
  content: z.string(),
  variant: z.enum(['h1', 'h2', 'h3', 'h4', 'p', 'blockquote', 'lead', 'large', 'small', 'muted']).optional(),
  align: z.enum(['left', 'center', 'right', 'justify']).optional(),
});

export const BadgeSchema = z.object({
  label: z.string(),
  variant: z.enum(['default', 'secondary', 'destructive', 'outline']).optional(),
});

export const AvatarSchema = z.object({
  src: z.string().optional(),
  alt: z.string().optional(),
  fallback: z.string(),
});

export const IconSchema = z.object({
  name: z.string(), // Lucide icon name
  size: z.number().optional(),
  className: z.string().optional(),
});

// --- Molecules ---

export const CardSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  content: z.any(), // Child elements
  footer: z.any().optional(),
});

export const AlertSchema = z.object({
  title: z.string().optional(),
  description: z.string(),
  variant: z.enum(['default', 'destructive']).optional(),
  icon: z.string().optional(),
});

export const MetricSchema = z.object({
  label: z.string(),
  value: z.union([z.string(), z.number()]),
  trend: z.object({
    value: z.number(),
    direction: z.enum(['up', 'down', 'neutral']),
  }).optional(),
  description: z.string().optional(),
});

// --- Forms ---

export const InputSchema = z.object({
  label: z.string().optional(),
  placeholder: z.string().optional(),
  type: z.enum(['text', 'email', 'password', 'number']).optional(),
  name: z.string(),
  defaultValue: z.string().optional(),
});

export const SelectSchema = z.object({
  label: z.string().optional(),
  placeholder: z.string().optional(),
  name: z.string(),
  options: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })),
  defaultValue: z.string().optional(),
});

export const CheckboxSchema = z.object({
  label: z.string(),
  name: z.string(),
  checked: z.boolean().optional(),
  onCheckedChange: z.string().optional(),
});

export const SwitchSchema = z.object({
  label: z.string(),
  name: z.string(),
  checked: z.boolean().optional(),
  onCheckedChange: z.string().optional(),
});

export const TextareaSchema = z.object({
  label: z.string().optional(),
  placeholder: z.string().optional(),
  name: z.string(),
  defaultValue: z.string().optional(),
});

// --- Layouts ---

export const StackSchema = z.object({
  direction: z.enum(['row', 'column']).optional(),
  gap: z.number().optional(),
  align: z.enum(['start', 'center', 'end', 'stretch', 'baseline']).optional(),
  justify: z.enum(['start', 'center', 'end', 'between', 'around', 'evenly']).optional(),
  children: z.array(z.any()),
});

export const GridSchema = z.object({
  columns: z.number().optional(), // Number of columns
  gap: z.number().optional(),
  children: z.array(z.any()),
});

export const ContainerSchema = z.object({
  maxWidth: z.enum(['sm', 'md', 'lg', 'xl', '2xl', 'full']).optional(),
  centered: z.boolean().optional(),
  padding: z.number().optional(),
  children: z.array(z.any()),
});

// --- Complex ---

export const TableSchema = z.object({
  columns: z.array(z.object({
    header: z.string(),
    accessorKey: z.string(),
  })),
  data: z.array(z.record(z.any())),
  caption: z.string().optional(),
});

export const ChartSchema = z.object({
  type: z.enum(['bar', 'line', 'pie', 'area']),
  data: z.array(z.record(z.any())),
  index: z.string(), // Key for X-axis
  categories: z.array(z.string()), // Keys for Y-axis series
  colors: z.array(z.string()).optional(),
  title: z.string().optional(),
});

export const TabsSchema = z.object({
  defaultValue: z.string(),
  items: z.array(z.object({
    value: z.string(),
    label: z.string(),
    content: z.any(),
  })),
});

export const ImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
  className: z.string().optional(),
});


// --- Catalog Definition ---

import { createCatalog } from '@json-render/core';

export const catalog = createCatalog({
  components: {
    // Atoms
    Button: ButtonSchema,
    Text: TextSchema,
    Badge: BadgeSchema,
    Avatar: AvatarSchema,
    Icon: IconSchema,

    // Molecules
    Card: CardSchema,
    Alert: AlertSchema,
    Metric: MetricSchema,

    // Forms
    Input: InputSchema,
    Select: SelectSchema,
    Checkbox: CheckboxSchema,
    Switch: SwitchSchema,
    Textarea: TextareaSchema,

    // Layouts
    Stack: StackSchema,
    Grid: GridSchema,
    Container: ContainerSchema,

    // Complex
    Table: TableSchema,
    Chart: ChartSchema,
    Tabs: TabsSchema,
    Image: ImageSchema,
  },
});
