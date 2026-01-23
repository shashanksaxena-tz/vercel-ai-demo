import { z } from 'zod';

export const catalog = {
  // Atoms
  Button: {
    props: z.object({
      children: z.string(),
      variant: z.enum(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']).optional(),
      size: z.enum(['default', 'sm', 'lg', 'icon']).optional(),
      onClick: z.string().optional(), // Action ID
    }),
  },
  Text: {
    props: z.object({
      children: z.string(),
      variant: z.enum(['h1', 'h2', 'h3', 'h4', 'p', 'blockquote', 'lead', 'large', 'small', 'muted']).optional(),
      align: z.enum(['left', 'center', 'right', 'justify']).optional(),
    }),
  },
  Badge: {
    props: z.object({
      children: z.string(),
      variant: z.enum(['default', 'secondary', 'destructive', 'outline']).optional(),
    }),
  },
  Avatar: {
    props: z.object({
      src: z.string().optional(),
      alt: z.string().optional(),
      fallback: z.string(),
    }),
  },
  Icon: {
    props: z.object({
      name: z.string(),
      size: z.union([z.string(), z.number()]).optional(),
      className: z.string().optional(),
    }),
  },

  // Molecules
  Card: {
    props: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      content: z.any().optional(),
      footer: z.any().optional(),
    }),
  },
  Alert: {
    props: z.object({
      title: z.string(),
      description: z.string(),
      variant: z.enum(['default', 'destructive']).optional(),
    }),
  },
  Metric: {
    props: z.object({
      label: z.string(),
      value: z.string(),
      trend: z.number().optional(),
      trendLabel: z.string().optional(),
    }),
  },

  // Forms
  Input: {
    props: z.object({
      label: z.string().optional(),
      placeholder: z.string().optional(),
      type: z.string().optional(),
      name: z.string(),
    }),
  },
  Select: {
    props: z.object({
      label: z.string().optional(),
      placeholder: z.string().optional(),
      options: z.array(z.object({ label: z.string(), value: z.string() })),
      name: z.string(),
    }),
  },
  Checkbox: {
    props: z.object({
      label: z.string(),
      name: z.string(),
      checked: z.boolean().optional(),
    }),
  },
  Switch: {
    props: z.object({
      label: z.string(),
      name: z.string(),
      checked: z.boolean().optional(),
    }),
  },
  Textarea: {
    props: z.object({
      label: z.string().optional(),
      placeholder: z.string().optional(),
      name: z.string(),
    }),
  },

  // Layouts
  Stack: {
    props: z.object({
      children: z.array(z.any()),
      direction: z.enum(['row', 'column']).optional(),
      gap: z.number().optional(),
      align: z.enum(['start', 'center', 'end', 'stretch']).optional(),
      justify: z.enum(['start', 'center', 'end', 'between', 'around']).optional(),
    }),
  },
  Grid: {
    props: z.object({
      children: z.array(z.any()),
      columns: z.number().optional(),
      gap: z.number().optional(),
    }),
  },
  Container: {
    props: z.object({
      children: z.any(),
      maxWidth: z.enum(['sm', 'md', 'lg', 'xl', '2xl', 'full']).optional(),
    }),
  },

  // Complex
  Table: {
    props: z.object({
      columns: z.array(z.object({ header: z.string(), accessorKey: z.string() })),
      data: z.array(z.record(z.string(), z.any())),
      caption: z.string().optional(),
    }),
  },
  Chart: {
    props: z.object({
      type: z.enum(['bar', 'line', 'pie']),
      data: z.array(z.record(z.string(), z.any())),
      indexKey: z.string(),
      categories: z.array(z.string()),
      colors: z.array(z.string()).optional(),
    }),
  },
  Tabs: {
    props: z.object({
      items: z.array(z.object({
        value: z.string(),
        label: z.string(),
        content: z.any(),
      })),
      defaultValue: z.string().optional(),
    }),
  },
  Image: {
    props: z.object({
      src: z.string(),
      alt: z.string(),
      width: z.number().optional(),
      height: z.number().optional(),
      className: z.string().optional(),
    }),
  },
} as const;

export type CatalogComponent = keyof typeof catalog;
