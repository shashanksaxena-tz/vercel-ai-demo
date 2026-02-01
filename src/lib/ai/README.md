# AI-Powered UI Generation

This directory contains the AI generation system that creates UITree structures from natural language prompts.

## Recent Update: Realistic Content Generation

**The AI now generates components with realistic content by default!**

Previously, generated UIs had empty components that required a "Polish" step. Now, all components include production-ready content from the start.

## Quick Start

```typescript
import { generateUIFromPrompt } from '@/lib/ai';

// Generate a complete, polished UI
const result = await generateUIFromPrompt('Create a dashboard with 4 metric cards');

// result.tree is ready to render - no polish needed!
// All metrics will have realistic values, labels, and icons
```

## Files

### Core Generation
- **`ui-generator.ts`** - Main generation function using Vercel AI SDK
- **`prompts.ts`** - System prompts and content generation rules
- **`schemas.ts`** - Zod schemas for structured output validation
- **`index.ts`** - Public API exports

### Supporting Features
- **`chat-context.tsx`** - React context for chat state management
- **`polish.ts`** - Content enhancement (now optional)

### Testing & Documentation
- **`test-content-generation.ts`** - Content quality validation tests
- **`CONTENT_GENERATION.md`** - Detailed update documentation
- **`CONTENT_PATTERNS.md`** - Quick reference for content patterns
- **`README.md`** - This file

## What's Generated

All generated components now include:

### ✅ Text Content
- Specific headings (e.g., "Dashboard Analytics")
- Realistic paragraph content (1-3 sentences)
- Action-oriented button labels (e.g., "Get Started Free")

### ✅ Data & Metrics
- Formatted values (e.g., "$45,231", "12,458 users")
- Descriptive labels (e.g., "Monthly Revenue")
- Change indicators (e.g., "+12.5%")

### ✅ Visual Elements
- Unsplash image URLs with search terms
- Descriptive alt text for accessibility
- Icon names from common libraries

### ✅ Layout & Spacing
- Gap values in Row, Column, Stack, Grid
- Responsive grid configurations
- Proper padding and spacing

## Usage Examples

### Dashboard
```typescript
const dashboard = await generateUIFromPrompt('Create a dashboard with revenue, users, and orders');
// Generates complete metrics with realistic values
```

### Login Form
```typescript
const form = await generateUIFromPrompt('Create a login form');
// Generates form with labels, placeholders, and action buttons
```

### Product Card
```typescript
const card = await generateUIFromPrompt('Create a product card with image, title, and price');
// Generates card with Unsplash image, product name, description, and price
```

## Quality Standards

Generated content follows these rules:

❌ **Never:**
- Empty text/label fields
- "Lorem ipsum" placeholder text
- Generic labels like "Button" or "Heading"
- Missing image src or alt text

✅ **Always:**
- Contextual, realistic content
- Proper spacing (gap in layouts)
- Formatted values for metrics
- Descriptive, accessible text

## Testing

Validate content quality:

```typescript
import { checkUITreeContent } from '@/lib/ai/test-content-generation';

const result = await generateUIFromPrompt('Create a dashboard');
const check = checkUITreeContent(result.tree, 'dashboard');

if (!check.passed) {
  console.error('Issues:', check.errors);
}
```

Run automated tests:
```bash
ts-node src/lib/ai/test-content-generation.ts
```

## Architecture

### Generation Flow
1. User provides natural language prompt
2. System prompt guides AI with content rules
3. Zod schema validates structured output
4. AI generates UITree with realistic content
5. Validation ensures quality standards

### Key Components

**System Prompt (`prompts.ts`):**
- Component reference with 78+ components
- Content generation rules and guidelines
- Examples of good vs. bad content
- Quality checklist

**Schema (`schemas.ts`):**
- Structured output definition
- Prop validation with descriptions
- Type safety for UITree structure

**Generator (`ui-generator.ts`):**
- Uses Gemini 2.5 Flash via AI SDK
- Converts structured output to UITree format
- Handles both fresh generation and refinement

## Content Patterns

Common patterns for different UI types:

### Dashboard
- Grid of Metric components
- Realistic KPIs with formatted values
- Cards with descriptive headers
- Proper spacing and gaps

### Forms
- Inputs with labels and placeholders
- Action-oriented button labels
- Helper text and hints
- Proper vertical spacing

### Landing Pages
- Hero with compelling copy
- Feature cards with icons
- Testimonials with quotes
- Clear call-to-action buttons

See `CONTENT_PATTERNS.md` for detailed examples.

## Advanced Usage

### Refinement Mode
```typescript
// Start with a UI
const initial = await generateUIFromPrompt('Create a login form');

// Refine it
const refined = await generateUIFromPrompt(
  'Add a "Remember me" checkbox',
  { currentTree: initial.tree }
);
```

### Framework Hints
```typescript
const result = await generateUIFromPrompt(
  'Create a dashboard',
  { framework: 'Material-UI' }
);
```

### Conversation History
```typescript
const history = [
  { role: 'user', content: 'Create a form' },
  { role: 'assistant', content: 'Created login form' },
];

const result = await generateUIFromPrompt(
  'Add social login buttons',
  { conversationHistory: history }
);
```

## Configuration

Model settings in `ui-generator.ts`:

```typescript
const AI_MODEL = 'gemini-2.5-flash';
const GENERATION_TEMPERATURE = 0.7;
```

Adjust temperature:
- Lower (0.3-0.5): More consistent, conservative
- Medium (0.6-0.8): Balanced creativity
- Higher (0.9-1.0): More varied, creative

## Migration from Polish

### Before (Old Approach)
```typescript
const result = await generateUIFromPrompt('Create a dashboard');
const polished = await polishUITree(result.tree, 'Business dashboard');
setUITree(polished.tree);
```

### After (New Approach)
```typescript
const result = await generateUIFromPrompt('Create a business dashboard');
setUITree(result.tree); // Already polished!
```

The Polish feature is still available for:
- Theme/tone changes
- Industry-specific content updates
- Bulk content modifications

## Troubleshooting

### Empty Content
If components are missing content, check:
1. System prompt is being used
2. Schema validation is passing
3. API key is configured correctly

### Generic Labels
If seeing "Button" or "Heading":
1. Verify prompts.ts is loaded
2. Check schema descriptions
3. Review generation temperature

### Missing Images
If images lack src:
1. Check component type is "Image"
2. Verify schema includes src field
3. Review Unsplash URL format

## Contributing

When adding new components:

1. Update `COMPONENT_REFERENCE` in `prompts.ts`
2. Add content examples and patterns
3. Update schema if new props needed
4. Add test cases for validation

## Resources

- [Vercel AI SDK Docs](https://sdk.vercel.ai/docs)
- [Gemini API Reference](https://ai.google.dev/docs)
- [Zod Documentation](https://zod.dev)
- [Unsplash Source](https://source.unsplash.com)

## Support

For issues or questions:
1. Check `CONTENT_GENERATION.md` for detailed explanations
2. Review `CONTENT_PATTERNS.md` for examples
3. Run content tests to identify issues
4. Check schema validation errors

---

**Last Updated:** 2026-02-01
**Status:** Production Ready
**Version:** 2.0 (Realistic Content Generation)
