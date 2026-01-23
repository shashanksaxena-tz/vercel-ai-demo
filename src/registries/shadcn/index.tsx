'use client';

import { ComponentRegistry } from '@json-render/react';

// Import all component categories
import * as basic from './components/basic';
import * as layout from './components/layout';
import * as navigation from './components/navigation';
import * as forms from './components/forms';
import * as dataDisplay from './components/data-display';
import * as feedback from './components/feedback';
import * as marketing from './components/marketing';
import * as ecommerce from './components/ecommerce';
import * as dashboard from './components/dashboard';
import * as chat from './components/chat';
import * as crm from './components/crm';
import * as admin from './components/admin';
import * as social from './components/social';
import * as utility from './components/utility';

// Combine all components into a single registry
export const shadcnRegistry: ComponentRegistry = {
  // Basic Components (30)
  ...basic,

  // Layout Components (40)
  ...layout,

  // Navigation Components (35)
  ...navigation,

  // Form Components (60)
  ...forms,

  // Data Display Components (70)
  ...dataDisplay,

  // Feedback Components (40)
  ...feedback,

  // Marketing Components (50)
  ...marketing,

  // E-commerce Components (50)
  ...ecommerce,

  // Dashboard Components (40)
  ...dashboard,

  // Chat Components (35)
  ...chat,

  // CRM Components (35)
  ...crm,

  // Admin Components (35)
  ...admin,

  // Social Components (35)
  ...social,

  // Utility Components (25)
  ...utility,
};

// Export component count for debugging
export const SHADCN_COMPONENT_COUNT = Object.keys(shadcnRegistry).length;
