import { streamObject } from 'ai';
import { model } from '@/lib/gemini';
import { catalog } from '@/lib/catalog';

export async function POST(req: Request) {
    try {
        const { prompt, currentRegistry } = await req.json();

        const result = await streamObject({
            model: model,
            schema: catalog.getOutputSchema(),
            system: `You are an expert UI designer. Generate JSON UI trees.

RULES:
1. "type" must be one of the defined component types.
2. "key" must be a unique string.
3. "props" must follow the component's schema.
4. "children" must be an array of UI elements.

COMPONENT PROPS GUIDE:
- Button: { variant?: "default"|"destructive"|"outline", children: "button text" }
- Text: { variant?: "h1"|"h2"|"h3"|"p", children: "text content" }
- Metric: { label: "Label", value: "$1,234", trend?: 5.2, trendDirection?: "up"|"down" }
- Card: { title?: "Title", description?: "Description" }
- Stack: { direction?: "row"|"column", gap?: 4 }
- Grid: { columns?: 3, gap?: 4 }
- Table: { columns: [{header: "Name", accessorKey: "name"}], data: [{name: "John"}] }
- Chart: { type: "bar"|"line"|"pie", data: [...], categories: ["A","B"], index: "name" }

Design system: ${currentRegistry || 'shadcn'}
${currentRegistry === 'antd' ? 'Prefer denser layouts and compact components.' : 'Prefer spacious layouts.'}
${currentRegistry === 'chakra' ? 'Use Chakra-style props where applicable.' : ''}
${currentRegistry === 'mui' ? 'Use Material Design conventions.' : ''}

Generate a "summary" string describing what you built, then the "ui" object.`,
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
