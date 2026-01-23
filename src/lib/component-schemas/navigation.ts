export interface ComponentSchema {
  category: string;
  keywords: string[];
  description: string;
  props: Record<string, string>;
}

export const navigationSchemas: Record<string, ComponentSchema> = {
  Navbar: {
    category: "navigation",
    keywords: ["header", "menu", "topbar", "appbar", "navigation"],
    description: "Main navigation bar",
    props: {
      variant: "'default' | 'bordered' | 'floating' | 'transparent'",
      position: "'static' | 'sticky' | 'fixed'",
      height: "string",
      maxWidth: "string",
      blur: "boolean",
      bordered: "boolean",
      logo: "ReactNode",
      items: "NavItemProps[]",
      actions: "ReactNode",
      mobileBreakpoint: "string"
    }
  },

  NavItem: {
    category: "navigation",
    keywords: ["link", "menu-item", "nav-link", "route", "anchor"],
    description: "Navigation menu item",
    props: {
      href: "string",
      label: "string",
      icon: "string",
      active: "boolean",
      disabled: "boolean",
      external: "boolean",
      badge: "string | number",
      children: "NavItemProps[]"
    }
  },

  NavGroup: {
    category: "navigation",
    keywords: ["section", "category", "menu-group", "submenu", "nested"],
    description: "Grouped navigation items",
    props: {
      label: "string",
      collapsible: "boolean",
      defaultExpanded: "boolean",
      icon: "string",
      items: "NavItemProps[]"
    }
  },

  SideNav: {
    category: "navigation",
    keywords: ["sidebar", "menu", "drawer", "rail", "vertical"],
    description: "Side navigation menu",
    props: {
      variant: "'default' | 'compact' | 'minimal'",
      width: "string",
      collapsedWidth: "string",
      collapsed: "boolean",
      position: "'left' | 'right'",
      bordered: "boolean",
      sticky: "boolean",
      items: "SideNavItemProps[]",
      header: "ReactNode",
      footer: "ReactNode"
    }
  },

  SideNavItem: {
    category: "navigation",
    keywords: ["menu-item", "link", "sidebar-link", "route"],
    description: "Side navigation item",
    props: {
      href: "string",
      label: "string",
      icon: "string",
      active: "boolean",
      disabled: "boolean",
      badge: "string | number",
      indent: "number",
      tooltip: "string"
    }
  },

  SideNavGroup: {
    category: "navigation",
    keywords: ["section", "category", "folder", "expandable", "nested"],
    description: "Grouped side navigation items",
    props: {
      label: "string",
      icon: "string",
      collapsible: "boolean",
      defaultExpanded: "boolean",
      items: "SideNavItemProps[]"
    }
  },

  Breadcrumb: {
    category: "navigation",
    keywords: ["path", "trail", "hierarchy", "location", "crumbs"],
    description: "Breadcrumb navigation trail",
    props: {
      separator: "string | ReactNode",
      maxItems: "number",
      itemsBeforeCollapse: "number",
      itemsAfterCollapse: "number",
      showHome: "boolean",
      homeHref: "string",
      items: "BreadcrumbItemProps[]"
    }
  },

  BreadcrumbItem: {
    category: "navigation",
    keywords: ["crumb", "path-segment", "link", "step"],
    description: "Single breadcrumb item",
    props: {
      href: "string",
      label: "string",
      icon: "string",
      current: "boolean",
      disabled: "boolean"
    }
  },

  Pagination: {
    category: "navigation",
    keywords: ["pages", "paging", "navigation", "next", "previous"],
    description: "Page navigation component",
    props: {
      total: "number",
      page: "number",
      pageSize: "number",
      siblingCount: "number",
      boundaryCount: "number",
      showFirst: "boolean",
      showLast: "boolean",
      showPrevious: "boolean",
      showNext: "boolean",
      variant: "'default' | 'outline' | 'simple'",
      size: "'sm' | 'default' | 'lg'",
      disabled: "boolean"
    }
  },

  PaginationItem: {
    category: "navigation",
    keywords: ["page", "number", "link", "button"],
    description: "Single pagination page item",
    props: {
      page: "number",
      active: "boolean",
      disabled: "boolean",
      type: "'page' | 'first' | 'last' | 'next' | 'previous' | 'ellipsis'"
    }
  },

  Menu: {
    category: "navigation",
    keywords: ["dropdown", "context", "popup", "options", "actions"],
    description: "Dropdown or context menu",
    props: {
      trigger: "ReactNode",
      placement: "'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'",
      offset: "number",
      closeOnSelect: "boolean",
      closeOnBlur: "boolean",
      items: "MenuItemProps[]"
    }
  },

  MenuItem: {
    category: "navigation",
    keywords: ["option", "action", "link", "button", "choice"],
    description: "Menu item option",
    props: {
      label: "string",
      icon: "string",
      shortcut: "string",
      disabled: "boolean",
      danger: "boolean",
      href: "string",
      onClick: "() => void",
      children: "MenuItemProps[]"
    }
  },

  MenuGroup: {
    category: "navigation",
    keywords: ["section", "divider", "category", "separator"],
    description: "Menu item group with label",
    props: {
      label: "string",
      items: "MenuItemProps[]"
    }
  },

  Dropdown: {
    category: "navigation",
    keywords: ["select", "menu", "popup", "options", "trigger"],
    description: "Dropdown trigger and menu",
    props: {
      trigger: "ReactNode",
      placement: "'top' | 'bottom' | 'left' | 'right'",
      align: "'start' | 'center' | 'end'",
      offset: "number",
      open: "boolean",
      defaultOpen: "boolean",
      closeOnSelect: "boolean",
      items: "DropdownItemProps[]"
    }
  },

  DropdownItem: {
    category: "navigation",
    keywords: ["option", "action", "menu-item", "choice"],
    description: "Dropdown menu item",
    props: {
      label: "string",
      icon: "string",
      description: "string",
      disabled: "boolean",
      selected: "boolean",
      href: "string",
      onClick: "() => void"
    }
  },

  Tabs: {
    category: "navigation",
    keywords: ["tablist", "tabpanel", "switch", "toggle", "segments"],
    description: "Tabbed navigation container",
    props: {
      defaultValue: "string",
      value: "string",
      variant: "'default' | 'underline' | 'pills' | 'enclosed' | 'lifted'",
      size: "'sm' | 'default' | 'lg'",
      orientation: "'horizontal' | 'vertical'",
      grow: "boolean",
      items: "TabProps[]"
    }
  },

  Tab: {
    category: "navigation",
    keywords: ["tab", "button", "switch", "panel-trigger"],
    description: "Individual tab trigger",
    props: {
      value: "string",
      label: "string",
      icon: "string",
      disabled: "boolean",
      badge: "string | number",
      closable: "boolean"
    }
  },

  TabPanel: {
    category: "navigation",
    keywords: ["content", "panel", "tabpanel", "view"],
    description: "Tab content panel",
    props: {
      value: "string",
      keepMounted: "boolean",
      children: "ReactNode"
    }
  },

  Stepper: {
    category: "navigation",
    keywords: ["wizard", "progress", "steps", "workflow", "multi-step"],
    description: "Multi-step progress indicator",
    props: {
      activeStep: "number",
      orientation: "'horizontal' | 'vertical'",
      variant: "'default' | 'simple' | 'circles' | 'arrows'",
      size: "'sm' | 'default' | 'lg'",
      showConnector: "boolean",
      allowClickNavigation: "boolean",
      completedIcon: "string",
      errorIcon: "string",
      steps: "StepProps[]"
    }
  },

  Step: {
    category: "navigation",
    keywords: ["stage", "phase", "milestone", "checkpoint"],
    description: "Individual step in stepper",
    props: {
      label: "string",
      description: "string",
      icon: "string",
      status: "'pending' | 'current' | 'completed' | 'error'",
      optional: "boolean",
      disabled: "boolean"
    }
  },

  NavLink: {
    category: "navigation",
    keywords: ["link", "anchor", "route", "navigation", "active"],
    description: "Navigation link with active state",
    props: {
      href: "string",
      label: "string",
      icon: "string",
      active: "boolean",
      exact: "boolean",
      variant: "'default' | 'subtle' | 'light' | 'filled'",
      disabled: "boolean",
      leftSection: "ReactNode",
      rightSection: "ReactNode"
    }
  },

  BackLink: {
    category: "navigation",
    keywords: ["back", "return", "previous", "history", "navigate"],
    description: "Back navigation link",
    props: {
      href: "string",
      label: "string",
      icon: "string",
      fallbackHref: "string"
    }
  },

  Skip: {
    category: "navigation",
    keywords: ["skip-link", "accessibility", "a11y", "keyboard", "focus"],
    description: "Skip to content link for accessibility",
    props: {
      targetId: "string",
      label: "string"
    }
  },

  Anchor: {
    category: "navigation",
    keywords: ["link", "hash", "scroll", "bookmark", "jump"],
    description: "In-page anchor navigation",
    props: {
      id: "string",
      href: "string",
      label: "string",
      smooth: "boolean",
      offset: "number",
      external: "boolean"
    }
  },

  TreeView: {
    category: "navigation",
    keywords: ["hierarchy", "nested", "folder", "explorer", "tree"],
    description: "Hierarchical tree navigation",
    props: {
      data: "TreeItemProps[]",
      defaultExpanded: "string[]",
      defaultSelected: "string",
      multiSelect: "boolean",
      selectable: "boolean",
      checkable: "boolean",
      showLines: "boolean",
      showIcons: "boolean"
    }
  },

  TreeItem: {
    category: "navigation",
    keywords: ["node", "branch", "leaf", "folder", "item"],
    description: "Tree view node item",
    props: {
      id: "string",
      label: "string",
      icon: "string",
      expandedIcon: "string",
      disabled: "boolean",
      children: "TreeItemProps[]"
    }
  },

  CommandMenu: {
    category: "navigation",
    keywords: ["command-palette", "spotlight", "search", "quick-actions", "cmdk"],
    description: "Command palette menu",
    props: {
      open: "boolean",
      placeholder: "string",
      emptyMessage: "string",
      shortcut: "string",
      groups: "CommandGroupProps[]",
      recentItems: "CommandItemProps[]",
      maxResults: "number"
    }
  },

  CommandItem: {
    category: "navigation",
    keywords: ["action", "command", "option", "search-result"],
    description: "Command menu item",
    props: {
      id: "string",
      label: "string",
      description: "string",
      icon: "string",
      shortcut: "string",
      keywords: "string[]",
      disabled: "boolean",
      href: "string",
      onSelect: "() => void"
    }
  },

  Dock: {
    category: "navigation",
    keywords: ["taskbar", "launcher", "macos", "quick-access", "floating"],
    description: "Dock-style navigation bar",
    props: {
      position: "'bottom' | 'top' | 'left' | 'right'",
      size: "'sm' | 'default' | 'lg'",
      magnification: "boolean",
      magnificationScale: "number",
      items: "DockItemProps[]"
    }
  },

  DockItem: {
    category: "navigation",
    keywords: ["app", "shortcut", "icon", "launcher"],
    description: "Dock navigation item",
    props: {
      id: "string",
      icon: "string",
      label: "string",
      href: "string",
      active: "boolean",
      badge: "string | number",
      tooltip: "string",
      onClick: "() => void"
    }
  },

  FloatingNav: {
    category: "navigation",
    keywords: ["floating", "sticky", "bubble", "fab", "quick-nav"],
    description: "Floating navigation element",
    props: {
      position: "'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-left'",
      variant: "'bar' | 'bubble' | 'pill'",
      showOnScroll: "boolean",
      hideOnScrollDown: "boolean",
      offset: "{ x?: number; y?: number }",
      items: "NavItemProps[]"
    }
  },

  BottomNav: {
    category: "navigation",
    keywords: ["mobile", "footer", "tab-bar", "app-nav", "bottom-bar"],
    description: "Mobile bottom navigation bar",
    props: {
      variant: "'default' | 'shifting' | 'labeled'",
      showLabels: "boolean",
      hideOnScroll: "boolean",
      activeItem: "string",
      items: "{ id: string; label: string; icon: string; href?: string; badge?: string | number }[]"
    }
  },

  TopBar: {
    category: "navigation",
    keywords: ["header", "appbar", "toolbar", "title-bar"],
    description: "Top application bar",
    props: {
      title: "string",
      subtitle: "string",
      leading: "ReactNode",
      trailing: "ReactNode",
      elevated: "boolean",
      transparent: "boolean",
      sticky: "boolean",
      bordered: "boolean"
    }
  },

  ActionBar: {
    category: "navigation",
    keywords: ["toolbar", "actions", "contextual", "selection", "bulk"],
    description: "Contextual action bar",
    props: {
      visible: "boolean",
      position: "'top' | 'bottom' | 'floating'",
      selectedCount: "number",
      actions: "{ id: string; label: string; icon?: string; variant?: string; onClick: () => void }[]",
      onClose: "() => void"
    }
  },

  Toolbar: {
    category: "navigation",
    keywords: ["actions", "tools", "controls", "buttons", "ribbon"],
    description: "Action toolbar container",
    props: {
      variant: "'default' | 'outline' | 'ghost'",
      size: "'sm' | 'default' | 'lg'",
      orientation: "'horizontal' | 'vertical'",
      separator: "boolean",
      fullWidth: "boolean",
      items: "{ id: string; icon: string; label?: string; tooltip?: string; disabled?: boolean; active?: boolean }[]"
    }
  }
};
