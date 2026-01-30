/**
 * Base Catalog - Shared component definitions across all UI frameworks
 * This provides the core json-render catalog that all framework-specific registries implement
 */

import { createCatalog } from '@json-render/core';
import { z } from 'zod';

// Common prop schemas used across multiple components
const commonStyles = z.object({
  className: z.string().optional(),
  style: z.record(z.string(), z.unknown()).optional(),
});

const spacingProps = z.object({
  padding: z.enum(['none', 'sm', 'md', 'lg', 'xl']).optional(),
  margin: z.enum(['none', 'sm', 'md', 'lg', 'xl']).optional(),
  gap: z.enum(['none', 'sm', 'md', 'lg', 'xl']).optional(),
});

const colorVariants = z.enum([
  'default', 'primary', 'secondary', 'accent',
  'success', 'warning', 'error', 'info', 'muted'
]);

const sizeVariants = z.enum(['xs', 'sm', 'md', 'lg', 'xl']);

/**
 * Base catalog with all shared component definitions
 * Each framework registry will map these to their specific implementations
 */
export const baseCatalog = createCatalog({
  components: {
    // Layout Components
    Container: {
      props: z.object({
        maxWidth: z.enum(['sm', 'md', 'lg', 'xl', '2xl', 'full']).optional(),
        centered: z.boolean().optional(),
        ...commonStyles.shape,
      }),
      hasChildren: true,
      description: 'A responsive container for content with max-width constraints',
    },

    Row: {
      props: z.object({
        align: z.enum(['start', 'center', 'end', 'stretch', 'baseline']).optional(),
        justify: z.enum(['start', 'center', 'end', 'between', 'around', 'evenly']).optional(),
        gap: sizeVariants.optional(),
        wrap: z.boolean().optional(),
        reverse: z.boolean().optional(),
      }),
      hasChildren: true,
      description: 'Horizontal flex layout for arranging children in a row',
    },

    Column: {
      props: z.object({
        align: z.enum(['start', 'center', 'end', 'stretch']).optional(),
        justify: z.enum(['start', 'center', 'end', 'between', 'around', 'evenly']).optional(),
        gap: sizeVariants.optional(),
      }),
      hasChildren: true,
      description: 'Vertical flex layout for arranging children in a column',
    },

    Grid: {
      props: z.object({
        columns: z.number().min(1).max(12).optional(),
        gap: sizeVariants.optional(),
        responsive: z.object({
          sm: z.number().optional(),
          md: z.number().optional(),
          lg: z.number().optional(),
        }).optional(),
      }),
      hasChildren: true,
      description: 'CSS Grid layout with responsive column support',
    },

    Stack: {
      props: z.object({
        direction: z.enum(['horizontal', 'vertical']).optional(),
        spacing: sizeVariants.optional(),
        align: z.enum(['start', 'center', 'end', 'stretch']).optional(),
        divider: z.boolean().optional(),
      }),
      hasChildren: true,
      description: 'Stacked layout with optional dividers between children',
    },

    Spacer: {
      props: z.object({
        size: sizeVariants.optional(),
        flexible: z.boolean().optional(),
      }),
      hasChildren: false,
      description: 'Flexible space element for layouts',
    },

    Divider: {
      props: z.object({
        orientation: z.enum(['horizontal', 'vertical']).optional(),
        variant: z.enum(['solid', 'dashed', 'dotted']).optional(),
        label: z.string().optional(),
      }),
      hasChildren: false,
      description: 'Visual separator for content sections',
    },

    // Card Components
    Card: {
      props: z.object({
        variant: z.enum(['elevated', 'outlined', 'filled', 'ghost']).optional(),
        padding: sizeVariants.optional(),
        rounded: z.enum(['none', 'sm', 'md', 'lg', 'xl', 'full']).optional(),
        hoverable: z.boolean().optional(),
        clickable: z.boolean().optional(),
      }),
      hasChildren: true,
      description: 'Content card with various visual styles',
    },

    CardHeader: {
      props: z.object({
        title: z.string(),
        subtitle: z.string().optional(),
        avatar: z.string().optional(),
        action: z.string().optional(),
      }),
      hasChildren: false,
      description: 'Header section for Card component',
    },

    CardBody: {
      props: z.object({
        padding: sizeVariants.optional(),
      }),
      hasChildren: true,
      description: 'Body section for Card component',
    },

    CardFooter: {
      props: z.object({
        align: z.enum(['start', 'center', 'end', 'between']).optional(),
      }),
      hasChildren: true,
      description: 'Footer section for Card component',
    },

    // Typography Components
    Heading: {
      props: z.object({
        level: z.enum(['1', '2', '3', '4', '5', '6']),
        text: z.string(),
        color: colorVariants.optional(),
        align: z.enum(['left', 'center', 'right']).optional(),
        weight: z.enum(['normal', 'medium', 'semibold', 'bold']).optional(),
      }),
      hasChildren: false,
      description: 'Semantic heading element (h1-h6)',
    },

    Text: {
      props: z.object({
        content: z.string(),
        variant: z.enum(['body', 'caption', 'overline', 'label']).optional(),
        size: sizeVariants.optional(),
        color: colorVariants.optional(),
        weight: z.enum(['normal', 'medium', 'semibold', 'bold']).optional(),
        align: z.enum(['left', 'center', 'right', 'justify']).optional(),
        truncate: z.boolean().optional(),
        lines: z.number().optional(),
      }),
      hasChildren: false,
      description: 'Text element with various styles',
    },

    Link: {
      props: z.object({
        text: z.string(),
        href: z.string(),
        external: z.boolean().optional(),
        variant: z.enum(['default', 'subtle', 'underline']).optional(),
        color: colorVariants.optional(),
      }),
      hasChildren: false,
      description: 'Clickable link element',
    },

    // Button Components
    Button: {
      props: z.object({
        label: z.string(),
        variant: z.enum(['solid', 'outline', 'ghost', 'link', 'soft']).optional(),
        color: colorVariants.optional(),
        size: sizeVariants.optional(),
        fullWidth: z.boolean().optional(),
        disabled: z.boolean().optional(),
        loading: z.boolean().optional(),
        leftIcon: z.string().optional(),
        rightIcon: z.string().optional(),
      }),
      hasChildren: false,
      description: 'Interactive button element',
    },

    IconButton: {
      props: z.object({
        icon: z.string(),
        label: z.string(), // For accessibility
        variant: z.enum(['solid', 'outline', 'ghost', 'soft']).optional(),
        color: colorVariants.optional(),
        size: sizeVariants.optional(),
        rounded: z.boolean().optional(),
      }),
      hasChildren: false,
      description: 'Button with only an icon',
    },

    ButtonGroup: {
      props: z.object({
        attached: z.boolean().optional(),
        orientation: z.enum(['horizontal', 'vertical']).optional(),
        size: sizeVariants.optional(),
      }),
      hasChildren: true,
      description: 'Group of buttons with shared styling',
    },

    // Form Components
    Input: {
      props: z.object({
        label: z.string().optional(),
        placeholder: z.string().optional(),
        type: z.enum(['text', 'email', 'password', 'number', 'tel', 'url', 'search']).optional(),
        size: sizeVariants.optional(),
        variant: z.enum(['outline', 'filled', 'flushed', 'unstyled']).optional(),
        disabled: z.boolean().optional(),
        required: z.boolean().optional(),
        error: z.string().optional(),
        hint: z.string().optional(),
        leftIcon: z.string().optional(),
        rightIcon: z.string().optional(),
        valuePath: z.string().optional(),
      }),
      hasChildren: false,
      description: 'Text input field',
    },

    TextArea: {
      props: z.object({
        label: z.string().optional(),
        placeholder: z.string().optional(),
        rows: z.number().optional(),
        resize: z.enum(['none', 'vertical', 'horizontal', 'both']).optional(),
        disabled: z.boolean().optional(),
        required: z.boolean().optional(),
        error: z.string().optional(),
        valuePath: z.string().optional(),
      }),
      hasChildren: false,
      description: 'Multi-line text input',
    },

    Select: {
      props: z.object({
        label: z.string().optional(),
        placeholder: z.string().optional(),
        options: z.array(z.object({
          label: z.string(),
          value: z.string(),
          disabled: z.boolean().optional(),
        })),
        size: sizeVariants.optional(),
        disabled: z.boolean().optional(),
        required: z.boolean().optional(),
        error: z.string().optional(),
        valuePath: z.string().optional(),
      }),
      hasChildren: false,
      description: 'Dropdown select input',
    },

    Checkbox: {
      props: z.object({
        label: z.string(),
        checked: z.boolean().optional(),
        disabled: z.boolean().optional(),
        indeterminate: z.boolean().optional(),
        size: sizeVariants.optional(),
        valuePath: z.string().optional(),
      }),
      hasChildren: false,
      description: 'Checkbox input',
    },

    Radio: {
      props: z.object({
        label: z.string(),
        value: z.string(),
        disabled: z.boolean().optional(),
        size: sizeVariants.optional(),
      }),
      hasChildren: false,
      description: 'Radio button input',
    },

    RadioGroup: {
      props: z.object({
        label: z.string().optional(),
        orientation: z.enum(['horizontal', 'vertical']).optional(),
        valuePath: z.string().optional(),
      }),
      hasChildren: true,
      description: 'Group of radio buttons',
    },

    Switch: {
      props: z.object({
        label: z.string().optional(),
        checked: z.boolean().optional(),
        disabled: z.boolean().optional(),
        size: sizeVariants.optional(),
        valuePath: z.string().optional(),
      }),
      hasChildren: false,
      description: 'Toggle switch input',
    },

    Slider: {
      props: z.object({
        label: z.string().optional(),
        min: z.number().optional(),
        max: z.number().optional(),
        step: z.number().optional(),
        showValue: z.boolean().optional(),
        valuePath: z.string().optional(),
      }),
      hasChildren: false,
      description: 'Range slider input',
    },

    // Data Display Components
    Badge: {
      props: z.object({
        text: z.string(),
        variant: z.enum(['solid', 'subtle', 'outline']).optional(),
        color: colorVariants.optional(),
        size: sizeVariants.optional(),
        rounded: z.boolean().optional(),
      }),
      hasChildren: false,
      description: 'Small label for status or metadata',
    },

    Avatar: {
      props: z.object({
        src: z.string().optional(),
        name: z.string().optional(),
        size: sizeVariants.optional(),
        rounded: z.enum(['none', 'sm', 'md', 'lg', 'full']).optional(),
        status: z.enum(['online', 'offline', 'away', 'busy']).optional(),
      }),
      hasChildren: false,
      description: 'User avatar image or initials',
    },

    AvatarGroup: {
      props: z.object({
        max: z.number().optional(),
        size: sizeVariants.optional(),
      }),
      hasChildren: true,
      description: 'Group of overlapping avatars',
    },

    Icon: {
      props: z.object({
        name: z.string(),
        size: sizeVariants.optional(),
        color: colorVariants.optional(),
      }),
      hasChildren: false,
      description: 'Icon from icon library',
    },

    Image: {
      props: z.object({
        src: z.string(),
        alt: z.string(),
        width: z.number().optional(),
        height: z.number().optional(),
        fit: z.enum(['cover', 'contain', 'fill', 'none']).optional(),
        rounded: z.enum(['none', 'sm', 'md', 'lg', 'xl', 'full']).optional(),
        fallback: z.string().optional(),
      }),
      hasChildren: false,
      description: 'Image with loading and error states',
    },

    List: {
      props: z.object({
        variant: z.enum(['unordered', 'ordered', 'none']).optional(),
        spacing: sizeVariants.optional(),
      }),
      hasChildren: true,
      description: 'List container',
    },

    ListItem: {
      props: z.object({
        icon: z.string().optional(),
      }),
      hasChildren: true,
      description: 'List item',
    },

    Table: {
      props: z.object({
        variant: z.enum(['simple', 'striped', 'bordered']).optional(),
        size: sizeVariants.optional(),
        stickyHeader: z.boolean().optional(),
      }),
      hasChildren: true,
      description: 'Data table container',
    },

    TableHeader: {
      props: z.object({}),
      hasChildren: true,
      description: 'Table header row container',
    },

    TableBody: {
      props: z.object({}),
      hasChildren: true,
      description: 'Table body container',
    },

    TableRow: {
      props: z.object({
        hoverable: z.boolean().optional(),
        selected: z.boolean().optional(),
      }),
      hasChildren: true,
      description: 'Table row',
    },

    TableCell: {
      props: z.object({
        header: z.boolean().optional(),
        align: z.enum(['left', 'center', 'right']).optional(),
        width: z.string().optional(),
      }),
      hasChildren: true,
      description: 'Table cell',
    },

    Metric: {
      props: z.object({
        label: z.string(),
        value: z.string(),
        change: z.string().optional(),
        changeType: z.enum(['positive', 'negative', 'neutral']).optional(),
        icon: z.string().optional(),
        valuePath: z.string().optional(),
        format: z.enum(['currency', 'percent', 'number', 'compact']).optional(),
      }),
      hasChildren: false,
      description: 'Metric display with label and value',
    },

    Progress: {
      props: z.object({
        value: z.number(),
        max: z.number().optional(),
        size: sizeVariants.optional(),
        color: colorVariants.optional(),
        showValue: z.boolean().optional(),
        variant: z.enum(['linear', 'circular']).optional(),
      }),
      hasChildren: false,
      description: 'Progress indicator',
    },

    // Feedback Components
    Alert: {
      props: z.object({
        title: z.string().optional(),
        description: z.string(),
        variant: z.enum(['solid', 'subtle', 'outline', 'left-accent']).optional(),
        status: z.enum(['info', 'success', 'warning', 'error']),
        closable: z.boolean().optional(),
        icon: z.string().optional(),
      }),
      hasChildren: false,
      description: 'Alert message for user feedback',
    },

    Toast: {
      props: z.object({
        title: z.string(),
        description: z.string().optional(),
        status: z.enum(['info', 'success', 'warning', 'error']),
        duration: z.number().optional(),
      }),
      hasChildren: false,
      description: 'Temporary notification message',
    },

    Skeleton: {
      props: z.object({
        variant: z.enum(['text', 'circular', 'rectangular', 'rounded']).optional(),
        width: z.string().optional(),
        height: z.string().optional(),
        lines: z.number().optional(),
      }),
      hasChildren: false,
      description: 'Loading placeholder',
    },

    Spinner: {
      props: z.object({
        size: sizeVariants.optional(),
        color: colorVariants.optional(),
        label: z.string().optional(),
      }),
      hasChildren: false,
      description: 'Loading spinner',
    },

    EmptyState: {
      props: z.object({
        icon: z.string().optional(),
        title: z.string(),
        description: z.string().optional(),
        actionLabel: z.string().optional(),
      }),
      hasChildren: false,
      description: 'Empty state placeholder',
    },

    // Navigation Components
    Tabs: {
      props: z.object({
        variant: z.enum(['line', 'enclosed', 'pills', 'soft-rounded']).optional(),
        size: sizeVariants.optional(),
        orientation: z.enum(['horizontal', 'vertical']).optional(),
        defaultValue: z.string().optional(),
      }),
      hasChildren: true,
      description: 'Tabbed navigation',
    },

    TabList: {
      props: z.object({}),
      hasChildren: true,
      description: 'Tab list container',
    },

    Tab: {
      props: z.object({
        value: z.string(),
        label: z.string(),
        icon: z.string().optional(),
        disabled: z.boolean().optional(),
      }),
      hasChildren: false,
      description: 'Individual tab button',
    },

    TabPanel: {
      props: z.object({
        value: z.string(),
      }),
      hasChildren: true,
      description: 'Tab content panel',
    },

    Breadcrumb: {
      props: z.object({
        separator: z.string().optional(),
      }),
      hasChildren: true,
      description: 'Breadcrumb navigation',
    },

    BreadcrumbItem: {
      props: z.object({
        label: z.string(),
        href: z.string().optional(),
        current: z.boolean().optional(),
      }),
      hasChildren: false,
      description: 'Breadcrumb item',
    },

    Pagination: {
      props: z.object({
        totalPages: z.number(),
        currentPage: z.number().optional(),
        showFirstLast: z.boolean().optional(),
        size: sizeVariants.optional(),
      }),
      hasChildren: false,
      description: 'Pagination controls',
    },

    NavMenu: {
      props: z.object({
        orientation: z.enum(['horizontal', 'vertical']).optional(),
      }),
      hasChildren: true,
      description: 'Navigation menu',
    },

    NavItem: {
      props: z.object({
        label: z.string(),
        href: z.string().optional(),
        icon: z.string().optional(),
        active: z.boolean().optional(),
        badge: z.string().optional(),
      }),
      hasChildren: false,
      description: 'Navigation menu item',
    },

    // Overlay Components
    Modal: {
      props: z.object({
        title: z.string().optional(),
        size: z.enum(['sm', 'md', 'lg', 'xl', 'full']).optional(),
        closable: z.boolean().optional(),
      }),
      hasChildren: true,
      description: 'Modal dialog',
    },

    Drawer: {
      props: z.object({
        title: z.string().optional(),
        placement: z.enum(['left', 'right', 'top', 'bottom']).optional(),
        size: z.enum(['sm', 'md', 'lg', 'xl', 'full']).optional(),
        closable: z.boolean().optional(),
      }),
      hasChildren: true,
      description: 'Drawer panel',
    },

    Tooltip: {
      props: z.object({
        content: z.string(),
        placement: z.enum(['top', 'right', 'bottom', 'left']).optional(),
      }),
      hasChildren: true,
      description: 'Tooltip on hover',
    },

    Popover: {
      props: z.object({
        trigger: z.enum(['click', 'hover']).optional(),
        placement: z.enum(['top', 'right', 'bottom', 'left']).optional(),
      }),
      hasChildren: true,
      description: 'Popover content',
    },

    Dropdown: {
      props: z.object({
        trigger: z.string(),
        placement: z.enum(['bottom-start', 'bottom-end', 'top-start', 'top-end']).optional(),
      }),
      hasChildren: true,
      description: 'Dropdown menu',
    },

    DropdownItem: {
      props: z.object({
        label: z.string(),
        icon: z.string().optional(),
        disabled: z.boolean().optional(),
        destructive: z.boolean().optional(),
      }),
      hasChildren: false,
      description: 'Dropdown menu item',
    },

    // Collapse & Accordion
    Accordion: {
      props: z.object({
        allowMultiple: z.boolean().optional(),
        defaultExpanded: z.array(z.string()).optional(),
      }),
      hasChildren: true,
      description: 'Accordion container',
    },

    AccordionItem: {
      props: z.object({
        value: z.string(),
        title: z.string(),
        icon: z.string().optional(),
      }),
      hasChildren: true,
      description: 'Accordion item',
    },

    Collapsible: {
      props: z.object({
        title: z.string(),
        defaultOpen: z.boolean().optional(),
      }),
      hasChildren: true,
      description: 'Collapsible section',
    },

    // Specialized Components
    Chart: {
      props: z.object({
        type: z.enum(['line', 'bar', 'pie', 'donut', 'area', 'scatter']),
        dataPath: z.string(),
        height: z.number().optional(),
        showLegend: z.boolean().optional(),
        showGrid: z.boolean().optional(),
        colors: z.array(z.string()).optional(),
      }),
      hasChildren: false,
      description: 'Data visualization chart',
    },

    Calendar: {
      props: z.object({
        mode: z.enum(['single', 'range', 'multiple']).optional(),
        showWeekNumbers: z.boolean().optional(),
      }),
      hasChildren: false,
      description: 'Calendar date picker',
    },

    DatePicker: {
      props: z.object({
        label: z.string().optional(),
        placeholder: z.string().optional(),
        format: z.string().optional(),
        valuePath: z.string().optional(),
      }),
      hasChildren: false,
      description: 'Date input with calendar',
    },

    FileUpload: {
      props: z.object({
        label: z.string().optional(),
        accept: z.string().optional(),
        multiple: z.boolean().optional(),
        maxSize: z.number().optional(),
      }),
      hasChildren: false,
      description: 'File upload input',
    },

    Rating: {
      props: z.object({
        max: z.number().optional(),
        value: z.number().optional(),
        readonly: z.boolean().optional(),
        size: sizeVariants.optional(),
      }),
      hasChildren: false,
      description: 'Star rating input',
    },

    TagInput: {
      props: z.object({
        label: z.string().optional(),
        placeholder: z.string().optional(),
        valuePath: z.string().optional(),
      }),
      hasChildren: false,
      description: 'Tag/chip input',
    },

    ColorPicker: {
      props: z.object({
        label: z.string().optional(),
        valuePath: z.string().optional(),
      }),
      hasChildren: false,
      description: 'Color selection input',
    },

    Timeline: {
      props: z.object({
        orientation: z.enum(['vertical', 'horizontal']).optional(),
      }),
      hasChildren: true,
      description: 'Timeline container',
    },

    TimelineItem: {
      props: z.object({
        title: z.string(),
        description: z.string().optional(),
        time: z.string().optional(),
        icon: z.string().optional(),
        status: z.enum(['completed', 'current', 'upcoming']).optional(),
      }),
      hasChildren: false,
      description: 'Timeline item',
    },

    Stepper: {
      props: z.object({
        currentStep: z.number().optional(),
        orientation: z.enum(['horizontal', 'vertical']).optional(),
      }),
      hasChildren: true,
      description: 'Step indicator',
    },

    Step: {
      props: z.object({
        title: z.string(),
        description: z.string().optional(),
        icon: z.string().optional(),
      }),
      hasChildren: false,
      description: 'Individual step',
    },

    Code: {
      props: z.object({
        code: z.string(),
        language: z.string().optional(),
        showLineNumbers: z.boolean().optional(),
        highlightLines: z.array(z.number()).optional(),
      }),
      hasChildren: false,
      description: 'Code block with syntax highlighting',
    },

    Kbd: {
      props: z.object({
        keys: z.array(z.string()),
      }),
      hasChildren: false,
      description: 'Keyboard shortcut display',
    },

    Quote: {
      props: z.object({
        text: z.string(),
        author: z.string().optional(),
        source: z.string().optional(),
      }),
      hasChildren: false,
      description: 'Blockquote with attribution',
    },

    Stat: {
      props: z.object({
        label: z.string(),
        value: z.string(),
        helpText: z.string().optional(),
        icon: z.string().optional(),
        trend: z.object({
          value: z.string(),
          direction: z.enum(['up', 'down']),
        }).optional(),
      }),
      hasChildren: false,
      description: 'Statistic display',
    },

    Tag: {
      props: z.object({
        label: z.string(),
        color: colorVariants.optional(),
        variant: z.enum(['solid', 'subtle', 'outline']).optional(),
        size: sizeVariants.optional(),
        closable: z.boolean().optional(),
      }),
      hasChildren: false,
      description: 'Tag/chip element',
    },
  },

  // Actions that can be triggered from components
  actions: {
    navigate: {
      description: 'Navigate to a URL or route',
    },
    submit: {
      description: 'Submit form data',
    },
    openModal: {
      description: 'Open a modal dialog',
    },
    closeModal: {
      description: 'Close the current modal',
    },
    showToast: {
      description: 'Display a toast notification',
    },
    refresh: {
      description: 'Refresh data or view',
    },
    export: {
      description: 'Export data to file',
    },
    copy: {
      description: 'Copy content to clipboard',
    },
    delete: {
      description: 'Delete an item with confirmation',
    },
    edit: {
      description: 'Edit an item',
    },
  },
});

// Export type for catalog components
export type BaseCatalogComponents = typeof baseCatalog extends { components: infer C } ? keyof C : never;
export type { UITree as BaseUITree } from '@json-render/core';
