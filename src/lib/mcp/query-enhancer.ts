/**
 * Query Enhancement Engine for MCP Component Discovery
 *
 * Expands user search queries with synonyms, related terms, and intent-based refinements
 * to improve component discovery accuracy and coverage.
 *
 * Features:
 * - Comprehensive synonym dictionary (30+ component types)
 * - Intent-based query expansion
 * - Related term suggestions
 * - Confidence scoring
 */

export interface QueryEnhancement {
  /** Original search query */
  originalQuery: string;

  /** All enhanced query variations */
  enhancedQueries: string[];

  /** Direct synonyms of the query term */
  synonyms: string[];

  /** Related terms that might be relevant */
  relatedTerms: string[];

  /** Intent-specific terms to add */
  intentTerms: string[];

  /** Confidence score (0-1) for the enhancement quality */
  confidence: number;
}

export interface QueryEnhancerOptions {
  /** Maximum number of synonyms to include (default: 5) */
  maxSynonyms?: number;

  /** Whether to include related terms (default: true) */
  includeRelated?: boolean;

  /** Minimum confidence threshold (default: 0.3) */
  minConfidence?: number;

  /** Whether to expand with intent-based terms (default: true) */
  useIntentExpansion?: boolean;
}

/**
 * Comprehensive synonym dictionary for component types
 * Maps component terms to their common variations and synonyms
 */
const SYNONYM_DICTIONARY: Record<string, string[]> = {
  // Buttons & Actions
  button: ['cta', 'action', 'submit', 'button-group', 'btn', 'action-button'],
  cta: ['button', 'call-to-action', 'action', 'conversion-button'],

  // Cards & Containers
  card: ['panel', 'container', 'box', 'tile', 'widget', 'card-component'],
  panel: ['card', 'section', 'container', 'pane', 'widget'],
  container: ['wrapper', 'box', 'layout', 'section', 'holder'],
  box: ['container', 'panel', 'wrapper', 'div', 'block'],

  // Forms & Inputs
  form: ['input', 'field', 'form-control', 'text-field', 'form-group', 'form-component'],
  input: ['field', 'text-input', 'form-control', 'text-field', 'textbox'],
  field: ['input', 'form-field', 'control', 'form-control'],
  select: ['dropdown', 'picker', 'chooser', 'selector', 'combobox'],
  checkbox: ['check', 'tick', 'toggle-box', 'checkmark'],
  radio: ['radio-button', 'option', 'choice', 'radio-group'],
  textarea: ['text-area', 'multiline-input', 'text-box', 'editor'],

  // Charts & Visualization
  chart: ['graph', 'visualization', 'plot', 'diagram', 'viz', 'data-viz'],
  graph: ['chart', 'plot', 'visualization', 'diagram', 'analytics'],
  visualization: ['chart', 'graph', 'viz', 'data-visualization', 'plot'],
  diagram: ['chart', 'graph', 'flowchart', 'schema', 'visual'],

  // Tables & Data Display
  table: ['data-grid', 'data-table', 'list', 'grid', 'datagrid', 'spreadsheet'],
  datagrid: ['table', 'data-table', 'grid', 'spreadsheet'],
  list: ['table', 'listing', 'data-list', 'items', 'collection'],

  // Navigation
  navigation: ['nav', 'menu', 'navbar', 'sidebar', 'tabs', 'nav-menu'],
  nav: ['navigation', 'menu', 'navbar', 'nav-bar'],
  menu: ['navigation', 'nav', 'dropdown-menu', 'context-menu', 'options'],
  navbar: ['navigation', 'nav', 'header', 'top-bar', 'menu-bar'],
  sidebar: ['side-nav', 'drawer', 'panel', 'side-panel', 'side-menu'],
  tabs: ['tab-panel', 'tab-group', 'tabbed', 'tab-navigation'],

  // Modals & Overlays
  modal: ['dialog', 'popup', 'overlay', 'drawer', 'lightbox', 'modal-dialog'],
  dialog: ['modal', 'popup', 'alert-dialog', 'confirmation', 'prompt'],
  popup: ['modal', 'dialog', 'popover', 'overlay', 'tooltip'],
  drawer: ['sidebar', 'slide-out', 'panel', 'side-drawer'],
  overlay: ['modal', 'backdrop', 'mask', 'screen-overlay'],

  // Alerts & Notifications
  alert: ['notification', 'toast', 'message', 'banner', 'snackbar', 'alert-message'],
  notification: ['toast', 'alert', 'message', 'notice', 'snackbar'],
  toast: ['notification', 'snackbar', 'message', 'alert', 'popup-message'],
  banner: ['alert', 'notification', 'announcement', 'header-banner', 'promo'],
  snackbar: ['toast', 'notification', 'message', 'alert'],

  // Layout Components
  layout: ['container', 'wrapper', 'grid', 'flex', 'structure'],
  'layout-grid': ['grid', 'flex-grid', 'css-grid', 'grid-system', 'columns'],
  flex: ['flexbox', 'flex-container', 'layout', 'flexible-layout'],
  stack: ['vertical-stack', 'horizontal-stack', 'flex', 'layout'],

  // Typography
  heading: ['title', 'header', 'h1', 'h2', 'headline'],
  text: ['paragraph', 'label', 'typography', 'text-content'],
  paragraph: ['text', 'body-text', 'content', 'p'],
  label: ['text', 'caption', 'tag', 'description'],

  // Media
  image: ['img', 'picture', 'photo', 'graphic', 'visual'],
  icon: ['svg', 'glyph', 'symbol', 'pictogram', 'graphic'],
  video: ['media', 'player', 'video-player', 'embed'],
  avatar: ['profile-picture', 'user-avatar', 'profile-icon', 'thumbnail'],

  // Feedback & Loading
  spinner: ['loader', 'loading', 'loading-spinner', 'progress-spinner'],
  loader: ['spinner', 'loading', 'loading-indicator', 'progress'],
  progress: ['progress-bar', 'loading', 'status-bar', 'meter'],
  skeleton: ['loading-skeleton', 'placeholder', 'shimmer', 'ghost-loading'],

  // Data Entry
  datepicker: ['date-picker', 'calendar', 'date-input', 'date-selector'],
  timepicker: ['time-picker', 'time-input', 'time-selector', 'clock-picker'],
  colorpicker: ['color-picker', 'color-selector', 'palette', 'color-input'],
  slider: ['range', 'range-slider', 'track', 'slider-control'],
  switch: ['toggle', 'switch-toggle', 'toggle-button', 'on-off'],

  // Advanced Components
  accordion: ['collapse', 'expander', 'accordion-panel', 'expandable'],
  carousel: ['slider', 'slideshow', 'image-carousel', 'swiper'],
  breadcrumb: ['breadcrumbs', 'navigation-trail', 'path', 'crumb-trail'],
  pagination: ['pager', 'page-navigation', 'paginator', 'page-control'],
  tooltip: ['hint', 'popover', 'info-tip', 'help-text'],
  badge: ['tag', 'label', 'chip', 'pill', 'indicator'],

  // Authentication
  login: ['signin', 'auth', 'authentication', 'sign-in', 'login-form'],
  signup: ['register', 'registration', 'sign-up', 'create-account'],
  auth: ['authentication', 'login', 'signin', 'authorization'],

  // Dashboard Components
  metric: ['stat', 'kpi', 'metric-card', 'statistic', 'data-point'],
  stat: ['metric', 'statistic', 'kpi', 'stat-card', 'number'],
  kpi: ['metric', 'stat', 'key-metric', 'performance-indicator'],
};

/**
 * Related terms that often appear together
 * Maps component types to conceptually related components
 */
const RELATED_TERMS: Record<string, string[]> = {
  button: ['icon', 'link', 'badge', 'spinner'],
  form: ['input', 'select', 'checkbox', 'radio', 'button', 'validation', 'error'],
  card: ['image', 'heading', 'text', 'button', 'badge'],
  table: ['pagination', 'search', 'filter', 'sort', 'checkbox'],
  modal: ['button', 'overlay', 'close', 'backdrop'],
  navigation: ['link', 'icon', 'dropdown', 'search'],
  chart: ['tooltip', 'legend', 'axis', 'grid', 'label'],
  login: ['input', 'button', 'checkbox', 'link', 'validation'],
  dashboard: ['chart', 'metric', 'table', 'card', 'stat'],
  hero: ['heading', 'text', 'button', 'image', 'video'],
  pricing: ['card', 'button', 'badge', 'list', 'heading'],
};

/**
 * Intent-based term expansion
 * Maps user intents to additional search terms
 */
const INTENT_EXPANSIONS: Record<string, string[]> = {
  dashboard: ['chart', 'graph', 'metric', 'stat', 'kpi', 'data-viz', 'analytics', 'visualization'],
  'landing-page': ['hero', 'cta', 'feature', 'testimonial', 'pricing', 'logo-cloud', 'newsletter'],
  form: ['input', 'select', 'checkbox', 'radio', 'validation', 'field', 'picker', 'upload'],
  'data-table': ['pagination', 'sort', 'filter', 'search', 'column', 'row', 'grid'],
  marketing: ['banner', 'notification', 'toast', 'badge', 'promo', 'announcement'],
  admin: ['sidebar', 'navigation', 'breadcrumb', 'tabs', 'menu', 'settings', 'tree'],
  app: ['layout', 'container', 'grid', 'card', 'panel', 'section'],
  general: ['button', 'input', 'text', 'heading', 'link'],
};

/**
 * Get synonyms for a given term
 */
export function getSynonyms(term: string): string[] {
  const normalized = term.toLowerCase().trim();
  return SYNONYM_DICTIONARY[normalized] || [];
}

/**
 * Get related terms for a given term
 */
export function getRelatedTerms(term: string): string[] {
  const normalized = term.toLowerCase().trim();
  return RELATED_TERMS[normalized] || [];
}

/**
 * Get intent-based expansion terms
 */
export function getIntentTerms(intent: string): string[] {
  const normalized = intent.toLowerCase().trim();
  return INTENT_EXPANSIONS[normalized] || [];
}

/**
 * Calculate confidence score for query enhancement
 *
 * Factors:
 * - Exact match in synonym dictionary: +0.5
 * - Has related terms: +0.2
 * - Intent match: +0.3
 */
function calculateConfidence(
  term: string,
  hasSynonyms: boolean,
  hasRelated: boolean,
  hasIntent: boolean
): number {
  let confidence = 0.3; // Base confidence

  if (hasSynonyms) {
    confidence += 0.5;
  }

  if (hasRelated) {
    confidence += 0.2;
  }

  if (hasIntent) {
    confidence += 0.3;
  }

  return Math.min(confidence, 1.0);
}

/**
 * Enhance a search query with synonyms, related terms, and intent-based expansions
 *
 * @param query - The original search query
 * @param intent - Optional intent category for context-aware expansion
 * @param options - Configuration options
 * @returns Enhanced query with all variations and metadata
 *
 * @example
 * ```typescript
 * // Basic usage
 * const result = enhanceQuery('button');
 * // result.enhancedQueries = ['button', 'cta', 'action', 'submit', 'button-group']
 *
 * // With intent
 * const dashboardResult = enhanceQuery('button', 'dashboard');
 * // Adds metric-button, stat-button, etc.
 *
 * // With options
 * const customResult = enhanceQuery('chart', 'dashboard', {
 *   maxSynonyms: 3,
 *   includeRelated: true
 * });
 * ```
 */
export function enhanceQuery(
  query: string,
  intent?: string,
  options: QueryEnhancerOptions = {}
): QueryEnhancement {
  const {
    maxSynonyms = 5,
    includeRelated = true,
    minConfidence = 0.3,
    useIntentExpansion = true,
  } = options;

  const normalized = query.toLowerCase().trim();
  const synonyms = getSynonyms(normalized).slice(0, maxSynonyms);
  const relatedTerms = includeRelated ? getRelatedTerms(normalized) : [];
  const intentTerms = (intent && useIntentExpansion) ? getIntentTerms(intent) : [];

  // Build enhanced queries
  const enhancedQueries: string[] = [normalized];

  // Add synonyms
  synonyms.forEach(syn => {
    if (!enhancedQueries.includes(syn)) {
      enhancedQueries.push(syn);
    }
  });

  // Add intent-specific combinations
  if (intent && useIntentExpansion) {
    intentTerms.forEach(intentTerm => {
      const combined = `${intentTerm}-${normalized}`;
      if (!enhancedQueries.includes(combined)) {
        enhancedQueries.push(combined);
      }
    });

    // Also try reverse combination for some terms
    if (['button', 'card', 'input', 'field'].includes(normalized)) {
      intentTerms.slice(0, 2).forEach(intentTerm => {
        const combined = `${normalized}-${intentTerm}`;
        if (!enhancedQueries.includes(combined)) {
          enhancedQueries.push(combined);
        }
      });
    }
  }

  // Calculate confidence
  const confidence = calculateConfidence(
    normalized,
    synonyms.length > 0,
    relatedTerms.length > 0,
    intentTerms.length > 0
  );

  // Return empty result if confidence too low
  if (confidence < minConfidence) {
    return {
      originalQuery: query,
      enhancedQueries: [normalized],
      synonyms: [],
      relatedTerms: [],
      intentTerms: [],
      confidence: 0,
    };
  }

  return {
    originalQuery: query,
    enhancedQueries,
    synonyms,
    relatedTerms,
    intentTerms,
    confidence,
  };
}

/**
 * Enhance multiple queries at once
 *
 * Useful for batch processing multiple search terms
 */
export function enhanceQueries(
  queries: string[],
  intent?: string,
  options?: QueryEnhancerOptions
): QueryEnhancement[] {
  return queries.map(query => enhanceQuery(query, intent, options));
}

/**
 * Get all unique enhanced queries from multiple enhancements
 */
export function mergeEnhancements(enhancements: QueryEnhancement[]): string[] {
  const allQueries = new Set<string>();

  enhancements.forEach(enhancement => {
    enhancement.enhancedQueries.forEach(query => allQueries.add(query));
  });

  return Array.from(allQueries);
}

/**
 * Expand a component search query with all possible variations
 *
 * This is a convenience function that combines query enhancement with
 * smart filtering to provide the most relevant search terms.
 */
export function expandSearchQuery(
  query: string,
  intent?: string,
  maxResults: number = 10
): string[] {
  const enhancement = enhanceQuery(query, intent);

  // Combine all unique terms
  const allTerms = new Set([
    ...enhancement.enhancedQueries,
    ...enhancement.synonyms.slice(0, 3),
    ...enhancement.relatedTerms.slice(0, 2),
  ]);

  // Return as array, limited to maxResults
  return Array.from(allTerms).slice(0, maxResults);
}

/**
 * Get statistics about the synonym dictionary
 */
export function getDictionaryStats() {
  const synonymCount = Object.keys(SYNONYM_DICTIONARY).length;
  const totalSynonyms = Object.values(SYNONYM_DICTIONARY).reduce(
    (sum, syns) => sum + syns.length,
    0
  );
  const relatedCount = Object.keys(RELATED_TERMS).length;
  const intentCount = Object.keys(INTENT_EXPANSIONS).length;

  return {
    synonymEntries: synonymCount,
    totalSynonyms,
    averageSynonymsPerTerm: (totalSynonyms / synonymCount).toFixed(2),
    relatedTermEntries: relatedCount,
    intentExpansions: intentCount,
  };
}
