import { generateText } from 'ai';
import { model } from '@/lib/gemini';

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

        const { text } = await generateText({
            model: model,
            system: `You are an expert UI designer. Generate JSON UI trees for building complete, production-ready interfaces.

OUTPUT FORMAT - Return ONLY valid JSON (no markdown, no explanation):
{
  "ui": {
    "type": "Stack",
    "key": "root",
    "props": { "direction": "column", "gap": 4 },
    "children": [...]
  },
  "summary": "Brief description"
}

RULES:
1. "key" must be a unique string
2. "props" must be an OBJECT (NEVER null, NEVER an array)
3. "children" must be an array of OBJECTS (each with type/key/props), NEVER strings

AVAILABLE COMPONENTS (60+ components):

=== BASIC ===
- Button: { variant?: "default"|"secondary"|"destructive"|"outline"|"ghost"|"link", size?: "sm"|"default"|"lg", label?: "text", children?: "text" }
- Text: { variant?: "h1"|"h2"|"h3"|"p", children: "text content" }
- Badge: { variant?: "default"|"secondary"|"destructive"|"outline", children: "text" }
- Avatar: { src?: "url", fallback?: "AB", size?: "sm"|"default"|"lg" }
- Icon: { name: "IconName", size?: number }
- Link: { href: "url", label: "text", external?: boolean, variant?: "default"|"muted" }
- Logo: { src?: "url", text?: "Brand", size?: "sm"|"default"|"lg" }

=== LAYOUT ===
- Stack: { direction?: "row"|"column", gap?: 4, align?: "start"|"center"|"end", justify?: "start"|"center"|"end"|"between", wrap?: boolean }
- Grid: { columns?: 3, gap?: 4 }
- Container: { maxWidth?: "sm"|"md"|"lg"|"xl"|"2xl" }
- Section: { id?: "string", padding?: "sm"|"md"|"lg"|"xl", background?: "default"|"muted"|"gradient"|"dark" }
- Hero: { title: "Main Title", subtitle?: "Subtitle", description?: "Description", align?: "left"|"center", size?: "sm"|"md"|"lg"|"full", backgroundImage?: "url", overlay?: boolean }
- Header: { title: "Title", subtitle?: "Subtitle", description?: "Description", align?: "left"|"center", size?: "sm"|"default"|"lg" }
- Divider: { orientation?: "horizontal"|"vertical", label?: "or", variant?: "default"|"muted"|"gradient" }
- Spacer: { size?: "xs"|"sm"|"md"|"lg"|"xl"|number, axis?: "vertical"|"horizontal" }
- AspectRatio: { ratio?: "square"|"video"|"portrait"|"16/9"|"4/3" }
- ScrollArea: { height?: number|string, maxHeight?: number|string }

=== NAVIGATION ===
- Navbar: { brand?: "Name", logo?: "url", sticky?: boolean, variant?: "default"|"glass"|"transparent" }
- Sidebar: { width?: 256, position?: "left"|"right", collapsed?: boolean }
- Breadcrumb: { items: [{label: "Home", href?: "/"}], showHome?: boolean }
- Pagination: { currentPage: 1, totalPages: 10, showFirstLast?: boolean }
- Menu: { items: [{label: "Item", action?: "click_action", submenu?: [...]}], orientation?: "horizontal"|"vertical" }
- NavLink: { href: "/path", label: "Link", active?: boolean, variant?: "default"|"button"|"underline" }

=== CARDS & CONTAINERS ===
- Card: { title?: "Title", description?: "Description", footer?: "Footer text", variant?: "default"|"elevated"|"outline"|"ghost" }
- Alert: { title?: "Title", description: "Message", variant?: "default"|"destructive"|"success"|"warning" }
- Callout: { title?: "Title", content: "Message", variant?: "info"|"warning"|"error"|"success"|"tip" }

=== FORMS ===
- Form: { action?: "submit", layout?: "vertical"|"horizontal", spacing?: "compact"|"default"|"relaxed" }
- FormField: { label: "Label", name: "field_name", required?: boolean, error?: "Error message", helperText?: "Help text" }
- Input: { label?: "Label", placeholder?: "Enter...", type?: "text"|"email"|"password"|"number", required?: boolean, error?: "Error" }
- Textarea: { label?: "Label", placeholder?: "Enter...", rows?: 4, maxLength?: 500, required?: boolean }
- Select: { label?: "Label", placeholder?: "Select...", options: [{value: "1", label: "Option 1"}] }
- Checkbox: { label: "Label", checked?: boolean }
- Switch: { label: "Label", checked?: boolean }
- RadioGroup: { label?: "Label", name: "radio", options: [{value: "1", label: "Option 1"}], orientation?: "vertical"|"horizontal" }
- Slider: { label?: "Label", min?: 0, max?: 100, value?: 50, showValue?: boolean }
- DatePicker: { label?: "Label", placeholder?: "Select date", value?: "2024-01-01" }
- Label: { text: "Label", htmlFor?: "input_id", required?: boolean }

=== DATA DISPLAY ===
- Table: { columns: [{header: "Name", accessorKey: "name"}], data: [{name: "John"}], caption?: "Table caption" }
- Chart: { type: "bar"|"line"|"pie"|"area", data: [{name: "A", value: 100}], categories?: ["A","B"], index?: "name" }
- Metric: { label: "Revenue", value: "$45,231", trend?: 12.5, trendDirection?: "up"|"down" }
- Stats: { items: [{label: "Users", value: "1,234", trend?: 5.2, trendDirection?: "up"}], columns?: 4 }
- List: { items?: [{text: "Item", description?: "Desc"}], icon?: "check"|"arrow"|"dot", ordered?: boolean }
- ListItem: { text: "Item text", description?: "Description", avatar?: "url", trailing?: "meta" }
- Accordion: { items: [{id: "1", title: "Question?", content: "Answer"}], type?: "single"|"multiple" }
- Progress: { value: 75, max?: 100, label?: "Progress", showValue?: boolean, variant?: "default"|"success"|"warning" }
- Timeline: { items: [{title: "Event", description?: "Desc", date?: "2024", status?: "completed"|"current"|"upcoming"}] }
- Carousel: { items: [{image: "url", title?: "Slide", description?: "Desc"}], autoPlay?: boolean, showDots?: boolean, showArrows?: boolean }
- Image: { src: "url", alt: "description", aspectRatio?: "square"|"video"|"portrait", rounded?: "default"|"lg"|"full", shadow?: "sm"|"md"|"lg" }
- Video: { src?: "url", youtube?: "video_id_or_url", vimeo?: "video_id", poster?: "url", autoPlay?: boolean, controls?: boolean }
- Code: { code: "const x = 1;", language?: "javascript", showLineNumbers?: boolean, showCopy?: boolean, filename?: "file.js" }
- Blockquote: { content: "Quote text", author?: "Author", cite?: "Source", variant?: "default"|"filled"|"card" }
- Kbd: { keys?: ["Ctrl", "C"], children?: "Ctrl+C" }

=== FEEDBACK ===
- Dialog: { open?: boolean, title: "Title", description?: "Description", size?: "sm"|"default"|"lg"|"xl" }
- Drawer: { open?: boolean, title: "Title", position?: "left"|"right"|"top"|"bottom", size?: "sm"|"default"|"lg" }
- Toast: { title?: "Title", description: "Message", variant?: "default"|"success"|"error"|"warning"|"info", position?: "top-right"|"bottom-right" }
- Skeleton: { variant?: "text"|"title"|"avatar"|"thumbnail"|"card"|"button", count?: 3, animated?: true }
- Spinner: { size?: "sm"|"default"|"lg", label?: "Loading..." }
- Tooltip: { content: "Tooltip text", position?: "top"|"bottom"|"left"|"right" }
- Popover: { trigger?: "Click me", content: "Popover content", position?: "top"|"bottom" }
- Empty: { icon?: "Inbox", title: "No data", description?: "Get started by...", actionLabel?: "Create", action?: "create" }

=== MARKETING / LANDING PAGE ===
- Hero: { title: "Build Amazing Products", subtitle?: "Product Name", description?: "Description text", align?: "center", size?: "lg", backgroundImage?: "url" }
- CTA: { title: "Ready to get started?", description?: "Join thousands of users", primaryLabel?: "Get Started", primaryAction?: "signup", secondaryLabel?: "Learn More", variant?: "default"|"filled"|"gradient" }
- Feature: { icon?: "Zap", title: "Feature Name", description: "Feature description", variant?: "default"|"card"|"filled", align?: "left"|"center" }
- Features: { items: [{icon: "Zap", title: "Fast", description: "Lightning speed"}], columns?: 3, variant?: "default"|"card" }
- Pricing: { plans: [{name: "Basic", price: 9, period: "month", features: ["Feature 1"], highlighted?: false, cta?: "Get Started"}], columns?: 3 }
- PricingCard: { name: "Pro", price: 29, period: "month", features: [{text: "Feature", included: true}], highlighted?: boolean, badge?: "Popular", cta?: "Subscribe" }
- Testimonial: { quote: "Amazing product!", author: "John Doe", role?: "CEO", company?: "Acme", avatar?: "url", rating?: 5 }
- Testimonials: { items: [{quote: "Great!", author: "Jane", role: "CTO", avatar: "url", rating: 5}], columns?: 3 }
- FAQ: { items: [{question: "How does it work?", answer: "It works by..."}], variant?: "default"|"card", allowMultiple?: boolean }
- Footer: { brand?: "Company", logo?: "url", copyright?: "2024 Company", columns?: [{title: "Product", links: [{label: "Features", href: "/features"}]}] }

=== MISC ===
- Tabs: { items: [{label: "Tab 1", value: "tab1"}], defaultValue?: "tab1" }
- Dropdown: { triggerLabel?: "Options", items: [{label: "Edit", action: "edit"}, {separator: true}, {label: "Delete", action: "delete", destructive: true}] }

DESIGN TIPS:
- Use Hero for landing page headers with title, subtitle, description and CTA buttons as children
- Use Section to wrap content areas with consistent padding and backgrounds
- Use Features/Testimonials/FAQ for marketing sections
- Use Pricing with plans array for pricing tables
- Use Stats for dashboards with metrics
- Use Card with Grid for content layouts
- Combine Navbar, Section, and Footer for complete pages
- Use Stack with gap for spacing between elements

Design system: ${currentRegistry || 'shadcn'}

Return ONLY the JSON object, nothing else.`,
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
