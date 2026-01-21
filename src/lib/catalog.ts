import { createCatalog } from '@json-render/core';
import { z } from 'zod';

export const catalog = createCatalog({
  components: {
    // Atoms
    button: {
      props: z.object({
        label: z.string(),
        variant: z.enum(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']).optional(),
        size: z.enum(['default', 'sm', 'lg', 'icon']).optional(),
        onClick: z.string().optional().describe('Action ID to trigger'),
      }),
    },
    text: {
      props: z.object({
        content: z.string(),
        variant: z.enum(['h1', 'h2', 'h3', 'p', 'small', 'muted']).optional(),
      }),
    },
    badge: {
      props: z.object({
        label: z.string(),
        variant: z.enum(['default', 'secondary', 'destructive', 'outline']).optional(),
      }),
    },
    avatar: {
      props: z.object({
        src: z.string().optional(),
        fallback: z.string(),
        alt: z.string().optional(),
      }),
    },
    icon: {
      props: z.object({
        name: z.string().describe('Lucide icon name'),
        size: z.number().optional(),
        color: z.string().optional(),
      }),
    },
    image: {
      props: z.object({
        src: z.string(),
        alt: z.string(),
        width: z.number().optional(),
        height: z.number().optional(),
        className: z.string().optional(),
      }),
    },

    // Molecules
    card: {
      hasChildren: true,
      props: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        footer: z.string().optional(),
      }),
    },
    alert: {
      props: z.object({
        title: z.string(),
        description: z.string(),
        variant: z.enum(['default', 'destructive']).optional(),
      }),
    },
    metric: {
      props: z.object({
        label: z.string(),
        value: z.union([z.string(), z.number()]),
        trend: z.number().optional(),
        trendLabel: z.string().optional(),
      }),
    },

    // Forms
    input: {
      props: z.object({
        name: z.string(),
        label: z.string().optional(),
        placeholder: z.string().optional(),
        type: z.enum(['text', 'password', 'email', 'number']).optional(),
      }),
    },
    textarea: {
      props: z.object({
        name: z.string(),
        label: z.string().optional(),
        placeholder: z.string().optional(),
      }),
    },
    select: {
      props: z.object({
        name: z.string(),
        label: z.string().optional(),
        options: z.array(z.object({ label: z.string(), value: z.string() })),
        placeholder: z.string().optional(),
      }),
    },
    checkbox: {
      props: z.object({
        name: z.string(),
        label: z.string(),
        checked: z.boolean().optional(),
      }),
    },
    switch: {
      props: z.object({
        name: z.string(),
        label: z.string(),
        checked: z.boolean().optional(),
      }),
    },

    // Layouts
    stack: {
      hasChildren: true,
      props: z.object({
        direction: z.enum(['row', 'column']).optional(),
        gap: z.number().optional(),
        align: z.enum(['start', 'center', 'end', 'stretch']).optional(),
        justify: z.enum(['start', 'center', 'end', 'between']).optional(),
      }),
    },
    grid: {
      hasChildren: true,
      props: z.object({
        columns: z.number().optional(),
        gap: z.number().optional(),
      }),
    },
    container: {
      hasChildren: true,
      props: z.object({
        maxWidth: z.enum(['sm', 'md', 'lg', 'xl', '2xl', 'full']).optional(),
        padding: z.number().optional(),
      }),
    },

    // Complex
    table: {
      props: z.object({
        columns: z.array(z.object({ header: z.string(), accessorKey: z.string() })),
        data: z.array(z.record(z.string(), z.any())),
        caption: z.string().optional(),
      }),
    },
    chart: {
      props: z.object({
        type: z.enum(['bar', 'line', 'pie', 'area']),
        data: z.array(z.record(z.string(), z.any())),
        index: z.string(),
        categories: z.array(z.string()),
        colors: z.array(z.string()).optional(),
      }),
    },
    tabs: {
      props: z.object({
        defaultValue: z.string(),
        items: z.array(z.object({
          value: z.string(),
          label: z.string(),
          content: z.any(), // This might need to be specific if content is children
        })),
      }),
    },
  },
});
