export interface ComponentSchema {
  category: string;
  keywords: string[];
  description: string;
  props: Record<string, string>;
}

export const utilitySchemas: Record<string, ComponentSchema> = {
  Copy: {
    category: "utility",
    keywords: ["copy", "clipboard", "duplicate", "text", "content"],
    description: "Copy functionality wrapper component",
    props: {
      value: "string",
      children: "ReactNode | ((copied: boolean, copy: () => void) => ReactNode)",
      onCopy: "(value: string) => void",
      onCopyError: "(error: Error) => void",
      resetTimeout: "number",
      disabled: "boolean"
    }
  },

  CopyButton: {
    category: "utility",
    keywords: ["copy", "button", "clipboard", "action", "duplicate"],
    description: "Button to copy content to clipboard",
    props: {
      value: "string",
      label: "string",
      copiedLabel: "string",
      showLabel: "boolean",
      icon: "ReactNode",
      copiedIcon: "ReactNode",
      size: "'sm' | 'md' | 'lg'",
      variant: "'default' | 'outline' | 'ghost' | 'filled'",
      color: "string",
      copiedColor: "string",
      disabled: "boolean",
      showTooltip: "boolean",
      tooltipText: "string",
      copiedTooltipText: "string",
      resetTimeout: "number",
      onCopy: "() => void",
      onCopyError: "(error: Error) => void"
    }
  },

  CopyToClipboard: {
    category: "utility",
    keywords: ["copy", "clipboard", "text", "input", "field"],
    description: "Input field with copy to clipboard functionality",
    props: {
      value: "string",
      label: "string",
      showInput: "boolean",
      inputReadOnly: "boolean",
      inputVariant: "'outlined' | 'filled' | 'underlined'",
      showCopyButton: "boolean",
      copyButtonPosition: "'inside' | 'outside'",
      copyButtonLabel: "string",
      copiedLabel: "string",
      showSuccessMessage: "boolean",
      successMessage: "string",
      successMessageDuration: "number",
      selectOnFocus: "boolean",
      masked: "boolean",
      showRevealButton: "boolean",
      size: "'sm' | 'md' | 'lg'",
      fullWidth: "boolean",
      onCopy: "() => void",
      onCopyError: "(error: Error) => void"
    }
  },

  QRCode: {
    category: "utility",
    keywords: ["qr", "code", "barcode", "scan", "link", "url"],
    description: "QR code generator component",
    props: {
      value: "string",
      size: "number",
      level: "'L' | 'M' | 'Q' | 'H'",
      bgColor: "string",
      fgColor: "string",
      includeMargin: "boolean",
      marginSize: "number",
      imageSettings: "{ src: string; width: number; height: number; excavate?: boolean }",
      renderAs: "'canvas' | 'svg'",
      showDownload: "boolean",
      downloadFileName: "string",
      downloadFormat: "'png' | 'svg' | 'jpeg'",
      showCopyButton: "boolean",
      showValue: "boolean",
      valuePosition: "'top' | 'bottom'",
      style: "CSSProperties",
      onDownload: "() => void"
    }
  },

  Barcode: {
    category: "utility",
    keywords: ["barcode", "scan", "product", "code", "ean", "upc"],
    description: "Barcode generator component",
    props: {
      value: "string",
      format: "'CODE128' | 'CODE39' | 'EAN13' | 'EAN8' | 'UPC' | 'ITF14' | 'MSI' | 'pharmacode'",
      width: "number",
      height: "number",
      displayValue: "boolean",
      text: "string",
      textAlign: "'left' | 'center' | 'right'",
      textPosition: "'top' | 'bottom'",
      textMargin: "number",
      fontSize: "number",
      fontFamily: "string",
      fontWeight: "'normal' | 'bold'",
      fontColor: "string",
      background: "string",
      lineColor: "string",
      margin: "number",
      marginTop: "number",
      marginBottom: "number",
      marginLeft: "number",
      marginRight: "number",
      flat: "boolean",
      valid: "(valid: boolean) => void",
      onError: "(error: Error) => void"
    }
  },

  Share: {
    category: "utility",
    keywords: ["share", "social", "distribute", "send", "link"],
    description: "Universal share functionality component",
    props: {
      url: "string",
      title: "string",
      text: "string",
      files: "File[]",
      useNativeShare: "boolean",
      fallbackPlatforms: "string[]",
      onShare: "(method: string) => void",
      onShareError: "(error: Error) => void",
      onNativeShareUnavailable: "() => void",
      children: "ReactNode | ((share: () => void, canShare: boolean) => ReactNode)"
    }
  },

  ShareMenu: {
    category: "utility",
    keywords: ["share", "menu", "dropdown", "social", "platforms"],
    description: "Dropdown menu with share options",
    props: {
      url: "string",
      title: "string",
      description: "string",
      image: "string",
      platforms: "{ id: string; name: string; icon: ReactNode; url?: string; color?: string }[]",
      showCopyLink: "boolean",
      copyLinkLabel: "string",
      showEmail: "boolean",
      emailSubject: "string",
      emailBody: "string",
      showNativeShare: "boolean",
      nativeShareLabel: "string",
      trigger: "ReactNode",
      placement: "'top' | 'bottom' | 'left' | 'right'",
      menuWidth: "number | string",
      showIcons: "boolean",
      showLabels: "boolean",
      onShare: "(platform: string) => void",
      onCopyLink: "() => void"
    }
  },

  Print: {
    category: "utility",
    keywords: ["print", "printer", "document", "paper", "output"],
    description: "Print functionality wrapper",
    props: {
      content: "ReactNode | string",
      contentRef: "RefObject<HTMLElement>",
      documentTitle: "string",
      pageStyle: "string",
      bodyClass: "string",
      copyStyles: "boolean",
      removeAfterPrint: "boolean",
      onBeforePrint: "() => void",
      onAfterPrint: "() => void",
      onPrintError: "(error: Error) => void",
      children: "ReactNode | ((print: () => void) => ReactNode)"
    }
  },

  PrintButton: {
    category: "utility",
    keywords: ["print", "button", "action", "document", "paper"],
    description: "Button to trigger print action",
    props: {
      contentRef: "RefObject<HTMLElement>",
      documentTitle: "string",
      label: "string",
      showLabel: "boolean",
      icon: "ReactNode",
      size: "'sm' | 'md' | 'lg'",
      variant: "'default' | 'outline' | 'ghost' | 'filled'",
      color: "string",
      disabled: "boolean",
      loading: "boolean",
      showTooltip: "boolean",
      tooltipText: "string",
      pageStyle: "string",
      copyStyles: "boolean",
      onBeforePrint: "() => void",
      onAfterPrint: "() => void",
      onClick: "() => void"
    }
  },

  Download: {
    category: "utility",
    keywords: ["download", "file", "save", "export", "blob"],
    description: "Download functionality wrapper",
    props: {
      url: "string",
      blob: "Blob",
      data: "string | object",
      filename: "string",
      mimeType: "string",
      onDownloadStart: "() => void",
      onDownloadProgress: "(progress: number) => void",
      onDownloadComplete: "() => void",
      onDownloadError: "(error: Error) => void",
      children: "ReactNode | ((download: () => void, downloading: boolean, progress: number) => ReactNode)"
    }
  },

  DownloadButton: {
    category: "utility",
    keywords: ["download", "button", "file", "save", "action"],
    description: "Button to trigger file download",
    props: {
      url: "string",
      blob: "Blob",
      data: "string | object",
      filename: "string",
      mimeType: "string",
      label: "string",
      downloadingLabel: "string",
      showLabel: "boolean",
      icon: "ReactNode",
      downloadingIcon: "ReactNode",
      size: "'sm' | 'md' | 'lg'",
      variant: "'default' | 'outline' | 'ghost' | 'filled'",
      color: "string",
      disabled: "boolean",
      showProgress: "boolean",
      showTooltip: "boolean",
      tooltipText: "string",
      onDownloadStart: "() => void",
      onDownloadProgress: "(progress: number) => void",
      onDownloadComplete: "() => void",
      onDownloadError: "(error: Error) => void"
    }
  },

  ThemeToggle: {
    category: "utility",
    keywords: ["theme", "toggle", "dark", "light", "mode", "switch"],
    description: "Toggle between light and dark themes",
    props: {
      theme: "'light' | 'dark' | 'system'",
      defaultTheme: "'light' | 'dark' | 'system'",
      showSystemOption: "boolean",
      size: "'sm' | 'md' | 'lg'",
      variant: "'switch' | 'button' | 'icon' | 'dropdown'",
      lightIcon: "ReactNode",
      darkIcon: "ReactNode",
      systemIcon: "ReactNode",
      lightLabel: "string",
      darkLabel: "string",
      systemLabel: "string",
      showLabel: "boolean",
      showTooltip: "boolean",
      animate: "boolean",
      animationType: "'rotate' | 'fade' | 'scale' | 'none'",
      storageKey: "string",
      onChange: "(theme: string) => void"
    }
  },

  ThemeSwitcher: {
    category: "utility",
    keywords: ["theme", "switcher", "color", "scheme", "palette", "appearance"],
    description: "Advanced theme switcher with multiple options",
    props: {
      themes: "{ id: string; name: string; icon?: ReactNode; preview?: string; colors?: object }[]",
      currentTheme: "string",
      defaultTheme: "string",
      showPreview: "boolean",
      previewType: "'color' | 'image' | 'component'",
      showLabels: "boolean",
      showSearch: "boolean",
      searchPlaceholder: "string",
      layout: "'grid' | 'list' | 'dropdown'",
      columns: "number",
      size: "'sm' | 'md' | 'lg'",
      showCustomize: "boolean",
      customizableProperties: "string[]",
      storageKey: "string",
      onChange: "(themeId: string) => void",
      onCustomize: "(themeId: string, properties: object) => void"
    }
  },

  LanguageSwitch: {
    category: "utility",
    keywords: ["language", "switch", "locale", "i18n", "translate", "international"],
    description: "Language selector component",
    props: {
      currentLocale: "string",
      defaultLocale: "string",
      locales: "{ code: string; name: string; nativeName?: string; flag?: string | ReactNode; direction?: 'ltr' | 'rtl' }[]",
      showFlags: "boolean",
      showNativeNames: "boolean",
      showCurrentLocale: "boolean",
      variant: "'dropdown' | 'buttons' | 'list'",
      size: "'sm' | 'md' | 'lg'",
      placement: "'bottom' | 'top' | 'left' | 'right'",
      searchable: "boolean",
      searchPlaceholder: "string",
      groupByRegion: "boolean",
      regions: "{ id: string; name: string; locales: string[] }[]",
      storageKey: "string",
      onChange: "(locale: string) => void"
    }
  },

  LocaleSelector: {
    category: "utility",
    keywords: ["locale", "selector", "region", "country", "language", "format"],
    description: "Comprehensive locale and region selector",
    props: {
      locale: "string",
      defaultLocale: "string",
      locales: "{ code: string; language: string; region?: string; name: string; flag?: string }[]",
      showLanguage: "boolean",
      showRegion: "boolean",
      showFlag: "boolean",
      showCurrency: "boolean",
      showTimezone: "boolean",
      showDateFormat: "boolean",
      combined: "boolean",
      variant: "'dropdown' | 'modal' | 'inline'",
      size: "'sm' | 'md' | 'lg'",
      searchable: "boolean",
      searchPlaceholder: "string",
      showPreview: "boolean",
      previewDate: "Date",
      previewNumber: "number",
      previewCurrency: "number",
      onChange: "(locale: string) => void",
      onLanguageChange: "(language: string) => void",
      onRegionChange: "(region: string) => void"
    }
  },

  CurrencySwitch: {
    category: "utility",
    keywords: ["currency", "switch", "money", "exchange", "selector", "forex"],
    description: "Currency selector component",
    props: {
      currency: "string",
      defaultCurrency: "string",
      currencies: "{ code: string; name: string; symbol: string; flag?: string }[]",
      showSymbol: "boolean",
      showFlag: "boolean",
      showName: "boolean",
      showCode: "boolean",
      variant: "'dropdown' | 'buttons' | 'list'",
      size: "'sm' | 'md' | 'lg'",
      placement: "'bottom' | 'top' | 'left' | 'right'",
      searchable: "boolean",
      searchPlaceholder: "string",
      popularCurrencies: "string[]",
      showPopular: "boolean",
      showExchangeRate: "boolean",
      baseCurrency: "string",
      exchangeRates: "Record<string, number>",
      storageKey: "string",
      onChange: "(currency: string) => void"
    }
  },

  Accessibility: {
    category: "utility",
    keywords: ["accessibility", "a11y", "settings", "preferences", "assistive"],
    description: "Accessibility settings panel",
    props: {
      settings: "{ fontSize: number; contrast: 'normal' | 'high' | 'higher'; reducedMotion: boolean; screenReader: boolean; focusIndicator: boolean; lineHeight: number; letterSpacing: number }",
      showFontSize: "boolean",
      fontSizeRange: "[number, number]",
      fontSizeStep: "number",
      showContrast: "boolean",
      contrastOptions: "string[]",
      showReducedMotion: "boolean",
      showScreenReader: "boolean",
      showFocusIndicator: "boolean",
      showLineHeight: "boolean",
      lineHeightRange: "[number, number]",
      showLetterSpacing: "boolean",
      letterSpacingRange: "[number, number]",
      showReset: "boolean",
      resetLabel: "string",
      storageKey: "string",
      applyImmediately: "boolean",
      variant: "'panel' | 'modal' | 'popover'",
      onChange: "(settings: object) => void",
      onReset: "() => void"
    }
  },

  KeyboardShortcuts: {
    category: "utility",
    keywords: ["keyboard", "shortcuts", "hotkeys", "bindings", "keys", "commands"],
    description: "Keyboard shortcuts display and management",
    props: {
      shortcuts: "{ id: string; keys: string[]; description: string; category?: string; enabled?: boolean }[]",
      categories: "{ id: string; name: string }[]",
      showCategories: "boolean",
      showSearch: "boolean",
      searchPlaceholder: "string",
      searchQuery: "string",
      editable: "boolean",
      showEnabled: "boolean",
      showReset: "boolean",
      keyStyle: "'default' | 'outlined' | 'filled'",
      keySize: "'sm' | 'md' | 'lg'",
      layout: "'list' | 'grid' | 'table'",
      columns: "number",
      showPlatformKeys: "boolean",
      platform: "'mac' | 'windows' | 'auto'",
      onSearch: "(query: string) => void",
      onShortcutChange: "(shortcutId: string, keys: string[]) => void",
      onShortcutToggle: "(shortcutId: string, enabled: boolean) => void",
      onReset: "() => void"
    }
  },

  Hotkey: {
    category: "utility",
    keywords: ["hotkey", "keyboard", "shortcut", "key", "binding"],
    description: "Individual hotkey binding component",
    props: {
      keys: "string | string[]",
      onTrigger: "() => void",
      enabled: "boolean",
      preventDefault: "boolean",
      stopPropagation: "boolean",
      keyup: "boolean",
      keydown: "boolean",
      repeat: "boolean",
      global: "boolean",
      scopes: "string[]",
      currentScope: "string",
      description: "string",
      children: "ReactNode"
    }
  },

  Command: {
    category: "utility",
    keywords: ["command", "action", "execute", "run", "operation"],
    description: "Command execution component",
    props: {
      id: "string",
      name: "string",
      description: "string",
      icon: "ReactNode",
      shortcut: "string[]",
      category: "string",
      keywords: "string[]",
      disabled: "boolean",
      hidden: "boolean",
      onExecute: "() => void",
      children: "ReactNode"
    }
  },

  CommandPalette: {
    category: "utility",
    keywords: ["command", "palette", "search", "actions", "launcher", "spotlight"],
    description: "Command palette for quick actions",
    props: {
      open: "boolean",
      commands: "{ id: string; name: string; description?: string; icon?: ReactNode; shortcut?: string[]; category?: string; keywords?: string[]; disabled?: boolean; onExecute: () => void }[]",
      categories: "{ id: string; name: string; icon?: ReactNode }[]",
      showCategories: "boolean",
      showShortcuts: "boolean",
      showIcons: "boolean",
      showDescriptions: "boolean",
      showRecent: "boolean",
      recentCommands: "string[]",
      maxRecent: "number",
      placeholder: "string",
      emptyMessage: "string",
      noResultsMessage: "string",
      loadingMessage: "string",
      loading: "boolean",
      hotkey: "string[]",
      closeOnSelect: "boolean",
      closeOnEscape: "boolean",
      closeOnClickOutside: "boolean",
      maxHeight: "number | string",
      width: "number | string",
      footer: "ReactNode",
      onSearch: "(query: string) => void",
      onSelect: "(commandId: string) => void",
      onClose: "() => void",
      onOpen: "() => void"
    }
  },

  Search: {
    category: "utility",
    keywords: ["search", "find", "query", "lookup", "filter"],
    description: "Search functionality component",
    props: {
      value: "string",
      defaultValue: "string",
      placeholder: "string",
      autoFocus: "boolean",
      disabled: "boolean",
      loading: "boolean",
      showIcon: "boolean",
      iconPosition: "'left' | 'right'",
      showClear: "boolean",
      showSubmit: "boolean",
      submitLabel: "string",
      debounceMs: "number",
      minLength: "number",
      maxLength: "number",
      showHistory: "boolean",
      history: "string[]",
      maxHistory: "number",
      showSuggestions: "boolean",
      suggestions: "string[] | { value: string; label: string; icon?: ReactNode }[]",
      maxSuggestions: "number",
      highlightMatch: "boolean",
      size: "'sm' | 'md' | 'lg'",
      variant: "'outlined' | 'filled' | 'underlined' | 'ghost'",
      fullWidth: "boolean",
      onChange: "(value: string) => void",
      onSearch: "(value: string) => void",
      onClear: "() => void",
      onFocus: "() => void",
      onBlur: "() => void",
      onSuggestionSelect: "(suggestion: string | object) => void",
      onHistorySelect: "(item: string) => void"
    }
  },

  SearchModal: {
    category: "utility",
    keywords: ["search", "modal", "dialog", "fullscreen", "overlay"],
    description: "Full-screen search modal",
    props: {
      open: "boolean",
      query: "string",
      placeholder: "string",
      results: "{ category: string; items: { id: string; title: string; description?: string; icon?: ReactNode; href?: string }[] }[]",
      loading: "boolean",
      showCategories: "boolean",
      showRecent: "boolean",
      recentSearches: "string[]",
      showSuggestions: "boolean",
      suggestions: "string[]",
      showFilters: "boolean",
      filters: "{ id: string; label: string; options: { value: string; label: string }[] }[]",
      activeFilters: "Record<string, string>",
      hotkey: "string[]",
      closeOnSelect: "boolean",
      closeOnEscape: "boolean",
      emptyMessage: "string",
      noResultsMessage: "string",
      maxResults: "number",
      showResultCount: "boolean",
      footer: "ReactNode",
      onSearch: "(query: string) => void",
      onFilterChange: "(filters: object) => void",
      onResultClick: "(result: object) => void",
      onClose: "() => void"
    }
  },

  GlobalSearch: {
    category: "utility",
    keywords: ["global", "search", "universal", "site", "application"],
    description: "Application-wide global search",
    props: {
      scopes: "{ id: string; name: string; icon?: ReactNode; searchFn: (query: string) => Promise<object[]> }[]",
      activeScopes: "string[]",
      query: "string",
      results: "{ scopeId: string; items: object[] }[]",
      loading: "boolean",
      loadingScopes: "string[]",
      showScopeSelector: "boolean",
      showScopeIcons: "boolean",
      aggregateResults: "boolean",
      maxResultsPerScope: "number",
      debounceMs: "number",
      minQueryLength: "number",
      placeholder: "string",
      hotkey: "string[]",
      variant: "'inline' | 'modal' | 'dropdown'",
      showViewAll: "boolean",
      viewAllLabel: "string",
      onSearch: "(query: string, scopes: string[]) => void",
      onScopeChange: "(scopes: string[]) => void",
      onResultClick: "(result: object, scopeId: string) => void",
      onViewAll: "(scopeId: string) => void"
    }
  },

  Spotlight: {
    category: "utility",
    keywords: ["spotlight", "search", "launcher", "quick", "access", "omnibar"],
    description: "Spotlight-style quick access search",
    props: {
      open: "boolean",
      query: "string",
      actions: "{ id: string; name: string; description?: string; icon?: ReactNode; shortcut?: string[]; category?: string; keywords?: string[]; onExecute: () => void }[]",
      results: "{ id: string; type: string; title: string; description?: string; icon?: ReactNode; url?: string; metadata?: object }[]",
      categories: "{ id: string; name: string; icon?: ReactNode }[]",
      loading: "boolean",
      showActions: "boolean",
      showResults: "boolean",
      showCategories: "boolean",
      showShortcuts: "boolean",
      showPreview: "boolean",
      previewPosition: "'right' | 'bottom'",
      previewWidth: "number | string",
      placeholder: "string",
      hotkey: "string[]",
      closeOnSelect: "boolean",
      closeOnEscape: "boolean",
      maxHeight: "number | string",
      width: "number | string",
      blur: "boolean",
      animation: "'fade' | 'scale' | 'slide' | 'none'",
      onSearch: "(query: string) => void",
      onActionExecute: "(actionId: string) => void",
      onResultSelect: "(result: object) => void",
      onClose: "() => void",
      onOpen: "() => void",
      renderPreview: "(item: object) => ReactNode"
    }
  }
};
