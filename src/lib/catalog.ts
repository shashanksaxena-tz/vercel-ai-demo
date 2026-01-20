import { z } from 'zod';
import { createCatalog } from '@json-render/core';

// Atoms
const buttonSchema = z.object({
  label: z.string(),
  variant: z.enum(['default', 'secondary', 'destructive', 'outline', 'ghost', 'link']).optional(),
  size: z.enum(['default', 'sm', 'lg', 'icon']).optional(),
  onClick: z.string().optional(), // Action ID
});

const textSchema = z.object({
  content: z.string(),
  variant: z.enum(['h1', 'h2', 'h3', 'h4', 'p', 'muted', 'small']).optional(),
});

const badgeSchema = z.object({
  label: z.string(),
  variant: z.enum(['default', 'secondary', 'destructive', 'outline']).optional(),
});

const avatarSchema = z.object({
  src: z.string().optional(),
  fallback: z.string(),
  alt: z.string().optional(),
});

const iconSchema = z.object({
  name: z.string(), // Lucide icon name
  size: z.number().optional(),
});

// Molecules
const cardSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  footer: z.any().optional(),
});

const alertSchema = z.object({
  title: z.string(),
  description: z.string(),
  variant: z.enum(['default', 'destructive']).optional(),
});

const metricSchema = z.object({
  label: z.string(),
  value: z.string(),
  trend: z.number().optional(), // Percentage
  trendDirection: z.enum(['up', 'down', 'neutral']).optional(),
});

// Forms
const inputSchema = z.object({
  label: z.string().optional(),
  placeholder: z.string().optional(),
  name: z.string(),
  type: z.enum(['text', 'password', 'email', 'number']).optional(),
});

const selectSchema = z.object({
  label: z.string().optional(),
  name: z.string(),
  options: z.array(z.object({ label: z.string(), value: z.string() })),
  placeholder: z.string().optional(),
});

const checkboxSchema = z.object({
  label: z.string(),
  name: z.string(),
  checked: z.boolean().optional(),
});

const switchSchema = z.object({
  label: z.string(),
  name: z.string(),
  checked: z.boolean().optional(),
});

// Layouts
const stackSchema = z.object({
  direction: z.enum(['row', 'column']).optional(),
  gap: z.number().optional(),
  align: z.enum(['start', 'center', 'end', 'stretch']).optional(),
  justify: z.enum(['start', 'center', 'end', 'between', 'around']).optional(),
});

const gridSchema = z.object({
  columns: z.number().optional(),
  gap: z.number().optional(),
});

const containerSchema = z.object({
  maxWidth: z.enum(['sm', 'md', 'lg', 'xl', '2xl', 'full']).optional(),
});

// Complex
const tableSchema = z.object({
  columns: z.array(z.object({ header: z.string(), accessorKey: z.string() })),
  data: z.array(z.record(z.string(), z.any())),
  caption: z.string().optional(),
});

const chartSchema = z.object({
  type: z.enum(['bar', 'line', 'pie', 'area']),
  data: z.array(z.record(z.string(), z.any())),
  xKey: z.string(),
  yKey: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
});

const tabsSchema = z.object({
  defaultValue: z.string().optional(),
  items: z.array(z.object({
    value: z.string(),
    label: z.string(),
    content: z.any(),
  })),
});

export const catalog = createCatalog({
  components: {
    // Atoms
    Button: { props: buttonSchema },
    Text: { props: textSchema },
    Badge: { props: badgeSchema },
    Avatar: { props: avatarSchema },
    Icon: { props: iconSchema },
    // Molecules
    Card: { props: cardSchema, hasChildren: true },
    Alert: { props: alertSchema },
    Metric: { props: metricSchema },
    // Forms
    Input: { props: inputSchema },
    Select: { props: selectSchema },
    Checkbox: { props: checkboxSchema },
    Switch: { props: switchSchema },
    // Layouts
    Stack: { props: stackSchema, hasChildren: true },
    Grid: { props: gridSchema, hasChildren: true },
    Container: { props: containerSchema, hasChildren: true },
    // Complex
    Table: { props: tableSchema },
    Chart: { props: chartSchema },
    Tabs: { props: tabsSchema },
  },
});
