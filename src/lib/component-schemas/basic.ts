export interface ComponentSchema {
  category: string;
  keywords: string[];
  description: string;
  props: Record<string, string>;
}

export const basicSchemas: Record<string, ComponentSchema> = {
  Button: {
    category: "basic",
    keywords: ["click", "action", "submit", "cta", "press", "trigger"],
    description: "Interactive button for actions",
    props: {
      variant: "'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'",
      size: "'sm' | 'default' | 'lg' | 'icon'",
      label: "string",
      action: "string",
      disabled: "boolean",
      loading: "boolean",
      icon: "string",
      iconPosition: "'left' | 'right'",
      fullWidth: "boolean",
      type: "'button' | 'submit' | 'reset'"
    }
  },

  Text: {
    category: "basic",
    keywords: ["text", "content", "copy", "paragraph", "inline"],
    description: "Generic text content component",
    props: {
      content: "string",
      size: "'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'",
      weight: "'normal' | 'medium' | 'semibold' | 'bold'",
      color: "string",
      align: "'left' | 'center' | 'right' | 'justify'",
      truncate: "boolean",
      lines: "number"
    }
  },

  Heading: {
    category: "basic",
    keywords: ["title", "header", "h1", "h2", "h3", "headline", "heading"],
    description: "Section heading with semantic levels",
    props: {
      level: "1 | 2 | 3 | 4 | 5 | 6",
      content: "string",
      size: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'",
      weight: "'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'",
      color: "string",
      align: "'left' | 'center' | 'right'",
      tracking: "'tight' | 'normal' | 'wide'"
    }
  },

  Paragraph: {
    category: "basic",
    keywords: ["text", "body", "content", "copy", "description"],
    description: "Block-level text paragraph",
    props: {
      content: "string",
      size: "'sm' | 'base' | 'lg'",
      color: "string",
      align: "'left' | 'center' | 'right' | 'justify'",
      leading: "'tight' | 'normal' | 'relaxed' | 'loose'",
      indent: "boolean",
      firstLetterCap: "boolean"
    }
  },

  Badge: {
    category: "basic",
    keywords: ["tag", "label", "status", "indicator", "chip", "pill"],
    description: "Small status indicator or label",
    props: {
      variant: "'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'",
      size: "'sm' | 'default' | 'lg'",
      label: "string",
      icon: "string",
      removable: "boolean",
      dot: "boolean",
      rounded: "boolean"
    }
  },

  Avatar: {
    category: "basic",
    keywords: ["user", "profile", "image", "picture", "photo", "initials"],
    description: "User profile image or initials display",
    props: {
      src: "string",
      alt: "string",
      fallback: "string",
      size: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
      shape: "'circle' | 'square' | 'rounded'",
      status: "'online' | 'offline' | 'away' | 'busy'",
      statusPosition: "'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'",
      border: "boolean"
    }
  },

  Icon: {
    category: "basic",
    keywords: ["symbol", "glyph", "graphic", "svg", "pictogram"],
    description: "Vector icon display",
    props: {
      name: "string",
      size: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      color: "string",
      strokeWidth: "number",
      fill: "boolean",
      spin: "boolean",
      pulse: "boolean"
    }
  },

  Link: {
    category: "basic",
    keywords: ["anchor", "href", "url", "navigation", "hyperlink"],
    description: "Clickable text link for navigation",
    props: {
      href: "string",
      label: "string",
      target: "'_self' | '_blank' | '_parent' | '_top'",
      variant: "'default' | 'muted' | 'underline' | 'none'",
      external: "boolean",
      disabled: "boolean",
      icon: "string",
      iconPosition: "'left' | 'right'"
    }
  },

  Logo: {
    category: "basic",
    keywords: ["brand", "identity", "mark", "emblem", "trademark"],
    description: "Brand logo display",
    props: {
      src: "string",
      alt: "string",
      size: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      variant: "'full' | 'icon' | 'wordmark'",
      theme: "'light' | 'dark' | 'auto'",
      href: "string"
    }
  },

  Image: {
    category: "basic",
    keywords: ["picture", "photo", "graphic", "media", "figure"],
    description: "Responsive image display",
    props: {
      src: "string",
      alt: "string",
      width: "number | string",
      height: "number | string",
      fit: "'cover' | 'contain' | 'fill' | 'none' | 'scale-down'",
      position: "string",
      loading: "'lazy' | 'eager'",
      placeholder: "string",
      fallback: "string",
      rounded: "'none' | 'sm' | 'md' | 'lg' | 'full'",
      aspectRatio: "string"
    }
  },

  Divider: {
    category: "basic",
    keywords: ["separator", "line", "hr", "rule", "border"],
    description: "Visual separator between content",
    props: {
      orientation: "'horizontal' | 'vertical'",
      variant: "'solid' | 'dashed' | 'dotted'",
      thickness: "'thin' | 'medium' | 'thick'",
      color: "string",
      label: "string",
      labelPosition: "'left' | 'center' | 'right'"
    }
  },

  Spacer: {
    category: "basic",
    keywords: ["gap", "margin", "padding", "whitespace", "buffer"],
    description: "Empty space for layout adjustment",
    props: {
      size: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'",
      axis: "'horizontal' | 'vertical' | 'both'",
      flex: "boolean"
    }
  },

  Label: {
    category: "basic",
    keywords: ["form", "input", "field", "caption", "description"],
    description: "Form field label",
    props: {
      htmlFor: "string",
      content: "string",
      required: "boolean",
      optional: "boolean",
      hint: "string",
      error: "boolean",
      disabled: "boolean"
    }
  },

  Caption: {
    category: "basic",
    keywords: ["subtitle", "description", "helper", "footnote", "annotation"],
    description: "Secondary descriptive text",
    props: {
      content: "string",
      size: "'xs' | 'sm'",
      color: "string",
      align: "'left' | 'center' | 'right'",
      italic: "boolean"
    }
  },

  Code: {
    category: "basic",
    keywords: ["inline", "monospace", "syntax", "snippet", "programming"],
    description: "Inline code display",
    props: {
      content: "string",
      language: "string",
      variant: "'inline' | 'block'",
      showLineNumbers: "boolean",
      highlightLines: "number[]",
      copyable: "boolean",
      wrap: "boolean"
    }
  },

  Kbd: {
    category: "basic",
    keywords: ["keyboard", "shortcut", "key", "hotkey", "binding"],
    description: "Keyboard key indicator",
    props: {
      keys: "string | string[]",
      separator: "string",
      size: "'sm' | 'default' | 'lg'",
      variant: "'default' | 'outline'"
    }
  },

  Mark: {
    category: "basic",
    keywords: ["highlight", "emphasis", "attention", "marker", "selection"],
    description: "Highlighted text marker",
    props: {
      content: "string",
      color: "string",
      variant: "'default' | 'subtle'"
    }
  },

  Highlight: {
    category: "basic",
    keywords: ["emphasis", "attention", "spotlight", "accent", "mark"],
    description: "Text highlight with customizable style",
    props: {
      content: "string",
      color: "string",
      gradient: "boolean",
      animated: "boolean",
      underline: "boolean"
    }
  },

  Tag: {
    category: "basic",
    keywords: ["label", "category", "keyword", "filter", "taxonomy"],
    description: "Categorization tag",
    props: {
      label: "string",
      variant: "'default' | 'outline' | 'solid'",
      color: "string",
      size: "'sm' | 'default' | 'lg'",
      removable: "boolean",
      clickable: "boolean",
      icon: "string"
    }
  },

  Chip: {
    category: "basic",
    keywords: ["pill", "tag", "selection", "filter", "option"],
    description: "Compact interactive element",
    props: {
      label: "string",
      variant: "'filled' | 'outline'",
      color: "string",
      size: "'sm' | 'default' | 'lg'",
      selected: "boolean",
      disabled: "boolean",
      avatar: "string",
      icon: "string",
      removable: "boolean"
    }
  },

  Dot: {
    category: "basic",
    keywords: ["indicator", "bullet", "point", "marker", "circle"],
    description: "Small circular indicator",
    props: {
      color: "string",
      size: "'xs' | 'sm' | 'md' | 'lg'",
      pulse: "boolean",
      ping: "boolean"
    }
  },

  Indicator: {
    category: "basic",
    keywords: ["badge", "notification", "count", "alert", "dot"],
    description: "Status or count indicator overlay",
    props: {
      count: "number",
      max: "number",
      showZero: "boolean",
      dot: "boolean",
      color: "string",
      position: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'",
      offset: "number",
      processing: "boolean"
    }
  },

  Separator: {
    category: "basic",
    keywords: ["divider", "line", "border", "rule", "split"],
    description: "Visual content separator",
    props: {
      orientation: "'horizontal' | 'vertical'",
      decorative: "boolean",
      label: "string"
    }
  },

  Anchor: {
    category: "basic",
    keywords: ["link", "hash", "bookmark", "target", "reference"],
    description: "In-page anchor link",
    props: {
      id: "string",
      href: "string",
      label: "string",
      offset: "number",
      smooth: "boolean"
    }
  },

  Span: {
    category: "basic",
    keywords: ["inline", "text", "wrapper", "container", "element"],
    description: "Inline text wrapper",
    props: {
      content: "string",
      color: "string",
      weight: "'normal' | 'medium' | 'semibold' | 'bold'",
      decoration: "'none' | 'underline' | 'line-through'"
    }
  },

  Strong: {
    category: "basic",
    keywords: ["bold", "emphasis", "important", "weight", "heavy"],
    description: "Strong emphasis text",
    props: {
      content: "string",
      weight: "'semibold' | 'bold' | 'extrabold'"
    }
  },

  Emphasis: {
    category: "basic",
    keywords: ["italic", "em", "stress", "accent", "highlight"],
    description: "Italic emphasis text",
    props: {
      content: "string",
      variant: "'italic' | 'underline' | 'both'"
    }
  },

  Small: {
    category: "basic",
    keywords: ["fine", "print", "footnote", "caption", "mini"],
    description: "Small print text",
    props: {
      content: "string",
      muted: "boolean"
    }
  },

  Quote: {
    category: "basic",
    keywords: ["blockquote", "citation", "testimonial", "pullquote", "excerpt"],
    description: "Quotation display",
    props: {
      content: "string",
      author: "string",
      source: "string",
      variant: "'default' | 'bordered' | 'highlighted'",
      size: "'sm' | 'default' | 'lg'",
      align: "'left' | 'center' | 'right'"
    }
  },

  Time: {
    category: "basic",
    keywords: ["date", "datetime", "timestamp", "relative", "calendar"],
    description: "Time and date display",
    props: {
      datetime: "string",
      format: "'relative' | 'absolute' | 'date' | 'time' | 'datetime'",
      locale: "string",
      updateInterval: "number",
      prefix: "string",
      suffix: "string"
    }
  }
};
