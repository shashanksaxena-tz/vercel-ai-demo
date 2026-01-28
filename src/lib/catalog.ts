import { z } from 'zod';

const stylesSchema = z.record(z.string(), z.any()).optional();

// --- Props Schemas ---

const buttonProps = z.object({
  variant: z.enum(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']).optional(),
  size: z.enum(['default', 'sm', 'lg', 'icon']).optional(),
  children: z.string().optional(),
  label: z.string().optional(),
  action: z.string().optional(), // Changed onClick to action for consistency
  style: stylesSchema,
  disabled: z.boolean().optional(),
});

const textProps = z.object({
  variant: z.enum(['h1', 'h2', 'h3', 'h4', 'p', 'blockquote', 'code']).optional(),
  children: z.string(),
  style: stylesSchema,
});

const badgeProps = z.object({
  variant: z.enum(['default', 'secondary', 'destructive', 'outline']).optional(),
  children: z.string(),
  style: stylesSchema,
});

const avatarProps = z.object({
  src: z.string().optional(),
  fallback: z.string().optional(),
  alt: z.string().optional(),
  style: stylesSchema,
});

const iconProps = z.object({
  name: z.string(),
  size: z.number().optional(),
  color: z.string().optional(),
  style: stylesSchema,
});

const cardProps = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  footer: z.any().optional(), // Keeping flexible for now
  style: stylesSchema,
});

const alertProps = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  variant: z.enum(['default', 'destructive', 'success', 'warning', 'info']).optional(),
  icon: z.string().optional(),
  style: stylesSchema,
});

const metricProps = z.object({
  label: z.string(),
  value: z.union([z.string(), z.number()]),
  trend: z.number().optional(),
  trendDirection: z.enum(['up', 'down', 'neutral']).optional(),
  style: stylesSchema,
});

const inputProps = z.object({
  label: z.string().optional(),
  placeholder: z.string().optional(),
  type: z.string().optional(),
  name: z.string(),
  required: z.boolean().optional(),
  style: stylesSchema,
});

const selectProps = z.object({
  label: z.string().optional(),
  options: z.array(z.object({ label: z.string(), value: z.string() })),
  name: z.string(),
  placeholder: z.string().optional(),
  style: stylesSchema,
});

const checkboxProps = z.object({
  label: z.string().optional(),
  name: z.string(),
  checked: z.boolean().optional(),
  style: stylesSchema,
});

const switchProps = z.object({
  label: z.string().optional(),
  name: z.string(),
  checked: z.boolean().optional(),
  style: stylesSchema,
});

const stackProps = z.object({
  direction: z.enum(['row', 'column', 'horizontal', 'vertical']).optional(),
  gap: z.number().optional(),
  style: stylesSchema,
});

const gridProps = z.object({
  columns: z.number().optional(),
  gap: z.number().optional(),
  style: stylesSchema,
});

const containerProps = z.object({
  maxWidth: z.string().optional(),
  style: stylesSchema,
});

const tableProps = z.object({
  columns: z.array(z.object({
    header: z.string(),
    accessorKey: z.string(),
  })),
  data: z.array(z.record(z.string(), z.any())),
  caption: z.string().optional(),
  style: stylesSchema,
});

const chartProps = z.object({
  type: z.enum(['bar', 'line', 'pie', 'area']),
  data: z.array(z.record(z.string(), z.any())),
  categories: z.array(z.string()),
  index: z.string(),
  colors: z.array(z.string()).optional(),
  style: stylesSchema,
});

// Recursive schema definition
// We define a base UIElementSchema that uses a discriminated union
export const uiElementSchema: z.ZodType<any> = z.lazy(() =>
  z.discriminatedUnion('type', [
    // Leaf Components
    z.object({ type: z.literal('Button'), key: z.string(), props: buttonProps }),
    z.object({ type: z.literal('Text'), key: z.string(), props: textProps }),
    z.object({ type: z.literal('Badge'), key: z.string(), props: badgeProps }),
    z.object({ type: z.literal('Avatar'), key: z.string(), props: avatarProps }),
    z.object({ type: z.literal('Icon'), key: z.string(), props: iconProps }),
    z.object({ type: z.literal('Alert'), key: z.string(), props: alertProps }),
    z.object({ type: z.literal('Metric'), key: z.string(), props: metricProps }),
    z.object({ type: z.literal('Input'), key: z.string(), props: inputProps }),
    z.object({ type: z.literal('Select'), key: z.string(), props: selectProps }),
    z.object({ type: z.literal('Checkbox'), key: z.string(), props: checkboxProps }),
    z.object({ type: z.literal('Switch'), key: z.string(), props: switchProps }),
    z.object({ type: z.literal('Table'), key: z.string(), props: tableProps }),
    z.object({ type: z.literal('Chart'), key: z.string(), props: chartProps }),

    // Container Components (with children)
    z.object({
      type: z.literal('Card'),
      key: z.string(),
      props: cardProps,
      children: z.array(uiElementSchema).optional(),
    }),
    z.object({
      type: z.literal('Stack'),
      key: z.string(),
      props: stackProps,
      children: z.array(uiElementSchema).optional(),
    }),
    z.object({
      type: z.literal('Grid'),
      key: z.string(),
      props: gridProps,
      children: z.array(uiElementSchema).optional(),
    }),
    z.object({
      type: z.literal('Container'),
      key: z.string(),
      props: containerProps,
      children: z.array(uiElementSchema).optional(),
    }),

    // Special case for Tabs which has nested content in props
    z.object({
      type: z.literal('Tabs'),
      key: z.string(),
      props: z.object({
        items: z.array(z.object({
          label: z.string(),
          value: z.string(),
          content: z.union([z.string(), uiElementSchema]), // Content can be string or UI element
        })),
        defaultValue: z.string().optional(),
        style: stylesSchema,
      }),
    }),
  ])
);

// Export for legacy compatibility (kept close to original)
export const components = {
  Button: buttonProps,
  Text: textProps,
  Badge: badgeProps,
  Avatar: avatarProps,
  Icon: iconProps,
  Card: cardProps,
  Alert: alertProps,
  Metric: metricProps,
  Input: inputProps,
  Select: selectProps,
  Checkbox: checkboxProps,
  Switch: switchProps,
  Stack: stackProps,
  Grid: gridProps,
  Container: containerProps,
  Table: tableProps,
  Chart: chartProps,
  Tabs: z.object({
    items: z.array(z.object({
      label: z.string(),
      value: z.string(),
      content: z.any(),
    })),
    defaultValue: z.string().optional(),
    style: stylesSchema,
  }),
};

export const catalog = {
  getSchema: () => components,
};

// Export the output schema for streamObject
export function getOutputSchema() {
  return z.object({
    ui: uiElementSchema,
    summary: z.string(),
  });
}
