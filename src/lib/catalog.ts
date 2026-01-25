import { z } from 'zod';

const stylesSchema = z.record(z.string(), z.any()).optional();

// Define prop schemas individually for reuse
const buttonProps = z.object({
  variant: z.enum(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']).optional(),
  size: z.enum(['default', 'sm', 'lg', 'icon']).optional(),
  children: z.string().optional(),
  onClick: z.string().optional(),
  style: stylesSchema,
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
  // content/footer usually handled by children, but keeping props for flexibility
  style: stylesSchema,
});

const alertProps = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  variant: z.enum(['default', 'destructive']).optional(),
  icon: z.string().optional(),
  style: stylesSchema,
});

const metricProps = z.object({
  label: z.string(),
  value: z.string().or(z.number()),
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
  direction: z.enum(['row', 'column']).optional(),
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

const tabsProps = z.object({
  items: z.array(z.object({
    label: z.string(),
    value: z.string(),
    // content is handled via specific child mapping in registry or via children in some impls?
    // In registry/tabs.tsx: content is in the item object.
    content: z.any().optional(),
  })),
  defaultValue: z.string().optional(),
  style: stylesSchema,
});


// Export legacy components object for backward compatibility
export const components = {
  Button: buttonProps,
  Text: textProps,
  Badge: badgeProps,
  Avatar: avatarProps,
  Icon: iconProps,
  Card: z.object({ ...cardProps.shape, content: z.any().optional(), footer: z.any().optional() }),
  Alert: alertProps,
  Metric: metricProps,
  Input: inputProps,
  Select: selectProps,
  Checkbox: checkboxProps,
  Switch: switchProps,
  Stack: z.object({ ...stackProps.shape, children: z.array(z.any()) }),
  Grid: z.object({ ...gridProps.shape, children: z.array(z.any()) }),
  Container: z.object({ ...containerProps.shape, children: z.any() }),
  Table: tableProps,
  Chart: chartProps,
  Tabs: tabsProps,
};

// Recursive UI Element Schema for AI Streaming
const uiElementSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    key: z.string(),
    children: z.array(uiElementSchema).optional(),
  }).and(
    z.union([
      z.object({ type: z.literal('Button'), props: buttonProps }),
      z.object({ type: z.literal('Text'), props: textProps }),
      z.object({ type: z.literal('Badge'), props: badgeProps }),
      z.object({ type: z.literal('Avatar'), props: avatarProps }),
      z.object({ type: z.literal('Icon'), props: iconProps }),
      z.object({ type: z.literal('Card'), props: cardProps }),
      z.object({ type: z.literal('Alert'), props: alertProps }),
      z.object({ type: z.literal('Metric'), props: metricProps }),
      z.object({ type: z.literal('Input'), props: inputProps }),
      z.object({ type: z.literal('Select'), props: selectProps }),
      z.object({ type: z.literal('Checkbox'), props: checkboxProps }),
      z.object({ type: z.literal('Switch'), props: switchProps }),
      z.object({ type: z.literal('Stack'), props: stackProps }),
      z.object({ type: z.literal('Grid'), props: gridProps }),
      z.object({ type: z.literal('Container'), props: containerProps }),
      z.object({ type: z.literal('Table'), props: tableProps }),
      z.object({ type: z.literal('Chart'), props: chartProps }),
      z.object({ type: z.literal('Tabs'), props: tabsProps }),
    ])
  )
);

export const catalog = {
  getSchema: () => components,
  getOutputSchema: () => z.object({
    ui: uiElementSchema,
    summary: z.string().describe("A short summary of what was generated"),
  }),
};
