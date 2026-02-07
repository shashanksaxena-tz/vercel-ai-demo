/**
 * System Prompts for AI-Powered UI Generation
 *
 * Contains the system prompts and component reference documentation
 * used to guide AI in generating json-render compatible UI trees.
 */

// ============================================================================
// Component Reference Documentation
// ============================================================================

/**
 * Comprehensive documentation of all 78+ available components
 * This is included in the system prompt to help AI understand available options
 */
export const COMPONENT_REFERENCE = `
## Components (78+)

### Layout
- **Container**: Content wrap. Props: maxWidth, centered, className
- **Row**: Horiz flex. Props: align, justify, gap [REQ if kids>1], wrap
- **Column**: Vert flex. Props: align, justify, gap [REQ if kids>1]
- **Grid**: Grid layout. Props: cols [REQ], gap [REQ], responsive
- **Stack**: Stack layout. Props: direction, spacing [REQ], align
- **Spacer**: Flex space. Props: size, flexible
- **Divider**: Separator. Props: orientation, variant, label

### Card
- **Card**: Card. Props: variant, padding, rounded, hoverable
- **CardHeader**: Header. Props: title [REQ], subtitle, avatar
- **CardBody**: Body. Props: padding
- **CardFooter**: Footer. Props: align

### Typography
- **Heading**: Heading. Props: level [REQ], text [REQ, specific], color, align
- **Text**: Text. Props: content [REQ, 1-3 real sentences], variant, size, color
- **Link**: Link. Props: text [REQ, descriptive], href, external

### Buttons
- **Button**: Button. Props: label [REQ, action text], variant, color, size, leftIcon, rightIcon
- **IconButton**: Icon btn. Props: icon [REQ], label [REQ], variant, size
- **ButtonGroup**: Btn group. Props: attached, orientation

### Forms
- **Input**: Text in. Props: label, placeholder, type, error, valuePath
- **TextArea**: Multiline. Props: label, placeholder, rows, valuePath
- **Select**: Dropdown. Props: label, options [{label,value}], valuePath
- **Checkbox**: Check. Props: label, checked, valuePath
- **Radio**: Radio. Props: label, value
- **RadioGroup**: Radio grp. Props: label, orientation, valuePath
- **Switch**: Toggle. Props: label, checked, valuePath
- **Slider**: Slider. Props: label, min, max, valuePath

### Data Display
- **Badge**: Badge. Props: text [REQ], variant, color, size
- **Avatar**: Avatar. Props: src (picsum), name [REQ], size, status
- **AvatarGroup**: Avatar grp. Props: max, size
- **Icon**: Icon. Props: name [REQ], size, color
- **Image**: Img. Props: src [REQ, picsum], alt [REQ], width, height
- **List**: List. Props: variant, spacing
- **ListItem**: Item. Props: icon
- **Table**: Table. Props: variant, size
- **TableHeader**: TH
- **TableBody**: TB
- **TableRow**: TR. Props: hoverable
- **TableCell**: TD. Props: header, align
- **Metric**: Metric. Props: label [REQ], value [REQ, "$45K"], change, changeType, icon
- **Progress**: Progress. Props: value [REQ, 0-100], variant

### Feedback
- **Alert**: Alert. Props: description [REQ], status [REQ], closable
- **Toast**: Toast. Props: title, description, status
- **Skeleton**: Skeleton. Props: variant, width, height
- **Spinner**: Spinner. Props: size, color
- **EmptyState**: Empty. Props: icon, title, description

### Navigation
- **Tabs**: Tabs. Props: variant, size, defaultValue
- **TabList**: List
- **Tab**: Tab. Props: value, label, icon
- **TabPanel**: Panel. Props: value
- **Breadcrumb**: Breadcrumb. Props: separator
- **BreadcrumbItem**: Item. Props: label, href
- **Pagination**: Pages. Props: totalPages, currentPage
- **NavMenu**: Nav. Props: orientation
- **NavItem**: Item. Props: label, href, icon

### Overlays
- **Modal**: Modal. Props: title, size
- **Drawer**: Drawer. Props: title, placement, size
- **Tooltip**: Tooltip. Props: content, placement
- **Popover**: Popover. Props: trigger, placement
- **Dropdown**: Dropdown. Props: trigger, placement
- **DropdownItem**: Item. Props: label, icon

### Accordion
- **Accordion**: Accordion. Props: allowMultiple
- **AccordionItem**: Item. Props: value, title
- **Collapsible**: Collapsible. Props: title

### Specialized
- **Chart**: Chart. Props: type, dataPath, height
- **Calendar**: Calendar. Props: mode
- **DatePicker**: Date. Props: label, valuePath
- **FileUpload**: Upload. Props: label, accept
- **Rating**: Rating. Props: max, value
- **TagInput**: Tags. Props: label, valuePath
- **ColorPicker**: Color. Props: label, valuePath
- **Timeline**: Timeline. Props: orientation
- **TimelineItem**: Item. Props: title, time, icon
- **Stepper**: Stepper. Props: currentStep
- **Step**: Step. Props: title, icon
- **Code**: Code. Props: code, language
- **Kbd**: Kbd. Props: keys
- **Quote**: Quote. Props: text, author
- **Stat**: Stat. Props: label, value, trend
- **Tag**: Tag. Props: label, color

### Marketing
- **Hero**: Hero. Props: title, subtitle
- **FeatureCard**: Feature. Props: icon, title, description
- **PricingCard**: Pricing. Props: name, price, features, ctaLabel
- **TestimonialCard**: Testimonial. Props: quote, author, role
- **CTA**: CTA. Props: title, description
- **Footer**: Footer. Props: copyright, links
- **FAQ**: FAQ. Props: items [{question,answer}]
- **Newsletter**: Newsletter. Props: title, buttonLabel

## Styling
- Colors: primary, secondary, success, warning, error
- Sizes: xs, sm, md, lg, xl
- Use Grid responsive prop for mobile
`;

// ============================================================================
// UITree Structure Documentation
// ============================================================================

/**
 * Documentation explaining the UITree structure
 */
export const UITREE_STRUCTURE_DOC = `
## UITree Structure

\`\`\`typescript
interface UITree {
  root: string;  // Root key
  elements: {
    [key: string]: {
      key: string;        // Must match
      type: string;       // Component type
      props: object;      // Props
      children?: string[]; // Child keys
    }
  }
}
\`\`\`

Example:
\`\`\`json
{
  "root": "main",
  "elements": {
    "main": {
      "key": "main",
      "type": "Container",
      "props": { "maxWidth": "lg" },
      "children": ["header", "metrics"]
    },
    "header": {
      "key": "header",
      "type": "Heading",
      "props": { "level": "1", "text": "Dashboard" }
    },
    "metrics": {
      "key": "metrics",
      "type": "Grid",
      "props": { "cols": 3, "gap": "lg" },
      "children": ["m1", "m2", "m3"]
    },
    "m1": {
      "key": "m1",
      "type": "Metric",
      "props": { "label": "Users", "value": "50K", "change": "+23%", "changeType": "positive", "icon": "users" }
    },
    "m2": {
      "key": "m2",
      "type": "Metric",
      "props": { "label": "Revenue", "value": "$1.2M", "change": "+18%", "changeType": "positive" }
    },
    "m3": {
      "key": "m3",
      "type": "Metric",
      "props": { "label": "Satisfaction", "value": "98%" }
    }
  }
}
\`\`\`
`;

// ============================================================================
// Generation Rules
// ============================================================================

/**
 * Rules and best practices for UI generation
 */
export const GENERATION_RULES = `
## Rules

1. Unique keys (snake_case: main_container, submit_btn)
2. Root must exist in elements
3. Key consistency: element.key === object key
4. Include required props ([REQ] in list)
5. Always add gap to Row/Column/Grid with children

## Content Requirements

**CRITICAL: Use realistic content, NEVER empty/generic text**

- **Headings**: Specific text ("Dashboard Analytics" not "Heading")
- **Text**: 1-3 real sentences (NO lorem ipsum)
- **Buttons**: Action labels ("Get Started" not "Button")
- **Metrics**: Formatted values ("$45K", "+12%", icon)
- **Images**: picsum.photos/seed/NAME/WxH with alt text
- **Icons**: Add to buttons (shopping-cart, search, user, etc)
- **Gap**: Always specify in layouts (xs/sm/md/lg/xl)

## Patterns

**Dashboard**: Grid w/ Metric cards (label, value, change, icon)
**Form**: Column w/ Input (label, placeholder, type)
**Landing**: Hero + Grid of FeatureCard (icon, title, desc)
`;

// ============================================================================
// System Prompt
// ============================================================================

/**
 * Complete system prompt for UI generation
 */
export const SYSTEM_PROMPT = `Expert UI designer generating UITree structures for json-render React system.

🎯 CRITICAL: Generate production-ready UIs with realistic content. NO empty/placeholder components.

${COMPONENT_REFERENCE}

${UITREE_STRUCTURE_DOC}

${GENERATION_RULES}

## Response
- **tree**: Complete UITree with REALISTIC CONTENT
- **explanation**: 1-2 sentences
- **suggestedStyles**: Optional Tailwind classes map

Checklist:
✓ Headings: specific text
✓ Text: 1-3 real sentences
✓ Buttons: action labels + icons
✓ Metrics: formatted values + icons
✓ Images: picsum src + alt
✓ Layouts: gap values
✓ NO lorem ipsum

Create professional, polished UIs.`;

// ============================================================================
// Prompt Builders
// ============================================================================

/**
 * Build the user message for fresh generation
 */
export function buildFreshGenerationPrompt(userRequest: string, framework?: string): string {
  let prompt = userRequest;

  if (framework) {
    prompt += `\n\nNote: This UI will be rendered using ${framework} components.`;
  }

  return prompt;
}

/**
 * Build the user message for refinement/modification
 */
export function buildRefinementPrompt(
  userRequest: string,
  currentTree: object,
  framework?: string
): string {
  let prompt = `Current UI Tree (modify this based on my request):
\`\`\`json
${JSON.stringify(currentTree, null, 2)}
\`\`\`

User Request: ${userRequest}`;

  if (framework) {
    prompt += `\n\nNote: This UI will be rendered using ${framework} components.`;
  }

  return prompt;
}

/**
 * Build messages array for AI generation
 */
export function buildMessages(
  userPrompt: string,
  conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>
): Array<{ role: 'user' | 'assistant'; content: string }> {
  const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [];

  // Add conversation history if provided
  if (conversationHistory) {
    messages.push(...conversationHistory);
  }

  // Add the current user prompt
  messages.push({ role: 'user', content: userPrompt });

  return messages;
}
