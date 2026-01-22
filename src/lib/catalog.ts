import { z } from 'zod';

const stylesSchema = z.record(z.string(), z.any()).optional();

export const components = {
  // Atoms
  Button: z.object({
    variant: z.enum(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']).optional(),
    size: z.enum(['default', 'sm', 'lg', 'icon']).optional(),
    children: z.string().optional(),
    onClick: z.string().optional(), // Action identifier
    style: stylesSchema,
  }),
  Text: z.object({
    variant: z.enum(['h1', 'h2', 'h3', 'h4', 'p', 'blockquote', 'code']).optional(),
    children: z.string(),
    style: stylesSchema,
  }),
  Badge: z.object({
    variant: z.enum(['default', 'secondary', 'destructive', 'outline']).optional(),
    children: z.string(),
    style: stylesSchema,
  }),
  Avatar: z.object({
    src: z.string().optional(),
    fallback: z.string().optional(),
    alt: z.string().optional(),
    style: stylesSchema,
  }),
  Icon: z.object({
    name: z.string(), // Name of the icon (e.g., from Lucide)
    size: z.number().optional(),
    color: z.string().optional(),
    style: stylesSchema,
  }),

  // Molecules
  Card: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    content: z.any().optional(), // Should be a component or list of components (recursive)
    footer: z.any().optional(),
    style: stylesSchema,
  }),
  Alert: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    variant: z.enum(['default', 'destructive']).optional(),
    icon: z.string().optional(),
    style: stylesSchema,
  }),
  Metric: z.object({
    label: z.string(),
    value: z.string().or(z.number()),
    trend: z.number().optional(), // percentage change
    trendDirection: z.enum(['up', 'down', 'neutral']).optional(),
    style: stylesSchema,
  }),

  // Forms
  Input: z.object({
    label: z.string().optional(),
    placeholder: z.string().optional(),
    type: z.string().optional(),
    name: z.string(),
    required: z.boolean().optional(),
    style: stylesSchema,
  }),
  Select: z.object({
    label: z.string().optional(),
    options: z.array(z.object({ label: z.string(), value: z.string() })),
    name: z.string(),
    placeholder: z.string().optional(),
    style: stylesSchema,
  }),
  Checkbox: z.object({
    label: z.string().optional(),
    name: z.string(),
    checked: z.boolean().optional(),
    style: stylesSchema,
  }),
  Switch: z.object({
    label: z.string().optional(),
    name: z.string(),
    checked: z.boolean().optional(),
    style: stylesSchema,
  }),

  // Layouts
  Stack: z.object({
    direction: z.enum(['row', 'column']).optional(),
    gap: z.number().optional(),
    children: z.array(z.any()), // Recursive definition needed properly
    style: stylesSchema,
  }),
  Grid: z.object({
    columns: z.number().optional(),
    gap: z.number().optional(),
    children: z.array(z.any()),
    style: stylesSchema,
  }),
  Container: z.object({
    children: z.any(),
    maxWidth: z.string().optional(),
    style: stylesSchema,
  }),

  // Complex
  Table: z.object({
    columns: z.array(z.object({
      header: z.string(),
      accessorKey: z.string(),
    })),
    data: z.array(z.record(z.string(), z.any())),
    caption: z.string().optional(),
    style: stylesSchema,
  }),
  Chart: z.object({
    type: z.enum(['bar', 'line', 'pie', 'area']),
    data: z.array(z.record(z.string(), z.any())),
    categories: z.array(z.string()),
    index: z.string(),
    colors: z.array(z.string()).optional(),
    style: stylesSchema,
  }),
  Tabs: z.object({
    items: z.array(z.object({
      label: z.string(),
      value: z.string(),
      content: z.any(),
    })),
    defaultValue: z.string().optional(),
    style: stylesSchema,
  }),
};

export const catalog = {
  getSchema: () => components,
};
