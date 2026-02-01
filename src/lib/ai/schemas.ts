/**
 * Zod Schemas for AI-Powered UI Generation
 *
 * Defines the structured output schemas for generating json-render compatible
 * UITree structures from AI responses.
 */

import { z } from 'zod';

// ============================================================================
// UIElement Schema
// ============================================================================

/**
 * Common prop types that might appear in UI elements
 */
const PropsSchema = z.object({
  // Content props - ALWAYS provide realistic values
  text: z.string().optional().describe('Text content for Headings - use clear, specific text (e.g., "Dashboard Analytics", not "Heading")'),
  content: z.string().optional().describe('Text content for paragraphs - provide 1-3 sentences of realistic, contextual content'),
  label: z.string().optional().describe('Label text for Buttons/Inputs - use action-oriented text (e.g., "Get Started", "Email Address")'),
  title: z.string().optional().describe('Title text - provide descriptive titles'),
  description: z.string().optional().describe('Description text - include helpful explanatory content'),

  // Typography props
  level: z.string().optional().describe('Heading level like 1, 2, 3'),
  size: z.string().optional().describe('Size like sm, md, lg, xl'),
  weight: z.string().optional().describe('Font weight'),

  // Style props
  variant: z.string().optional().describe('Variant like primary, secondary, solid, outline'),
  color: z.string().optional().describe('Color variant like primary, success, error'),
  className: z.string().optional().describe('CSS class names'),

  // Link/Navigation props
  href: z.string().optional().describe('Link URL - use # for demo or provide meaningful paths'),

  // Image props - ALWAYS provide for Image components
  src: z.string().optional().describe('Image source URL - use Unsplash (e.g., https://source.unsplash.com/800x600/?business,team)'),
  alt: z.string().optional().describe('Alt text for images - provide descriptive text for accessibility'),

  // Form props
  placeholder: z.string().optional().describe('Placeholder text for inputs - provide helpful examples'),
  type: z.string().optional().describe('Input type like text, email, password, number'),
  hint: z.string().optional().describe('Hint text for forms'),
  error: z.string().optional().describe('Error message'),

  // Layout props - ALWAYS include for layout components
  gap: z.string().optional().describe('Gap between elements (xs, sm, md, lg, xl) - always specify for Row/Column/Stack'),
  padding: z.string().optional().describe('Padding'),
  margin: z.string().optional().describe('Margin'),
  maxWidth: z.string().optional().describe('Maximum width'),
  align: z.string().optional().describe('Alignment (start, center, end, stretch)'),
  justify: z.string().optional().describe('Justification (start, center, end, between, around)'),
  direction: z.string().optional().describe('Flex direction'),
  wrap: z.boolean().optional().describe('Whether to wrap'),

  // Grid props
  cols: z.number().optional().describe('Number of columns'),
  responsive: z.any().optional().describe('Responsive column config like { sm: 1, md: 2, lg: 3 }'),

  // State props
  disabled: z.boolean().optional().describe('Whether disabled'),
  required: z.boolean().optional().describe('Whether required'),
  checked: z.boolean().optional().describe('Whether checked'),

  // Data props - ALWAYS provide realistic values for Metrics
  value: z.union([z.string(), z.number()]).optional().describe('Value - for Metrics use formatted numbers (e.g., "$45,231", "12,458")'),
  change: z.string().optional().describe('Change indicator for Metrics (e.g., "+12.5%", "-3.2%")'),
  changeType: z.string().optional().describe('Change type: positive, negative, neutral'),

  // Icon props - use when appropriate
  icon: z.string().optional().describe('Icon name from common libraries (e.g., "users", "shopping-cart", "chart-line")'),
  leftIcon: z.string().optional().describe('Icon on left side of button'),
  rightIcon: z.string().optional().describe('Icon on right side of button'),

  // Status props
  status: z.string().optional().describe('Status like success, error, warning, info'),

  // Display props
  fullWidth: z.boolean().optional().describe('Whether full width'),
  rounded: z.boolean().optional().describe('Whether rounded corners'),

  // Allow additional props
}).passthrough();

/**
 * Schema for a single UI element in the tree (as array item)
 */
export const UIElementSchema = z.object({
  key: z.string().describe('Unique identifier for this element'),
  type: z.string().describe('Component type from the available components list'),
  props: PropsSchema.describe('Props to pass to the component'),
  children: z.array(z.string()).optional().describe('Array of child element keys'),
});

export type UIElementSchemaType = z.infer<typeof UIElementSchema>;

// ============================================================================
// UITree Schema
// ============================================================================

/**
 * Schema for the complete UI tree structure
 * Uses an array of elements for Gemini compatibility, converted to map in post-processing
 */
export const UITreeSchema = z.object({
  root: z.string().describe('The key of the root element'),
  elements: z.array(UIElementSchema).describe('Array of element definitions'),
});

export type UITreeSchemaType = z.infer<typeof UITreeSchema>;

// ============================================================================
// Generation Result Schema
// ============================================================================

/**
 * Schema for the complete generation result from AI
 */
export const GenerationResultSchema = z.object({
  tree: UITreeSchema,
  explanation: z.string().describe('Brief explanation of what was generated and why'),
  suggestedStyles: z
    .array(z.object({ elementKey: z.string(), classes: z.string() }))
    .optional()
    .describe('Optional array of element key and Tailwind class pairs'),
});

export type GenerationResultSchemaType = z.infer<typeof GenerationResultSchema>;

// ============================================================================
// Component Type Validation
// ============================================================================

/**
 * List of all valid component types
 * This is used for validation and documentation
 */
export const VALID_COMPONENT_TYPES = [
  // Layout Components
  'Container',
  'Row',
  'Column',
  'Grid',
  'Stack',
  'Spacer',
  'Divider',

  // Card Components
  'Card',
  'CardHeader',
  'CardBody',
  'CardFooter',

  // Typography Components
  'Heading',
  'Text',
  'Link',

  // Button Components
  'Button',
  'IconButton',
  'ButtonGroup',

  // Form Components
  'Input',
  'TextArea',
  'Select',
  'Checkbox',
  'Radio',
  'RadioGroup',
  'Switch',
  'Slider',

  // Data Display Components
  'Badge',
  'Avatar',
  'AvatarGroup',
  'Icon',
  'Image',
  'List',
  'ListItem',
  'Table',
  'TableHeader',
  'TableBody',
  'TableRow',
  'TableCell',
  'Metric',
  'Progress',

  // Feedback Components
  'Alert',
  'Toast',
  'Skeleton',
  'Spinner',
  'EmptyState',

  // Navigation Components
  'Tabs',
  'TabList',
  'Tab',
  'TabPanel',
  'Breadcrumb',
  'BreadcrumbItem',
  'Pagination',
  'NavMenu',
  'NavItem',

  // Overlay Components
  'Modal',
  'Drawer',
  'Tooltip',
  'Popover',
  'Dropdown',
  'DropdownItem',

  // Collapse & Accordion
  'Accordion',
  'AccordionItem',
  'Collapsible',

  // Specialized Components
  'Chart',
  'Calendar',
  'DatePicker',
  'FileUpload',
  'Rating',
  'TagInput',
  'ColorPicker',
  'Timeline',
  'TimelineItem',
  'Stepper',
  'Step',
  'Code',
  'Kbd',
  'Quote',
  'Stat',
  'Tag',

  // Marketing Components
  'Hero',
  'FeatureCard',
  'PricingCard',
  'TestimonialCard',
  'CTA',
  'Footer',
  'FAQ',
  'Newsletter',
] as const;

export type ValidComponentType = (typeof VALID_COMPONENT_TYPES)[number];

/**
 * Schema for validating component types
 */
export const ComponentTypeSchema = z.enum(VALID_COMPONENT_TYPES);

// ============================================================================
// Prop Schemas for Common Patterns
// ============================================================================

/**
 * Common size variants used across components
 */
export const SizeVariantSchema = z.enum(['xs', 'sm', 'md', 'lg', 'xl']);

/**
 * Common color variants used across components
 */
export const ColorVariantSchema = z.enum([
  'default',
  'primary',
  'secondary',
  'accent',
  'success',
  'warning',
  'error',
  'info',
  'muted',
]);

/**
 * Common alignment options
 */
export const AlignmentSchema = z.enum(['start', 'center', 'end', 'stretch', 'baseline']);

/**
 * Common justify options
 */
export const JustifySchema = z.enum(['start', 'center', 'end', 'between', 'around', 'evenly']);

/**
 * Common orientation options
 */
export const OrientationSchema = z.enum(['horizontal', 'vertical']);

// ============================================================================
// Request/Response Schemas for API
// ============================================================================

/**
 * Schema for the generation request body
 */
export const GenerateRequestSchema = z.object({
  prompt: z.string().min(1, 'Prompt cannot be empty'),
  currentTree: UITreeSchema.optional(),
  conversationHistory: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
      })
    )
    .optional(),
  framework: z.string().optional(),
});

export type GenerateRequestSchemaType = z.infer<typeof GenerateRequestSchema>;

/**
 * Schema for the generation response
 */
export const GenerateResponseSchema = z.object({
  tree: UITreeSchema,
  explanation: z.string(),
  suggestedStyles: z.record(z.string(), z.string()).optional(),
  timing: z.number(),
  valid: z.boolean(),
  validationErrors: z.array(z.string()).optional(),
});

export type GenerateResponseSchemaType = z.infer<typeof GenerateResponseSchema>;
