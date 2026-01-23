// Component Schema Index - 500 components across 14 categories

import { z } from 'zod';
import { basicSchemas } from './basic';
import { layoutSchemas } from './layout';
import { navigationSchemas } from './navigation';
import { formsSchemas } from './forms';
import { dataDisplaySchemas } from './data-display';
import { feedbackSchemas } from './feedback';
import { marketingSchemas } from './marketing';
import { ecommerceSchemas } from './ecommerce';
import { dashboardSchemas } from './dashboard';
import { chatSchemas } from './chat';
import { crmSchemas } from './crm';
import { adminSchemas } from './admin';
import { socialSchemas } from './social';
import { utilitySchemas } from './utility';

export interface ComponentSchema {
  category: string;
  keywords: string[];
  description: string;
  props: Record<string, string> | z.ZodObject<z.ZodRawShape>;
}

// Category to schema mapping
export const categorySchemas: Record<string, Record<string, ComponentSchema>> = {
  basic: basicSchemas,
  layout: layoutSchemas,
  navigation: navigationSchemas,
  forms: formsSchemas,
  'data-display': dataDisplaySchemas,
  feedback: feedbackSchemas,
  marketing: marketingSchemas,
  ecommerce: ecommerceSchemas,
  dashboard: dashboardSchemas,
  chat: chatSchemas,
  crm: crmSchemas,
  admin: adminSchemas,
  social: socialSchemas,
  utility: utilitySchemas,
};

// All schemas combined
export const allSchemas: Record<string, ComponentSchema> = {
  ...basicSchemas,
  ...layoutSchemas,
  ...navigationSchemas,
  ...formsSchemas,
  ...dataDisplaySchemas,
  ...feedbackSchemas,
  ...marketingSchemas,
  ...ecommerceSchemas,
  ...dashboardSchemas,
  ...chatSchemas,
  ...crmSchemas,
  ...adminSchemas,
  ...socialSchemas,
  ...utilitySchemas,
};

// Category keywords for intent classification
export const categoryKeywords: Record<string, string[]> = {
  basic: ['button', 'text', 'icon', 'badge', 'avatar', 'link', 'image', 'label', 'tag'],
  layout: ['layout', 'grid', 'stack', 'container', 'section', 'page', 'sidebar', 'header', 'footer', 'panel', 'split'],
  navigation: ['nav', 'menu', 'tabs', 'breadcrumb', 'pagination', 'stepper', 'sidebar', 'toolbar', 'dock'],
  forms: ['form', 'input', 'field', 'select', 'checkbox', 'radio', 'picker', 'upload', 'editor', 'textarea', 'slider', 'switch', 'rating'],
  'data-display': ['table', 'list', 'card', 'chart', 'graph', 'calendar', 'timeline', 'kanban', 'gantt', 'tree', 'gallery', 'carousel', 'metric', 'stat', 'kpi'],
  feedback: ['alert', 'toast', 'notification', 'dialog', 'modal', 'drawer', 'popup', 'skeleton', 'loading', 'spinner', 'error', 'success', 'confirm'],
  marketing: ['hero', 'landing', 'pricing', 'testimonial', 'feature', 'cta', 'faq', 'newsletter', 'about', 'team', 'partner', 'trust', 'social proof'],
  ecommerce: ['product', 'cart', 'checkout', 'order', 'payment', 'shipping', 'billing', 'invoice', 'coupon', 'discount', 'filter', 'category', 'wishlist', 'compare', 'shop', 'store', 'buy', 'purchase'],
  dashboard: ['dashboard', 'widget', 'analytics', 'report', 'activity', 'feed', 'audit', 'task', 'project', 'milestone', 'goal', 'trend', 'forecast', 'overview', 'admin panel'],
  chat: ['chat', 'message', 'conversation', 'thread', 'reply', 'reaction', 'emoji', 'typing', 'online', 'presence', 'voice', 'attachment'],
  crm: ['contact', 'company', 'deal', 'pipeline', 'lead', 'opportunity', 'sales', 'customer', 'client', 'meeting', 'call', 'email', 'note', 'document', 'relationship'],
  admin: ['settings', 'profile', 'account', 'security', 'permission', 'role', 'user', 'team', 'integration', 'api', 'webhook', 'system', 'backup', 'import', 'export'],
  social: ['post', 'comment', 'like', 'share', 'follow', 'feed', 'story', 'profile', 'author', 'blog', 'article', 'bookmark', 'social'],
  utility: ['copy', 'qr', 'barcode', 'print', 'download', 'theme', 'language', 'search', 'command', 'shortcut', 'accessibility'],
};

// Get schemas by categories
export function getSchemasByCategories(categories: string[]): Record<string, ComponentSchema> {
  const result: Record<string, ComponentSchema> = {};

  for (const category of categories) {
    const schemas = categorySchemas[category];
    if (schemas) {
      Object.assign(result, schemas);
    }
  }

  // Always include basic and layout as they're needed for structure
  if (!categories.includes('basic')) {
    Object.assign(result, basicSchemas);
  }
  if (!categories.includes('layout')) {
    Object.assign(result, layoutSchemas);
  }

  return result;
}

// Format schemas for LLM prompt
export function formatSchemasForPrompt(schemas: Record<string, ComponentSchema>): string {
  const lines: string[] = [];

  // Group by category
  const byCategory: Record<string, string[]> = {};

  for (const [name, schema] of Object.entries(schemas)) {
    const cat = schema.category;
    if (!byCategory[cat]) {
      byCategory[cat] = [];
    }

    // Format props concisely
    const propsStr = Object.entries(schema.props)
      .map(([key, type]) => `${key}: ${type}`)
      .join(', ');

    byCategory[cat].push(`- ${name}: { ${propsStr} } // ${schema.description}`);
  }

  // Output by category
  for (const [category, components] of Object.entries(byCategory)) {
    lines.push(`\n=== ${category.toUpperCase()} ===`);
    lines.push(...components);
  }

  return lines.join('\n');
}

// Get component count
export function getComponentCount(): number {
  return Object.keys(allSchemas).length;
}

// Search components by keyword
export function searchComponents(query: string): string[] {
  const queryLower = query.toLowerCase();
  const matches: string[] = [];

  for (const [name, schema] of Object.entries(allSchemas)) {
    if (
      name.toLowerCase().includes(queryLower) ||
      schema.description.toLowerCase().includes(queryLower) ||
      schema.keywords.some(k => k.includes(queryLower))
    ) {
      matches.push(name);
    }
  }

  return matches;
}

export {
  basicSchemas,
  layoutSchemas,
  navigationSchemas,
  formsSchemas,
  dataDisplaySchemas,
  feedbackSchemas,
  marketingSchemas,
  ecommerceSchemas,
  dashboardSchemas,
  chatSchemas,
  crmSchemas,
  adminSchemas,
  socialSchemas,
  utilitySchemas,
};
