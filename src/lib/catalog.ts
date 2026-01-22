import { z } from 'zod';
import { createCatalog } from '@json-render/core';

export const catalog = createCatalog({
  components: {
    // Atoms
    Button: {
      schema: z.object({
        children: z.string(),
        variant: z.enum(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']).optional(),
        size: z.enum(['default', 'sm', 'lg', 'icon']).optional(),
        disabled: z.boolean().optional(),
        onClick: z.string().optional(), // Action ID
      }),
    },
    Text: {
      schema: z.object({
        children: z.string(),
        variant: z.enum(['h1', 'h2', 'h3', 'h4', 'p', 'blockquote', 'lead', 'large', 'small', 'muted']).optional(),
        className: z.string().optional(),
      }),
    },
    Badge: {
      schema: z.object({
        children: z.string(),
        variant: z.enum(['default', 'secondary', 'destructive', 'outline']).optional(),
      }),
    },
    Avatar: {
      schema: z.object({
        src: z.string().url().optional(),
        alt: z.string().optional(),
        fallback: z.string(),
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
        content: z.any().optional(), // Should be a slot? Using any for now to allow nested components via json-render structure
        footer: z.any().optional(),
        className: z.string().optional(),
      }),
    },
    Alert: {
      schema: z.object({
        title: z.string(),
        description: z.string(),
        variant: z.enum(['default', 'destructive']).optional(),
        icon: z.string().optional(),
      }),
    },
    Metric: {
      schema: z.object({
        label: z.string(),
        value: z.string(),
        trend: z.object({
          value: z.number(),
          direction: z.enum(['up', 'down', 'neutral']),
          label: z.string().optional(),
        }).optional(),
      }),
    },

    // Forms
    Input: {
      schema: z.object({
        label: z.string().optional(),
        placeholder: z.string().optional(),
        type: z.string().default('text'),
        name: z.string(),
        required: z.boolean().optional(),
      }),
    },
    Select: {
      schema: z.object({
        label: z.string().optional(),
        name: z.string(),
        placeholder: z.string().optional(),
        options: z.array(z.object({
          label: z.string(),
          value: z.string(),
        })),
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
        name: z.string(),
        placeholder: z.string().optional(),
        rows: z.number().optional(),
      }),
    },

    // Layouts
    Stack: {
      schema: z.object({
        direction: z.enum(['row', 'column']).default('column'),
        gap: z.number().optional(),
        align: z.enum(['start', 'center', 'end', 'stretch']).optional(),
        justify: z.enum(['start', 'center', 'end', 'between', 'around']).optional(),
        children: z.any(),
      }),
    },
    Grid: {
      schema: z.object({
        columns: z.number().default(1),
        gap: z.number().optional(),
        children: z.any(),
      }),
    },
    Container: {
      schema: z.object({
        maxWidth: z.enum(['sm', 'md', 'lg', 'xl', '2xl', 'full']).optional(),
        center: z.boolean().optional(),
        children: z.any(),
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
        index: z.string(), // X-axis key
        categories: z.array(z.string()), // Y-axis keys
        colors: z.array(z.string()).optional(),
        title: z.string().optional(),
      }),
    },
    Tabs: {
      schema: z.object({
        defaultValue: z.string().optional(),
        items: z.array(z.object({
          value: z.string(),
          label: z.string(),
          content: z.any(),
        })),
      }),
    },
    Image: {
      schema: z.object({
        src: z.string().url(),
        alt: z.string(),
        width: z.number().optional(),
        height: z.number().optional(),
        className: z.string().optional(),
      }),
    },
  },
});
