// Intent Classifier - Detects relevant component categories from user prompts

import { categoryKeywords } from './component-schemas';

export type Category =
  | 'basic'
  | 'layout'
  | 'navigation'
  | 'forms'
  | 'data-display'
  | 'feedback'
  | 'marketing'
  | 'ecommerce'
  | 'dashboard'
  | 'chat'
  | 'crm'
  | 'admin'
  | 'social'
  | 'utility';

// Prompt patterns that strongly indicate specific categories
const promptPatterns: Record<string, Category[]> = {
  // Landing page patterns
  'landing page': ['marketing', 'layout', 'navigation', 'feedback'],
  'landing': ['marketing', 'layout', 'navigation'],
  'homepage': ['marketing', 'layout', 'navigation', 'feedback'],
  'home page': ['marketing', 'layout', 'navigation', 'feedback'],
  'marketing page': ['marketing', 'layout', 'feedback'],
  'saas': ['marketing', 'layout', 'navigation', 'forms', 'feedback'],
  'startup': ['marketing', 'layout', 'navigation', 'forms'],

  // E-commerce patterns
  'shop': ['ecommerce', 'layout', 'navigation', 'forms', 'feedback'],
  'store': ['ecommerce', 'layout', 'navigation', 'forms', 'feedback'],
  'ecommerce': ['ecommerce', 'layout', 'navigation', 'forms', 'feedback'],
  'e-commerce': ['ecommerce', 'layout', 'navigation', 'forms', 'feedback'],
  'checkout': ['ecommerce', 'forms', 'layout', 'feedback'],
  'cart': ['ecommerce', 'layout', 'feedback'],
  'product': ['ecommerce', 'layout', 'data-display'],
  'order': ['ecommerce', 'data-display', 'feedback'],

  // Dashboard patterns
  'dashboard': ['dashboard', 'layout', 'navigation', 'data-display', 'feedback'],
  'admin': ['admin', 'dashboard', 'layout', 'navigation', 'forms', 'data-display'],
  'admin panel': ['admin', 'dashboard', 'layout', 'navigation', 'forms'],
  'analytics': ['dashboard', 'data-display', 'layout'],
  'reporting': ['dashboard', 'data-display', 'layout'],
  'metrics': ['dashboard', 'data-display', 'layout'],

  // CRM patterns
  'crm': ['crm', 'layout', 'navigation', 'forms', 'data-display'],
  'sales': ['crm', 'dashboard', 'data-display', 'forms'],
  'contacts': ['crm', 'data-display', 'forms'],
  'leads': ['crm', 'data-display', 'forms'],
  'pipeline': ['crm', 'data-display', 'layout'],
  'customer': ['crm', 'data-display', 'forms'],

  // Chat patterns
  'chat': ['chat', 'layout', 'forms', 'feedback'],
  'messaging': ['chat', 'layout', 'forms'],
  'conversation': ['chat', 'layout'],
  'inbox': ['chat', 'layout', 'navigation'],
  'support': ['chat', 'forms', 'feedback'],

  // Social patterns
  'social': ['social', 'layout', 'navigation', 'feedback'],
  'feed': ['social', 'layout', 'data-display'],
  'blog': ['social', 'layout', 'navigation', 'data-display'],
  'community': ['social', 'layout', 'navigation', 'feedback'],
  'profile': ['social', 'layout', 'forms'],

  // Form patterns
  'form': ['forms', 'layout', 'feedback'],
  'signup': ['forms', 'layout', 'feedback'],
  'sign up': ['forms', 'layout', 'feedback'],
  'login': ['forms', 'layout', 'feedback'],
  'register': ['forms', 'layout', 'feedback'],
  'contact form': ['forms', 'layout', 'feedback'],
  'survey': ['forms', 'layout', 'feedback'],
  'questionnaire': ['forms', 'layout', 'feedback'],

  // Settings patterns
  'settings': ['admin', 'forms', 'layout', 'navigation'],
  'preferences': ['admin', 'forms', 'layout'],
  'configuration': ['admin', 'forms', 'layout'],
  'account': ['admin', 'forms', 'layout'],

  // Data patterns
  'table': ['data-display', 'layout'],
  'list': ['data-display', 'layout'],
  'chart': ['data-display', 'layout'],
  'calendar': ['data-display', 'layout', 'navigation'],
  'kanban': ['data-display', 'layout'],
  'timeline': ['data-display', 'layout'],
};

// Classify user prompt into relevant categories
export function classifyIntent(prompt: string): Category[] {
  const promptLower = prompt.toLowerCase();
  const categories = new Set<Category>();

  // Check for pattern matches first (more specific)
  for (const [pattern, cats] of Object.entries(promptPatterns)) {
    if (promptLower.includes(pattern)) {
      cats.forEach(cat => categories.add(cat));
    }
  }

  // If no patterns matched, use keyword-based classification
  if (categories.size === 0) {
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      for (const keyword of keywords) {
        if (promptLower.includes(keyword.toLowerCase())) {
          categories.add(category as Category);
          break;
        }
      }
    }
  }

  // Always include basic and layout as they're foundational
  categories.add('basic');
  categories.add('layout');

  // If still minimal, add common categories based on context
  if (categories.size <= 2) {
    // Default to a good general set
    categories.add('navigation');
    categories.add('feedback');
  }

  return Array.from(categories);
}

// Get category weights based on prompt analysis
export function getCategoryWeights(prompt: string): Record<Category, number> {
  const promptLower = prompt.toLowerCase();
  const weights: Record<string, number> = {};

  // Initialize all categories with base weight
  for (const category of Object.keys(categoryKeywords)) {
    weights[category] = 0;
  }

  // Add weight for pattern matches
  for (const [pattern, cats] of Object.entries(promptPatterns)) {
    if (promptLower.includes(pattern)) {
      cats.forEach(cat => {
        weights[cat] = (weights[cat] || 0) + 3;
      });
    }
  }

  // Add weight for keyword matches
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (promptLower.includes(keyword.toLowerCase())) {
        weights[category] = (weights[category] || 0) + 1;
      }
    }
  }

  // Basic and layout always have minimum weight
  weights.basic = Math.max(weights.basic || 0, 1);
  weights.layout = Math.max(weights.layout || 0, 1);

  return weights as Record<Category, number>;
}

// Get top N categories by weight
export function getTopCategories(prompt: string, n: number = 5): Category[] {
  const weights = getCategoryWeights(prompt);

  return Object.entries(weights)
    .sort(([, a], [, b]) => b - a)
    .slice(0, n)
    .filter(([, weight]) => weight > 0)
    .map(([category]) => category as Category);
}

// Suggest additional categories based on detected ones
export function suggestRelatedCategories(categories: Category[]): Category[] {
  const related: Record<Category, Category[]> = {
    marketing: ['forms', 'feedback', 'navigation'],
    ecommerce: ['forms', 'feedback', 'data-display'],
    dashboard: ['data-display', 'navigation', 'feedback'],
    crm: ['forms', 'data-display', 'navigation'],
    chat: ['feedback', 'utility'],
    admin: ['forms', 'data-display', 'navigation'],
    social: ['feedback', 'forms', 'navigation'],
    forms: ['feedback', 'layout'],
    'data-display': ['layout', 'feedback'],
    feedback: ['layout'],
    navigation: ['layout'],
    basic: ['layout'],
    layout: ['basic'],
    utility: ['feedback'],
  };

  const suggestions = new Set<Category>();

  for (const category of categories) {
    const relatedCats = related[category] || [];
    relatedCats.forEach(cat => {
      if (!categories.includes(cat)) {
        suggestions.add(cat);
      }
    });
  }

  return Array.from(suggestions);
}
