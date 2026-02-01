// src/lib/components/universal-types.ts

/**
 * Universal Component Type System
 * Maps semantic component types to framework-agnostic definitions
 */

export type UniversalComponentCategory =
  | 'layout'
  | 'typography'
  | 'data-display'
  | 'data-input'
  | 'feedback'
  | 'navigation'
  | 'surfaces'
  | 'media'
  | 'charts'
  | 'marketing';

export interface UniversalComponentDef {
  /** Semantic name used in UI trees */
  name: string;
  /** Human-readable display name */
  displayName: string;
  /** Category for organization */
  category: UniversalComponentCategory;
  /** Description of what this component does */
  description: string;
  /** Props schema with types and defaults */
  props: PropSchema;
  /** Whether this component accepts children */
  hasChildren: boolean;
  /** Aliases that map to this component */
  aliases: string[];
  /** Tags for search/filtering */
  tags: string[];
}

export interface PropSchema {
  [key: string]: PropDefinition;
}

export interface PropDefinition {
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'enum';
  required?: boolean;
  default?: unknown;
  description?: string;
  enumValues?: string[];
}

// Component Categories with their universal types
export const UNIVERSAL_COMPONENTS: Record<string, UniversalComponentDef> = {
  // === LAYOUT ===
  Container: {
    name: 'Container',
    displayName: 'Container',
    category: 'layout',
    description: 'A responsive container that centers content with max-width',
    hasChildren: true,
    aliases: ['Box', 'Wrapper', 'Section'],
    tags: ['layout', 'container', 'responsive'],
    props: {
      maxWidth: { type: 'enum', enumValues: ['sm', 'md', 'lg', 'xl', '2xl', 'full'], default: 'lg' },
      padding: { type: 'string', default: '4' },
      className: { type: 'string' },
    },
  },
  Stack: {
    name: 'Stack',
    displayName: 'Stack',
    category: 'layout',
    description: 'Flexbox container for vertical or horizontal stacking',
    hasChildren: true,
    aliases: ['Flex', 'VStack', 'HStack'],
    tags: ['layout', 'flex', 'stack'],
    props: {
      direction: { type: 'enum', enumValues: ['vertical', 'horizontal'], default: 'vertical' },
      gap: { type: 'string', default: '4' },
      align: { type: 'enum', enumValues: ['start', 'center', 'end', 'stretch'] },
      justify: { type: 'enum', enumValues: ['start', 'center', 'end', 'between', 'around'] },
    },
  },
  Grid: {
    name: 'Grid',
    displayName: 'Grid',
    category: 'layout',
    description: 'CSS Grid container for complex layouts',
    hasChildren: true,
    aliases: ['GridContainer', 'SimpleGrid'],
    tags: ['layout', 'grid', 'responsive'],
    props: {
      columns: { type: 'number', default: 3 },
      gap: { type: 'string', default: '4' },
      responsive: { type: 'boolean', default: true },
    },
  },
  Row: {
    name: 'Row',
    displayName: 'Row',
    category: 'layout',
    description: 'Horizontal row container',
    hasChildren: true,
    aliases: ['HStack', 'Horizontal'],
    tags: ['layout', 'row'],
    props: {
      gap: { type: 'string', default: '4' },
      align: { type: 'enum', enumValues: ['start', 'center', 'end', 'stretch'] },
    },
  },
  Column: {
    name: 'Column',
    displayName: 'Column',
    category: 'layout',
    description: 'Vertical column container',
    hasChildren: true,
    aliases: ['VStack', 'Vertical'],
    tags: ['layout', 'column'],
    props: {
      span: { type: 'number' },
      gap: { type: 'string', default: '4' },
    },
  },
  Divider: {
    name: 'Divider',
    displayName: 'Divider',
    category: 'layout',
    description: 'Visual separator line',
    hasChildren: false,
    aliases: ['Separator', 'Hr'],
    tags: ['layout', 'divider'],
    props: {
      orientation: { type: 'enum', enumValues: ['horizontal', 'vertical'], default: 'horizontal' },
    },
  },
  Spacer: {
    name: 'Spacer',
    displayName: 'Spacer',
    category: 'layout',
    description: 'Flexible space for pushing content',
    hasChildren: false,
    aliases: ['Gap'],
    tags: ['layout', 'spacer'],
    props: {
      size: { type: 'string', default: '4' },
    },
  },

  // === TYPOGRAPHY ===
  Heading: {
    name: 'Heading',
    displayName: 'Heading',
    category: 'typography',
    description: 'Semantic heading element (h1-h6)',
    hasChildren: false,
    aliases: ['Title', 'H1', 'H2', 'H3'],
    tags: ['typography', 'heading', 'title'],
    props: {
      content: { type: 'string', required: true },
      level: { type: 'enum', enumValues: ['1', '2', '3', '4', '5', '6'], default: '2' },
      size: { type: 'enum', enumValues: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] },
    },
  },
  Text: {
    name: 'Text',
    displayName: 'Text',
    category: 'typography',
    description: 'Body text paragraph',
    hasChildren: false,
    aliases: ['Paragraph', 'P', 'Body'],
    tags: ['typography', 'text', 'paragraph'],
    props: {
      content: { type: 'string', required: true },
      size: { type: 'enum', enumValues: ['xs', 'sm', 'md', 'lg'], default: 'md' },
      color: { type: 'string' },
      weight: { type: 'enum', enumValues: ['normal', 'medium', 'semibold', 'bold'] },
    },
  },
  Link: {
    name: 'Link',
    displayName: 'Link',
    category: 'typography',
    description: 'Hyperlink element',
    hasChildren: false,
    aliases: ['Anchor', 'A'],
    tags: ['typography', 'link', 'navigation'],
    props: {
      content: { type: 'string', required: true },
      href: { type: 'string', required: true },
      external: { type: 'boolean', default: false },
    },
  },

  // === SURFACES ===
  Card: {
    name: 'Card',
    displayName: 'Card',
    category: 'surfaces',
    description: 'Container with border, shadow, and padding',
    hasChildren: true,
    aliases: ['Panel', 'Box', 'Paper'],
    tags: ['surfaces', 'card', 'container'],
    props: {
      title: { type: 'string' },
      description: { type: 'string' },
      variant: { type: 'enum', enumValues: ['elevated', 'outlined', 'filled'], default: 'elevated' },
      padding: { type: 'string', default: '6' },
    },
  },
  CardHeader: {
    name: 'CardHeader',
    displayName: 'Card Header',
    category: 'surfaces',
    description: 'Header section of a card',
    hasChildren: true,
    aliases: [],
    tags: ['surfaces', 'card'],
    props: {
      title: { type: 'string' },
      subtitle: { type: 'string' },
      action: { type: 'object' },
    },
  },
  CardBody: {
    name: 'CardBody',
    displayName: 'Card Body',
    category: 'surfaces',
    description: 'Content section of a card',
    hasChildren: true,
    aliases: ['CardContent'],
    tags: ['surfaces', 'card'],
    props: {},
  },
  CardFooter: {
    name: 'CardFooter',
    displayName: 'Card Footer',
    category: 'surfaces',
    description: 'Footer section of a card with actions',
    hasChildren: true,
    aliases: ['CardActions'],
    tags: ['surfaces', 'card'],
    props: {},
  },

  // === DATA INPUT ===
  Button: {
    name: 'Button',
    displayName: 'Button',
    category: 'data-input',
    description: 'Clickable button element',
    hasChildren: false,
    aliases: ['Btn', 'Action'],
    tags: ['input', 'button', 'action'],
    props: {
      label: { type: 'string', required: true },
      variant: { type: 'enum', enumValues: ['primary', 'secondary', 'outline', 'ghost', 'destructive'], default: 'primary' },
      size: { type: 'enum', enumValues: ['sm', 'md', 'lg'], default: 'md' },
      disabled: { type: 'boolean', default: false },
      loading: { type: 'boolean', default: false },
      icon: { type: 'string' },
      iconPosition: { type: 'enum', enumValues: ['left', 'right'], default: 'left' },
    },
  },
  Input: {
    name: 'Input',
    displayName: 'Input',
    category: 'data-input',
    description: 'Text input field',
    hasChildren: false,
    aliases: ['TextField', 'TextInput'],
    tags: ['input', 'form', 'text'],
    props: {
      label: { type: 'string' },
      placeholder: { type: 'string' },
      type: { type: 'enum', enumValues: ['text', 'email', 'password', 'number', 'tel', 'url'], default: 'text' },
      required: { type: 'boolean', default: false },
      disabled: { type: 'boolean', default: false },
      error: { type: 'string' },
      helperText: { type: 'string' },
    },
  },
  TextArea: {
    name: 'TextArea',
    displayName: 'Text Area',
    category: 'data-input',
    description: 'Multi-line text input',
    hasChildren: false,
    aliases: ['Textarea', 'MultilineInput'],
    tags: ['input', 'form', 'text'],
    props: {
      label: { type: 'string' },
      placeholder: { type: 'string' },
      rows: { type: 'number', default: 4 },
      required: { type: 'boolean', default: false },
    },
  },
  Select: {
    name: 'Select',
    displayName: 'Select',
    category: 'data-input',
    description: 'Dropdown select input',
    hasChildren: false,
    aliases: ['Dropdown', 'Picker'],
    tags: ['input', 'form', 'select'],
    props: {
      label: { type: 'string' },
      placeholder: { type: 'string' },
      options: { type: 'array', required: true },
      multiple: { type: 'boolean', default: false },
    },
  },
  Checkbox: {
    name: 'Checkbox',
    displayName: 'Checkbox',
    category: 'data-input',
    description: 'Checkbox input',
    hasChildren: false,
    aliases: ['Check'],
    tags: ['input', 'form', 'checkbox'],
    props: {
      label: { type: 'string', required: true },
      checked: { type: 'boolean', default: false },
      disabled: { type: 'boolean', default: false },
    },
  },
  Switch: {
    name: 'Switch',
    displayName: 'Switch',
    category: 'data-input',
    description: 'Toggle switch input',
    hasChildren: false,
    aliases: ['Toggle'],
    tags: ['input', 'form', 'switch'],
    props: {
      label: { type: 'string' },
      checked: { type: 'boolean', default: false },
      disabled: { type: 'boolean', default: false },
    },
  },
  RadioGroup: {
    name: 'RadioGroup',
    displayName: 'Radio Group',
    category: 'data-input',
    description: 'Group of radio button options',
    hasChildren: true,
    aliases: ['RadioButtons'],
    tags: ['input', 'form', 'radio'],
    props: {
      label: { type: 'string' },
      options: { type: 'array' },
      orientation: { type: 'enum', enumValues: ['horizontal', 'vertical'], default: 'vertical' },
    },
  },
  Slider: {
    name: 'Slider',
    displayName: 'Slider',
    category: 'data-input',
    description: 'Range slider input',
    hasChildren: false,
    aliases: ['Range'],
    tags: ['input', 'form', 'slider'],
    props: {
      label: { type: 'string' },
      min: { type: 'number', default: 0 },
      max: { type: 'number', default: 100 },
      step: { type: 'number', default: 1 },
      value: { type: 'number' },
    },
  },
  DatePicker: {
    name: 'DatePicker',
    displayName: 'Date Picker',
    category: 'data-input',
    description: 'Date selection input',
    hasChildren: false,
    aliases: ['Calendar', 'DateInput'],
    tags: ['input', 'form', 'date'],
    props: {
      label: { type: 'string' },
      placeholder: { type: 'string' },
      format: { type: 'string', default: 'YYYY-MM-DD' },
    },
  },
  FileUpload: {
    name: 'FileUpload',
    displayName: 'File Upload',
    category: 'data-input',
    description: 'File upload input',
    hasChildren: false,
    aliases: ['Upload', 'FilePicker'],
    tags: ['input', 'form', 'file'],
    props: {
      label: { type: 'string' },
      accept: { type: 'string' },
      multiple: { type: 'boolean', default: false },
    },
  },

  // === DATA DISPLAY ===
  Badge: {
    name: 'Badge',
    displayName: 'Badge',
    category: 'data-display',
    description: 'Small label or status indicator',
    hasChildren: false,
    aliases: ['Tag', 'Chip', 'Label'],
    tags: ['display', 'badge', 'status'],
    props: {
      label: { type: 'string', required: true },
      variant: { type: 'enum', enumValues: ['default', 'primary', 'secondary', 'success', 'warning', 'error'], default: 'default' },
      size: { type: 'enum', enumValues: ['sm', 'md', 'lg'], default: 'md' },
    },
  },
  Avatar: {
    name: 'Avatar',
    displayName: 'Avatar',
    category: 'data-display',
    description: 'User avatar image or initials',
    hasChildren: false,
    aliases: ['ProfilePic', 'UserImage'],
    tags: ['display', 'avatar', 'user'],
    props: {
      src: { type: 'string' },
      name: { type: 'string' },
      size: { type: 'enum', enumValues: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md' },
    },
  },
  Icon: {
    name: 'Icon',
    displayName: 'Icon',
    category: 'data-display',
    description: 'Vector icon from icon library',
    hasChildren: false,
    aliases: ['Glyph'],
    tags: ['display', 'icon'],
    props: {
      name: { type: 'string', required: true },
      size: { type: 'enum', enumValues: ['xs', 'sm', 'md', 'lg', 'xl'], default: 'md' },
      color: { type: 'string' },
    },
  },
  Image: {
    name: 'Image',
    displayName: 'Image',
    category: 'media',
    description: 'Responsive image element',
    hasChildren: false,
    aliases: ['Img', 'Picture'],
    tags: ['media', 'image'],
    props: {
      src: { type: 'string', required: true },
      alt: { type: 'string', required: true },
      width: { type: 'number' },
      height: { type: 'number' },
      objectFit: { type: 'enum', enumValues: ['cover', 'contain', 'fill', 'none'], default: 'cover' },
    },
  },
  Table: {
    name: 'Table',
    displayName: 'Table',
    category: 'data-display',
    description: 'Data table with columns and rows',
    hasChildren: true,
    aliases: ['DataTable', 'Grid'],
    tags: ['display', 'table', 'data'],
    props: {
      columns: { type: 'array' },
      data: { type: 'array' },
      striped: { type: 'boolean', default: false },
      hoverable: { type: 'boolean', default: true },
    },
  },
  List: {
    name: 'List',
    displayName: 'List',
    category: 'data-display',
    description: 'Ordered or unordered list',
    hasChildren: true,
    aliases: ['ItemList'],
    tags: ['display', 'list'],
    props: {
      ordered: { type: 'boolean', default: false },
      spacing: { type: 'string', default: '2' },
    },
  },
  ListItem: {
    name: 'ListItem',
    displayName: 'List Item',
    category: 'data-display',
    description: 'Single item in a list',
    hasChildren: true,
    aliases: ['Li'],
    tags: ['display', 'list'],
    props: {
      icon: { type: 'string' },
    },
  },
  Stat: {
    name: 'Stat',
    displayName: 'Stat',
    category: 'data-display',
    description: 'Single statistic with label and value',
    hasChildren: false,
    aliases: ['Metric', 'KPI', 'StatCard', 'MetricCard'],
    tags: ['display', 'stat', 'metric', 'dashboard'],
    props: {
      label: { type: 'string', required: true },
      value: { type: 'string', required: true },
      change: { type: 'string' },
      changeType: { type: 'enum', enumValues: ['increase', 'decrease', 'neutral'] },
      icon: { type: 'string' },
    },
  },
  Progress: {
    name: 'Progress',
    displayName: 'Progress',
    category: 'data-display',
    description: 'Progress bar indicator',
    hasChildren: false,
    aliases: ['ProgressBar', 'LinearProgress'],
    tags: ['display', 'progress', 'loading'],
    props: {
      value: { type: 'number', required: true },
      max: { type: 'number', default: 100 },
      showLabel: { type: 'boolean', default: false },
      color: { type: 'string' },
    },
  },

  // === FEEDBACK ===
  Alert: {
    name: 'Alert',
    displayName: 'Alert',
    category: 'feedback',
    description: 'Alert message box',
    hasChildren: false,
    aliases: ['Message', 'Notice', 'Banner'],
    tags: ['feedback', 'alert', 'message'],
    props: {
      title: { type: 'string' },
      message: { type: 'string', required: true },
      variant: { type: 'enum', enumValues: ['info', 'success', 'warning', 'error'], default: 'info' },
      dismissible: { type: 'boolean', default: false },
    },
  },
  Skeleton: {
    name: 'Skeleton',
    displayName: 'Skeleton',
    category: 'feedback',
    description: 'Loading placeholder skeleton',
    hasChildren: false,
    aliases: ['Placeholder', 'Loading'],
    tags: ['feedback', 'loading', 'skeleton'],
    props: {
      variant: { type: 'enum', enumValues: ['text', 'circular', 'rectangular'], default: 'text' },
      width: { type: 'string' },
      height: { type: 'string' },
    },
  },
  Spinner: {
    name: 'Spinner',
    displayName: 'Spinner',
    category: 'feedback',
    description: 'Loading spinner animation',
    hasChildren: false,
    aliases: ['Loading', 'Loader'],
    tags: ['feedback', 'loading', 'spinner'],
    props: {
      size: { type: 'enum', enumValues: ['sm', 'md', 'lg'], default: 'md' },
      color: { type: 'string' },
    },
  },
  EmptyState: {
    name: 'EmptyState',
    displayName: 'Empty State',
    category: 'feedback',
    description: 'Empty state placeholder with message',
    hasChildren: false,
    aliases: ['NoData', 'Placeholder'],
    tags: ['feedback', 'empty'],
    props: {
      title: { type: 'string', required: true },
      description: { type: 'string' },
      icon: { type: 'string' },
      action: { type: 'object' },
    },
  },

  // === NAVIGATION ===
  Tabs: {
    name: 'Tabs',
    displayName: 'Tabs',
    category: 'navigation',
    description: 'Tab navigation container',
    hasChildren: true,
    aliases: ['TabGroup'],
    tags: ['navigation', 'tabs'],
    props: {
      defaultValue: { type: 'string' },
      orientation: { type: 'enum', enumValues: ['horizontal', 'vertical'], default: 'horizontal' },
    },
  },
  TabList: {
    name: 'TabList',
    displayName: 'Tab List',
    category: 'navigation',
    description: 'Container for tab triggers',
    hasChildren: true,
    aliases: [],
    tags: ['navigation', 'tabs'],
    props: {},
  },
  Tab: {
    name: 'Tab',
    displayName: 'Tab',
    category: 'navigation',
    description: 'Single tab trigger',
    hasChildren: false,
    aliases: ['TabTrigger'],
    tags: ['navigation', 'tabs'],
    props: {
      value: { type: 'string', required: true },
      label: { type: 'string', required: true },
      disabled: { type: 'boolean', default: false },
    },
  },
  TabPanel: {
    name: 'TabPanel',
    displayName: 'Tab Panel',
    category: 'navigation',
    description: 'Content panel for a tab',
    hasChildren: true,
    aliases: ['TabContent'],
    tags: ['navigation', 'tabs'],
    props: {
      value: { type: 'string', required: true },
    },
  },
  Breadcrumb: {
    name: 'Breadcrumb',
    displayName: 'Breadcrumb',
    category: 'navigation',
    description: 'Breadcrumb navigation trail',
    hasChildren: true,
    aliases: ['BreadcrumbNav'],
    tags: ['navigation', 'breadcrumb'],
    props: {
      separator: { type: 'string', default: '/' },
    },
  },
  BreadcrumbItem: {
    name: 'BreadcrumbItem',
    displayName: 'Breadcrumb Item',
    category: 'navigation',
    description: 'Single breadcrumb link',
    hasChildren: false,
    aliases: [],
    tags: ['navigation', 'breadcrumb'],
    props: {
      label: { type: 'string', required: true },
      href: { type: 'string' },
      current: { type: 'boolean', default: false },
    },
  },
  NavMenu: {
    name: 'NavMenu',
    displayName: 'Navigation Menu',
    category: 'navigation',
    description: 'Navigation menu container',
    hasChildren: true,
    aliases: ['Nav', 'Menu'],
    tags: ['navigation', 'menu'],
    props: {
      orientation: { type: 'enum', enumValues: ['horizontal', 'vertical'], default: 'horizontal' },
    },
  },
  NavItem: {
    name: 'NavItem',
    displayName: 'Navigation Item',
    category: 'navigation',
    description: 'Single navigation link',
    hasChildren: false,
    aliases: ['NavLink'],
    tags: ['navigation', 'menu'],
    props: {
      label: { type: 'string', required: true },
      href: { type: 'string', required: true },
      icon: { type: 'string' },
      active: { type: 'boolean', default: false },
    },
  },
  Pagination: {
    name: 'Pagination',
    displayName: 'Pagination',
    category: 'navigation',
    description: 'Page navigation controls',
    hasChildren: false,
    aliases: ['Pager'],
    tags: ['navigation', 'pagination'],
    props: {
      currentPage: { type: 'number', required: true },
      totalPages: { type: 'number', required: true },
      showFirstLast: { type: 'boolean', default: true },
    },
  },

  // === OVERLAY ===
  Modal: {
    name: 'Modal',
    displayName: 'Modal',
    category: 'surfaces',
    description: 'Modal dialog overlay',
    hasChildren: true,
    aliases: ['Dialog', 'Popup'],
    tags: ['overlay', 'modal', 'dialog'],
    props: {
      title: { type: 'string' },
      open: { type: 'boolean', default: false },
      size: { type: 'enum', enumValues: ['sm', 'md', 'lg', 'xl', 'full'], default: 'md' },
    },
  },
  Drawer: {
    name: 'Drawer',
    displayName: 'Drawer',
    category: 'surfaces',
    description: 'Sliding drawer panel',
    hasChildren: true,
    aliases: ['SidePanel', 'Sidebar'],
    tags: ['overlay', 'drawer'],
    props: {
      title: { type: 'string' },
      open: { type: 'boolean', default: false },
      placement: { type: 'enum', enumValues: ['left', 'right', 'top', 'bottom'], default: 'right' },
    },
  },
  Tooltip: {
    name: 'Tooltip',
    displayName: 'Tooltip',
    category: 'surfaces',
    description: 'Hover tooltip',
    hasChildren: true,
    aliases: ['Hint'],
    tags: ['overlay', 'tooltip'],
    props: {
      content: { type: 'string', required: true },
      placement: { type: 'enum', enumValues: ['top', 'bottom', 'left', 'right'], default: 'top' },
    },
  },
  Dropdown: {
    name: 'Dropdown',
    displayName: 'Dropdown',
    category: 'surfaces',
    description: 'Dropdown menu',
    hasChildren: true,
    aliases: ['DropdownMenu', 'Menu'],
    tags: ['overlay', 'dropdown', 'menu'],
    props: {
      trigger: { type: 'string', required: true },
    },
  },
  DropdownItem: {
    name: 'DropdownItem',
    displayName: 'Dropdown Item',
    category: 'surfaces',
    description: 'Single dropdown menu item',
    hasChildren: false,
    aliases: ['MenuItem'],
    tags: ['overlay', 'dropdown', 'menu'],
    props: {
      label: { type: 'string', required: true },
      icon: { type: 'string' },
      disabled: { type: 'boolean', default: false },
      destructive: { type: 'boolean', default: false },
    },
  },

  // === SPECIALIZED ===
  Accordion: {
    name: 'Accordion',
    displayName: 'Accordion',
    category: 'surfaces',
    description: 'Collapsible accordion container',
    hasChildren: true,
    aliases: ['Collapse', 'Expandable'],
    tags: ['surfaces', 'accordion'],
    props: {
      type: { type: 'enum', enumValues: ['single', 'multiple'], default: 'single' },
    },
  },
  AccordionItem: {
    name: 'AccordionItem',
    displayName: 'Accordion Item',
    category: 'surfaces',
    description: 'Single accordion section',
    hasChildren: true,
    aliases: ['CollapseItem'],
    tags: ['surfaces', 'accordion'],
    props: {
      title: { type: 'string', required: true },
      value: { type: 'string', required: true },
    },
  },
  Timeline: {
    name: 'Timeline',
    displayName: 'Timeline',
    category: 'data-display',
    description: 'Vertical timeline of events',
    hasChildren: true,
    aliases: ['History'],
    tags: ['display', 'timeline'],
    props: {},
  },
  TimelineItem: {
    name: 'TimelineItem',
    displayName: 'Timeline Item',
    category: 'data-display',
    description: 'Single timeline event',
    hasChildren: false,
    aliases: [],
    tags: ['display', 'timeline'],
    props: {
      title: { type: 'string', required: true },
      description: { type: 'string' },
      date: { type: 'string' },
      icon: { type: 'string' },
    },
  },
  Stepper: {
    name: 'Stepper',
    displayName: 'Stepper',
    category: 'navigation',
    description: 'Multi-step progress indicator',
    hasChildren: true,
    aliases: ['Steps', 'Wizard'],
    tags: ['navigation', 'stepper'],
    props: {
      currentStep: { type: 'number', default: 0 },
      orientation: { type: 'enum', enumValues: ['horizontal', 'vertical'], default: 'horizontal' },
    },
  },
  Step: {
    name: 'Step',
    displayName: 'Step',
    category: 'navigation',
    description: 'Single step in stepper',
    hasChildren: false,
    aliases: [],
    tags: ['navigation', 'stepper'],
    props: {
      title: { type: 'string', required: true },
      description: { type: 'string' },
      status: { type: 'enum', enumValues: ['complete', 'current', 'upcoming'], default: 'upcoming' },
    },
  },
  Rating: {
    name: 'Rating',
    displayName: 'Rating',
    category: 'data-input',
    description: 'Star rating input',
    hasChildren: false,
    aliases: ['Stars'],
    tags: ['input', 'rating'],
    props: {
      value: { type: 'number', default: 0 },
      max: { type: 'number', default: 5 },
      readonly: { type: 'boolean', default: false },
    },
  },
  Code: {
    name: 'Code',
    displayName: 'Code',
    category: 'typography',
    description: 'Inline or block code snippet',
    hasChildren: false,
    aliases: ['CodeBlock', 'Pre'],
    tags: ['typography', 'code'],
    props: {
      content: { type: 'string', required: true },
      language: { type: 'string' },
      showLineNumbers: { type: 'boolean', default: false },
    },
  },
  Quote: {
    name: 'Quote',
    displayName: 'Quote',
    category: 'typography',
    description: 'Blockquote element',
    hasChildren: false,
    aliases: ['Blockquote', 'Testimonial'],
    tags: ['typography', 'quote'],
    props: {
      content: { type: 'string', required: true },
      author: { type: 'string' },
      source: { type: 'string' },
    },
  },

  // === CHARTS ===
  Chart: {
    name: 'Chart',
    displayName: 'Chart',
    category: 'charts',
    description: 'Data visualization chart',
    hasChildren: false,
    aliases: ['Graph', 'Visualization'],
    tags: ['charts', 'data', 'visualization'],
    props: {
      type: { type: 'enum', enumValues: ['bar', 'line', 'pie', 'area', 'donut'], required: true },
      data: { type: 'array', required: true },
      height: { type: 'number', default: 300 },
      title: { type: 'string' },
    },
  },

  // === MARKETING ===
  Hero: {
    name: 'Hero',
    displayName: 'Hero Section',
    category: 'marketing',
    description: 'Hero section with headline and CTA',
    hasChildren: true,
    aliases: ['HeroSection', 'Banner'],
    tags: ['marketing', 'hero', 'landing'],
    props: {
      title: { type: 'string', required: true },
      subtitle: { type: 'string' },
      backgroundImage: { type: 'string' },
      alignment: { type: 'enum', enumValues: ['left', 'center', 'right'], default: 'center' },
    },
  },
  FeatureCard: {
    name: 'FeatureCard',
    displayName: 'Feature Card',
    category: 'marketing',
    description: 'Feature highlight card',
    hasChildren: false,
    aliases: ['Feature'],
    tags: ['marketing', 'features'],
    props: {
      icon: { type: 'string' },
      title: { type: 'string', required: true },
      description: { type: 'string', required: true },
    },
  },
  PricingCard: {
    name: 'PricingCard',
    displayName: 'Pricing Card',
    category: 'marketing',
    description: 'Pricing plan card',
    hasChildren: false,
    aliases: ['Pricing', 'PlanCard'],
    tags: ['marketing', 'pricing'],
    props: {
      name: { type: 'string', required: true },
      price: { type: 'string', required: true },
      period: { type: 'string', default: '/month' },
      features: { type: 'array', required: true },
      recommended: { type: 'boolean', default: false },
      ctaLabel: { type: 'string', default: 'Get Started' },
    },
  },
  TestimonialCard: {
    name: 'TestimonialCard',
    displayName: 'Testimonial Card',
    category: 'marketing',
    description: 'Customer testimonial card',
    hasChildren: false,
    aliases: ['Testimonial', 'Review'],
    tags: ['marketing', 'testimonials', 'social-proof'],
    props: {
      quote: { type: 'string', required: true },
      author: { type: 'string', required: true },
      role: { type: 'string' },
      avatar: { type: 'string' },
      rating: { type: 'number' },
    },
  },
  CTA: {
    name: 'CTA',
    displayName: 'Call to Action',
    category: 'marketing',
    description: 'Call to action section',
    hasChildren: false,
    aliases: ['CallToAction', 'CTASection'],
    tags: ['marketing', 'cta'],
    props: {
      title: { type: 'string', required: true },
      description: { type: 'string' },
      primaryAction: { type: 'object' },
      secondaryAction: { type: 'object' },
    },
  },
  Footer: {
    name: 'Footer',
    displayName: 'Footer',
    category: 'marketing',
    description: 'Page footer with links',
    hasChildren: true,
    aliases: ['PageFooter'],
    tags: ['marketing', 'footer', 'navigation'],
    props: {
      logo: { type: 'string' },
      copyright: { type: 'string' },
      links: { type: 'array' },
    },
  },
  FAQ: {
    name: 'FAQ',
    displayName: 'FAQ',
    category: 'marketing',
    description: 'FAQ accordion section',
    hasChildren: false,
    aliases: ['FAQSection', 'Questions'],
    tags: ['marketing', 'faq'],
    props: {
      items: { type: 'array', required: true },
    },
  },
  Newsletter: {
    name: 'Newsletter',
    displayName: 'Newsletter Signup',
    category: 'marketing',
    description: 'Newsletter subscription form',
    hasChildren: false,
    aliases: ['Subscribe', 'EmailSignup'],
    tags: ['marketing', 'newsletter', 'form'],
    props: {
      title: { type: 'string' },
      description: { type: 'string' },
      placeholder: { type: 'string', default: 'Enter your email' },
      buttonLabel: { type: 'string', default: 'Subscribe' },
    },
  },
};

// Helper to resolve component aliases
export function resolveComponentName(name: string): string {
  // Direct match
  if (UNIVERSAL_COMPONENTS[name]) {
    return name;
  }

  // Search aliases
  for (const [compName, def] of Object.entries(UNIVERSAL_COMPONENTS)) {
    if (def.aliases.includes(name)) {
      return compName;
    }
  }

  return name; // Return as-is if not found
}

// Get component definition by name (resolving aliases)
export function getComponentDef(name: string): UniversalComponentDef | undefined {
  const resolved = resolveComponentName(name);
  return UNIVERSAL_COMPONENTS[resolved];
}

// Get all components by category
export function getComponentsByCategory(category: UniversalComponentCategory): UniversalComponentDef[] {
  return Object.values(UNIVERSAL_COMPONENTS).filter(c => c.category === category);
}

// Search components by tags or name
export function searchComponents(query: string): UniversalComponentDef[] {
  const q = query.toLowerCase();
  return Object.values(UNIVERSAL_COMPONENTS).filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.displayName.toLowerCase().includes(q) ||
    c.description.toLowerCase().includes(q) ||
    c.tags.some(t => t.includes(q)) ||
    c.aliases.some(a => a.toLowerCase().includes(q))
  );
}

// Get all component names (for reference)
export function getAllComponentNames(): string[] {
  return Object.keys(UNIVERSAL_COMPONENTS);
}

// Get all categories
export function getAllCategories(): UniversalComponentCategory[] {
  return ['layout', 'typography', 'data-display', 'data-input', 'feedback', 'navigation', 'surfaces', 'media', 'charts', 'marketing'];
}

// Validate if a component name exists
export function isValidComponent(name: string): boolean {
  return resolveComponentName(name) in UNIVERSAL_COMPONENTS;
}
