import { z } from 'zod';
import { createCatalog } from '@json-render/core';

export const catalog = createCatalog({
  components: {
    // Atoms
    Button: {
      props: z.object({
        label: z.string(),
        variant: z.enum(['default', 'secondary', 'destructive', 'outline', 'ghost', 'link']).optional(),
        size: z.enum(['default', 'sm', 'lg', 'icon']).optional(),
        onClick: z.string().optional().describe('Action name to trigger'),
        disabled: z.boolean().optional(),
      }),
      description: 'A clickable button component',
    },
    Text: {
      props: z.object({
        content: z.string(),
        variant: z.enum(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'lead', 'large', 'small', 'muted']).optional(),
        align: z.enum(['left', 'center', 'right', 'justify']).optional(),
        color: z.string().optional(),
      }),
      description: 'Text component for displaying headings and paragraphs',
    },
    Badge: {
      props: z.object({
        label: z.string(),
        variant: z.enum(['default', 'secondary', 'destructive', 'outline']).optional(),
      }),
      description: 'A badge for status or labeling',
    },
    Avatar: {
      props: z.object({
        src: z.string().optional(),
        alt: z.string().optional(),
        fallback: z.string(),
      }),
      description: 'User avatar with fallback',
    },
    Icon: {
      props: z.object({
        name: z.string(),
        size: z.enum(['sm', 'md', 'lg']).optional(),
        color: z.string().optional(),
      }),
      description: 'Icon component',
    },

    // Molecules
    Card: {
      props: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        footer: z.string().optional(),
      }),
      hasChildren: true,
      description: 'Card container with title, description and footer',
    },
    Alert: {
      props: z.object({
        title: z.string(),
        description: z.string(),
        variant: z.enum(['default', 'destructive']).optional(),
      }),
      description: 'Alert message for users',
    },
    Metric: {
      props: z.object({
        label: z.string(),
        value: z.string(),
        trend: z.enum(['up', 'down', 'neutral']).optional(),
        trendValue: z.string().optional(),
        description: z.string().optional(),
      }),
      description: 'Display a metric with optional trend',
    },

    // Forms
    Input: {
      props: z.object({
        label: z.string().optional(),
        placeholder: z.string().optional(),
        type: z.enum(['text', 'email', 'password', 'number']).optional(),
        value: z.string().optional(),
        onChange: z.string().optional().describe('Action name'),
        name: z.string(),
      }),
      description: 'Input field',
    },
    Select: {
      props: z.object({
        label: z.string().optional(),
        options: z.array(z.object({
          label: z.string(),
          value: z.string(),
        })),
        value: z.string().optional(),
        onChange: z.string().optional(),
        placeholder: z.string().optional(),
        name: z.string(),
      }),
      description: 'Dropdown select',
    },
    Checkbox: {
      props: z.object({
        label: z.string(),
        checked: z.boolean().optional(),
        onCheckedChange: z.string().optional(),
        name: z.string(),
      }),
      description: 'Checkbox input',
    },
    Switch: {
      props: z.object({
        label: z.string(),
        checked: z.boolean().optional(),
        onCheckedChange: z.string().optional(),
        name: z.string(),
      }),
      description: 'Toggle switch',
    },
    Textarea: {
       props: z.object({
        label: z.string().optional(),
        placeholder: z.string().optional(),
        value: z.string().optional(),
        onChange: z.string().optional(),
        name: z.string(),
      }),
      description: 'Multiline text input',
    },

    // Layouts
    Stack: {
      props: z.object({
        direction: z.enum(['row', 'column']).optional(),
        gap: z.number().optional(),
        align: z.enum(['start', 'center', 'end', 'stretch']).optional(),
        justify: z.enum(['start', 'center', 'end', 'between', 'around']).optional(),
      }),
      hasChildren: true,
      description: 'Flexbox stack layout',
    },
    Grid: {
      props: z.object({
        columns: z.number().min(1).max(12).optional(),
        gap: z.number().optional(),
      }),
      hasChildren: true,
      description: 'Grid layout',
    },
    Container: {
      props: z.object({
        maxWidth: z.enum(['sm', 'md', 'lg', 'xl', '2xl', 'full']).optional(),
        padding: z.enum(['none', 'sm', 'md', 'lg']).optional(),
      }),
      hasChildren: true,
      description: 'Container with max-width and padding',
    },

    // Complex
    Table: {
      props: z.object({
        headers: z.array(z.string()),
        rows: z.array(z.array(z.string().or(z.number()))),
        caption: z.string().optional(),
      }),
      description: 'Data table',
    },
    Chart: {
      props: z.object({
        type: z.enum(['bar', 'line', 'pie', 'area']),
        data: z.array(z.object({
          name: z.string(),
          value: z.number(),
        })),
        title: z.string().optional(),
        description: z.string().optional(),
      }),
      description: 'Data visualization chart',
    },
    Tabs: {
      props: z.object({
        defaultValue: z.string().optional(),
        items: z.array(z.object({
          label: z.string(),
          value: z.string(),
          content: z.string().optional().describe('Content key or text'), // Simplifying for now, usually content is children
        })),
      }),
      description: 'Tabbed interface',
    },
    Progress: {
      props: z.object({
        value: z.number().min(0).max(100),
        label: z.string().optional(),
      }),
      description: 'Progress bar',
    },
  },
});
