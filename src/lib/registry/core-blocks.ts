/**
 * Core Block Definitions
 *
 * Defines all 78 core component types as BlockDefinition objects.
 * This is the single source of truth for component metadata that was
 * previously scattered across VALID_COMPONENT_TYPES (schemas.ts),
 * COMPONENT_REFERENCE (prompts.ts), and the framework registries.
 *
 * Renderers are null here — they get attached when a framework registry is loaded.
 *
 * Categories and props match the existing COMPONENT_REFERENCE documentation.
 */

import type { BlockDefinition, BlockKind, PropDefinition } from './block-registry';
import type { ComponentCategory } from '@/lib/mcp/types';

// ============================================================================
// Helper Functions
// ============================================================================

function coreBlock(
  name: string,
  kind: BlockKind,
  category: ComponentCategory,
  description: string,
  props: PropDefinition[],
  tags: string[] = [],
  defaultProps: Record<string, unknown> = {}
): BlockDefinition {
  return {
    type: `core::${name}`,
    kind,
    tier: 'core',
    source: 'core',
    renderer: null,
    category,
    description,
    props,
    defaultProps,
    tags: [name.toLowerCase(), ...tags],
  };
}

function prop(
  name: string,
  type: string,
  required = false,
  description = ''
): PropDefinition {
  return { name, type, required, description };
}

// ============================================================================
// Core Block Definitions (78 components)
// ============================================================================

export const CORE_BLOCK_DEFINITIONS: BlockDefinition[] = [
  // ==========================================================================
  // Layout (7)
  // ==========================================================================
  coreBlock('Container', 'layout', 'layout', 'Content wrapper with max width constraint', [
    prop('maxWidth', 'string', false, 'Max width (sm, md, lg, xl)'),
    prop('centered', 'boolean', false, 'Center content horizontally'),
    prop('className', 'string', false, 'Additional CSS classes'),
  ], ['wrapper', 'section'], { className: 'p-6 border border-dashed border-gray-300 rounded-lg min-h-[80px]', maxWidth: 'lg', centered: true }),

  coreBlock('Row', 'layout', 'layout', 'Horizontal flex layout', [
    prop('align', 'string', false, 'Vertical alignment (start, center, end, stretch)'),
    prop('justify', 'string', false, 'Horizontal justification (start, center, end, between, around)'),
    prop('gap', 'string', true, 'Gap between children (xs, sm, md, lg, xl)'),
    prop('wrap', 'boolean', false, 'Allow wrapping to next line'),
  ], ['flex', 'horizontal'], { gap: 'md', align: 'center', className: 'p-4 border border-dashed border-blue-200 rounded min-h-[60px]' }),

  coreBlock('Column', 'layout', 'layout', 'Vertical flex layout', [
    prop('align', 'string', false, 'Horizontal alignment (start, center, end, stretch)'),
    prop('justify', 'string', false, 'Vertical justification (start, center, end, between)'),
    prop('gap', 'string', true, 'Gap between children (xs, sm, md, lg, xl)'),
  ], ['flex', 'vertical'], { gap: 'md', className: 'p-4 border border-dashed border-green-200 rounded min-h-[60px]' }),

  coreBlock('Grid', 'layout', 'layout', 'Grid layout with columns', [
    prop('cols', 'number', true, 'Number of columns'),
    prop('gap', 'string', true, 'Gap between items (xs, sm, md, lg, xl)'),
    prop('responsive', 'boolean', false, 'Enable responsive column adjustment'),
  ], ['grid', 'columns'], { cols: 2, gap: 'md', className: 'p-4 border border-dashed border-purple-200 rounded min-h-[60px]' }),

  coreBlock('Stack', 'layout', 'layout', 'Stack layout with uniform spacing', [
    prop('direction', 'string', false, 'Stack direction (horizontal, vertical)'),
    prop('spacing', 'string', true, 'Spacing between items (xs, sm, md, lg, xl)'),
    prop('align', 'string', false, 'Cross-axis alignment'),
  ], ['flex', 'stack'], { spacing: 'md', direction: 'vertical', className: 'p-4 border border-dashed border-yellow-200 rounded min-h-[60px]' }),

  coreBlock('Spacer', 'layout', 'layout', 'Flexible space between elements', [
    prop('size', 'string', false, 'Fixed size (xs, sm, md, lg, xl)'),
    prop('flexible', 'boolean', false, 'Grow to fill available space'),
  ], ['space', 'gap'], { size: 'md' }),

  coreBlock('Divider', 'layout', 'layout', 'Visual separator between sections', [
    prop('orientation', 'string', false, 'Orientation (horizontal, vertical)'),
    prop('variant', 'string', false, 'Visual style (solid, dashed, dotted)'),
    prop('label', 'string', false, 'Optional text label on divider'),
  ], ['separator', 'hr'], { orientation: 'horizontal', variant: 'solid' }),

  // ==========================================================================
  // Card (4)
  // ==========================================================================
  coreBlock('Card', 'content', 'cards', 'Card container with optional styles', [
    prop('variant', 'string', false, 'Card style variant (outlined, elevated, filled)'),
    prop('padding', 'string', false, 'Internal padding (sm, md, lg)'),
    prop('rounded', 'string', false, 'Border radius (sm, md, lg, full)'),
    prop('hoverable', 'boolean', false, 'Enable hover elevation effect'),
  ], ['card', 'panel'], { variant: 'outlined', padding: 'md', rounded: 'md' }),

  coreBlock('CardHeader', 'content', 'cards', 'Card header section', [
    prop('title', 'string', true, 'Header title text'),
    prop('subtitle', 'string', false, 'Subtitle text below title'),
    prop('avatar', 'string', false, 'Avatar image URL'),
  ], ['card-header'], { title: 'Card Title', subtitle: 'Card subtitle' }),

  coreBlock('CardBody', 'content', 'cards', 'Card body content area', [
    prop('padding', 'string', false, 'Content padding (sm, md, lg)'),
  ], ['card-body', 'card-content'], { padding: 'md' }),

  coreBlock('CardFooter', 'content', 'cards', 'Card footer section', [
    prop('align', 'string', false, 'Footer content alignment (left, center, right)'),
  ], ['card-footer'], { align: 'right' }),

  // ==========================================================================
  // Typography (3)
  // ==========================================================================
  coreBlock('Heading', 'content', 'typography', 'Heading text element', [
    prop('level', 'string', true, 'Heading level (1-6)'),
    prop('text', 'string', true, 'Heading content text'),
    prop('color', 'string', false, 'Text color'),
    prop('align', 'string', false, 'Text alignment (left, center, right)'),
  ], ['heading', 'title', 'h1', 'h2', 'h3'], { level: '2', text: 'Heading Text' }),

  coreBlock('Text', 'content', 'typography', 'Paragraph text element', [
    prop('content', 'string', true, 'Text content (1-3 real sentences)'),
    prop('variant', 'string', false, 'Text style variant (body, caption, overline)'),
    prop('size', 'string', false, 'Font size (xs, sm, md, lg, xl)'),
    prop('color', 'string', false, 'Text color'),
  ], ['text', 'paragraph', 'body'], { content: 'This is a paragraph of text. You can edit it in the props panel on the right.', variant: 'body', size: 'md' }),

  coreBlock('Link', 'navigation', 'typography', 'Hyperlink element', [
    prop('text', 'string', true, 'Descriptive link text'),
    prop('href', 'string', false, 'Link destination URL'),
    prop('external', 'boolean', false, 'Open in new tab'),
  ], ['link', 'anchor', 'href'], { text: 'Click here', href: '#' }),

  // ==========================================================================
  // Buttons (3)
  // ==========================================================================
  coreBlock('Button', 'interactive', 'forms', 'Clickable button element', [
    prop('label', 'string', true, 'Button action text'),
    prop('variant', 'string', false, 'Button style (solid, outline, ghost, link)'),
    prop('color', 'string', false, 'Button color (primary, secondary, success, warning, error)'),
    prop('size', 'string', false, 'Button size (xs, sm, md, lg, xl)'),
    prop('leftIcon', 'string', false, 'Icon name on the left'),
    prop('rightIcon', 'string', false, 'Icon name on the right'),
  ], ['button', 'action', 'cta'], { label: 'Button', variant: 'solid', color: 'primary', size: 'md' }),

  coreBlock('IconButton', 'interactive', 'forms', 'Icon-only button', [
    prop('icon', 'string', true, 'Icon name'),
    prop('label', 'string', true, 'Accessible label text'),
    prop('variant', 'string', false, 'Button style variant'),
    prop('size', 'string', false, 'Button size'),
  ], ['icon-button', 'action'], { icon: 'settings', label: 'Settings', variant: 'outline', size: 'md' }),

  coreBlock('ButtonGroup', 'interactive', 'forms', 'Group of related buttons', [
    prop('attached', 'boolean', false, 'Attach buttons together without gaps'),
    prop('orientation', 'string', false, 'Group orientation (horizontal, vertical)'),
  ], ['button-group'], { orientation: 'horizontal' }),

  // ==========================================================================
  // Forms (8)
  // ==========================================================================
  coreBlock('Input', 'interactive', 'inputs', 'Text input field', [
    prop('label', 'string', false, 'Input label'),
    prop('placeholder', 'string', false, 'Placeholder text'),
    prop('type', 'string', false, 'Input type (text, email, password, number)'),
    prop('error', 'string', false, 'Error message'),
    prop('valuePath', 'string', false, 'Data binding path'),
  ], ['input', 'form', 'text-field'], { label: 'Label', placeholder: 'Enter text...', type: 'text' }),

  coreBlock('TextArea', 'interactive', 'inputs', 'Multiline text input', [
    prop('label', 'string', false, 'TextArea label'),
    prop('placeholder', 'string', false, 'Placeholder text'),
    prop('rows', 'number', false, 'Number of visible rows'),
    prop('valuePath', 'string', false, 'Data binding path'),
  ], ['textarea', 'form', 'multiline'], { label: 'Message', placeholder: 'Type your message...', rows: 4 }),

  coreBlock('Select', 'interactive', 'inputs', 'Dropdown select input', [
    prop('label', 'string', false, 'Select label'),
    prop('options', 'array', false, 'Array of {label, value} options'),
    prop('valuePath', 'string', false, 'Data binding path'),
  ], ['select', 'form', 'dropdown'], { label: 'Select option', options: [{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }, { label: 'Option 3', value: '3' }] }),

  coreBlock('Checkbox', 'interactive', 'inputs', 'Checkbox input', [
    prop('label', 'string', false, 'Checkbox label'),
    prop('checked', 'boolean', false, 'Checked state'),
    prop('valuePath', 'string', false, 'Data binding path'),
  ], ['checkbox', 'form', 'toggle'], { label: 'Check this option' }),

  coreBlock('Radio', 'interactive', 'inputs', 'Radio button input', [
    prop('label', 'string', false, 'Radio label'),
    prop('value', 'string', false, 'Radio value'),
  ], ['radio', 'form'], { label: 'Radio option', value: 'option1' }),

  coreBlock('RadioGroup', 'interactive', 'inputs', 'Group of radio buttons', [
    prop('label', 'string', false, 'Group label'),
    prop('orientation', 'string', false, 'Layout orientation (horizontal, vertical)'),
    prop('valuePath', 'string', false, 'Data binding path'),
  ], ['radio-group', 'form'], { label: 'Choose one', orientation: 'vertical' }),

  coreBlock('Switch', 'interactive', 'inputs', 'Toggle switch input', [
    prop('label', 'string', false, 'Switch label'),
    prop('checked', 'boolean', false, 'Toggle state'),
    prop('valuePath', 'string', false, 'Data binding path'),
  ], ['switch', 'form', 'toggle'], { label: 'Enable feature' }),

  coreBlock('Slider', 'interactive', 'inputs', 'Range slider input', [
    prop('label', 'string', false, 'Slider label'),
    prop('min', 'number', false, 'Minimum value'),
    prop('max', 'number', false, 'Maximum value'),
    prop('step', 'number', false, 'Step increment'),
    prop('valuePath', 'string', false, 'Data binding path'),
  ], ['slider', 'form', 'range'], { label: 'Volume', min: 0, max: 100, step: 1 }),

  // ==========================================================================
  // Data Display (14)
  // ==========================================================================
  coreBlock('Badge', 'content', 'data-display', 'Small status badge or label', [
    prop('text', 'string', true, 'Badge text content'),
    prop('variant', 'string', false, 'Badge style variant (solid, subtle, outline)'),
    prop('color', 'string', false, 'Badge color'),
    prop('size', 'string', false, 'Badge size (sm, md, lg)'),
  ], ['badge', 'tag', 'label'], { text: 'Badge', variant: 'solid', color: 'primary', size: 'md' }),

  coreBlock('Avatar', 'media', 'data-display', 'User avatar image', [
    prop('src', 'string', false, 'Image URL (picsum)'),
    prop('name', 'string', true, 'User name for fallback initials'),
    prop('size', 'string', false, 'Avatar size (xs, sm, md, lg, xl)'),
    prop('status', 'string', false, 'Online status indicator (online, offline, busy)'),
  ], ['avatar', 'user', 'profile'], { name: 'John Doe', size: 'md' }),

  coreBlock('AvatarGroup', 'media', 'data-display', 'Group of overlapping avatars', [
    prop('max', 'number', false, 'Maximum visible avatars before +N'),
    prop('size', 'string', false, 'Avatar size'),
  ], ['avatar-group', 'users'], { max: 3, size: 'md' }),

  coreBlock('Icon', 'media', 'data-display', 'Icon element', [
    prop('name', 'string', true, 'Icon name (e.g., users, search, settings)'),
    prop('size', 'string', false, 'Icon size'),
    prop('color', 'string', false, 'Icon color'),
  ], ['icon', 'glyph'], { name: 'star', size: 'md' }),

  coreBlock('Image', 'media', 'media', 'Image element', [
    prop('src', 'string', true, 'Image source URL (use picsum.photos)'),
    prop('alt', 'string', true, 'Alternative text description'),
    prop('width', 'number', false, 'Image width in pixels'),
    prop('height', 'number', false, 'Image height in pixels'),
    prop('rounded', 'string', false, 'Border radius (sm, md, lg, full)'),
  ], ['image', 'photo', 'picture'], { src: 'https://picsum.photos/seed/demo/400/300', alt: 'Placeholder image', rounded: 'md' }),

  coreBlock('List', 'content', 'data-display', 'Ordered or unordered list', [
    prop('variant', 'string', false, 'List style (unordered, ordered)'),
    prop('spacing', 'string', false, 'Space between items'),
  ], ['list', 'ul', 'ol'], { variant: 'unordered', spacing: 'sm' }),

  coreBlock('ListItem', 'content', 'data-display', 'List item element', [
    prop('icon', 'string', false, 'Leading icon name'),
    prop('text', 'string', false, 'Item text content'),
  ], ['list-item', 'li'], { text: 'List item' }),

  coreBlock('Table', 'data', 'data-display', 'Data table container', [
    prop('variant', 'string', false, 'Table style variant'),
    prop('size', 'string', false, 'Table density (sm, md, lg)'),
  ], ['table', 'data-table', 'grid'], { variant: 'simple', size: 'md' }),

  coreBlock('TableHeader', 'data', 'data-display', 'Table header row container', [], ['thead'], {}),

  coreBlock('TableBody', 'data', 'data-display', 'Table body rows container', [], ['tbody'], {}),

  coreBlock('TableRow', 'data', 'data-display', 'Table row element', [
    prop('hoverable', 'boolean', false, 'Enable hover highlight'),
  ], ['tr', 'table-row'], { hoverable: true }),

  coreBlock('TableCell', 'data', 'data-display', 'Table cell element', [
    prop('header', 'boolean', false, 'Render as header cell (th)'),
    prop('align', 'string', false, 'Text alignment (left, center, right)'),
  ], ['td', 'th', 'table-cell'], { align: 'left' }),

  coreBlock('Metric', 'data', 'data-display', 'Key metric display with value and change indicator', [
    prop('label', 'string', true, 'Metric label (e.g., "Revenue")'),
    prop('value', 'string', true, 'Formatted value (e.g., "$45K")'),
    prop('change', 'string', false, 'Change amount (e.g., "+23%")'),
    prop('changeType', 'string', false, 'Change direction (positive, negative, neutral)'),
    prop('icon', 'string', false, 'Associated icon name'),
  ], ['metric', 'kpi', 'stat', 'dashboard'], { label: 'Revenue', value: '$45,231', change: '+20.1%', changeType: 'positive' }),

  coreBlock('Progress', 'data', 'data-display', 'Progress bar indicator', [
    prop('value', 'number', true, 'Progress value (0-100)'),
    prop('variant', 'string', false, 'Progress bar style'),
    prop('max', 'number', false, 'Maximum value'),
    prop('label', 'string', false, 'Progress label text'),
    prop('color', 'string', false, 'Bar color'),
  ], ['progress', 'loading', 'bar'], { value: 65, max: 100, label: 'Progress', color: 'primary' }),

  // ==========================================================================
  // Feedback (5)
  // ==========================================================================
  coreBlock('Alert', 'content', 'feedback', 'Alert or notification message', [
    prop('description', 'string', true, 'Alert description text'),
    prop('status', 'string', true, 'Alert status (info, success, warning, error)'),
    prop('closable', 'boolean', false, 'Show close button'),
    prop('title', 'string', false, 'Optional alert title'),
  ], ['alert', 'notification', 'message'], { title: 'Heads up!', description: 'This is an informational alert message.', status: 'info' }),

  coreBlock('Toast', 'content', 'feedback', 'Temporary toast notification', [
    prop('title', 'string', false, 'Toast title'),
    prop('description', 'string', false, 'Toast message text'),
    prop('status', 'string', false, 'Toast status (info, success, warning, error)'),
  ], ['toast', 'notification', 'snackbar'], { title: 'Success', description: 'Operation completed successfully.', status: 'success' }),

  coreBlock('Skeleton', 'content', 'feedback', 'Content loading placeholder', [
    prop('variant', 'string', false, 'Skeleton shape (text, circle, rect)'),
    prop('width', 'string', false, 'Skeleton width'),
    prop('height', 'string', false, 'Skeleton height'),
  ], ['skeleton', 'loading', 'placeholder'], { variant: 'text', width: '100%', height: '20px' }),

  coreBlock('Spinner', 'content', 'feedback', 'Loading spinner indicator', [
    prop('size', 'string', false, 'Spinner size (xs, sm, md, lg, xl)'),
    prop('color', 'string', false, 'Spinner color'),
  ], ['spinner', 'loading', 'loader'], { size: 'md', color: 'primary' }),

  coreBlock('EmptyState', 'content', 'feedback', 'Empty state placeholder with message', [
    prop('icon', 'string', false, 'Illustration icon name'),
    prop('title', 'string', false, 'Empty state title'),
    prop('description', 'string', false, 'Descriptive message'),
  ], ['empty-state', 'no-data', 'placeholder'], { icon: 'inbox', title: 'No data', description: 'There are no items to display yet.' }),

  // ==========================================================================
  // Navigation (9)
  // ==========================================================================
  coreBlock('Tabs', 'navigation', 'navigation', 'Tabbed navigation container', [
    prop('variant', 'string', false, 'Tab style (line, enclosed, soft-rounded)'),
    prop('size', 'string', false, 'Tab size'),
    prop('defaultValue', 'string', false, 'Default active tab value'),
  ], ['tabs', 'tabbed'], { variant: 'line', defaultValue: 'tab1' }),

  coreBlock('TabList', 'navigation', 'navigation', 'Tab list header containing tab triggers', [],
    ['tab-list'], {}),

  coreBlock('Tab', 'navigation', 'navigation', 'Individual tab trigger', [
    prop('value', 'string', false, 'Tab identifier value'),
    prop('label', 'string', false, 'Tab label text'),
    prop('icon', 'string', false, 'Tab icon name'),
  ], ['tab', 'tab-trigger'], { label: 'Tab', value: 'tab1' }),

  coreBlock('TabPanel', 'navigation', 'navigation', 'Tab content panel', [
    prop('value', 'string', false, 'Panel identifier matching tab value'),
  ], ['tab-panel', 'tab-content'], { value: 'tab1' }),

  coreBlock('Breadcrumb', 'navigation', 'navigation', 'Breadcrumb navigation trail', [
    prop('separator', 'string', false, 'Separator character (/, >, -)'),
  ], ['breadcrumb', 'breadcrumbs', 'trail'], { separator: '/' }),

  coreBlock('BreadcrumbItem', 'navigation', 'navigation', 'Individual breadcrumb link', [
    prop('label', 'string', false, 'Breadcrumb label text'),
    prop('href', 'string', false, 'Link destination'),
  ], ['breadcrumb-item'], { label: 'Home', href: '#' }),

  coreBlock('Pagination', 'navigation', 'navigation', 'Page navigation controls', [
    prop('totalPages', 'number', false, 'Total number of pages'),
    prop('currentPage', 'number', false, 'Currently active page'),
  ], ['pagination', 'pager', 'pages'], { totalPages: 10, currentPage: 1 }),

  coreBlock('NavMenu', 'navigation', 'navigation', 'Navigation menu container', [
    prop('orientation', 'string', false, 'Menu orientation (horizontal, vertical)'),
  ], ['nav-menu', 'navigation', 'sidebar'], { orientation: 'horizontal' }),

  coreBlock('NavItem', 'navigation', 'navigation', 'Navigation menu item', [
    prop('label', 'string', false, 'Item label text'),
    prop('href', 'string', false, 'Link destination'),
    prop('icon', 'string', false, 'Item icon name'),
  ], ['nav-item', 'menu-item'], { label: 'Nav Item', href: '#' }),

  // ==========================================================================
  // Overlays (6)
  // ==========================================================================
  coreBlock('Modal', 'interactive', 'overlay', 'Modal dialog overlay', [
    prop('title', 'string', false, 'Modal title'),
    prop('size', 'string', false, 'Modal size (sm, md, lg, xl, full)'),
  ], ['modal', 'dialog', 'popup'], { title: 'Modal Title', size: 'md' }),

  coreBlock('Drawer', 'interactive', 'overlay', 'Slide-out drawer panel', [
    prop('title', 'string', false, 'Drawer title'),
    prop('placement', 'string', false, 'Slide direction (left, right, top, bottom)'),
    prop('size', 'string', false, 'Drawer width (sm, md, lg)'),
  ], ['drawer', 'sidebar', 'panel'], { title: 'Drawer Title', placement: 'right', size: 'md' }),

  coreBlock('Tooltip', 'interactive', 'overlay', 'Informational tooltip popup', [
    prop('content', 'string', false, 'Tooltip text content'),
    prop('placement', 'string', false, 'Position (top, bottom, left, right)'),
  ], ['tooltip', 'hint', 'info'], { content: 'Tooltip text', placement: 'top' }),

  coreBlock('Popover', 'interactive', 'overlay', 'Rich content popover', [
    prop('trigger', 'string', false, 'Trigger element reference'),
    prop('placement', 'string', false, 'Position (top, bottom, left, right)'),
  ], ['popover', 'popup'], { placement: 'bottom' }),

  coreBlock('Dropdown', 'interactive', 'overlay', 'Dropdown menu', [
    prop('trigger', 'string', false, 'Trigger element reference'),
    prop('placement', 'string', false, 'Menu position'),
  ], ['dropdown', 'menu', 'select'], { placement: 'bottom' }),

  coreBlock('DropdownItem', 'interactive', 'overlay', 'Dropdown menu item', [
    prop('label', 'string', false, 'Item label text'),
    prop('icon', 'string', false, 'Item icon name'),
  ], ['dropdown-item', 'menu-item'], { label: 'Menu Item' }),

  // ==========================================================================
  // Accordion (3)
  // ==========================================================================
  coreBlock('Accordion', 'interactive', 'data-display', 'Expandable accordion container', [
    prop('allowMultiple', 'boolean', false, 'Allow multiple panels open simultaneously'),
  ], ['accordion', 'collapsible', 'expand'], { allowMultiple: false }),

  coreBlock('AccordionItem', 'interactive', 'data-display', 'Individual accordion panel', [
    prop('value', 'string', false, 'Panel identifier'),
    prop('title', 'string', false, 'Panel header title'),
  ], ['accordion-item', 'accordion-panel'], { title: 'Accordion Item', value: 'item1' }),

  coreBlock('Collapsible', 'interactive', 'data-display', 'Collapsible content section', [
    prop('title', 'string', false, 'Section header title'),
  ], ['collapsible', 'expandable'], { title: 'Collapsible Section' }),

  // ==========================================================================
  // Specialized (16)
  // ==========================================================================
  coreBlock('Chart', 'data', 'charts', 'Data chart visualization', [
    prop('type', 'string', false, 'Chart type (line, bar, pie, area, donut)'),
    prop('dataPath', 'string', false, 'Data source path'),
    prop('height', 'number', false, 'Chart height in pixels'),
  ], ['chart', 'visualization', 'graph'], { type: 'bar', height: 300 }),

  coreBlock('Calendar', 'interactive', 'data-display', 'Calendar date display', [
    prop('mode', 'string', false, 'Calendar mode (single, range, multiple)'),
  ], ['calendar', 'date'], { mode: 'single' }),

  coreBlock('DatePicker', 'interactive', 'inputs', 'Date picker input', [
    prop('label', 'string', false, 'Input label'),
    prop('valuePath', 'string', false, 'Data binding path'),
  ], ['date-picker', 'form', 'date'], { label: 'Select Date' }),

  coreBlock('FileUpload', 'interactive', 'inputs', 'File upload input', [
    prop('label', 'string', false, 'Upload label'),
    prop('accept', 'string', false, 'Accepted file types'),
  ], ['file-upload', 'form', 'upload'], { label: 'Upload File', accept: 'image/*' }),

  coreBlock('Rating', 'interactive', 'inputs', 'Star rating input', [
    prop('max', 'number', false, 'Maximum number of stars'),
    prop('value', 'number', false, 'Current rating value'),
  ], ['rating', 'stars', 'review'], { max: 5, value: 3 }),

  coreBlock('TagInput', 'interactive', 'inputs', 'Tag input with chips', [
    prop('label', 'string', false, 'Input label'),
    prop('valuePath', 'string', false, 'Data binding path'),
  ], ['tag-input', 'form', 'chips'], { label: 'Tags' }),

  coreBlock('ColorPicker', 'interactive', 'inputs', 'Color picker input', [
    prop('label', 'string', false, 'Input label'),
    prop('valuePath', 'string', false, 'Data binding path'),
  ], ['color-picker', 'form', 'color'], { label: 'Color' }),

  coreBlock('Timeline', 'content', 'data-display', 'Vertical or horizontal timeline', [
    prop('orientation', 'string', false, 'Timeline direction (vertical, horizontal)'),
  ], ['timeline', 'history', 'events'], { orientation: 'vertical' }),

  coreBlock('TimelineItem', 'content', 'data-display', 'Individual timeline event', [
    prop('title', 'string', false, 'Event title'),
    prop('time', 'string', false, 'Event time or date'),
    prop('icon', 'string', false, 'Event icon name'),
  ], ['timeline-item', 'event'], { title: 'Event Title', time: 'Just now' }),

  coreBlock('Stepper', 'navigation', 'navigation', 'Multi-step progress indicator', [
    prop('currentStep', 'number', false, 'Active step index'),
  ], ['stepper', 'wizard', 'steps'], { currentStep: 0 }),

  coreBlock('Step', 'navigation', 'navigation', 'Individual step in a stepper', [
    prop('title', 'string', false, 'Step title'),
    prop('icon', 'string', false, 'Step icon name'),
  ], ['step', 'wizard-step'], { title: 'Step' }),

  coreBlock('Code', 'content', 'data-display', 'Code block with syntax highlighting', [
    prop('code', 'string', false, 'Code content'),
    prop('language', 'string', false, 'Programming language for highlighting'),
  ], ['code', 'syntax', 'snippet'], { code: 'const hello = "world";', language: 'javascript' }),

  coreBlock('Kbd', 'content', 'data-display', 'Keyboard shortcut display', [
    prop('keys', 'string', false, 'Key combination (e.g., "Ctrl+C")'),
  ], ['kbd', 'keyboard', 'shortcut'], { keys: 'Ctrl+C' }),

  coreBlock('Quote', 'content', 'typography', 'Blockquote with attribution', [
    prop('text', 'string', false, 'Quote text content'),
    prop('author', 'string', false, 'Quote author name'),
  ], ['quote', 'blockquote', 'citation'], { text: 'Design is not just what it looks like. Design is how it works.', author: 'Steve Jobs' }),

  coreBlock('Stat', 'data', 'dashboard', 'Dashboard statistic display', [
    prop('label', 'string', false, 'Statistic label'),
    prop('value', 'string', false, 'Statistic value'),
    prop('trend', 'string', false, 'Trend direction (up, down, neutral)'),
  ], ['stat', 'statistic', 'dashboard', 'kpi'], { label: 'Users', value: '2,543', trend: 'up' }),

  coreBlock('Tag', 'content', 'data-display', 'Tag or chip label', [
    prop('label', 'string', false, 'Tag label text'),
    prop('color', 'string', false, 'Tag color'),
  ], ['tag', 'chip', 'label'], { label: 'Tag', color: 'primary' }),

  // ==========================================================================
  // Marketing (8)
  // ==========================================================================
  coreBlock('Hero', 'content', 'marketing', 'Hero section for landing pages', [
    prop('title', 'string', false, 'Hero headline text'),
    prop('subtitle', 'string', false, 'Hero subheadline text'),
  ], ['hero', 'landing', 'banner'], { title: 'Build Something Amazing', subtitle: 'A modern framework for building beautiful user interfaces with ease.' }),

  coreBlock('FeatureCard', 'content', 'marketing', 'Feature highlight card', [
    prop('icon', 'string', false, 'Feature icon name'),
    prop('title', 'string', false, 'Feature title'),
    prop('description', 'string', false, 'Feature description text'),
  ], ['feature-card', 'feature', 'benefit'], { icon: 'zap', title: 'Lightning Fast', description: 'Optimized for speed and performance out of the box.' }),

  coreBlock('PricingCard', 'content', 'marketing', 'Pricing plan card', [
    prop('name', 'string', false, 'Plan name'),
    prop('price', 'string', false, 'Plan price'),
    prop('features', 'array', false, 'Array of feature strings'),
    prop('ctaLabel', 'string', false, 'Call-to-action button text'),
  ], ['pricing-card', 'pricing', 'plan'], { name: 'Pro', price: '$29/mo', features: ['Unlimited projects', 'Priority support', 'Custom domain'], ctaLabel: 'Get Started' }),

  coreBlock('TestimonialCard', 'content', 'marketing', 'Customer testimonial card', [
    prop('quote', 'string', false, 'Testimonial quote text'),
    prop('author', 'string', false, 'Author name'),
    prop('role', 'string', false, 'Author role or title'),
  ], ['testimonial-card', 'testimonial', 'review'], { quote: 'This product changed how we build UIs.', author: 'Jane Doe', role: 'CTO at TechCorp' }),

  coreBlock('CTA', 'content', 'marketing', 'Call-to-action section', [
    prop('title', 'string', false, 'CTA headline'),
    prop('description', 'string', false, 'CTA description text'),
  ], ['cta', 'call-to-action', 'action'], { title: 'Ready to get started?', description: 'Join thousands of developers building with our platform.' }),

  coreBlock('Footer', 'navigation', 'marketing', 'Page footer with links', [
    prop('copyright', 'string', false, 'Copyright text'),
    prop('links', 'array', false, 'Array of footer link objects'),
  ], ['footer', 'site-footer'], { copyright: '2026 Your Company. All rights reserved.' }),

  coreBlock('FAQ', 'content', 'marketing', 'Frequently asked questions section', [
    prop('items', 'array', false, 'Array of {question, answer} objects'),
  ], ['faq', 'questions', 'help'], { items: [{ question: 'How does it work?', answer: 'Simply drag and drop components to build your UI.' }] }),

  coreBlock('Newsletter', 'interactive', 'marketing', 'Newsletter signup form', [
    prop('title', 'string', false, 'Section title'),
    prop('buttonLabel', 'string', false, 'Submit button label'),
  ], ['newsletter', 'signup', 'subscribe'], { title: 'Stay Updated', buttonLabel: 'Subscribe' }),
];
