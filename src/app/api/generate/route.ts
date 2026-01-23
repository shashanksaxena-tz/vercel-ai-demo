import { generateText } from 'ai';
import { model } from '@/lib/gemini';
import { classifyIntent, getTopCategories } from '@/lib/intent-classifier';
import { getSchemasByCategories, formatSchemasForPrompt, allSchemas } from '@/lib/component-schemas';

// Types for UI elements
interface UIElement {
    type: string;
    key: string;
    props: Record<string, any>;
    children?: UIElement[];
}

interface GeneratedUI {
    ui: UIElement;
    summary: string;
}

// Recursively fix malformed UI elements from Gemini
function fixUIElement(element: any): UIElement | null {
    if (!element || typeof element !== 'object') return null;

    return {
        type: element.type || 'Container',
        key: element.key || `key_${Math.random().toString(36).slice(2, 9)}`,
        props: element.props && typeof element.props === 'object' ? element.props : {},
        children: Array.isArray(element.children)
            ? element.children
                .map((child: any) => typeof child === 'object' ? fixUIElement(child) : null)
                .filter(Boolean)
            : undefined
    };
}

// Parse and fix the AI response
function parseAIResponse(text: string): GeneratedUI | null {
    try {
        // Extract JSON from the response (handle markdown code blocks)
        const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, text];
        const jsonStr = jsonMatch[1] || text;

        const parsed = JSON.parse(jsonStr.trim());
        const fixedUI = fixUIElement(parsed.ui);

        if (!fixedUI) return null;

        return {
            ui: fixedUI,
            summary: parsed.summary || 'Generated UI'
        };
    } catch (e) {
        console.error('Failed to parse AI response:', e);
        return null;
    }
}

export async function POST(req: Request) {
    try {
        const { prompt, currentRegistry } = await req.json();
        const registryKey = currentRegistry || 'shadcn';

        // Step 1: Classify user intent to determine relevant categories
        const categories = classifyIntent(prompt);
        const topCategories = getTopCategories(prompt, 6);

        console.log('Detected categories:', categories);
        console.log('Top categories:', topCategories);

        // Step 2: Get relevant component schemas (focused subset)
        const relevantSchemas = getSchemasByCategories([...new Set([...categories, ...topCategories])]);
        const schemaCount = Object.keys(relevantSchemas).length;

        console.log(`Using ${schemaCount} components out of ${Object.keys(allSchemas).length} total`);

        // Step 3: Format schemas for prompt
        const formattedSchemas = formatSchemasForPrompt(relevantSchemas);

        // Step 4: Build focused system prompt
        const systemPrompt = `You are an expert UI designer. Generate JSON UI trees for building complete, production-ready interfaces.

OUTPUT FORMAT - Return ONLY valid JSON (no markdown, no explanation):
{
  "ui": {
    "type": "Stack",
    "key": "root",
    "props": { "direction": "column", "gap": 4 },
    "children": [...]
  },
  "summary": "Brief description of what was built"
}

CRITICAL RULES:
1. "key" must be a unique string for each element
2. "props" must be an OBJECT (NEVER null, NEVER an array)
3. "children" must be an array of OBJECTS (each with type/key/props), NEVER strings
4. For text content, use { "type": "Text", "props": { "children": "your text here" } }

AVAILABLE COMPONENTS (${schemaCount} components for ${registryKey}):
${formattedSchemas}

COMPONENT USAGE GUIDELINES:

LAYOUT STRUCTURE:
- Use Stack with direction="column" for vertical layouts, direction="row" for horizontal
- Use Grid with columns prop for grid layouts
- Use Container for max-width constraints
- Use Section to group related content with padding

NAVIGATION:
- Use Navbar for top navigation with brand and menu items
- Use Sidebar for side navigation
- Use Breadcrumb for page hierarchy
- Use Tabs for tabbed content

FORMS:
- Use Form to wrap form elements
- Use FormField for labeled inputs with validation
- Use Input, Select, Checkbox, Switch for form controls
- Use Button with action prop for form submission

DATA DISPLAY:
- Use Table with columns and data arrays
- Use Chart with type, data, and categories
- Use Card for content containers
- Use Stats/Metric for KPIs and metrics
- Use List for item collections

FEEDBACK:
- Use Alert for messages
- Use Dialog/Modal for overlays
- Use Skeleton for loading states
- Use EmptyState for no-data scenarios

MARKETING:
- Use Hero for page headers with title, subtitle, description
- Use Features for feature grids
- Use Pricing for pricing tables
- Use Testimonials for customer quotes
- Use CTA for call-to-action sections
- Use FAQ for frequently asked questions

E-COMMERCE:
- Use ProductCard for product displays
- Use Cart/CartItem for shopping cart
- Use CheckoutForm for checkout flows

BUILD COMPLETE UIs:
- Create full page layouts, not just fragments
- Include header/navigation when appropriate
- Add realistic sample data
- Use varied components - don't repeat the same ones

Design system: ${registryKey}

Return ONLY the JSON object, nothing else.`;

        // Step 5: Generate UI
        const { text } = await generateText({
            model: model,
            system: systemPrompt,
            prompt: prompt,
        });

        const parsed = parseAIResponse(text);

        if (!parsed) {
            console.error('Failed to parse response:', text);
            return new Response(
                JSON.stringify({ error: 'Failed to parse generated UI' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(JSON.stringify(parsed), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error generating UI:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to generate UI' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
