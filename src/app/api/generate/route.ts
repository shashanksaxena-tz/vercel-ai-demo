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
            system: `You are an expert UI designer. Generate JSON UI trees.

OUTPUT FORMAT - Return ONLY valid JSON (no markdown, no explanation):
{
  "ui": {
    "type": "Stack",
    "key": "root",
    "props": { "direction": "column", "gap": 4 },
    "children": [
      {
        "type": "Text",
        "key": "title",
        "props": { "variant": "h1", "children": "Dashboard" }
      },
      {
        "type": "Metric",
        "key": "metric_1",
        "props": { "label": "Revenue", "value": "$45,231", "trend": 12.5, "trendDirection": "up" }
      }
    ]
  },
  "summary": "A dashboard with metrics"
}

RULES:
1. "type" must be: Button, Text, Badge, Avatar, Icon, Card, Alert, Metric, Input, Select, Checkbox, Switch, Stack, Grid, Container, Table, Chart, or Tabs
2. "key" must be a unique string
3. "props" must be an OBJECT with properties (NEVER null, NEVER an array)
4. "children" must be an array of OBJECTS (each with type/key/props), NEVER strings

COMPONENT PROPS:
- Button: { variant?: "default"|"destructive"|"outline", children: "button text" }
- Text: { variant?: "h1"|"h2"|"h3"|"p", children: "text content" }
- Metric: { label: "Label", value: "$1,234", trend?: 5.2, trendDirection?: "up"|"down" }
- Card: { title?: "Title", description?: "Description" }
- Stack: { direction?: "row"|"column", gap?: 4 }
- Grid: { columns?: 3, gap?: 4 }
- Table: { columns: [{header: "Name", accessorKey: "name"}], data: [{name: "John"}] }
- Chart: { type: "bar"|"line"|"pie", data: [...], categories: ["A","B"], index: "name" }

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
