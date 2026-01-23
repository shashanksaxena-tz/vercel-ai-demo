export interface ComponentSchema {
  category: string;
  keywords: string[];
  description: string;
  props: Record<string, string>;
}

export const layoutSchemas: Record<string, ComponentSchema> = {
  Stack: {
    category: "layout",
    keywords: ["flex", "column", "vertical", "list", "group"],
    description: "Vertical or horizontal stack of elements",
    props: {
      direction: "'vertical' | 'horizontal'",
      gap: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
      align: "'start' | 'center' | 'end' | 'stretch' | 'baseline'",
      justify: "'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'",
      wrap: "boolean",
      reverse: "boolean",
      divider: "boolean",
      children: "ReactNode"
    }
  },

  Grid: {
    category: "layout",
    keywords: ["columns", "rows", "layout", "matrix", "table"],
    description: "CSS Grid layout container",
    props: {
      columns: "number | string",
      rows: "number | string",
      gap: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      rowGap: "string",
      columnGap: "string",
      align: "'start' | 'center' | 'end' | 'stretch'",
      justify: "'start' | 'center' | 'end' | 'stretch'",
      autoFlow: "'row' | 'column' | 'dense'",
      autoRows: "string",
      autoColumns: "string",
      children: "ReactNode"
    }
  },

  Container: {
    category: "layout",
    keywords: ["wrapper", "max-width", "centered", "content", "page"],
    description: "Centered max-width container",
    props: {
      size: "'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'",
      padding: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
      centered: "boolean",
      fluid: "boolean",
      children: "ReactNode"
    }
  },

  Section: {
    category: "layout",
    keywords: ["segment", "region", "area", "block", "part"],
    description: "Semantic page section",
    props: {
      padding: "'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
      background: "string",
      fullWidth: "boolean",
      id: "string",
      ariaLabel: "string",
      children: "ReactNode"
    }
  },

  Box: {
    category: "layout",
    keywords: ["div", "wrapper", "container", "element", "block"],
    description: "Generic layout box",
    props: {
      as: "string",
      padding: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      margin: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      background: "string",
      border: "boolean",
      borderRadius: "'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
      shadow: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
      width: "string",
      height: "string",
      children: "ReactNode"
    }
  },

  Flex: {
    category: "layout",
    keywords: ["flexbox", "row", "column", "align", "justify"],
    description: "Flexbox layout container",
    props: {
      direction: "'row' | 'column' | 'row-reverse' | 'column-reverse'",
      align: "'start' | 'center' | 'end' | 'stretch' | 'baseline'",
      justify: "'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'",
      wrap: "'nowrap' | 'wrap' | 'wrap-reverse'",
      gap: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      inline: "boolean",
      children: "ReactNode"
    }
  },

  Center: {
    category: "layout",
    keywords: ["align", "middle", "centered", "justify", "absolute"],
    description: "Center content horizontally and vertically",
    props: {
      inline: "boolean",
      axis: "'horizontal' | 'vertical' | 'both'",
      children: "ReactNode"
    }
  },

  AspectRatio: {
    category: "layout",
    keywords: ["ratio", "proportion", "video", "image", "responsive"],
    description: "Maintain aspect ratio for content",
    props: {
      ratio: "number | string",
      maxWidth: "string",
      children: "ReactNode"
    }
  },

  ScrollArea: {
    category: "layout",
    keywords: ["overflow", "scroll", "scrollbar", "container", "viewport"],
    description: "Custom scrollable container",
    props: {
      orientation: "'vertical' | 'horizontal' | 'both'",
      scrollbarSize: "'thin' | 'default' | 'none'",
      scrollHideDelay: "number",
      type: "'auto' | 'always' | 'scroll' | 'hover'",
      maxHeight: "string",
      maxWidth: "string",
      children: "ReactNode"
    }
  },

  Wrap: {
    category: "layout",
    keywords: ["flex", "wrap", "flow", "responsive", "reflow"],
    description: "Auto-wrapping flex container",
    props: {
      gap: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      align: "'start' | 'center' | 'end' | 'stretch'",
      justify: "'start' | 'center' | 'end' | 'between'",
      direction: "'row' | 'row-reverse'",
      children: "ReactNode"
    }
  },

  HStack: {
    category: "layout",
    keywords: ["horizontal", "row", "inline", "side-by-side", "flex"],
    description: "Horizontal stack layout",
    props: {
      gap: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      align: "'start' | 'center' | 'end' | 'stretch' | 'baseline'",
      justify: "'start' | 'center' | 'end' | 'between' | 'around'",
      wrap: "boolean",
      reverse: "boolean",
      divider: "boolean",
      children: "ReactNode"
    }
  },

  VStack: {
    category: "layout",
    keywords: ["vertical", "column", "stacked", "top-to-bottom", "flex"],
    description: "Vertical stack layout",
    props: {
      gap: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      align: "'start' | 'center' | 'end' | 'stretch'",
      justify: "'start' | 'center' | 'end' | 'between' | 'around'",
      divider: "boolean",
      children: "ReactNode"
    }
  },

  SimpleGrid: {
    category: "layout",
    keywords: ["grid", "columns", "responsive", "auto", "equal"],
    description: "Simple responsive grid layout",
    props: {
      columns: "number | { sm?: number; md?: number; lg?: number; xl?: number }",
      gap: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      minChildWidth: "string",
      children: "ReactNode"
    }
  },

  Columns: {
    category: "layout",
    keywords: ["multi-column", "newspaper", "magazine", "text-flow"],
    description: "Multi-column text layout",
    props: {
      count: "number",
      gap: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
      rule: "boolean",
      ruleColor: "string",
      fill: "'auto' | 'balance'",
      children: "ReactNode"
    }
  },

  Rows: {
    category: "layout",
    keywords: ["grid", "horizontal", "lines", "stacked", "layers"],
    description: "Row-based grid layout",
    props: {
      rows: "number | string",
      gap: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      align: "'start' | 'center' | 'end' | 'stretch'",
      children: "ReactNode"
    }
  },

  Sidebar: {
    category: "layout",
    keywords: ["aside", "navigation", "drawer", "panel", "rail"],
    description: "Side panel layout",
    props: {
      side: "'left' | 'right'",
      width: "string",
      collapsed: "boolean",
      collapsedWidth: "string",
      resizable: "boolean",
      minWidth: "string",
      maxWidth: "string",
      bordered: "boolean",
      children: "ReactNode"
    }
  },

  Main: {
    category: "layout",
    keywords: ["content", "primary", "body", "central", "article"],
    description: "Main content area",
    props: {
      padding: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
      maxWidth: "string",
      centered: "boolean",
      children: "ReactNode"
    }
  },

  Aside: {
    category: "layout",
    keywords: ["sidebar", "secondary", "complementary", "auxiliary"],
    description: "Complementary content aside",
    props: {
      width: "string",
      position: "'left' | 'right'",
      sticky: "boolean",
      stickyOffset: "string",
      children: "ReactNode"
    }
  },

  Header: {
    category: "layout",
    keywords: ["top", "banner", "masthead", "navigation", "appbar"],
    description: "Page or section header",
    props: {
      sticky: "boolean",
      stickyOffset: "string",
      bordered: "boolean",
      transparent: "boolean",
      blur: "boolean",
      height: "string",
      children: "ReactNode"
    }
  },

  Footer: {
    category: "layout",
    keywords: ["bottom", "end", "copyright", "links", "info"],
    description: "Page or section footer",
    props: {
      sticky: "boolean",
      bordered: "boolean",
      background: "string",
      padding: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
      children: "ReactNode"
    }
  },

  Page: {
    category: "layout",
    keywords: ["document", "view", "screen", "route", "template"],
    description: "Full page layout wrapper",
    props: {
      title: "string",
      description: "string",
      maxWidth: "string",
      padding: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
      background: "string",
      children: "ReactNode"
    }
  },

  Screen: {
    category: "layout",
    keywords: ["fullscreen", "viewport", "view", "window", "display"],
    description: "Full viewport screen layout",
    props: {
      centered: "boolean",
      background: "string",
      overflow: "'auto' | 'hidden' | 'scroll'",
      children: "ReactNode"
    }
  },

  Frame: {
    category: "layout",
    keywords: ["border", "outline", "wrapper", "container", "box"],
    description: "Bordered frame container",
    props: {
      padding: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
      border: "'none' | 'thin' | 'medium' | 'thick'",
      borderRadius: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
      borderStyle: "'solid' | 'dashed' | 'dotted'",
      borderColor: "string",
      shadow: "'none' | 'sm' | 'md' | 'lg'",
      children: "ReactNode"
    }
  },

  Panel: {
    category: "layout",
    keywords: ["card", "section", "block", "container", "region"],
    description: "Content panel with optional header",
    props: {
      title: "string",
      subtitle: "string",
      padding: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
      bordered: "boolean",
      shadow: "'none' | 'sm' | 'md' | 'lg'",
      collapsible: "boolean",
      defaultCollapsed: "boolean",
      headerActions: "ReactNode",
      children: "ReactNode"
    }
  },

  Pane: {
    category: "layout",
    keywords: ["split", "section", "division", "region", "area"],
    description: "Split pane section",
    props: {
      size: "string | number",
      minSize: "string | number",
      maxSize: "string | number",
      defaultSize: "string | number",
      collapsible: "boolean",
      resizable: "boolean",
      children: "ReactNode"
    }
  },

  Split: {
    category: "layout",
    keywords: ["divide", "panes", "resize", "separator", "dual"],
    description: "Split view container",
    props: {
      direction: "'horizontal' | 'vertical'",
      sizes: "number[]",
      minSizes: "number[]",
      maxSizes: "number[]",
      gutterSize: "number",
      snapOffset: "number",
      children: "ReactNode"
    }
  },

  Resizable: {
    category: "layout",
    keywords: ["resize", "drag", "adjust", "scale", "handle"],
    description: "Resizable container",
    props: {
      direction: "'horizontal' | 'vertical' | 'both'",
      defaultSize: "{ width?: string | number; height?: string | number }",
      minWidth: "string | number",
      maxWidth: "string | number",
      minHeight: "string | number",
      maxHeight: "string | number",
      handlePosition: "'start' | 'end' | 'both'",
      children: "ReactNode"
    }
  },

  Collapsible: {
    category: "layout",
    keywords: ["accordion", "expand", "collapse", "toggle", "fold"],
    description: "Collapsible content section",
    props: {
      open: "boolean",
      defaultOpen: "boolean",
      disabled: "boolean",
      trigger: "ReactNode",
      children: "ReactNode"
    }
  },

  Expandable: {
    category: "layout",
    keywords: ["show-more", "truncate", "reveal", "toggle", "preview"],
    description: "Expandable content with show more",
    props: {
      maxHeight: "string",
      expanded: "boolean",
      defaultExpanded: "boolean",
      showMoreLabel: "string",
      showLessLabel: "string",
      gradient: "boolean",
      children: "ReactNode"
    }
  },

  Masonry: {
    category: "layout",
    keywords: ["pinterest", "grid", "columns", "waterfall", "stagger"],
    description: "Masonry grid layout",
    props: {
      columns: "number | { sm?: number; md?: number; lg?: number }",
      gap: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
      sequential: "boolean",
      children: "ReactNode"
    }
  },

  Float: {
    category: "layout",
    keywords: ["position", "absolute", "floating", "offset", "anchor"],
    description: "Floating positioned element",
    props: {
      position: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'",
      offset: "{ x?: number; y?: number }",
      zIndex: "number",
      children: "ReactNode"
    }
  },

  Absolute: {
    category: "layout",
    keywords: ["position", "fixed", "offset", "pin", "anchor"],
    description: "Absolutely positioned element",
    props: {
      top: "string | number",
      right: "string | number",
      bottom: "string | number",
      left: "string | number",
      inset: "string | number",
      zIndex: "number",
      children: "ReactNode"
    }
  },

  Fixed: {
    category: "layout",
    keywords: ["sticky", "viewport", "pinned", "locked", "position"],
    description: "Fixed position element",
    props: {
      position: "'top' | 'bottom' | 'left' | 'right' | 'center'",
      offset: "string | number",
      zIndex: "number",
      children: "ReactNode"
    }
  },

  Sticky: {
    category: "layout",
    keywords: ["fixed", "scroll", "pinned", "attached", "persistent"],
    description: "Sticky positioned element",
    props: {
      top: "string | number",
      bottom: "string | number",
      zIndex: "number",
      disabled: "boolean",
      children: "ReactNode"
    }
  },

  Layer: {
    category: "layout",
    keywords: ["z-index", "stack", "overlay", "level", "depth"],
    description: "Z-index layer container",
    props: {
      zIndex: "number | 'base' | 'dropdown' | 'sticky' | 'modal' | 'popover' | 'tooltip'",
      children: "ReactNode"
    }
  },

  Overlay: {
    category: "layout",
    keywords: ["modal", "backdrop", "cover", "mask", "scrim"],
    description: "Full-screen overlay layer",
    props: {
      open: "boolean",
      blur: "boolean",
      opacity: "number",
      color: "string",
      zIndex: "number",
      closeOnClick: "boolean",
      children: "ReactNode"
    }
  },

  Backdrop: {
    category: "layout",
    keywords: ["overlay", "mask", "scrim", "background", "dim"],
    description: "Background overlay backdrop",
    props: {
      open: "boolean",
      opacity: "number",
      blur: "'none' | 'sm' | 'md' | 'lg'",
      color: "string",
      onClick: "() => void"
    }
  },

  Portal: {
    category: "layout",
    keywords: ["teleport", "mount", "container", "root", "escape"],
    description: "Render children in a portal",
    props: {
      container: "HTMLElement | string",
      disabled: "boolean",
      children: "ReactNode"
    }
  },

  ZStack: {
    category: "layout",
    keywords: ["layers", "overlap", "stack", "z-index", "depth"],
    description: "Stacked layers on z-axis",
    props: {
      align: "'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
      children: "ReactNode"
    }
  },

  Group: {
    category: "layout",
    keywords: ["cluster", "collection", "set", "bundle", "inline"],
    description: "Inline group of elements",
    props: {
      gap: "'none' | 'xs' | 'sm' | 'md' | 'lg'",
      align: "'start' | 'center' | 'end' | 'stretch'",
      justify: "'start' | 'center' | 'end' | 'between'",
      wrap: "boolean",
      grow: "boolean",
      preventGrowOverflow: "boolean",
      children: "ReactNode"
    }
  }
};
