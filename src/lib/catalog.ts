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
        onClick: z.string().optional(), // Action ID
      }),
    },
    text: {
      props: z.object({
        content: z.string(),
        variant: z.enum(['h1', 'h2', 'h3', 'h4', 'p', 'muted', 'small']).optional(),
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
        name: z.string(), // Lucide icon name
        size: z.number().optional(),
      }),
    },

    // Molecules
    card: {
      props: z.object({
        title: z.string(),
        description: z.string().optional(),
        footer: z.string().optional(),
      }),
      hasChildren: true,
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
        value: z.string().or(z.number()),
        trend: z.number().optional(),
        trendDirection: z.enum(['up', 'down', 'neutral']).optional(),
      }),
    },

    // Forms
    input: {
      props: z.object({
        label: z.string().optional(),
        placeholder: z.string().optional(),
        type: z.enum(['text', 'email', 'password', 'number']).optional(),
        name: z.string(),
      }),
    },
    select: {
      props: z.object({
        label: z.string().optional(),
        options: z.array(z.object({ label: z.string(), value: z.string() })),
        name: z.string(),
        placeholder: z.string().optional(),
      }),
    },
    checkbox: {
      props: z.object({
        label: z.string(),
        name: z.string(),
        checked: z.boolean().optional(),
      }),
    },
    switch: {
      props: z.object({
        label: z.string(),
        name: z.string(),
        checked: z.boolean().optional(),
      }),
    },

    // Layouts
    stack: {
      props: z.object({
        direction: z.enum(['row', 'column']).optional(),
        gap: z.number().optional(),
        align: z.enum(['start', 'center', 'end', 'stretch']).optional(),
        justify: z.enum(['start', 'center', 'end', 'between', 'around']).optional(),
      }),
      hasChildren: true,
    },
    grid: {
      props: z.object({
        columns: z.number().optional(),
        gap: z.number().optional(),
      }),
      hasChildren: true,
    },
    container: {
      props: z.object({
        maxWidth: z.enum(['sm', 'md', 'lg', 'xl', '2xl', 'full']).optional(),
        padding: z.number().optional(),
      }),
      hasChildren: true,
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
        type: z.enum(['bar', 'line', 'pie']),
        data: z.array(z.record(z.string(), z.any())),
        index: z.string(),
        categories: z.array(z.string()),
        colors: z.array(z.string()).optional(),
      }),
    },
    tabs: {
      props: z.object({
        defaultValue: z.string().optional(),
        items: z.array(z.object({ value: z.string(), label: z.string() })),
      }),
      // Tabs is tricky, usually content is separate, but if we follow simple schema, tabs structure might be handled differently.
      // I'll leave hasChildren true for now or assume content is managed elsewhere?
      // In json-render, usually children are direct descendants.
      // For tabs, we might need nested structure.
      // But let's stick to the spec components.
    },
  },
});
