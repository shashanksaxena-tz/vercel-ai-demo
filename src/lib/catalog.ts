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
    children: z.array(z.any()).optional(), // Will be handled as sibling children
    style: stylesSchema,
  }),
  Grid: z.object({
    columns: z.number().optional(),
    gap: z.number().optional(),
    children: z.array(z.any()).optional(), // Will be handled as sibling children
    style: stylesSchema,
  }),
  Container: z.object({
    children: z.any().optional(), // Will be handled as sibling children
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
      content: z.any(), // Recursive content
    })),
    defaultValue: z.string().optional(),
    style: stylesSchema,
  }),
};

export const catalog = {
  getSchema: () => components,
};

// Recursive schema definition for streamObject
export function getOutputSchema() {
  const uiElementSchema: z.ZodType<any> = z.lazy(() =>
    z.discriminatedUnion('type', [
      // Atoms
      z.object({ type: z.literal('Button'), key: z.string(), props: components.Button, children: z.array(uiElementSchema).optional() }),
      z.object({ type: z.literal('Text'), key: z.string(), props: components.Text, children: z.array(uiElementSchema).optional() }),
      z.object({ type: z.literal('Badge'), key: z.string(), props: components.Badge, children: z.array(uiElementSchema).optional() }),
      z.object({ type: z.literal('Avatar'), key: z.string(), props: components.Avatar, children: z.array(uiElementSchema).optional() }),
      z.object({ type: z.literal('Icon'), key: z.string(), props: components.Icon, children: z.array(uiElementSchema).optional() }),

      // Molecules
      z.object({
        type: z.literal('Card'),
        key: z.string(),
        props: components.Card.extend({
          content: z.union([uiElementSchema, z.array(uiElementSchema)]).optional(),
          footer: z.union([uiElementSchema, z.array(uiElementSchema)]).optional(),
        }),
        children: z.array(uiElementSchema).optional()
      }),
      z.object({ type: z.literal('Alert'), key: z.string(), props: components.Alert, children: z.array(uiElementSchema).optional() }),
      z.object({ type: z.literal('Metric'), key: z.string(), props: components.Metric, children: z.array(uiElementSchema).optional() }),

      // Forms
      z.object({ type: z.literal('Input'), key: z.string(), props: components.Input, children: z.array(uiElementSchema).optional() }),
      z.object({ type: z.literal('Select'), key: z.string(), props: components.Select, children: z.array(uiElementSchema).optional() }),
      z.object({ type: z.literal('Checkbox'), key: z.string(), props: components.Checkbox, children: z.array(uiElementSchema).optional() }),
      z.object({ type: z.literal('Switch'), key: z.string(), props: components.Switch, children: z.array(uiElementSchema).optional() }),

      // Layouts
      z.object({
        type: z.literal('Stack'),
        key: z.string(),
        props: components.Stack.omit({ children: true }),
        children: z.array(uiElementSchema).optional()
      }),
      z.object({
        type: z.literal('Grid'),
        key: z.string(),
        props: components.Grid.omit({ children: true }),
        children: z.array(uiElementSchema).optional()
      }),
      z.object({
        type: z.literal('Container'),
        key: z.string(),
        props: components.Container.omit({ children: true }),
        children: z.array(uiElementSchema).optional()
      }),

      // Complex
      z.object({ type: z.literal('Table'), key: z.string(), props: components.Table, children: z.array(uiElementSchema).optional() }),
      z.object({ type: z.literal('Chart'), key: z.string(), props: components.Chart, children: z.array(uiElementSchema).optional() }),
      z.object({
        type: z.literal('Tabs'),
        key: z.string(),
        props: components.Tabs.extend({
          items: z.array(z.object({
            label: z.string(),
            value: z.string(),
            content: z.union([uiElementSchema, z.array(uiElementSchema)]),
          }))
        }),
        children: z.array(uiElementSchema).optional()
      }),
    ])
  );

  return z.object({
    ui: uiElementSchema,
    summary: z.string(),
  });
}
