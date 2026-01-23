import { streamObject } from 'ai';
import { model } from '@/lib/gemini';
import { z } from 'zod';

// Types for UI elements (Recursive)
const uiElementSchema: z.ZodType<any> = z.lazy(() =>
    z.object({
        type: z.enum([
            'Button', 'Text', 'Badge', 'Avatar', 'Icon', 'Card', 'Alert', 'Metric',
            'Input', 'Select', 'Checkbox', 'Switch',
            'Stack', 'Grid', 'Container', 'Table', 'Chart', 'Tabs'
        ]),
        key: z.string(),
        props: z.record(z.string(), z.any()).default({}),
        children: z.array(uiElementSchema).optional(),
    })
);

const outputSchema = z.object({
    ui: uiElementSchema,
    summary: z.string().describe("A short summary of what was generated"),
});

export async function POST(req: Request) {
    try {
        const { prompt, currentRegistry } = await req.json();

        const result = await streamObject({
            model: model,
            schema: outputSchema,
            system: `You are an expert UI designer. Generate JSON UI trees.

RULES:
1. "type" must be one of the allowed components.
2. "key" must be a unique string.
3. "props" must be an OBJECT matching the component requirements.
4. "children" must be an array of UI objects.

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
`,
            prompt: prompt,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Error generating UI:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to generate UI' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
