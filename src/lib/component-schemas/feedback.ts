export interface ComponentSchema {
  category: string;
  keywords: string[];
  description: string;
  props: Record<string, string>;
}

export const feedbackSchemas: Record<string, ComponentSchema> = {
  Alert: {
    category: 'feedback',
    keywords: ['alert', 'message', 'notification', 'warning', 'error', 'success', 'info'],
    description: 'Displays a callout for user attention',
    props: {
      variant: "'default' | 'destructive' | 'success' | 'warning' | 'info'",
      title: "string",
      description: "string",
      icon: "string",
      closable: "boolean",
      onClose: "string"
    }
  },

  Toast: {
    category: 'feedback',
    keywords: ['toast', 'notification', 'snackbar', 'popup', 'message'],
    description: 'Brief message that appears temporarily',
    props: {
      title: "string",
      description: "string",
      variant: "'default' | 'success' | 'error' | 'warning' | 'info'",
      duration: "number",
      position: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
      action: "string",
      actionLabel: "string"
    }
  },

  Modal: {
    category: 'feedback',
    keywords: ['modal', 'dialog', 'popup', 'overlay', 'window'],
    description: 'Overlay dialog for focused content',
    props: {
      open: "boolean",
      title: "string",
      description: "string",
      size: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
      showClose: "boolean",
      onClose: "string",
      confirmText: "string",
      cancelText: "string",
      confirmAction: "string",
      cancelAction: "string"
    }
  },

  Dialog: {
    category: 'feedback',
    keywords: ['dialog', 'modal', 'popup', 'alert', 'confirm'],
    description: 'Dialog for user confirmation',
    props: {
      open: "boolean",
      title: "string",
      description: "string",
      confirmText: "string",
      cancelText: "string",
      confirmAction: "string",
      cancelAction: "string"
    }
  },

  Drawer: {
    category: 'feedback',
    keywords: ['drawer', 'sidebar', 'panel', 'slide-out', 'offcanvas'],
    description: 'Slide-in panel from screen edge',
    props: {
      open: "boolean",
      side: "'left' | 'right' | 'top' | 'bottom'",
      title: "string",
      description: "string",
      size: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
      showClose: "boolean",
      onClose: "string"
    }
  },

  Popover: {
    category: 'feedback',
    keywords: ['popover', 'popup', 'tooltip', 'dropdown', 'overlay'],
    description: 'Floating content anchored to element',
    props: {
      trigger: "'hover' | 'click' | 'focus'",
      placement: "'top' | 'bottom' | 'left' | 'right'",
      content: "string",
      showArrow: "boolean"
    }
  },

  Tooltip: {
    category: 'feedback',
    keywords: ['tooltip', 'hint', 'helper', 'info', 'popover'],
    description: 'Brief hint shown on hover',
    props: {
      content: "string",
      placement: "'top' | 'bottom' | 'left' | 'right'",
      trigger: "'hover' | 'click' | 'focus'",
      delay: "number",
      showArrow: "boolean"
    }
  },

  Skeleton: {
    category: 'feedback',
    keywords: ['skeleton', 'loading', 'placeholder', 'shimmer'],
    description: 'Loading placeholder animation',
    props: {
      variant: "'text' | 'circular' | 'rectangular'",
      width: "string | number",
      height: "string | number",
      animation: "'pulse' | 'wave' | 'none'"
    }
  },

  Spinner: {
    category: 'feedback',
    keywords: ['spinner', 'loading', 'loader', 'progress'],
    description: 'Circular loading indicator',
    props: {
      size: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      color: "string",
      label: "string"
    }
  },

  Progress: {
    category: 'feedback',
    keywords: ['progress', 'progressbar', 'loading', 'status'],
    description: 'Progress indicator bar',
    props: {
      value: "number",
      max: "number",
      variant: "'default' | 'success' | 'warning' | 'error'",
      showValue: "boolean",
      label: "string",
      size: "'sm' | 'md' | 'lg'"
    }
  }
};
