import { z } from 'zod';
import { createCatalog } from '@json-render/core';

export const catalog = createCatalog({
  components: {
    // Atoms
    Button: {
      props: z.object({
        label: z.string(),
        variant: z.enum(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']).optional(),
        size: z.enum(['default', 'sm', 'lg', 'icon']).optional(),
        disabled: z.boolean().optional(),
        onClick: z.string().optional().describe('Action to trigger'),
      }),
    },
    Text: {
      props: z.object({
        content: z.string(),
        variant: z.enum(['h1', 'h2', 'h3', 'h4', 'p', 'blockquote', 'lead', 'large', 'small', 'muted']).optional(),
        align: z.enum(['left', 'center', 'right', 'justify']).optional(),
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
        name: z.string().describe('Name of the icon from Lucide'),
        size: z.number().optional(),
        className: z.string().optional(),
      }),
    },

    // Molecules
    Card: {
      props: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        content: z.string().optional(), // Can be HTML/Text or use children in rendering
        footer: z.string().optional(),
        children: z.array(z.any()).optional(), // Nesting
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
        value: z.string().or(z.number()),
        trend: z.number().optional().describe('Percentage change'),
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
        required: z.boolean().optional(),
      }),
    },
    Select: {
      props: z.object({
        name: z.string(),
        label: z.string().optional(),
        placeholder: z.string().optional(),
        options: z.array(z.object({
          label: z.string(),
          value: z.string(),
        })),
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
        rows: z.number().optional(),
      }),
    },

    // Layouts
    Stack: {
      props: z.object({
        direction: z.enum(['row', 'column']).optional(),
        gap: z.number().optional(),
        align: z.enum(['start', 'center', 'end', 'stretch']).optional(),
        justify: z.enum(['start', 'center', 'end', 'between', 'around']).optional(),
        children: z.array(z.any()).optional(),
      }),
    },
    Grid: {
      props: z.object({
        columns: z.number().min(1).max(12),
        gap: z.number().optional(),
        children: z.array(z.any()).optional(),
      }),
    },
    Container: {
      props: z.object({
        maxWidth: z.enum(['sm', 'md', 'lg', 'xl', '2xl', 'full']).optional(),
        padding: z.number().optional(),
        children: z.array(z.any()).optional(),
      }),
    },

    // Complex
    Table: {
      props: z.object({
        columns: z.array(z.object({
          key: z.string(),
          header: z.string(),
        })),
        data: z.array(z.record(z.string(), z.any())),
        caption: z.string().optional(),
      }),
    },
    Chart: {
      props: z.object({
        type: z.enum(['bar', 'line', 'pie', 'area']),
        data: z.array(z.record(z.string(), z.any())),
        xKey: z.string(),
        series: z.array(z.object({
          key: z.string(),
          label: z.string().optional(),
          color: z.string().optional(),
        })),
      }),
    },
    Tabs: {
      props: z.object({
        defaultValue: z.string().optional(),
        items: z.array(z.object({
          value: z.string(),
          label: z.string(),
          content: z.any(), // Should be component or array of components
        })),
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
  },
});
