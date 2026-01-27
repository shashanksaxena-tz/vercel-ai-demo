import { streamObject } from 'ai';
import { model } from '@/lib/gemini';
import { getOutputSchema } from '@/lib/catalog';

export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const { prompt, currentRegistry } = await req.json();

        const result = await streamObject({
            model: model,
            schema: getOutputSchema(),
            prompt: prompt,
            system: `You are an expert UI designer using the ${currentRegistry || 'shadcn'} design system.
            Generate a hierarchical UI tree structure.

            GUIDELINES:
            - Use "Stack" for vertical/horizontal layouts.
            - Use "Grid" for dashboard layouts (usually 2-3 columns).
            - Use "Card" to group related content.
            - Use "Container" for top-level wrapping.
            - Ensure every component has a unique "key".
            - "summary" should be a brief description of what was generated.

            COMPONENT USAGE:
            - Button: variant="default" (primary), "destructive", "outline", "secondary", "ghost", "link"
            - Text: variant="h1" (page title), "h2" (section), "h3", "p", "blockquote"
            - Metric: label="Revenue", value="$10k", trend=5.2, trendDirection="up"
            - Table: columns=[{header:"Name", accessorKey:"name"}], data=[{name:"John"}]
            - Chart: type="bar"|"line"|"pie", categories=["Jan","Feb"], index="month", data=[{month:"Jan", val:10}]

            Create a complete, realistic UI based on the user's prompt.`,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Error in API route:', error);
        return new Response(JSON.stringify({ error: 'Failed to generate UI' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
