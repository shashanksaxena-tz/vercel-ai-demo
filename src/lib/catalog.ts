import { createCatalog } from '@json-render/core';
import { z } from 'zod';

export const catalog = createCatalog({
  components: {
    // Atoms
    Button: {
      schema: z.object({
        label: z.string(),
        variant: z.enum(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']).optional(),
        size: z.enum(['default', 'sm', 'lg', 'icon']).optional(),
        onClick: z.string().optional(),
        disabled: z.boolean().optional(),
      }),
    },
    Text: {
      schema: z.object({
        content: z.string(),
        variant: z.enum(['h1', 'h2', 'h3', 'h4', 'p', 'small', 'muted']).optional(),
        align: z.enum(['left', 'center', 'right']).optional(),
      }),
    },
    Badge: {
      schema: z.object({
        label: z.string(),
        variant: z.enum(['default', 'secondary', 'destructive', 'outline']).optional(),
      }),
    },
    Avatar: {
      schema: z.object({
        src: z.string().optional(),
        fallback: z.string(),
        alt: z.string().optional(),
      }),
    },
    Icon: {
      schema: z.object({
        name: z.string(), // Lucide icon name
        size: z.number().optional(),
        className: z.string().optional(),
      }),
    },

    // Molecules
    Card: {
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        content: z.any().optional(), // Component or array of components
        footer: z.any().optional(),
      }),
    },
    Alert: {
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        variant: z.enum(['default', 'destructive']).optional(),
        icon: z.string().optional(),
      }),
    },
    Metric: {
      schema: z.object({
        label: z.string(),
        value: z.string().or(z.number()),
        trend: z.enum(['up', 'down', 'neutral']).optional(),
        trendValue: z.string().optional(),
      }),
    },

    // Forms
    Input: {
      schema: z.object({
        label: z.string().optional(),
        placeholder: z.string().optional(),
        type: z.string().optional(),
        name: z.string(),
        value: z.string().optional(),
      }),
    },
    Select: {
      schema: z.object({
        label: z.string().optional(),
        placeholder: z.string().optional(),
        options: z.array(z.object({
          label: z.string(),
          value: z.string(),
        })),
        name: z.string(),
        value: z.string().optional(),
      }),
    },
    Checkbox: {
      schema: z.object({
        label: z.string(),
        name: z.string(),
        checked: z.boolean().optional(),
      }),
    },
    Switch: {
      schema: z.object({
        label: z.string(),
        name: z.string(),
        checked: z.boolean().optional(),
      }),
    },
    Textarea: {
      schema: z.object({
        label: z.string().optional(),
        placeholder: z.string().optional(),
        name: z.string(),
        value: z.string().optional(),
      }),
    },

    // Layouts
    Stack: {
      schema: z.object({
        children: z.any(),
        direction: z.enum(['row', 'column']).optional(),
        gap: z.number().optional(),
        align: z.enum(['start', 'center', 'end', 'stretch']).optional(),
        justify: z.enum(['start', 'center', 'end', 'between', 'around']).optional(),
      }),
    },
    Grid: {
      schema: z.object({
        children: z.any(),
        cols: z.number().optional(), // 1-12
        gap: z.number().optional(),
      }),
    },
    Container: {
      schema: z.object({
        children: z.any(),
        maxWidth: z.enum(['sm', 'md', 'lg', 'xl', '2xl', 'full']).optional(),
      }),
    },

    // Complex
    Table: {
      schema: z.object({
        columns: z.array(z.object({
          header: z.string(),
          accessorKey: z.string(),
        })),
        data: z.array(z.record(z.any())),
        caption: z.string().optional(),
      }),
    },
    Chart: {
      schema: z.object({
        type: z.enum(['bar', 'line', 'pie', 'area']),
        data: z.array(z.record(z.any())),
        config: z.record(z.object({
          label: z.string(),
          color: z.string().optional(),
        })).optional(),
        title: z.string().optional(),
        description: z.string().optional(),
      }),
    },
    Tabs: {
      schema: z.object({
        defaultValue: z.string(),
        tabs: z.array(z.object({
          value: z.string(),
          label: z.string(),
          content: z.any(),
        })),
      }),
    },

    // Additional to reach 20
    Image: {
      schema: z.object({
        src: z.string(),
        alt: z.string(),
        width: z.number().optional(),
        height: z.number().optional(),
        className: z.string().optional(),
      }),
    },
  },
});
