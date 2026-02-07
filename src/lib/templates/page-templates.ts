/**
 * Page Templates
 *
 * Pre-built starter templates for common page layouts.
 * Each template is a complete UITree with realistic content that users
 * can select as a starting point, then customize via AI prompts.
 */

import type { UIElement, UITree } from '@/lib/ai/ui-generator';

// ============================================================================
// Types
// ============================================================================

export interface TemplateSection {
  /** Key of the section root element in the tree */
  key: string;
  /** Human-readable section name */
  name: string;
  /** Brief description of what this section contains */
  description: string;
  /** Hint for AI when customizing this section */
  aiPromptHint: string;
}

export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  category: 'landing' | 'dashboard' | 'admin' | 'ecommerce' | 'blog' | 'portfolio';
  thumbnail: string;
  tags: string[];
  sections: TemplateSection[];
  tree: UITree;
}

// ============================================================================
// Helper to build elements record
// ============================================================================

function el(
  key: string,
  type: string,
  props: Record<string, unknown>,
  children?: string[]
): UIElement {
  return { key, type, props, children };
}

// ============================================================================
// 1. SaaS Landing Page
// ============================================================================

function buildSaasLandingTree(): UITree {
  const elements: Record<string, UIElement> = {};

  const addEl = (key: string, type: string, props: Record<string, unknown>, children?: string[]) => {
    elements[key] = el(key, type, props, children);
  };

  // Root
  addEl('root', 'Container', { maxWidth: 'xl', centered: true }, [
    'hero_section',
    'features_section',
    'testimonials_section',
    'pricing_section',
    'cta_section',
    'footer_section',
  ]);

  // Hero
  addEl('hero_section', 'Column', { align: 'center', gap: 'lg' }, [
    'hero_heading',
    'hero_subtitle',
    'hero_buttons',
  ]);
  addEl('hero_heading', 'Heading', { level: '1', text: 'Ship Better Products, Faster', align: 'center' });
  addEl('hero_subtitle', 'Text', {
    content: 'Streamline your development workflow with AI-powered tools that help your team build, test, and deploy with confidence.',
    size: 'lg',
    color: 'muted',
  });
  addEl('hero_buttons', 'Row', { gap: 'md', justify: 'center' }, ['hero_cta_primary', 'hero_cta_secondary']);
  addEl('hero_cta_primary', 'Button', { label: 'Get Started', variant: 'solid', color: 'primary', size: 'lg' });
  addEl('hero_cta_secondary', 'Button', { label: 'Learn More', variant: 'outline', size: 'lg' });

  // Features
  addEl('features_section', 'Column', { align: 'center', gap: 'lg' }, [
    'features_heading',
    'features_grid',
  ]);
  addEl('features_heading', 'Heading', { level: '2', text: 'Everything You Need to Scale', align: 'center' });
  addEl('features_grid', 'Grid', { cols: 3, gap: 'lg', responsive: true }, [
    'feature_card_1',
    'feature_card_2',
    'feature_card_3',
  ]);
  addEl('feature_card_1', 'FeatureCard', {
    icon: 'zap',
    title: 'Lightning Fast Builds',
    description: 'Reduce build times by 80% with intelligent caching and parallel processing across your entire pipeline.',
  });
  addEl('feature_card_2', 'FeatureCard', {
    icon: 'shield',
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with end-to-end encryption, role-based access controls, and audit logging built in.',
  });
  addEl('feature_card_3', 'FeatureCard', {
    icon: 'users',
    title: 'Team Collaboration',
    description: 'Real-time collaboration with shared workspaces, code reviews, and integrated communication tools.',
  });

  // Testimonials
  addEl('testimonials_section', 'Column', { align: 'center', gap: 'lg' }, [
    'testimonials_heading',
    'testimonials_row',
  ]);
  addEl('testimonials_heading', 'Heading', { level: '2', text: 'Trusted by Industry Leaders', align: 'center' });
  addEl('testimonials_row', 'Row', { gap: 'lg', wrap: true }, ['testimonial_1', 'testimonial_2']);
  addEl('testimonial_1', 'TestimonialCard', {
    quote: 'We cut our deployment time from 45 minutes to under 3 minutes. The ROI was immediate and the team adoption was seamless.',
    author: 'Sarah Chen',
    role: 'VP of Engineering, Dataflow Inc.',
  });
  addEl('testimonial_2', 'TestimonialCard', {
    quote: 'The collaboration features alone justified the switch. Our distributed team finally feels like they are working in the same room.',
    author: 'Marcus Rivera',
    role: 'CTO, NovaTech Solutions',
  });

  // Pricing
  addEl('pricing_section', 'Column', { align: 'center', gap: 'lg' }, [
    'pricing_heading',
    'pricing_grid',
  ]);
  addEl('pricing_heading', 'Heading', { level: '2', text: 'Simple, Transparent Pricing', align: 'center' });
  addEl('pricing_grid', 'Grid', { cols: 3, gap: 'lg', responsive: true }, [
    'pricing_basic',
    'pricing_pro',
    'pricing_enterprise',
  ]);
  addEl('pricing_basic', 'PricingCard', {
    name: 'Basic',
    price: '$9/mo',
    features: ['5 team members', '10 GB storage', 'Basic analytics', 'Email support'],
    ctaLabel: 'Start Free Trial',
  });
  addEl('pricing_pro', 'PricingCard', {
    name: 'Pro',
    price: '$29/mo',
    features: ['25 team members', '100 GB storage', 'Advanced analytics', 'Priority support', 'Custom integrations'],
    ctaLabel: 'Start Free Trial',
  });
  addEl('pricing_enterprise', 'PricingCard', {
    name: 'Enterprise',
    price: '$99/mo',
    features: ['Unlimited members', '1 TB storage', 'Full analytics suite', 'Dedicated account manager', 'SLA guarantee', 'SSO & SAML'],
    ctaLabel: 'Contact Sales',
  });

  // CTA
  addEl('cta_section', 'Column', { align: 'center', gap: 'md' }, ['cta_heading', 'cta_button']);
  addEl('cta_heading', 'Heading', { level: '2', text: 'Ready to Transform Your Workflow?', align: 'center' });
  addEl('cta_button', 'Button', { label: 'Get Started for Free', variant: 'solid', color: 'primary', size: 'lg' });

  // Footer
  addEl('footer_section', 'Footer', {
    copyright: '2026 FlowStack Inc. All rights reserved.',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Contact', href: '/contact' },
    ],
  });

  return { root: 'root', elements };
}

// ============================================================================
// 2. Analytics Dashboard
// ============================================================================

function buildAnalyticsDashboardTree(): UITree {
  const elements: Record<string, UIElement> = {};

  const addEl = (key: string, type: string, props: Record<string, unknown>, children?: string[]) => {
    elements[key] = el(key, type, props, children);
  };

  // Root
  addEl('root', 'Container', { maxWidth: 'xl', centered: true }, [
    'topbar',
    'metrics_section',
    'charts_section',
    'table_section',
  ]);

  // TopBar
  addEl('topbar', 'Row', { align: 'center', justify: 'between', gap: 'md' }, [
    'topbar_heading',
    'topbar_date_badge',
  ]);
  addEl('topbar_heading', 'Heading', { level: '1', text: 'Dashboard' });
  addEl('topbar_date_badge', 'Badge', { text: 'February 7, 2026', variant: 'subtle', color: 'primary' });

  // Metrics
  addEl('metrics_section', 'Grid', { cols: 4, gap: 'md', responsive: true }, [
    'metric_users',
    'metric_revenue',
    'metric_orders',
    'metric_conversion',
  ]);
  addEl('metric_users', 'Metric', {
    label: 'Total Users',
    value: '12,458',
    change: '+12%',
    changeType: 'positive',
    icon: 'users',
  });
  addEl('metric_revenue', 'Metric', {
    label: 'Revenue',
    value: '$45,231',
    change: '+8%',
    changeType: 'positive',
    icon: 'dollar-sign',
  });
  addEl('metric_orders', 'Metric', {
    label: 'Orders',
    value: '3,847',
    change: '-2%',
    changeType: 'negative',
    icon: 'shopping-cart',
  });
  addEl('metric_conversion', 'Metric', {
    label: 'Conversion Rate',
    value: '3.2%',
    change: '+0.5%',
    changeType: 'positive',
    icon: 'trending-up',
  });

  // Charts
  addEl('charts_section', 'Grid', { cols: 2, gap: 'lg', responsive: true }, [
    'chart_line_card',
    'chart_bar_card',
  ]);
  addEl('chart_line_card', 'Card', { variant: 'outlined', padding: 'md' }, [
    'chart_line_heading',
    'chart_line',
  ]);
  addEl('chart_line_heading', 'Heading', { level: '3', text: 'Revenue Over Time' });
  addEl('chart_line', 'Chart', { type: 'line', height: 280 });
  addEl('chart_bar_card', 'Card', { variant: 'outlined', padding: 'md' }, [
    'chart_bar_heading',
    'chart_bar',
  ]);
  addEl('chart_bar_heading', 'Heading', { level: '3', text: 'Orders by Category' });
  addEl('chart_bar', 'Chart', { type: 'bar', height: 280 });

  // DataTable
  addEl('table_section', 'Card', { variant: 'outlined', padding: 'md' }, [
    'table_heading',
    'data_table',
  ]);
  addEl('table_heading', 'Heading', { level: '3', text: 'Recent Transactions' });
  addEl('data_table', 'Table', { variant: 'simple', size: 'md' }, [
    'table_header',
    'table_body',
  ]);
  addEl('table_header', 'TableHeader', {}, ['header_row']);
  addEl('header_row', 'TableRow', {}, [
    'th_name',
    'th_status',
    'th_amount',
    'th_date',
  ]);
  addEl('th_name', 'TableCell', { header: true, align: 'left' }, ['th_name_text']);
  addEl('th_name_text', 'Text', { content: 'Name' });
  addEl('th_status', 'TableCell', { header: true, align: 'left' }, ['th_status_text']);
  addEl('th_status_text', 'Text', { content: 'Status' });
  addEl('th_amount', 'TableCell', { header: true, align: 'right' }, ['th_amount_text']);
  addEl('th_amount_text', 'Text', { content: 'Amount' });
  addEl('th_date', 'TableCell', { header: true, align: 'left' }, ['th_date_text']);
  addEl('th_date_text', 'Text', { content: 'Date' });

  addEl('table_body', 'TableBody', {}, ['row_1', 'row_2', 'row_3']);

  // Row 1
  addEl('row_1', 'TableRow', { hoverable: true }, ['r1_name', 'r1_status', 'r1_amount', 'r1_date']);
  addEl('r1_name', 'TableCell', { align: 'left' }, ['r1_name_text']);
  addEl('r1_name_text', 'Text', { content: 'Olivia Martin' });
  addEl('r1_status', 'TableCell', { align: 'left' }, ['r1_status_badge']);
  addEl('r1_status_badge', 'Badge', { text: 'Completed', color: 'success', variant: 'subtle' });
  addEl('r1_amount', 'TableCell', { align: 'right' }, ['r1_amount_text']);
  addEl('r1_amount_text', 'Text', { content: '$1,240.00' });
  addEl('r1_date', 'TableCell', { align: 'left' }, ['r1_date_text']);
  addEl('r1_date_text', 'Text', { content: 'Feb 5, 2026' });

  // Row 2
  addEl('row_2', 'TableRow', { hoverable: true }, ['r2_name', 'r2_status', 'r2_amount', 'r2_date']);
  addEl('r2_name', 'TableCell', { align: 'left' }, ['r2_name_text']);
  addEl('r2_name_text', 'Text', { content: 'Jackson Lee' });
  addEl('r2_status', 'TableCell', { align: 'left' }, ['r2_status_badge']);
  addEl('r2_status_badge', 'Badge', { text: 'Pending', color: 'warning', variant: 'subtle' });
  addEl('r2_amount', 'TableCell', { align: 'right' }, ['r2_amount_text']);
  addEl('r2_amount_text', 'Text', { content: '$890.00' });
  addEl('r2_date', 'TableCell', { align: 'left' }, ['r2_date_text']);
  addEl('r2_date_text', 'Text', { content: 'Feb 4, 2026' });

  // Row 3
  addEl('row_3', 'TableRow', { hoverable: true }, ['r3_name', 'r3_status', 'r3_amount', 'r3_date']);
  addEl('r3_name', 'TableCell', { align: 'left' }, ['r3_name_text']);
  addEl('r3_name_text', 'Text', { content: 'Isabella Nguyen' });
  addEl('r3_status', 'TableCell', { align: 'left' }, ['r3_status_badge']);
  addEl('r3_status_badge', 'Badge', { text: 'Refunded', color: 'error', variant: 'subtle' });
  addEl('r3_amount', 'TableCell', { align: 'right' }, ['r3_amount_text']);
  addEl('r3_amount_text', 'Text', { content: '$2,150.00' });
  addEl('r3_date', 'TableCell', { align: 'left' }, ['r3_date_text']);
  addEl('r3_date_text', 'Text', { content: 'Feb 3, 2026' });

  return { root: 'root', elements };
}

// ============================================================================
// 3. Admin Panel
// ============================================================================

function buildAdminPanelTree(): UITree {
  const elements: Record<string, UIElement> = {};

  const addEl = (key: string, type: string, props: Record<string, unknown>, children?: string[]) => {
    elements[key] = el(key, type, props, children);
  };

  // Root
  addEl('root', 'Container', { maxWidth: 'xl' }, ['main_layout']);

  // Main layout: sidebar + content
  addEl('main_layout', 'Row', { gap: 'lg', align: 'stretch' }, ['sidebar', 'main_content']);

  // Sidebar
  addEl('sidebar', 'Column', { gap: 'sm' }, ['sidebar_heading', 'sidebar_nav']);
  addEl('sidebar_heading', 'Heading', { level: '3', text: 'Admin' });
  addEl('sidebar_nav', 'NavMenu', { orientation: 'vertical' }, [
    'nav_dashboard',
    'nav_users',
    'nav_settings',
    'nav_reports',
    'nav_analytics',
  ]);
  addEl('nav_dashboard', 'NavItem', { label: 'Dashboard', icon: 'layout-dashboard', href: '/dashboard' });
  addEl('nav_users', 'NavItem', { label: 'Users', icon: 'users', href: '/users' });
  addEl('nav_settings', 'NavItem', { label: 'Settings', icon: 'settings', href: '/settings' });
  addEl('nav_reports', 'NavItem', { label: 'Reports', icon: 'file-text', href: '/reports' });
  addEl('nav_analytics', 'NavItem', { label: 'Analytics', icon: 'bar-chart', href: '/analytics' });

  // Main content area
  addEl('main_content', 'Column', { gap: 'lg' }, ['content_header', 'summary_grid']);

  // Header row
  addEl('content_header', 'Row', { align: 'center', justify: 'between', gap: 'md' }, [
    'page_title',
    'header_actions',
  ]);
  addEl('page_title', 'Heading', { level: '2', text: 'User Management' });
  addEl('header_actions', 'Row', { gap: 'sm', align: 'center' }, ['search_input', 'add_user_button']);
  addEl('search_input', 'Input', { placeholder: 'Search users...', type: 'text' });
  addEl('add_user_button', 'Button', { label: 'Add User', variant: 'solid', color: 'primary', leftIcon: 'plus' });

  // Summary cards
  addEl('summary_grid', 'Grid', { cols: 4, gap: 'md', responsive: true }, [
    'summary_total_users',
    'summary_active',
    'summary_new_today',
    'summary_revenue',
  ]);
  addEl('summary_total_users', 'Card', { variant: 'outlined', padding: 'md' }, [
    'total_users_label',
    'total_users_value',
  ]);
  addEl('total_users_label', 'Text', { content: 'Total Users', variant: 'caption', color: 'muted' });
  addEl('total_users_value', 'Heading', { level: '3', text: '8,249' });

  addEl('summary_active', 'Card', { variant: 'outlined', padding: 'md' }, [
    'active_label',
    'active_value',
  ]);
  addEl('active_label', 'Text', { content: 'Active Now', variant: 'caption', color: 'muted' });
  addEl('active_value', 'Heading', { level: '3', text: '1,024' });

  addEl('summary_new_today', 'Card', { variant: 'outlined', padding: 'md' }, [
    'new_today_label',
    'new_today_value',
  ]);
  addEl('new_today_label', 'Text', { content: 'New Today', variant: 'caption', color: 'muted' });
  addEl('new_today_value', 'Heading', { level: '3', text: '47' });

  addEl('summary_revenue', 'Card', { variant: 'outlined', padding: 'md' }, [
    'revenue_label',
    'revenue_value',
  ]);
  addEl('revenue_label', 'Text', { content: 'Monthly Revenue', variant: 'caption', color: 'muted' });
  addEl('revenue_value', 'Heading', { level: '3', text: '$34,500' });

  return { root: 'root', elements };
}

// ============================================================================
// 4. E-commerce Product Page
// ============================================================================

function buildEcommerceProductTree(): UITree {
  const elements: Record<string, UIElement> = {};

  const addEl = (key: string, type: string, props: Record<string, unknown>, children?: string[]) => {
    elements[key] = el(key, type, props, children);
  };

  // Root
  addEl('root', 'Container', { maxWidth: 'xl', centered: true }, [
    'breadcrumb_section',
    'product_section',
    'related_section',
  ]);

  // Breadcrumb
  addEl('breadcrumb_section', 'Breadcrumb', { separator: '>' }, [
    'bc_home',
    'bc_products',
    'bc_current',
  ]);
  addEl('bc_home', 'BreadcrumbItem', { label: 'Home', href: '/' });
  addEl('bc_products', 'BreadcrumbItem', { label: 'Products', href: '/products' });
  addEl('bc_current', 'BreadcrumbItem', { label: 'Wireless Noise-Canceling Headphones' });

  // Product Info
  addEl('product_section', 'Row', { gap: 'xl', align: 'start' }, [
    'product_image',
    'product_details',
  ]);
  addEl('product_image', 'Image', {
    src: 'https://picsum.photos/seed/headphones/600/500',
    alt: 'Wireless Noise-Canceling Headphones in matte black finish',
    width: 600,
    height: 500,
    rounded: 'lg',
  });
  addEl('product_details', 'Column', { gap: 'md' }, [
    'product_name',
    'product_price',
    'product_description',
    'product_size_select',
    'product_quantity',
    'product_add_to_cart',
    'product_shipping_badge',
  ]);
  addEl('product_name', 'Heading', { level: '1', text: 'Wireless Noise-Canceling Headphones' });
  addEl('product_price', 'Heading', { level: '2', text: '$129.99', color: 'primary' });
  addEl('product_description', 'Text', {
    content: 'Experience studio-quality sound with 40mm custom drivers and adaptive noise cancellation. The ergonomic over-ear design with memory foam cushions provides all-day comfort for work, travel, and everything in between. Up to 30 hours of battery life on a single charge.',
  });
  addEl('product_size_select', 'Select', {
    label: 'Color',
    options: [
      { label: 'Matte Black', value: 'black' },
      { label: 'Silver', value: 'silver' },
      { label: 'Midnight Blue', value: 'blue' },
    ],
  });
  addEl('product_quantity', 'Input', { label: 'Quantity', type: 'number', placeholder: '1' });
  addEl('product_add_to_cart', 'Button', { label: 'Add to Cart', variant: 'solid', color: 'primary', size: 'lg', leftIcon: 'shopping-cart' });
  addEl('product_shipping_badge', 'Badge', { text: 'Free Shipping', color: 'success', variant: 'subtle', size: 'md' });

  // Related Products
  addEl('related_section', 'Column', { gap: 'lg' }, ['related_heading', 'related_grid']);
  addEl('related_heading', 'Heading', { level: '2', text: 'You Might Also Like' });
  addEl('related_grid', 'Grid', { cols: 4, gap: 'md', responsive: true }, [
    'related_1',
    'related_2',
    'related_3',
    'related_4',
  ]);

  addEl('related_1', 'Card', { hoverable: true, padding: 'sm' }, [
    'related_1_image',
    'related_1_name',
    'related_1_price',
  ]);
  addEl('related_1_image', 'Image', {
    src: 'https://picsum.photos/seed/earbuds/300/200',
    alt: 'Wireless Earbuds Pro',
    rounded: 'md',
  });
  addEl('related_1_name', 'Heading', { level: '4', text: 'Wireless Earbuds Pro' });
  addEl('related_1_price', 'Text', { content: '$79.99', color: 'primary' });

  addEl('related_2', 'Card', { hoverable: true, padding: 'sm' }, [
    'related_2_image',
    'related_2_name',
    'related_2_price',
  ]);
  addEl('related_2_image', 'Image', {
    src: 'https://picsum.photos/seed/speaker/300/200',
    alt: 'Portable Bluetooth Speaker',
    rounded: 'md',
  });
  addEl('related_2_name', 'Heading', { level: '4', text: 'Portable Bluetooth Speaker' });
  addEl('related_2_price', 'Text', { content: '$49.99', color: 'primary' });

  addEl('related_3', 'Card', { hoverable: true, padding: 'sm' }, [
    'related_3_image',
    'related_3_name',
    'related_3_price',
  ]);
  addEl('related_3_image', 'Image', {
    src: 'https://picsum.photos/seed/headset/300/200',
    alt: 'Gaming Headset RGB',
    rounded: 'md',
  });
  addEl('related_3_name', 'Heading', { level: '4', text: 'Gaming Headset RGB' });
  addEl('related_3_price', 'Text', { content: '$89.99', color: 'primary' });

  addEl('related_4', 'Card', { hoverable: true, padding: 'sm' }, [
    'related_4_image',
    'related_4_name',
    'related_4_price',
  ]);
  addEl('related_4_image', 'Image', {
    src: 'https://picsum.photos/seed/dac/300/200',
    alt: 'USB-C Audio DAC',
    rounded: 'md',
  });
  addEl('related_4_name', 'Heading', { level: '4', text: 'USB-C Audio DAC' });
  addEl('related_4_price', 'Text', { content: '$34.99', color: 'primary' });

  return { root: 'root', elements };
}

// ============================================================================
// 5. Blog Post
// ============================================================================

function buildBlogPostTree(): UITree {
  const elements: Record<string, UIElement> = {};

  const addEl = (key: string, type: string, props: Record<string, unknown>, children?: string[]) => {
    elements[key] = el(key, type, props, children);
  };

  // Root
  addEl('root', 'Container', { maxWidth: 'lg', centered: true }, [
    'header_section',
    'article_section',
    'author_bio_section',
    'comments_section',
  ]);

  // Header
  addEl('header_section', 'Column', { gap: 'md' }, [
    'header_breadcrumb',
    'article_title',
    'header_meta',
  ]);
  addEl('header_breadcrumb', 'Breadcrumb', { separator: '/' }, [
    'hbc_home',
    'hbc_blog',
    'hbc_article',
  ]);
  addEl('hbc_home', 'BreadcrumbItem', { label: 'Home', href: '/' });
  addEl('hbc_blog', 'BreadcrumbItem', { label: 'Engineering Blog', href: '/blog' });
  addEl('hbc_article', 'BreadcrumbItem', { label: 'The Rise of Edge Computing' });
  addEl('article_title', 'Heading', { level: '1', text: 'The Rise of Edge Computing: Why Latency Matters More Than Ever' });
  addEl('header_meta', 'Row', { gap: 'md', align: 'center' }, [
    'author_avatar',
    'author_name_text',
    'publish_date_badge',
  ]);
  addEl('author_avatar', 'Avatar', { src: 'https://picsum.photos/seed/author/80/80', name: 'Elena Vasquez', size: 'md' });
  addEl('author_name_text', 'Text', { content: 'Elena Vasquez', variant: 'body' });
  addEl('publish_date_badge', 'Badge', { text: 'February 3, 2026', variant: 'subtle' });

  // Article body
  addEl('article_section', 'Column', { gap: 'lg' }, [
    'article_intro',
    'article_paragraph_1',
    'article_image',
    'article_paragraph_2',
  ]);
  addEl('article_intro', 'Text', {
    content: 'As applications become increasingly distributed and users demand sub-millisecond response times, the traditional model of routing every request through a centralized cloud data center is showing its limits. Edge computing represents a fundamental shift in how we think about infrastructure, moving computation closer to where data is generated and consumed.',
    size: 'lg',
  });
  addEl('article_paragraph_1', 'Text', {
    content: 'In 2025 alone, major cloud providers deployed over 300 new edge locations worldwide. This expansion was driven by the explosive growth of real-time applications including autonomous vehicle coordination, augmented reality experiences, and IoT sensor networks that simply cannot tolerate the 50-200ms round trips to regional data centers. Companies like Fastly and Cloudflare have demonstrated that running application logic at the edge can reduce p99 latencies by 60-80% while simultaneously cutting bandwidth costs.',
  });
  addEl('article_image', 'Image', {
    src: 'https://picsum.photos/seed/edgecomputing/800/400',
    alt: 'Global edge computing network infrastructure visualization',
    rounded: 'md',
  });
  addEl('article_paragraph_2', 'Text', {
    content: 'The developer experience is evolving rapidly too. Modern frameworks now support edge-first deployment patterns out of the box. Next.js middleware, Deno Deploy, and Bun are all competing to make edge computing as simple as writing a standard function. The challenge going forward is not the technology itself but rethinking application architecture to take full advantage of distributed execution while maintaining consistency guarantees that users and businesses depend on.',
  });

  // Author bio
  addEl('author_bio_section', 'Card', { variant: 'outlined', padding: 'lg' }, ['author_bio_row']);
  addEl('author_bio_row', 'Row', { gap: 'lg', align: 'start' }, [
    'bio_avatar',
    'bio_details',
  ]);
  addEl('bio_avatar', 'Avatar', { src: 'https://picsum.photos/seed/elena/120/120', name: 'Elena Vasquez', size: 'lg' });
  addEl('bio_details', 'Column', { gap: 'sm' }, [
    'bio_name',
    'bio_description',
    'bio_links',
  ]);
  addEl('bio_name', 'Heading', { level: '4', text: 'Elena Vasquez' });
  addEl('bio_description', 'Text', {
    content: 'Senior Infrastructure Engineer at Vercel. Former distributed systems researcher at MIT. Writes about edge computing, performance optimization, and the future of web infrastructure.',
  });
  addEl('bio_links', 'Row', { gap: 'sm' }, ['bio_link_twitter', 'bio_link_github', 'bio_link_website']);
  addEl('bio_link_twitter', 'Link', { text: 'Twitter', href: 'https://twitter.com/elenavasquez', external: true });
  addEl('bio_link_github', 'Link', { text: 'GitHub', href: 'https://github.com/elenavasquez', external: true });
  addEl('bio_link_website', 'Link', { text: 'Website', href: 'https://elenavasquez.dev', external: true });

  // Comments
  addEl('comments_section', 'Column', { gap: 'md' }, [
    'comments_heading',
    'comment_1',
    'comment_2',
    'comment_3',
  ]);
  addEl('comments_heading', 'Heading', { level: '3', text: 'Comments (3)' });

  addEl('comment_1', 'Card', { variant: 'outlined', padding: 'md' }, ['comment_1_header', 'comment_1_body']);
  addEl('comment_1_header', 'Row', { gap: 'sm', align: 'center' }, ['c1_avatar', 'c1_meta']);
  addEl('c1_avatar', 'Avatar', { name: 'David Park', size: 'sm' });
  addEl('c1_meta', 'Column', { gap: 'xs' }, ['c1_name', 'c1_date']);
  addEl('c1_name', 'Text', { content: 'David Park', variant: 'body' });
  addEl('c1_date', 'Text', { content: 'February 4, 2026', variant: 'caption', color: 'muted' });
  addEl('comment_1_body', 'Text', {
    content: 'Great overview. We migrated our real-time analytics pipeline to the edge last quarter and the latency improvements were even better than expected. The tricky part was handling state synchronization across regions.',
  });

  addEl('comment_2', 'Card', { variant: 'outlined', padding: 'md' }, ['comment_2_header', 'comment_2_body']);
  addEl('comment_2_header', 'Row', { gap: 'sm', align: 'center' }, ['c2_avatar', 'c2_meta']);
  addEl('c2_avatar', 'Avatar', { name: 'Priya Sharma', size: 'sm' });
  addEl('c2_meta', 'Column', { gap: 'xs' }, ['c2_name', 'c2_date']);
  addEl('c2_name', 'Text', { content: 'Priya Sharma', variant: 'body' });
  addEl('c2_date', 'Text', { content: 'February 5, 2026', variant: 'caption', color: 'muted' });
  addEl('comment_2_body', 'Text', {
    content: 'Would love to see a follow-up post about CRDT-based state management at the edge. That seems like the missing piece for most teams considering this architecture.',
  });

  addEl('comment_3', 'Card', { variant: 'outlined', padding: 'md' }, ['comment_3_header', 'comment_3_body']);
  addEl('comment_3_header', 'Row', { gap: 'sm', align: 'center' }, ['c3_avatar', 'c3_meta']);
  addEl('c3_avatar', 'Avatar', { name: 'James Wilson', size: 'sm' });
  addEl('c3_meta', 'Column', { gap: 'xs' }, ['c3_name', 'c3_date']);
  addEl('c3_name', 'Text', { content: 'James Wilson', variant: 'body' });
  addEl('c3_date', 'Text', { content: 'February 6, 2026', variant: 'caption', color: 'muted' });
  addEl('comment_3_body', 'Text', {
    content: 'The bandwidth cost savings are real. We went from $18K to $7K per month after pushing our image optimization and API caching to edge workers. Highly recommend starting there if you are evaluating this approach.',
  });

  return { root: 'root', elements };
}

// ============================================================================
// 6. Portfolio
// ============================================================================

function buildPortfolioTree(): UITree {
  const elements: Record<string, UIElement> = {};

  const addEl = (key: string, type: string, props: Record<string, unknown>, children?: string[]) => {
    elements[key] = el(key, type, props, children);
  };

  // Root
  addEl('root', 'Container', { maxWidth: 'xl', centered: true }, [
    'navbar',
    'hero_section',
    'projects_section',
    'skills_section',
    'contact_section',
  ]);

  // Navbar
  addEl('navbar', 'Row', { align: 'center', justify: 'between', gap: 'md' }, [
    'nav_name',
    'nav_links',
  ]);
  addEl('nav_name', 'Heading', { level: '3', text: 'John Doe' });
  addEl('nav_links', 'Row', { gap: 'md' }, [
    'nav_link_projects',
    'nav_link_skills',
    'nav_link_contact',
  ]);
  addEl('nav_link_projects', 'Link', { text: 'Projects', href: '#projects' });
  addEl('nav_link_skills', 'Link', { text: 'Skills', href: '#skills' });
  addEl('nav_link_contact', 'Link', { text: 'Contact', href: '#contact' });

  // Hero
  addEl('hero_section', 'Column', { align: 'center', gap: 'lg' }, [
    'hero_heading',
    'hero_intro',
    'hero_buttons',
  ]);
  addEl('hero_heading', 'Heading', { level: '1', text: 'Creative Developer', align: 'center' });
  addEl('hero_intro', 'Text', {
    content: 'I design and build digital experiences that are fast, accessible, and delightful. With over 8 years of experience in frontend development, I specialize in React, TypeScript, and motion design.',
    size: 'lg',
    color: 'muted',
  });
  addEl('hero_buttons', 'Row', { gap: 'md', justify: 'center' }, ['hero_btn_work', 'hero_btn_contact']);
  addEl('hero_btn_work', 'Button', { label: 'View Work', variant: 'solid', color: 'primary', size: 'lg' });
  addEl('hero_btn_contact', 'Button', { label: 'Contact Me', variant: 'outline', size: 'lg' });

  // Projects
  addEl('projects_section', 'Column', { gap: 'lg' }, ['projects_heading', 'projects_grid']);
  addEl('projects_heading', 'Heading', { level: '2', text: 'Featured Projects', align: 'center' });
  addEl('projects_grid', 'Grid', { cols: 3, gap: 'lg', responsive: true }, [
    'project_1',
    'project_2',
    'project_3',
  ]);

  addEl('project_1', 'Card', { hoverable: true, padding: 'sm' }, [
    'project_1_image',
    'project_1_name',
    'project_1_description',
    'project_1_tags',
  ]);
  addEl('project_1_image', 'Image', {
    src: 'https://picsum.photos/seed/fintech/400/250',
    alt: 'Finova banking dashboard showing real-time analytics',
    rounded: 'md',
  });
  addEl('project_1_name', 'Heading', { level: '4', text: 'Finova Banking Dashboard' });
  addEl('project_1_description', 'Text', {
    content: 'A real-time financial analytics platform with interactive charts, portfolio tracking, and AI-driven investment insights for retail investors.',
  });
  addEl('project_1_tags', 'Row', { gap: 'xs', wrap: true }, ['tag_1a', 'tag_1b', 'tag_1c']);
  addEl('tag_1a', 'Tag', { label: 'React', color: 'primary' });
  addEl('tag_1b', 'Tag', { label: 'D3.js', color: 'secondary' });
  addEl('tag_1c', 'Tag', { label: 'WebSocket', color: 'secondary' });

  addEl('project_2', 'Card', { hoverable: true, padding: 'sm' }, [
    'project_2_image',
    'project_2_name',
    'project_2_description',
    'project_2_tags',
  ]);
  addEl('project_2_image', 'Image', {
    src: 'https://picsum.photos/seed/healthapp/400/250',
    alt: 'MediTrack health monitoring app with patient vitals',
    rounded: 'md',
  });
  addEl('project_2_name', 'Heading', { level: '4', text: 'MediTrack Health Platform' });
  addEl('project_2_description', 'Text', {
    content: 'Patient health monitoring system with real-time vitals tracking, appointment scheduling, and secure messaging between patients and healthcare providers.',
  });
  addEl('project_2_tags', 'Row', { gap: 'xs', wrap: true }, ['tag_2a', 'tag_2b', 'tag_2c']);
  addEl('tag_2a', 'Tag', { label: 'Next.js', color: 'primary' });
  addEl('tag_2b', 'Tag', { label: 'TypeScript', color: 'secondary' });
  addEl('tag_2c', 'Tag', { label: 'GraphQL', color: 'secondary' });

  addEl('project_3', 'Card', { hoverable: true, padding: 'sm' }, [
    'project_3_image',
    'project_3_name',
    'project_3_description',
    'project_3_tags',
  ]);
  addEl('project_3_image', 'Image', {
    src: 'https://picsum.photos/seed/ecotracker/400/250',
    alt: 'EcoTracker sustainability dashboard with carbon metrics',
    rounded: 'md',
  });
  addEl('project_3_name', 'Heading', { level: '4', text: 'EcoTracker Sustainability' });
  addEl('project_3_description', 'Text', {
    content: 'Corporate sustainability dashboard that tracks carbon emissions, energy consumption, and waste reduction metrics across office locations worldwide.',
  });
  addEl('project_3_tags', 'Row', { gap: 'xs', wrap: true }, ['tag_3a', 'tag_3b', 'tag_3c']);
  addEl('tag_3a', 'Tag', { label: 'Vue.js', color: 'primary' });
  addEl('tag_3b', 'Tag', { label: 'Tailwind', color: 'secondary' });
  addEl('tag_3c', 'Tag', { label: 'Chart.js', color: 'secondary' });

  // Skills
  addEl('skills_section', 'Column', { gap: 'lg' }, ['skills_heading', 'skills_grid']);
  addEl('skills_heading', 'Heading', { level: '2', text: 'Skills & Expertise', align: 'center' });
  addEl('skills_grid', 'Grid', { cols: 3, gap: 'md', responsive: true }, [
    'skill_1',
    'skill_2',
    'skill_3',
    'skill_4',
    'skill_5',
    'skill_6',
  ]);

  addEl('skill_1', 'Card', { padding: 'md' }, ['skill_1_icon', 'skill_1_name', 'skill_1_progress']);
  addEl('skill_1_icon', 'Icon', { name: 'code', size: 'lg', color: 'primary' });
  addEl('skill_1_name', 'Heading', { level: '5', text: 'React & TypeScript' });
  addEl('skill_1_progress', 'Progress', { value: 95, label: 'Expert', color: 'primary' });

  addEl('skill_2', 'Card', { padding: 'md' }, ['skill_2_icon', 'skill_2_name', 'skill_2_progress']);
  addEl('skill_2_icon', 'Icon', { name: 'palette', size: 'lg', color: 'primary' });
  addEl('skill_2_name', 'Heading', { level: '5', text: 'UI/UX Design' });
  addEl('skill_2_progress', 'Progress', { value: 88, label: 'Advanced', color: 'primary' });

  addEl('skill_3', 'Card', { padding: 'md' }, ['skill_3_icon', 'skill_3_name', 'skill_3_progress']);
  addEl('skill_3_icon', 'Icon', { name: 'server', size: 'lg', color: 'primary' });
  addEl('skill_3_name', 'Heading', { level: '5', text: 'Node.js & APIs' });
  addEl('skill_3_progress', 'Progress', { value: 82, label: 'Advanced', color: 'primary' });

  addEl('skill_4', 'Card', { padding: 'md' }, ['skill_4_icon', 'skill_4_name', 'skill_4_progress']);
  addEl('skill_4_icon', 'Icon', { name: 'smartphone', size: 'lg', color: 'primary' });
  addEl('skill_4_name', 'Heading', { level: '5', text: 'React Native' });
  addEl('skill_4_progress', 'Progress', { value: 78, label: 'Advanced', color: 'primary' });

  addEl('skill_5', 'Card', { padding: 'md' }, ['skill_5_icon', 'skill_5_name', 'skill_5_progress']);
  addEl('skill_5_icon', 'Icon', { name: 'database', size: 'lg', color: 'primary' });
  addEl('skill_5_name', 'Heading', { level: '5', text: 'PostgreSQL & Redis' });
  addEl('skill_5_progress', 'Progress', { value: 75, label: 'Proficient', color: 'primary' });

  addEl('skill_6', 'Card', { padding: 'md' }, ['skill_6_icon', 'skill_6_name', 'skill_6_progress']);
  addEl('skill_6_icon', 'Icon', { name: 'cloud', size: 'lg', color: 'primary' });
  addEl('skill_6_name', 'Heading', { level: '5', text: 'AWS & DevOps' });
  addEl('skill_6_progress', 'Progress', { value: 70, label: 'Proficient', color: 'primary' });

  // Contact
  addEl('contact_section', 'Card', { variant: 'outlined', padding: 'lg' }, [
    'contact_heading',
    'contact_form',
  ]);
  addEl('contact_heading', 'Heading', { level: '2', text: 'Get in Touch', align: 'center' });
  addEl('contact_form', 'Column', { gap: 'md' }, [
    'contact_name_input',
    'contact_email_input',
    'contact_message_input',
    'contact_submit',
  ]);
  addEl('contact_name_input', 'Input', { label: 'Name', placeholder: 'Your name', type: 'text' });
  addEl('contact_email_input', 'Input', { label: 'Email', placeholder: 'you@example.com', type: 'email' });
  addEl('contact_message_input', 'TextArea', { label: 'Message', placeholder: 'Tell me about your project...', rows: 5 });
  addEl('contact_submit', 'Button', { label: 'Send Message', variant: 'solid', color: 'primary', size: 'lg' });

  return { root: 'root', elements };
}

// ============================================================================
// Template Definitions
// ============================================================================

export const PAGE_TEMPLATES: PageTemplate[] = [
  {
    id: 'saas-landing',
    name: 'SaaS Landing Page',
    description: 'A complete SaaS marketing page with hero, features, testimonials, pricing tiers, and call-to-action sections.',
    category: 'landing',
    thumbnail: '🚀',
    tags: ['saas', 'landing', 'marketing', 'pricing', 'features', 'testimonials'],
    sections: [
      {
        key: 'hero_section',
        name: 'Hero',
        description: 'Main hero section with headline, subtitle, and call-to-action buttons.',
        aiPromptHint: 'Modify the main headline, subtitle text, or button labels to match your product positioning.',
      },
      {
        key: 'features_section',
        name: 'Features',
        description: 'Three-column grid of feature cards with icons, titles, and descriptions.',
        aiPromptHint: 'Change feature icons, titles, and descriptions. Add or remove feature cards.',
      },
      {
        key: 'testimonials_section',
        name: 'Testimonials',
        description: 'Customer testimonial cards with quotes, names, and roles.',
        aiPromptHint: 'Update testimonial quotes, author names, and their roles or companies.',
      },
      {
        key: 'pricing_section',
        name: 'Pricing',
        description: 'Three pricing tiers (Basic, Pro, Enterprise) with features and CTAs.',
        aiPromptHint: 'Adjust plan names, prices, feature lists, and CTA button text.',
      },
      {
        key: 'cta_section',
        name: 'Call to Action',
        description: 'Bottom CTA section with heading and primary action button.',
        aiPromptHint: 'Change the CTA headline and button label to drive specific conversions.',
      },
      {
        key: 'footer_section',
        name: 'Footer',
        description: 'Page footer with copyright and navigation links.',
        aiPromptHint: 'Update copyright text and footer navigation links.',
      },
    ],
    tree: buildSaasLandingTree(),
  },
  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    description: 'A data-rich analytics dashboard with KPI metrics, charts, and a transaction data table.',
    category: 'dashboard',
    thumbnail: '📊',
    tags: ['dashboard', 'analytics', 'metrics', 'charts', 'data', 'table'],
    sections: [
      {
        key: 'topbar',
        name: 'Top Bar',
        description: 'Dashboard header with title and date indicator.',
        aiPromptHint: 'Change the dashboard title or the date display format.',
      },
      {
        key: 'metrics_section',
        name: 'Metrics',
        description: 'Four key metric cards showing Users, Revenue, Orders, and Conversion Rate.',
        aiPromptHint: 'Modify metric labels, values, change percentages, or add new metric cards.',
      },
      {
        key: 'charts_section',
        name: 'Charts',
        description: 'Two-column grid with a line chart and a bar chart.',
        aiPromptHint: 'Change chart types, titles, or add additional chart panels.',
      },
      {
        key: 'table_section',
        name: 'Data Table',
        description: 'Transaction table with Name, Status, Amount, and Date columns.',
        aiPromptHint: 'Modify table columns, add rows, or change the data being displayed.',
      },
    ],
    tree: buildAnalyticsDashboardTree(),
  },
  {
    id: 'admin-panel',
    name: 'Admin Panel',
    description: 'An admin interface with sidebar navigation, search, and summary cards for user management.',
    category: 'admin',
    thumbnail: '⚙️',
    tags: ['admin', 'panel', 'sidebar', 'navigation', 'management', 'users'],
    sections: [
      {
        key: 'sidebar',
        name: 'Sidebar',
        description: 'Vertical navigation sidebar with icon menu items.',
        aiPromptHint: 'Add, remove, or reorder navigation items. Change icons and labels.',
      },
      {
        key: 'content_header',
        name: 'Header',
        description: 'Page header with title, search input, and action button.',
        aiPromptHint: 'Change the page title, search placeholder, or action button label.',
      },
      {
        key: 'summary_grid',
        name: 'Content',
        description: 'Grid of four summary cards showing key metrics.',
        aiPromptHint: 'Modify summary card labels and values, or add more summary cards.',
      },
    ],
    tree: buildAdminPanelTree(),
  },
  {
    id: 'ecommerce-product',
    name: 'E-commerce Product Page',
    description: 'A product detail page with breadcrumb navigation, product info, variant selection, and related products.',
    category: 'ecommerce',
    thumbnail: '🛒',
    tags: ['ecommerce', 'product', 'shopping', 'cart', 'store', 'retail'],
    sections: [
      {
        key: 'breadcrumb_section',
        name: 'Breadcrumb',
        description: 'Navigation breadcrumb trail showing Home > Products > Product Name.',
        aiPromptHint: 'Change breadcrumb labels or add intermediate categories.',
      },
      {
        key: 'product_section',
        name: 'Product Info',
        description: 'Product image, name, price, description, variant selector, quantity input, and add-to-cart button.',
        aiPromptHint: 'Update product name, price, description, available variants, or button labels.',
      },
      {
        key: 'related_section',
        name: 'Related Products',
        description: 'Grid of four related product cards with images, names, and prices.',
        aiPromptHint: 'Change related product names, images, and prices, or adjust the grid layout.',
      },
    ],
    tree: buildEcommerceProductTree(),
  },
  {
    id: 'blog-post',
    name: 'Blog Post',
    description: 'A full blog article layout with header, long-form content, author bio, and a comments section.',
    category: 'blog',
    thumbnail: '📝',
    tags: ['blog', 'article', 'post', 'content', 'writing', 'comments'],
    sections: [
      {
        key: 'header_section',
        name: 'Header',
        description: 'Article header with breadcrumb, title, author avatar, name, and publish date.',
        aiPromptHint: 'Change the article title, author name, publish date, or breadcrumb labels.',
      },
      {
        key: 'article_section',
        name: 'Article',
        description: 'Main article body with paragraphs and an inline image.',
        aiPromptHint: 'Replace article text with your own content. Add or remove paragraphs and images.',
      },
      {
        key: 'author_bio_section',
        name: 'Author Bio',
        description: 'Author card with avatar, bio text, and social media links.',
        aiPromptHint: 'Update author bio, social links, or add more profile information.',
      },
      {
        key: 'comments_section',
        name: 'Comments',
        description: 'Three reader comments with avatars, names, dates, and comment text.',
        aiPromptHint: 'Change comment content, add new comments, or modify the comment layout.',
      },
    ],
    tree: buildBlogPostTree(),
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'A creative developer portfolio with navigation, hero, project showcase, skills with progress bars, and a contact form.',
    category: 'portfolio',
    thumbnail: '🎨',
    tags: ['portfolio', 'personal', 'developer', 'projects', 'skills', 'contact'],
    sections: [
      {
        key: 'navbar',
        name: 'Navbar',
        description: 'Top navigation bar with name and section links.',
        aiPromptHint: 'Change the displayed name or add more navigation links.',
      },
      {
        key: 'hero_section',
        name: 'Hero',
        description: 'Large heading with role title, introduction text, and action buttons.',
        aiPromptHint: 'Update the job title, introduction text, or button labels.',
      },
      {
        key: 'projects_section',
        name: 'Projects',
        description: 'Three project cards with images, titles, descriptions, and technology tags.',
        aiPromptHint: 'Replace project names, descriptions, images, and technology tags with your own work.',
      },
      {
        key: 'skills_section',
        name: 'Skills',
        description: 'Six skill cards with icons, names, and progress bars.',
        aiPromptHint: 'Change skill names, proficiency levels, and icons to match your expertise.',
      },
      {
        key: 'contact_section',
        name: 'Contact',
        description: 'Contact form with name, email, message fields, and send button.',
        aiPromptHint: 'Modify form field labels, placeholders, or add additional fields.',
      },
    ],
    tree: buildPortfolioTree(),
  },
];

// ============================================================================
// Query Functions
// ============================================================================

/**
 * Get a template by its unique ID.
 */
export function getTemplate(id: string): PageTemplate | undefined {
  return PAGE_TEMPLATES.find((t) => t.id === id);
}

/**
 * Get all templates matching a specific category.
 */
export function getTemplatesByCategory(category: PageTemplate['category']): PageTemplate[] {
  return PAGE_TEMPLATES.filter((t) => t.category === category);
}

/**
 * Get all available template IDs.
 */
export function getAllTemplateIds(): string[] {
  return PAGE_TEMPLATES.map((t) => t.id);
}
