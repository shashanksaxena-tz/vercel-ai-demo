# 500 Components Per Library Design

## Overview

Expand the json-render component system to support 500+ components per UI library (6 libraries = 3,000+ total components) with smart context injection to keep LLM prompts efficient.

## Component Categories (500 total)

| Category | Count | Examples |
|----------|-------|----------|
| Basic/Atoms | 30 | Button, Text, Badge, Avatar, Icon, Link, Tag, Chip |
| Layout | 40 | Stack, Grid, Container, Section, Split, Panel, Resizable |
| Navigation | 35 | Navbar, Sidebar, Tabs, Breadcrumb, Stepper, CommandMenu |
| Forms | 60 | All inputs, pickers, editors, file uploads, signatures |
| Data Display | 70 | Tables, Charts (12 types), Lists, Calendars, Kanban, Gantt |
| Feedback | 40 | Dialogs, Toasts, Alerts, Skeletons, Loading states |
| Marketing | 50 | Hero variants, Pricing, Testimonials, FAQ, CTA, Newsletter |
| E-commerce | 50 | Products, Cart, Checkout, Orders, Filters, Reviews |
| Dashboard | 40 | Widgets, KPIs, Activity feeds, Reports, Forecasts |
| Chat | 35 | Messages, Threads, Typing indicators, Reactions |
| CRM | 35 | Contacts, Deals, Pipeline, Leads, Activities, Quotes |
| Admin | 35 | User management, Roles, Permissions, Billing, API keys |
| Social | 35 | Posts, Comments, Feeds, Stories, Blogs, Authors |
| Utility | 25 | QR codes, Print, Download, Theme toggle, Command palette |

## Smart Context Injection

### Problem
Passing 500 component schemas to LLM = ~100KB prompt = slow, expensive, may hit limits.

### Solution
1. **Intent Classifier**: Analyze user prompt to detect relevant categories
2. **Schema Store**: Component definitions organized by category
3. **Selective Injection**: Only pass ~80-150 relevant components per request

### Flow
```
User Prompt → Intent Classifier → Category Detection → Schema Retrieval → Focused Prompt → LLM → UI JSON
```

## File Structure

```
src/
├── lib/
│   ├── component-schemas/
│   │   ├── index.ts
│   │   ├── basic.ts
│   │   ├── layout.ts
│   │   ├── navigation.ts
│   │   ├── forms.ts
│   │   ├── data-display.ts
│   │   ├── feedback.ts
│   │   ├── marketing.ts
│   │   ├── ecommerce.ts
│   │   ├── dashboard.ts
│   │   ├── chat.ts
│   │   ├── crm.ts
│   │   ├── admin.ts
│   │   ├── social.ts
│   │   └── utility.ts
│   └── intent-classifier.ts
│
├── registries/
│   ├── shadcn/components/     (500 components)
│   ├── mui/components/        (500 components)
│   ├── chakra/components/     (500 components)
│   ├── antd/components/       (500 components)
│   ├── magicui/components/    (500 components)
│   └── aceternity/components/ (500 components)
```

## Implementation Phases

### Phase 1: Foundation
- Schema structure with 500 component definitions
- Intent classifier
- Updated API with smart context injection

### Phase 2: Shadcn Master
- Implement all 500 components in shadcn as reference

### Phase 3: Library Adapters
- MUI, Chakra, Antd, MagicUI, Aceternity implementations

### Phase 4: Testing
- End-to-end testing, prompt tuning, optimization

## Libraries

1. **shadcn/ui** - Tailwind + Radix primitives
2. **Material UI** - Google Material Design
3. **Chakra UI** - Accessible component library
4. **Ant Design** - Enterprise UI library
5. **Magic UI** - Animation-focused components
6. **Aceternity UI** - Dark mode + glassmorphism effects
