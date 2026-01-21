import { createCatalog, ActionSchema } from '@json-render/core';
import { z } from 'zod';

export const catalog = createCatalog({
  components: {
    // Atoms
    Button: {
      props: z.object({
        label: z.string(),
        variant: z.enum(['default', 'secondary', 'destructive', 'outline', 'ghost', 'link']).optional(),
        size: z.enum(['default', 'sm', 'lg', 'icon']).optional(),
        onClick: ActionSchema.optional(),
      }),
    },
    Text: {
      props: z.object({
        content: z.string(),
        variant: z.enum(['h1', 'h2', 'h3', 'h4', 'p', 'blockquote', 'code']).optional(),
        className: z.string().optional(),
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
        src: z.string().optional(),
        fallback: z.string(),
        alt: z.string().optional(),
      }),
    },
    Icon: {
      props: z.object({
        name: z.string(),
        size: z.number().optional(),
        className: z.string().optional(),
      }),
    },

    // Molecules
    Card: {
      props: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        footer: z.string().optional(),
        className: z.string().optional(),
      }),
      hasChildren: true,
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
        defaultValue: z.string().optional(),
      }),
    },
    Select: {
      props: z.object({
        label: z.string().optional(),
        options: z.array(z.object({ label: z.string(), value: z.string() })),
        placeholder: z.string().optional(),
        name: z.string(),
        defaultValue: z.string().optional(),
      }),
    },
    Checkbox: {
      props: z.object({
        label: z.string(),
        checked: z.boolean().optional(),
        name: z.string(),
        onCheckedChange: ActionSchema.optional(),
      }),
    },
    Switch: {
      props: z.object({
        label: z.string(),
        checked: z.boolean().optional(),
        name: z.string(),
        onCheckedChange: ActionSchema.optional(),
      }),
    },

    // Layouts
    Stack: {
      props: z.object({
        direction: z.enum(['row', 'column']).optional(),
        gap: z.number().optional(),
        align: z.enum(['start', 'center', 'end', 'stretch']).optional(),
        justify: z.enum(['start', 'center', 'end', 'between']).optional(),
        className: z.string().optional(),
      }),
      hasChildren: true,
    },
    Grid: {
      props: z.object({
        columns: z.number().optional(),
        gap: z.number().optional(),
        className: z.string().optional(),
      }),
      hasChildren: true,
    },
    Container: {
      props: z.object({
        maxWidth: z.enum(['sm', 'md', 'lg', 'xl', '2xl']).optional(),
        className: z.string().optional(),
      }),
      hasChildren: true,
    },

    // Complex
    Table: {
      props: z.object({
        columns: z.array(z.object({ header: z.string(), accessorKey: z.string() })),
        data: z.array(z.record(z.any())),
        caption: z.string().optional(),
      }),
    },
    Chart: {
      props: z.object({
        type: z.enum(['bar', 'line', 'pie', 'area']),
        data: z.array(z.record(z.any())),
        indexKey: z.string(),
        categories: z.array(z.string()),
        colors: z.array(z.string()).optional(),
      }),
    },
    Tabs: {
      props: z.object({
        items: z.array(z.object({ value: z.string(), label: z.string() })),
        defaultValue: z.string().optional(),
      }),
      hasChildren: true,
    },
  },
});
