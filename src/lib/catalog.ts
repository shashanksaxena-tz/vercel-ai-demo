import { z } from 'zod';

export const catalog = {
  // Atoms
  Button: {
    props: z.object({
      label: z.string(),
      variant: z.enum(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']).optional(),
      size: z.enum(['default', 'sm', 'lg', 'icon']).optional(),
      onClick: z.string().optional(), // Action ID
    }),
  },
  Text: {
    props: z.object({
      content: z.string(),
      variant: z.enum(['h1', 'h2', 'h3', 'h4', 'p', 'blockquote', 'lead', 'large', 'small', 'muted']).optional(),
    }),
  },
  Badge: {
    props: z.object({
      label: z.string(),
      variant: z.enum(['default', 'secondary', 'destructive', 'outline']).optional(),
    }),
  },
  Avatar: {
    props: z.object({
      src: z.string().url().optional(),
      fallback: z.string(),
      alt: z.string().optional(),
    }),
  },
  Icon: {
    props: z.object({
      name: z.string(), // Lucide icon name
      size: z.union([z.number(), z.string()]).optional(),
      className: z.string().optional(),
    }),
  },

  // Molecules
  Card: {
    props: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      footer: z.string().optional(),
    }),
  },
  Alert: {
    props: z.object({
      title: z.string(),
      description: z.string().optional(),
      variant: z.enum(['default', 'destructive']).optional(),
    }),
  },
  Metric: {
    props: z.object({
      label: z.string(),
      value: z.union([z.string(), z.number()]),
      trend: z.number().optional(), // Percentage change
      trendDirection: z.enum(['up', 'down', 'neutral']).optional(),
    }),
  },

  // Forms
  Input: {
    props: z.object({
      name: z.string(),
      label: z.string().optional(),
      placeholder: z.string().optional(),
      type: z.enum(['text', 'password', 'email', 'number']).optional(),
    }),
  },
  Select: {
    props: z.object({
      name: z.string(),
      label: z.string().optional(),
      placeholder: z.string().optional(),
      options: z.array(z.object({ label: z.string(), value: z.string() })),
    }),
  },
  Checkbox: {
    props: z.object({
      name: z.string(),
      label: z.string(),
      checked: z.boolean().optional(),
    }),
  },
  Switch: {
    props: z.object({
      name: z.string(),
      label: z.string(),
      checked: z.boolean().optional(),
    }),
  },
  Textarea: {
    props: z.object({
      name: z.string(),
      label: z.string().optional(),
      placeholder: z.string().optional(),
    }),
  },

  // Layouts
  Stack: {
    props: z.object({
      direction: z.enum(['row', 'column']).optional(),
      gap: z.number().optional(),
      align: z.enum(['start', 'center', 'end', 'stretch']).optional(),
      justify: z.enum(['start', 'center', 'end', 'between']).optional(),
    }),
  },
  Grid: {
    props: z.object({
      columns: z.number().optional(),
      gap: z.number().optional(),
    }),
  },
  Container: {
    props: z.object({
      maxWidth: z.enum(['sm', 'md', 'lg', 'xl', '2xl', 'full']).optional(),
      centered: z.boolean().optional(),
    }),
  },

  // Complex
  Table: {
    props: z.object({
      columns: z.array(z.object({ header: z.string(), key: z.string() })),
      data: z.array(z.record(z.string(), z.any())),
      caption: z.string().optional(),
    }),
  },
  Chart: {
    props: z.object({
      type: z.enum(['bar', 'line', 'pie', 'area']),
      data: z.array(z.record(z.string(), z.any())),
      indexKey: z.string(), // Key for X axis
      categories: z.array(z.string()), // Keys for Y axis (series)
      colors: z.array(z.string()).optional(),
    }),
  },
  Tabs: {
    props: z.object({
      defaultValue: z.string(),
      items: z.array(z.object({ value: z.string(), label: z.string() })),
    }),
  },
  Image: {
    props: z.object({
      src: z.string().url(),
      alt: z.string(),
      width: z.number().optional(),
      height: z.number().optional(),
    }),
  },
} as const;
